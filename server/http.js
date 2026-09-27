import {createServer} from 'node:http';
import {Readable} from 'node:stream';
import {readFile} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
import api from './api.js';
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8'};
export function createAppServer({pool,config={},assetDirectory}) {
 const root=resolve(assetDirectory);
 const assets={async fetch(request){
  if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
  let pathname;try{pathname=decodeURIComponent(new URL(request.url).pathname);}catch{return new Response('Bad path',{status:400});}
  const target=resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!target.startsWith(root+sep)||pathname.split('/').some(p=>p.startsWith('.')))return new Response('Not found',{status:404});
  try{const data=await readFile(target);return new Response(request.method==='HEAD'?null:data,{headers:{'Content-Type':types[extname(target)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'}});}catch{return new Response('Not found',{status:404});}
 }};
 const server=createServer(async(req,res)=>{
  try {
   if(req.url==='/healthz'&&req.method==='GET'){
    try{await pool.query('SELECT 1 FROM garden_accounts LIMIT 0');res.writeHead(200,{'Content-Type':'text/plain','Cache-Control':'no-store'}).end('ok');}
    catch{res.writeHead(503).end('not ready');}return;
   }
   // Tunnel preserves Host and supplies the original protocol. Forwarded-Host
   // is deliberately ignored; never derive the expected origin from Origin.
   const host=req.headers.host;
   const protocol=req.headers['x-forwarded-proto']||(req.socket.encrypted?'https':'http');
   if(!host||/[\s\\/@,?#]/.test(host)||!['http','https'].includes(protocol)||!req.url.startsWith('/')||req.url.startsWith('//')||req.url.includes('\\')){res.writeHead(400).end();return;}
   let base;
   try{base=new URL(`${protocol}://${host}`);}catch{res.writeHead(400).end();return;}
   const request=new Request(new URL(req.url,base),{method:req.method,headers:req.headers,...(!['GET','HEAD'].includes(req.method)?{body:Readable.toWeb(req),duplex:'half'}:{})});
   const response=await api.fetch(request,{...config,DB:pool,ASSETS:assets});
   res.writeHead(response.status,Object.fromEntries(response.headers));
   res.end(Buffer.from(await response.arrayBuffer()));
  }catch{if(!res.headersSent)res.writeHead(500,{'Content-Type':'application/json'});res.end('{"error":"请求处理失败，请重试"}');}
 });
 server.requestTimeout=30000;server.headersTimeout=15000;
 return server;
}
