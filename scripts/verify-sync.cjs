const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const http=require('node:http');const fs=require('node:fs/promises');const path=require('node:path');
(async()=>{
 const root=path.resolve(__dirname,'../dist'),entries=new Map();
 const server=http.createServer(async(req,res)=>{
  try{
   if(req.url==='/api/session'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify({owner:'me@example.com',configured:true}));return;}
   if(req.url==='/api/sync'){
    res.setHeader('Content-Type','application/json');
    if(req.method==='GET'){res.end(JSON.stringify({entries:[...entries.values()]}));return;}
    let body='';for await(const chunk of req)body+=chunk;
    const results=JSON.parse(body).operations.map(op=>{
     const old=entries.get(op.key);
     if(old?.id===op.id)return {...old,accepted:true};
     if((old?.version||0)!==op.base)return {...old,id:op.id,accepted:false};
     const row={...op,version:(old?.version||0)+1};entries.set(op.key,row);return {...row,accepted:true};
    });res.end(JSON.stringify({results}));return;
   }
   const target=path.join(root,req.url==='/'?'index.html':req.url.split('?')[0]);
   if(!target.startsWith(root+path.sep)){res.writeHead(404).end();return;}
   res.setHeader('Content-Type',target.endsWith('.js')?'text/javascript':target.endsWith('.css')?'text/css':'text/html');res.end(await fs.readFile(target));
  }catch{res.writeHead(500).end();}
 });await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const url=`http://127.0.0.1:${server.address().port}`;
  const a=await browser.newPage(),b=await browser.newPage();const errors=[];for(const p of[a,b])p.on('pageerror',e=>errors.push(e.message));
  await a.goto(url,{waitUntil:'domcontentloaded'});await b.goto(url,{waitUntil:'domcontentloaded'});
  await Promise.all([a,b].map(p=>p.waitForFunction(()=>cloudSync.ready)));
  const position=await a.evaluate(()=>positionOf(words[0]));
  await a.evaluate(()=>{toggle('seed-0',false);return cloudSync.sync();});
  await b.evaluate(()=>cloudSync.sync());assert.equal(await b.evaluate(()=>known.has('seed-0')),true);
  await b.evaluate(()=>{toggle('seed-0',false);return cloudSync.sync();});
  await a.evaluate(()=>cloudSync.sync());assert.equal(await a.evaluate(()=>known.has('seed-0')),false);
  await a.locator('#small-card-action').selectOption('toggle');await a.evaluate(()=>cloudSync.sync());await b.evaluate(()=>cloudSync.sync());assert.equal(await b.locator('#small-card-action').inputValue(),'toggle');
  await a.locator('#add-word').click();await a.locator('[name="word"]').fill('syncbrowserword');await a.locator('[name="meaning"]').fill('多设备测试');await a.locator('[type="submit"]').click();
  await a.evaluate(()=>cloudSync.sync());await b.evaluate(()=>cloudSync.sync());assert.equal(await b.evaluate(()=>words.some(w=>w.word==='syncbrowserword')),true);
  assert.deepEqual(await a.evaluate(()=>positionOf(words[0])),position);
  await a.route('**/api/**',route=>route.abort());await a.evaluate(()=>{toggle('seed-1',false);return cloudSync.sync();});
  await a.reload({waitUntil:'domcontentloaded'});await a.waitForFunction(()=>Object.keys(cloudSync.state.pending).length>0);
  await a.unroute('**/api/**');await a.waitForFunction(()=>!cloudSync.busy);await a.evaluate(()=>cloudSync.sync());await b.evaluate(()=>cloudSync.sync());assert.equal(await b.evaluate(()=>known.has('seed-1')),true);
  assert.deepEqual(errors,[]);console.log('PASS: two browser devices, known/unlearned state, settings, custom words, offline reload/retry, stable positions.');
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
