// Renders fanel.html to an MP4 (1280x720, 24 fps, with soundtrack).
// Usage: node render.js [out.mp4]
const {chromium}=require('playwright');const {spawn}=require('child_process');const fs=require('fs');const path=require('path');
(async()=>{
  const out=process.argv[2]||path.join(__dirname,'fanel.mp4');const FPS=24;
  const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
  await p.goto('file://'+path.join(__dirname,'fanel.html'));await p.waitForFunction(()=>window.__ready,null,{timeout:30000});
  const len=await p.evaluate(()=>__film.renderAudio());const wav=out.replace(/\.mp4$/,'')+'.wav';const fd=fs.openSync(wav,'w');
  for(let i=0;i<len;i+=4<<20){fs.writeSync(fd,Buffer.from(await p.evaluate(([i,s])=>__film.wavChunk(i,s),[i,4<<20]),'base64'))}fs.closeSync(fd);
  console.log('audio done');
  const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-i',wav,'-c:v','libx264','-preset','medium','-crf','28','-tune','grain','-pix_fmt','yuv420p','-c:a','aac','-b:a','160k','-shortest','-movflags','+faststart',out],{stdio:['pipe','inherit','inherit']});
  const N=Math.round(300*FPS);
  for(let f=0;f<N;f++){const d=await p.evaluate(t=>{__film.drawFrame(t);return document.getElementById('c').toDataURL('image/jpeg',.92)},f/FPS);
    const buf=Buffer.from(d.slice(d.indexOf(',')+1),'base64');if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(f%720===0)console.log('frame',f,'/',N)}
  ff.stdin.end();await new Promise(r=>ff.on('close',r));fs.unlinkSync(wav);await b.close();console.log('done',out)})();
