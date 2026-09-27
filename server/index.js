import {Pool} from 'pg';
import {fileURLToPath} from 'node:url';
import {createAppServer} from './http.js';
const config={SYNC_PROFILE:process.env.SYNC_PROFILE||'personal'};
const pool=new Pool({max:5,connectionTimeoutMillis:10000,idleTimeoutMillis:30000,query_timeout:15000,statement_timeout:15000,idle_in_transaction_session_timeout:30000});
pool.on('error',()=>console.error('Database pool connection unavailable; new requests will reconnect.'));
const server=createAppServer({pool,config,assetDirectory:fileURLToPath(new URL('../dist/',import.meta.url))});
server.listen(Number(process.env.PORT||3000),process.env.HOST||'127.0.0.1',()=>console.log(`Word Garden listening on port ${process.env.PORT||3000}`));
let closing=false;
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>{
 if(closing)return;closing=true;
 const deadline=setTimeout(()=>process.exit(1),10000);deadline.unref();
 server.close(async()=>{await pool.end();clearTimeout(deadline);});
});
