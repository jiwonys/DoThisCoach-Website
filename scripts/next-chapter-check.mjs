import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const base=process.env.QA_URL||'http://127.0.0.1:4193';
const out=process.env.QA_DIR||'.impeccable/review/reference';
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const report={viewports:[],routes:[],errors:[],checks:[]};
try {
 for (const width of [360,390,768,1440]) {
  const context=await browser.newContext({viewport:{width,height:900}});
  const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  await page.goto(base);
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode()}));});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.equal(await page.locator('img').count(),3,'Only logo and two authentic screenshots');
  assert.equal(await page.locator('[data-download]').count(),2);
  assert.equal(await page.locator('canvas').count(),0);
  const button=await page.locator('.button').first().boundingBox(),note=await page.locator('.disclosure').boundingBox();
  assert.equal(Math.round(note.y-button.y-button.height),10);
  await page.screenshot({path:out+'/page-'+width+'.png',fullPage:true});
  await page.screenshot({path:out+'/opening-'+width+'.png'});
  await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').textContent(),'Skip to content');
  await page.keyboard.press('Enter');assert.equal(new URL(page.url()).hash,'#main');
  await page.locator('.faq summary').first().click();assert(await page.locator('.faq details').first().evaluate(e=>e.open));await page.locator('.terms summary').click();assert(await page.locator('.terms').evaluate(e=>e.open));
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  report.viewports.push({width,height:await page.evaluate(()=>document.documentElement.scrollHeight),violations:axe.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))});
  await context.close();
 }
 const context=await browser.newContext();const page=await context.newPage();
 const ppids={general:'654f8be5-8f71-488b-88f5-9a1dd46b487b',tennis:'4c8635a3-522a-41ba-a3d0-214bca0320c5',basketball:'cdf59172-8f34-4ab9-9fa3-ef33a5fc403f',volleyball:'bf00e022-ab60-403e-bc06-a2d3dbdde491',soccer:'18dd4e91-caeb-4a72-b729-1b0ee698831d',pickleball:'241f0bc6-b245-475f-a6b9-3fcf3fd96fcf'};
 for(const sport of [...Object.keys(ppids),'invalid','__proto__']){
  await page.goto(base+'/?sport='+sport+'&utm_source=qa');
  const route=sport==='general'||!Object.hasOwn(ppids,sport)?'/app/':'/app/'+sport+'/';
  assert.equal(await page.locator('[data-download]').first().getAttribute('href'),route);
  assert(page.url().includes('utm_source=qa'));
  if(Object.hasOwn(ppids,sport)){
   const html=await (await page.request.get(base+route)).text();assert(html.includes(ppids[sport]));
   let target;
   await page.route('https://apps.apple.com/**',r=>{target=r.request().url();r.fulfill({body:'App Store target verified'});});
   await page.goto(base+route);await page.waitForURL('https://apps.apple.com/**');
   assert.equal(new URL(target).searchParams.get('ppid'),ppids[sport]);
   await page.unroute('https://apps.apple.com/**');
   report.routes.push({sport,route,ppid:ppids[sport]});
  }
 }
 for (const path of ['/support.html','/privacy.html','/terms.html','/articles/','/compare/','/partner/'])assert.equal((await page.request.get(base+path)).status(),200);
 await page.goto(base);
 await page.evaluate(()=>{window.addEventListener('dothis:cta',e=>window.lastCTA=e.detail);document.querySelector('[data-download]').addEventListener('click',e=>e.preventDefault());});
 await page.locator('[data-download]').first().click();
 assert.equal(await page.evaluate(()=>window.lastCTA.event),'homepage_app_store_click');
 await context.close();
 for(const mode of ['no-js','reduced']){
  const c=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:mode!=='no-js',reducedMotion:mode==='reduced'?'reduce':'no-preference'});
  const p=await c.newPage();await p.goto(base);
  assert(await p.locator('.button').first().isVisible());assert.equal(await p.locator('[data-download]').first().getAttribute('href'),'/app/');
  await p.locator('#app-screen').scrollIntoViewIfNeeded();await p.waitForFunction(()=>document.querySelector('#app-screen').complete&&document.querySelector('#app-screen').naturalWidth===1290);
  await c.close();
 }
 const original=await sharp('docs/design/you-can-too/sources/coach-original.png').ensureAlpha().raw().toBuffer();
 const shipping=await sharp('assets/you-can-too/coach-conversation.webp').ensureAlpha().raw().toBuffer();
 assert(original.equals(shipping),'Coach pixels unchanged');
 report.checks.push('Four widths, keyboard, no overflow, disclosure gap, expandable terms, six exact App Store identifiers and redirects, invalid sport fallback, attribution query preservation, analytics event, support/legal links, no-JS, reduced motion, original Coach pixels');
 assert.equal(report.errors.length,0);assert(report.viewports.every(v=>v.violations.length===0));
} finally {fs.writeFileSync(out+'/browser-report.json',JSON.stringify(report,null,2));await browser.close();}
console.log(JSON.stringify(report,null,2));
