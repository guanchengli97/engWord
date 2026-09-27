const themes = [
  {id:'work',name:'职场与沟通',icon:'▤',description:'会议、求职、邮件、协作与日常工作。'},
  {id:'housing',name:'租房与居家',icon:'⌂',description:'看房、签租约、维修、水电与家庭用品。'},
  {id:'shopping',name:'购物与退换',icon:'♧',description:'超市、衣物、付款、快递和退换货。'},
  {id:'food',name:'餐饮与食物',icon:'☕',description:'点餐、外带、结账、食材和饮食需求。'},
  {id:'health',name:'就医与健康',icon:'✚',description:'预约、症状、药房、保险和就医沟通。'},
  {id:'banking',name:'银行与账单',icon:'＄',description:'账户、工资入账、信用卡、费用与账单。'},
  {id:'services',name:'办事与公共服务',icon:'▥',description:'表格、证件、邮政、公共机构与社区服务。'},
  {id:'travel',name:'交通与出行',icon:'↗',description:'开车、公共交通、机场、酒店和问路。'},
  {id:'digital',name:'电脑与线上沟通',icon:'▣',description:'登录、网络、设备与线上会议。'},
  {id:'social',name:'社交与人际',icon:'♡',description:'寒暄、邀请、礼貌表达和澄清误解。'},
  {id:'daily',name:'日常与生活',icon:'☀',description:'日常动作、生活用品和常见活动。'},
  {id:'growth',name:'学习与思考',icon:'✎',description:'学习、教育、分析、表达与个人成长。'},
  {id:'nature',name:'自然与万物',icon:'❀',description:'天气、环境、植物、动物与户外世界。'},
  {id:'feeling',name:'情绪与感受',icon:'♡',description:'为每一种微妙的心情找到合适的表达。'},
  {id:'art',name:'艺术与休闲',icon:'✧',description:'音乐、影视、艺术和文化生活。'},
  {id:'general',name:'通用词汇',icon:'Aa',description:'跨场景使用的常用动词、描述词与基础表达。'}
];
const seed = [
  ['bloom','/bluːm/','v.','开花；绽放','Flowers bloom in the warm spring sun.','nature'],
  ['serenity','/səˈrenəti/','n.','宁静；平和','Find serenity in the little things.','feeling'],
  ['cozy','/ˈkoʊzi/','adj.','温暖舒适的；惬意的','A cozy corner and a good book.','daily'],
  ['wander','/ˈwɑːndər/','v.','漫步；闲逛','Let’s wander through the quiet streets.','travel'],
  ['resilient','/rɪˈzɪliənt/','adj.','有韧性的；能迅速恢复的','Like a tree, stay rooted and resilient.','growth'],
  ['glimmer','/ˈɡlɪmər/','n.','微光；一丝希望','A glimmer of light in the darkness.','nature'],
  ['cherish','/ˈtʃerɪʃ/','v.','珍惜；珍爱','Cherish the moments that make you smile.','feeling'],
  ['ritual','/ˈrɪtʃuəl/','n.','仪式；习惯性的活动','Morning tea is my favorite daily ritual.','daily'],
  ['horizon','/həˈraɪzən/','n.','地平线；眼界','A new day rises beyond the horizon.','travel'],
  ['flourish','/ˈflɜːrɪʃ/','v.','茁壮成长；繁荣','Give yourself the space to flourish.','growth'],
  ['palette','/ˈpælət/','n.','调色板；一组色彩','Autumn paints the world in a warm palette.','art'],
  ['tranquil','/ˈtræŋkwɪl/','adj.','安静的；安宁的','The lake is tranquil in the early morning.','nature'],
  ['meadow','/ˈmedoʊ/','n.','草地；牧场','Wildflowers cover the green meadow.','nature'],
  ['breeze','/briːz/','n.','微风','A gentle breeze moves through the leaves.','nature'],
  ['blossom','/ˈblɑːsəm/','n.','花朵；花簇','The cherry blossom welcomes spring.','nature'],
  ['dewdrop','/ˈduːdrɑːp/','n.','露珠','A dewdrop sparkles on the leaf.','nature'],
  ['canopy','/ˈkænəpi/','n.','树冠；遮篷','Sunlight filters through the forest canopy.','nature'],
  ['gratitude','/ˈɡrætɪtuːd/','n.','感激；感谢','Start each day with gratitude.','feeling'],
  ['delight','/dɪˈlaɪt/','n.','喜悦；快乐','The little garden brings me delight.','feeling'],
  ['hopeful','/ˈhoʊpfəl/','adj.','充满希望的','I feel hopeful about tomorrow.','feeling'],
  ['nostalgia','/nɑːˈstældʒə/','n.','怀旧；思乡之情','This song fills me with nostalgia.','feeling'],
  ['empathy','/ˈempəθi/','n.','同理心；共情','Listen to others with empathy.','feeling'],
  ['contentment','/kənˈtentmənt/','n.','满足；知足','She finds contentment in a simple life.','feeling'],
  ['savor','/ˈseɪvər/','v.','细细品味；享受','Take time to savor your morning coffee.','daily'],
  ['nourish','/ˈnɜːrɪʃ/','v.','滋养；培养','Good food and rest nourish the body.','daily'],
  ['gather','/ˈɡæðər/','v.','聚集；收集','We gather around the table each evening.','daily'],
  ['unwind','/ʌnˈwaɪnd/','v.','放松；松开','A walk helps me unwind after work.','daily'],
  ['homemade','/ˌhoʊmˈmeɪd/','adj.','自制的；家里做的','Nothing beats a bowl of homemade soup.','daily'],
  ['routine','/ruːˈtiːn/','n.','日常惯例；常规','Reading is part of my evening routine.','daily'],
  ['journey','/ˈdʒɜːrni/','n.','旅行；旅程','Every journey begins with a small step.','travel'],
  ['discover','/dɪˈskʌvər/','v.','发现；找到','Discover something new along the way.','travel'],
  ['pathway','/ˈpæθweɪ/','n.','小路；途径','A narrow pathway leads to the garden.','travel'],
  ['scenic','/ˈsiːnɪk/','adj.','风景优美的','We took the scenic route home.','travel'],
  ['adventure','/ədˈventʃər/','n.','冒险；奇遇','A little adventure makes life interesting.','travel'],
  ['destination','/ˌdestɪˈneɪʃən/','n.','目的地','The seaside town is our destination.','travel'],
  ['curiosity','/ˌkjʊriˈɑːsəti/','n.','好奇心；求知欲','Let curiosity guide your learning.','growth'],
  ['patience','/ˈpeɪʃəns/','n.','耐心；耐性','Growth takes time and patience.','growth'],
  ['reflect','/rɪˈflekt/','v.','反思；反映','Pause to reflect on what you have learned.','growth'],
  ['embrace','/ɪmˈbreɪs/','v.','拥抱；欣然接受','Embrace the chance to begin again.','growth'],
  ['thrive','/θraɪv/','v.','蓬勃发展；茁壮成长','We thrive when we learn together.','growth'],
  ['mindful','/ˈmaɪndfəl/','adj.','留心的；专注当下的','Be mindful of the beauty around you.','growth'],
  ['harmony','/ˈhɑːrməni/','n.','和谐；和声','The colors work together in harmony.','art'],
  ['inspire','/ɪnˈspaɪər/','v.','启发；激励','Nature can inspire wonderful ideas.','art'],
  ['rhythm','/ˈrɪðəm/','n.','节奏；韵律','Find your own rhythm in life.','art'],
  ['texture','/ˈtekstʃər/','n.','质地；纹理','I love the texture of handmade paper.','art'],
  ['compose','/kəmˈpoʊz/','v.','创作；作曲','She likes to compose music on rainy days.','art'],
  ['vivid','/ˈvɪvɪd/','adj.','鲜艳的；生动的','The painting is full of vivid colors.','art'],
  ['muse','/mjuːz/','n.','灵感来源；缪斯','The quiet sea became her muse.','art']
];
const $ = (selector) => document.querySelector(selector);
const storageKey = 'word-garden-v1';
let saved = {};
let storageAvailable = true;
try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch { storageAvailable = false; }
const validWord = w => w && typeof w.id === 'string' && ['word','ipa','pos','meaning','example'].every(k => typeof w[k] === 'string') && themes.some(t => t.id === w.category);
let custom = Array.isArray(saved.custom) ? saved.custom.filter(validWord) : [];
const library = Array.isArray(window.WORD_GARDEN_VOCABULARY) ? window.WORD_GARDEN_VOCABULARY : [];
// Legacy slots keep identity/order for migration; grouped coordinates are stored separately.
const layoutPrefix = Number.isInteger(saved.layoutPrefix) && saved.layoutPrefix >= 0 ? saved.layoutPrefix : custom.length;
custom = custom.map((w,i) => ({...w, slot:Number.isInteger(w.slot) && w.slot >= seed.length ? w.slot : seed.length+i, level:'custom'}));
const customNames = new Set(custom.map(w => w.word.toLowerCase()));
const words = [
  ...seed.map((w,i) => ({id:`seed-${i}`,word:w[0],ipa:w[1],pos:w[2],meaning:w[3],example:w[4],category:w[5],slot:i,level:'core',source:'original'})),
  ...library.map((w,i) => ({...w,slot:seed.length+layoutPrefix+i})).filter(w => !customNames.has(w.word.toLowerCase())),
  ...custom
].sort((a,b) => a.slot-b.slot);
const wordById = new Map(words.map(w => [w.id,w]));
const known = new Set(Array.isArray(saved.known) ? saved.known.filter(id => wordById.has(id)) : []);
const levelNames = {all:'全部词库',practical:'生活与职场精选',core:'基础常用',extend:'进阶表达',advanced:'扩展阅读',custom:'我的自定义'};
let studyLevel = Object.hasOwn(levelNames,saved.studyLevel) ? saved.studyLevel : 'all';
let matchedWords = [], matchedSlots = new Set(), searchMatchIndex = 0;
let matchedBounds = null;

const renderedCards = new Map();
const MAX_ZOOM = 1.5, CANVAS_ZOOM = .14;
let mapFrame = 0, saveViewTimer, isCanvasMode = false;
let miniBase = null, miniDirty = true;
const layoutMigrated = saved.groupedMap?.version !== 3;
const mapLayout = new GroupedWordLayout(words, themes, saved.groupedMap);
const positionOf = word => mapLayout.positionOf(word);
let category='all',filter='all',query='',zoom=!layoutMigrated && Number.isFinite(saved.zoom)?Math.min(1.5,Math.max(.00001,saved.zoom)):.6;
const camera={x:!layoutMigrated && Number.isFinite(saved.view?.x)?saved.view.x:0,y:!layoutMigrated && Number.isFinite(saved.view?.y)?saved.view.y:0};
let worldWidth = 0, worldHeight = 0, suppressMapClickUntil = 0;
let reviewQueue = [], reviewIndex = 0, reviewedCount = 0, toastTimer;
const speaker = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 4 6 8H3v8h3l5 4V4Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg>';
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3200); }
function persist() { try { localStorage.setItem(storageKey, JSON.stringify({known:[...known],custom,zoom,view:camera,layoutPrefix,studyLevel,groupedMap:mapLayout.snapshot()})); } catch { storageAvailable = false; toast('浏览器未允许保存，当前进度仅在本次打开时保留'); } updateStorageNote(); }
function updateStorageNote() { if (!storageAvailable) $('.local-note').textContent = '当前进度仅在本次打开时保留'; }
function renderCategories() { $('#categories').innerHTML = themes.map(t => `<button class="category-button ${category === t.id ? 'active' : ''}" data-category="${t.id}" aria-pressed="${category === t.id}"><span class="category-icon">${t.icon}</span>${t.name}<span class="category-count">${words.filter(w => w.category === t.id).length}</span></button>`).join(''); }
function card(w) {
  const isKnown = known.has(w.id), theme = themes.find(t => t.id === w.category);
  return `<article data-word-id="${escapeHTML(w.id)}" class="word-card ${isKnown?'known':''}"><div class="card-top"><h3 class="word-name" lang="en"><button class="word-detail-button" data-detail="${escapeHTML(w.id)}" aria-label="查看 ${escapeHTML(w.word)} 的详细内容" title="${escapeHTML(w.word)} · 点击查看详情">${escapeHTML(w.word)}</button></h3><button class="audio-button" data-speak="${escapeHTML(w.id)}" aria-label="播放 ${escapeHTML(w.word)} 的美式发音">${speaker}</button></div><div class="ipa">${escapeHTML(w.ipa || (w.level === 'practical' ? '点击喇叭，跟读整句' : '音标待补充'))}</div><p class="meaning"><span>${escapeHTML(w.pos)}</span>${escapeHTML(w.meaning)}</p><p class="example" ${w.example ? 'lang="en"' : ''}>${escapeHTML(w.example) || '此词暂未收录例句'}</p><div class="card-bottom"><span class="category-tag"><span>${theme.icon}</span>${theme.name}</span><button class="status-button" data-toggle="${escapeHTML(w.id)}" aria-pressed="${isKnown}" aria-label="${escapeHTML(w.word)}：${isKnown?'已记住，点击标记为还没记住':'还没记住，点击标记为已记住'}"><span>${isKnown?'✓':'○'}</span>${isKnown?'已记住':'还没记住'}</button></div></article>`;
}
function updateSearchNavigation() {
  $('#search-navigation').hidden = !query || !matchedWords.length;
  $('#match-position').textContent = `${searchMatchIndex+1} / ${matchedWords.length.toLocaleString()}`;
  $('#match-prev').disabled = searchMatchIndex<=0;
  $('#match-next').disabled = searchMatchIndex>=matchedWords.length-1;
}
function moveToMatch(offset) {
  searchMatchIndex = Math.max(0,Math.min(matchedWords.length-1,searchMatchIndex+offset));
  const word = matchedWords[searchMatchIndex];
  if(word) {zoom=Math.max(.7,zoom);applyZoom();centerWord(word);persist();}
  updateSearchNavigation();
}
$('#match-prev').addEventListener('click',()=>moveToMatch(-1));
$('#match-next').addEventListener('click',()=>moveToMatch(1));
function render(focusResults = false) {
  renderCategories();
  const total = words.length, count = known.size, progress = total ? Math.round(count / total * 100) : 0;
  $('#total-count').innerHTML = `${total.toLocaleString()} <small>个</small>`;
  $('#known-count').innerHTML = `${count.toLocaleString()} <small>个</small>`;
  $('#unknown-count').innerHTML = `${(total-count).toLocaleString()} <small>个</small>`;
  $('#review-count').textContent = total-count;
  $('#progress-value').innerHTML = `${progress}<small>%</small>`; $('#progress-bar').style.width = `${progress}%`;
  $('#library-summary').textContent = `${total.toLocaleString()} 个词条 · 16 个主题 · ${library.filter(w => w.level==='practical').length} 条原创场景词与表达。先学精选，再逐步扩展。`;
  $('#dataset-warning').hidden = library.length>0;
  $('#study-level').innerHTML = Object.entries(levelNames).map(([id,name]) => `<option value="${id}">${name} · ${id==='all'?total:words.filter(w=>w.level===id).length}</option>`).join('');
  $('#study-level').value = studyLevel;
  const selectedTheme = themes.find(t => t.id === category);
  $('#collection-title').innerHTML = `${selectedTheme ? selectedTheme.name : '我的单词花园'} <span id="collection-count"></span>`;
  $('#collection-description').textContent = selectedTheme ? selectedTheme.description : '词汇、短语和真实场景表达，一点点融入工作与生活。';
  matchedWords = words.filter(w => (category==='all'||w.category===category) && (studyLevel==='all'||w.level===studyLevel) && (filter==='all'||known.has(w.id)===(filter==='known')) && (!query||`${w.word} ${w.meaning} ${w.example} ${w.exampleZh||''}`.toLowerCase().includes(query))).sort((a,b)=>mapLayout.orderOf(a)-mapLayout.orderOf(b));
  matchedSlots = new Set(matchedWords.map(w=>w.slot));
  matchedBounds = boundsOf(matchedWords);
  if(focusResults) searchMatchIndex=0;
  searchMatchIndex=Math.min(searchMatchIndex,Math.max(0,matchedWords.length-1));
  $('#collection-count').textContent=matchedWords.length.toLocaleString();
  $('#result-caption').textContent=`${selectedTheme?selectedTheme.name:'全部主题'} · ${levelNames[studyLevel]} · 匹配 ${matchedWords.length.toLocaleString()} 词`;
  $('#empty-state').hidden=matchedWords.length>0;
  $('#map-viewport').hidden=matchedWords.length===0;
  $('#word-grid').replaceChildren(); renderedCards.clear(); miniDirty=true;
  updateSearchNavigation(); updateMapSize();
  if(focusResults && matchedWords.length) {
    zoom=Math.max(.4,zoom);applyZoom();centerWord(matchedWords[0]);
  }
  renderVisibleWords();
  document.querySelectorAll('[data-filter]').forEach(b=>{const selected=b.dataset.filter===filter;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',selected);});
  $('#all-nav').classList.toggle('active',category==='all'&&filter==='all');
}
function centerWord(w) {
  const {x,y}=positionOf(w);
  camera.x=$('#map-viewport').clientWidth/2-(x+mapLayout.width/2)*zoom;
  camera.y=$('#map-viewport').clientHeight/2-(y+mapLayout.height/2)*zoom;
  paintCamera();
}
$('#study-level').addEventListener('change',e=>{studyLevel=e.target.value;render(true);persist();});
function speak(word) {
  if (!('speechSynthesis' in window)) { toast('当前浏览器不支持语音朗读，请使用 Chrome、Edge 或 Safari'); return; }
  speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(word); utterance.lang = 'en-US'; utterance.rate = .85;
  const voices = speechSynthesis.getVoices(); const voice = voices.find(v => v.lang === 'en-US') || voices.find(v => v.lang.startsWith('en')); if (voice) utterance.voice = voice;
  utterance.onerror = e => { if (!['interrupted','canceled'].includes(e.error)) toast('发音暂时不可用，请检查设备是否安装英语语音'); };
  speechSynthesis.speak(utterance);
}
function toggle(id) { if (known.has(id)) known.delete(id); else known.add(id); persist(); render(); const replacement = [...document.querySelectorAll('[data-toggle]')].find(b => b.dataset.toggle === id); replacement?.focus({preventScroll:true}); }
function handleWordClick(e) {
  if (e.currentTarget.id === 'word-grid' && performance.now() < suppressMapClickUntil) return;
  const sound = e.target.closest('[data-speak]'), status = e.target.closest('[data-toggle]');
  if (sound) { speak(wordById.get(sound.dataset.speak).word); return; }
  if (status) {
    toggle(status.dataset.toggle);
    if ($('#detail-dialog').open) { renderDetail(status.dataset.toggle); $('#detail-content [data-toggle]').focus(); }
    return;
  }
  const detail = e.target.closest('[data-detail]'), wordCard = e.target.closest('[data-word-id]');
  if (detail || wordCard) openDetail(detail ? detail.dataset.detail : wordCard.dataset.wordId);
}
function renderDetail(id) {
  const w=wordById.get(id);
  $('#detail-content').innerHTML = card(w) + `<div class="word-notes">${w.exampleZh?`<p>${escapeHTML(w.exampleZh)}</p>`:''}<p>${escapeHTML(w.ipaNote||'点击喇叭播放美式发音')}</p><p>${escapeHTML(levelNames[w.level]||'自定义词条')} · ${w.source==='ecdict'?'<a href="https://github.com/skywind3000/ECDICT" target="_blank" rel="noopener">ECDICT 词典释义</a>':'自编学习内容'}</p></div>`;
}
let detailOrigin;
function openDetail(id) {
  if ($('#detail-dialog').open) return;
  detailOrigin = id; renderDetail(id); $('#detail-dialog').showModal();
}
$('#word-grid').addEventListener('click', handleWordClick);
$('#detail-content').addEventListener('click', handleWordClick);
$('#detail-dialog').addEventListener('close', () => {
  const origin = [...document.querySelectorAll('#word-grid [data-detail]')].find(b => b.dataset.detail === detailOrigin);
  (origin||$('#map-viewport')).focus({preventScroll:true});
  if ('speechSynthesis' in window) speechSynthesis.cancel();
});
$('#categories').addEventListener('click', e => {const b = e.target.closest('[data-category]'); if (b) {category = category === b.dataset.category ? 'all' : b.dataset.category; render(true);}});
$('.status-tabs').addEventListener('click', e => {const b = e.target.closest('[data-filter]'); if (b) {filter = b.dataset.filter; render(true);}});
$('#search').addEventListener('input', e => {query = e.target.value.trim().toLowerCase(); render(true);});
function resetFilters() { category=filter=studyLevel='all'; query=''; $('#search').value=''; render(true); }
$('#all-nav').addEventListener('click', resetFilters); $('#clear-filters').addEventListener('click', resetFilters);
function boundsOf(list) {
  if(!list.length) return null;
  let left=Infinity,top=Infinity,right=0,bottom=0;
  for(const word of list) {
    const {x,y}=positionOf(word);
    left=Math.min(left,x);top=Math.min(top,y);
    right=Math.max(right,x+mapLayout.width);bottom=Math.max(bottom,y+mapLayout.height);
  }
  return {left:left-mapLayout.padding,top:top-mapLayout.padding,width:right-left+2*mapLayout.padding,height:bottom-top+2*mapLayout.padding};
}
function updateMapSize() {
  worldWidth=mapLayout.worldWidth;worldHeight=mapLayout.worldHeight;
  $('#word-grid').style.width=`${worldWidth}px`;
  $('#word-grid').style.height=`${worldHeight}px`;
  paintCamera();
}
function minimumZoom() {
  const view=$('#map-viewport');
  return Math.max(.00001,Math.min(.1,view.clientWidth/(worldWidth||1),view.clientHeight/(worldHeight||1))*.8);
}
function formatZoom(value) {
  const percent=value*100;
  return `${percent<1?percent.toFixed(2):percent<10?percent.toFixed(1):Math.round(percent)}%`;
}
function saveViewSoon() {clearTimeout(saveViewTimer);saveViewTimer=setTimeout(persist,180);}
function paintCamera() {
  const viewport=$('#map-viewport');
  if(!viewport.clientWidth||!worldWidth) return;
  const clamp=(value,available,extent)=>extent<=available?(available-extent)/2:Math.max(available-extent,Math.min(0,value));
  camera.x=clamp(camera.x,viewport.clientWidth,worldWidth*zoom);
  camera.y=clamp(camera.y,viewport.clientHeight,worldHeight*zoom);
  $('#word-grid').style.transform=`translate(${camera.x}px,${camera.y}px) scale(${zoom})`;
  const b=matchedBounds;
  const fits=!!b&&b.left*zoom+camera.x>=-1&&b.top*zoom+camera.y>=-1&&(b.left+b.width)*zoom+camera.x<=viewport.clientWidth+1&&(b.top+b.height)*zoom+camera.y<=viewport.clientHeight+1;
  $('#zoom-fit').setAttribute('aria-pressed',fits);
  if(!mapFrame) mapFrame=requestAnimationFrame(()=>{mapFrame=0;renderVisibleWords();});
}
// Column-major cells provide a spatial index across every theme on the same map.
function wordsInView(overscan=0) {
  const view=$('#map-viewport'),result=[];
  const left=(-camera.x-overscan)/zoom,top=(-camera.y-overscan)/zoom;
  const right=(view.clientWidth-camera.x+overscan)/zoom,bottom=(view.clientHeight-camera.y+overscan)/zoom;
  const pitchX=mapLayout.width+mapLayout.gap,pitchY=mapLayout.height+mapLayout.gap;
  const firstColumn=Math.max(0,Math.floor((left-mapLayout.padding-mapLayout.width)/pitchX));
  const lastColumn=Math.min(mapLayout.columns-1,Math.floor((right-mapLayout.padding)/pitchX));
  const firstRow=Math.max(0,Math.floor((top-mapLayout.padding-mapLayout.headerHeight-mapLayout.height)/pitchY));
  const lastRow=Math.min(mapLayout.rows-1,Math.floor((bottom-mapLayout.padding-mapLayout.headerHeight)/pitchY));
  for(let row=firstRow;row<=lastRow;row++) for(let col=firstColumn;col<=lastColumn;col++) {
    const word=mapLayout.wordAt(col,row);
    if(!word||!matchedSlots.has(word.slot))continue;
    const p=positionOf(word);
    if(p.x+mapLayout.width>=left&&p.x<=right&&p.y+mapLayout.height>=top&&p.y<=bottom) result.push(word);
  }
  return result;
}
function prepareCanvas(canvas,width,height) {
  const dpr=Math.min(window.devicePixelRatio||1,2);
  if(canvas.width!==Math.round(width*dpr)||canvas.height!==Math.round(height*dpr)) {
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
  }
  const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
  return ctx;
}
function drawMapOverview(visible, canvasMode) {
  const view=$('#map-viewport'),canvas=$('#map-canvas');
  const ctx=prepareCanvas(canvas,view.clientWidth,view.clientHeight);
  drawThemeBackgrounds(ctx,view.clientWidth,view.clientHeight);
  if(!canvasMode)return;
  // Two passes retain visible green progress even when several rows share a pixel.
  for(const remembered of [false,true]) {
    ctx.fillStyle=remembered?'#9eb786':'#dcbfae';
    for(const word of visible) {
      if(known.has(word.id)!==remembered) continue;
      const p=positionOf(word),x=p.x*zoom+camera.x,y=p.y*zoom+camera.y;
      ctx.fillRect(x,y,Math.max(1,mapLayout.width*zoom),Math.max(.7,mapLayout.height*zoom));
    }
  }
  if(zoom>=.07) {
    ctx.font='11px "DM Sans", sans-serif';ctx.fillStyle='#43583c';
    for(const word of visible) {
      const p=positionOf(word),x=p.x*zoom+camera.x,y=p.y*zoom+camera.y;
      ctx.save();ctx.beginPath();ctx.rect(x+2,y,mapLayout.width*zoom-4,mapLayout.height*zoom);ctx.clip();
      ctx.fillText(word.word,x+3,y+mapLayout.height*zoom/2+4);ctx.restore();
    }
  }
}
const themeTints=['#f0f3e7','#f5eee5','#edf3ed','#f5f0de','#edf1f4','#f2edf2'];
function drawThemeBackgrounds(ctx,width,height) {
  for(const group of mapLayout.groups) {
    const b=mapLayout.boundsOfGroup(group),x=b.left*zoom+camera.x,y=b.top*zoom+camera.y,w=b.width*zoom,h=b.height*zoom;
    if(x>width||x+w<0||y>height||y+h<0)continue;
    const themeIndex=themes.findIndex(t=>t.id===group.category),theme=themes[themeIndex];
    ctx.fillStyle=themeTints[themeIndex%themeTints.length];ctx.fillRect(x,y,w,h);
    ctx.strokeStyle='#c9d4bd';ctx.lineWidth=1;ctx.strokeRect(x,y,w,h);
    const labelY=(mapLayout.padding+group.startRow*(mapLayout.height+mapLayout.gap)+mapLayout.headerHeight*.6)*zoom+camera.y;
    if(labelY>=0&&labelY<height&&w>20) {
      ctx.save();ctx.beginPath();ctx.rect(x+4,y,w-8,mapLayout.headerHeight*zoom);ctx.clip();
      ctx.font=`500 ${Math.max(11,Math.min(18,28*zoom))}px "Noto Sans SC", sans-serif`;
      ctx.fillStyle='#657b53';
      ctx.fillText(`${theme.name} · ${group.count.toLocaleString()} 词`,Math.max(x+8,8),labelY);
      ctx.restore();
    }
  }
}
function drawMinimap() {
  const canvas=$('#map-minimap'),width=72,height=164;
  if(miniDirty||!miniBase) {
    miniBase=document.createElement('canvas');miniBase.width=width;miniBase.height=height;
    const base=miniBase.getContext('2d');base.fillStyle='#f5f6ed';base.fillRect(0,0,width,height);
    for(const group of mapLayout.groups) {
      const b=mapLayout.boundsOfGroup(group);
      base.fillStyle=themeTints[themes.findIndex(t=>t.id===group.category)%themeTints.length];
      base.fillRect(b.left/worldWidth*width,b.top/worldHeight*height,b.width/worldWidth*width,b.height/worldHeight*height);
    }
    for(const remembered of [false,true]) {
      base.fillStyle=remembered?'#78985e':'#dcbfae';
      for(const word of matchedWords) {
        if(known.has(word.id)!==remembered)continue;
        const p=positionOf(word);
        base.fillRect(p.x/worldWidth*width,p.y/worldHeight*height,Math.max(1,mapLayout.width/worldWidth*width),Math.max(.7,mapLayout.height/worldHeight*height));
      }
    }
    miniDirty=false;
  }
  const ctx=prepareCanvas(canvas,width,height);ctx.drawImage(miniBase,0,0);
  const view=$('#map-viewport');
  const top=Math.max(0,-camera.y/zoom/worldHeight*height);
  const left=Math.max(0,-camera.x/zoom/worldWidth*width);
  const boxHeight=Math.min(height,Math.max(5,view.clientHeight/zoom/worldHeight*height));
  const boxWidth=Math.min(width,Math.max(5,view.clientWidth/zoom/worldWidth*width));
  ctx.fillStyle='#5a774a22';ctx.strokeStyle='#526e43';ctx.lineWidth=1.5;
  const frameLeft=Math.min(left,width-boxWidth);
  ctx.fillRect(frameLeft,Math.min(top,height-boxHeight),boxWidth,boxHeight);
  ctx.strokeRect(frameLeft+.75,Math.min(top,height-boxHeight)+.75,boxWidth-1.5,boxHeight-1.5);
  const progress=Math.round(Math.max(0,Math.min(1,(-camera.x+view.clientWidth/2)/zoom/worldWidth))*100);
  const vertical=Math.round(Math.max(0,Math.min(1,(-camera.y+view.clientHeight/2)/zoom/worldHeight))*100);
  canvas.setAttribute('aria-valuenow',vertical);canvas.setAttribute('aria-valuetext',`地图横向 ${progress}%，纵向 ${vertical}%`);
}
function renderVisibleWords() {
  const view=$('#map-viewport');
  if(!view.clientWidth||view.hidden)return;
  const visible=wordsInView();
  const candidates=zoom<CANVAS_ZOOM?[]:wordsInView(110);
  const canvasMode=zoom<CANVAS_ZOOM||candidates.length>300;
  isCanvasMode=canvasMode;
  const buffered=canvasMode?[]:candidates;
  const desired=new Set(buffered.map(w=>w.id));
  for(const [id,node]of renderedCards) {
    if(desired.has(id)) continue;
    if(node.contains(document.activeElement)&&!document.querySelector('dialog[open]'))view.focus({preventScroll:true});
    node.remove();renderedCards.delete(id);
  }
  // Reuse cells that remain in view, preserving focus and avoiding pointer-event churn.
  const fragment=document.createDocumentFragment();
  for(const word of buffered) {
    if(renderedCards.has(word.id))continue;
    const template=document.createElement('template');template.innerHTML=card(word);
    const node=template.content.firstElementChild,p=positionOf(word);
    node.style.left=`${p.x}px`;node.style.top=`${p.y}px`;
    fragment.append(node);renderedCards.set(word.id,node);
  }
  $('#word-grid').append(fragment);
  // DOM order follows map order even when panning upward, for keyboard navigation.
  let cursor=$('#word-grid').firstElementChild;
  for(const word of buffered) {
    const node=renderedCards.get(word.id);
    if(node!==cursor)$('#word-grid').insertBefore(node,cursor);
    cursor=node.nextElementSibling;
  }
  $('#map-canvas').hidden=false;
  drawMapOverview(visible,canvasMode);
  const visibleThemes=[...new Set(visible.map(w=>w.category))].map(id=>themes.find(t=>t.id===id).name);
  const themeSummary=visibleThemes.length<=2?visibleThemes.join('、'):`${visibleThemes.length} 个主题`;
  $('#viewport-summary').textContent=`固定 20 列 · ${themeSummary||'主题间留白'} · 视野内 ${visible.length.toLocaleString()} / ${matchedWords.length.toLocaleString()} 词${zoom<.07?' · 点击放大':''}`;
  drawMinimap();
}
function applyZoom() {
  const grid=$('#word-grid');
  grid.dataset.density=zoom<=.4?'overview':zoom<=.65?'compact':zoom<.9?'standard':'detail';
  $('#status-hint').textContent=zoom<.7?'点击单词，在详情中标记进步':'点击卡片右下角，标记你的进步';
  grid.style.setProperty('--map-title-size',`${Math.max(25,11/zoom)}px`);
  grid.style.setProperty('--map-label-size',`${Math.max(12,10/zoom)}px`);
  $('#zoom-value').value=formatZoom(zoom);
  const minimum=minimumZoom();
  $('#zoom-slider').value=Math.max(0,Math.min(100,Math.log(zoom/minimum)/Math.log(MAX_ZOOM/minimum)*100));
  $('#zoom-out').disabled=zoom<=minimum+1e-9;$('#zoom-in').disabled=zoom>=MAX_ZOOM;
  $('#zoom-mode').textContent=zoom<.07?'连续地图 · 全图概览':zoom<=.4?'连续地图 · 单词全览':zoom<=.65?'连续地图 · 词义':zoom<.9?'连续地图 · 发音':'连续地图 · 详情';
  $('#zoom-slider').setAttribute('aria-valuetext',`${formatZoom(zoom)}，${$('#zoom-mode').textContent}`);
  paintCamera();
}
function setZoom(value,anchor) {
  const view=$('#map-viewport');
  const point=anchor||{x:view.clientWidth/2,y:view.clientHeight/2};
  const worldPoint={x:(point.x-camera.x)/zoom,y:(point.y-camera.y)/zoom};
  zoom=Math.max(minimumZoom(),Math.min(MAX_ZOOM,value));
  camera.x=point.x-worldPoint.x*zoom;camera.y=point.y-worldPoint.y*zoom;
  applyZoom();saveViewSoon();
}
function fitMap(scrollToMap=true) {
  if(!matchedBounds)return;
  if(scrollToMap)document.body.classList.add('garden-overview');
  const view=$('#map-viewport'),b=matchedBounds;
  zoom=Math.max(minimumZoom(),Math.min(1,view.clientWidth/b.width,view.clientHeight/b.height));
  camera.x=(view.clientWidth-b.width*zoom)/2-b.left*zoom;
  camera.y=(view.clientHeight-b.height*zoom)/2-b.top*zoom;
  applyZoom();persist();
  if(scrollToMap)$('.map-toolbar').scrollIntoView({block:'start'});
}
$('#zoom-out').addEventListener('click',()=>setZoom(zoom/1.35));
$('#zoom-in').addEventListener('click',()=>setZoom(zoom*1.35));
$('#zoom-slider').addEventListener('input',e=>setZoom(minimumZoom()*Math.pow(MAX_ZOOM/minimumZoom(),Number(e.target.value)/100)));
$('#zoom-reset').addEventListener('click',()=>{document.body.classList.remove('garden-overview');zoom=1;applyZoom();if(matchedWords.length)centerWord(matchedWords[0]);persist();});
$('#zoom-fit').addEventListener('click',()=>fitMap());
const mapPanel = $('#map-panel');
const fullscreenButton = $('#map-fullscreen');
// Dialogs stay inside the fullscreen subtree so word details remain usable.
document.querySelectorAll('dialog').forEach(dialog => mapPanel.append(dialog));
function syncFullscreen() {
  const active = document.fullscreenElement === mapPanel || mapPanel.classList.contains('map-fullscreen');
  document.body.classList.toggle('map-fullscreen-open', active);
  fullscreenButton.textContent = active ? '⛶ 退出全屏' : '⛶ 全屏';
  fullscreenButton.setAttribute('aria-pressed', String(active));
  fullscreenButton.title = active ? '退出全屏（Esc）' : '全屏查看地图';
  requestAnimationFrame(() => { applyZoom(); if (!active) fullscreenButton.focus({preventScroll:true}); });
}
fullscreenButton.addEventListener('click', async () => {
  fullscreenButton.disabled = true;
  try {
    if (document.fullscreenElement === mapPanel) await document.exitFullscreen();
    else if (mapPanel.classList.contains('map-fullscreen')) {
      mapPanel.classList.remove('map-fullscreen');
    } else {
      try {
        if (!mapPanel.requestFullscreen || !document.fullscreenEnabled) throw new Error('Fullscreen unavailable');
        await mapPanel.requestFullscreen();
      } catch {
        // Browsers without native fullscreen still offer a full-window map.
        mapPanel.classList.add('map-fullscreen');
      }
    }
  } catch { toast('暂时无法退出全屏，请按 Esc 重试'); }
  finally { fullscreenButton.disabled = false; syncFullscreen(); }
});
document.addEventListener('fullscreenchange', syncFullscreen);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mapPanel.classList.contains('map-fullscreen') && !document.querySelector('dialog[open]')) {
    mapPanel.classList.remove('map-fullscreen'); syncFullscreen();
  }
});

const viewport=$('#map-viewport');
viewport.addEventListener('wheel',e=>{
  const factor=e.deltaMode===1?16:e.deltaMode===2?viewport.clientHeight:1;
  if(e.ctrlKey||e.metaKey) {
    e.preventDefault();const rect=viewport.getBoundingClientRect();
    setZoom(zoom*Math.exp(-Math.max(-100,Math.min(100,e.deltaY*factor))*.005),{x:e.clientX-rect.left-viewport.clientLeft,y:e.clientY-rect.top-viewport.clientTop});
  } else {
    const oldX=camera.x,oldY=camera.y;
    camera.x-=(e.shiftKey?e.deltaY:e.deltaX)*factor;camera.y-=(e.shiftKey?0:e.deltaY)*factor;
    paintCamera();if(oldX!==camera.x||oldY!==camera.y)e.preventDefault();saveViewSoon();
  }
},{passive:false});
// Canvas overviews share exactly the same coordinates and hit testing as DOM cards.
viewport.addEventListener('click',e=>{
  if(!isCanvasMode||e.target.closest('.map-minimap')||performance.now()<suppressMapClickUntil)return;
  const rect=viewport.getBoundingClientRect(),point={x:e.clientX-rect.left-viewport.clientLeft,y:e.clientY-rect.top-viewport.clientTop};
  const x=(point.x-camera.x)/zoom,y=(point.y-camera.y)/zoom;
  if(zoom<.07 && matchedWords.length) {
    // Individual words can be smaller than a pixel here; choose the nearest fixed cell.
    const targetX=Math.max(0,Math.min(worldWidth,x)),targetY=Math.max(0,Math.min(worldHeight,y));
    let nearest=matchedWords[0],distance=Infinity;
    for(const candidate of matchedWords) {
      const p=positionOf(candidate),d=(p.x+mapLayout.width/2-targetX)**2+(p.y+mapLayout.height/2-targetY)**2;
      if(d<distance){nearest=candidate;distance=d;}
    }
    zoom=.7;applyZoom();centerWord(nearest);persist();return;
  }
  const col=Math.floor((x-mapLayout.padding)/(mapLayout.width+mapLayout.gap));
  const row=Math.floor((y-mapLayout.padding-mapLayout.headerHeight)/(mapLayout.height+mapLayout.gap));
  const word=mapLayout.wordAt(col,row);
  if(word&&matchedSlots.has(word.slot)) {
    const p=positionOf(word);
    if(x<=p.x+mapLayout.width&&y<=p.y+mapLayout.height) {
      if(zoom<.07){zoom=.7;applyZoom();centerWord(word);persist();}else openDetail(word.id);
      return;
    }
  }
  setZoom(zoom*2,point);
});
const minimap=$('#map-minimap');
function locateFromMinimap(e) {
  const rect=minimap.getBoundingClientRect();
  const x=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width))*worldWidth;
  const y=Math.max(0,Math.min(1,(e.clientY-rect.top)/rect.height))*worldHeight;
  zoom=Math.max(.4,zoom);camera.x=viewport.clientWidth/2-x*zoom;camera.y=viewport.clientHeight/2-y*zoom;
  applyZoom();saveViewSoon();
}
minimap.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();minimap.setPointerCapture(e.pointerId);locateFromMinimap(e);});
minimap.addEventListener('pointermove',e=>{if(minimap.hasPointerCapture(e.pointerId))locateFromMinimap(e);});
minimap.addEventListener('pointerup',e=>{if(minimap.hasPointerCapture(e.pointerId))minimap.releasePointerCapture(e.pointerId);persist();});
minimap.addEventListener('keydown',e=>{
  if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
  e.preventDefault();zoom=Math.max(.4,zoom);
  if(e.key==='Home'||e.key==='End'){const target=e.key==='Home'?matchedWords[0]:matchedWords.at(-1);if(target)centerWord(target);}
  else if(e.key==='ArrowLeft'||e.key==='ArrowRight')camera.x+=(e.key==='ArrowLeft'?1:-1)*worldWidth*zoom*.01;
  else camera.y+=(e.key==='ArrowUp'?1:-1)*worldHeight*zoom*.01;
  applyZoom();persist();
});
// Pointer gestures keep word positions fixed; only the camera moves.
const pointers = new Map();
let drag = null, pinch = null;
function pinchMetrics() {
  const [a,b] = [...pointers.values()];
  const rect = viewport.getBoundingClientRect();
  return {distance:Math.hypot(a.x-b.x,a.y-b.y),x:(a.x+b.x)/2-rect.left-viewport.clientLeft,y:(a.y+b.y)/2-rect.top-viewport.clientTop};
}
viewport.addEventListener('pointerdown', e => {
  if(e.button!==0||e.target.closest('.map-minimap'))return;
  pointers.set(e.pointerId, {x:e.clientX,y:e.clientY});
  if (pointers.size === 1) drag = {id:e.pointerId,x:e.clientX,y:e.clientY,panX:camera.x,panY:camera.y,moved:false};
  if (pointers.size === 2) {
    const metric = pinchMetrics();
    pinch = {distance:Math.max(1,metric.distance),zoom,worldX:(metric.x-camera.x)/zoom,worldY:(metric.y-camera.y)/zoom};
    suppressMapClickUntil = performance.now()+500;
  }
});
viewport.addEventListener('pointermove', e => {
  if (!pointers.has(e.pointerId)) return;
  pointers.set(e.pointerId, {x:e.clientX,y:e.clientY});
  if (pinch && pointers.size >= 2) {
    const metric = pinchMetrics();
    zoom=Math.max(minimumZoom(),Math.min(MAX_ZOOM,pinch.zoom*metric.distance/pinch.distance));
    camera.x = metric.x-pinch.worldX*zoom; camera.y = metric.y-pinch.worldY*zoom;
    applyZoom(); suppressMapClickUntil = performance.now()+500;
  } else if (drag && drag.id === e.pointerId) {
    const dx = e.clientX-drag.x, dy = e.clientY-drag.y;
    if (!drag.moved && Math.hypot(dx,dy)<6) return;
    drag.moved = true; viewport.setPointerCapture(e.pointerId); viewport.classList.add('is-dragging');
    camera.x = drag.panX+dx; camera.y = drag.panY+dy;
    paintCamera(); suppressMapClickUntil = performance.now()+500;
  }
});
function endMapPointer(e) {
  if (!pointers.has(e.pointerId)) return;
  if (drag?.moved || pinch) suppressMapClickUntil = performance.now()+500;
  pointers.delete(e.pointerId); pinch = null; drag = null;
  viewport.classList.remove('is-dragging');
  if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId);
  if (pointers.size === 1) {
    const [id,point] = [...pointers.entries()][0];
    drag = {id,x:point.x,y:point.y,panX:camera.x,panY:camera.y,moved:false};
  }
  persist();
}
window.addEventListener('pointerup', endMapPointer);
window.addEventListener('pointercancel', endMapPointer);
viewport.addEventListener('keydown', e => {
  if (e.target !== viewport) return;
  const directions = {ArrowLeft:[90,0],ArrowRight:[-90,0],ArrowUp:[0,90],ArrowDown:[0,-90]};
  if(directions[e.key]){e.preventDefault();camera.x+=directions[e.key][0];camera.y+=directions[e.key][1];paintCamera();persist();}
  if(e.key==='Home'||e.key==='End'){e.preventDefault();const target=e.key==='Home'?matchedWords[0]:matchedWords.at(-1);if(target)centerWord(target);persist();}
  if(e.key==='+'||e.key==='='){e.preventDefault();setZoom(zoom*1.35);}
  if(e.key==='-'){e.preventDefault();setZoom(zoom/1.35);}
});
// Keyboard focus can reach a word outside the camera: bring that fixed cell into view.
viewport.addEventListener('focusin', e => {
  const cell = e.target.closest('[data-word-id]');
  if (!cell) return;
  const left = cell.offsetLeft*zoom+camera.x, top = cell.offsetTop*zoom+camera.y;
  if (left<0) camera.x-=left;
  else if (left+mapLayout.width*zoom>viewport.clientWidth) camera.x-=left+mapLayout.width*zoom-viewport.clientWidth;
  if (top<0) camera.y-=top;
  else if (top+mapLayout.height*zoom>viewport.clientHeight) camera.y-=top+mapLayout.height*zoom-viewport.clientHeight;
  paintCamera();
});
new ResizeObserver(()=>{applyZoom();}).observe(viewport);
$('#add-category').innerHTML = themes.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
$('#add-word').addEventListener('click', () => {if (category !== 'all') $('#add-category').value = category; $('#add-dialog').showModal();});
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => document.getElementById(b.dataset.close).close()));
document.querySelectorAll('dialog').forEach(d => d.addEventListener('click', e => {if(e.target === d) {const r = d.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();}}));
$('#word-form').addEventListener('submit', e => {
  e.preventDefault(); const data = Object.fromEntries(new FormData(e.target)); for (const k of Object.keys(data)) data[k] = data[k].trim();
  if (!data.word || !data.meaning) {toast('请填写单词和中文释义'); return;}
  if (words.some(w => w.word.toLowerCase() === data.word.toLowerCase())) {toast('这颗单词种子已经在花园里了'); return;}
  const w={...data,id:`custom-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,level:'custom',slot:Math.max(...words.map(w=>w.slot))+1};
  custom.push(w);words.push(w);wordById.set(w.id,w);mapLayout.add(w,words);category=filter=studyLevel='all';query='';$('#search').value='';render();zoom=Math.max(.7,zoom);applyZoom();centerWord(w);persist();e.target.reset();$('#add-dialog').close();toast(`「${w.word}」已经种进你的花园`);
});
function startReview() {
  reviewQueue = words.filter(w => !known.has(w.id) && (category==='all'||w.category===category) && (studyLevel==='all'||w.level===studyLevel));
  for (let i = reviewQueue.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [reviewQueue[i],reviewQueue[j]] = [reviewQueue[j],reviewQueue[i]]; }
  reviewQueue = reviewQueue.slice(0,10); reviewIndex = reviewedCount = 0; renderReview(); $('#review-dialog').showModal();
}
function renderReview() {
  if (reviewIndex >= reviewQueue.length) { $('#review-content').innerHTML = `<div class="review-card"><span style="font-size:44px;color:#91a679">✿</span><h2>${reviewQueue.length?'今天又向前了一小步':'当前范围没有待温习词条'}</h2><p>${reviewQueue.length?`本轮温习了 ${reviewQueue.length} 个单词，新记住 ${reviewedCount} 个。<br>给认真学习的自己一点鼓励吧。`:'可以切换学习范围或主题，继续认识新的单词。'}</p><button class="primary-button" id="finish-review">回到花园</button></div>`; $('#finish-review').onclick = () => $('#review-dialog').close(); return; }
  const w = reviewQueue[reviewIndex];
  $('#review-content').innerHTML = `<div class="review-card"><span class="review-count">今日温习 ${reviewIndex+1} / ${reviewQueue.length}</span><h3 lang="en">${escapeHTML(w.word)}</h3><div class="ipa">${escapeHTML(w.ipa)}</div><button class="audio-button" id="review-speak" aria-label="播放发音">${speaker}</button><div id="review-answer" hidden><p class="meaning">${escapeHTML(w.pos)} ${escapeHTML(w.meaning)}</p><p class="example" lang="en">${escapeHTML(w.example)||'此词暂未收录例句'}</p>${w.exampleZh?`<p class="review-translation">${escapeHTML(w.exampleZh)}</p>`:''}</div><div class="review-actions" id="review-actions"><button class="secondary-button" id="show-answer">想一想，查看释义</button></div></div>`;
  $('#review-speak').onclick = () => speak(w.word);
  $('#show-answer').onclick = () => { $('#review-answer').hidden = false; $('#review-actions').innerHTML = '<button class="secondary-button" id="review-again">还需温习</button><button class="primary-button" id="review-known">✓ 已经记住</button>'; $('#review-again').onclick = () => {reviewIndex++; renderReview();}; $('#review-known').onclick = () => {known.add(w.id); reviewedCount++; persist(); render(); reviewIndex++; renderReview();}; $('#review-again').focus(); };
}
$('#scope-review').addEventListener('click', startReview);
$('#start-review').addEventListener('click', startReview); $('#review-nav').addEventListener('click', startReview);
$('#review-dialog').addEventListener('close', () => { if ('speechSynthesis' in window) speechSynthesis.cancel(); });
document.addEventListener('keydown', e => {if(e.key === '/' && !['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName) && !document.querySelector('dialog[open]')) { e.preventDefault(); $('#search').focus(); }});
window.addEventListener('pagehide',persist);
updateStorageNote(); render(); applyZoom();
if(layoutMigrated){if(matchedWords.length)centerWord(matchedWords[0]);persist();}
