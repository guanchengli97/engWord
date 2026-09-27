const categories = new Set('work housing shopping food health banking services travel digital social daily growth nature feeling art general'.split(' '));
export function validateOperations(ops) {
  if (!Array.isArray(ops) || ops.length < 1 || ops.length > 100) throw new Error('每批需要 1–100 条变更');
  const keys = new Set();
  for (const op of ops) {
    if (!op || typeof op.key !== 'string' || op.key.length > 180 || keys.has(op.key) || !Number.isSafeInteger(op.base) || op.base < 0 || typeof op.id !== 'string' || !/^[a-zA-Z0-9-]{16,80}$/.test(op.id)) throw new Error('变更格式不正确');
    keys.add(op.key);
    if (op.key.startsWith('known:')) {
      if (!/^(seed-|dict-|scene-|basic-|custom-)[a-zA-Z0-9_-]+$/.test(op.key.slice(6)) || typeof op.value !== 'boolean') throw new Error('单词状态不正确');
    } else if(op.key === 'setting:smallCardAction') {
      if(!['detail','toggle'].includes(op.value)) throw new Error('设置不正确');
    } else if(op.key.startsWith('custom:')) {
      const w=op.value;
      if(!w || !/^custom-[a-zA-Z0-9-]+$/.test(w.id) || op.key!==`custom:${w.id}` || !categories.has(w.category)) throw new Error('自定义单词不正确');
      for(const [field,max] of Object.entries({word:60,ipa:100,pos:20,meaning:120,example:200})) {
        if(typeof w[field]!=='string'||w[field].length>max||(['word','meaning'].includes(field)&&!w[field].trim())) throw new Error('单词内容不正确');
      }
      op.value=Object.fromEntries(['id','word','ipa','pos','meaning','example','category'].map(k=>[k,w[k]]));
    } else throw new Error('不支持的变更');
  }
  return ops;
}
export async function snapshot(db,owner) {
  return (await db.query('SELECT key,value,version FROM garden_entries WHERE owner=$1 ORDER BY key',[owner])).rows;
}
// Lock one account so concurrent requests cannot race an absent entry or replay.
export async function writeOperations(db,owner,ops) {
  await db.query('BEGIN');
  try {
    await db.query('INSERT INTO garden_accounts(owner) VALUES($1) ON CONFLICT DO NOTHING',[owner]);
    await db.query('SELECT owner FROM garden_accounts WHERE owner=$1 FOR UPDATE',[owner]);
    const results=[];
    for(const op of ops) {
      const old=(await db.query('SELECT key,value,version,operation_id FROM garden_entries WHERE owner=$1 AND key=$2',[owner,op.key])).rows[0];
      if(old?.operation_id===op.id) { results.push({...old,id:op.id,accepted:true}); continue; }
      if((old?.version||0)!==op.base) { results.push({key:op.key,value:null,version:0,...old,id:op.id,accepted:false}); continue; }
      const row=(await db.query(`INSERT INTO garden_entries(owner,key,value,version,operation_id) VALUES($1,$2,$3::jsonb,1,$4)
        ON CONFLICT(owner,key) DO UPDATE SET value=excluded.value,version=garden_entries.version+1,operation_id=excluded.operation_id,updated_at=now()
        RETURNING key,value,version`,[owner,op.key,JSON.stringify(op.value),op.id])).rows[0];
      results.push({...row,id:op.id,accepted:true});
    }
    await db.query('COMMIT');return results;
  } catch(error) { await db.query('ROLLBACK');throw error; }
}
