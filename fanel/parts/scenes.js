// ================= scene helpers =================
const SF=.85,GY=640;
function drapes(x1,y1,x2,y2,pull){[[x1,1],[x2,-1]].forEach(([x,d])=>{const w=64;g.beginPath();g.moveTo(x,y1);g.lineTo(x+d*w,y1);g.quadraticCurveTo(x+d*(w*.6)+pull,(y1+y2)/2,x+d*w*.8+pull*1.2,y2);g.lineTo(x+pull*.6,y2);g.quadraticCurveTo(x+pull*.3,(y1+y2)/2,x,y1);g.closePath();P('#b8443a',4);
  g.strokeStyle='rgba(80,20,10,.4)';g.lineWidth=3;for(let k=1;k<3;k++){g.beginPath();g.moveTo(x+d*w*k/3,y1+4);g.quadraticCurveTo(x+d*w*k/3*.8+pull*.8,(y1+y2)/2,x+d*w*k/3*.9+pull,y2-4);g.stroke()}});
  g.beginPath();g.rect(x1-20,y1-14,x2-x1+40,14);P('#8a5a35',3)}
function bookPile(x,y,n){const B=[];for(let i=0;i<n;i++){const u=hash(i+3)*2-1;const h=(1-u*u)*120*Math.sqrt(hash(i+50));B.push([x+u*120,y-h,(hash(i+9)-.5)*.9,i,h])}B.sort((a,b)=>a[4]-b[4]);B.forEach(([bx,by,r,i])=>book(bx,by+6,46,14,i,r))}
let SIL=null;
function holeSil(){if(SIL)return SIL;const c=document.createElement('canvas');c.width=440;c.height=300;withCtx(c.getContext('2d'),()=>fanel(345,150,SF,{rot:-PI/2,hl:[-80,-200],hr:[80,-200],feet:[[-34,0],[34,0]],mouth:'open'}));
  const h=document.createElement('canvas');h.width=440;h.height=300;const hc=h.getContext('2d');
  hc.save();hc.translate(220,150);hc.scale(1.1,1.12);hc.drawImage(c,-220,-150);hc.restore();hc.globalCompositeOperation='source-in';hc.fillStyle='#2a1a10';hc.fillRect(0,0,440,300);
  const t=document.createElement('canvas');t.width=440;t.height=300;const tc=t.getContext('2d');tc.drawImage(c,0,0);tc.globalCompositeOperation='source-in';const gr=tc.createLinearGradient(0,0,0,300);gr.addColorStop(0,'#8fc6ec');gr.addColorStop(1,'#e6f2f0');tc.fillStyle=gr;tc.fillRect(0,0,440,300);
  tc.globalCompositeOperation='source-atop';tc.fillStyle='#b8a898';tc.fillRect(60,190,60,110);tc.fillRect(140,160,50,140);tc.fillRect(260,200,70,100);
  hc.globalCompositeOperation='source-over';hc.drawImage(t,0,0);SIL=h;return h}
function ceilingHole(x,p){g.save();g.beginPath();const pts=[[-70,0],[-58,30],[-40,22],[-30,48],[-6,36],[8,56],[22,34],[44,44],[52,20],[72,0]];pts.forEach(([a,b],i)=>i?g.lineTo(x+a,b):g.moveTo(x+a,b));g.closePath();P('#1a1210',4);
  g.strokeStyle=OL;g.lineWidth=2;[[-70,0,-110,40],[72,0,120,30],[8,56,14,80]].forEach(([a,b,c,d])=>{g.beginPath();g.moveTo(x+a,b);g.lineTo(x+c,d);g.stroke()});g.restore()}
function chunks(x,y,p,n=8,spread=120){if(p<=0||p>=1)return;for(let i=0;i<n;i++){const cx=x+(hash(i+20)-.5)*spread,cy=y+p*p*520*(.6+hash(i+30)*.6);ell(cx,cy,6+hash(i)*8,5+hash(i+1)*6,p*6+i);P('#efe6d0',2)}}
function moth(x,y,ph){g.save();g.translate(x,y);const w=Math.abs(Math.sin(ph))*10+3;ell(-6,-2,8,w,-.5);P('#c8c0b0',2);ell(6,-2,8,w,.5);P('#c8c0b0',2);ell(0,0,3,6);P('#7a7068',1.5);g.restore()}
function sweat(x,y,τ){for(let i=0;i<2;i++){const p=((τ*1.5+i/2)%1);g.globalAlpha=1-p;g.beginPath();const sx=x+i*16,sy=y+p*30;g.moveTo(sx,sy-8);g.quadraticCurveTo(sx+6,sy,sx,sy+4);g.quadraticCurveTo(sx-6,sy,sx,sy-8);P('#8ac4ff',1.5);g.globalAlpha=1}}
function heartsUp(x,y,τ,n=3){for(let i=0;i<n;i++){const p=((τ*.6+i/n)%1);g.save();g.globalAlpha=1-p;g.translate(x+Math.sin(p*6+i)*24,y-p*110);g.scale(1.6,1.6);heartPath();P('#e0405a',1.5);g.restore();g.globalAlpha=1}}
function crack(x,y){g.strokeStyle=OL;g.lineWidth=3;[[-80,10],[-40,30],[60,20],[90,6]].forEach(([dx,dy])=>{g.beginPath();g.moveTo(x,y);g.lineTo(x+dx*.5,y+dy*.6);g.lineTo(x+dx,y+dy);g.stroke()})}
function shadow(x,y,w=60){ell(x,y,w,9);g.fillStyle='rgba(40,20,10,.22)';g.fill()}

// ================= cards =================
function paperCard(a){g.fillStyle='#000';g.fillRect(-20,-20,W+40,H+40);g.globalAlpha=a;
  const gr=g.createRadialGradient(W/2,H/2,100,W/2,H/2,760);gr.addColorStop(0,'#f6ebcc');gr.addColorStop(1,'#d8c08c');g.fillStyle=gr;g.fillRect(40,30,W-80,H-60);
  g.strokeStyle='#5a3a1a';g.lineWidth=6;g.strokeRect(70,58,W-140,H-116);g.lineWidth=2;g.strokeRect(84,72,W-168,H-144);
  [[84,72],[W-84,72],[84,H-72],[W-84,H-72]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,16,0,TAU);g.fillStyle='#f6ebcc';g.fill();g.lineWidth=3;g.stroke();g.beginPath();g.arc(x,y,7,0,TAU);g.fillStyle='#c8352c';g.fill();g.stroke()})}
function intertitle(lines,τ,dur){const a=seg(τ,0,.6)*(1-seg(τ,dur-.6,dur));paperCard(a);
  const n=lines.length,lh=70;lines.forEach((l,i)=>{const hl=l.startsWith('*');text(hl?l.slice(1):l,W/2,H/2-(n-1)*lh/2+i*lh-20,hl?78:44,hl?'#b02a22':'#3a2414',hl?FD:FT,hl?400:700)});
  g.save();g.translate(W/2,H-150);g.scale(.5,.5);clock(0,0,1,τ,{});g.restore();g.globalAlpha=1}
function factCard(τ,dur,title,lines,diag){const a=seg(τ,0,.6)*(1-seg(τ,dur-.6,dur));paperCard(a);g.globalAlpha=a;
  text('ȘTIAI CĂ?',W/2,118,28,'#3f6f2a',FT,900);text(title,W/2,178,68,'#b02a22',FD,400,'center','#3a2414',2);
  g.save();g.translate(W/2,350);diag(τ);g.restore();
  lines.forEach((l,i)=>text(l,W/2,500+i*48,32,'#3a2414',FT,700));g.globalAlpha=1}
function dGravity(τ){g.fillStyle='#8a6a40';g.fillRect(-260,70,520,10);const p=(τ%1.6)/1.6;const yy=40-Math.sin(p*PI)*200;glove(-60,58,16);circ(-60,yy-14,16);P('#d0302a',3);
  g.strokeStyle='#b02a22';g.lineWidth=8;g.beginPath();g.moveTo(140,-120);g.lineTo(140,30);g.stroke();g.beginPath();g.moveTo(118,10);g.lineTo(140,50);g.lineTo(162,10);g.closePath();P('#b02a22',0);text('cade',200,-50,26,'#b02a22',FT,900)}
function dInertia(τ){const p=(τ%2.4)/2.4;g.beginPath();g.rect(-180,0,360,12);P('#a86a3a',3);g.fillStyle='#8a5a35';g.fillRect(-160,12,14,90);g.fillRect(146,12,14,90);
  let cx=0;if(p>.3&&p<.36)cx=(p-.3)/.06*500;else if(p>=.36&&p<.75)cx=500;else if(p>=.75)cx=500*(1-(p-.75)/.25);
  if(cx<480)tablecloth(-190+cx,190+cx,-2,30);if(p>.3&&p<.5){speed(250,10,1,140,3)}
  plate(-90,-4);egg(-90,-10,.8);cup(10,-2,.9);teapot(110,0,.8)}
function dLever(τ){const a=Math.sin(τ*2)*.22;g.beginPath();g.moveTo(-26,80);g.lineTo(26,80);g.lineTo(0,30);g.closePath();P('#c8543a',3);
  g.save();g.translate(60,26);g.rotate(a);g.beginPath();g.rect(-280,-8,360,12);P('#d8a060',3);g.beginPath();g.rect(30,-78,70,70);P('#6a6a72',3);text('100',65,-50,20,'#fff',FT,900);text('KG',65,-28,16,'#fff',FT,900);glove(-262,-22+Math.max(0,a)*0,18);g.restore();
  text('mult',-180,-70,24,'#3f6f2a',FT,900);text('puțin',140,-120,24,'#3f6f2a',FT,900)}
function dFriction(τ){const p=Math.min(1,((τ%2.6)/2.6)*1.6);[[-60,'SĂPUN','#ff9ac0',1],[60,'NISIP','#ecd28a',.22]].forEach(([y,lab,col,k])=>{g.beginPath();g.rect(-300,y,600,16);P(col,3);text(lab,-360,y+8,22,'#3a2414',FT,900);const x=-280+480*k*easeOut(p);g.beginPath();g.rect(x,y-40,50,40);P('#3d6fb5',3);if(p<.5)speed(x,y-20,1,60,2)})}

// ================= scenes =================
function sceneLeader(τ){g.fillStyle='#c9c2b0';g.fillRect(-20,-20,W+40,H+40);const n=3-Math.floor(τ/1.15),p=(τ%1.15)/1.15;
  g.strokeStyle='#2a2a2a';g.lineWidth=4;g.beginPath();g.arc(W/2,H/2,250,0,TAU);g.stroke();g.beginPath();g.arc(W/2,H/2,210,0,TAU);g.stroke();
  g.beginPath();g.moveTo(0,H/2);g.lineTo(W,H/2);g.moveTo(W/2,0);g.lineTo(W/2,H);g.lineWidth=2;g.stroke();
  g.fillStyle='rgba(60,60,60,.35)';g.beginPath();g.moveTo(W/2,H/2);g.arc(W/2,H/2,600,-PI/2,-PI/2+p*TAU);g.closePath();g.fill();if(n>0)text(String(n),W/2,H/2+10,260,'#1a1a1a',FT,900)}
function sceneTitle(τ,t){g.save();g.translate(W/2,H/2);g.rotate(τ*.15);for(let i=0;i<24;i++){g.beginPath();g.moveTo(0,0);g.arc(0,0,1000,i*TAU/24,(i+1)*TAU/24);g.closePath();g.fillStyle=i%2?'#3d6fb5':'#5a8ad0';g.fill()}g.restore();
  const vg=g.createRadialGradient(W/2,H/2,150,W/2,H/2,720);vg.addColorStop(0,'rgba(255,240,200,.35)');vg.addColorStop(1,'rgba(20,20,60,.55)');g.fillStyle=vg;g.fillRect(0,0,W,H);
  const a=back(seg(τ,.3,1.3));g.save();g.translate(W/2,150);g.scale(a,a);text('FĂNEL',0,0,150,'#e8b23a',FD,400,'center','#2a1a10',14);g.restore();
  const c=back(seg(τ,1.5,2.5));g.save();g.translate(W/2,300);g.scale(c,c);g.rotate(Math.sin(τ*2)*.02);g.beginPath();g.roundRect(-400,-56,800,112,28);P('#fff3d6',6);text('și Legile Fizicii',0,4,72,'#c8352c',FD,400,'center','#2a1a10',6);g.restore();
  const sl=easeOut(seg(τ,2.6,3.8));
  fanel(lerp(-200,330,sl),680,1.05,{face:1,hr:[60,-200+Math.sin(τ*8)*16],mouth:'grin',look:[.6,0],tt:τ});
  cat(lerp(1480,960,sl),680,1.25,{face:-1,hr:[30,-110+Math.sin(τ*8+1)*14],smug:.45,mouth:'smirk',tt:τ,look:[.6,0]})}

// ---------- ACT 1: bedroom, gravity ----------
function act1(τ,t){
  g.drawImage(SET.bed,0,0);
  const snore=τ<5;const inh=snore?Math.max(0,Math.sin(τ*TAU/2.4)):0;
  drapes(546,110,844,440,-inh*70);
  // shelf objects
  for(let i=0;i<10;i++){const r=35.6+i*.3;if(τ<r)book(1080+i*11,300,10,40+((i*7)%14),i)}
  let potX=1040,potY=300,potR=0;
  if(τ>=29&&τ<31.3){potX=1040+seg(τ,29,31.3)*8;potR=Math.sin(τ*20)*.08*seg(τ,30,31.3)}
  if(τ>=31.3){const p=seg(τ,31.3,31.9);potY=lerp(300,GY,p*p);potX=1048;potR=p*.4*(τ<31.9?1:0)}
  // cat
  const c={sit:true,face:1,tt:τ,smug:.45,look:[.5,.6]};let cx=930,cy=300;
  if(τ<5.2){c.closed=true;c.mouth='smile'}
  if(τ>=5.2&&τ<6.2){cy=300-Math.sin(seg(τ,5.2,6.2)*PI)*80;c.furUp=true;c.eyeBig=1.5;c.smug=0;c.sit=false;c.mouth='o'}
  if(τ>=6.2&&τ<22){c.look=[-1,.6];c.mouth='smirk';if(τ>12&&τ<14){c.hr=[30,-100];c.closed=true}}
  if(τ>=17.3&&τ<22){c.mouth='grin';c.closed=true;c.headDy=Math.sin(τ*20)*2}
  if(τ>=27&&τ<29){cx=lerp(930,1000,seg(τ,27,29));c.sit=false;c.tiptoe=τ*9;c.smug=.6;c.look=[1,0]}
  if(τ>=29&&τ<31.3){cx=1000;c.sit=false;c.hr=[34+seg(τ,29,31.3)*10,-60];c.look=[1,1];c.mouth='grin'}
  if(τ>=31.3&&τ<32.3){cx=1000;c.sit=false;c.look=[0,1];c.eyeBig=1.2;c.mouth='grin'}
  if(τ>=32.3&&τ<34){cx=1000;c.sit=false;c.mouth='frown';c.smug=.5;c.look=[0,1]}
  if(τ>=34&&τ<35.5){cx=1000;c.sit=false;c.mouth='whistle';c.look=[-1,-1];c.smug=0;c.hl=[-10,-80];c.hr=[30,-80]}
  if(τ>=35.5&&τ<39){cx=lerp(1000,1060,seg(τ,35.5,36));c.sit=false;c.hr=[40,-50+Math.sin(τ*20)*10];c.look=[1,1];c.mouth='grin'}
  if(τ>=39){cx=1060;c.sit=false;c.closed=true;c.mouth='open';c.rot=Math.sin(τ*9)*.25;c.hl=[0,-60];c.hr=[10,-50];c.smug=0}
  cat(cx,cy,.9,c);
  if(τ>=39)tears(cx+12,cy-110,τ,1);
  if(τ<31.3)flowerPot(potX,potY,.8,potR);
  // Fanel
  const o={face:1,tt:τ,look:[.4,0]};let fx=640,fy=GY;
  const bedFx=330,bedFy=486;
  // clock
  let ck=null;
  if(τ<9){const ring=τ>=5;ck={x:540,y:548-(τ>=7&&τ<9?Math.abs(Math.sin(τ*12))*22:0),ring}}
  else if(τ<13.6)ck={x:540,y:548,ring:true,flat:τ>=10.95};
  if(τ<9){
    let lift=0;if(τ>=5.2&&τ<7){lift=Math.sin(seg(τ,5.2,7)*PI)*330}
    const ly={rot:-PI/2,closed:τ<5.2,mouth:snore?'o':(lift>0?'open':'grit'),mst:snore?Math.sin(τ*TAU/1.2):0,hairUp:lift>0,eyePop:lift>0?.8:0,look:[0,0],tt:τ,brow:τ>=7?'angry':null};
    if(lift>0){g.beginPath();g.roundRect(196,452-inh*6,262,64,18);P('#3d6fb5',4)}
    fanel(bedFx,bedFy-lift,SF,ly);
    if(lift===0){g.beginPath();g.roundRect(196,452-inh*8,262,64+inh*8,18);P('#3d6fb5',4);g.strokeStyle='#e8b23a';g.lineWidth=4;g.beginPath();g.moveTo(206,470-inh*8);g.lineTo(450,470-inh*8);g.stroke()}
    if(τ>=7){ell(170,470,58,24,.1);P('#fffdf4',4)}
    if(snore)zzz(230,400,τ);
    if(lift>0)popText('BOING!',bedFx-150,bedFy-lift-120,54,seg(τ,5.2,6.4));
  } else {
    if(τ<9.4){const p=seg(τ,9,9.4);fx=lerp(300,640,p);fy=GY-Math.sin(p*PI)*160;o.face=-1;o.mouth='grit';o.brow='angry'}
    else if(τ<13.6){o.face=-1;o.brow='angry';o.mouth='grit';o.red=.3;
      if(τ<10.8){o.hr=[40,-270];o.headDx=Math.sin(τ*50)*2}else if(τ<11.3){o.hr=[118,-150]}
      else if(τ<13){o.brow='up';o.mouth='o';o.eyeBig=1.3;o.red=0;o.hr=[60,-90]}
      else{o.hr=[118,-140];o.mouth='grit'}}
    else if(τ<14.6){o.face=-1;o.hr=[50,-300];o.mouth='grit';o.brow='angry'}
    else if(τ<16.6){o.face=1;o.closed=true;o.mouth='grin';const k=Math.sin(τ*20);o.hl=[-10,-100+k*8];o.hr=[20,-100-k*8]}
    else if(τ<17.2){o.face=1;o.look=[0,-1];o.eyeBig=1.5;o.mouth='o';o.hairUp=τ>16.8}
    else if(τ<19){const k=τ-17.2;o.sq=1-.5*Math.exp(-k*4)*Math.cos(k*16);o.dizzy=true;o.mouth='frown';o.headItem=(hx,hy)=>clock(hx,hy-4,.9,τ,{flat:true,ring:true})}
    else if(τ<22.6){o.red=seg(τ,19,20.8);o.mouth='grit';o.brow='angry';o.headDx=Math.sin(τ*60)*2.5;o.hatUp=τ>21&&τ<22.4?Math.sin(seg(τ,21,22.4)*PI)*280:0;o.hr=[40,-60];o.hl=[-40,-60]}
    else if(τ<26){fx=lerp(640,990,seg(τ,22.6,26));o.walk=τ*8;o.red=1-seg(τ,22.6,25);o.brow='angry';o.mouth='grit';o.sq=1-Math.abs(Math.sin(τ*8))*.05}
    else if(τ<30.8){fx=990;const u=(Math.sin(τ*PI*2)+1)/2;o.hl=[-50,-60-150*u];o.hr=[50,-60-150*u];o.closed=true;o.mouth='smile';o.sq=1-.05*u}
    else if(τ<32.2){fx=990;o.rot=-.9*seg(τ,30.8,31.15)*(1-seg(τ,31.9,32.2));o.hl=[-70,-60];o.hr=[-50,-80];o.closed=true;o.mouth='smile'}
    else if(τ<33.5){fx=990;o.look=[1,1];o.eyeBig=1.3;o.mouth='o'}
    else if(τ<35.6){fx=990;o.look=[.6,-1];o.brow='angry';o.mouth='grit';o.red=.5;o.hr=[40,-250+Math.sin(τ*30)*16]}
    else if(τ<39.2){fx=990;const n=Math.max(0,Math.floor((τ-36.05)/.3)+1);o.sq=1-Math.min(10,n)*.025;o.blink=((τ-36.05)%.3)<.1&&τ>36.05?1:0;o.mouth='frown';o.look=[0,-1];o.brow='up'}
    else{fx=-999}
    if(τ>=39.2&&τ<42.5){bookPile(990,GY,30);if(τ>40){const w=Math.sin(τ*10)*14;g.lineCap='round';limb(990,560,990+w,500,0,PJ,10);glove(990+w,498,13);g.beginPath();g.moveTo(990+w,490);g.lineTo(990+w+46,486+Math.sin(τ*12)*6);g.lineTo(990+w+42,520);g.closePath();P('#fff',3)}}
    else if(τ>=42.5){fanel(990,GY+120-easeOut(seg(τ,42.5,43))*30,SF,{face:1,dizzy:true,mouth:'frown',tt:τ,headItem:(hx,hy)=>{g.beginPath();g.moveTo(hx-40,hy+10);g.lineTo(hx,hy-24);g.lineTo(hx+40,hy+10);g.lineWidth=6;g.strokeStyle=OL;g.stroke();g.lineWidth=3;g.strokeStyle='#3d6fb5';g.stroke()}});bookPile(990,GY,30);stars(990,GY-120,τ)}
    if(fx>-900){shadow(fx,GY+4,70*o.sq||70);fanel(fx,fy,SF,o)}
    if(τ>=17.3&&τ<19.5)stars(fx,GY-215,τ);
    if(τ>=20.8&&τ<22.6){steam(fx-40,GY-160,τ,-1);steam(fx+40,GY-160,τ,1)}
    if(τ>=21&&τ<22.6)gibber(fx+120,GY-300,τ);
    if(τ>=34&&τ<35.5)gibber(fx+110,GY-300,τ);
    if(τ>=26&&τ<30.8)notes(fx+60,GY-220,τ);
    if(τ>=35.6&&τ<39.2){const n=Math.min(10,Math.max(0,Math.floor((τ-36.05)/.3)+1));const top=GY-232*SF*(1-n*.025);for(let i=0;i<n;i++)book(fx+((i%3)-1)*6,top-i*13,46,13,i,((i%2)-.5)*.1)}
  }
  // flying books
  for(let i=0;i<10;i++){const r=35.6+i*.3;if(τ>=r&&τ<r+.45){const p=(τ-r)/.45;const top=GY-232*SF*(1-i*.025)-i*13;book(lerp(1080+i*11,990,p),lerp(290,top,p*p),46,13,i,p*3)}}
  if(ck)clock(ck.x,ck.y,1,τ,{ring:ck.ring,flat:ck.flat});
  if(τ>=13.6&&τ<14.6){const p=seg(τ,13.6,14.6);if(τ>=14){const q=seg(τ,14,14.6);clock(lerp(598,640,q),lerp(385,-150,easeOut(q)),1,τ,{flat:true,ring:true})}}
  if(τ>=16.4&&τ<17.2){const p=seg(τ,16.4,17.2);clock(640,lerp(-150,GY-232*SF,p*p),1,τ,{flat:true,ring:true})}
  if(τ>=19&&τ<19.6){const p=seg(τ,19,19.6);clock(lerp(640,720,p),lerp(GY-232*SF,GY-10,p*p),1,τ,{flat:true})}
  if(τ>=19.6)clock(720,GY-10,1,τ,{flat:true});
  if(τ>=31.3){flowerPot(potX,potY,.8,potR);if(τ<32.5)dust(1048,GY-20,seg(τ,31.9,32.5),60)}
  if(τ>=17.2)popText('BONG!',720,GY-330,60,seg(τ,17.2,18.4));
  if(τ>=10.95)popText('PAC!',480,440,50,seg(τ,10.95,11.8));
  caption('Gravitația: tot ce arunci în sus... cade înapoi!',seg(τ,17.8,18.3)*(1-seg(τ,22,22.5)));
}

// ---------- ACT 2: kitchen, inertia ----------
function act2(τ,t){
  g.drawImage(SET.kit,0,0);
  // hole in wall
  if(τ>=31.7){const h=holeSil();g.drawImage(h,460-220,320-150);chunks(460,330,seg(τ,31.7,32.8),9,160);dust(460,330,seg(τ,31.7,32.6),110)}
  // kettle
  const kw=(τ>=17&&τ<18.3)||(τ>=26.5&&τ<28.2);g.save();g.translate(1160,420);if(kw)g.rotate(Math.sin(τ*50)*.06);teapot(0,0,1.1);g.restore();if(kw)steam(1205,370,τ,1);
  // table
  let dx=0;if(τ>=20.2)dx=120*easeOut(seg(τ,20.2,20.5));
  const tx1=580+dx,tx2=950+dx;
  g.fillStyle='#8a5a35';[[600+dx],[915+dx]].forEach(([lx])=>{g.beginPath();g.rect(lx,470,16,170);P('#8a5a35',3)});
  g.beginPath();g.rect(tx1,460,tx2-tx1,16);P('#a86a3a',3);
  const clothOn=!(τ>=7.95&&τ<12);
  if(clothOn)tablecloth(tx1-10,tx2+10,458,48,τ<20.2?0:τ*10);
  // dishes
  let hop=0;if(τ>=7.95&&τ<8.6)hop=Math.abs(Math.sin((τ-7.95)*25))*4*(1-seg(τ,7.95,8.6));if(τ>=12&&τ<12.5)hop=Math.sin(seg(τ,12,12.5)*PI)*30;
  const nails=τ>=15;
  if(τ<20.6){plate(690+dx,456-hop);egg(690+dx,450-hop);cup(790+dx,456-hop);teapot(880+dx,458-hop,.8);
    if(nails){g.fillStyle='#8a8a92';[[690,440],[790,436]].forEach(([nx,ny],i)=>{if(τ>=15.4+i*.8){g.fillRect(nx+dx-2,ny-6,4,10);ell(nx+dx,ny-6,6,2);P('#8a8a92',1.5)}})}}
  else{teapot(860+dx,458,.8)}
  // stool
  let stX=560;if(τ>=39.3)stX=lerp(560,690,easeOut(seg(τ,39.3,39.6)));
  g.beginPath();g.rect(stX-34,556,68,12);P('#c9884a',3);g.fillStyle=OL;g.fillRect(stX-28,568,6,72);g.fillRect(stX+22,568,6,72);
  // floor props
  if(τ>=28.3){let sx=880,sy=GY-6,sr=0;if(τ<28.9){const p=seg(τ,28.3,28.9);sx=lerp(230,880,p);sy=lerp(200,GY-6,p)-Math.sin(p*PI)*120;sr=p*8}
    else if(τ>=29.5&&τ<31.4){sx=lerp(880,500,Math.pow(seg(τ,29.5,31.4),1.3))}else if(τ>=31.4)sx=500;skate(sx,sy,sr)}
  if(τ>=28.6){let rx=470,ry=GY-9,rr=0;if(τ<29.2){const p=seg(τ,28.6,29.2);rx=lerp(230,470,p);ry=lerp(200,GY-9,p)-Math.sin(p*PI)*100;rr=p*10}rollingPin(rx,ry,rr)}
  // cat
  const c={face:1,tt:τ,smug:.45,look:[1,.5],sit:true};let cx=205,cy=190;
  if(τ<7.8){c.look=[1,.4]}
  if(τ>=9&&τ<11){c.hl=[10,-60+Math.abs(Math.sin(τ*8))*10];c.hr=[20,-60-Math.abs(Math.sin(τ*8))*10];c.mouth='smirk';c.smug=.6}
  if(τ>=13.5&&τ<14.2){const p=seg(τ,13.5,14.2);cx=lerp(205,640,p);cy=lerp(190,GY,p)-Math.sin(p*PI)*120;c.sit=false;c.mouth='grin'}
  if(τ>=14.2&&τ<15){cx=lerp(640,690,seg(τ,14.2,15));cy=GY;c.sit=false;c.tiptoe=τ*10}
  if(τ>=15&&τ<17.3){cx=τ<16?690:lerp(690,770,seg(τ,16,16.3));cy=GY;c.sit=false;c.mouth='grin';c.look=[1,-1];const hm=Math.sin(τ*PI*5);c.hr=[34,-140-hm*20];c.hold=(hx,hy)=>hammer(hx,hy,-.6+hm*.5)}
  if(τ>=17.3&&τ<18.3){const p=seg(τ,17.3,18.3);cx=lerp(770,205,p);cy=lerp(GY,190,p)-Math.sin(p*PI)*200;c.sit=false}
  if(τ>=22.5&&τ<28.3){c.closed=true;c.mouth='open';c.rot=Math.sin(τ*9)*.2;c.sit=true}
  if(τ>=28.3&&τ<29){c.hr=[60,-80];c.sit=false;c.mouth='grin'}
  if(τ>=29&&τ<36.5){c.mouth='grin';c.look=[1,.5];c.smug=.6}
  if(τ>=36.5&&τ<37.3){const p=seg(τ,36.5,37.3);cx=lerp(205,760,p);cy=lerp(190,GY,p)-Math.sin(p*PI)*150;c.sit=false}
  if(τ>=37.3&&τ<39.3){cx=760;cy=GY;c.sit=false;c.face=-1;c.tiptoe=τ*8;c.look=[1,.4];c.smug=.6}
  if(τ>=39.3&&τ<40.6){cx=760;cy=GY;c.sit=false;c.face=-1;c.hr=[50,-50];c.mouth='grin'}
  if(τ>=40.6){cx=700;cy=568;c.sit=true;c.face=-1;c.hr=[30,-80];c.hold=(hx,hy)=>cup(hx,hy+8,.7);c.closed=τ<47.5;c.mouth='smile';if(τ>=47.5&&τ<48.6){c.closed=false;c.wink=true;c.look=[0,0];c.face=1}}
  if(τ<13.5||τ>=18.3&&τ<36.5)cy=190;
  // Fanel
  const o={face:1,tt:τ,look:[.4,0]};let fx=1010,fy=GY,show=true;
  if(τ<4){fx=lerp(-120,1010,seg(τ,0,4));o.walk=τ*9;o.mouth='whistle'}
  else if(τ<6.5){o.face=-1;o.look=[.5,-1];if(τ<5){o.hr=[60,-250];o.mouth='grin'}else if(τ<6){o.hl=[30,-110+Math.sin(τ*40)*4];o.hr=[44,-112];o.mouth='grin'}else{o.hl=[34,-150];o.hr=[44,-150];o.cheeks=1;o.mouth='o'}}
  else if(τ<7.95){o.face=-1;o.hr=[70,-150];o.mouth='grit';o.brow='angry';o.look=[1,.5]}
  else if(τ<12){o.face=-1;o.mouth='grin';o.hr=[-60,-150];o.hold=(hx,hy)=>clothBundle(hx,hy,τ);if(τ>=8.6&&τ<11){o.rot=-.45*Math.sin(seg(τ,8.6,9.2)*PI/2);o.closed=true}if(τ>=11.6){o.hr=[80,-140]}}
  else if(τ<13.5){fx=lerp(1010,1130,seg(τ,12.5,13.5));o.walk=τ*9;o.mouth='whistle'}
  else if(τ<19){fx=1130;o.mouth='whistle';o.look=[1,-.5]}
  else if(τ<20.2){fx=lerp(1130,1010,seg(τ,19,19.6));o.face=-1;o.hr=τ>19.6?[70,-150]:undefined;o.mouth='grin';o.brow='up'}
  else if(τ<22.6){fx=1010+120*easeOut(seg(τ,20.2,20.5));o.face=-1;const k=τ-20.5;o.sx=τ<20.5?1:1-.6*Math.exp(-k*3)*Math.abs(Math.cos(k*6));o.faceItem=(x,y)=>plate(x+8,y+6,1.6);o.headItem=(hx,hy)=>egg(hx,hy+4,1.3)}
  else if(τ<28.3){fx=1130;o.face=-1;o.headItem=(hx,hy)=>{egg(hx,hy+4,1.3);g.fillStyle='#ffc020';g.fillRect(hx-30,hy+6,8,20+((τ*20)%20))};o.faceItem=(x,y)=>{cup(x+40,y+42,.8)};o.mouth='frown';o.blink=(τ>23.5&&τ<23.7)||(τ>24.2&&τ<24.4)?1:0;
    if(τ>=25){o.red=seg(τ,25,26.5);o.brow='angry';o.mouth='grit';o.headDx=Math.sin(τ*60)*2}if(τ>=27&&τ<28.2)o.hatUp=Math.sin(seg(τ,27,28.2)*PI)*200}
  else if(τ<29.5){fx=lerp(1130,880,seg(τ,28.3,29.5));o.face=-1;o.run=τ*20;o.red=1;o.brow='angry';o.mouth='grit'}
  else if(τ<31.4){fx=lerp(880,500,Math.pow(seg(τ,29.5,31.4),1.3))+20;fy=GY-14;o.face=-1;o.feet=[[-6,0],[10,0]];const w=τ*25;o.hl=[Math.cos(w)*70,-126+Math.sin(w)*70];o.hr=[Math.cos(w+PI)*70,-126+Math.sin(w+PI)*70];o.eyePop=.7;o.hairUp=true;o.mouth='open';o.red=0;o.sx=1.1}
  else if(τ<31.7){const p=seg(τ,31.4,31.7);fx=lerp(500,480,p);fy=lerp(GY-14,320+110,p)-Math.sin(p*PI)*60;o.rot=-PI/2-.2;o.face=1;o.mouth='open';o.eyePop=1;o.hairUp=true;o.sx=1.25;o.hl=[-80,-200];o.hr=[80,-200]}
  else if(τ<35)show=false;
  else if(τ<36.2){const p=seg(τ,35.6,36.2);fx=470;fy=τ<35.6?380:lerp(380,GY,p*p);o.dizzy=true;o.mouth='frown';if(τ<35.6){g.save();g.beginPath();g.rect(0,0,W,320+40);g.clip()}}
  else if(τ<38.6){fx=lerp(470,560,seg(τ,36.2,38.6));o.walk=τ*6;o.dizzy=true;o.mouth='frown';o.rot=Math.sin(τ*5)*.1}
  else if(τ<40.3){fx=560;fy=GY-40*seg(τ,38.6,39.2);o.feet=[[30,40*seg(τ,38.6,39.2)],[50,40*seg(τ,38.6,39.2)]];o.mouth=τ<39.4?'smile':'o';o.closed=τ<39.4;if(τ>=39.4){o.look=[0,0];o.eyeBig=1.4;o.blink=(τ>39.8&&τ<39.95)?1:0}}
  else{fx=560;const p=seg(τ,40.3,40.55);fy=GY-40+lerp(0,44,p*p);o.feet=[[40,40],[60,40]];o.dizzy=τ<44;o.mouth=τ<44?'frown':'smile';o.closed=τ>=44;o.mst=τ>=44?Math.sin(τ*3)*.5:0}
  if(show){if(τ<31.4||τ>=36.2)shadow(fx,GY+4,70);fanel(fx,fy,SF,o);if(τ>=35&&τ<35.6)g.restore()}
  if(τ>=29.5&&τ<31.4){skate(fx-20,GY-6,0);speed(fx+60,GY-120,-1,160,5)}
  if(τ>=4&&τ<6.5&&τ>=6)text('PTIU!',fx-80,GY-260,26,'#fff',FD,400,'center',OL,6);
  if(τ>=0.3&&τ<4)notes(fx+50,GY-230,τ);
  if(τ>=13.5&&τ<19)notes(fx+40,GY-230,τ);
  if(τ>=8&&τ<10)popText('TA-DAM!',fx-120,GY-300,54,seg(τ,8,10));
  if(τ>=20.5)popText('BUM!',fx-60,GY-320,64,seg(τ,20.5,21.6));
  if(τ>=26.5&&τ<28.2){steam(fx-40,GY-160,τ,-1);steam(fx+40,GY-160,τ,1);gibber(fx-150,GY-310,τ)}
  if(τ>=31.7)popText('ZDRANG!',460,180,64,seg(τ,31.7,33));
  if(τ>=36.2&&τ<39)stars(fx,GY-215,τ);
  if(τ>=40.3&&τ<40.8)crack(fx,GY+8);
  if(τ>=40.3)popText('BUF!',fx+100,GY-200,50,seg(τ,40.3,41.3));
  cat(cx,cy,.95,c);
  if(τ>=22.5&&τ<28.3)tears(cx+10,cy-110,τ,1);
  caption('Inerția: dacă tragi repede, vasele rămân pe loc!',seg(τ,8.4,8.9)*(1-seg(τ,12.4,12.9)));
  caption('Patina s-a oprit brusc... Fănel nu! De asta purtăm centura.',seg(τ,32.2,32.7)*(1-seg(τ,37,37.5)));
}

// ---------- ACT 3: living room, lever ----------
function act3(τ,t){
  g.drawImage(SET.liv,0,0);
  if(τ>=30.6)ceilingHole(470);
  chunks(470,40,seg(τ,30.6,31.8),10,140);if(τ>=30.6)dust(470,30,seg(τ,30.6,31.4),100);
  // jar
  let jx=1120,jy=160,jr=0,jarShow=true,lid=true;
  if(τ>=37.4&&τ<38.4)jr=Math.sin(τ*30)*.15;
  if(τ>=38.4&&τ<38.9){const p=seg(τ,38.4,38.9);jy=lerp(160,GY,p*p);jx=1130;jr=p*2}
  if(τ>=38.9&&τ<40.2){const p=seg(τ,38.9,40.2);jx=lerp(1130,500,easeOut(p));jy=GY-Math.abs(Math.sin(p*PI*2))*30*(1-p);jr=-p*12}
  if(τ>=40.2)jarShow=false;
  if(jarShow)jar(jx,jy,1,jr,true,true);
  // plank / brick / dumbbell
  let ang=-.15;if(τ>=30.1)ang=lerp(-.15,.15,seg(τ,30.1,30.18));if(τ>=34.2)ang=lerp(.15,-.15,seg(τ,34.2,34.28));
  const leverOn=τ>=24.5;
  if(!leverOn){g.save();g.translate(600,GY);g.rotate(-1.2);g.beginPath();g.rect(0,-12,400,12);P('#d8a060',3);g.restore();g.beginPath();g.moveTo(560,GY+8);g.lineTo(612,GY+8);g.lineTo(606,GY-26);g.lineTo(566,GY-26);g.closePath();P('#c8543a',3)}
  else plankBrick(620,ang);
  // dumbbell
  let db=null;
  if(τ<25)db=[330,GY-26,0];
  else if(τ>=29.3&&τ<30.1){const p=seg(τ,29.3,30.1);db=[lerp(430,800,p),lerp(400,GY-80,p)-Math.sin(p*PI)*200,p*4]}
  else if(τ>=30.1&&τ<34.2){const e=plankEnd(620,ang,1);db=[e[0]-10,e[1]-26,ang]}
  else if(τ>=34.2&&τ<35.3){const p=seg(τ,34.2,35.3);db=[lerp(800,440,p),lerp(560,GY-232*SF-20,p)-Math.sin(p*PI)*300,p*6]}
  else if(τ>=37.3){const p=seg(τ,37.3,37.7);db=[lerp(440,340,p),lerp(GY-232*SF*.6,GY-26,p*p),0]}
  // chairs
  const chairTower=(x,y,rot)=>{g.save();g.translate(x,y);g.rotate(rot);for(let i=0;i<5;i++)chair(0,-i*52,.9,((i%2)-.5)*.06);g.restore()};
  // cat
  const c={face:-1,sit:true,tt:τ,smug:.45,look:[1,.5],hold:(hx,hy)=>{if(τ<10)cookie(hx,hy)}};let cx=1010,cy=160;
  if(τ<8){c.hr=[30,-70+Math.abs(Math.sin(τ*3))*20];c.mouth='smirk'}
  if(τ>=8&&τ<10.3){c.sit=false;c.hr=[50,-120+(τ>10?60:0)];c.hold=(hx,hy)=>rollingPin(hx,hy-20,-1.2+(τ>10?1.4:0));c.look=[1,.5];c.mouth='grin'}
  if(τ>=10.3&&τ<22){c.closed=τ<14;c.mouth=τ<14?'open':'grin';c.rot=τ<14?Math.sin(τ*9)*.2:0}
  if(τ>=30.6&&τ<34){c.eyeBig=1.5;c.smug=0;c.mouth='o';c.look=[1,-1]}
  if(τ>=35.3&&τ<37){c.closed=true;c.mouth='open';c.rot=Math.sin(τ*9)*.2}
  if(τ>=42.3&&τ<45){c.sx=1.25;c.mouth=τ<43.2?'o':'grin';c.hl=[10,-56];c.hr=[24,-50];c.closed=τ<43.2}
  if(τ>=45&&τ<45.6){const p=seg(τ,45,45.6);cx=lerp(1010,880,p);cy=lerp(160,GY,p)-Math.sin(p*PI)*100;c.sit=false;c.mouth='grin'}
  if(τ>=45.6){cx=lerp(880,-150,seg(τ,45.6,47.2));cy=GY;c.sit=false;c.run=τ*22;c.mouth='grin';c.tailUp=true}
  cat(cx,cy,.95,c);
  if(τ>=42.3&&τ<43.4)popText('BÂRRP!',cx-60,cy-170,40,seg(τ,42.3,43.4));
  // Fanel
  const o={face:1,tt:τ,look:[.6,-1]};let fx=960,fy=GY,show=true,tower=null;
  if(τ<3){fx=lerp(-120,900,seg(τ,0,3));o.walk=τ*9;o.mouth='smile';o.look=[1,0]}
  else if(τ<5){fx=900;o.eyeBig=1.4;o.mouth='open';o.tongue=τ<4.8?140*easeOut(seg(τ,3.2,4)):0}
  else if(τ<8){fx=lerp(900,960,seg(τ,5,5.5));fy=GY-Math.abs(Math.sin((τ-5)*PI))*110;o.hr=[30,-260];o.mouth='grit'}
  else if(τ<10.3){const p=easeOut(seg(τ,8,10));o.hr=[lerp(40,190,p),lerp(-260,-600,p)];o.mouth='grit';o.brow='angry';o.sx=1;o.sq=1+.06*p}
  else if(τ<13){const k=seg(τ,10.3,10.8);o.hr=[lerp(190,56,easeOut(k)),lerp(-600,-120,easeOut(k))];o.bigHand=τ>=10.35?1-seg(τ,12.5,13):0;fy=GY-Math.abs(Math.sin(τ*8))*40*(τ>10.8?1:0);o.mouth='open';o.eyePop=τ<11?.5:0;o.brow='sad'}
  else if(τ<14.4){fx=lerp(960,-150,seg(τ,13,14.4));o.face=-1;o.run=τ*20;o.mouth='grit'}
  else if(τ<15.2){fx=lerp(-150,980,seg(τ,14.4,15.2));o.run=τ*20;o.mouth='grin';o.hl=[-30,-330];o.hr=[30,-330];tower=[fx,GY-300,0]}
  else if(τ<18){fx=980;tower=[980,GY,0];const up=easeOut(seg(τ,15.4,16.8));const wob=Math.sin(τ*6)*.13*seg(τ,16.8,18);tower[2]=wob;
    const topY=GY-4*52*.9-46*.9;fy=lerp(GY,topY,up);fx=980+Math.sin(wob)*(GY-fy);o.rot=wob;o.hr=[40,-280];o.hl=[-40,-120+Math.sin(τ*20)*20];o.mouth=τ>16.8?'open':'grit';o.eyeBig=τ>16.8?1.4:1}
  else if(τ<18.5){const p=seg(τ,18,18.5);fx=lerp(1000,960,p);fy=lerp(GY-230,GY,p*p);o.rot=p*3;o.mouth='open';o.eyePop=.6}
  else if(τ<22.2){fx=960;fy=GY;o.feet=[[30,0],[50,0]];o.sq=.85;o.dizzy=τ<21;o.mouth='frown';o.look=[-1,0]}
  else if(τ<23){fx=lerp(960,640,seg(τ,22.2,23));o.face=-1;o.walk=τ*10;o.mouth='grin'}
  else if(τ<24.5){fx=640;o.face=-1;o.hr=[60,-120];o.mouth='grin';o.look=[1,1]}
  else if(τ<25.2){fx=lerp(640,330,seg(τ,24.5,25.2));o.face=-1;o.walk=τ*10}
  else if(τ<27.5){fx=lerp(330,420,seg(τ,25.6,27.5));o.face=1;o.feet=[[-40,0],[44,0]];o.sq=.86;o.hl=[-30,-250];o.hr=[30,-250];o.red=.45;o.mouth='grit';o.brow='angry';o.walk=τ>=25.6?τ*4:undefined;db=[fx,GY-260*SF*.86-30,0]}
  else if(τ<29.3){fx=422;fy=plankEnd(620,ang,-1)[1]+10;o.hl=[-30,-250];o.hr=[30,-250];o.sq=.9;db=[fx,fy-262*SF*.9,0];o.wink=τ>28.4;o.mouth='grin';o.look=[0,0];o.red=0}
  else if(τ<30.15){fx=422;fy=plankEnd(620,ang,-1)[1]+10;o.hl=[-10,-200];o.hr=[60,-220];o.mouth='grin';o.look=[1,0]}
  else if(τ<30.6){const p=seg(τ,30.15,30.6);fx=lerp(422,470,p);fy=lerp(612,-80,easeOut(p));o.sq=1.5;o.sx=.7;o.hl=[-20,-300];o.hr=[20,-300];o.eyePop=1;o.mouth='open';o.hairUp=true}
  else if(τ<33.5)show=false;
  else if(τ<34.2){const p=seg(τ,33.5,34.2);fx=lerp(470,422,p);fy=lerp(-60,plankEnd(620,.15,-1)[1]+10,p*p);o.cap='shower';o.mouth='open';o.hl=[-60,-200];o.hr=[60,-200];o.hold=(hx,hy)=>duck(hx,hy-10)}
  else if(τ<37.3){fx=422;fy=plankEnd(620,ang,-1)[1]+10;o.cap='shower';const k=τ-35.3;o.sq=τ<35.3?1:1-.45*Math.exp(-k*2)*(1+.3*Math.cos(k*14));o.dizzy=τ>=35.3;o.mouth='frown';if(τ>=35.3)o.headItem=(hx,hy)=>dumbbell(hx,hy-24,.9)}
  else if(τ<40.2){fx=lerp(422,470,seg(τ,37.3,38));fy=GY;o.cap='shower';o.mouth='frown';o.bump=1.4;o.look=[1,0]}
  else if(τ<44){fx=470;o.cap='shower';o.bump=1.4;o.hr=[50,-110];o.hold=(hx,hy)=>jar(hx+6,hy+30,1,0,false,τ<41);o.mouth=τ<41.2?'grin':'o';o.eyeBig=τ<41.2?1.3:1;o.tongue=τ>40.4&&τ<41?40:0;if(τ>=41.2){o.look=[0,0];o.brow='up'}if(τ>=43){o.red=seg(τ,43,44);o.brow='angry';o.mouth='grit'}}
  else if(τ<45.8){fx=470;o.cap='shower';o.bump=1.4;o.red=1;o.brow='angry';o.mouth='grit';o.headDx=Math.sin(τ*60)*2;o.hatUp=0}
  else{fx=lerp(470,-200,seg(τ,45.8,47.8));o.face=-1;o.run=τ*22;o.cap='shower';o.red=1;o.brow='angry';o.mouth='grit'}
  if(tower&&τ<18)chairTower(tower[0],tower[1],tower[2]);
  if(τ>=18){[[860,-1.5],[940,1.7],[1080,-.4],[780,.9]].forEach(([x,r],i)=>{const p=seg(τ,18,18.6);chair(lerp(980,x,p),lerp(GY-120*(i+1),GY,p*p),.9,r*p)})}
  if(show){if(fy>GY-60)shadow(fx,GY+4,70);fanel(fx,fy,SF,o)}
  if(τ>=18.5&&τ<22.2){chair(fx,GY,.95,PI*0+0);g.save();g.translate(fx,GY-190);g.rotate(PI);chair(0,0,.95);g.restore()}
  if(τ>=18.5&&τ<21)stars(fx,GY-200,τ);
  if(τ>=21&&τ<23)bulb(fx,GY-300,back(seg(τ,21,21.4)),Math.floor(τ*4)%2===0);
  if(τ>=10.3)popText('PAC!',1080,120,46,seg(τ,10.3,11.3));
  if(τ>=18)popText('ZBANG!',900,300,60,seg(τ,18,19.2));
  if(τ>=30.6)popText('BUUM!',600,120,62,seg(τ,30.6,31.8));
  if(τ>=35.3)popText('TRONC!',560,300,56,seg(τ,35.3,36.5));
  if(τ>=25.6&&τ<29.3)sweat(fx-60,GY-250,τ);
  if(τ>=30.15&&τ<30.6)speed(fx,fy-120,1,0,0);
  if(τ>=32.3&&τ<33){const p=seg(τ,32.3,32.9);duck(470,lerp(20,GY-20,p*p))}if(τ>=32.9)duck(500,GY-20);
  if(τ>=41.2&&τ<43.5){for(let i=0;i<3;i++){const p=seg(τ,41.2+i*.2,43.5);if(p>0)moth(fx+60+Math.sin(τ*5+i)*40+p*100*(i-1),GY-200-p*300,τ*30+i)}}
  if(τ>=44&&τ<45.8){steam(fx-40,GY-160,τ,-1);steam(fx+40,GY-160,τ,1);gibber(fx+130,GY-320,τ)}
  if(db)dumbbell(db[0],db[1],.9,db[2]);
  caption('Pârghia: apeși pe un capăt... și se ridică celălalt!',seg(τ,26,26.5)*(1-seg(τ,30,30.4)));
}
function cookie(x,y){circ(x+4,y-6,9);P('#c88a40',2);circ(x+2,y-8,1.5);P(OL,0);circ(x+7,y-4,1.5);P(OL,0)}
function duck(x,y){g.save();g.translate(x,y);ell(0,0,18,12);P('#ffd23f',3);circ(10,-14,10);P('#ffd23f',3);g.beginPath();g.moveTo(18,-14);g.lineTo(28,-11);g.lineTo(18,-8);g.closePath();P('#f08a20',2);circ(12,-17,2);P(OL,0);g.restore()}

// ---------- ACT 4: stairs + street, friction ----------
function act4(τ,t){
  if(τ<11){
    g.drawImage(SET.stairs,0,0);
    if(τ<4.5&&τ>=.6)soap(185,stairsY(185));
    // cat
    if(τ<3){const x=lerp(80,1320,seg(τ,0,3));cat(x,stairsY(x)-Math.abs(Math.sin(τ*12))*26,.9,{run:τ*22,mouth:'grin',tt:τ,tailUp:true})}
    // Fanel
    if(τ>=3&&τ<4.5){const x=lerp(70,185,seg(τ,3,4.5));fanel(x,250,SF,{run:τ*20,red:1,brow:'angry',mouth:'grit',tt:τ})}
    else if(τ>=4.5&&τ<5.4){const p=seg(τ,4.5,5.4);fanel(200,250-110*easeOut(Math.min(1,p*3))+(p>.8?(p-.8)*400:0),SF,{rot:-PI/2,eyePop:.6,mouth:'o',look:[0,0],tt:τ,hl:[-40,-200],hr:[40,-200]})}
    else if(τ>=5.4){const p=seg(τ,5.4,10.5);const x=200+1150*Math.pow(p,1.5);const y=stairsY(Math.min(x,1180))-38+Math.abs(Math.sin(x*.09))*6;
      for(let i=1;i<6;i++){const px=x-i*60;if(px>200){g.globalAlpha=(1-i/6)*.8;circ(px,stairsY(px)-40-i*6,10+i*4);P('#9a9a9a',2);g.globalAlpha=1}}
      fanel(x,y,SF,{rot:-PI/2+.4,eyePop:.4,mouth:'open',hairUp:true,flame:seg(τ,6.5,7.5),tt:τ,hl:[-60,-220],hr:[60,-220]});
      if(τ<6.5)popText('ALUNEC!',300,180,50,seg(τ,4.6,6))}
    caption('Frecarea încălzește: pantalonii lui Fănel iau foc!',seg(τ,6.8,7.3)*(1-seg(τ,10.4,10.9)));
    return}
  const s=τ-11;
  g.drawImage(SET.street,0,0);
  // lamp post
  const lp=lampPost(760,600,0,τ,false);
  // bench cat
  const c={face:-1,sit:true,tt:τ,smug:.45,look:[1,.5]};let cx=930,cy=560-46;
  // sandbox
  const buried=τ>=14.46&&τ<17;
  sandbox(1110,660,1+(buried?.3:0));
  // banana peel
  if(τ>=21.8){if(τ<22.6){const p=seg(τ,21.8,22.6);banana(lerp(910,700,p),lerp(440,GY-4,p)-Math.sin(p*PI)*90,p*8)}else if(τ<23.3)banana(700,GY-4);else if(τ<26)banana(lerp(700,640,seg(τ,23.3,23.6)),GY-4,.3)}
  // bin
  let binOn=τ>=25&&τ<29.5;if(!(τ>=24.8))bin(600,602,1);
  // Fanel
  const o={face:1,tt:τ,look:[.4,0]};let fx=-999,fy=GY;
  if(τ<14.46){fx=Math.min(1040,160+260*(τ-11));fy=GY-40;o.rot=-PI/2;o.eyePop=.4;o.mouth='open';o.hairUp=true;o.flame=1;o.hat=τ<12.9;o.hl=[-60,-220];o.hr=[60,-220];
    for(let i=1;i<6;i++){const px=fx-i*70;if(px>150){g.globalAlpha=(1-i/6)*.8;circ(px,GY-40-i*8,10+i*4);P('#9a9a9a',2);g.globalAlpha=1}}}
  else if(τ<17){fx=-999;const k=Math.sin(τ*14);fanel(1100,455,SF,{rot:PI,feet:[[-30+k*10,0],[30-k*10,0]],hat:false});sandbox(1110,660,1.3)}
  else if(τ<19.5){fx=1080;o.hat=false;o.sand=true;o.sandMst=true;o.rot=τ<18?Math.sin(τ*40)*.15:0;o.mouth='frown';o.closed=τ<18}
  else if(τ<23.3){fx=lerp(1080,700,seg(τ,19.5,23.3));o.face=-1;o.hat=false;o.walk=τ*8;o.mouth='whistle';o.sand=true}
  else if(τ<25){const p=seg(τ,23.3,25);o.hat=false;const ccx=lerp(700,600,p),ccy=GY-100-Math.sin(p*PI)*260+p*40;const r=p*TAU*2.5;fx=ccx-Math.sin(r)*90;fy=ccy+Math.cos(r)*90;o.rot=r;o.mouth='open';o.eyePop=.5;o.face=-1}
  else if(τ<26.5){fx=600;fy=410;o.rot=PI;o.hat=false;o.feet=[[-30+Math.sin(τ*20)*12,0],[30-Math.sin(τ*20)*12,0]]}
  else if(τ<29.5){fx=lerp(600,700,seg(τ,26.5,29));if(τ>=29)fx=700-Math.sin(seg(τ,29,29.5)*PI)*20;o.walk=τ*8;o.hat=false}
  else if(τ<33.5){fx=700;o.hat=false;o.headItem=(hx,hy)=>fishbone(hx,hy-6,.3);o.dizzy=τ<30.5;o.mouth=τ<30.5?'frown':'grit';if(τ>=30.5){o.red=seg(τ,30.5,31.3);o.brow='angry'}
    if(τ>=31.3){fx=lerp(700,725,seg(τ,31.3,32));o.run=τ*20}}
  else if(τ<42){fx=725;o.hat=false;o.headItem=(hx,hy)=>fishbone(hx,hy-6,.3);o.red=1-seg(τ,40,42)*.6;o.brow='angry';o.mouth='grit';o.look=[.5,-1];fy=GY-(τ<38?Math.abs(Math.sin(τ*7))*40:0);o.hr=[40,-260+Math.sin(τ*30)*14]}
  else{fx=725;o.hat=false;o.headItem=(hx,hy)=>fishbone(hx,hy-6,.3);o.red=.4*(1-seg(τ,42,45));o.brow='sad';o.mouth=τ<46?'frown':'smile';o.look=[.5,-1];if(τ>=46&&τ<48){o.hl=[20,-220];o.closed=true}if(τ>=48){o.hl=[-20,-130];o.hr=[20,-130]}}
  if(τ>=17&&τ<19.5){for(let i=0;i<8;i++){const p=((τ*2+i/8)%1);circ(fx+(i%2?-40:40)+(i%2?-1:1)*p*30,GY-160+p*120,3);P('#e8c878',0)}}
  if(fx>-900&&!(τ>=25&&τ<26.5)){if(τ>=19.5)shadow(fx,GY+4,70);fanel(fx,fy,SF,o)}
  if(τ>=25&&τ<26.5){fanel(fx,fy,SF,o);bin(600,602,1,Math.sin(τ*20)*.05)}
  if(binOn&&τ>=26.5){bin(fx,600,1.65,Math.sin(τ*8)*.04)}
  if(τ>=29.5&&τ<30.2){const p=seg(τ,29.5,30.2);bin(lerp(700,560,p),lerp(600,602,p),lerp(1.65,1,p),-p*1.4)}
  if(τ>=30.2)bin(560,602,1,-1.4);
  if(τ>=14.46&&τ<15.4){for(let i=0;i<14;i++){const p=seg(τ,14.46,15.4);circ(1090+(i-7)*14*p*3,GY-60-Math.sin(p*PI)*120*(.5+hash(i)),5);P('#ecd28a',1.5)}}
  // tram
  if(τ>=11.8&&τ<14.2){const tx=1500-(τ-11.8)*900;tram(tx,690);if(τ>=12.9)fanelCapOnTram(tx)}
  // cat on bench / chase / lamp
  if(τ<21.8){c.hold=τ>=15?(hx,hy)=>banana(hx,hy-8,0):null;c.look=[1,.4];c.mouth=τ<15?'smirk':'smile'}
  else if(τ<23.3){c.hr=[40,-110];c.mouth='grin'}
  else if(τ<30.5){c.closed=true;c.mouth='open';c.rot=Math.sin(τ*9)*.2}
  else if(τ<31.3){c.eyeBig=1.5;c.smug=0;c.mouth='o';c.sit=false}
  else if(τ<33.5){const p=seg(τ,31.3,33.5);cx=lerp(930,790,seg(τ,31.3,31.8));cy=lerp(560,lp.top[1]+6,easeOut(seg(τ,31.8,33.5)));c.sit=false;c.run=τ*20;c.tailUp=true}
  else{cx=lp.top[0]+50;cy=lp.top[1]+2;c.sit=true;c.face=-1;c.look=[.5,1];
    if(τ<38){c.mouth='grin';c.smug=.6;c.hl=[0,-60];c.hr=[30,-60]}else{c.furUp=τ<40;c.eyeBig=1.4;c.smug=0;c.mouth='wavy';c.rot=Math.sin(τ*40)*.04;c.brow='sad'}}
  if(τ<31.3)cy=c.sit?514:560;
  cat(cx,cy,.85,c);
  if(τ>=23.3&&τ<30.5)tears(cx+10,cy-100,τ,1);
  if(τ>=40)tears(cx+10,cy-100,τ*.5,1);
  if(τ>=12)popText('DING-DING!',1050,300,40,seg(τ,11.9,13.2));
  if(τ>=14.46)popText('FÂȘȘ!',1110,450,52,seg(τ,14.46,15.6));
  if(τ>=23.3)popText('HOPA!',640,330,54,seg(τ,23.3,24.4));
  if(τ>=29)popText('BANG!',760,330,52,seg(τ,29,30));
  if(τ>=33.5&&τ<38){steam(fx-40,GY-160,τ,-1);steam(fx+40,GY-160,τ,1);gibber(fx-150,GY-320,τ)}
  if(τ>=38&&τ<44)bubble(cx-170,cy+60,.9,()=>text('miau...',0,2,26,OL,FT,900),40);
  caption('Pe săpun aluneci, în nisip te oprești: asta e frecarea!',seg(τ,15.2,15.7)*(1-seg(τ,20.6,21.1)));
}
function fanelCapOnTram(tx){g.save();g.translate(tx+300,690-338);g.rotate(Math.sin(tx*.05)*.2);g.beginPath();g.moveTo(-40,0);g.bezierCurveTo(-30,-60,40,-70,70,-40);g.bezierCurveTo(86,-28,88,-14,82,-2);g.bezierCurveTo(68,-28,30,-30,40,0);g.closePath();P('#3d6fb5',4);circ(82,4,10);P('#fff',3);g.restore()}

// ---------- FINALE: street, friction helps ----------
function finale(τ,t){
  g.drawImage(SET.street,0,0);
  let bend=0;if(τ>=15.5&&τ<19.6)bend=ease(seg(τ,15.5,19.5));if(τ>=19.6){const k=τ-19.6;bend=Math.max(-.2,Math.cos(k*9)*Math.exp(-k*3))*(k<2?1:0)}
  const lit=τ>=20.3;
  const lp=lampPost(760,600,Math.max(0,bend)-(bend<0?0:0),τ,lit);
  sandbox(1110,660,1);
  banana(640,GY-4,.3);bin(560,602,1,-1.4);
  // Fanel + cat
  const o={face:1,tt:τ,look:[.5,-1],hat:false,headItem:(hx,hy)=>fishbone(hx,hy-6,.3)};let fx=725,fy=GY,carry=false;
  const c={face:-1,sit:true,tt:τ,look:[.5,1],eyeBig:1.3,mouth:'wavy',brow:'sad'};let cx=lp.top[0]+50,cy=lp.top[1]+2,catShow=true;
  const climb=(h)=>{fx=735;fy=GY-h;o.feet=[[10,0],[26,-10]];const k=Math.sin(τ*10);o.hl=[30,-230+k*20];o.hr=[36,-200-k*20];o.mouth='grit'};
  if(τ<1.4)climb(easeOut(seg(τ,.2,1.4))*90);
  else if(τ<1.9){climb(lerp(90,0,seg(τ,1.4,1.8)));o.mouth='open';o.eyePop=.4}
  else if(τ<4){climb(easeOut(seg(τ,2.2,3.8))*170)}
  else if(τ<4.6){climb(lerp(170,0,Math.pow(seg(τ,4,4.4),2)));o.mouth='open';o.eyePop=.5}
  else if(τ<6.5){fx=700;o.feet=[[30,0],[50,0]];fy=GY;o.sq=.85;o.dizzy=τ<5.2;o.mouth='smile';o.look=[1,0]}
  else if(τ<7.3){fx=lerp(700,1040,seg(τ,6.5,7.3));o.run=τ*20}
  else if(τ<8.5){fx=1040;o.sand=true;const k=Math.sin(τ*20);o.hl=[30,-100+k*14];o.hr=[44,-100-k*14];o.mouth='grin';o.look=[0,1]}
  else if(τ<9.2){fx=lerp(1040,735,seg(τ,8.5,9.2));o.face=-1;o.run=τ*20;o.sand=true}
  else if(τ<14.8){climb(lerp(0,340,easeOut(seg(τ,9.2,14.5))));o.sand=true;o.mouth='grit'}
  else if(τ<19.6){fx=lp.top[0]+20;fy=Math.min(GY,lp.top[1]+30+240*SF*.95);o.hl=[20,-280];o.hr=[50,-140];carry=true;o.sand=true;o.mouth=τ<15.5?'grin':'o';o.look=[1,-1];if(fy>=GY){o.mouth='grin'}}
  else if(τ<27){fx=Math.min(1100,lp.top[0]+20);if(τ>=19.6)fx=1050;fy=GY;carry=true;o.hr=[50,-140];o.mouth='grin';o.look=[1,-.5];
    if(τ>=21.5){o.red=seg(τ,21.8,23.5);o.blush=true;o.closed=true;o.mouth='smile';o.feet=[[-16,0],[18,-Math.abs(Math.sin(τ*4))*12]]}}
  else if(τ<33){fx=lerp(1050,520,seg(τ,27,33));o.face=-1;o.walk=τ*7;carry=true;o.hr=[50,-140];o.mouth='grin';o.red=.6;o.blush=true;o.look=[1,0];
    if(τ>=29.6&&τ<31.6){fx=lerp(1050,520,seg(29.6,27,33));const p=seg(τ,30,31.4);fx-=p*80;fy=GY-Math.sin(p*PI)*100;o.feet=[[-30,-Math.sin(p*PI)*20],[50,-60*Math.sin(p*PI)]];o.walk=undefined;o.look=[1,1]}
    if(τ>=31.6)fx=lerp(1050,520,seg(τ,27,33))-80;
    if(τ>=31.8&&τ<32.8){o.wink=true;o.look=[0,0];o.face=1}}
  else{fx=lerp(1050,520,1)-80;o.face=1;carry=true;o.hr=[50,-140];o.hl=[-40,-250+Math.sin(τ*10)*20];o.mouth='grin';o.look=[0,0];o.red=.4;o.blush=true}
  if(carry){catShow=false;o.hold=(hx,hy)=>{g.save();g.translate(hx-20,hy+60);cat(0,0,.75,{sit:true,face:1,tt:τ,closed:τ>=21.5&&τ<27,mouth:τ<19.6?'o':'smile',heart:τ>=22&&τ<27,look:[0,0],blushCat:τ>=21.5,hr:τ>=21&&τ<21.8?[30,-110]:undefined});g.restore()}}
  if(catShow){if(τ>=14.8){cx=fx+40;cy=fy-160}else{c.rot=Math.sin(τ*30)*.04;if(τ>=9.2)c.mouth=τ>12?'o':'wavy'}cat(cx,cy,.85,c)}
  shadow(fx,GY+4,70);fanel(fx,fy,SF,o);
  if(τ>=1.4&&τ<1.9||τ>=4&&τ<4.6)speed(fx+40,fy-200,-1,0,0);
  if(τ>=4.4&&τ<6)stars(fx,GY-220,τ);
  if(τ>=5.2&&τ<6.6)bulb(fx,GY-300,back(seg(τ,5.2,5.6)),Math.floor(τ*4)%2===0);
  if(τ>=7.3&&τ<8.5){for(let i=0;i<6;i++){const p=((τ*3+i/6)%1);g.globalAlpha=1-p;star(fx+(i-3)*20,GY-140-p*60,5,'#ecd28a');g.globalAlpha=1}}
  if(τ>=19.6)popText('BOING!',900,250,54,seg(τ,19.6,20.8));
  if(τ>=21.5&&τ<27)heartsUp(fx+30,GY-260,τ);
  if(τ>=21.5)popText('PUP!',fx+110,GY-330,40,seg(τ,21.5,22.6));
  caption('Cu nisip pe mâini, frecarea crește... și nu mai aluneci!',seg(τ,7.6,8.1)*(1-seg(τ,12.6,13.1)));
  // iris
  if(τ>=33){const r=τ<35?lerp(1600,120,ease(seg(τ,33,35))):τ<37?120:lerp(120,0,seg(τ,37,37.8));const ix=fx+20,iy=GY-170;
    g.save();g.beginPath();g.rect(-20,-20,W+40,H+40);g.arc(ix,iy,Math.max(0,r),0,TAU,true);g.fillStyle='#000';g.fill('evenodd');g.restore()}
}
function sceneRecap(τ,t){const a=seg(τ,0,.6)*(1-seg(τ,9.4,10));paperCard(a);g.globalAlpha=a;
  text('Ce a învățat Fănel azi?',W/2,130,58,'#b02a22',FD,400);
  const items=[['GRAVITAȚIA','ce urcă, coboară'],['INERȚIA','ce stă, vrea să stea'],['PÂRGHIA','apeși aici, urcă acolo'],['FRECAREA','nisipul te oprește']];
  items.forEach(([n,d],i)=>{const t0=1+i*1.6;const p=back(seg(τ,t0,t0+.6));if(p<=0)return;const x=230+i*273,y=360;g.save();g.translate(x,y);g.scale(p,p);
    g.beginPath();g.roundRect(-120,-130,240,250,14);P('#fff8e6',4);g.save();g.translate(0,-40);g.scale(.42,.42);[dGravity,dInertia,dLever,dFriction][i](t);g.restore();
    text(n,0,70,26,'#3a2414',FT,900);text(d,0,102,19,'#5a4030',FT,700);g.restore()});
  if(τ>7.4){g.globalAlpha=a*seg(τ,7.4,8);text('Fizica e peste tot... chiar și în pijamale!',W/2,600,32,'#3f6f2a',FT,900)}g.globalAlpha=1}
function sceneEnd(τ){const a=seg(τ,0,.8)*(1-seg(τ,5.2,6));paperCard(a);g.globalAlpha=a;text('Sfârșit',W/2,H/2-50,120,'#b02a22',FD,400,'center','#3a2414',3);text('Fănel și Mitzi vă salută!',W/2,H/2+70,38,'#3a2414',FT,700);g.save();g.translate(W/2,H/2+170);g.scale(.6,.6);clock(0,0,1,τ,{});g.restore();g.globalAlpha=1}

const SCENES=[[0,3.5,sceneLeader],[3.5,12,sceneTitle],
 [12,18,τ=>intertitle(['Orașul se trezește devreme.','Toată lumea... în afară de','*FĂNEL!'],τ,6)],
 [18,66,act1],[66,73,τ=>factCard(τ,7,'Gravitația',['Pământul trage totul în jos.','De aceea, tot ce arunci în sus... cade înapoi!'],dGravity)],
 [73,123,act2],[123,130,τ=>factCard(τ,7,'Inerția',['Lucrurile vor să rămână cum sunt: pe loc sau în mișcare.','De aceea, în mașină purtăm centura!'],dInertia)],
 [130,180,act3],[180,187,τ=>factCard(τ,7,'Pârghia',['Cu o scândură și un punct de sprijin','poți ridica ceva mult mai greu decât tine.'],dLever)],
 [187,237,act4],[237,244,τ=>factCard(τ,7,'Frecarea',['Frecarea ne ține pe loc și produce căldură.','Pe săpun e puțină, pe nisip e multă.'],dFriction)],
 [244,284,finale],[284,294,sceneRecap],[294,300,sceneEnd]];

// ================= music & sfx =================
const SFX=[];const sx=(t,k,d,p)=>SFX.push({t,k,d,p});
(function buildSfx(){
  [0,1.15,2.3].forEach(t=>sx(t,'beep'));sx(3.5,'tada');sx(6,'boing');sx(7.5,'giggle');
  let b=18;sx(b+.2,'snore');sx(b+2.6,'snore');sx(b+5,'ring',8.6);sx(b+5.2,'boing');sx(b+5.3,'slideUp',.8);sx(b+6.7,'slideDown',.4);sx(b+7,'thud');
  sx(b+9,'slideUp',.4);sx(b+9.4,'thud');sx(b+10.9,'bonk');sx(b+10.95,'crunch');sx(b+14,'swoosh');sx(b+14.1,'slideUp',.5);sx(b+15,'whistleTune');sx(b+16.3,'bomb',.9);sx(b+17.2,'bong');sx(b+17.25,'boing');sx(b+17.3,'ring',1.7);sx(b+17.5,'tweet');sx(b+18.6,'tweet');
  sx(b+19,'slideUp',1.8);sx(b+20.8,'kettle',1.8);sx(b+21,'gibber',1.5);sx(b+21.1,'slideUp',.6);sx(b+22,'slideDown',.4);for(let i=0;i<7;i++)sx(b+22.8+i*.5,'thud');
  for(let i=0;i<8;i++)sx(b+27+i*.25,'tick');sx(b+29.4,'squeak');sx(b+31.3,'bomb',.6);sx(b+31.9,'crash');sx(b+33.6,'boop');sx(b+34,'gibber',1.2);sx(b+34.1,'whistle');
  for(let i=0;i<10;i++)sx(b+36.05+i*.3,'bonk',0,i);sx(b+39.2,'crash');sx(b+40.2,'boop');sx(b+42.5,'pop');sx(b+42.7,'tweet');sx(b+39.5,'giggle');sx(b+43.5,'giggle');
  b=73;sx(b+.4,'whistleTune');sx(b+5,'crack');sx(b+6.1,'spit');sx(b+7.9,'swoosh');sx(b+8,'tada');sx(b+8.1,'shake');for(let i=0;i<4;i++)sx(b+9.2+i*.5,'clap');sx(b+11.9,'swoosh');sx(b+12.05,'shake');
  sx(b+13.5,'slideDown',.6);sx(b+14.2,'tick');sx(b+14.5,'tick');for(let i=0;i<6;i++)sx(b+15.1+i*.4,'hammer');sx(b+17,'kettle',1.3);sx(b+17.3,'slideUp',.8);sx(b+13.6,'whistleTune');
  sx(b+20.2,'swoosh');sx(b+20.5,'crash');sx(b+20.6,'shake');sx(b+21.4,'plip');sx(b+21.9,'plip');sx(b+22.4,'plip');sx(b+22.6,'slideDown',.4);sx(b+23,'giggle');sx(b+25,'slideUp',1.5);sx(b+26.5,'kettle',1.7);sx(b+26.6,'gibber',1.5);sx(b+27,'slideUp',.5);
  sx(b+28.3,'swoosh');sx(b+28.6,'swoosh');sx(b+28.9,'thud');sx(b+29.2,'pop');sx(b+29.5,'zoom',1.9);sx(b+31.4,'bonk');sx(b+31.45,'slideUp',.3);sx(b+31.7,'crash');sx(b+31.8,'tweet');sx(b+35.6,'slideDown',.6);sx(b+36.2,'thud');sx(b+36.5,'tweet');sx(b+37.2,'tweet');
  sx(b+39.3,'swoosh');sx(b+39.5,'slideDown',.8);sx(b+40.35,'thud');sx(b+40.4,'crash');sx(b+44,'snore');sx(b+47.6,'ding');
  b=130;sx(b+3.2,'slideDown',.8);sx(b+4.8,'pop');[5,6,7].forEach(i=>sx(b+i,'slideUp',.3));sx(b+8,'slideUp',2.2);sx(b+10.3,'bonk');sx(b+10.35,'boing');sx(b+10.6,'slideDown',.3);sx(b+11.2,'tweet');sx(b+11.5,'giggle');
  sx(b+13,'zoom',1.2);sx(b+14.4,'zoom',.8);sx(b+15.2,'thud');for(let i=0;i<5;i++)sx(b+15.4+i*.28,'tick');[16.9,17.3,17.7].forEach(t=>sx(b+t,'squeak'));sx(b+18,'crash');sx(b+18.5,'crash');sx(b+18.6,'tweet');sx(b+21,'ding');
  sx(b+23.6,'thud');sx(b+24.4,'thud');sx(b+25.6,'slideDown',1.8);for(let i=0;i<4;i++)sx(b+25.8+i*.45,'thud');sx(b+28.4,'ding');sx(b+29.3,'swoosh');sx(b+30.1,'bonk');sx(b+30.15,'slideUp',.4);sx(b+30.6,'crash');sx(b+30.7,'crash');
  sx(b+32.3,'bomb',.6);sx(b+32.9,'squeak');sx(b+33.5,'bomb',.7);sx(b+34.2,'boing');sx(b+34.3,'slideUp',.5);sx(b+35.3,'bong');sx(b+35.4,'tweet');sx(b+36.5,'giggle');sx(b+37.4,'thud');sx(b+37.5,'shake');sx(b+38.4,'slideDown',.5);sx(b+38.9,'bonk');sx(b+39,'roll',1.2);
  sx(b+41.1,'pop');sx(b+41.3,'flutter',1.5);sx(b+42.3,'burp');sx(b+43,'slideUp',1);sx(b+44,'kettle',1.6);sx(b+44.1,'gibber',1.4);sx(b+45.6,'zoom',1.4);sx(b+45.9,'zoom',1.6);
  b=187;sx(b,'zoom',2.6);sx(b+.6,'plip');sx(b+3,'crash');sx(b+3.1,'zoom',1.2);sx(b+4.5,'slip');sx(b+5.3,'slideDown',.3);for(let i=0;i<16;i++)sx(b+5.4+Math.pow(i/16,.7)*5,'bump');sx(b+6.6,'sizzle',4.2);
  sx(b+11,'zoom',1);sx(b+11.4,'sizzle',3);sx(b+11.8,'tram',2.5);sx(b+14.46,'swoosh');sx(b+14.5,'thud');sx(b+14.6,'hiss');sx(b+17,'shake');sx(b+19.6,'whistleTune');sx(b+21.8,'swoosh');
  sx(b+23.3,'slip');sx(b+23.5,'slideUp',1.3);sx(b+25,'crash');sx(b+25.05,'bong');sx(b+25.6,'giggle');for(let i=0;i<5;i++)sx(b+26.6+i*.5,'tick');sx(b+29,'bong');sx(b+29.5,'crash');sx(b+30,'tweet');
  sx(b+30.6,'slideUp',.8);sx(b+31.3,'zoom',1);for(let i=0;i<6;i++)sx(b+31.8+i*.28,'tick');sx(b+34,'kettle',1.6);sx(b+34.1,'gibber',1.5);sx(b+38.3,'meow');sx(b+40.3,'meow');sx(b+42.3,'meow');sx(b+45,'slideDown',1.2);
  b=244;for(let i=0;i<4;i++)sx(b+.2+i*.3,'tick');sx(b+1.4,'slideDown',.4);for(let i=0;i<5;i++)sx(b+2.2+i*.3,'tick');sx(b+4,'slideDown',.45);sx(b+4.45,'thud');sx(b+4.6,'tweet');sx(b+5.2,'ding');sx(b+6.5,'zoom',.8);sx(b+7.3,'shake');sx(b+8,'shake');sx(b+8.5,'zoom',.7);
  for(let i=0;i<15;i++)sx(b+9.3+i*.35,'tick');sx(b+14.6,'meow');sx(b+15.5,'creak',4);sx(b+19.6,'boing');sx(b+20.3,'ding');sx(b+21.5,'kiss');sx(b+21.7,'harp');sx(b+23,'chime');sx(b+30.2,'slideUp',.6);sx(b+31.8,'ding');sx(b+33,'slideDown',2);sx(b+36,'pop');
  [285,286.6,288.2,289.8].forEach(t=>{sx(t,'pop');sx(t+.1,'ding')});sx(291.5,'harp');sx(294.2,'tada');
  SFX.sort((a,b)=>a.t-b.t)})();
const mtof=m=>440*Math.pow(2,(m-69)/12);
const PROG={C:[48,[60,64,67]],A7:[45,[61,64,67]],D7:[50,[62,66,72]],G7:[43,[59,65,67]],F:[41,[60,65,69]],Am:[45,[60,64,69]],Dm:[50,[62,65,69]],E7:[40,[59,62,68]]};
const RAG=['C','A7','D7','G7','C','F','G7','C'];
const MEL=[[76,79,76,72,74,0,76,0],[73,76,79,76,81,0,79,0],[78,0,74,78,81,78,74,72],[71,74,77,74,79,-1,-1,0],[76,79,84,79,76,72,76,79],[77,81,84,81,77,0,76,77],[79,77,74,71,74,77,79,77],[76,0,72,0,72,-1,-1,0]];
const LULL=['C','Am','F','G7'];const MINOR=['Am','Dm','E7','Am'];
function mood(t){const R=[[3.5,'rag'],[12,'soft'],[18,'lull'],[23,'rag'],[45,'sneaky'],[53,'rag'],[66,'soft'],[73,'rag'],[86.5,'sneaky'],[91.5,'rag'],[101,'chase'],[108,'rag'],[123,'soft'],[130,'rag'],[175,'chase'],[180,'soft'],[187,'chase'],[198,'rag'],[217,'chase'],[221,'minor'],[237,'soft'],[244,'rag'],[264,'soft'],[272,'rag'],[294,'none']];let m='none';for(const [a,k] of R)if(t>=a)m=k;return m}
const MUS=[];
(function buildMusic(){const beat=.5;let bar=0;
  for(let t0=3.5;t0<294;t0+=4*beat,bar++){const m=mood(t0+.01);if(m==='none')continue;const bi=bar%8,cyc=Math.floor(bar/8);
    if(m==='rag'||m==='chase'){const ch=PROG[RAG[bi]];const fast=m==='chase';
      for(let b=0;b<4;b++){if(fast||b%2===0)MUS.push({t:t0+b*beat,k:'bass',n:ch[0]+(b===2?7:0)});if(b%2===1)ch[1].forEach(n=>MUS.push({t:t0+b*beat,k:'piano',n,v:.05}))}
      const inst=fast?'xylo':(cyc%2?'clar':'xylo');
      MEL[bi].forEach((n,i)=>{if(n>0){let d=beat/2;let j=i+1;while(j<8&&MEL[bi][j]===-1){d+=beat/2;j++}MUS.push({t:t0+i*beat/2,k:inst,n:inst==='clar'?n-12:n,d});if(fast)MUS.push({t:t0+i*beat/2+beat/4,k:'xylo',n:n+(i%2?-5:-3),d:beat/4})}});
      MUS.push({t:t0+1.5*beat,k:'brush'});MUS.push({t:t0+3.5*beat,k:'brush'});if(fast){MUS.push({t:t0+.5*beat,k:'brush'});MUS.push({t:t0+2.5*beat,k:'brush'})}}
    else if(m==='soft'){const ch=PROG[LULL[bar%4]];MUS.push({t:t0,k:'piano',n:ch[0]+12,v:.07,d:1.8});for(let i=0;i<8;i++){const n=ch[1][i%3]+(i>=3?12:0);MUS.push({t:t0+i*beat/2,k:'piano',n,v:.04})}MEL[bi].forEach((n,i)=>{if(n>0&&i%2===0)MUS.push({t:t0+i*beat/2,k:'flute',n,d:beat*.9})})}
    else if(m==='lull'){const ch=PROG[LULL[bar%4]];for(let i=0;i<4;i++)MUS.push({t:t0+i*beat,k:'box',n:ch[1][[0,1,2,1][i]]+24});MUS.push({t:t0,k:'piano',n:ch[0]+12,v:.06,d:1.8})}
    else if(m==='sneaky'){const W=[57,55,53,52,57,55,53,56];for(let i=0;i<4;i++){MUS.push({t:t0+i*beat,k:'pizz',n:W[(bar*4+i)%8]-12});MUS.push({t:t0+i*beat+beat/2,k:'pizz',n:W[(bar*4+i)%8]+12,v:.5})}}
    else if(m==='minor'){const ch=PROG[MINOR[bar%4]];MUS.push({t:t0,k:'bass',n:ch[0]});MUS.push({t:t0+beat*2,k:'bass',n:ch[0]});ch[1].forEach(n=>MUS.push({t:t0+beat,k:'piano',n,v:.04}));[0,3].forEach((x,i)=>MUS.push({t:t0+x*beat,k:'clar',n:ch[1][2-i]-12,d:beat*1.5}))}}
  const R=rng(99);for(let t=0;t<300;t+=.1+R()*.5)MUS.push({t,k:'click',v:R()});MUS.sort((a,b)=>a.t-b.t)})();
const EVENTS=[...MUS,...SFX].sort((a,b)=>a.t-b.t);
function playExtra(ctx,out,e,t){const k=e.k,d=e.d||1;
  switch(k){
  case'ring':for(let i=0;i<d*18;i++){osc(ctx,out,'square',i%2?2600:3100,t+i/18,.04,.035,.002)}return true;
  case'bomb':osc(ctx,out,'sine',2200,t,d,.14,.02,(p,t)=>p.exponentialRampToValueAtTime(350,t+d));return true;
  case'bong':[220,555,880].forEach((f,i)=>osc(ctx,out,'sine',f,t,1.6-i*.4,.25-i*.06,.003));return true;
  case'kettle':{const o=osc(ctx,out,'sine',2100,t,d,.1,.15);vib(o,t,8,70,ctx);noise(ctx,out,t,d,.05,'bandpass',2600,null,4);return true}
  case'crash':noise(ctx,out,t,.6,.5,'lowpass',2500,300);osc(ctx,out,'sine',110,t,.3,.5,.003,(p,t)=>p.exponentialRampToValueAtTime(40,t+.3));for(let i=0;i<7;i++)noise(ctx,out,t+.05+hash(i+e.t)*.5,.04,.2,'bandpass',2000+hash(i)*3000,null,3);return true;
  case'gibber':for(let i=0;i<d*11;i++){const f=280+hash(i+e.t*7)*700;osc(ctx,out,'square',f,t+i/11,.07,.05,.005,(p,t)=>p.exponentialRampToValueAtTime(f*(.7+hash(i)*.7),t+.07))}return true;
  case'hammer':osc(ctx,out,'triangle',1100,t,.06,.3,.001,(p,t)=>p.exponentialRampToValueAtTime(300,t+.05));noise(ctx,out,t,.04,.25,'bandpass',3000,null,2);return true;
  case'zoom':{const o=ctx.createOscillator(),fl=ctx.createBiquadFilter(),gn=ctx.createGain();o.type='sawtooth';o.frequency.setValueAtTime(140,t);o.frequency.exponentialRampToValueAtTime(700,t+d);fl.type='lowpass';fl.frequency.value=1200;gn.gain.setValueAtTime(.0001,t);gn.gain.linearRampToValueAtTime(.08,t+.1);gn.gain.linearRampToValueAtTime(.0001,t+d);o.connect(fl);fl.connect(gn);gn.connect(out);o.start(t);o.stop(t+d+.05);noise(ctx,out,t,d,.12,'bandpass',600,3000,1.5);return true}
  case'squeak':osc(ctx,out,'sine',1400,t,.22,.13,.01,(p,t)=>{p.exponentialRampToValueAtTime(2100,t+.08);p.exponentialRampToValueAtTime(1500,t+.2)});return true;
  case'bump':osc(ctx,out,'sine',120,t,.12,.35,.002,(p,t)=>p.exponentialRampToValueAtTime(50,t+.1));return true;
  case'tram':osc(ctx,out,'sine',1800,t,.6,.15);osc(ctx,out,'sine',3600,t,.3,.05);osc(ctx,out,'sine',1800,t+.3,.6,.15);noise(ctx,out,t,d,.35,'lowpass',220);return true;
  case'meow':{const o=ctx.createOscillator(),fl=ctx.createBiquadFilter(),gn=ctx.createGain();o.type='sawtooth';o.frequency.setValueAtTime(520,t);o.frequency.linearRampToValueAtTime(760,t+.25);o.frequency.linearRampToValueAtTime(420,t+.75);fl.type='bandpass';fl.frequency.setValueAtTime(900,t);fl.frequency.linearRampToValueAtTime(1600,t+.25);fl.frequency.linearRampToValueAtTime(700,t+.75);fl.Q.value=3;env(ctx,gn,t,.05,.16,.75);o.connect(fl);fl.connect(gn);gn.connect(out);o.start(t);o.stop(t+.9);return true}
  case'kiss':noise(ctx,out,t,.05,.3,'bandpass',2500,null,3);osc(ctx,out,'sine',900,t+.03,.1,.2,.002,(p,t)=>p.exponentialRampToValueAtTime(1600,t+.08));return true;
  case'slip':playExtra(ctx,out,{k:'squeak',t:e.t},t);osc(ctx,out,'sine',300,t+.1,.5,.18,.02,(p,t)=>p.exponentialRampToValueAtTime(1400,t+.45));return true;
  case'sizzle':{const s=ctx.createBufferSource();s.buffer=noiseBuf(ctx);s.loop=true;const fl=ctx.createBiquadFilter();fl.type='highpass';fl.frequency.value=3500;const gn=ctx.createGain();gn.gain.setValueAtTime(.0001,t);gn.gain.linearRampToValueAtTime(.07,t+.3);gn.gain.setValueAtTime(.07,t+d-.3);gn.gain.linearRampToValueAtTime(.0001,t+d);s.connect(fl);fl.connect(gn);gn.connect(out);s.start(t);s.stop(t+d+.1);return true}
  case'hiss':noise(ctx,out,t,.8,.18,'highpass',3000);return true;
  case'clap':noise(ctx,out,t,.05,.25,'bandpass',1400,null,1.5);return true;
  case'crack':for(let i=0;i<3;i++)noise(ctx,out,t+i*.09,.025,.3,'bandpass',2500,null,4);return true;
  case'giggle':for(let i=0;i<7;i++)osc(ctx,out,'sine',i%2?1150:950,t+i*.09,.07,.06,.005,(p,t)=>p.exponentialRampToValueAtTime(i%2?1300:800,t+.06));return true;
  case'burp':{const o=ctx.createOscillator(),fl=ctx.createBiquadFilter(),gn=ctx.createGain();o.type='sawtooth';o.frequency.setValueAtTime(95,t);o.frequency.linearRampToValueAtTime(70,t+.5);fl.type='lowpass';fl.frequency.value=600;env(ctx,gn,t,.02,.25,.5);o.connect(fl);fl.connect(gn);gn.connect(out);vib(o,t,18,15,ctx);o.start(t);o.stop(t+.6);return true}
  case'creak':{const o=ctx.createOscillator(),fl=ctx.createBiquadFilter(),gn=ctx.createGain();o.type='sawtooth';o.frequency.setValueAtTime(160,t);o.frequency.linearRampToValueAtTime(90,t+d);fl.type='bandpass';fl.frequency.value=900;fl.Q.value=4;gn.gain.setValueAtTime(.0001,t);gn.gain.linearRampToValueAtTime(.12,t+.3);gn.gain.linearRampToValueAtTime(.0001,t+d);o.connect(fl);fl.connect(gn);gn.connect(out);vib(o,t,22,30,ctx);o.start(t);o.stop(t+d+.05);return true}
  case'roll':noise(ctx,out,t,d,.18,'lowpass',350);return true;
  case'flutter':for(let i=0;i<d*14;i++)noise(ctx,out,t+i/14,.03,.06,'bandpass',800,null,2);return true;
  case'pizz':{const f=mtof(e.n);osc(ctx,out,'triangle',f,t,.18,.12*(e.v||1),.003);osc(ctx,out,'sine',f*2,t,.08,.04*(e.v||1),.002);return true}
  }return false}
