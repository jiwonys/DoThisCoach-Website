async (page, base = 'http://127.0.0.1:4339') => {
  const checks = [], errors = [], failures = [];
  const check = (condition, label) => { checks.push(label); if (!condition) throw Error(label); };
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) failures.push({url:response.url(),status:response.status()}); });
  const sports = ['general','tennis','basketball','volleyball','pickleball','soccer'];
  const features = ['workout','fuel','athlete-week','coach','progress'];
  const axeResults = [];
  for (const width of [360,390,768,1440]) {
    await page.setViewportSize({width,height:900});
    await page.goto(base+'/');
    await page.evaluate(()=>document.fonts.ready);
    check(await page.evaluate(()=>['main','beyond','your-game','inside','pricing'].every(id=>document.getElementById(id))&&document.querySelectorAll('.principles a').length===3),'complete homepage sections '+width);
    for (const sport of sports) {
      await page.locator('button[data-sport="'+sport+'"]').click();
      for (const feature of features) {
        await page.locator('[data-view="'+feature+'"]').click();
        await page.waitForFunction(()=>{const i=document.querySelector('#app-screen');return i.complete&&i.naturalWidth>0;});
        const state=await page.evaluate(({sport,feature})=>({
          overflow:document.documentElement.scrollWidth>innerWidth,
          selected:document.querySelector('button[data-sport="'+sport+'"]').getAttribute('aria-pressed'),
          view:document.querySelector('[data-view="'+feature+'"]').getAttribute('aria-pressed'),
          routes:[...document.querySelectorAll('[data-download]')].map(a=>a.getAttribute('href')),
          screen:document.querySelector('#app-screen').getAttribute('src'),
          link:document.querySelector('#screen-link').getAttribute('href'),
          bodyPressed:document.body.hasAttribute('aria-pressed'),
          caption:document.querySelector('#screen-caption').textContent,
          poster:document.querySelector('#poster').getAttribute('src'),
        }),{sport,feature});
        check(!state.overflow && state.selected==='true' && state.view==='true' && !state.bodyPressed && state.routes.every(x=>x===(sport==='general'?'/app/':'/app/'+sport+'/')) && state.screen.endsWith(sport+'-'+feature+'.webp') && state.link.endsWith(sport+'-'+feature+'.webp') && state.caption.includes(sport==='general'?'volleyball':sport),`${width}:${sport}:${feature}`);
      }
    }
    await page.locator('[data-billing="yearly"]').click();
    check((await page.locator('[data-price]').textContent())==='$69.99' && (await page.locator('[data-price-detail]').textContent()).includes('$13.89'),`${width}:yearly billing`);
    await page.locator('[data-billing="monthly"]').click();
    check((await page.locator('[data-price]').textContent())==='$6.99',`${width}:monthly billing`);
    await page.locator('.faq summary').first().click();check(await page.locator('.faq details').first().evaluate(e=>e.open),`${width}:FAQ expands`);
    if(width<900){
      await page.evaluate(()=>window.scrollTo(0,0));await page.locator('.mobile-menu summary').click();
      check(await page.locator('.mobile-menu').evaluate(e=>e.open),`${width}:menu opens`);
      await page.keyboard.press('Escape');check(!(await page.locator('.mobile-menu').evaluate(e=>e.open)),`${width}:Escape closes menu`);
      await page.locator('.mobile-menu summary').click();await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Membership',exact:true}).click();check(!(await page.locator('.mobile-menu').evaluate(e=>e.open)),`${width}:menu link closes`);
    }
    await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
    const axe = await page.evaluate(async()=>{const r=await axe.run();return r.violations.map(x=>({id:x.id,impact:x.impact,nodes:x.nodes.map(n=>n.target)}));});
    axeResults.push({width,violations:axe});check(axe.length===0,`${width}:axe`);
  }
  await page.goto(base+'/?sport=unknown&view=unknown&utm_source=keep');
  check(await page.locator('button[data-sport="general"]').getAttribute('aria-pressed')==='true','invalid sport fallback');
  await page.locator('button[data-sport="tennis"]').click();await page.locator('[data-view="coach"]').click();await page.locator('button[data-sport="soccer"]').click();await page.goBack();
  check(await page.locator('button[data-sport="tennis"]').getAttribute('aria-pressed')==='true','history restores sport');
  await page.reload();check(await page.locator('[data-view="coach"]').getAttribute('aria-pressed')==='true','reload restores feature');check(page.url().includes('utm_source=keep'),'page attribution preserved');
  await page.evaluate(()=>window.scrollTo(0,0));await page.waitForFunction(()=>document.querySelector('#hero-video').readyState>=2);
  await page.getByRole('button',{name:'Pause film — hero',exact:true}).click();check(await page.locator('#hero-video').evaluate(v=>v.paused),'pause control');
  await page.getByRole('button',{name:'Play film — hero',exact:true}).click();await page.waitForFunction(()=>!document.querySelector('#hero-video').paused);
  await page.locator('#pricing').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('#hero-video').paused);check(true,'offscreen movie pauses');
  await page.emulateMedia({reducedMotion:'reduce'});await page.reload();
  const reduced=await page.locator('video').evaluateAll(vs=>vs.every(v=>v.paused&&!v.getAttribute('src')));check(reduced,'reduced motion unloads films');
  check(await page.locator('#motion').isDisabled(),'reduced-motion control state');
  await page.keyboard.press('Tab');check(await page.evaluate(()=>document.activeElement.classList.contains('skip')),'keyboard skip link first');
  await page.emulateMedia({reducedMotion:'no-preference'});
  const fallbackContext=await page.context().browser().newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const fallback=await fallbackContext.newPage();await fallback.goto(base+'/');
  check(await fallback.locator('h1').isVisible() && await fallback.getByRole('link',{name:'Build my game'}).isVisible(),'no-JS headline and acquisition');
  check(!(await fallback.locator('.sports').isVisible()) && !(await fallback.locator('.features').isVisible()),'no-JS hides inactive selectors');
  await fallback.locator('.faq summary').first().click();check(await fallback.locator('.faq details').first().evaluate(e=>e.open),'no-JS FAQ');await fallbackContext.close();
  check(errors.length===0,'no browser page errors');check(failures.length===0,'no failed local resource responses');
  return {passed:checks.length,checks,axeResults,errors,failures};
}
