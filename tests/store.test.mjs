import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {validateOperations,writeOperations,snapshot} from '../server/store.js';
import api from '../server/api.js';
const operation=(key,value,base=0,id=crypto.randomUUID())=>({key,value,base,id});
test('PostgreSQL: per-word writes, conflicts, retry idempotency, isolation, rollback',async()=>{
 const db=new PGlite();await db.exec(await readFile(new URL('../migrations/001_sync.sql',import.meta.url),'utf8'));
 try {
  const a=operation('known:seed-0',true);const b=operation('known:seed-1',true);
  const first=await writeOperations(db,'me',[a]);assert.equal(first[0].version,1);
  await writeOperations(db,'me',[b]);assert.equal((await snapshot(db,'me')).length,2);
  assert.equal((await writeOperations(db,'me',[a]))[0].version,1);
  const stale=await writeOperations(db,'me',[operation(a.key,false)]);assert.equal(stale[0].accepted,false);assert.equal(stale[0].value,true);
  assert.equal((await writeOperations(db,'me',[operation(a.key,false,1)]))[0].version,2);
  assert.equal((await snapshot(db,'other')).length,0);
  await assert.rejects(writeOperations(db,'me',[operation('known:seed-2',true),operation('bad',undefined)]));
  assert.equal((await snapshot(db,'me')).length,2);
 }finally{await db.close();}
});
test('validate all built-in IDs, malformed data and unsafe inputs',async()=>{
 const vocabulary=await readFile(new URL('../data/vocabulary.js',import.meta.url),'utf8');
 for(const [,id] of vocabulary.matchAll(/"id":"([^"]+)"/g))validateOperations([operation(`known:${id}`,true)]);
 assert.throws(()=>validateOperations([operation('known:seed-0','true')]));
 assert.throws(()=>validateOperations([operation('known:seed-0',true),operation('known:seed-0',false)]));
 assert.throws(()=>validateOperations(Array.from({length:101},(_,i)=>operation(`known:seed-${i}`,true))));
 assert.throws(()=>validateOperations([operation('custom:x',{id:'x'})]));
});
test('API uses a shared profile without Access headers or configuration',async()=>{
 const response=await api.fetch(new Request('https://app.test/api/session'),{DB:{}});
 assert.equal(response.status,200);assert.deepEqual(await response.json(),{owner:'personal',configured:true});
 assert.equal(response.headers.get('cache-control'),'no-store');
 const configured=await api.fetch(new Request('https://app.test/api/session',{headers:{'cf-access-authenticated-user-email':'other@example.com'}}),{DB:{},SYNC_PROFILE:'existing@example.com'});
 assert.equal((await configured.json()).owner,'existing@example.com');
 assert.equal((await api.fetch(new Request('https://app.test/api/sync'),{})).status,503);
});
