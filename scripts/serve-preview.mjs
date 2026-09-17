import http from 'node:http';
import {createReadStream, statSync} from 'node:fs';
import {resolve, extname, sep} from 'node:path';
const root = resolve(process.env.PREVIEW_DIR || '.');
const types = {'.html':'text/html','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.png':'image/png','.mp4':'video/mp4','.woff2':'font/woff2','.json':'application/json','.svg':'image/svg+xml','.ico':'image/x-icon'};
http.createServer((req,res) => {
 try {
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file=resolve(root,'.'+pathname);
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return;}
  let stat=statSync(file);if(stat.isDirectory()){file=resolve(file,'index.html');stat=statSync(file);}
  res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');
  res.setHeader('Accept-Ranges','bytes');
  const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if(range){const start=Number(range[1]),end=Math.min(range[2]?Number(range[2]):stat.size-1,stat.size-1);if(start>end){res.writeHead(416).end();return;}res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${stat.size}`,'Content-Length':end-start+1});createReadStream(file,{start,end}).pipe(res);}
  else{res.writeHead(200,{'Content-Length':stat.size});if(req.method==='HEAD')res.end();else createReadStream(file).pipe(res);}
 }catch{res.writeHead(404).end('Not found');}
}).listen(Number(process.env.PORT||4325),'127.0.0.1',()=>console.log(`Preview: http://127.0.0.1:${process.env.PORT||4325}`));
