// Browser regression checks; requires Playwright and Google Chrome.
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {tmpdir}=require('node:os');
const pageURL=pathToFileURL(path.join(__dirname,'..','index.html')).href;
const {chromium}=require('playwright');const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pageURL,{waitUntil:'domcontentloaded'});
 const frame=()=>page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await frame();
 assert.equal(await page.evaluate(()=>words.length),10048);assert.equal(await page.locator('#map-region').count(),0);
 assert.ok(await page.locator('#word-grid .word-card').count()<100);
 const positions=await page.evaluate(()=>Object.fromEntries(words.map(w=>[w.id,positionOf(w)])));
 // Put the old 60-word boundary in the center of a single camera.
 await page.evaluate(()=>{zoom=.7;camera.y=viewport.clientHeight/2-2300*zoom;applyZoom()});await frame();
 const slots=await page.locator('#word-grid .word-card').evaluateAll(nodes=>nodes.map(n=>wordById.get(n.dataset.wordId).slot));assert.ok(slots.includes(59)&&slots.includes(60));
 const previous=await page.evaluate(()=>camera.y);await page.locator('#map-viewport').dispatchEvent('wheel',{deltaY:500,bubbles:true,cancelable:true});await frame();assert.ok(await page.evaluate(()=>camera.y)<previous);
 const slotsAfter=await page.locator('#word-grid .word-card').evaluateAll(nodes=>nodes.map(n=>wordById.get(n.dataset.wordId).slot));assert.ok(Math.max(...slotsAfter)>Math.max(...slots));assert.ok(slotsAfter.length<250);
 // Entire map can fit, using canvas rather than 10k DOM nodes.
 await page.locator('#zoom-fit').click();await frame();assert.ok(await page.evaluate(()=>zoom<.01));assert.equal(await page.locator('#word-grid .word-card').count(),0);assert.ok(await page.locator('#map-canvas').isVisible());
 assert.equal(await page.evaluate(()=>wordsInView().length),10048);assert.equal(await page.locator('#zoom-fit').getAttribute('aria-pressed'),'true');
 await page.screenshot({path:path.join(tmpdir(),'word-garden-continuous-overview.png')});
 // Clicking a tiny word zooms into its real position.
 await page.evaluate(()=>{const w=words.find(w=>w.slot===5000),p=positionOf(w),r=viewport.getBoundingClientRect();viewport.dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:r.left+viewport.clientLeft+(p.x+140)*zoom+camera.x,clientY:r.top+viewport.clientTop+(p.y+105)*zoom+camera.y}));});await frame();assert.ok(await page.evaluate(()=>zoom>=.7));assert.ok(await page.evaluate(()=>wordsInView().some(w=>Math.abs(w.slot-5000)<30)));
 // Offscreen nodes unload; a reused in-view cell is not replaced on tiny pans.
 const retained=await page.locator('#word-grid .word-card').first().getAttribute('data-word-id');await page.locator('#word-grid .word-card').first().evaluate(n=>n.dataset.testIdentity='retained');await page.evaluate(()=>{camera.y-=1;paintCamera()});await frame();assert.equal(await page.locator(`[data-word-id="${retained}"]`).getAttribute('data-test-identity'),'retained');
 await page.locator('#map-viewport').focus();await page.keyboard.press('End');await frame();assert.ok(await page.evaluate(()=>wordsInView().some(w=>w.slot===10047)));assert.ok(await page.locator('#word-grid .word-card').count()<250);
 await page.keyboard.press('Home');await frame();assert.ok(await page.evaluate(()=>wordsInView().some(w=>w.slot===0)));
 // Minimap reaches the middle, unrestricted by old pages.
 await page.locator('#map-minimap').click({position:{x:27,y:82}});await frame();assert.ok(await page.evaluate(()=>wordsInView().some(w=>w.slot>4900&&w.slot<5200)));
 // Full library search and match navigation retain world positions.
 await page.locator('#search').fill('copay');await frame();assert.ok(await page.evaluate(()=>matchedWords.some(w=>w.word==='copay')));assert.ok(await page.evaluate(()=>wordsInView().some(w=>w.word==='copay')));
 await page.locator('#word-grid [data-detail]').first().click();assert.ok(await page.locator('#detail-dialog').isVisible());await page.locator('#detail-content [data-toggle]').click();await page.locator('[data-close="detail-dialog"]').click();assert.equal(await page.evaluate(()=>known.size),1);
 await page.locator('#search').fill('work');await frame();assert.ok(await page.locator('#search-navigation').isVisible());await page.locator('#match-next').click();await frame();assert.equal(await page.evaluate(()=>searchMatchIndex),1);assert.ok(await page.evaluate(()=>wordsInView().some(w=>w.id===matchedWords[1].id)));
 await page.locator('#search').fill('not-a-real-word-000');assert.ok(await page.locator('#empty-state').isVisible());await page.locator('#clear-filters').click();await frame();
 await page.locator('#study-level').selectOption('practical');await frame();assert.equal(await page.evaluate(()=>matchedWords.length),134);await page.locator('#scope-review').click();assert.ok(await page.evaluate(()=>reviewQueue.every(w=>w.level==='practical')));await page.locator('[data-close="review-dialog"]').click();
 await page.locator('#all-nav').click();await frame();
 for(const z of [.002,.08,.14,.25,.5,1,1.5]){await page.evaluate(z=>setZoom(z),z);await frame();assert.ok(await page.locator('#word-grid .word-card').count()<250);assert.deepEqual(await page.evaluate(()=>Object.fromEntries(words.map(w=>[w.id,positionOf(w)]))),positions);}
 // Precise pointer-centered zoom in the interior.
 await page.evaluate(()=>{zoom=.7;centerWord(words[5000]);applyZoom()});await frame();const anchor={x:500,y:300};const before=await page.evaluate(p=>({x:(p.x-camera.x)/zoom,y:(p.y-camera.y)/zoom}),anchor);await page.evaluate(p=>setZoom(.9,p),anchor);await frame();const after=await page.evaluate(p=>({x:(p.x-camera.x)/zoom,y:(p.y-camera.y)/zoom}),anchor);assert.ok(Math.abs(before.x-after.x)<.01&&Math.abs(before.y-after.y)<.01);
 await page.screenshot({path:path.join(tmpdir(),'word-garden-continuous-detail.png')});
 // All records retain slots through adding and reloading.
 await page.locator('#add-word').click();await page.locator('[name="word"]').fill('newcontinuousword');await page.locator('[name="meaning"]').fill('连续地图新词');await page.locator('[type="submit"]').click();await frame();assert.equal(await page.evaluate(()=>words.at(-1).slot),10048);
 const viewSaved=await page.evaluate(()=>({zoom,...camera}));await page.reload({waitUntil:'domcontentloaded'});await frame();assert.equal(await page.evaluate(()=>words.length),10049);assert.equal(await page.evaluate(()=>known.size),1);assert.deepEqual(await page.evaluate(()=>({zoom,...camera})),viewSaved);
 for(const width of [390,768,1024,1440]){await page.setViewportSize({width,height:900});await frame();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.ok(await page.locator('#word-grid .word-card').count()<250);}
 await page.setViewportSize({width:390,height:844});await page.locator('#search').fill('copay');await frame();await page.screenshot({path:path.join(tmpdir(),'word-garden-continuous-mobile.png')});
 assert.deepEqual(errors,[]);console.log('PASS: uninterrupted boundary crossing, bounded DOM & node reuse, full-map canvas, hit testing, minimap, Home/End, search navigation, status/review, all zoom positions stable, pointer anchor, persistence, responsive viewports, no JS errors.');
 await context.close();
 // Migrate the previous regional view and an older custom card without moving either.
 const migration=await browser.newContext({viewport:{width:1440,height:1000}});await migration.addInitScript(()=>{if(!localStorage.getItem('word-garden-v1'))localStorage.setItem('word-garden-v1',JSON.stringify({known:['seed-0','legacy-custom'],zoom:.5,studyRegion:2,view:{x:0,y:-2300},custom:[{id:'legacy-custom',word:'legacyword',ipa:'/test/',pos:'n.',meaning:'旧词',example:'Old word.',category:'daily'}]}));});const old=await migration.newPage();await old.goto(pageURL,{waitUntil:'domcontentloaded'});assert.equal(await old.evaluate(()=>wordById.get('legacy-custom').slot),48);assert.equal(await old.evaluate(()=>known.size),2);assert.equal(await old.evaluate(()=>camera.y),-2300);assert.ok(await old.locator('#word-grid .word-card').count()>0);console.log('PASS: prior region state and legacy custom position migration.');await migration.close();
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
