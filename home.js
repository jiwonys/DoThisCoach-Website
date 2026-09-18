(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const sports={general:{name:'All sports',account:'volleyball'},tennis:{name:'Tennis',account:'tennis'},basketball:{name:'Basketball',account:'basketball'},volleyball:{name:'Volleyball',account:'volleyball'},soccer:{name:'Soccer',account:'soccer'},pickleball:{name:'Pickleball',account:'pickleball'}};
  const features={
    coach:{label:'Coach',title:'Tell Coach what today looks like.',description:"Ask about training, share what's changed, and talk through your next step. Review the guidance, then decide what works for you.",points:['Bring your questions and training context.','Review a response that considers your situation.','Keep your workouts and training history together.']},
    workout:{label:'workout',title:'A little less guessing. A little more going.',description:'Generate a strength session with your sport, equipment, goals, and recent training in mind. Follow it set by set, or import a routine you already use.',points:['Tell DoThis what you want to work on.','Review your workout before you start.','Log the sets, reps, and weights you complete.']},
    'athlete-week':{label:'Athlete Week',title:'Your sport gets a place in the plan.',description:'Bring lifting, practice, game days, and recovery into the same week. Confirm your schedule and use it as context for your training.',points:['Add the days you train and play.','Update your week when life changes.','Choose the training dose that fits your day.']},
    fuel:{label:'nutrition',title:'Keep your fuel in the picture.',description:'Log meals and follow your calories and macros alongside your training. Review and adjust AI estimates, or use search, barcode scanning, and manual entry.',points:['Keep food and training in one app.','Review your daily nutrition totals.','Make your own informed adjustments.']},
    progress:{label:'progress',title:'The work counts. Keep a record.',description:'See completed workouts, logged sets, and weight trends together. Your training history gives your next session a place to start.',points:['Log what you actually complete.','Look back on your workout history.','See the patterns in your progress.']}
  };
  let sport='general',view='coach',billing='monthly',imageRequest=0;
  function readState(){const p=new URLSearchParams(location.search);sport=Object.hasOwn(sports,p.get('sport'))?p.get('sport'):'general';view=Object.hasOwn(features,p.get('view'))?p.get('view'):'coach';billing=p.get('billing')==='yearly'?'yearly':'monthly';}
  function writeState(){const url=new URL(location.href);for(const [key,value,fallback] of [['sport',sport,'general'],['view',view,'coach'],['billing',billing,'monthly']]){if(value===fallback)url.searchParams.delete(key);else url.searchParams.set(key,value);}history.pushState({},'',url);}
  function updateScreen(){
    const img=document.querySelector('#app-screen'),link=document.querySelector('#screen-link'),caption=document.querySelector('#screen-caption');
    const coach=view==='coach',source=coach?'/assets/you-can-too/coach-conversation.webp':`/assets/next-game/${sport}-${view}.webp`;
    const alt=coach?'Actual DoThis Coach conversation about active recovery with an Open Workout action':`Real DoThis ${features[view].label} screen from an example ${sports[sport].account} account`;
    const label=coach?'Actual DoThis screen · Active recovery example':`Actual DoThis screen · Example ${sports[sport].account} account`;
    const request=++imageRequest;
    function commit(){if(request!==imageRequest)return;img.src=source;img.alt=alt;img.width=coach?1290:660;img.height=coach?2796:1434;link.href=source;link.setAttribute('aria-label',`${alt} — view full size in a new tab`);caption.textContent=label;img.removeAttribute('aria-busy');}
    if(img.getAttribute('src')===source){commit();return;}
    caption.textContent='Loading app screen…';img.setAttribute('aria-busy','true');
    const next=new Image();next.onload=commit;next.onerror=()=>{if(request!==imageRequest)return;caption.textContent='Screen unavailable. Select the feature again to retry.';img.removeAttribute('aria-busy');};next.src=source;
  }
  function render(){
    document.body.dataset.sport=sport;
    document.querySelectorAll('button[data-sport]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.sport===sport)));
    document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));
    document.querySelectorAll('[data-download]').forEach(a=>a.href=sport==='general'?'/app/':`/app/${sport}/`);
    updateScreen();
    const sportCopy={general:['Your game. Your starting point.','Strength training with your sport and schedule in mind.'],tennis:['Your tennis. Your next session.','Strength work with court days, equipment, and recent training in mind.'],basketball:['Your basketball. Your next session.','Plan gym work around your time on the court.'],volleyball:['Your volleyball. Your next session.','Connect your strength training with the days you play.'],soccer:['Your soccer. Your next session.','Keep training, practice, and match days in the same conversation.'],pickleball:['Your pickleball. Your next session.','Build a gym routine around the game you keep coming back to.']};
    document.querySelector('#sport-result-title').textContent=sportCopy[sport][0];document.querySelector('#sport-result-description').textContent=sportCopy[sport][1];
    const content=features[view];document.querySelector('#proof-title').textContent=content.title;document.querySelector('#proof-description').textContent=content.description;
    document.querySelector('#feature-points').replaceChildren(...content.points.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
    document.querySelector('#selection-status').textContent=`${sports[sport].name}. ${content.title}`;
    document.querySelectorAll('[data-billing]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.billing===billing)));
    const yearly=billing==='yearly';document.querySelector('[data-price]').textContent=yearly?'$69.99':'$6.99';document.querySelector('[data-price-period]').textContent=yearly?'/ year':'/ month';document.querySelector('[data-price-detail]').textContent=yearly?'$69.99 billed yearly. Save $13.89 vs. 12 monthly payments.':'Choose Premium after your free Preview.';
  }
  document.querySelectorAll('button[data-sport]').forEach(b=>b.addEventListener('click',()=>{sport=b.dataset.sport;view='workout';writeState();render();}));
  document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.view;writeState();render();}));
  document.querySelectorAll('[data-feature]').forEach(a=>a.addEventListener('click',()=>{view=a.dataset.feature;writeState();render();}));
  document.querySelectorAll('[data-billing]').forEach(b=>b.addEventListener('click',()=>{billing=b.dataset.billing;writeState();render();}));
  addEventListener('popstate',()=>{readState();render();});
  const menu=document.querySelector('.menu');menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.open=false));
  document.addEventListener('click',event=>{if(!menu.contains(event.target))menu.open=false;});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary').focus();}});
  document.querySelector('#year').textContent=new Date().getFullYear();
  document.querySelectorAll('[data-download]').forEach(link=>link.addEventListener('click',()=>window.dispatchEvent(new CustomEvent('dothis:cta',{detail:{event:'homepage_app_store_click',sport,location:link.dataset.ctaLocation}}))));
  readState();render();
})();
