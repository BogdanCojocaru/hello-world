// ================= drawing helpers =================
function withCtx(ctx,fn){const old=g;g=ctx;try{fn()}finally{g=old}}
function limb(x1,y1,x2,y2,bend,color,w){const mx=(x1+x2)/2+bend,my=(y1+y2)/2;g.lineCap='round';g.beginPath();g.moveTo(x1,y1);g.quadraticCurveTo(mx,my,x2,y2);g.strokeStyle=OL;g.lineWidth=w+6;g.stroke();g.strokeStyle=color;g.lineWidth=w;g.stroke()}
function glove(x,y,r){ell(x,y,r,r*.92);P('#fffdf4',3);g.beginPath();g.moveTo(x-r*.5,y-r*.25);g.lineTo(x+r*.25,y-r*.25);g.lineWidth=1.5;g.strokeStyle=OL;g.stroke()}
function heartPath(){g.beginPath();g.moveTo(0,8);g.bezierCurveTo(-14,-2,-12,-16,0,-8);g.bezierCurveTo(12,-16,14,-2,0,8);g.closePath()}
function star(x,y,r,col='#ffe14a'){g.beginPath();for(let i=0;i<10;i++){const a=-PI/2+i*PI/5,rr=i%2?r*.45:r;g.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}g.closePath();P(col,2)}
function stars(x,y,t,n=4,r=50){for(let i=0;i<n;i++){const a=t*5+i*TAU/n;const sx=x+Math.cos(a)*r,sy=y+Math.sin(a)*r*.32;if(i%2)star(sx,sy,10);else bird(sx,sy,t*10+i)}}
function bird(x,y,ph){g.save();g.translate(x,y);ell(0,0,9,7);P('#ffd23f',2);ell(-4,-6,5,5);P('#ffd23f',2);g.beginPath();g.moveTo(-9,-6);g.lineTo(-14,-4);g.lineTo(-9,-3);P('#f08a20',1.5);const w=Math.sin(ph)*6;ell(3,-2-w,6,3,-.5);P('#ffe680',1.5);g.restore()}
function note(x,y,s){g.save();g.translate(x,y);g.scale(s,s);ell(0,0,7,5,-.4);P(OL,0);g.fillStyle=OL;g.fillRect(5,-26,3,26);g.beginPath();g.moveTo(8,-26);g.quadraticCurveTo(18,-20,14,-10);g.lineWidth=3;g.strokeStyle=OL;g.stroke();g.restore()}
function notes(x,y,τ,k=3){for(let i=0;i<k;i++){const p=((τ*.7+i/k)%1);g.globalAlpha=1-p;note(x+p*40+Math.sin(p*8+i)*10,y-p*90,1);g.globalAlpha=1}}
function zzz(x,y,τ){for(let i=0;i<3;i++){const p=((τ*.45+i/3)%1);g.globalAlpha=1-p;text('Z',x+p*50,y-p*80,18+p*22,'#fffdf4',FT,900,'center',OL,5);g.globalAlpha=1}}
function bubble(x,y,s,draw,w=34){g.save();g.translate(x,y);g.scale(s,s);ell(0,0,w*1.4,w);P('#fffdf4',3);circ(-26,w+6,7);P('#fffdf4',3);circ(-36,w+20,4);P('#fffdf4',3);draw();g.restore()}
function gibber(x,y,τ){const sy=['#','@','$','%','&','!','*','?'];bubble(x,y,1.2,()=>{for(let i=0;i<5;i++){const c=sy[(Math.floor(τ*8)+i*3)%sy.length];text(c,-36+i*18,Math.sin(τ*20+i)*3,26,i%2?'#c8352c':OL,FT,900)}},34)}
function bulb(x,y,s,glow){g.save();g.translate(x,y);g.scale(s,s);if(glow){g.strokeStyle='#ffd23f';g.lineWidth=5;for(let i=0;i<8;i++){const a=i*TAU/8;g.beginPath();g.moveTo(Math.cos(a)*40,Math.sin(a)*40-6);g.lineTo(Math.cos(a)*56,Math.sin(a)*56-6);g.stroke()}}
  circ(0,-8,26);P('#fff27a',4);g.fillStyle='#9a9a9a';g.fillRect(-12,16,24,16);g.strokeStyle=OL;g.lineWidth=3;g.strokeRect(-12,16,24,16);g.restore()}
function caption(s,a){if(a<=0)return;g.globalAlpha=a;g.save();g.font=`700 28px ${FT}`;const w=Math.min(1200,g.measureText(s).width+70);g.translate(W/2,672);
  g.beginPath();g.roundRect(-w/2,-28,w,56,10);P('#f3e6c4',4);g.beginPath();g.roundRect(-w/2+6,-22,w-12,44,6);g.lineWidth=1.5;g.strokeStyle='#8a6a40';g.stroke();
  text(s,0,1,28,'#3a2414',FT,700);g.restore();g.globalAlpha=1}
function steam(x,y,τ,dir=1){for(let i=0;i<4;i++){const p=((τ*2.2+i/4)%1);g.globalAlpha=.9*(1-p);circ(x+dir*(10+p*70),y-p*30,8+p*16);P('#ffffff',2);g.globalAlpha=1}}
function dust(x,y,p,r=80){if(p<=0||p>=1)return;g.globalAlpha=1-p;for(let i=0;i<9;i++){const a=i*TAU/9;circ(x+Math.cos(a)*r*p,y+Math.sin(a)*r*p*.5,14+20*p);P('#e8dcc4',3)}g.globalAlpha=1}
function speed(x,y,dir,len=120,n=5,col='rgba(42,26,16,.7)'){g.strokeStyle=col;g.lineWidth=4;g.lineCap='round';for(let i=0;i<n;i++){const yy=y+(i-(n-1)/2)*22,l=len*(.6+.4*hash(i));g.beginPath();g.moveTo(x-dir*20,yy);g.lineTo(x-dir*(20+l),yy);g.stroke()}}
function popText(s,x,y,size,p){if(p<=0||p>=1)return;const k=back(clamp(p*3))*(1-seg(p,.8,1)*.3);g.save();g.translate(x,y);g.scale(k,k);g.rotate(-.08);text(s,0,0,size,'#fffbe0',FD,400,'center',OL,9);g.restore()}
function tears(x,y,τ,dir){g.strokeStyle='#6ab0ff';g.lineWidth=5;for(let i=0;i<6;i++){const p=((τ*2+i/6)%1);circ(x+dir*p*80,y-Math.sin(p*PI)*40+p*60,4);P('#8ac4ff',1.5)}}

// ---- eyes & mouths ----
function eye(ex,ey,rx,ry,o,cat){
  const eb=o.eyeBig||1,bl=clamp(o.blink||0),L=o.look||[.4,0];
  if(o.closed||o.winkEye){g.beginPath();g.arc(ex,ey+2,rx*.9,.15*PI,.85*PI);g.lineWidth=3;g.strokeStyle=OL;g.stroke();return}
  ell(ex,ey,rx*eb,ry*eb*(1-bl*.92));P('#fffdf4',3);if(bl>.7)return;
  if(o.dizzy){g.beginPath();for(let a=0;a<4*PI;a+=.3){const r=a*1.1;const ang=a+(o.tt||0)*8;g.lineTo(ex+Math.cos(ang)*r*.55*eb,ey+Math.sin(ang)*r*.75*eb)}g.lineWidth=2;g.strokeStyle=OL;g.stroke();return}
  if(o.heart){g.save();g.translate(ex,ey);g.scale(.55*eb,.55*eb);heartPath();g.fillStyle='#e0302a';g.fill();g.restore();return}
  const px=ex+L[0]*rx*.4*eb,py=ey+3+L[1]*ry*.35*eb;
  if(cat){circ(px,py,rx*.62*eb);P('#9bd24a',1.5);ell(px,py,2*eb,ry*.5*eb);P(OL,0);circ(px-2,py-3,1.8);P('#fff',0)}
  else{ell(px,py,5*eb,8*eb*(1-bl));P(OL,0);circ(px-1.5,py-3,1.8*eb);P('#fff',0)}
  if(o.smug){const sa=o.smug,ly=ey-ry*eb+2*ry*eb*sa;g.save();ell(ex,ey,rx*eb,ry*eb);g.clip();g.fillStyle=cat?'#2b2a33':'#f6c9a0';g.fillRect(ex-rx*2,ey-ry*2,rx*4,ly-(ey-ry*2));g.restore();g.beginPath();g.moveTo(ex-rx*eb,ly);g.lineTo(ex+rx*eb,ly);g.lineWidth=3;g.strokeStyle=OL;g.stroke()}
}
function brows(E,kind,dy,len=11){if(!kind)return;g.lineWidth=5;g.strokeStyle=OL;g.lineCap='round';const [a,b]=E;g.beginPath();
  if(kind==='angry'){g.moveTo(a[0]-len,a[1]+dy-8);g.lineTo(a[0]+len,a[1]+dy+4);g.moveTo(b[0]+len,b[1]+dy-8);g.lineTo(b[0]-len,b[1]+dy+4)}
  else if(kind==='up'){g.moveTo(a[0]-len,a[1]+dy+2);g.quadraticCurveTo(a[0],a[1]+dy-10,a[0]+len,a[1]+dy-2);g.moveTo(b[0]-len,b[1]+dy-2);g.quadraticCurveTo(b[0],b[1]+dy-10,b[0]+len,b[1]+dy+2)}
  else if(kind==='sad'){g.moveTo(a[0]-len,a[1]+dy+4);g.lineTo(a[0]+len,a[1]+dy-6);g.moveTo(b[0]+len,b[1]+dy+4);g.lineTo(b[0]-len,b[1]+dy-6)}
  g.stroke()}
function mouth(mx,my,m,o,s=1){g.lineWidth=3;g.strokeStyle=OL;const j=o.jaw||1;
  if(m==='smile'){g.beginPath();g.arc(mx,my-8*s,12*s,.2*PI,.8*PI);g.stroke()}
  else if(m==='frown'){g.beginPath();g.arc(mx,my+8*s,11*s,1.15*PI,1.85*PI);g.stroke()}
  else if(m==='o'){ell(mx,my+2,6*s,8*s);P('#5a1010',3)}
  else if(m==='whistle'){ell(mx+4,my,4*s,4*s);P('#5a1010',3)}
  else if(m==='open'){g.beginPath();g.moveTo(mx-18*s,my-6);g.quadraticCurveTo(mx,my+30*s*j,mx+18*s,my-6);g.closePath();P('#5a1010',3);ell(mx+2,my+(8+8*(j-1))*s,8*s,5*s);P('#e06060',0)}
  else if(m==='grin'){g.beginPath();g.moveTo(mx-18*s,my-6);g.quadraticCurveTo(mx,my+24*s,mx+18*s,my-6);g.closePath();P('#5a1010',3);g.save();g.clip();g.fillStyle='#fff';g.fillRect(mx-20*s,my-8,40*s,9*s);g.restore();g.beginPath();g.moveTo(mx-18*s,my-6);g.quadraticCurveTo(mx,my+24*s,mx+18*s,my-6);g.closePath();P(null,3)}
  else if(m==='grit'){g.beginPath();g.roundRect(mx-17*s,my-6,34*s,15*s,4);P('#fff',3);g.beginPath();for(let i=1;i<5;i++){g.moveTo(mx-17*s+i*6.8*s,my-6);g.lineTo(mx-17*s+i*6.8*s,my+9*s)}g.moveTo(mx-17*s,my+1.5*s);g.lineTo(mx+17*s,my+1.5*s);g.lineWidth=1.5;g.stroke()}
  else if(m==='smirk'){g.beginPath();g.moveTo(mx-10*s,my);g.quadraticCurveTo(mx+2*s,my+6*s,mx+12*s,my-6*s);g.stroke()}
  else if(m==='wavy'){g.beginPath();for(let i=0;i<=8;i++)g.lineTo(mx-12*s+i*3*s,my+Math.sin(i*1.6)*3*s);g.stroke()}
}

// ================= characters =================
const SKIN='#f6c9a0',PANTS='#34529a',PJ='#fff6e6',STRIPE='#d34a3c';
function fanel(x,y,s,o={}){
  const f=o.face||1;g.save();g.translate(x,y);if(o.rot)g.rotate(o.rot);
  g.scale(s*f*(o.sx||1),s*(o.sq||1));g.lineJoin='round';g.lineCap='round';
  let lf=[-16,0],rf=[18,0];
  if(o.walk!==undefined){const w=o.walk;lf=[-16+Math.sin(w)*20,-Math.max(0,Math.cos(w))*14];rf=[18-Math.sin(w)*20,-Math.max(0,-Math.cos(w))*14]}
  if(o.run!==undefined){const w=o.run;lf=[Math.cos(w)*32,-16-Math.sin(w)*20];rf=[Math.cos(w+PI)*32,-16-Math.sin(w+PI)*20]}
  if(o.feet){lf=o.feet[0];rf=o.feet[1]}
  const legC=o.pantsDown?'#fbeee0':PANTS;
  limb(-16,-50,lf[0],lf[1]-10,-6,legC,o.pantsDown?9:14);limb(16,-50,rf[0],rf[1]-10,6,legC,o.pantsDown?9:14);
  if(o.pantsDown){[lf,rf].forEach(p=>{ell(p[0]+2,p[1]-14,20,9);P(PANTS,3)})}
  [lf,rf].forEach(p=>{ell(p[0]+10,p[1]-7,25,12);P('#2b2422',3);ell(p[0]+16,p[1]-12,7,3);P('#6a5a55',0)});
  if(o.sand){[lf,rf].forEach(p=>{for(let i=0;i<4;i++){circ(p[0]+i*7,p[1]-4,3);P('#e8c878',0)}})}
  // body
  ell(0,-96,48,54);g.save();g.clip();g.fillStyle=PJ;g.fillRect(-60,-160,120,120);
  g.fillStyle=STRIPE;for(let i=-60;i<60;i+=18)g.fillRect(i,-160,7,120);
  if(o.pantsDown){g.fillStyle='#fff';g.fillRect(-60,-76,120,46);g.fillStyle='#e0405a';[[-26,-60],[4,-50],[28,-64],[-8,-40]].forEach(([hx,hy])=>{g.save();g.translate(hx,hy);g.scale(.6,.6);heartPath();g.fill();g.restore()})}
  else{g.fillStyle=PANTS;g.fillRect(-60,-80,120,50);g.fillStyle='#253c78';g.fillRect(-60,-80,120,6)}
  g.restore();ell(0,-96,48,54);P(null,4);
  if(!o.pantsDown){g.strokeStyle=OL;g.lineWidth=8;g.beginPath();g.moveTo(-22,-80);g.lineTo(-26,-140);g.moveTo(22,-80);g.lineTo(24,-140);g.stroke();g.strokeStyle='#e8b23a';g.lineWidth=5;g.stroke();circ(-22,-82,3.5);P('#fff',1.5);circ(22,-82,3.5);P('#fff',1.5)}
  if(o.flame){const k=o.flame;for(let i=0;i<3;i++){const fx=-46-i*4,fy=-60+i*12,h=(26+Math.sin((o.tt||0)*30+i)*8)*k;g.beginPath();g.moveTo(fx,fy-10);g.quadraticCurveTo(fx-h,fy-4,fx-h*1.3,fy);g.quadraticCurveTo(fx-h,fy+6,fx,fy+10);g.closePath();P(i%2?'#ffb020':'#ff5a20',2)}}
  // arms
  const hl=o.hl||[-56,-64],hr=o.hr||[56,-64];
  limb(-38,-126,hl[0],hl[1],-12,PJ,11);limb(38,-126,hr[0],hr[1],12,PJ,11);
  if(o.holdL)o.holdL(hl[0],hl[1]);
  if(o.hold)o.hold(hr[0],hr[1]);
  glove(hl[0],hl[1],14);
  if(o.bigHand){const b=o.bigHand;ell(hr[0],hr[1],14+b*22,13+b*20);P('#ff7a6a',3);for(let i=0;i<4;i++){ell(hr[0]-14*b+i*10*b,hr[1]-18-b*18,6+b*5,10+b*9);P('#ff7a6a',3)}}else glove(hr[0],hr[1],14);
  if(o.sand){circ(hl[0],hl[1],6);P('#e8c878',0);circ(hr[0],hr[1],6);P('#e8c878',0)}
  // head
  g.save();g.translate(o.headDx||0,o.headDy||0);
  const hy=-180;
  circ(-42,hy+4,10);P(SKIN,3);
  circ(0,hy,46);P(SKIN,4);
  if(o.red){g.save();circ(0,hy,46);g.clip();g.globalAlpha=.85;g.fillStyle=o.blush?'#ff9ab8':'#e23a2a';const h=92*clamp(o.red);g.fillRect(-50,hy+46-h,100,h);g.restore();circ(0,hy,46);P(null,4)}
  g.strokeStyle=OL;g.lineWidth=3;
  if(o.hairUp){for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(i*8,hy-44);g.lineTo(i*16,hy-110);g.stroke()}}
  const pop=o.eyePop||0;const E=[[8,hy-12],[32,hy-12]];
  E.forEach(([ex,ey],i)=>{const px=ex+pop*(50+i*14),py=ey-pop*24;if(pop>0){g.beginPath();g.moveTo(ex,ey);g.lineTo(px,py);g.lineWidth=4;g.strokeStyle=OL;g.stroke()}
    eye(px,py,11,15,{...o,winkEye:o.wink&&i===1},false)});
  brows(E,o.brow,-24);
  ell(48,hy+6,17,14);P(o.red&&!o.blush?'#e85a4a':'#f2a07c',4);circ(43,hy+1,4);P('#ffd8c0',0);
  if(o.faceItem)o.faceItem(26,hy);
  const fl=o.mst||0;g.save();g.translate(40,hy+24);g.rotate(fl*.25);ell(-12,0,20,9,.3);P(o.sandMst?'#b89850':'#2a1a12',3);g.restore();g.save();g.translate(40,hy+24);g.rotate(-fl*.25);ell(14,0,20,9,-.3);P(o.sandMst?'#b89850':'#2a1a12',3);g.restore();
  mouth(40,hy+42,o.mouth||'smile',o);
  if(o.tongue){const L=o.tongue;g.beginPath();g.moveTo(32,hy+46);g.bezierCurveTo(44,hy+80,30,hy+80+L*.6,46,hy+46+L);g.lineTo(62,hy+46+L);g.bezierCurveTo(50,hy+80+L*.6,62,hy+80,52,hy+46);g.closePath();P('#ef6f7f',3)}
  if(o.hat!==false){g.save();g.translate(0,-(o.hatUp||0));if(o.hatUp)g.rotate(Math.sin((o.tt||0)*20)*.25);
    if(o.cap==='shower'){ell(0,hy-30,52,24);P('#ff9ac0',4);for(let i=0;i<11;i++){circ(-50+i*10,hy-12,6);P('#ff9ac0',2)}}
    else{g.beginPath();g.moveTo(-42,hy-28);g.bezierCurveTo(-30,hy-92,40,hy-104,74,hy-72);g.bezierCurveTo(92,hy-58,94,hy-42,88,hy-30);g.bezierCurveTo(72,hy-58,30,hy-62,42,hy-28);g.closePath();P('#3d6fb5',4);
      g.strokeStyle='#ffffff';g.lineWidth=5;g.beginPath();g.moveTo(-14,hy-70);g.lineTo(-4,hy-36);g.moveTo(22,hy-84);g.lineTo(26,hy-40);g.moveTo(56,hy-80);g.lineTo(54,hy-50);g.stroke();
      circ(88,hy-26,10);P('#fff',3);ell(0,hy-28,44,11);P('#fff',4)}
    g.restore()}
  if(o.bump){const b=o.bump;g.beginPath();g.moveTo(-22,hy-36);g.quadraticCurveTo(-28,hy-40-34*b,-4,hy-42-36*b);g.quadraticCurveTo(18,hy-40-34*b,12,hy-36);g.closePath();P('#f59a88',4);ell(-8,hy-36-30*b,4,8*Math.min(b,1.5));P('#ffd0c0',0)}
  if(o.headItem)o.headItem(0,hy-44);
  g.restore();
  g.restore();
}
function cat(x,y,s,o={}){
  const f=o.face||1;g.save();g.translate(x,y);if(o.rot)g.rotate(o.rot);g.scale(s*f*(o.sx||1),s*(o.sq||1));g.lineJoin='round';g.lineCap='round';
  const C='#2b2a33',Wh='#fbf6ee';const by=o.sit?16:0;
  const sw=Math.sin((o.tt||0)*2.5)*.25+(o.tailUp?-.4:0);
  g.beginPath();g.moveTo(-16,-40+by);g.bezierCurveTo(-60,-42+by,-50+sw*30,-110,-78+sw*40,-132);g.strokeStyle=OL;g.lineWidth=13;g.stroke();g.strokeStyle=C;g.lineWidth=8;g.stroke();circ(-78+sw*40,-132,6);P(Wh,2.5);
  let lf=[-10,0],rf=[10,0];
  if(o.walk!==undefined){const w=o.walk;lf=[-10+Math.sin(w)*14,-Math.max(0,Math.cos(w))*10];rf=[10-Math.sin(w)*14,-Math.max(0,-Math.cos(w))*10]}
  if(o.tiptoe!==undefined){const w=o.tiptoe;lf=[-10+Math.sin(w)*16,-Math.max(0,Math.cos(w))*30];rf=[10-Math.sin(w)*16,-Math.max(0,-Math.cos(w))*30]}
  if(o.run!==undefined){const w=o.run;lf=[Math.cos(w)*24,-10-Math.sin(w)*14];rf=[Math.cos(w+PI)*24,-10-Math.sin(w+PI)*14]}
  if(o.sit){lf=[10,-2];rf=[24,-2]}
  limb(-8,-36+by,lf[0],lf[1]-5,-3,C,7);limb(8,-36+by,rf[0],rf[1]-5,3,C,7);
  ell(lf[0]+5,lf[1]-4,12,7);P(Wh,3);ell(rf[0]+5,rf[1]-4,12,7);P(Wh,3);
  ell(0,-60+by,24,32);P(C);ell(7,-58+by,12,20);P(Wh,0);
  const hl=o.hl||[-24,-44],hr=o.hr||[24,-44];
  limb(-14,-80+by,hl[0],hl[1]+by,-6,C,6);limb(14,-80+by,hr[0],hr[1]+by,6,C,6);
  if(o.hold)o.hold(hr[0],hr[1]+by);
  glove(hl[0],hl[1]+by,9);glove(hr[0],hr[1]+by,9);
  g.save();g.translate(o.headDx||0,by+(o.headDy||0));if(o.headRot){g.translate(0,-114);g.rotate(o.headRot);g.translate(0,114)}const hy=-114;
  g.beginPath();g.moveTo(-26,hy-12);g.lineTo(-30,hy-52);g.lineTo(-4,hy-28);g.closePath();P(C,3);g.beginPath();g.moveTo(-22,hy-18);g.lineTo(-26,hy-42);g.lineTo(-10,hy-28);g.closePath();P('#f2a0b0',0);
  g.beginPath();g.moveTo(6,hy-30);g.lineTo(24,hy-56);g.lineTo(28,hy-12);g.closePath();P(C,3);g.beginPath();g.moveTo(11,hy-28);g.lineTo(22,hy-46);g.lineTo(24,hy-18);g.closePath();P('#f2a0b0',0);
  if(o.furUp){g.beginPath();for(let i=0;i<24;i++){const a=i*TAU/24,r=i%2?30:42;g.lineTo(Math.cos(a)*r,hy+Math.sin(a)*r)}g.closePath();P(C,3)}
  circ(0,hy,30);P(C,4);
  ell(14,hy+12,20,13);P(Wh,3);
  const E=[[2,hy-6],[21,hy-6]];E.forEach(([ex,ey],i)=>eye(ex,ey,9,12,{...o,winkEye:o.wink&&i===1},true));
  brows(E,o.brow,-16,8);
  g.beginPath();g.moveTo(26,hy+4);g.lineTo(34,hy+4);g.lineTo(30,hy+10);g.closePath();P('#f07a9a',2);
  mouth(24,hy+18,o.mouth||'smirk',o,.8);
  g.strokeStyle=OL;g.lineWidth=1.5;g.beginPath();g.moveTo(30,hy+12);g.lineTo(58,hy+6);g.moveTo(30,hy+14);g.lineTo(60,hy+16);g.moveTo(16,hy+12);g.lineTo(-8,hy+8);g.stroke();
  if(o.blushCat){circ(-6,hy+8,6);g.fillStyle='rgba(255,120,150,.6)';g.fill()}
  g.restore();g.restore();
}

// ================= props =================
function clock(x,y,s,τ,o={}){g.save();g.translate(x,y);const ring=o.ring?1:0;g.rotate(ring*Math.sin(τ*60)*.12);g.scale(s*(o.flat?1.5:1),s*(o.flat?.35:1));
  g.lineWidth=4;g.strokeStyle=OL;g.beginPath();g.moveTo(-14,-2);g.lineTo(-22,14);g.moveTo(14,-2);g.lineTo(22,14);g.stroke();
  [-1,1].forEach(d=>{g.save();g.translate(d*20,-32+(ring?Math.sin(τ*80+d)*3:0));ell(0,0,13,9,d*.5);P('#e0b030',3);g.restore()});
  circ(0,-6,28*(1+ring*.08*Math.sin(τ*50)));P('#d0302a',4);circ(0,-6,20);P('#fffdf4',3);
  g.lineWidth=3;g.beginPath();g.moveTo(0,-6);g.lineTo(0,-20);g.moveTo(0,-6);g.lineTo(10,-6);g.stroke();
  if(ring){g.strokeStyle=OL;g.lineWidth=3;[-1,1].forEach(d=>{for(let i=0;i<3;i++){g.beginPath();g.arc(0,-6,40+i*10,d>0?-.6:PI-.6+.0,d>0?.0-.1:PI+.1-.0);g.stroke()}})}
  g.restore()}
function flowerPot(x,y,s,rot=0){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
  g.strokeStyle=OL;g.lineWidth=4;[[-16,-60],[0,-70],[16,-58]].forEach(([lx,ly])=>{g.beginPath();g.moveTo(0,-28);g.quadraticCurveTo(lx*.3,ly*.6,lx,ly);g.stroke();g.strokeStyle='#4a9a3a';g.lineWidth=2;g.stroke();g.strokeStyle=OL;g.lineWidth=4});
  ell(-14,-50,10,5,-.6);P('#5cb84a',2);ell(14,-46,10,5,.6);P('#5cb84a',2);
  for(let i=0;i<5;i++){circ(Math.cos(i*1.256)*7,-72+Math.sin(i*1.256)*7,6);P('#e8506a',2)}circ(0,-72,4);P('#ffd23f',2);
  g.beginPath();g.moveTo(-22,-30);g.lineTo(22,-30);g.lineTo(16,0);g.lineTo(-16,0);g.closePath();P('#c8643a',4);g.fillStyle='#a84e2a';g.fillRect(-24,-34,48,9);g.strokeRect(-24,-34,48,9);g.restore()}
const BOOKC=['#b8443a','#3d6fb5','#4f9a4a','#e0a030','#8a4ab0','#c86a3a'];
function book(x,y,w,h,i,rot=0){g.save();g.translate(x,y);g.rotate(rot);g.beginPath();g.rect(-w/2,-h,w,h);P(BOOKC[i%6],3);g.fillStyle='rgba(255,240,200,.7)';g.fillRect(-w/2+3,-h*.7,w-6,4);g.fillRect(-w/2+3,-h*.3,w-6,4);g.restore()}
function plate(x,y,s=1){ell(x,y,30*s,8*s);P('#fffdf4',3);ell(x,y-1,18*s,4*s);P('#e8e0d0',0)}
function egg(x,y,s=1){ell(x,y,22*s,9*s);P('#fffdf4',3);circ(x+3*s,y-3*s,8*s);P('#ffc020',2)}
function cup(x,y,s=1){g.save();g.translate(x,y);g.scale(s,s);g.beginPath();g.moveTo(-14,-24);g.lineTo(14,-24);g.lineTo(10,0);g.lineTo(-10,0);g.closePath();P('#fffdf4',3);g.beginPath();g.arc(16,-14,7,-PI/2,PI/2);g.lineWidth=4;g.strokeStyle=OL;g.stroke();g.fillStyle='#3d6fb5';g.fillRect(-12,-18,24,4);g.restore()}
function teapot(x,y,s=1){g.save();g.translate(x,y);g.scale(s,s);g.beginPath();g.moveTo(22,-22);g.lineTo(44,-40);g.lineTo(46,-34);g.lineTo(26,-10);g.closePath();P('#3d6fb5',3);ell(0,-22,28,22);P('#3d6fb5',4);ell(0,-44,14,5);P('#3d6fb5',3);circ(0,-50,4);P('#e0b030',2);g.beginPath();g.arc(-30,-22,10,PI/2,PI*1.5);g.lineWidth=5;g.strokeStyle=OL;g.stroke();circ(-6,-24,5);P('#fff',0);g.restore()}
function tablecloth(x1,x2,y,drop,wav=0){g.beginPath();g.moveTo(x1,y);g.lineTo(x2,y);g.lineTo(x2+4,y+drop);for(let x=x2;x>=x1;x-=20)g.lineTo(x,y+drop+Math.sin(x*.3+wav)*4);g.lineTo(x1-4,y+drop);g.closePath();g.save();g.clip();g.fillStyle='#fff6ea';g.fillRect(x1-10,y-5,x2-x1+20,drop+20);g.fillStyle='rgba(208,60,50,.75)';for(let x=x1;x<x2;x+=24)g.fillRect(x,y,12,drop+10);for(let yy=y+6;yy<y+drop;yy+=16)g.fillRect(x1-10,yy,x2-x1+20,7);g.restore();g.beginPath();g.moveTo(x1,y);g.lineTo(x2,y);g.lineTo(x2+4,y+drop);g.lineTo(x1-4,y+drop);g.closePath();P(null,3)}
function clothBundle(x,y,τ){g.save();g.translate(x,y);g.beginPath();g.moveTo(0,0);for(let i=0;i<=10;i++)g.lineTo(-i*14,Math.sin(τ*18+i)*12+i*4);for(let i=10;i>=0;i--)g.lineTo(-i*14,Math.sin(τ*18+i)*12+i*4+40-i*2);g.closePath();g.fillStyle='#fff6ea';g.fill();g.save();g.clip();g.fillStyle='rgba(208,60,50,.75)';for(let i=-150;i<10;i+=24)g.fillRect(i,-30,12,100);g.restore();P(null,3);g.restore()}
function skate(x,y,rot=0){g.save();g.translate(x,y);g.rotate(rot);g.beginPath();g.roundRect(-28,-14,56,10,4);P('#d0302a',3);[-18,18].forEach(d=>{circ(d,0,7);P('#e8e0d0',3);circ(d,0,2.5);P(OL,0)});g.restore()}
function rollingPin(x,y,rot=0){g.save();g.translate(x,y);g.rotate(rot);g.beginPath();g.roundRect(-30,-9,60,18,8);P('#e0b070',3);g.beginPath();g.roundRect(-46,-4,16,8,3);P('#c08a50',2);g.beginPath();g.roundRect(30,-4,16,8,3);P('#c08a50',2);g.restore()}
function hammer(x,y,rot){g.save();g.translate(x,y);g.rotate(rot);g.fillStyle='#b07840';g.fillRect(-3,-36,6,36);g.strokeStyle=OL;g.lineWidth=2;g.strokeRect(-3,-36,6,36);g.beginPath();g.rect(-14,-46,28,12);P('#8a8a92',3);g.restore()}
function chair(x,y,s=1,rot=0){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);g.lineCap='round';
  [[-24,0,-24,-40],[22,0,22,-40],[-24,-40,-26,-100]].forEach(([a,b,c,d])=>{g.beginPath();g.moveTo(a,b);g.lineTo(c,d);g.strokeStyle=OL;g.lineWidth=10;g.stroke();g.strokeStyle='#a8683a';g.lineWidth=5;g.stroke()});
  g.beginPath();g.roundRect(-30,-46,58,10,3);P('#c07c48',3);g.beginPath();g.roundRect(-34,-104,14,40,3);P('#c07c48',3);g.restore()}
function dumbbell(x,y,s=1,rot=0){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);g.fillStyle='#8a8a92';g.fillRect(-40,-5,80,10);g.strokeStyle=OL;g.lineWidth=3;g.strokeRect(-40,-5,80,10);[-1,1].forEach(d=>{circ(d*44,0,26);P('#3a3a42',4)});text('100',-44,1,13,'#fff',FT,900);text('KG',44,1,13,'#fff',FT,900);g.restore()}
function jar(x,y,s=1,rot=0,full=true,lid=true){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);g.beginPath();g.roundRect(-26,-54,52,54,10);g.fillStyle='rgba(220,240,250,.55)';g.fill();if(full){for(let i=0;i<5;i++){circ(-12+(i%3)*12,-12-Math.floor(i/3)*16,9);P('#c88a40',2)}}g.beginPath();g.roundRect(-26,-54,52,54,10);P(null,4);if(lid){g.beginPath();g.roundRect(-22,-64,44,12,4);P('#d0302a',3)}text('BISCUIȚI',0,-30,9,'#3a2414',FT,900);g.restore()}
function soap(x,y){g.beginPath();g.roundRect(x-16,y-12,32,12,5);P('#ff9ac0',3);for(let i=0;i<3;i++){circ(x-6+i*8,y-18-i*4,4);P('rgba(255,255,255,.8)',1.5)}}
function banana(x,y,rot=0){g.save();g.translate(x,y);g.rotate(rot);[-1,0,1].forEach(d=>{g.beginPath();g.moveTo(0,-4);g.quadraticCurveTo(d*18,-10,d*26,4);g.quadraticCurveTo(d*14,-2,0,2);g.closePath();P('#ffd84a',2.5)});g.restore()}
function bin(x,y,s=1,rot=0){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);g.beginPath();g.moveTo(-30,-90);g.lineTo(30,-90);g.lineTo(26,0);g.lineTo(-26,0);g.closePath();P('#8a949a',4);g.strokeStyle='#5a646a';g.lineWidth=3;for(let i=-16;i<=16;i+=16){g.beginPath();g.moveTo(i,-82);g.lineTo(i*.9,-8);g.stroke()}g.beginPath();g.roundRect(-34,-96,68,10,3);P('#6a747a',3);g.restore()}
function fishbone(x,y,rot=0){g.save();g.translate(x,y);g.rotate(rot);g.strokeStyle=OL;g.lineWidth=3;g.beginPath();g.moveTo(-24,0);g.lineTo(18,0);for(let i=-16;i<14;i+=8){g.moveTo(i,0);g.lineTo(i+4,-8);g.moveTo(i,0);g.lineTo(i+4,8)}g.stroke();g.beginPath();g.moveTo(18,0);g.lineTo(30,-9);g.lineTo(30,9);g.closePath();P('#fff',2);g.restore()}
function sinkShape(){}
function plankBrick(px,ang,y0=632){ // pivot at px, plank length 400
  g.beginPath();g.moveTo(px-26,y0+8);g.lineTo(px+26,y0+8);g.lineTo(px+20,y0-26);g.lineTo(px-20,y0-26);g.closePath();P('#c8543a',3);g.strokeStyle='rgba(60,20,10,.5)';g.lineWidth=2;g.beginPath();g.moveTo(px-24,y0-9);g.lineTo(px+24,y0-9);g.stroke();
  g.save();g.translate(px,y0-30);g.rotate(ang);g.beginPath();g.rect(-200,-10,400,12);P('#d8a060',3);g.strokeStyle='rgba(120,70,30,.5)';g.lineWidth=1.5;g.beginPath();g.moveTo(-190,-4);g.lineTo(190,-4);g.stroke();g.restore()}
function plankEnd(px,ang,side,y0=632){return [px+Math.cos(ang)*200*side,y0-30+Math.sin(ang)*200*side-10]}
function lampPost(bx,by,bend,τ,lit){ // bend 0..1 arcs top over to the right
  const L=400;const a=bend*1.35;g.lineCap='round';
  const pts=[];for(let i=0;i<=20;i++){const u=i/20;const ang=a*u*u;pts.push([bx+Math.sin(ang)*L*u*(1-a*.1),by-Math.cos(ang)*L*u])}
  g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.strokeStyle=OL;g.lineWidth=20;g.stroke();g.strokeStyle='#3c4a44';g.lineWidth=13;g.stroke();
  g.beginPath();g.roundRect(bx-20,by-30,40,30,4);P('#3c4a44',3);
  const top=pts[20];const dir=Math.atan2(pts[20][1]-pts[19][1],pts[20][0]-pts[19][0])+PI/2;
  g.save();g.translate(top[0],top[1]);g.rotate(dir);
  g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(30,-10,50,10);g.strokeStyle=OL;g.lineWidth=9;g.stroke();g.strokeStyle='#3c4a44';g.lineWidth=5;g.stroke();
  g.beginPath();g.moveTo(36,10);g.lineTo(64,10);g.lineTo(58,36);g.lineTo(42,36);g.closePath();P(lit?'#fff27a':'#e8e4cc',3);g.beginPath();g.moveTo(32,12);g.lineTo(68,12);g.lineTo(50,-2);g.closePath();P('#3c4a44',3);
  if(lit){g.globalAlpha=.25;g.beginPath();g.moveTo(42,36);g.lineTo(0,240);g.lineTo(110,240);g.lineTo(58,36);g.closePath();g.fillStyle='#fff6a0';g.fill();g.globalAlpha=1}
  g.restore();return {top,dir}}
function tram(x,y){g.save();g.translate(x,y);
  g.strokeStyle=OL;g.lineWidth=4;g.beginPath();g.moveTo(240,-250);g.lineTo(300,-330);g.lineTo(360,-250);g.stroke();
  g.beginPath();g.roundRect(0,-250,580,210,24);P('#e8b23a',5);g.fillStyle='#c8352c';g.fillRect(4,-110,572,40);g.strokeRect(0,-110,580,40);
  for(let i=0;i<7;i++){g.beginPath();g.roundRect(40+i*74,-220,56,80,8);P('#cfe8f4',4);}
  g.beginPath();g.roundRect(-14,-200,30,150,10);P('#e8b23a',4);circ(-2,-80,10);P('#fff6a0',3);
  text('7',290,-90,26,'#fff',FT,900);[90,170,410,490].forEach(wx=>{circ(wx,-36,26);P('#3a3a42',4);circ(wx,-36,8);P('#8a8a92',2)});g.restore()}

// ================= sets =================
const SET={};
function mk(){const c=document.createElement('canvas');c.width=W;c.height=H;return c}
function cityView(x,y,w,h,seed){const R=rng(seed);const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,'#8fc6ec');gr.addColorStop(1,'#e8f2f0');g.fillStyle=gr;g.fillRect(x,y,w,h);
  for(let i=0;i<9;i++){const bw=30+R()*50,bh=h*(.3+R()*.55),bx=x+R()*w-10;g.fillStyle=['#c8a088','#a8b4c0','#d8c0a0','#b89a88'][i%4];g.fillRect(bx,y+h-bh,bw,bh);g.fillStyle='#f0e0a0';for(let wy=y+h-bh+8;wy<y+h-8;wy+=14)for(let wx=bx+5;wx<bx+bw-6;wx+=11)if(R()<.7)g.fillRect(wx,wy,5,7)}
  g.fillStyle='#b0a8a0';g.beginPath();g.arc(x+w*.7,y+h*.42,22,PI,TAU);g.fill();g.fillRect(x+w*.7-22,y+h*.42,44,h*.6);g.fillRect(x+w*.7-2,y+h*.42-40,4,18)}
function wallpaper(c1,c2,pat){g.fillStyle=c1;g.fillRect(0,0,W,600);for(let x=0;x<W;x+=64){g.fillStyle=c2;g.globalAlpha=.35;g.fillRect(x,0,26,600);g.globalAlpha=1;
  for(let y=30;y<590;y+=60){g.fillStyle=pat;g.save();g.translate(x+45,y+(x/64%2)*30);g.rotate(PI/4);g.fillRect(-4,-4,8,8);g.restore()}}}
function woodFloor(y0,col){g.fillStyle=col;g.fillRect(0,y0,W,H-y0);g.strokeStyle='rgba(60,30,10,.35)';g.lineWidth=2;const R=rng(3);for(let y=y0+22;y<H;y+=26+((y-y0)/8)){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();for(let k=0;k<6;k++){const x=R()*W;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-22);g.stroke()}}}
function baseboard(y,col){g.fillStyle=col;g.fillRect(0,y,W,22);g.strokeStyle=OL;g.lineWidth=3;g.strokeRect(-5,y,W+10,22)}
function frame(x,y,w,h,draw){g.beginPath();g.rect(x,y,w,h);P('#c89a40',5);g.save();g.beginPath();g.rect(x+12,y+12,w-24,h-24);g.clip();draw(x+12,y+12,w-24,h-24);g.restore();g.beginPath();g.rect(x+12,y+12,w-24,h-24);P(null,3)}
function buildBedroom(){wallpaper('#ead6a6','#d8bf86','#c4a466');g.fillStyle='#c9a46a';g.fillRect(0,0,W,22);baseboard(582,'#7a4b2a');woodFloor(604,'#a8743f');
  ell(760,672,280,36);P('#b8443a',3);ell(760,672,230,26);P(null,0);g.strokeStyle='#e0b050';g.lineWidth=5;g.stroke();
  // window
  g.beginPath();g.rect(560,110,270,320);P('#f4ecd8',5);cityView(578,128,234,284,11);g.fillStyle='#f4ecd8';g.fillRect(690,128,10,284);g.fillRect(578,262,234,10);g.strokeStyle=OL;g.lineWidth=3;g.strokeRect(578,128,234,284);g.beginPath();g.rect(546,428,298,18);P('#f4ecd8',4);
  frame(80,140,170,140,(x,y,w,h)=>{g.fillStyle='#a8d0e8';g.fillRect(x,y,w,h);g.fillStyle='#6aa85a';g.beginPath();g.ellipse(x+w*.4,y+h,w*.7,h*.5,0,0,TAU);g.fill();circ(x+w*.8,y+h*.3,14);g.fillStyle='#ffd23f';g.fill()});
  // shelf
  g.beginPath();g.rect(900,300,290,14);P('#8a5a35',4);[930,1160].forEach(bx=>{g.beginPath();g.moveTo(bx,314);g.lineTo(bx,344);g.lineTo(bx+20,314);g.closePath();P('#8a5a35',3)});
  // bed
  g.beginPath();g.roundRect(46,370,46,240,[30,30,4,4]);P('#8a5a35',5);g.beginPath();g.roundRect(440,470,36,140,[20,20,4,4]);P('#8a5a35',5);
  g.beginPath();g.rect(60,520,400,58);P('#a06a40',4);g.beginPath();g.rect(70,494,380,30);P('#fffdf4',4);
  [70,450].forEach(x=>{g.fillStyle='#6a3e22';g.fillRect(x-6,578,14,40)});
  ell(150,486,62,22);P('#fffdf4',4);
  // nightstand
  g.beginPath();g.rect(490,548,96,92);P('#9a6a40',4);g.beginPath();g.rect(500,566,76,30);P('#b07a48',3);circ(538,581,4);P('#e0b030',2);
  g.fillStyle='#ff9ac0';[[300,662],[340,668]].forEach(([x,y])=>{ell(x,y,26,10);P('#ff9ac0',3);circ(x-14,y-6,6);P('#fff',2)})}
function buildKitchen(){g.fillStyle='#f1d98a';g.fillRect(0,0,W,330);for(let y=330;y<590;y+=32)for(let x=0;x<W;x+=32){g.fillStyle=((x+y)/32)%2?'#ffffff':'#cfe6f2';g.fillRect(x,y,32,32)}g.strokeStyle='rgba(120,140,150,.4)';g.lineWidth=1;for(let y=330;y<590;y+=32){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke()}
  g.fillStyle='#d8b860';g.fillRect(0,322,W,10);baseboard(582,'#5a4a7a');
  for(let r=0;r<5;r++){const y0=604+r*24;for(let x=-40+((r%2)*36);x<W;x+=72){g.fillStyle='#2a2a30';g.fillRect(x,y0,36,24)}g.fillStyle='rgba(0,0,0,0)'}g.globalCompositeOperation='destination-over';g.fillStyle='#f4f0e6';g.fillRect(0,604,W,116);g.globalCompositeOperation='source-over';
  // window
  g.beginPath();g.rect(860,100,220,200);P('#f4ecd8',5);cityView(876,116,188,168,21);g.fillStyle='#f4ecd8';g.fillRect(966,116,8,168);g.strokeStyle=OL;g.lineWidth=3;g.strokeRect(876,116,188,168);
  [[852,96],[1048,96]].forEach(([x,y],i)=>{g.beginPath();g.moveTo(x,y);g.lineTo(x+40,y);g.quadraticCurveTo(x+(i?10:30),y+90,x+(i?40:0),y+110);g.lineTo(x+(i?40:0),y+110);g.closePath();g.fillStyle='#fff6ea';g.fill();g.save();g.clip();g.fillStyle='rgba(208,60,50,.75)';for(let k=0;k<6;k++)g.fillRect(x+k*12,y,6,120);g.restore();P(null,3)});
  // cupboard
  g.beginPath();g.rect(70,200,270,170);P('#c9884a',5);g.beginPath();g.rect(86,214,112,142);P('#d89a5a',3);g.beginPath();g.rect(212,214,112,142);P('#d89a5a',3);circ(190,285,5);P('#e0b030',2);circ(220,285,5);P('#e0b030',2);g.beginPath();g.rect(60,190,290,14);P('#a86a3a',4);
  // counter + sink
  g.beginPath();g.rect(40,470,300,112);P('#c9884a',5);g.beginPath();g.rect(30,452,320,22);P('#e8e0d0',4);g.beginPath();g.rect(120,454,140,14);P('#a8b4c0',3);
  g.lineWidth=8;g.strokeStyle=OL;g.beginPath();g.moveTo(190,452);g.lineTo(190,410);g.quadraticCurveTo(190,396,206,396);g.lineTo(220,396);g.stroke();g.lineWidth=4;g.strokeStyle='#c0c8d0';g.stroke();
  // stove
  g.beginPath();g.rect(1090,430,170,174);P('#3a3a42',5);g.beginPath();g.rect(1108,500,134,84);P('#4a4a54',3);g.beginPath();g.rect(1130,516,90,40);P('#8a6a40',3);for(let i=0;i<4;i++){circ(1112+i*44,462,7);P('#c0c0c8',2)}g.beginPath();g.rect(1080,420,190,14);P('#2a2a30',3);
  // stool
  g.fillStyle='#2a2a30';
  // calendar
  g.beginPath();g.rect(640,140,100,120);P('#fffdf4',3);g.fillStyle='#c8352c';g.fillRect(642,142,96,26);text('IUNIE',690,156,16,'#fff',FT,900);for(let i=0;i<12;i++)text(String(i+1),656+(i%4)*22,186+Math.floor(i/4)*22,13,'#3a2414',FT,700)}
function buildLiving(){wallpaper('#a9c79a','#8fb27e','#6f9a62');g.fillStyle='#efe6d0';g.fillRect(0,0,W,26);g.strokeStyle=OL;g.lineWidth=3;g.beginPath();g.moveTo(0,26);g.lineTo(W,26);g.stroke();baseboard(582,'#6a3e22');
  g.fillStyle='#9a6a3a';g.fillRect(0,604,W,116);g.strokeStyle='rgba(60,30,10,.35)';g.lineWidth=2;for(let y=604;y<H;y+=22)for(let x=((y/22)%2)*30;x<W;x+=60){g.beginPath();g.moveTo(x,y);g.lineTo(x+30,y+22);g.stroke()}
  ell(640,676,320,34);P('#3d6fb5',3);ell(640,676,270,24);P(null,0);g.strokeStyle='#e0b050';g.lineWidth=4;g.stroke();
  frame(330,110,150,190,(x,y,w,h)=>{g.fillStyle='#d8c8a0';g.fillRect(x,y,w,h);circ(x+w/2,y+h*.45,34);P(SKIN,3);ell(x+w/2+4,y+h*.6,26,9);P('#eeeeee',3);circ(x+w/2-12,y+h*.4,4);P(OL,0);circ(x+w/2+12,y+h*.4,4);P(OL,0);g.fillStyle='#3a3a42';g.fillRect(x+10,y+h*.75,w-20,h*.3)});
  text('BUNICUL',405,316,14,'#3a2414',FT,900);
  g.beginPath();g.roundRect(40,470,260,120,[30,30,6,6]);P('#b8443a',5);g.beginPath();g.roundRect(20,500,50,100,14);P('#a83a30',4);g.beginPath();g.roundRect(270,500,50,100,14);P('#a83a30',4);g.beginPath();g.rect(66,530,208,50);P('#c85448',3);[90,250].forEach(x=>{g.fillStyle='#5a3414';g.fillRect(x,590,10,16)});
  // lamp
  g.fillStyle=OL;g.fillRect(686,300,6,300);g.beginPath();g.moveTo(650,300);g.lineTo(730,300);g.lineTo(712,250);g.lineTo(668,250);g.closePath();P('#f0d080',4);ell(689,600,30,8);P('#3a3a42',3);
  // wardrobe
  g.beginPath();g.rect(960,170,230,440);P('#8a5a35',5);g.beginPath();g.rect(950,160,250,18);P('#6a3e22',4);g.beginPath();g.rect(978,196,90,390);P('#9a6a40',3);g.beginPath();g.rect(1082,196,90,390);P('#9a6a40',3);circ(1060,400,6);P('#e0b030',2);circ(1090,400,6);P('#e0b030',2);g.beginPath();g.rect(960,600,230,12);P('#6a3e22',3)}
function stairsY(x){return x<150?250:x>1180?690:250+(x-150)*(440/1030)}
function buildStairs(){g.fillStyle='#d8cfb8';g.fillRect(0,0,W,H);g.fillStyle='#7a9a8a';g.beginPath();g.moveTo(0,250-130);g.lineTo(150,250-130);g.lineTo(1180,690-130);g.lineTo(W,690-130);g.lineTo(W,H);g.lineTo(0,H);g.closePath();g.fill();
  g.strokeStyle='#5a7a6a';g.lineWidth=4;g.beginPath();g.moveTo(0,120);g.lineTo(150,120);g.lineTo(1180,560);g.lineTo(W,560);g.stroke();
  // window
  g.beginPath();g.rect(560,90,160,180);P('#f4ecd8',5);cityView(574,104,132,152,31);g.fillStyle='#f4ecd8';g.fillRect(636,104,8,152);
  // steps
  g.fillStyle='#8a5a35';g.beginPath();g.moveTo(0,250);g.lineTo(150,250);const n=18,sw=1030/n,sh=440/n;let x=150,y=250;for(let i=0;i<n;i++){g.lineTo(x,y+sh);x+=sw;y+=sh;g.lineTo(x,y)}g.lineTo(W,690);g.lineTo(W,H);g.lineTo(0,H);g.closePath();g.fill();
  g.strokeStyle=OL;g.lineWidth=4;g.beginPath();g.moveTo(0,250);g.lineTo(150,250);x=150;y=250;for(let i=0;i<n;i++){g.lineTo(x,y+sh);x+=sw;y+=sh;g.lineTo(x,y)}g.lineTo(W,690);g.stroke();
  g.strokeStyle='#b07a48';g.lineWidth=3;x=150;y=250;for(let i=0;i<n;i++){g.beginPath();g.moveTo(x+2,y+sh+3);g.lineTo(x+sw-2,y+sh+3);g.stroke();x+=sw;y+=sh}
  // railing
  for(let i=0;i<=n;i+=2){const px=150+i*sw+20,py=stairsY(px);g.fillStyle=OL;g.fillRect(px-3,py-110,6,110)}g.lineWidth=12;g.strokeStyle=OL;g.beginPath();g.moveTo(150,140);g.lineTo(1200,580);g.stroke();g.lineWidth=7;g.strokeStyle='#8a5a35';g.stroke();
  // doors
  g.beginPath();g.rect(26,80,110,170);P('#7a4b2a',5);g.beginPath();g.rect(40,96,82,70);P('#8a5a35',3);circ(118,180,5);P('#e0b030',2);g.beginPath();g.roundRect(60,60,40,26,4);P('#fffdf4',3);text('7',80,74,18,'#3a2414',FT,900);
  g.beginPath();g.rect(1190,500,90,190);P('#1a1410',5);g.fillStyle='#fff6d0';g.globalAlpha=.6;g.fillRect(1200,510,70,170);g.globalAlpha=1}
function facade(x,w,h,col,seed,sign){const R=rng(seed);const y=560-h;g.beginPath();g.rect(x,y,w,h);P(col,4);g.fillStyle='rgba(0,0,0,.08)';g.fillRect(x,y,w,14);
  for(let wy=y+40;wy<500;wy+=90)for(let wx=x+24;wx<x+w-50;wx+=70){g.beginPath();g.rect(wx,wy,40,56);P('#cfe8f4',3);g.fillStyle='#f4ecd8';g.fillRect(wx+18,wy,4,56);g.beginPath();g.rect(wx-8,wy-2,8,60);P('#5a8a6a',2);g.beginPath();g.rect(wx+40,wy-2,8,60);P('#5a8a6a',2);if(R()<.3){g.beginPath();g.rect(wx-6,wy+52,52,8);P('#8a8a92',2)}}
  if(sign){g.beginPath();g.rect(x+20,440,w-40,36);P('#3a2414',3);text(sign,x+w/2,458,22,'#ffe7b0',FT,900);g.save();for(let i=0;i<(w-40)/20;i++){g.beginPath();g.moveTo(x+20+i*20,476);g.lineTo(x+40+i*20,476);g.lineTo(x+30+i*20,500);g.closePath();g.fillStyle=i%2?'#fff6ea':'#c8352c';g.fill()}g.restore()}}
function buildStreet(){const gr=g.createLinearGradient(0,0,0,400);gr.addColorStop(0,'#7fb8e6');gr.addColorStop(1,'#e6f0ec');g.fillStyle=gr;g.fillRect(0,0,W,H);
  [[200,90,'#c8b8a8'],[520,60,'#d8c4a8'],[880,110,'#c4a898']].forEach(([x,y,c])=>{g.fillStyle=c;g.fillRect(x,y+80,220,400);g.fillStyle='rgba(255,255,255,.4)';for(let i=0;i<6;i++)for(let j=0;j<3;j++)g.fillRect(x+20+j*70,y+100+i*50,20,26)});
  facade(0,300,460,'#e2c48e',1);facade(300,320,380,'#e8b8a8',2,'BRUTĂRIE');facade(620,300,430,'#b8c8d8',3);facade(920,360,340,'#d8d0a0',4,'LAPTE · OUĂ');
  // door of block
  g.beginPath();g.rect(110,410,110,150);P('#5a3a22',4);g.beginPath();g.rect(122,422,86,60);P('#cfe8f4',3);g.beginPath();g.roundRect(146,384,38,24,4);P('#fffdf4',3);text('7',165,397,16,'#3a2414',FT,900);
  g.strokeStyle=OL;g.lineWidth=2;g.beginPath();g.moveTo(0,40);g.lineTo(W,30);g.moveTo(0,52);g.lineTo(W,42);g.stroke();
  // sidewalk + road
  g.fillStyle='#cfc6b4';g.fillRect(0,560,W,50);g.strokeStyle='rgba(90,80,60,.35)';g.lineWidth=2;for(let x=0;x<W;x+=60){g.beginPath();g.moveTo(x,560);g.lineTo(x-10,610);g.stroke()}
  g.fillStyle='#8a8478';g.fillRect(0,606,W,8);g.fillStyle='#7d7468';g.fillRect(0,614,W,106);const R=rng(9);for(let y=620;y<H;y+=16)for(let x=((y/16)%2)*14;x<W;x+=28){ell(x,y,12,6);g.fillStyle=R()<.5?'#8a8274':'#746c60';g.fill()}
  g.fillStyle='#c0c4c8';g.fillRect(0,662,W,5);g.fillRect(0,702,W,5);
  // park: fence + tree + bench
  circ(1210,330,90);P('#3f8f3a',5);circ(1150,360,60);P('#4f9a4a',4);g.fillStyle='#6a4a2a';g.fillRect(1196,400,26,160);
  for(let x=1000;x<W;x+=24){g.fillStyle='#f4ecd8';g.fillRect(x,500,12,60);g.strokeStyle=OL;g.lineWidth=2;g.strokeRect(x,500,12,60)}g.fillStyle='#f4ecd8';g.fillRect(1000,516,280,8);
  g.beginPath();g.rect(860,560-46,140,12);P('#8a5a35',3);g.beginPath();g.rect(860,560-82,140,12);P('#8a5a35',3);g.fillStyle=OL;g.fillRect(872,520,6,40);g.fillRect(982,520,6,40)}
function sandbox(x,y,mound=1){g.beginPath();g.moveTo(x-125,y);g.quadraticCurveTo(x,y-100*mound,x+125,y);g.closePath();P('#ecd28a',4);g.fillStyle='rgba(200,160,80,.5)';for(let i=0;i<14;i++)circ(x-80+i*12,y-8-((i*7)%20),2),g.fill();g.beginPath();g.rect(x-130,y-4,260,22);P('#a86a3a',4)}
function buildBg(){[['bed',buildBedroom],['kit',buildKitchen],['liv',buildLiving],['stairs',buildStairs],['street',buildStreet]].forEach(([k,fn])=>{SET[k]=mk();withCtx(SET[k].getContext('2d'),()=>{g.lineJoin='round';fn()})})}
