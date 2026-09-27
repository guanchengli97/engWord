import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const code=await readFile(new URL('../sync.js',import.meta.url),'utf8');
function setup(){
 const db=new Map();let offline=false;const clients=[];
 const request=async(path,options)=>{
  if(offline)throw new Error('offline');
  if(path.endsWith('session'))return Response.json({owner:'me',configured:true});
  if(options.method==='GET')return Response.json({entries:[...db.values()]});
  const results=JSON.parse(options.body).operations.map(op=>{
   const old=db.get(op.key);if(old?.id===op.id)return {...old,accepted:true};
   if((old?.version||0)!==op.base)return {...old,id:op.id,accepted:false};
   const entry={...op,version:(old?.version||0)+1};db.set(op.key,entry);return {...entry,accepted:true};
  });return Response.json({results});
 };
 const create=(saved=new Map())=>{
  const context={crypto,AbortSignal,location:{protocol:'https:'},setTimeout:()=>0,clearTimeout(){},console};
  vm.runInNewContext(code,context);
  const client=new context.GardenSync({storage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)},request,apply:entries=>{client.applied=entries;},status:text=>{client.message=text;}});
  clients.push(client);return client;
 };
 return {create,db,offline:value=>offline=value};
}
test('two devices merge independent words; stale same-word edits do not overwrite; offline reload retries',async()=>{
 const s=setup(),cache=new Map(),a=s.create(cache),b=s.create();await a.sync();await b.sync();
 a.queue('known:seed-0',true);b.queue('known:seed-1',true);await a.sync();await b.sync();await a.sync();assert.equal(a.applied.length,2);
 b.queue('known:seed-0',false);a.queue('known:seed-0',false);await a.sync();await b.sync();assert.match(b.message,/其他设备/);
 assert.equal(s.db.get('known:seed-0').version,2);
 s.offline(true);a.queue('known:seed-2',true);await a.sync();assert.equal(Object.keys(a.state.pending).length,1);
 const reloaded=s.create(cache);s.offline(false);await reloaded.sync();assert.equal(Object.keys(reloaded.state.pending).length,0);assert.equal(s.db.get('known:seed-2').value,true);
});
test('legacy import fills absent records and preserves existing cloud false state',async()=>{
 const s=setup(),a=s.create();await a.sync();a.queue('known:seed-0',false);await a.sync();
 await a.importLocal({known:['seed-0','seed-1'],custom:[],smallCardAction:'toggle'});
 assert.equal(s.db.get('known:seed-0').value,false);assert.equal(s.db.get('known:seed-1').value,true);
 s.offline(true);await assert.rejects(a.importLocal({known:['seed-2']}));assert.equal(s.db.has('known:seed-2'),false);
});
