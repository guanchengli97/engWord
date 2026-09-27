import {snapshot,validateOperations,writeOperations} from './store.js';
const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export default {
  async fetch(request,env) {
    const url=new URL(request.url);
    if(!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    // A single shared profile; access control belongs to the external gateway.
    const owner=env.SYNC_PROFILE||'personal';
    if(url.pathname==='/api/session'&&request.method==='GET') return json({owner,configured:!!env.DB});
    if(url.pathname!=='/api/sync') return json({error:'接口不存在'},404);
    if(!['GET','POST'].includes(request.method)) return json({error:'不支持的请求方法'},405);
    if(!env.DB) return json({error:'尚未配置数据库'},503);
    let ops;
    if(request.method==='POST') {
      if(request.headers.get('Origin')!==url.origin) return json({error:'请求来源不匹配'},403);
      if(!request.headers.get('Content-Type')?.startsWith('application/json')) return json({error:'需要 JSON'},415);
      // Bound streamed input as well as Content-Length.
      const reader=request.body?.getReader();let length=0;const chunks=[];
      if(!reader)return json({error:'缺少请求内容'},400);
      while(true){const {done,value}=await reader.read();if(done)break;length+=value.length;if(length>262144){await reader.cancel();return json({error:'请求过大'},413);}chunks.push(value);}
      const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
      try {ops=validateOperations(JSON.parse(new TextDecoder().decode(bytes)).operations);} catch {return json({error:'变更内容格式不正确'},400);}
    }
    let db;
    try {
      db=await env.DB.connect();
      return json(request.method==='GET'?{entries:await snapshot(db,owner)}:{results:await writeOperations(db,owner,ops)});
    } catch {return json({error:'数据库暂时不可用，本地变更仍会保留，请稍后重试'},503);}
    finally {db?.release();}
  }
};
