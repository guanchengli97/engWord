/* Durable per-entry outbox. Device camera/layout never leave this browser. */
(function(root){
  class GardenSync {
    constructor({apply,status,storage=localStorage,request=(...args)=>fetch(...args)}) {
      this.apply=apply;this.status=status;this.storage=storage;this.request=request;this.busy=false;this.ready=false;
      try {this.state=JSON.parse(storage.getItem('word-garden-sync-v1')||'null');}catch{}
      if(!this.state||typeof this.state.owner!=='string')this.state={owner:'',entries:{},pending:{}};
      this.state.entries ||= {};this.state.pending ||= {};
    }
    save(){try{this.storage.setItem('word-garden-sync-v1',JSON.stringify(this.state));}catch{throw new Error('无法保存待同步记录，请检查浏览器存储空间');}}
    async api(path,body){
      const response=await this.request(path,{method:body?'POST':'GET',credentials:'same-origin',cache:'no-store',headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(20000)});
      if(!response.headers.get('content-type')?.includes('application/json'))throw new Error('请登录后重试；当前服务可能尚未部署同步接口');
      const data=await response.json();if(!response.ok)throw new Error(data.error||'同步失败');return data;
    }
    queue(key,value){
      if(!this.state.owner)return; // Local-only use is uploaded by explicit import later.
      const previous=this.state.pending[key];
      this.state.pending[key]={key,value,base:previous?.base??this.state.entries[key]?.version??0,id:crypto.randomUUID()};
      try{this.save();this.status('变更已保存在本机，等待同步');}catch(e){this.status(e.message);}
      clearTimeout(this.timer);this.timer=setTimeout(()=>this.sync(),500);
    }
    applyState(){
      const records={...this.state.entries};
      for(const op of Object.values(this.state.pending))records[op.key]={key:op.key,value:op.value};
      this.apply(Object.values(records));
    }
    async sync(){
      if(this.busy||location.protocol==='file:')return;
      this.busy=true;this.ready=false;
      try {
        const session=await this.api('/api/session');
        if(!session.configured)throw new Error('云端尚未配置数据库，本地记录已保留');
        if(this.state.owner&&this.state.owner!==session.owner)throw new Error('同步数据标识与本地记录不一致，请将 SYNC_PROFILE 设回原值');
        this.state.owner=session.owner;this.save();
        this.status('正在同步…');let conflicts=0;
        // Bounded loop; remaining changes are sent by the next scheduled pass.
        for(let batch=0;batch<120;batch++) {
          const sent=Object.values(this.state.pending).slice(0,100);if(!sent.length)break;
          const data=await this.api('/api/sync',{operations:sent});
          for(const result of data.results){
            this.state.entries[result.key]={key:result.key,value:result.value,version:result.version};
            const pending=this.state.pending[result.key];
            if(!result.accepted){conflicts++;delete this.state.pending[result.key];}
            else if(pending?.id===result.id)delete this.state.pending[result.key];
            else if(pending)pending.base=result.version;
          }
          this.save();
        }
        const data=await this.api('/api/sync');
        this.state.entries=Object.fromEntries(data.entries.map(e=>[e.key,e]));
        this.save();this.applyState();this.ready=true;
        this.status(conflicts?`${conflicts} 项在其他设备已更新，已保留云端状态；可再次修改`:Object.keys(this.state.pending).length?'仍有变更等待同步':`已同步 · ${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`);
      }catch(e){this.status(`${e.message}（本地记录保留）`);}
      finally{this.busy=false;}
    }
    async importLocal(data){
      if(this.busy)throw new Error('正在同步，请稍后再导入');
      await this.sync();if(!this.ready||this.busy)throw new Error('请先成功连接云端');
      const add=(key,value)=>{if(!this.state.entries[key]&&!this.state.pending[key])this.queue(key,value);};
      for(const w of data.custom||[])add(`custom:${w.id}`,w);
      for(const id of data.known||[])add(`known:${id}`,true);
      add('setting:smallCardAction',data.smallCardAction==='toggle'?'toggle':'detail');
      await this.sync();
    }
  }
  root.GardenSync=GardenSync;
})(globalThis);
