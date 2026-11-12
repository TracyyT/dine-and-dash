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
  const star=(x,y,on)=>`<path transform="translate(${x},${y}) scale(1.4)" d="M0-9L2.7-3 9-2.4 4.2 1.8 5.6 8 0 4.8 -5.6 8 -4.2 1.8 -9-2.4 -2.7-3Z" fill="${on?'#ffd84a':'#3a3050'}" stroke="#14100f" stroke-width="1.2"/>`;
  lv.forEach(l=>{
   const [gx,gy]=gridAt(l.a),[x,y]=P(gx,gy),lock=l.st=='lock';
   add(gx+gy+.6,g=>{
    const n=el('g',{class:'node','data-n':l.n,transform:`translate(${x},${y})`,tabindex:lock?-1:0,role:'button','aria-label':`Level ${l.n}, ${l.name}, `+(lock?'locked':l.st=='now'?'next up':l.s+' stars')},g);
    el('ellipse',{cy:18,rx:54,ry:23,fill:'#1a0a30',opacity:.38},n);
    const u=el('g',{class:'lift'},n);
    if(l.st=='now')el('ellipse',{rx:48,ry:24,fill:'#ffd96a',class:'pulse'},u);
    const base=lock?'#7a7088':l.st=='now'?'#c43a52':'#e8b84a',edge=lock?'#4a4258':l.st=='now'?'#7d1d33':'#a87a22',top=lock?'#a49ab4':l.st=='now'?'#ec5a72':'#ffd96a';
    el('path',{d:'M-46 0v14a46 23 0 0 0 92 0v-14Z',fill:edge,stroke:'#14100f','stroke-width':1.6},u);
    el('ellipse',{class:'ring',rx:46,ry:23,fill:top,stroke:'#14100f','stroke-width':2},u);
    el('ellipse',{rx:34,ry:17,fill:base,stroke:lock?'#5a5068':'#fff3c0','stroke-width':1.6,opacity:.95},u);
    const t=el('text',{y:10,'text-anchor':'middle','font-family':'Limelight,serif','font-size':30,fill:lock?'#4a4258':'#fff8e0',stroke:'#14100f','stroke-width':1,'paint-order':'stroke'},u);t.textContent=l.n;
    if(lock){const lk=el('g',{transform:'translate(0,-28) scale(1.4)'},u);lk.innerHTML='<rect x="-7" y="-2" width="14" height="11" rx="2" fill="#5a5068" stroke="#14100f"/><path d="M-4-2V-6a4 4 0 0 1 8 0V-2" fill="none" stroke="#5a5068" stroke-width="2.4"/>'}
    if(l.st=='now'){const c=el('g',{class:'bob',transform:'translate(0,-32) scale(1.5)'},u);c.innerHTML='<ellipse cy="26" rx="9" ry="3" fill="#1a0a30" opacity=".3"/><rect x="-7" y="6" width="14" height="16" rx="5" fill="#f7efe0" stroke="#14100f" stroke-width="1.2"/><circle cy="-2" r="8" fill="#f1b98f" stroke="#14100f" stroke-width="1.2"/><path d="M-9-6a9 8 0 0 1 4-8 5 5 0 0 1 5-3 5 5 0 0 1 5 3 9 8 0 0 1 4 8Z" fill="#fff" stroke="#14100f" stroke-width="1.2"/><circle cx="-3" cy="-2" r="1.3" fill="#241418"/><circle cx="3" cy="-2" r="1.3" fill="#241418"/><path d="M-3 2q3 3 6 0" stroke="#8a2f3c" stroke-width="1.4" fill="none"/>'}
   });
   const g=el('g',{transform:`translate(${x},${y})`,'pointer-events':'none'},LB);
   const lab=el('g',{transform:'translate(0,62)'},g);el('rect',{x:-80,y:-17,width:160,height:32,fill:'#14100f',stroke:lock?'#5a5068':'#c9a24a','stroke-width':2},lab);
   const tt=el('text',{y:6,'text-anchor':'middle','font-family':'Josefin Sans','font-weight':700,'font-size':18,fill:lock?'#9a90ac':'#f2e2b8'},lab);tt.textContent=l.name;
   if(l.st=='done'){const s=el('g',{transform:'translate(0,-56)'},g);s.innerHTML=star(-30,0,l.s>=1)+star(0,-8,l.s>=2)+star(30,0,l.s>=3)}
   if(l.st=='now'){const s=el('g',{transform:'translate(0,-100)'},g);el('rect',{x:-42,y:-16,width:84,height:32,fill:'#ffd96a',stroke:'#14100f','stroke-width':2},s);el('path',{d:'M-8 16L0 26L8 16Z',fill:'#ffd96a',stroke:'#14100f','stroke-width':2},s);const q=el('text',{y:7,'text-anchor':'middle','font-family':'Josefin Sans','font-weight':700,'font-size':19,fill:'#4d1220','letter-spacing':1.5},s);q.textContent='PLAY'}
   if(l.n==5)el('path',{d:'M-20-60L-12-76-3-64 0-80 3-64 12-76 20-60Z',fill:'#ffd96a',stroke:'#14100f','stroke-width':1.5},g);
  });
  // start flag
  add(24,g=>{const [x,y]=P(...W[0]);el('ellipse',{cx:x,cy:y+4,rx:26,ry:11,fill:'#14100f',stroke:'url(#brass)','stroke-width':4},g);el('line',{x1:x,y1:y,x2:x,y2:y-56,stroke:'#8f6a22','stroke-width':4},g);el('path',{d:`M${x} ${y-56}l32 10-32 10Z`,fill:'#d9435f',stroke:'#14100f','stroke-width':1.5},g)});
  // next chapter: construction site closing the road
  add(1e3,g=>{const x0=W[W.length-1][0]+.9,y0=W[W.length-1][1]-1,w=2.6,d=2,fh=34,[sx,sy]=[0,0];
   poly([P(x0,y0),P(x0+w,y0),P(x0+w,y0+d),P(x0,y0+d)],'#cda877',{stroke:'#8a6a3a','stroke-width':1.5},g);
   poly([P(x0,y0),P(x0+w,y0),P(x0+w,y0,fh),P(x0,y0,fh)],'#3f8a4a',OUT,g);poly([P(x0,y0),P(x0,y0+d),P(x0,y0+d,fh),P(x0,y0,fh)],'#4f9a52',OUT,g);
   box(g,x0+.5,y0+.6,.9,.7,18,'#8d94a4',{});box(g,x0+1.5,y0+1,.7,.6,12,'#a2a9b8',{});
   poly([P(x0,y0+d),P(x0+w,y0+d),P(x0+w,y0+d,fh),P(x0,y0+d,fh)],'#3a7a42',OUT,g);poly([P(x0+w,y0+d),P(x0+w,y0),P(x0+w,y0,fh),P(x0+w,y0+d,fh)],'#4f9a52',OUT,g);
   el('polyline',{points:pts([P(x0,y0+d,fh),P(x0+w,y0+d,fh),P(x0+w,y0,fh)]),fill:'none',stroke:'#f0cd6a','stroke-width':3},g);
   const c=P(x0+w/2,y0+d/2,fh+10);
   el('rect',{x:c[0]-3,y:c[1]-6,width:6,height:92,fill:'#6a4a34'},g);
   el('rect',{x:c[0]-84,y:c[1]-82,width:168,height:76,fill:'#14100f',stroke:'url(#brass)','stroke-width':5},g);
   g.insertAdjacentHTML('beforeend',`<g transform="translate(${c[0]},${c[1]-52}) scale(1.3)"><rect x="-8" y="-2" width="16" height="12" rx="2" fill="#c9a24a"/><path d="M-5-2V-8a5 5 0 0 1 10 0V-2" fill="none" stroke="#c9a24a" stroke-width="2.8"/></g><text x="${c[0]}" y="${c[1]-16}" text-anchor="middle" font-family="Limelight,serif" font-size="19" fill="#ffe9a8">${chapter.nextLabel||'NEXT CHAPTER'}</text>`)});
  items.sort((a,b)=>a.key-b.key).forEach(i=>i.fn(S));
    return {nodes:lv.map(l=>({...l,pos:P(...gridAt(l.a))})),home:P(...gridAt(current?current.arc:chapter.levels[chapter.levels.length-1].arc))};
}
