import { FL, OUT, P, TH, TW, el, poly, pts, rnd, shade } from './iso.js';

export function shadow(g,x0,y0,w,d,h){for(let i=1;i<=8;i++){const t=i/8,dx=-h*.8*t,dy=h*.3*t;poly([P(x0,y0),P(x0+w,y0),P(x0+w,y0+d),P(x0,y0+d)].map(p=>[p[0]+dx,p[1]+dy]),'#1a0a30',{opacity:.06},g)}}
export const sc=(g,x,y,s)=>el('g',{transform:`translate(${x} ${y}) scale(${s})`},g);
export function tree(g,gx,gy,s=1.7){const [x,y]=P(gx,gy),t=sc(g,x,y,s);el('ellipse',{cx:4,cy:2,rx:11,ry:5,fill:'#1a0a30',opacity:.28},t);el('rect',{x:-2,y:-12,width:4,height:12,fill:'#6a4a34'},t);[[0,-24,11,'#2f8f66'],[-6,-18,8,'#2a7a58'],[6,-18,8,'#4fae7a'],[0,-30,7,'#5fc08a']].forEach(([ox,oy,r,c])=>el('circle',{cx:ox,cy:oy,r,fill:c},t))}
export function lamp(g,gx,gy){const [x,y]=P(gx,gy),t=sc(g,x,y,1.6);el('circle',{cy:-30,r:20,fill:'url(#glow)'},t);el('rect',{x:-1.2,y:-28,width:2.4,height:28,fill:'#2a2036'},t);el('circle',{cy:-30,r:3.5,fill:'#fff2c0'},t)}
export function planter(g,gx,gy){const x0=gx,y0=gy;box(g,x0,y0,.5,.5,14,'#8a5a3b',{});const t=P(x0+.25,y0+.25,14);[['#ff8fb1',-7,-2],['#ffd84a',2,-5],['#fff',8,0],['#ff8fb1',-1,2]].forEach(([c,a,b])=>el('circle',{cx:t[0]+a,cy:t[1]+b,r:4,fill:c,stroke:'#2f6a3a','stroke-width':1},g))}
export function umbrella(g,gx,gy,col){const [x,y]=P(gx,gy),t=sc(g,x,y,1.5);
 el('ellipse',{cx:3,cy:3,rx:15,ry:6,fill:'#1a0a30',opacity:.22},t);
 [[-9,2],[9,2]].forEach(([o,v])=>{el('rect',{x:o-3,y:v-2,width:6,height:5,fill:'#8a5a3b',stroke:'#2a1810','stroke-width':.8},t)});
 el('rect',{x:-1.2,y:-26,width:2.4,height:26,fill:'#5a3a2a'},t);el('ellipse',{cx:0,cy:-2,rx:11,ry:5,fill:'#f7efe0',stroke:'#2a1810'},t);
 el('path',{d:'M-17-22L0-34 17-22Q9-17 0-21Q-9-17-17-22Z',fill:col,stroke:'#2a1810','stroke-width':1},t);el('path',{d:'M0-34L-6-19Q-3-18 0-21Z',fill:'#f7efe0'},t);el('path',{d:'M0-34L6-19Q3-18 0-21Z',fill:'#f7efe0'},t)}
export function bench(g,gx,gy){box(g,gx,gy,.8,.28,10,'#9a6a40',{});box(g,gx,gy,.8,.06,24,'#7a4a2a',{})}
export function truck(g,gx,gy,col){const w=1.6,d=.8;shadow(g,gx,gy,w+.5,d,38);
 box(g,gx,gy,w,d,40,col,{});box(g,gx+w,gy+.08,.5,d-.16,28,shade(col,.9),{});
 const aw=[P(gx+.15,gy+d,40),P(gx+w-.15,gy+d,40),P(gx+w-.15,gy+d+.38,28),P(gx+.15,gy+d+.38,28)];poly(aw,'#f7efe0',OUT,g);
 for(let i=0;i<5;i+=2){const a=.15+(w-.3)*i/5,b=.15+(w-.3)*(i+1)/5;poly([P(gx+a,gy+d,40),P(gx+b,gy+d,40),P(gx+b,gy+d+.38,28),P(gx+a,gy+d+.38,28)],'#d9435f',{},g)}
 poly([P(gx+.35,gy+d,12),P(gx+w-.35,gy+d,12),P(gx+w-.35,gy+d,30),P(gx+.35,gy+d,30)],'#2b2650',OUT,g);
 [P(gx+.3,gy+d,0),P(gx+w+.3,gy+d,0)].forEach(q=>{el('circle',{cx:q[0],cy:q[1]-2,r:8,fill:'#1a1a22',stroke:'#000'},g);el('circle',{cx:q[0],cy:q[1]-2,r:3,fill:'#c8ccd6'},g)});
 const t=P(gx+w/2,gy+d/2,46);el('rect',{x:t[0]-26,y:t[1]-4,width:52,height:16,fill:'#14100f',stroke:'#c9a24a'},g);const tx=el('text',{x:t[0],y:t[1]+8,'text-anchor':'middle','font-family':'Limelight,serif','font-size':11,fill:'#ffe9a8'},g);tx.textContent='TACOS'}
export function car(g,gx,gy,horiz,col){const w=horiz?1.3:.65,d=horiz?.65:1.3;shadow(g,gx,gy,w,d,14);box(g,gx,gy,w,d,16,col,{});const t=P(gx+w/2,gy+d/2,22);el('ellipse',{cx:t[0],cy:t[1]+2,rx:12,ry:6,fill:'#9ad0e8',stroke:'#1a1030','stroke-width':1},g)}
export function sign(g,x0,y0,w,d,h,text){const fl=Math.min(h-70,110);if(fl<50)return;const [sx,sy]=P(x0+w*.1,y0+d,fl),t=el('g',{transform:`matrix(1 .5 0 1 ${sx} ${sy})`},g),tw=text.length*15+16;
 el('rect',{x:0,y:-22,width:tw,height:28,fill:'#14100f',stroke:'#ff9ab8','stroke-width':2.5},t);const tx=el('text',{x:8,y:0,'font-family':'Limelight,serif','font-size':19,fill:'#ff9ab8'},t);tx.textContent=text}
export function waterTower(g,gx,gy,h){const [x,y]=P(gx,gy,h),t=sc(g,x,y,1.7);[-6,6].forEach(o=>el('line',{x1:o,y1:0,x2:o,y2:-14,stroke:'#5a3a2a','stroke-width':2},t));el('rect',{x:-9,y:-30,width:18,height:17,fill:'#a86a4a',stroke:'#3a2018'},t);el('polygon',{points:'-10,-30 10,-30 0,-38',fill:'#7a4a34',stroke:'#3a2018'},t)}

export function windows(g,x0,y0,w,d,h,face,lit,o={}){
 const len=face=='L'?w:d,z=o.z||0,cols=o.ribbon?1:Math.max(2,Math.floor(len/(o.cell||.85))),wf=o.ribbon?.94:(o.wf||.56),vh=o.vh||22,step=o.step||FL,v0=o.v0??12;
 const rows=Math.floor((h-(o.top||18))/step),r0=(face=='L'&&o.skipG!==false&&z==0&&h>FL*2)?1:0;
 for(let r=r0;r<rows;r++)for(let c=0;c<cols;c++){
  const u0=(c+(1-wf)/2)/cols,u1=(c+1-(1-wf)/2)/cols,va=z+r*step+v0,vb=va+vh;
  const pt=(u,v)=>face=='L'?P(x0+u*w,y0+d,v):P(x0+w,y0+d-u*d,v);
  const on=rnd()<lit,q=[pt(u0,va),pt(u1,va),pt(u1,vb),pt(u0,vb)];
  poly(q,on?(o.glass?'#a8dcee':'#ffd77a'):(o.glass?'#3a5f8a':'#2b2650'),{stroke:'rgba(25,10,35,.7)','stroke-width':1.2,opacity:on?1:.92},g);
  if(on&&!o.glass)poly(q,'#fff3c0',{opacity:.3},g);
  if(o.arch)poly([pt(u0,vb),pt(u1,vb),pt((u0+u1)/2,vb+10)],on?'#ffd77a':'#2b2650',{stroke:'rgba(25,10,35,.7)','stroke-width':1.2},g);
  if(!o.ribbon){const a=pt((u0+u1)/2,va),b=pt((u0+u1)/2,vb);el('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:'rgba(25,10,35,.5)','stroke-width':1},g)}}}
export function box(g,x0,y0,w,d,h,base,opt={}){
 const z=opt.z||0,Lf=[P(x0,y0+d,z),P(x0+w,y0+d,z),P(x0+w,y0+d,z+h),P(x0,y0+d,z+h)],Rf=[P(x0+w,y0+d,z),P(x0+w,y0,z),P(x0+w,y0,z+h),P(x0+w,y0+d,z+h)],T=[P(x0,y0,z+h),P(x0+w,y0,z+h),P(x0+w,y0+d,z+h),P(x0,y0+d,z+h)];
 poly(Lf,shade(base,.64),OUT,g);poly(Rf,shade(base,.93),OUT,g);poly(T,shade(base,1.16),OUT,g);
 if(opt.win&&h>FL*.9){const wo={...(opt.wo||{}),z};windows(g,x0,y0,w,d,h,'L',.42,wo);windows(g,x0,y0,w,d,h,'R',.55,wo)}
 if(opt.trim)el('polyline',{points:pts([...T,T[0]]),fill:'none',stroke:'#f0cd6a','stroke-width':3},g);
 return T}
export const treeXY=(g,x,y,s)=>{const t=sc(g,x,y,s);el('rect',{x:-2,y:-12,width:4,height:12,fill:'#6a4a34'},t);[[0,-24,11,'#2f8f66'],[-6,-18,8,'#2a7a58'],[6,-18,8,'#4fae7a']].forEach(([ox,oy,r,c])=>el('circle',{cx:ox,cy:oy,r,fill:c},t))};
export function pilasters(g,x0,y0,w,d,h,n,col='#e2c46a'){for(let i=0;i<=n;i++){const u=i/n,a=Math.min(u*w,w-.07);poly([P(x0+a,y0+d,0),P(x0+a+.07,y0+d,0),P(x0+a+.07,y0+d,h),P(x0+a,y0+d,h)],col,{stroke:'rgba(25,10,35,.4)','stroke-width':.8},g);
 const b=Math.min(u*d,d-.07);poly([P(x0+w,y0+d-b,0),P(x0+w,y0+d-b-.07,0),P(x0+w,y0+d-b-.07,h),P(x0+w,y0+d-b,h)],shade(col,.85),{stroke:'rgba(25,10,35,.4)','stroke-width':.8},g)}}
export function balconies(g,x0,y0,w,d,rows,face,col){for(let r=1;r<rows;r++){const v=r*FL+8;
 if(face=='L'){poly([P(x0+w*.08,y0+d,v),P(x0+w*.92,y0+d,v),P(x0+w*.92,y0+d+.22,v),P(x0+w*.08,y0+d+.22,v)],col,OUT,g);poly([P(x0+w*.08,y0+d+.22,v),P(x0+w*.92,y0+d+.22,v),P(x0+w*.92,y0+d+.22,v-8),P(x0+w*.08,y0+d+.22,v-8)],shade(col,.7),OUT,g);
  for(let k=1;k<5;k++){const q=P(x0+w*(.08+.84*k/5),y0+d+.22,v+5);el('circle',{cx:q[0],cy:q[1],r:4,fill:k%2?'#4fae7a':'#ff8fb1',stroke:'#2a5a3a'},g)}}
 else{poly([P(x0+w,y0+d*.92,v),P(x0+w,y0+d*.08,v),P(x0+w+.22,y0+d*.08,v),P(x0+w+.22,y0+d*.92,v)],col,OUT,g)}}}
export function fireEscape(g,x0,y0,w,d,rows){const pt=(u,v)=>P(x0+w,y0+d-u*d,v),L=[];for(let r=0;r<rows;r++){const v=r*FL+6;L.push(pt(.12,v),pt(.5,v),pt(.12,v+FL))}
 el('polyline',{points:pts(L),fill:'none',stroke:'#1a1420','stroke-width':2.4,'stroke-linejoin':'round'},g);for(let r=0;r<rows;r++){const a=pt(.12,r*FL+6),b=pt(.5,r*FL+6);const c=P(x0+w+.18,y0+d-.12*d,r*FL+6),e=P(x0+w+.18,y0+d-.5*d,r*FL+6);el('line',{x1:a[0],y1:a[1],x2:c[0],y2:c[1],stroke:'#1a1420','stroke-width':2},g);poly([a,b,e,c],'rgba(26,20,32,.5)',{stroke:'#1a1420','stroke-width':1.4},g)}}
export function pyramid(g,x0,y0,w,d,z,hh,base){const a=P(x0,y0+d,z),b=P(x0+w,y0+d,z),c=P(x0+w,y0,z),t=P(x0+w/2,y0+d/2,z+hh);poly([a,b,t],shade(base,.66),OUT,g);poly([b,c,t],shade(base,.95),OUT,g)}
export function gable(g,x0,y0,w,d,z,hh,wall,roof){poly([P(x0+w,y0+d,z),P(x0+w,y0,z),P(x0+w,y0+d/2,z+hh)],shade(wall,.93),OUT,g);poly([P(x0,y0+d,z),P(x0+w,y0+d,z),P(x0+w,y0+d/2,z+hh),P(x0,y0+d/2,z+hh)],shade(roof,.85),OUT,g);poly([P(x0,y0+d/2,z+hh),P(x0+w,y0+d/2,z+hh),P(x0+w,y0,z),P(x0,y0,z)],shade(roof,1.1),{opacity:.0},g)}
export function cylinder(g,cx,cy,r,z,h,base,rows){const [x,y]=P(cx,cy,z),rx=r*TW*.7071,ry=r*TH*.7071;
 el('path',{d:`M${x-rx} ${y-h}L${x-rx} ${y}A${rx} ${ry} 0 0 0 ${x+rx} ${y}L${x+rx} ${y-h}Z`,fill:shade(base,.86),stroke:'rgba(25,10,35,.6)','stroke-width':1.2},g);
 el('path',{d:`M${x-rx} ${y-h}L${x-rx} ${y}A${rx} ${ry} 0 0 0 ${x+rx} ${y}L${x+rx} ${y-h}Z`,fill:'url(#cylShade)'},g);
 for(let i=0;i<rows;i++){const yy=y-26-i*FL;el('path',{d:`M${x-rx*.94} ${yy}A${rx*.94} ${ry*.94} 0 0 0 ${x+rx*.94} ${yy}`,fill:'none',stroke:rnd()<.5?'#ffd77a':'#ffe9a8','stroke-width':11,'stroke-dasharray':'15 10','stroke-linecap':'butt'},g)}
 el('ellipse',{cx:x,cy:y-h,rx,ry,fill:shade(base,1.15),stroke:'rgba(25,10,35,.6)','stroke-width':1.2},g);return [x,y-h,rx,ry]}
export function door(g,x0,y0,w,d,u0,u1,hgt,col='#2b1a2a',frame='#e2c46a'){poly([P(x0+w*u0,y0+d,0),P(x0+w*u1,y0+d,0),P(x0+w*u1,y0+d,hgt),P(x0+w*u0,y0+d,hgt)],col,{stroke:frame,'stroke-width':2.4},g)}
export function awning(g,x0,y0,w,d,u0,u1,col,proj=.5){poly([P(x0+w*u0,y0+d,40),P(x0+w*u1,y0+d,40),P(x0+w*u1,y0+d+proj,26),P(x0+w*u0,y0+d+proj,26)],col,OUT,g)}

export const umbrellaXY=(g,x,y,col)=>{const t=sc(g,x,y,1.5);el('ellipse',{cx:3,cy:3,rx:15,ry:6,fill:'#1a0a30',opacity:.22},t);el('rect',{x:-1.2,y:-26,width:2.4,height:26,fill:'#5a3a2a'},t);el('path',{d:'M-17-22L0-34 17-22Q9-17 0-21Q-9-17-17-22Z',fill:col,stroke:'#2a1810','stroke-width':1},t)};
