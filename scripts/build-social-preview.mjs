import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
await page.goto('http://127.0.0.1:4193');
await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));});
await page.addStyleTag({content:'.wrap{width:1040px}.header{min-height:80px}.header nav,.features,.pricing,.questions,.footer{display:none}.hero{height:550px;padding:12px 0 20px}h1{font-size:68px}.intro{font-size:19px;max-width:510px;margin-top:20px}.download-group{margin-top:20px}'});
await page.screenshot({path:'assets/you-can-too/share.jpg',type:'jpeg',quality:90});
await browser.close();
