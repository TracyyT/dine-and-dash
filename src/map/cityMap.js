import { levelStop } from './stop.js';
import { FL, G0, G1, OUT, P, el, inView, isSt, m6, poly, pts, rnd, seedRandom } from './iso.js';
import { box, car, lamp, planter, sign, tree, truck } from './props.js';
import { FLR, PAL, STY, drawBuilding, plaza } from './buildings.js';

export function renderCity(S, LB, chapter, progress) {
  seedRandom(21);
  // ground: wide paved blocks with wide streets between them
  for(let i=G0;i<G1;i++)for(let j=G0;j<G1;j++){
   if(!inView(i+.5,j+.5,120))continue;
   const st=isSt(i)||isSt(j),k=(i+j)%2;
   poly([P(i,j),P(i+1,j),P(i+1,j+1),P(i,j+1)],st?(k?'#44406a':'#3f3b64'):(k?'#c39ab0':'#b98fa8'),{stroke:st?'none':'rgba(80,35,70,.22)','stroke-width':1},S)}
  for(let s0=G0;s0<G1;s0++){if(m6(s0)!=4)continue;const c=s0+1;
   el('polyline',{points:pts([P(c,G0),P(c,G1)]),fill:'none',stroke:'#f2e2b8','stroke-width':3,'stroke-dasharray':'18 16',opacity:.45},S);
   el('polyline',{points:pts([P(G0,c),P(G1,c)]),fill:'none',stroke:'#f2e2b8','stroke-width':3,'stroke-dasharray':'18 16',opacity:.45},S)}

  const doneN=n=>(progress.stars[n]||0)>0;
    const current=chapter.levels.find(l=>!doneN(l.n));
    const lvl=chapter.levels.map(l=>({n:l.n,name:l.name,sg:l.sign,a:l.arc,s:progress.stars[l.n]||0,st:doneN(l.n)?'done':(current&&current.n===l.n?'now':'lock')}));
    const doneArc=lvl.filter(l=>l.st=='done').reduce((m,l)=>Math.max(m,l.a+1.5),0);
  // the level path runs on street centres
  const W=chapter.path,R=1.6;
  let d='';const sp=[];
  W.forEach((p,i)=>{
   if(i==0){d+='M'+P(...p).join(' ');return}
   const prev=W[i-1],nx=W[i+1],dx=Math.sign(p[0]-prev[0]),dy=Math.sign(p[1]-prev[1]);
   if(nx){const a=[p[0]-dx*R,p[1]-dy*R],ndx=Math.sign(nx[0]-p[0]),ndy=Math.sign(nx[1]-p[1]),b=[p[0]+ndx*R,p[1]+ndy*R];
    d+=' L'+P(...a).join(' ')+' Q'+P(...p).join(' ')+' '+P(...b).join(' ')}
   else d+=' L'+P(...p).join(' ')});
  for(let i=1;i<W.length;i++){const a=W[i-1],b=W[i],L=Math.abs(b[0]-a[0])+Math.abs(b[1]-a[1]);for(let t=0;t<=L;t+=.25)sp.push([a[0]+(b[0]-a[0])*t/L,a[1]+(b[1]-a[1])*t/L])}
  const TOTAL=W.reduce((s,p,i)=>i?s+Math.abs(p[0]-W[i-1][0])+Math.abs(p[1]-W[i-1][1]):0,0);
  const gridAt=s=>{let r=s;for(let i=1;i<W.length;i++){const a=W[i-1],b=W[i],L=Math.abs(b[0]-a[0])+Math.abs(b[1]-a[1]);if(r<=L)return[a[0]+(b[0]-a[0])*r/L,a[1]+(b[1]-a[1])*r/L];r-=L}return W[W.length-1]};
  const rd={d,fill:'none','stroke-linecap':'round','stroke-linejoin':'round'};
  el('path',{...rd,stroke:'#ffd96a','stroke-width':46,opacity:.16},S);
  el('path',{...rd,stroke:'#2a2140','stroke-width':14,opacity:.45,transform:'translate(0,5)'},S);
  el('path',{...rd,stroke:'#c9a24a','stroke-width':11},S);
  const road=el('path',{...rd},S);
  const pathLen=road.getTotalLength();
  el('path',{...rd,stroke:'#ffe27a','stroke-width':46,opacity:.3,'stroke-dasharray':`${pathLen*doneArc/TOTAL} ${pathLen}`},S);
  el('path',{...rd,stroke:'#fff3b0','stroke-width':12,'stroke-dasharray':`${pathLen*doneArc/TOTAL} ${pathLen}`},S);

  // depth-sorted items
  const items=[];const add=(key,fn)=>items.push({key,fn});
  const inPoly=(x,y,p)=>{let c=false;for(let i=0,j=p.length-1;i<p.length;j=i++){if((p[i][1]>y)!=(p[j][1]>y)&&x<(p[j][0]-p[i][0])*(y-p[i][1])/(p[j][1]-p[i][1])+p[i][0])c=!c}return c};
  const silhouette=(x0,y0,w,d,h)=>[P(x0,y0+d),P(x0+w,y0+d),P(x0+w,y0),P(x0+w,y0,h),P(x0,y0,h),P(x0,y0+d,h)];
  const OFF=[[0,0],[0,-26],[0,-70],[-50,0],[50,0],[-50,-26],[50,-26],[0,30]];
  const blocked=(x0,y0,w,d,h)=>{const key=x0+w+y0+d,sil=silhouette(x0,y0,w,d,h);return sp.some(s=>{if(s[0]+s[1]>=key-.5)return false;const q=P(s[0],s[1]);return OFF.some(o=>inPoly(q[0]+o[0],q[1]+o[1],sil))})};
  const nearPath=(gx,gy,r)=>sp.some(q=>Math.hypot(q[0]-gx,q[1]-gy)<r);
  // blocks: fewer, bigger buildings with room around them
  const B=[],kinds=['park','truck','cafe'];let pk=0;
  let lowN=0,bag=[];const nextStyle=()=>{if(!bag.length)bag=[...STY].sort(()=>rnd()-.5);return bag.pop()};
  for(let bx=-4;bx<=8;bx++)for(let by=-4;by<=8;by++){
   const X=bx*6,Y=by*6;if(!inView(X+2,Y+2,330))continue;
   const far=!nearPath(X+2,Y+2,6);
   let style=nextStyle();
   const w=style=='hotel'?3.0:2.3+rnd()*.7,d=style=='hotel'?2.5:2.3+rnd()*.7,x0=X+.4+rnd()*(3.2-w),y0=Y+.4+rnd()*(3.2-d);
   const fr=FLR[style];let h=Math.round((fr[0]+Math.floor(rnd()*(fr[1]-fr[0]+1)))*FL);
   if((far&&rnd()<.12)||(!far&&rnd()<.04)){const kd=kinds[pk++%3];add(x0+w+y0+d,g=>plaza(g,X+.6,Y+.6,2.8,2.8,kd));continue}
   while(h>FL&&blocked(x0,y0,w,d,h))h-=6;
   if(blocked(x0,y0,w,d,h)){const kd=kinds[pk++%3];add(X+.6+2.8+Y+.6+2.8,g=>plaza(g,X+.6,Y+.6,2.8,2.8,kd));continue}
   if(h<FL*3&&!['loft','brown','shop','townhouse','cafebox','diner','bank'].includes(style)){style=['loft','shop','townhouse','cafebox','diner'][lowN++%5];h=Math.min(h,{loft:h,shop:FL*2,townhouse:FL*3,cafebox:Math.round(FL*1.4),diner:Math.round(FL*1.3)}[style])}
   const pal=PAL[style],b={x0,y0,w,d,h,style,base:pal[Math.floor(rnd()*pal.length)],aw:['#d9435f','#f0a83a','#2f8f8a','#7d1d33'][Math.floor(rnd()*4)],wt:rnd()<.5,sign:null};
   B.push(b);add(x0+w+y0+d,g=>drawBuilding(g,b));
   add(X+Y+7.8,g=>lamp(g,X+3.9,Y+3.9));
   if(rnd()<.6)add(X+Y+3.3,g=>planter(g,x0+.2,y0+d+.5));
   if(rnd()<.5)add(X+Y+.5+4,g=>tree(g,X+.2,Y+3.7));
   if(rnd()<.3&&!nearPath(X+4.8,Y+1.5,2.4)){const c=['#d9435f','#2f8f8a','#c9a24a','#f7efe0'][Math.floor(rnd()*4)];add(X+Y+6.3,g=>car(g,X+4.7,Y+1.4,false,c))}
   if(rnd()<.3&&!nearPath(X+1.4,Y+4.8,2.4)){const c=['#d9435f','#2f8f8a','#c9a24a','#f7efe0'][Math.floor(rnd()*4)];add(X+Y+6.3,g=>car(g,X+1.2,Y+4.7,true,c))}
  }

  // level stops
  const lv=lvl;
  lv.forEach(l=>{const [gx,gy]=gridAt(l.a);let best=null,bd=1e9;B.forEach(b=>{if(b.sign||b.h<FL*3||b.style=="loft")return;const c=[b.x0+b.w/2,b.y0+b.d/2],dd=Math.hypot(c[0]-gx,c[1]-gy);if(c[0]+c[1]<gx+gy&&dd<bd){bd=dd;best=b}});if(best)best.sign=l.sg});
  lv.forEach(l=>{const [gx,gy]=gridAt(l.a),[x,y]=P(gx,gy);add(gx+gy+.6,g=>levelStop({parent:g,labels:LB,l,chapter,skin:'city',x,y}))});
  // start flag
  add(24,g=>{const [x,y]=P(...W[0]);el('ellipse',{cx:x,cy:y+4,rx:26,ry:11,fill:'#14100f',stroke:'url(#brass)','stroke-width':4},g);el('line',{x1:x,y1:y,x2:x,y2:y-56,stroke:'#8f6a22','stroke-width':4},g);el('path',{d:`M${x} ${y-56}l32 10-32 10Z`,fill:'#d9435f',stroke:'#14100f','stroke-width':1.5},g)});
  items.sort((a,b)=>a.key-b.key).forEach(i=>i.fn(S));
    return {nodes:lv.map(l=>({...l,pos:P(...gridAt(l.a))})),board:{x:P(...chapter.path[chapter.path.length-1])[0],y:P(...chapter.path[chapter.path.length-1])[1],dir:1},home:P(...gridAt(current?current.arc:chapter.levels[chapter.levels.length-1].arc))};
}
