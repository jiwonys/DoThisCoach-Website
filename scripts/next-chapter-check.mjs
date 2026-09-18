import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';

const base=process.env.QA_URL||'http://127.0.0.1:4193';
const out=process.env.QA_DIR||'.impeccable/review/editorial';
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const report={matrix:0,checks:[],axe:[],errors:[]};
const sports=['general','tennis','basketball','volleyball','soccer','pickleball'];
const views=['coach','workout','athlete-week','fuel','progress'];
async function settle(page){
 await page.evaluate(async()=>{await document.fonts.ready; await Promise.all([...document.images].map(async img=>{img.loading='eager';try{await img.decode()}catch{}}));});
 await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
 await page.locator('#app-screen').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('#app-screen').complete&&document.querySelector('#app-screen').naturalWidth>0);await page.waitForTimeout(200);await page.evaluate(()=>scrollTo(0,0));
 await page.waitForTimeout(700);
}
try{
 for(const width of [360,390,768,1440]){
  const context=await browser.newContext({viewport:{width,height:width>800?1000:844}}); const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  await page.goto(base);await settle(page);
  await page.screenshot({path:`${out}/opening-${width}.png`});
  await page.screenshot({path:`${out}/page-${width}.png`,fullPage:true});
  if(width===390||width===1440){
   for(const [name,selector]of Object.entries({manifesto:'.manifesto',product:'#coach',training:'.training-section',founder:'#story',pricing:'#pricing',faq:'.faq-section',closing:'.closing'})){
    await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(150);await page.locator(selector).screenshot({path:`${out}/${name}-${width}.png`});
   }
  }
  const buttonBox=await page.locator('.hero-download-group .button').boundingBox(),disclosureBox=await page.locator('.hero-disclosure').boundingBox();assert(disclosureBox.y-(buttonBox.y+buttonBox.height)<=14,'Preview disclosure stays attached to its button');assert.equal(await page.locator('canvas').count(),0);
  const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  report.axe.push({width,violations:a.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))});
  for(const sport of sports){
   await page.locator('#your-game').evaluate(e=>e.scrollIntoView({block:'start'}));
   const scrollBefore=await page.evaluate(()=>scrollY);
   await page.locator(`button[data-sport="${sport}"]`).click();
   assert(Math.abs(await page.evaluate(()=>scrollY)-scrollBefore)<2,'Sport selection must not scroll the page');
   const resultBox=await page.locator('#sport-result-title').boundingBox();assert(resultBox.y>=0&&resultBox.y+resultBox.height<844,'Changed sport heading must be visible beside controls');
   await page.waitForFunction(s=>document.querySelector('#app-screen').src.includes(s+'-workout'),sport);
   const expected=sport==='general'?'/app/':`/app/${sport}/`;
   assert(await page.locator('[data-download]').count()>=6);
   assert((await page.locator('[data-download]').evaluateAll(es=>es.map(e=>new URL(e.href).pathname))).every(p=>p===expected));
   for(const view of views){
    await page.locator(`[data-view="${view}"]`).click();
    const file=view==='coach'?'/assets/you-can-too/coach-conversation.webp':`/assets/next-game/${sport}-${view}.webp`;
    await page.waitForFunction(src=>{const e=document.querySelector('#app-screen');return e.getAttribute('src')===src&&e.complete&&e.naturalWidth>0},file);
    assert.equal(await page.locator(`[data-view="${view}"]`).getAttribute('aria-pressed'),'true');
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));report.matrix++;
   }
  }
  await page.locator('[data-billing="yearly"]').click();assert.equal(await page.locator('[data-price]').textContent(),'$69.99');
  await page.goBack();assert.equal(await page.locator('[data-price]').textContent(),'$6.99');
  await page.locator('.faq summary').first().click();assert(await page.locator('.faq details').first().getAttribute('open')!==null);
  if(width<800){await page.locator('.menu summary').click();assert(await page.locator('.menu').getAttribute('open')!==null);await page.keyboard.press('Escape');assert.equal(await page.locator('.menu').getAttribute('open'),null);}
  await page.close();
 }
 report.checks.push('120 sport/feature/viewport combinations; six CTA routes; billing history; FAQ; mobile menu');
 const page=await browser.newPage({viewport:{width:390,height:844}});
 await page.goto(`${base}/?sport=tennis&view=workout&billing=yearly&utm_source=qa`);await settle(page);
 assert.equal(await page.locator('[data-price]').textContent(),'$69.99');
 await page.locator('button[data-sport="soccer"]').click();assert(page.url().includes('utm_source=qa'));
 await page.goBack();assert.equal(await page.locator('button[data-sport="tennis"]').getAttribute('aria-pressed'),'true');
 await page.goto(`${base}/?sport=invalid&view=invalid&billing=invalid`);await settle(page);
 assert.equal(await page.locator('button[data-sport="general"]').getAttribute('aria-pressed'),'true');
 await page.route('**/assets/next-game/tennis-workout.webp',r=>r.abort());
 await page.locator('button[data-sport="tennis"]').click();await page.locator('[data-view="workout"]').click();
 await page.waitForFunction(()=>document.querySelector('#screen-caption').textContent.includes('unavailable'));
 await page.unroute('**/assets/next-game/tennis-workout.webp');await page.locator('[data-view="workout"]').click();
 await page.waitForFunction(()=>document.querySelector('#app-screen').src.includes('tennis-workout')&&document.querySelector('#app-screen').complete);
 report.checks.push('deep links, invalid state, query preservation, nearby sport results without scrolling, failed image retry');await page.close();
 for(const mode of ['reduced','no-js']){
  const context=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:mode!=='no-js',reducedMotion:mode==='reduced'?'reduce':'no-preference'});
  const p=await context.newPage();await p.goto(base);if(mode!=='no-js')await settle(p);else await p.waitForTimeout(800);
  const photo=p.locator('.hero-photo-main img');assert(await photo.isVisible());assert(await photo.evaluate(e=>e.complete&&e.naturalWidth>0));
  assert.equal(await p.locator('canvas').count(),0);assert(await p.locator('#hero-title').isVisible());
  await p.screenshot({path:`${out}/fallback-${mode}.png`});report.checks.push(`${mode}: visible photography, CTA and product content`);await context.close();
 }
 assert.deepEqual(report.errors,[]);
 assert(report.axe.every(a=>a.violations.length===0),'Accessibility violations; see report');
}finally{fs.writeFileSync(`${out}/browser-report.json`,JSON.stringify(report,null,2));await browser.close();}
console.log(JSON.stringify(report,null,2));
