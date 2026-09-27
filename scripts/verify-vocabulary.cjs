// No dependencies: node scripts/verify-vocabulary.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const context = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data/vocabulary.js'),'utf8'),context);
const words = context.window.WORD_GARDEN_VOCABULARY;
const meta = context.window.WORD_GARDEN_META;
assert.equal(words.length,10000);
assert.equal(meta.total,words.length);
assert.equal(new Set(words.map(w=>w.id)).size,words.length);
assert.equal(new Set(words.map(w=>w.word.toLowerCase())).size,words.length);
const categories = new Set(['work','housing','shopping','food','health','banking','services','travel','digital','social','daily','growth','nature','feeling','art','general']);
for(const w of words){
 assert.ok(categories.has(w.category),w.word);
 assert.ok(w.word.trim() && w.meaning.trim(),w.word);
 assert.ok(!w.meaning.includes('\\n') && !w.meaning.includes('\\r'),w.word);
 assert.ok(['core','extend','advanced','practical'].includes(w.level),w.word);
 assert.ok(w.source==='original'||w.source==='ecdict',w.word);
 if(w.source==='ecdict') assert.ok(w.ipa.startsWith('/')&&w.ipa.endsWith('/'),w.word);
 if(w.level==='practical') assert.ok(w.example&&w.exampleZh,w.word);
}
for(const category of categories)assert.ok(words.some(w=>w.category===category),category);
for(const word of ['the','a','an','work','job','meeting','lease','copay','deductible','prescription','paycheck','receipt','grocery','pharmacy','insurance','apartment','onboarding','DMV','W-2','follow up','to go','checking account','Social Security number','Could you clarify that?'])assert.ok(words.some(w=>w.word===word),word);
for(const [level,total]of Object.entries(meta.levels))assert.equal(words.filter(w=>w.level===level).length,total);
for(const [category,total]of Object.entries(meta.categories))assert.equal(words.filter(w=>w.category===category).length,total);
assert.ok(fs.readFileSync(path.join(root,'data/ECDICT-LICENSE.txt'),'utf8').includes('MIT License'));
console.log(`PASS: ${words.length} unique entries, ${categories.size} themes, required life/work vocabulary, translations, phonetics, scenario examples, metadata and license.`);
