import {test} from 'node:test';
import {request as httpRequest} from 'node:http';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {PGlite} from '@electric-sql/pglite';
import {createAppServer} from '../server/http.js';
test('Node HTTP server serves only assets and supports shared PostgreSQL sync without auth and rejects cross-origin writes',async()=>{
 const db=new PGlite();await db.exec(await readFile(new URL('../migrations/001_sync.sql',import.meta.url),'utf8'));
 const directory=await mkdtemp(join(tmpdir(),'garden-http-'));await writeFile(join(directory,'index.html'),'<h1>Garden</h1>');
 const origin='https://words.example.com';
 const config={};
 let releases=0;
 const pool={query:(...args)=>db.query(...args),connect:async()=>({query:(...args)=>db.query(...args),release:()=>releases++})};
 const server=createAppServer({pool,config,assetDirectory:directory});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base=`http://127.0.0.1:${server.address().port}`,originalFetch=(url,options={})=>new Promise((resolve,reject)=>{
  const req=httpRequest(url,{method:options.method||'GET',headers:options.headers},res=>{
   const chunks=[];res.on('data',chunk=>chunks.push(chunk));res.on('end',()=>resolve(new Response(Buffer.concat(chunks),{status:res.statusCode,headers:res.headers})));
  });req.on('error',reject);req.end(options.body);
 });
 try{
  let res=await originalFetch(base);assert.equal(await res.text(),'<h1>Garden</h1>');
  for(const path of ['/.env','/server/index.js','/compose.yaml','/%2e%2e%2fpackage.json'])assert.equal((await originalFetch(base+path)).status,404);
  assert.equal((await originalFetch(base+'/healthz')).status,200);
  const session=await originalFetch(base+'/api/session');assert.equal((await session.json()).owner,'personal');
  const headers={'Content-Type':'application/json',Origin:origin,Host:'words.example.com','X-Forwarded-Proto':'https'};
  res=await originalFetch(base+'/api/sync',{method:'POST',headers,body:JSON.stringify({operations:[{key:'known:seed-0',value:true,base:0,id:crypto.randomUUID()}]})});assert.equal(res.status,200);assert.equal((await res.json()).results[0].accepted,true);
  res=await originalFetch(base+'/api/sync',{headers});assert.equal((await res.json()).entries[0].value,true);assert.equal(releases,2);
  res=await originalFetch(base+'/api/sync',{method:'POST',headers:{...headers,Origin:'https://evil.example','X-Forwarded-Host':'evil.example'},body:'{}'});assert.equal(res.status,403);
  res=await originalFetch(base+'/api/sync',{method:'POST',headers,body:'x'.repeat(270000)});assert.equal(res.status,413);
  // Direct localhost needs no forwarded headers or configured domain.
  res=await originalFetch(base+'/api/sync',{method:'POST',headers:{'Content-Type':'application/json',Origin:base},body:JSON.stringify({operations:[{key:'known:seed-1',value:true,base:0,id:crypto.randomUUID()}]})});assert.equal(res.status,200);
  for(const override of [{Origin:'null'},{Origin:'http://words.example.com'},{Origin:'https://other.example','X-Forwarded-Host':'other.example'}]){
   res=await originalFetch(base+'/api/sync',{method:'POST',headers:{...headers,...override},body:'{}'});assert.equal(res.status,403);
  }
  res=await originalFetch(base+'/api/sync',{method:'POST',headers:{...headers,'X-Forwarded-Proto':'https,http'},body:'{}'});assert.equal(res.status,400);
 }finally{await new Promise(r=>server.close(r));await db.close();await rm(directory,{recursive:true,force:true});}
});
