const themes = [
  { id: 'nature', name: '自然与万物', icon: '❀', description: '在山川草木之间，收集自然的语言。' },
  { id: 'feeling', name: '情绪与感受', icon: '♡', description: '为每一种微妙的心情，找到合适的表达。' },
  { id: 'daily', name: '日常与生活', icon: '☕', description: '把语言放进生活，让平凡的日常闪闪发光。' },
  { id: 'travel', name: '旅行与探索', icon: '♧', description: '带上好奇心，用新的单词走向更远的地方。' },
  { id: 'growth', name: '成长与思考', icon: '↗', description: '每一次思考，都在为未来的自己积蓄力量。' },
  { id: 'art', name: '艺术与灵感', icon: '✧', description: '留意美的细节，让灵感自由生长。' }
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
const words = [...seed.map((w, i) => ({id:`seed-${i}`,word:w[0],ipa:w[1],pos:w[2],meaning:w[3],example:w[4],category:w[5]})), ...custom];
const known = new Set(Array.isArray(saved.known) ? saved.known.filter(id => words.some(w => w.id === id)) : []);
let category = 'all', filter = 'all', query = '', zoom = Number.isFinite(saved.zoom) ? Math.min(1.5, Math.max(.25, saved.zoom)) : 1;
let reviewQueue = [], reviewIndex = 0, reviewedCount = 0, toastTimer;
const speaker = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 4 6 8H3v8h3l5 4V4Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg>';
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3200); }
function persist() { try { localStorage.setItem(storageKey, JSON.stringify({known:[...known],custom,zoom})); } catch { storageAvailable = false; toast('浏览器未允许保存，当前进度仅在本次打开时保留'); } updateStorageNote(); }
function updateStorageNote() { if (!storageAvailable) $('.local-note').textContent = '当前进度仅在本次打开时保留'; }
function renderCategories() { $('#categories').innerHTML = themes.map(t => `<button class="category-button ${category === t.id ? 'active' : ''}" data-category="${t.id}" aria-pressed="${category === t.id}"><span class="category-icon">${t.icon}</span>${t.name}<span class="category-count">${words.filter(w => w.category === t.id).length}</span></button>`).join(''); }
function card(w) { const isKnown = known.has(w.id), theme = themes.find(t => t.id === w.category); return `<article data-word-id="${escapeHTML(w.id)}" class="word-card ${isKnown?'known':''}"><div class="card-top"><h3 class="word-name" lang="en"><button class="word-detail-button" data-detail="${escapeHTML(w.id)}" aria-label="查看 ${escapeHTML(w.word)} 的详细内容" title="${escapeHTML(w.word)} · 点击查看详情">${escapeHTML(w.word)}</button></h3><button class="audio-button" data-speak="${escapeHTML(w.id)}" aria-label="播放 ${escapeHTML(w.word)} 的发音">${speaker}</button></div><div class="ipa">${escapeHTML(w.ipa || '音标待补充')}</div><p class="meaning"><span>${escapeHTML(w.pos)}</span>${escapeHTML(w.meaning)}</p><p class="example" lang="en">${escapeHTML(w.example) || '给这个单词一点时间，慢慢认识它。'}</p><div class="card-bottom"><span class="category-tag"><span>${theme.icon}</span>${theme.name}</span><button class="status-button" data-toggle="${escapeHTML(w.id)}" aria-pressed="${isKnown}" aria-label="${escapeHTML(w.word)}：${isKnown?'已记住，点击标记为还没记住':'还没记住，点击标记为已记住'}"><span>${isKnown?'✓':'○'}</span>${isKnown?'已记住':'还没记住'}</button></div></article>`; }
function render() {
  renderCategories();
  const total = words.length, count = known.size, progress = total ? Math.round(count / total * 100) : 0;
  $('#total-count').innerHTML = `${total} <small>个</small>`; $('#known-count').innerHTML = `${count} <small>个</small>`; $('#unknown-count').innerHTML = `${total-count} <small>个</small>`;
  $('#review-count').textContent = total-count; $('#progress-value').innerHTML = `${progress}<small>%</small>`; $('#progress-bar').style.width = `${progress}%`;
  const selectedTheme = themes.find(t => t.id === category);
  $('#collection-title').innerHTML = `${selectedTheme ? selectedTheme.name : '我的单词花园'} <span id="collection-count"></span>`;
  $('#collection-description').textContent = selectedTheme ? selectedTheme.description : '每一个词，都是一颗等待发芽的种子。';
  const visible = words.filter(w => (category === 'all' || w.category === category) && (filter === 'all' || known.has(w.id) === (filter === 'known')) && (!query || `${w.word} ${w.meaning} ${w.example}`.toLowerCase().includes(query)));
  $('#collection-count').textContent = visible.length;
  $('#result-caption').textContent = `${selectedTheme ? selectedTheme.name : '全部主题'} · ${visible.length} 个单词`;
  $('#word-grid').innerHTML = visible.map(card).join(''); $('#empty-state').hidden = visible.length > 0;
  document.querySelectorAll('[data-filter]').forEach(b => {const selected = b.dataset.filter === filter; b.classList.toggle('selected', selected); b.setAttribute('aria-pressed', selected);});
  $('#all-nav').classList.toggle('active', category === 'all' && filter === 'all');
}
function speak(word) {
  if (!('speechSynthesis' in window)) { toast('当前浏览器不支持语音朗读，请使用 Chrome、Edge 或 Safari'); return; }
  speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(word); utterance.lang = 'en-US'; utterance.rate = .85;
  const voices = speechSynthesis.getVoices(); const voice = voices.find(v => v.lang === 'en-US') || voices.find(v => v.lang.startsWith('en')); if (voice) utterance.voice = voice;
  utterance.onerror = e => { if (!['interrupted','canceled'].includes(e.error)) toast('发音暂时不可用，请检查设备是否安装英语语音'); };
  speechSynthesis.speak(utterance);
}
function toggle(id) { if (known.has(id)) known.delete(id); else known.add(id); persist(); render(); const replacement = [...document.querySelectorAll('[data-toggle]')].find(b => b.dataset.toggle === id); replacement?.focus({preventScroll:true}); }
function handleWordClick(e) {
  const sound = e.target.closest('[data-speak]'), status = e.target.closest('[data-toggle]');
  if (sound) { speak(words.find(w => w.id === sound.dataset.speak).word); return; }
  if (status) {
    toggle(status.dataset.toggle);
    if ($('#detail-dialog').open) { renderDetail(status.dataset.toggle); $('#detail-content [data-toggle]').focus(); }
    return;
  }
  const detail = e.target.closest('[data-detail]'), wordCard = e.target.closest('[data-word-id]');
  if (detail || wordCard) openDetail(detail ? detail.dataset.detail : wordCard.dataset.wordId);
}
function renderDetail(id) { $('#detail-content').innerHTML = card(words.find(w => w.id === id)); }
let detailOrigin;
function openDetail(id) {
  if ($('#detail-dialog').open) return;
  detailOrigin = id; renderDetail(id); $('#detail-dialog').showModal();
}
$('#word-grid').addEventListener('click', handleWordClick);
$('#detail-content').addEventListener('click', handleWordClick);
$('#detail-dialog').addEventListener('close', () => {
  const origin = [...document.querySelectorAll('#word-grid [data-detail]')].find(b => b.dataset.detail === detailOrigin);
  origin?.focus({preventScroll:true});
  if ('speechSynthesis' in window) speechSynthesis.cancel();
});
$('#categories').addEventListener('click', e => {const b = e.target.closest('[data-category]'); if (b) {category = category === b.dataset.category ? 'all' : b.dataset.category; render();}});
$('.status-tabs').addEventListener('click', e => {const b = e.target.closest('[data-filter]'); if (b) {filter = b.dataset.filter; render();}});
$('#search').addEventListener('input', e => {query = e.target.value.trim().toLowerCase(); render();});
function resetFilters() { category = filter = 'all'; query = ''; $('#search').value = ''; render(); }
$('#all-nav').addEventListener('click', resetFilters); $('#clear-filters').addEventListener('click', resetFilters);
function applyZoom() {
  const grid = $('#word-grid');
  const mode = zoom <= .4 ? 'overview' : zoom <= .65 ? 'compact' : zoom < .9 ? 'standard' : 'detail';
  grid.dataset.density = mode;
  $('#status-hint').textContent = ['overview','compact'].includes(mode) ? '点击单词，在详情中标记进步' : '点击卡片右下角，标记你的进步';
  grid.style.setProperty('--word-zoom', zoom);
  document.body.classList.toggle('garden-overview', mode === 'overview');
  $('#zoom-value').value = `${Math.round(zoom*100)}%`;
  $('#zoom-slider').value = Math.round(zoom*100);
  $('#zoom-out').disabled = zoom <= .25;
  $('#zoom-in').disabled = zoom >= 1.5;
  $('#zoom-fit').setAttribute('aria-pressed', mode === 'overview');
  $('#zoom-mode').textContent = {overview:'单词全览', compact:'词义速览', standard:'发音与释义', detail:'详细学习'}[mode];
  $('#zoom-slider').setAttribute('aria-valuetext', `${Math.round(zoom*100)}%，${$('#zoom-mode').textContent}`);
}
function setZoom(value, anchor) {
  const grid = $('#word-grid');
  // Keep the word nearest the pointer (or the top visible row) in view as rows reflow.
  const anchorCard = anchor || [...grid.children].find(c => c.getBoundingClientRect().top >= $('.map-toolbar').getBoundingClientRect().bottom && c.getBoundingClientRect().top < innerHeight);
  const oldTop = anchorCard?.getBoundingClientRect().top;
  const wasOverview = document.body.classList.contains('garden-overview');
  zoom = Math.max(.25, Math.min(1.5, Math.round(value*100)/100));
  applyZoom(); persist();
  if (wasOverview !== document.body.classList.contains('garden-overview')) {
    $('.collection').scrollIntoView({block:'start'});
  } else if (anchorCard && oldTop !== undefined) {
    window.scrollBy(0, anchorCard.getBoundingClientRect().top - oldTop);
  }
}
$('#zoom-out').addEventListener('click', () => setZoom(zoom-.1));
$('#zoom-in').addEventListener('click', () => setZoom(zoom+.1));
$('#zoom-slider').addEventListener('input', e => setZoom(Number(e.target.value)/100));
$('#zoom-reset').addEventListener('click', () => setZoom(1));
$('#zoom-fit').addEventListener('click', () => {setZoom(.25); $('.collection').scrollIntoView({block:'start'});});
// Ctrl + wheel also handles trackpad pinch events without intercepting ordinary scrolling.
let wheelDelta = 0;
$('#word-grid').addEventListener('wheel', e => {
  if (!e.ctrlKey && !e.metaKey) return;
  e.preventDefault();
  wheelDelta += e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1);
  if (Math.abs(wheelDelta) >= 15) {
    setZoom(zoom + (wheelDelta < 0 ? .05 : -.05), e.target.closest('[data-word-id]'));
    wheelDelta = 0;
  }
}, {passive:false});
$('#add-category').innerHTML = themes.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
$('#add-word').addEventListener('click', () => {if (category !== 'all') $('#add-category').value = category; $('#add-dialog').showModal();});
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => document.getElementById(b.dataset.close).close()));
document.querySelectorAll('dialog').forEach(d => d.addEventListener('click', e => {if(e.target === d) {const r = d.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();}}));
$('#word-form').addEventListener('submit', e => {
  e.preventDefault(); const data = Object.fromEntries(new FormData(e.target)); for (const k of Object.keys(data)) data[k] = data[k].trim();
  if (!data.word || !data.meaning) {toast('请填写单词和中文释义'); return;}
  if (words.some(w => w.word.toLowerCase() === data.word.toLowerCase())) {toast('这颗单词种子已经在花园里了'); return;}
  const w = { ...data, id:`custom-${Date.now()}-${Math.random().toString(36).slice(2,8)}` }; custom.push(w); words.unshift(w); persist(); resetFilters(); e.target.reset(); $('#add-dialog').close(); toast(`「${w.word}」已经种进你的花园`);
});
function startReview() {
  reviewQueue = words.filter(w => !known.has(w.id) && (category === 'all' || w.category === category));
  for (let i = reviewQueue.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [reviewQueue[i],reviewQueue[j]] = [reviewQueue[j],reviewQueue[i]]; }
  reviewQueue = reviewQueue.slice(0,10); reviewIndex = reviewedCount = 0; renderReview(); $('#review-dialog').showModal();
}
function renderReview() {
  if (reviewIndex >= reviewQueue.length) { $('#review-content').innerHTML = `<div class="review-card"><span style="font-size:44px;color:#91a679">✿</span><h2>${reviewQueue.length?'今天又向前了一小步':'这些单词都已记住'}</h2><p>${reviewQueue.length?`本轮温习了 ${reviewQueue.length} 个单词，新记住 ${reviewedCount} 个。<br>给认真学习的自己一点鼓励吧。`:'真好！可以去其他主题逛逛，或种下新的单词。'}</p><button class="primary-button" id="finish-review">回到花园</button></div>`; $('#finish-review').onclick = () => $('#review-dialog').close(); return; }
  const w = reviewQueue[reviewIndex];
  $('#review-content').innerHTML = `<div class="review-card"><span class="review-count">今日温习 ${reviewIndex+1} / ${reviewQueue.length}</span><h3 lang="en">${escapeHTML(w.word)}</h3><div class="ipa">${escapeHTML(w.ipa)}</div><button class="audio-button" id="review-speak" aria-label="播放发音">${speaker}</button><div id="review-answer" hidden><p class="meaning">${escapeHTML(w.pos)} ${escapeHTML(w.meaning)}</p><p class="example" lang="en">${escapeHTML(w.example)}</p></div><div class="review-actions" id="review-actions"><button class="secondary-button" id="show-answer">想一想，查看释义</button></div></div>`;
  $('#review-speak').onclick = () => speak(w.word);
  $('#show-answer').onclick = () => { $('#review-answer').hidden = false; $('#review-actions').innerHTML = '<button class="secondary-button" id="review-again">还需温习</button><button class="primary-button" id="review-known">✓ 已经记住</button>'; $('#review-again').onclick = () => {reviewIndex++; renderReview();}; $('#review-known').onclick = () => {known.add(w.id); reviewedCount++; persist(); render(); reviewIndex++; renderReview();}; $('#review-again').focus(); };
}
$('#start-review').addEventListener('click', startReview); $('#review-nav').addEventListener('click', startReview);
$('#review-dialog').addEventListener('close', () => { if ('speechSynthesis' in window) speechSynthesis.cancel(); });
document.addEventListener('keydown', e => {if(e.key === '/' && !['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName) && !document.querySelector('dialog[open]')) { e.preventDefault(); $('#search').focus(); }});
updateStorageNote(); applyZoom(); render();
