import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const root=resolve(import.meta.dirname,'..');
const base=process.env.BASE_URL || 'http://127.0.0.1:4174';
const destinations=JSON.parse(await readFile(resolve(root,'docs/design/app-store-destinations.json'),'utf8')).destinations;
let count=0;
function check(pass,message){if(!pass)throw Error(message);count++;}
const browser=await chromium.launch();
try{
  for(const destination of destinations){
    const source=await readFile(resolve(root,destination.sourceRoute.slice(1),'index.html'),'utf8');
    check(source.includes(destination.ppid),destination.id+': custom page ID preserved');
    check(source.includes('6771322181') && source.includes('location.replace') && source.includes('http-equiv="refresh"'),destination.id+': redirect fallbacks preserved');
  }
  for(const viewport of [{width:360,height:800},{width:390,height:650},{width:768,height:1024},{width:1440,height:1000}]){
    const context=await browser.newContext({viewport,reducedMotion:'reduce'});
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(base+'/',{waitUntil:'networkidle'});
    await page.locator('.stage.ready').waitFor();
    check(await page.locator('h1').isVisible(),'Hero visible');
    check(await page.locator('.offer').isVisible(),'Founder offer visible');
    check(await page.locator('meta[name=robots][content=noindex]').count()===0,'Homepage indexable');
    for(const destination of destinations){
      await page.locator('button[data-sport='+destination.id+']').click();
      check(await page.locator('button[data-sport='+destination.id+']').getAttribute('aria-pressed')==='true','Sport state '+destination.id);
      const paths=await page.locator('[data-download]').evaluateAll(links=>links.map(link=>new URL(link.href).pathname));
      check(paths.length===3 && paths.every(path=>path===destination.sourceRoute),'Acquisition '+destination.id);
      check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No overflow '+viewport.width);
    }
    await page.goBack();
    check(new URL(page.url()).searchParams.get('sport')==='tennis','History query restored');
    check(await page.locator('button[data-sport=tennis]').getAttribute('aria-pressed')==='true','History selection restored');
    await page.reload({waitUntil:'networkidle'});
    check(await page.locator('button[data-sport=tennis]').getAttribute('aria-pressed')==='true','Reload selection restored');
    await page.goto(base+'/?sport=invalid&private=test',{waitUntil:'networkidle'});
    check(await page.locator('button[data-sport=general]').getAttribute('aria-pressed')==='true','Invalid sport falls back');
    check((await page.locator('[data-download]').first().getAttribute('href'))==='/app/','No arbitrary query forwarding');
    if(viewport.width<=1150){
      await page.locator('.mobile-menu summary').click();
      const menu=page.getByRole('navigation',{name:'Mobile navigation',exact:true});
      for(const label of ['Method','Inside','Sports','Training library','Compare','Pricing','Partners','Support','Privacy','Terms']){
        check(await menu.getByRole('link',{name:label,exact:true}).isVisible(),'Mobile link '+label);
      }
      await page.keyboard.press('Escape');
      check(await page.locator('.mobile-menu').getAttribute('open')===null,'Escape closes menu');
      await page.locator('.mobile-menu summary').click();
      await menu.getByRole('link',{name:'Pricing',exact:true}).click();
      check(await page.locator('.mobile-menu').getAttribute('open')===null,'Link closes menu');
      check(new URL(page.url()).hash==='#pricing','Pricing anchor navigates');
    }
    for(const path of ['/articles/','/compare/','/partner/','/support.html','/privacy.html','/terms.html']){
      check(await page.locator('footer a[href="'+path+'"]').count()===1,'Footer destination '+path);
    }
    const violations=(await new AxeBuilder({page}).analyze()).violations.filter(v=>['serious','critical'].includes(v.impact));
    check(violations.length===0,'Axe: '+JSON.stringify(violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))));
    check(errors.length===0,'Script errors: '+errors.join(';'));
    await context.close();
  }
  const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page=await noJS.newPage();await page.goto(base+'/');
  check(await page.locator('h1').isVisible(),'No-JS text');
  check(await page.locator('.stage>img').isVisible(),'No-JS logo fallback');
  await page.locator('.mobile-menu summary').click();
  check(await page.getByRole('navigation',{name:'Mobile navigation'}).isVisible(),'No-JS mobile menu');
  await noJS.close();
  const failed3D=await browser.newContext();
  const fallback=await failed3D.newPage();
  await fallback.route('**/three.min.js',route=>route.abort());
  await fallback.goto(base+'/',{waitUntil:'networkidle'});
  check(await fallback.locator('.stage>img').isVisible(),'3D failure fallback');
  await failed3D.close();
  console.log('PASS Own the Court: '+count+' checks');
}finally{await browser.close();}
