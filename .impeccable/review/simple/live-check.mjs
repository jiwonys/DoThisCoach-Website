import {chromium} from '@playwright/test';import fs from 'node:fs';import assert from 'node:assert/strict';
const release=process.env.RELEASE;assert(release);
const origin='https://dothiscoach.com';const out='.impeccable/review/simple';
const normalize=s=>s.replaceAll('\r\n','\n').trim();
const report={release,files:[],viewports:[],errors:[]};
for(const path of ['index.html','home.css','home.js']) {
 const url=origin+'/'+(path==='index.html'?'':path)+'?release='+release;
 const response=await fetch(url);assert.equal(response.status,200);
 assert.equal(normalize(await response.text()),normalize(fs.readFileSync(path,'utf8')),path+' live content');
 report.files.push(path);
}
const response=await fetch(origin+'/assets/you-can-too/coach-conversation.webp?release='+release);
assert(Buffer.from(await response.arrayBuffer()).equals(fs.readFileSync('assets/you-can-too/coach-conversation.webp')));
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 for(const width of [390,1440]) {
  const p=await browser.newPage({viewport:{width,height:900}});
  p.on('pageerror',e=>report.errors.push(e.message));await p.goto(origin+'/?release='+release);
  await p.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));});
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.equal(await p.locator('img').count(),2);
  assert.equal(await p.locator('[data-download]').getAttribute('href'),'/app/');
  assert.equal(await p.locator('body').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(11, 16, 14)');
  await p.screenshot({path:out+'/live-'+width+'.png',fullPage:true});report.viewports.push(width);await p.close();
 }
 assert.deepEqual(report.errors,[]);
}finally{await browser.close();}
fs.writeFileSync(out+'/live-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
