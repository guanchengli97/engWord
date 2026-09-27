// Pure geometry and persistence checks; no browser dependencies.
const assert = require('node:assert/strict');
const GroupedWordLayout = require('../map-layout.js');
const themes = [{id:'work'}, {id:'home'}, {id:'food'}];
const words = Array.from({length:75}, (_, i) => ({id:`word-${i}`,category:themes[i%3].id}));
const layout = new GroupedWordLayout(words, themes);
assert.equal(layout.columns,20);
const positions = new Map(words.map(word => [word.id,layout.positionOf(word)]));
const seen = new Set();
for (const theme of themes) {
  const groupWords = words.filter(word => word.category===theme.id);
  const group = layout.groups.find(group => group.category===theme.id);
  groupWords.forEach((word,index) => {
    const cell=layout.byId.get(word.id);
    assert.equal(cell.column,index%20);
    assert.equal(cell.row,group.startRow+Math.floor(index/20));
    assert.equal(layout.wordAt(cell.column,cell.row),word);
    const key=`${cell.column}:${cell.row}`;
    assert.ok(!seen.has(key));seen.add(key);
  });
  assert.equal(layout.positionOf(groupWords[0]).y,layout.positionOf(groupWords[19]).y);
  assert.ok(layout.positionOf(groupWords[20]).y>layout.positionOf(groupWords[19]).y);
  assert.equal(layout.positionOf(groupWords[20]).x,layout.positionOf(groupWords[0]).x);
}
assert.equal(layout.wordAt(20,0),null);
assert.equal(layout.wordAt(-1,0),null);
const firstGroup=layout.groups[0];
const gapRow=firstGroup.startRow+firstGroup.rows;
assert.equal(layout.wordAt(0,gapRow),null);
// Fill the reserved space and exercise the overflow path without moving old words.
for(let i=0;i<70;i++) {
 const word={id:`new-${i}`,category:'work'};words.push(word);layout.add(word,words);
}
for(const word of words.slice(0,75))assert.deepEqual(layout.positionOf(word),positions.get(word.id));
assert.ok(layout.groups.filter(group=>group.category==='work').length>1);
const restored=new GroupedWordLayout([...words].reverse(),themes,JSON.parse(JSON.stringify(layout.snapshot())));
for(const word of words)assert.deepEqual(restored.positionOf(word),layout.positionOf(word));
assert.equal(restored.byId.size,words.length);
console.log('PASS: 20 total columns, category grouping, unique cells, hit testing, reserved capacity, overflow stability and reload stability.');
