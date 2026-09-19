import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
await page.goto('http://127.0.0.1:4193');
await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));});
await page.addStyleTag({content:'.wrap{width:1040px}.header{min-height:90px}.header nav,.download-group,.benefits,.pricing,.footer,figcaption{display:none}.hero{grid-template-columns:1fr 225px;padding:10px 0;gap:100px}h1{font-size:76px}.intro{font-size:23px;max-width:540px}.app-proof img{border-radius:12px}'});
await page.screenshot({path:'assets/you-can-too/share.jpg',type:'jpeg',quality:90});
await browser.close();
