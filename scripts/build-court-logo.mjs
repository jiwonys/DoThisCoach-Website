import sharp from 'sharp';
import {writeFile, mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';

// Deterministic silhouette extraction from the approved DoThis flame artwork.
// Original pixels supply the face texture; only the neutral icon background is removed.
const root=resolve(import.meta.dirname,'..');
const output=resolve(root,'assets/courts');
await mkdir(output,{recursive:true});
const size=768;
const source=resolve(root,'assets/dothis-logo.png');
const {data,info}=await sharp(source).resize(size,size).ensureAlpha().raw().toBuffer({resolveWithObject:true});
const mask=new Uint8Array(size*size);
let minX=size,minY=size,maxX=0,maxY=0;
for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const i=(y*size+x)*4,r=data[i],g=data[i+1],b=data[i+2];
  if(g-r>25 && g>45 && g>b*.8 && data[i+3]>128){mask[y*size+x]=1;minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);}
}
const inside=(x,y)=>x>=0&&x<size&&y>=0&&y<size&&mask[y*size+x];
const edges=new Map();
const key=(x,y)=>`${x},${y}`;
function edge(x1,y1,x2,y2){edges.set(key(x1,y1),[x2,y2]);}
for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(inside(x,y)){
  if(!inside(x,y-1))edge(x,y,x+1,y);
  if(!inside(x+1,y))edge(x+1,y,x+1,y+1);
  if(!inside(x,y+1))edge(x+1,y+1,x,y+1);
  if(!inside(x-1,y))edge(x,y+1,x,y);
}
function simplify(points,tolerance=1.4){
  if(points.length<3)return points;
  const [ax,ay]=points[0],[bx,by]=points.at(-1);let far=0,index=0;
  for(let i=1;i<points.length-1;i++){
    const [x,y]=points[i],dx=bx-ax,dy=by-ay;
    const t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy||1)));
    const distance=Math.hypot(x-ax-t*dx,y-ay-t*dy);
    if(distance>far){far=distance;index=i;}
  }
  return far>tolerance?[...simplify(points.slice(0,index+1),tolerance).slice(0,-1),...simplify(points.slice(index),tolerance)]:[points[0],points.at(-1)];
}
const contours=[];
while(edges.size){
  const first=edges.keys().next().value;let current=first;const points=[];
  do{const next=edges.get(current);if(!next)break;points.push(current.split(',').map(Number));edges.delete(current);current=key(...next);}while(current!==first);
  if(points.length>40){const half=Math.floor(points.length/2);const reduced=[...simplify(points.slice(0,half+1)).slice(0,-1),...simplify([...points.slice(half),points[0]]).slice(0,-1)];contours.push(reduced);}
}
const width=maxX-minX+1,height=maxY-minY+1;
const normalized=contours.map(points=>points.map(([x,y])=>[(x-minX)/width,(y-minY)/height]));
function area(points){return points.reduce((sum,[x,y],i)=>{const [a,b]=points[(i+1)%points.length];return sum+x*b-a*y;},0)/2;}
normalized.sort((a,b)=>Math.abs(area(b))-Math.abs(area(a)));
const texture=Buffer.from(data);
for(let i=0;i<mask.length;i++)if(!mask[i])texture[i*4+3]=0;
await sharp(texture,{raw:{width:info.width,height:info.height,channels:4}}).extract({left:minX,top:minY,width,height}).png().toFile(resolve(output,'logo-face.png'));
await writeFile(resolve(output,'logo-shape.json'),JSON.stringify({source:'assets/dothis-logo.png',method:'Color-isolated contour extraction; original face pixels retained',width,height,contours:normalized}));
console.log(JSON.stringify({width,height,contours:normalized.map(points=>({vertices:points.length,area:area(points)}))}));
