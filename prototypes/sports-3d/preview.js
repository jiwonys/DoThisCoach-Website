(() => {
  'use strict';
  const descriptions = {
    general: ['One week. All your training.', 'Every game starts with the work.'],
    soccer: ['Strength around match day.', 'Bring your strength to the field.'],
    basketball: ['Your lift knows game night.', 'Be ready for the next possession.'],
    pickleball: ['Training around court time.', 'Stay ready for one more game.'],
    tennis: ['Your week. Your next match.', 'Make the next point yours.'],
    volleyball: ['Strength around your sport.', 'Bring more to the next rally.']
  };
  const buttons = [...document.querySelectorAll('[data-sport]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let updateCourt = () => {};
  function select(requested, updateURL = true) {
    const sport = Object.hasOwn(descriptions, requested) ? requested : 'general';
    document.body.dataset.sport = sport;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.sport === sport)));
    document.querySelector('[data-scene-label]').textContent = descriptions[sport][0];
    document.querySelector('[data-sport-detail]').textContent = descriptions[sport][1];
    document.querySelectorAll('[data-download]').forEach(link => { link.href = sport === 'general' ? '/app/' : `/app/${sport}/`; });
    const athlete = document.querySelector('[data-athlete]');
    if (athlete) { athlete.src = `/assets/awakening/${sport}.webp`; athlete.alt = `Illustrative recreational ${sport === 'general' ? 'multisport athletes' : sport + ' athlete'}`; }
    updateCourt(sport);
    if (updateURL) { const url = new URL(location.href); url.searchParams.set('sport', sport); history.pushState({}, '', url); }
  }
  buttons.forEach(button => button.addEventListener('click', () => select(button.dataset.sport)));
  addEventListener('popstate', () => select(new URL(location.href).searchParams.get('sport'), false));
  select(new URL(location.href).searchParams.get('sport'), false);
  if (!window.THREE || !document.querySelector('#court')) return;

  const T = window.THREE;
  const stage = document.querySelector('#stage');
  const canvas = document.querySelector('#court');
  let renderer;
  try { renderer = new T.WebGLRenderer({canvas, antialias:true, alpha:true, powerPreference:'low-power'}); } catch { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.outputEncoding = T.sRGBEncoding;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = .95;
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(34, 1, .1, 80);
  const composition = new T.Group();
  scene.add(composition);
  scene.add(new T.HemisphereLight(0xd8e7cb, 0x1a2b23, .55));
  const light = new T.DirectionalLight(0xffffe7, 1.15);
  light.position.set(-5, 10, 4); light.castShadow = true;
  light.shadow.mapSize.set(1024,1024);
  Object.assign(light.shadow.camera,{left:-8,right:8,top:8,bottom:-8});
  light.shadow.bias = -.001;
  scene.add(light);
  const rim = new T.DirectionalLight(0xc1efbf, .9); rim.position.set(6,3,-6); scene.add(rim);
  const materials = [];
  function material(color, options={}) { const m = new T.MeshStandardMaterial({color, roughness:.8, ...options}); materials.push(m); return m; }
  const green = material(0x3b6650);
  const boundary = material(0x172f25);
  const pale = material(0xf0f0d8);
  const steel = material(0x454d46,{metalness:.8,roughness:.3});
  const black = material(0x101a15);
  const orange = material(0xdc8438);
  const kitchen = material(0x2c757c);
  function box(w,h,d,mat,x,y,z,parent=composition) {
    const mesh = new T.Mesh(new T.BoxGeometry(w,h,d),mat);
    mesh.position.set(x,y,z); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  }
  box(8.1,.34,5.1,boundary,0,-.3,0);
  box(7.9,.1,4.9,green,0,-.08,0);
  // A beveled, elevated playing surface. The lines and equipment change with the selected sport.
  const lines = new T.Group(); composition.add(lines);
  const courtLogos = new T.Group(); composition.add(courtLogos);
  function placeCourtLogos(sport) {
    courtLogos.children.forEach((logo,index)=>{
      logo.visible=true;
      logo.position.set(index===0?-1.95:1.95,-.031,0);
      logo.rotation.set(-Math.PI/2,0,0);
      logo.rotateZ(index===0?-Math.PI/2:Math.PI/2);
    });
  }
  function line(x1,z1,x2,z2,width=.022,mat=pale) {
    const length = Math.hypot(x2-x1,z2-z1);
    const mesh = box(length,.012,width,mat,(x1+x2)/2,-.017,(z1+z2)/2,lines);
    mesh.rotation.y = -Math.atan2(z2-z1,x2-x1); mesh.castShadow = false;
  }
  function rect(x,z,w,d) { line(x,z,x+w,z);line(x+w,z,x+w,z+d);line(x+w,z+d,x,z+d);line(x,z+d,x,z); }
  function circle(x,z,r,start=0,end=Math.PI*2) { for(let i=0;i<72;i++){const a=start+(end-start)*i/72,b=start+(end-start)*(i+1)/72;line(x+Math.cos(a)*r,z+Math.sin(a)*r,x+Math.cos(b)*r,z+Math.sin(b)*r,.024);} }
  function net({width, top, center=top, bottom=.04, antennas=false}) {
    const half=width/2;
    const postHeight=top+.12;
    for(const z of [-half,half])box(.055,postHeight,.055,steel,0,postHeight/2,z,lines);
    // The tape and mesh follow the lower center height of racket-sport nets.
    const heightAt=z=>center+(top-center)*Math.pow(Math.abs(z)/half,2);
    for(let z=-half;z<half;z+=.12){
      const end=Math.min(z+.12,half), mid=(z+end)/2;
      const tape=box(.025,.035,end-z,pale,0,heightAt(mid),mid,lines);
      tape.rotation.x=-Math.atan2(heightAt(end)-heightAt(z),end-z);
      box(.012,heightAt(z)-bottom,.012,black,0,(heightAt(z)+bottom)/2,z,lines);
    }
    for(let y=bottom;y<center-.02;y+=.1)box(.012,.01,width,black,0,y,0,lines);
    if(antennas){
      box(.025,.025,width,pale,0,bottom,0,lines);
      for(const z of [-half+.12,half-.12]){
        box(.04,top-bottom,.05,pale,0,(top+bottom)/2,z,lines);
        for(let i=0;i<6;i++)box(.025,.075,.025,i%2?orange:pale,0,top+.075*i,z,lines);
      }
    }
  }
  function hoop(x) {
    box(.08,1.5,.08,steel,x,.75,0,lines);
    box(.09,.62,.95,pale,x,1.5,0,lines);
    const rim = new T.Mesh(new T.TorusGeometry(.21,.023,8,40),orange); rim.rotation.x=Math.PI/2; rim.position.set(x+(x>0?-.28:.28),1.27,0); lines.add(rim);
  }
  function disposeGroup(group) { while(group.children.length){const c=group.children[0];c.geometry?.dispose();group.remove(c);} }
  updateCourt = (sport) => {
    disposeGroup(lines);
    placeCourtLogos(sport);
    if (sport === 'basketball' || sport === 'general') {
      rect(-3.65,-2.1,7.3,4.2); line(0,-2.1,0,2.1);
      green.color.setHex(0x19432a); circle(0,0,.65);
      rect(-3.65,-.72,1.3,1.44);rect(2.35,-.72,1.3,1.44);
      circle(-2.35,0,.72,-Math.PI/2,Math.PI/2);circle(2.35,0,.72,Math.PI/2,Math.PI*1.5);
      hoop(-3.65); hoop(3.65);
    } else if(sport === 'soccer') {
      rect(-3.65,-2.1,7.3,4.2); line(0,-2.1,0,2.1);
      green.color.setHex(0x345e42);circle(0,0,.68);rect(-3.65,-1.1,1.15,2.2);rect(2.5,-1.1,1.15,2.2);
      for (const x of [-3.7,3.7]) {box(.06,.7,.06,pale,x,.35,-.65,lines);box(.06,.7,.06,pale,x,.35,.65,lines);box(.06,.06,1.35,pale,x,.7,0,lines);}
    } else if(sport === 'volleyball') {
      // 18:9 playing-area ratio and attack lines 3 m from the center.
      // Elevated hanging mesh and antennas distinguish volleyball at miniature scale.
      green.color.setHex(0x7a7152);
      rect(-3.65,-1.825,7.3,3.65);
      line(0,-1.825,0,1.825);
      for(const x of [-7.3/6,7.3/6])line(x,-1.825,x,1.825);
      net({width:4.12,top:1.45,bottom:.86,antennas:true});
    } else if(sport === 'tennis') {
      // ITF doubles footprint 78 × 36 ft, singles 27 ft; service lines 21 ft from net.
      green.color.setHex(0x80523b);
      const scale=7.3/78, halfWidth=36*scale/2, singles=27*scale/2, service=21*scale;
      rect(-3.65,-halfWidth,7.3,halfWidth*2);
      for(const z of [-singles,singles])line(-3.65,z,3.65,z);
      for(const x of [-service,service])line(x,-singles,x,singles);
      line(-service,0,service,0);
      line(-3.65,0,-3.55,0);line(3.55,0,3.65,0);
      net({width:(36+6)*scale,top:.62,center:.53});
    } else if(sport === 'pickleball') {
      // USA Pickleball footprint 44 × 20 ft; 7 ft kitchen each side of the net.
      // Service centerlines stop at the kitchen rather than crossing it.
      green.color.setHex(0x274650);
      const scale=6.2/44, halfWidth=20*scale/2, nonVolley=7*scale;
      box(nonVolley*2,.01,halfWidth*2,kitchen,0,-.027,0,lines).castShadow=false;
      rect(-3.1,-halfWidth,6.2,halfWidth*2);
      for(const x of [-nonVolley,nonVolley])line(x,-halfWidth,x,halfWidth);
      line(-3.1,0,-nonVolley,0);line(nonVolley,0,3.1,0);
      net({width:halfWidth*2+.28,top:.48,center:.48*34/36});
    }
    queue();
  };
  // Shallow logo inlays follow the playing surface, below the court markings.
  // Front UVs retain the original artwork; lighting and net shadows affect the finish.
  let logoReady=false;
  Promise.all([
    fetch('logo-shape.json').then(response=>{if(!response.ok)throw Error('Logo shape unavailable');return response.json();}),
    new Promise((resolve,reject)=>new T.TextureLoader().load('logo-face.png',resolve,undefined,reject))
  ]).then(([artwork,texture])=>{
    const height=1.15,width=height*artwork.width/artwork.height;
    const convert=points=>points.map(([x,y])=>new T.Vector2((x-.5)*width,(.5-y)*height));
    const outline=new T.Shape(convert(artwork.contours[0]));
    for(const contour of artwork.contours.slice(1))outline.holes.push(new T.Path(convert(contour)));
    const uv=(x,y)=>new T.Vector2(x/width+.5,y/height+.5);
    const geometry=new T.ExtrudeGeometry(outline,{
      depth:.012,bevelEnabled:false,steps:1,
      UVGenerator:{
        generateTopUV:(geometry,vertices,a,b,c)=>[a,b,c].map(i=>uv(vertices[i*3],vertices[i*3+1])),
        generateSideWallUV:()=>[new T.Vector2(0,0),new T.Vector2(1,0),new T.Vector2(1,1),new T.Vector2(0,1)]
      }
    });
    texture.encoding=T.sRGBEncoding;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
    const face=new T.MeshStandardMaterial({map:texture,roughness:.8,metalness:0,alphaTest:.2});
    const side=material(0x087d68,{roughness:.8});
    for(let i=0;i<2;i++){
      const logo=new T.Mesh(geometry,[face,side]);logo.name='DoThis court inlay';
      logo.receiveShadow=true;logo.castShadow=false;courtLogos.add(logo);
    }
    placeCourtLogos(document.body.dataset.sport || 'general');
    logoReady=true;stage.classList.add('ready');queue();
  }).catch(()=>{stage.classList.remove('ready');canvas.style.visibility='hidden';});
  const ground=new T.Mesh(new T.PlaneGeometry(40,40),new T.ShadowMaterial({opacity:.3}));ground.rotation.x=-Math.PI/2;ground.position.y=-.5;ground.receiveShadow=true;scene.add(ground);
  let raf=0,px=0,py=0,rx=0,ry=0,visible=true;
  function render() {
    raf=0; rx+=(px-rx)*.12; ry+=(py-ry)*.12;
    composition.rotation.y=-.18+rx*.14;composition.rotation.x=ry*.035;
    renderer.render(scene,camera);
    if (visible && !document.hidden && !reduced.matches && Math.abs(px-rx)+Math.abs(py-ry)>.001) queue();
  }
  function queue(){if(!raf && visible && !document.hidden)raf=requestAnimationFrame(render);}
  function resize(){const width=stage.clientWidth,height=stage.clientHeight;renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.set(8,7.4,12.6);camera.lookAt(0,.15,0);camera.fov=width<500?37:31;camera.updateProjectionMatrix();queue();}
  new ResizeObserver(resize).observe(stage);
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)queue();else{cancelAnimationFrame(raf);raf=0;} });observer.observe(stage);
  stage.addEventListener('pointermove', event=>{if(reduced.matches || event.pointerType==='touch')return;const bounds=stage.getBoundingClientRect();px=(event.clientX-bounds.left)/bounds.width-.5;py=(event.clientY-bounds.top)/bounds.height-.5;queue();});
  stage.addEventListener('pointerleave',()=>{px=py=0;queue();});
  document.querySelector('#reset-view').addEventListener('click',()=>{px=py=0;if(reduced.matches)rx=ry=0;queue();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)queue();});
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();cancelAnimationFrame(raf);raf=0;stage.classList.remove('ready');});
  canvas.addEventListener('webglcontextrestored',()=>{if(logoReady)stage.classList.add('ready');queue();});
  updateCourt(document.body.dataset.sport || 'general');resize();
})();
