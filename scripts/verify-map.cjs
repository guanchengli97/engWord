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
 // Native fullscreen and full-window fallback keep the map and dialogs interactive.
 const originalViewportHeight=await page.locator('#map-viewport').evaluate(n=>n.clientHeight);
 await page.locator('#map-fullscreen').click();
 await page.waitForFunction(()=>document.fullscreenElement===document.getElementById('map-panel'));
 await frame();
 assert.equal(await page.locator('#map-fullscreen').getAttribute('aria-pressed'),'true');
 assert.ok(await page.locator('#map-viewport').evaluate(n=>n.clientHeight)>originalViewportHeight);
 await page.locator('#word-grid [data-detail]').first().click();
 assert.ok(await page.locator('#detail-dialog').isVisible());
 await page.locator('[data-close="detail-dialog"]').click();
 await page.locator('#zoom-in').click();await frame();
 assert.deepEqual(await page.evaluate(()=>Object.fromEntries(words.map(w=>[w.id,positionOf(w)]))),positions);
 await page.locator('#map-fullscreen').click();
 await page.waitForFunction(()=>!document.fullscreenElement);await frame();
 assert.equal(await page.locator('#map-fullscreen').getAttribute('aria-pressed'),'false');
 // Browser-controlled exits also update the button.
 await page.locator('#map-fullscreen').click();await page.evaluate(()=>document.exitFullscreen());await frame();
 assert.equal(await page.locator('#map-fullscreen').getAttribute('aria-pressed'),'false');
 await page.evaluate(()=>{document.getElementById('map-panel').requestFullscreen=()=>Promise.reject(new Error('Unsupported'));});
 await page.setViewportSize({width:390,height:844});
 await page.locator('#map-fullscreen').click();await frame();
 assert.ok(await page.locator('#map-panel').evaluate(n=>n.classList.contains('map-fullscreen')));
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.ok(await page.locator('#map-viewport').evaluate(n=>n.clientHeight)>200);
 await page.keyboard.press('Escape');await frame();
 assert.equal(await page.locator('#map-fullscreen').getAttribute('aria-pressed'),'false');
 assert.equal(await page.evaluate(()=>document.body.classList.contains('map-fullscreen-open')),false);
 await page.setViewportSize({width:1440,height:1000});await frame();
 console.log('PASS: native fullscreen, exit synchronization, word details, fixed coordinates, mobile fallback and Escape.');

 // Every occupied row belongs to one theme and uses the fixed 20 columns.
 const geometry=await page.evaluate(()=>{
   const rows=new Map();
   for(const word of words){const cell=mapLayout.byId.get(word.id);if(!rows.has(cell.row))rows.set(cell.row,[]);rows.get(cell.row).push({column:cell.column,category:word.category});}
   return {columns:mapLayout.columns,groups:mapLayout.groups.length,valid:[...rows.values()].every(c=>c.length<=20&&new Set(c.map(w=>w.category)).size===1&&new Set(c.map(w=>w.column)).size===c.length),placed:mapLayout.byId.size};
 });
 assert.deepEqual(geometry,{columns:20,groups:16,valid:true,placed:10048});
 const firstRow=await page.evaluate(()=>{const a=mapLayout.groups[0].ids.slice(0,21).map(id=>positionOf(wordById.get(id)));return {a:a[0],b:a[19],c:a[20]};});
 assert.equal(firstRow.a.y,firstRow.b.y);assert.ok(firstRow.c.y>firstRow.b.y);assert.equal(firstRow.c.x,firstRow.a.x);
 // One camera straddles adjacent themes, without pages or hard movement boundaries.
 await page.evaluate(()=>{zoom=.3;const work=words.filter(w=>w.category==='work').sort((a,b)=>mapLayout.orderOf(a)-mapLayout.orderOf(b));const home=words.find(w=>w.category==='housing');camera.y=viewport.clientHeight/2-(positionOf(work.at(-1)).y+positionOf(home).y+mapLayout.height)/2*zoom;camera.x=0;applyZoom();});await frame();
 const visibleThemes=await page.evaluate(()=>[...new Set(wordsInView().map(w=>w.category))]);assert.ok(visibleThemes.includes('work')&&visibleThemes.includes('housing'));
 const previous=await page.evaluate(()=>camera.y);await page.locator('#map-viewport').dispatchEvent('wheel',{deltaY:500,bubbles:true,cancelable:true});await frame();assert.ok(await page.evaluate(()=>camera.y)<previous);
 assert.ok(await page.locator('#word-grid .word-card').count()<=300);
 // Entire map can fit, using canvas rather than 10k DOM nodes.
 await page.locator('#zoom-fit').click();await frame();assert.ok(await page.evaluate(()=>zoom<.01));assert.equal(await page.locator('#word-grid .word-card').count(),0);assert.ok(await page.locator('#map-canvas').isVisible());
 assert.equal(await page.evaluate(()=>wordsInView().length),10048);assert.equal(await page.locator('#zoom-fit').getAttribute('aria-pressed'),'true');
 await page.screenshot({path:path.join(tmpdir(),'word-garden-continuous-overview.png')});
 // Clicking a tiny word zooms into its real position.
 await page.evaluate(()=>{const w=words.find(w=>w.slot===5000),p=positionOf(w),r=viewport.getBoundingClientRect();viewport.dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:r.left+viewport.clientLeft+(p.x+140)*zoom+camera.x,clientY:r.top+viewport.clientTop+(p.y+105)*zoom+camera.y}));});await frame();assert.ok(await page.evaluate(()=>zoom>=.7));assert.ok(await page.evaluate(()=>wordsInView().some(w=>Math.abs(w.slot-5000)<30)));
 // Offscreen nodes unload; a reused in-view cell is not replaced on tiny pans.
 const retained=await page.locator('#word-grid .word-card').first().getAttribute('data-word-id');await page.locator('#word-grid .word-card').first().evaluate(n=>n.dataset.testIdentity='retained');await page.evaluate(()=>{camera.y-=1;paintCamera()});await frame();assert.equal(await page.locator(`[data-word-id="${retained}"]`).getAttribute('data-test-identity'),'retained');
 await page.locator('#map-viewport').focus();await page.keyboard.press('End');await frame();assert.ok(await page.evaluate(()=>wordsInView().some(w=>w.id===matchedWords.at(-1).id)));assert.ok(await page.locator('#word-grid .word-card').count()<=300);
 await page.keyboard.press('Home');await frame();assert.ok(await page.evaluate(()=>wordsInView().some(w=>w.id===matchedWords[0].id)));
 // Minimap locates a word in both axes on the grouped map.
 const miniPoint=await page.evaluate(()=>{const w=words[5000],p=positionOf(w),r=minimap.getBoundingClientRect();return {x:r.left+(p.x+140)/worldWidth*r.width,y:r.top+(p.y+105)/worldHeight*r.height};});
 await page.mouse.click(miniPoint.x,miniPoint.y);await frame();assert.ok(await page.evaluate(()=>wordsInView().some(w=>Math.abs(w.slot-5000)<30)));
 // Full library search and match navigation retain world positions.
 await page.locator('#search').fill('copay');await frame();assert.ok(await page.evaluate(()=>matchedWords.some(w=>w.word==='copay')));assert.ok(await page.evaluate(()=>wordsInView().some(w=>w.word==='copay')));
 await page.locator('#word-grid [data-detail]').first().click();assert.ok(await page.locator('#detail-dialog').isVisible());await page.locator('#detail-content [data-toggle]').click();await page.locator('[data-close="detail-dialog"]').click();assert.equal(await page.evaluate(()=>known.size),1);
 await page.locator('#search').fill('work');await frame();assert.ok(await page.locator('#search-navigation').isVisible());await page.locator('#match-next').click();await frame();assert.equal(await page.evaluate(()=>searchMatchIndex),1);assert.ok(await page.evaluate(()=>wordsInView().some(w=>w.id===matchedWords[1].id)));
 await page.locator('#search').fill('not-a-real-word-000');assert.ok(await page.locator('#empty-state').isVisible());await page.locator('#clear-filters').click();await frame();
 await page.locator('#study-level').selectOption('practical');await frame();assert.equal(await page.evaluate(()=>matchedWords.length),134);await page.locator('#scope-review').click();assert.ok(await page.evaluate(()=>reviewQueue.every(w=>w.level==='practical')));await page.locator('[data-close="review-dialog"]').click();
 await page.locator('#all-nav').click();await frame();
 for(const z of [.002,.08,.14,.25,.5,1,1.5]){await page.evaluate(z=>setZoom(z),z);await frame();assert.ok(await page.locator('#word-grid .word-card').count()<=300);assert.deepEqual(await page.evaluate(()=>Object.fromEntries(words.map(w=>[w.id,positionOf(w)]))),positions);}
 // Precise pointer-centered zoom in the interior.
 await page.evaluate(()=>{zoom=.7;const target=words.find(w=>w.category==='general'&&mapLayout.byId.get(w.id).row===mapLayout.groups.find(g=>g.category==='general').startRow+10&&mapLayout.byId.get(w.id).column===10);centerWord(target);applyZoom()});await frame();const anchor={x:500,y:300};const before=await page.evaluate(p=>({x:(p.x-camera.x)/zoom,y:(p.y-camera.y)/zoom}),anchor);await page.evaluate(p=>setZoom(.9,p),anchor);await frame();const after=await page.evaluate(p=>({x:(p.x-camera.x)/zoom,y:(p.y-camera.y)/zoom}),anchor);assert.ok(Math.abs(before.x-after.x)<.01&&Math.abs(before.y-after.y)<.01);
 await page.screenshot({path:path.join(tmpdir(),'word-garden-continuous-detail.png')});
 // All records retain slots through adding and reloading.
 await page.locator('#add-word').click();await page.locator('[name="word"]').fill('newcontinuousword');await page.locator('[name="meaning"]').fill('连续地图新词');await page.locator('[name="category"]').selectOption('food');await page.locator('[type="submit"]').click();await frame();assert.equal(await page.evaluate(()=>words.at(-1).slot),10048);
 const stableAfterAdd=await page.evaluate(()=>Object.fromEntries(words.filter(w=>w.slot<10048).map(w=>[w.id,positionOf(w)])));assert.deepEqual(stableAfterAdd,positions);
 assert.ok(await page.evaluate(()=>{const cell=mapLayout.byId.get(words.at(-1).id),g=mapLayout.groups.find(g=>g.category==='food');return cell.row>=g.startRow&&cell.row<g.startRow+g.rows}));
 const newPosition=await page.evaluate(()=>positionOf(words.at(-1)));
 const viewSaved=await page.evaluate(()=>({zoom,...camera}));await page.reload({waitUntil:'domcontentloaded'});await frame();assert.equal(await page.evaluate(()=>words.length),10049);assert.equal(await page.evaluate(()=>known.size),1);assert.deepEqual(await page.evaluate(()=>({zoom,...camera})),viewSaved);assert.deepEqual(await page.evaluate(()=>positionOf(words.at(-1))),newPosition);
 for(const width of [390,768,1024,1440]){await page.setViewportSize({width,height:900});await frame();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.ok(await page.locator('#word-grid .word-card').count()<=300);}
 await page.setViewportSize({width:390,height:844});await page.locator('#search').fill('copay');await frame();await page.screenshot({path:path.join(tmpdir(),'word-garden-continuous-mobile.png')});
 assert.deepEqual(errors,[]);console.log('PASS: 20 total columns, grouped themes, continuous panning, bounded DOM & node reuse, full-map canvas, hit testing, minimap, Home/End, search navigation, status/review, all zoom positions stable, pointer anchor, persistence, responsive viewports, no JS errors.');
 await context.close();
 // The authorized regrouping preserves learning records and gives old custom words a theme location.
 const migration=await browser.newContext({viewport:{width:1440,height:1000}});await migration.addInitScript(()=>{if(!localStorage.getItem('word-garden-v1'))localStorage.setItem('word-garden-v1',JSON.stringify({known:['seed-0','legacy-custom'],zoom:.5,groupedMap:{version:2,rows:20,groups:[]},studyRegion:2,view:{x:0,y:-2300},custom:[{id:'legacy-custom',word:'legacyword',ipa:'/test/',pos:'n.',meaning:'旧词',example:'Old word.',category:'daily'}]}));});const old=await migration.newPage();await old.goto(pageURL,{waitUntil:'domcontentloaded'});assert.equal(await old.evaluate(()=>wordById.get('legacy-custom').slot),48);assert.equal(await old.evaluate(()=>known.size),2);assert.equal(await old.evaluate(()=>mapLayout.byId.size),10049);assert.equal(await old.evaluate(()=>JSON.parse(localStorage.getItem('word-garden-v1')).groupedMap.version),3);assert.equal(await old.evaluate(()=>mapLayout.wordAt(mapLayout.byId.get('legacy-custom').column,mapLayout.byId.get('legacy-custom').row).category),'daily');assert.ok(await old.locator('#word-grid .word-card').count()>0);console.log('PASS: legacy progress and custom words migrated to the grouped layout.');await migration.close();
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
