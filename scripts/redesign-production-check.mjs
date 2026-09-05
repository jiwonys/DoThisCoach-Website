import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const root=resolve(import.meta.dirname,'..');
const base=process.env.BASE_URL || 'http://127.0.0.1:4186';
let checks=0;
function check(value,message){if(!value)throw Error(message);checks++;}
const destinations=JSON.parse(await readFile(resolve(root,'docs/design/app-store-destinations.json'),'utf8')).destinations;
for(const d of destinations){
  const source=await readFile(resolve(root,d.sourceRoute.slice(1),'index.html'),'utf8');
  check(source.includes(d.ppid)&&source.includes('6771322181'),'Redirect '+d.id);
}
const browser=await chromium.launch();
try{
  for(const width of [360,390,768,1440]){
    const context=await browser.newContext({viewport:{width,height:844},reducedMotion:'reduce'});
    const page=await context.newPage();const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(base+'/',{waitUntil:'networkidle'});
    check(await page.locator('#weekGrid .day').count()===7,'Seven planner days');
    for(let day=0;day<7;day++){
      await page.locator('#weekGrid .day').nth(day).click();
      check(await page.locator('.day[aria-pressed=true]').count()===1,'One selected game day');
      check(await page.locator('#weekGrid .day').nth(day).getAttribute('aria-pressed')==='true','Chosen day '+day);
      check(await page.locator('.day.primer').count()===1 && await page.locator('.day.recover').count()===1,'Primer and recovery preserved');
    }
    await page.locator('.site-menu summary').click();
    for(const text of ['Your Week','Features','Coach','Pricing','Training Library','Compare','Partners','Support','Privacy','Terms']){
      check(await page.locator('.site-menu-links').getByRole('link',{name:text,exact:true}).isVisible(),'Menu link '+text);
    }
    await page.keyboard.press('Escape');
    check(await page.locator('.site-menu').getAttribute('open')===null,'Escape dismisses navigation');
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No page overflow');
    const axe=await new AxeBuilder({page}).analyze();
    check(!axe.violations.some(v=>['serious','critical'].includes(v.impact)),'No serious/critical axe findings');
    check(errors.length===0,'No script errors');
    await context.close();
  }
  const context=await browser.newContext();
  const page=await context.newPage();
  for(const d of destinations){
    await page.goto(base+'/?sport='+d.id+'&private=test',{waitUntil:'networkidle'});
    const links=await page.locator('[data-download]').evaluateAll(elements=>elements.map(el=>({pathname:new URL(el.href).pathname,search:new URL(el.href).search})));
    check(links.length===6 && links.every(link=>link.pathname===d.sourceRoute && !link.search),'Correct acquisition '+d.id);
  }
  await page.goto(base+'/?sport=unknown',{waitUntil:'networkidle'});
  check(await page.locator('[data-download]').first().getAttribute('href')==='/app/','Unknown sport fallback');
  for(const path of ['/articles/','/compare/','/partner/','/support.html','/privacy.html','/terms.html']){
    check((await page.request.get(base+path)).ok(),'Existing page reachable '+path);
  }
  await context.close();
  const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const fallback=await noJS.newPage();await fallback.goto(base+'/');
  check(await fallback.locator('.problem .sec-head').isVisible(),'No-JS content remains visible');
  await fallback.locator('.site-menu summary').click();
  check(await fallback.locator('.site-menu-links').isVisible(),'No-JS navigation works');
  await noJS.close();
  console.log('PASS supplied teal homepage: '+checks+' checks');
}finally{await browser.close();}
