import { FL, OUT, P, el, poly, shade } from './iso.js';
import { awning, balconies, box, cylinder, door, fireEscape, gable, pilasters, planter, pyramid, shadow, sign, tree, treeXY, truck, umbrella, umbrellaXY, waterTower } from './props.js';

const STYLE={
deco(g,b){const {x0,y0,w,d,h,base}=b,h0=Math.round(h*.5),h1=Math.round(h*.27),h2=Math.round(h*.23);
 box(g,x0,y0,w,d,h0,base,{trim:true,win:true,wo:{cell:.72,wf:.36,vh:30,v0:10}});pilasters(g,x0,y0,w,d,h0,Math.max(3,Math.round(w/.7)));
 box(g,x0+.42,y0+.42,w-.84,d-.84,h1,shade(base,1.05),{z:h0,trim:true,win:true,wo:{cell:.6,wf:.36,vh:30,v0:10}});
 box(g,x0+.85,y0+.85,w-1.7,d-1.7,h2,shade(base,1.1),{z:h0+h1,trim:true,win:true,wo:{cell:.5,wf:.4,vh:26,v0:8,top:10}});
 const t=P(x0+w/2,y0+d/2,h);el('line',{x1:t[0],y1:t[1],x2:t[0],y2:t[1]-54,stroke:'#e2c46a','stroke-width':4},g);el('path',{d:`M${t[0]} ${t[1]-72}l6 18-6 8-6-8Z`,fill:'#ffe27a',stroke:'#8f6a22'},g);
 awning(g,x0,y0,w,d,.3,.7,'#e2c46a',.4);door(g,x0,y0,w,d,.4,.6,32,'#1a1420')},
brown(g,b){const {x0,y0,w,d,h,base}=b,rows=Math.floor(h/FL);
 box(g,x0,y0,w,d,h,base,{trim:false,win:true,wo:{arch:true,wf:.5,vh:24,cell:.8}});
 box(g,x0-.1,y0-.1,w+.2,d+.2,12,shade(base,.9),{z:h,trim:true});
 fireEscape(g,x0,y0,w,d,Math.max(2,rows-1));
 box(g,x0+w*.38,y0+d,w*.24,.55,8,'#c8b8a0',{});door(g,x0,y0,w,d,.4,.6,36,'#3a2018','#c8b8a0');
 awning(g,x0,y0,w,d,.08,.32,b.aw,.4);
 if(b.wt)waterTower(g,x0+w*.55,y0+d*.5,h+12)},
glass(g,b){const {x0,y0,w,d,h,base}=b;
 box(g,x0,y0,w,d,h,base,{trim:true,win:true,wo:{ribbon:true,vh:20,v0:8,glass:true}});
 box(g,x0+.6,y0+.6,w-1.2,d-1.2,FL*1.2,shade(base,1.08),{z:h,trim:true,win:true,wo:{ribbon:true,vh:20,v0:8,glass:true,top:8}});
 const t=P(x0+w/2,y0+d/2,h+FL*1.2);el('ellipse',{cx:t[0],cy:t[1],rx:34,ry:17,fill:'#33404f',stroke:'#f7efe0','stroke-width':2},g);const hx=el('text',{x:t[0],y:t[1]+7,'text-anchor':'middle','font-family':'Josefin Sans','font-weight':700,'font-size':20,fill:'#f7efe0'},g);hx.textContent='H';
 el('line',{x1:t[0]+60,y1:t[1]-6,x2:t[0]+60,y2:t[1]-50,stroke:'#6a7a8a','stroke-width':3},g);el('circle',{cx:t[0]+60,cy:t[1]-52,r:4,fill:'#ff5c7a'},g);
 poly([P(x0+.1,y0+d,0),P(x0+w-.1,y0+d,0),P(x0+w-.1,y0+d,FL),P(x0+.1,y0+d,FL)],'#2a4a6a',{stroke:'#cfe8f4','stroke-width':2},g)},
hotel(g,b){const {x0,y0,w,d,h,base}=b,rows=Math.floor(h/FL);
 box(g,x0,y0,w,d,h,base,{trim:true,win:true,wo:{cell:.8,wf:.5,vh:20,v0:16}});balconies(g,x0,y0,w,d,rows,'L','#efe4cc');
 poly([P(x0+w*.22,y0+d,38),P(x0+w*.78,y0+d,38),P(x0+w*.78,y0+d+.8,28),P(x0+w*.22,y0+d+.8,28)],'#7d1d33',{stroke:'#e2c46a','stroke-width':2.5},g);
 [.26,.74].forEach(u=>{const a=P(x0+w*u,y0+d+.75,0),c=P(x0+w*u,y0+d+.75,28);el('line',{x1:a[0],y1:a[1],x2:c[0],y2:c[1],stroke:'#e2c46a','stroke-width':4},g)});
 door(g,x0,y0,w,d,.42,.58,34,'#2b1a2a');
 const t=P(x0+w/2,y0+d/2,h);el('rect',{x:t[0]-54,y:t[1]-48,width:108,height:32,fill:'#14100f',stroke:'#e2c46a','stroke-width':3},g);const tx=el('text',{x:t[0],y:t[1]-26,'text-anchor':'middle','font-family':'Limelight,serif','font-size':20,fill:'#ffe9a8'},g);tx.textContent='GRAND';
 [-38,38].forEach(o=>el('line',{x1:t[0]+o,y1:t[1]-16,x2:t[0]+o,y2:t[1],stroke:'#6a4a34','stroke-width':3},g))},
clock(g,b){const {x0,y0,w,d,h,base}=b,h0=Math.round(h*.5),h1=Math.round(h*.62),tx0=x0+w*.27,ty0=y0+d*.27,tw=w*.46,td=d*.46;
 box(g,x0,y0,w,d,h0,base,{trim:true,win:true,wo:{arch:true,wf:.5,vh:22,cell:.8}});
 box(g,tx0,ty0,tw,td,h1,shade(base,1.08),{z:h0,trim:true,win:true,wo:{cell:.7,wf:.4,vh:24,v0:10,top:90}});
 const c=P(tx0+tw/2,ty0+td,h0+h1-44),k=el('g',{transform:`matrix(1 .5 0 1 ${c[0]} ${c[1]})`},g);el('circle',{r:26,fill:'#f7efe0',stroke:'#e2c46a','stroke-width':5},k);el('line',{x1:0,y1:0,x2:0,y2:-17,stroke:'#14100f','stroke-width':3},k);el('line',{x1:0,y1:0,x2:11,y2:5,stroke:'#14100f','stroke-width':3},k);
 pyramid(g,tx0-.08,ty0-.08,tw+.16,td+.16,h0+h1,86,'#3f8a80');const t=P(x0+w/2,y0+d/2,h0+h1+86);el('line',{x1:t[0],y1:t[1],x2:t[0],y2:t[1]-26,stroke:'#e2c46a','stroke-width':3},g);
 door(g,x0,y0,w,d,.42,.58,34);awning(g,x0,y0,w,d,.1,.35,b.aw,.4)},
loft(g,b){const {x0,y0,w,d,h,base}=b;
 box(g,x0,y0,w,d,h,base,{win:true,wo:{arch:true,cell:1.0,wf:.72,vh:36,v0:14,step:h}});
 box(g,x0,y0,w,d,0,base,{});gable(g,x0-.05,y0-.05,w+.1,d+.1,h,44,base,'#7a3a30');
 box(g,x0+w*.62,y0+d*.2,.38,.38,56,'#6a3a30',{z:h-4});
 door(g,x0,y0,w,d,.38,.62,38,'#3a2018','#d9c9a0');awning(g,x0,y0,w,d,.7,.95,b.aw,.35)},
apt(g,b){const {x0,y0,w,d,h,base}=b,rows=Math.floor(h/FL);
 box(g,x0,y0,w,d,h,base,{trim:true,win:true,wo:{cell:.8,wf:.46,vh:20,v0:16}});balconies(g,x0,y0,w,d,rows,'L','#f1e6cf');balconies(g,x0,y0,w,d,rows,'R','#f1e6cf');
 const T=[P(x0+.3,y0+.3,h),P(x0+w-.3,y0+.3,h),P(x0+w-.3,y0+d-.3,h),P(x0+.3,y0+d-.3,h)];poly(T,'#6fb86a',{stroke:'#4f9a52','stroke-width':1.5},g);
 [[.9,.8],[w-.9,.9],[w*.5,d-.9]].forEach(([a,c])=>{const q=P(x0+a,y0+c,h);treeXY(g,q[0],q[1],1.05)});
 door(g,x0,y0,w,d,.4,.6,34,'#2b1a2a','#f1e6cf');awning(g,x0,y0,w,d,.25,.75,b.aw,.45)},
dome(g,b){const {x0,y0,w,d,h,base}=b,h0=FL*2,r=Math.min(w,d)*.36;
 box(g,x0,y0,w,d,h0,base,{trim:true,win:true,wo:{arch:true,cell:.8,wf:.5,vh:22}});
 const [x,y,rx,ry]=cylinder(g,x0+w/2,y0+d/2,r,h0,h-h0,shade(base,1.04),Math.max(1,Math.floor((h-h0)/FL)));
 const hd=Math.min(rx*.85,70);el('path',{d:`M${x-rx*.94} ${y}A${rx*.94} ${hd} 0 0 1 ${x+rx*.94} ${y}Z`,fill:'#d9b24a',stroke:'#8f6a22','stroke-width':2},g);el('path',{d:`M${x-rx*.5} ${y-hd*.78}A${rx*.5} ${hd*.4} 0 0 1 ${x+rx*.3} ${y-hd*.9}`,fill:'none',stroke:'#fff3b0','stroke-width':4,opacity:.7},g);
 el('line',{x1:x,y1:y-hd,x2:x,y2:y-hd-28,stroke:'#8f6a22','stroke-width':3},g);el('circle',{cx:x,cy:y-hd-30,r:5,fill:'#ffe27a'},g);
 door(g,x0,y0,w,d,.42,.58,34);awning(g,x0,y0,w,d,.2,.8,b.aw,.45)}
,
shop(g,b){const {x0,y0,w,d,h,base}=b,names=['BAKERY','BOOKS','FLOWERS','PIZZA','RECORDS','TEA'],nm=names[Math.abs(Math.floor(x0*7+y0*3))%6];
 box(g,x0,y0,w,d,h,base,{win:true,wo:{cell:1.0,wf:.72,vh:26,v0:12,top:10}});box(g,x0-.06,y0-.06,w+.12,d+.12,9,shade(base,.9),{z:h,trim:true});
 const n=6;for(let i=0;i<n;i++){const a=.06+.88*i/n,c=.06+.88*(i+1)/n;poly([P(x0+w*a,y0+d,42),P(x0+w*c,y0+d,42),P(x0+w*c,y0+d+.5,28),P(x0+w*a,y0+d+.5,28)],i%2?'#f7efe0':b.aw,OUT,g)}
 const t=P(x0+w/2,y0+d/2,h+9);el('rect',{x:t[0]-48,y:t[1]-44,width:96,height:28,fill:'#14100f',stroke:b.aw,'stroke-width':3},g);const tx=el('text',{x:t[0],y:t[1]-24,'text-anchor':'middle','font-family':'Limelight,serif','font-size':17,fill:'#ffe9a8'},g);tx.textContent=nm;
 [-30,30].forEach(o=>el('line',{x1:t[0]+o,y1:t[1]-16,x2:t[0]+o,y2:t[1],stroke:'#6a4a34','stroke-width':3},g))},
townhouse(g,b){const {x0,y0,w,d,h,base}=b;
 box(g,x0,y0,w,d,h,base,{trim:true,win:true,wo:{arch:true,wf:.46,vh:24,cell:.8}});
 pyramid(g,x0-.12,y0-.12,w+.24,d+.24,h,64,'#5a4a7a');box(g,x0+w*.62,y0+d*.2,.34,.34,46,'#7a4a3a',{z:h-2});
 const q=P(x0+w*.3,y0+d*.82,h+8);poly([[q[0]-14,q[1]+14],[q[0]+14,q[1]+14],[q[0]+14,q[1]-6],[q[0],q[1]-20],[q[0]-14,q[1]-6]],'#e8d8c0',OUT,g);poly([[q[0]-8,q[1]+10],[q[0]+8,q[1]+10],[q[0]+8,q[1]-4],[q[0]-8,q[1]-4]],'#ffd77a',{stroke:'#2a1a30'},g);
 door(g,x0,y0,w,d,.4,.6,36,'#3a2018','#f7efe0');box(g,x0+w*.36,y0+d,w*.28,.4,7,'#d8c8b0',{})},
cafebox(g,b){const {x0,y0,w,d,h,base}=b;
 box(g,x0,y0,w,d,h,base,{win:true,wo:{glass:true,cell:1.1,wf:.8,vh:30,v0:8,top:4,skipG:false}});
 pyramid(g,x0-.15,y0-.15,w+.3,d+.3,h,48,b.aw);
 [[.25,'#d9435f'],[.75,'#2f8f8a']].forEach(([u,c])=>{const q=P(x0+w*u,y0+d+.9,0);umbrellaXY(g,q[0],q[1],c)});
 const t=P(x0+w/2,y0+d/2,h+48);el('line',{x1:t[0],y1:t[1],x2:t[0],y2:t[1]-22,stroke:'#6a4a34','stroke-width':3},g);el('path',{d:`M${t[0]} ${t[1]-22}l22 7-22 7Z`,fill:'#ffd96a',stroke:'#14100f'},g)}
,
bank(g,b){const {x0,y0,w,d,h,base}=b,hc=Math.round(h*.68),z0=9;
 box(g,x0,y0,w,d,h,base,{trim:true,win:true,wo:{cell:1.0,wf:.4,vh:26,v0:14}});
 box(g,x0+.08,y0+d,w-.16,.62,z0,shade(base,1.12),{});
 for(let i=0;i<5;i++){const u=.12+.76*i/4;box(g,x0+w*u-.08,y0+d+.22,.17,.17,hc,'#f4eee0',{z:z0})}
 box(g,x0+.04,y0+d+.1,w-.08,.7,12,shade(base,1.14),{z:z0+hc,trim:true});
 const zz=z0+hc+12;poly([P(x0+.04,y0+d+.8,zz),P(x0+w-.04,y0+d+.8,zz),P(x0+w/2,y0+d+.8,zz+34)],shade(base,1.08),{stroke:'#e2c46a','stroke-width':2.5},g);
 door(g,x0,y0,w,d,.44,.56,hc*.8,'#2b1a2a','#e2c46a');
 const t=P(x0+w/2,y0+d+.8,zz+12);const tx=el('text',{x:t[0],y:t[1],'text-anchor':'middle','font-family':'Limelight,serif','font-size':12,fill:'#8f6a22'},g);tx.textContent='BANK';
 box(g,x0+w*.3,y0+d*.3,w*.4,d*.4,18,shade(base,1.1),{z:h,trim:true})},
theater(g,b){const {x0,y0,w,d,h,base}=b;
 box(g,x0,y0,w,d,h,base,{trim:true,win:true,wo:{cell:1.0,wf:.34,vh:22,v0:14,top:50}});
 box(g,x0+.25,y0+.25,w*.55,d*.6,FL*1.3,shade(base,.9),{z:h,trim:true});
 [[.16,'#ffd96a'],[.40,'#ff8fb1'],[.64,'#9ad0e8']].forEach(([u,c])=>poly([P(x0+w*u,y0+d,h-8),P(x0+w*(u+.2),y0+d,h-8),P(x0+w*(u+.2),y0+d,h-62),P(x0+w*u,y0+d,h-62)],c,{stroke:'#14100f','stroke-width':2},g));
 box(g,x0+w*.1,y0+d,w*.8,.6,14,'#14100f',{z:34,trim:true});
 for(let i=0;i<=10;i++){const q=P(x0+w*(.1+.8*i/10),y0+d+.6,56);el('circle',{cx:q[0],cy:q[1],r:3.2,fill:'#fff2a8',stroke:'#c9a24a','stroke-width':.8},g)}
 door(g,x0,y0,w,d,.42,.58,32,'#2b1a2a','#ffd96a');
 const c=P(x0,y0+d,h*.5),k=el('g',{transform:`translate(${c[0]-20},${c[1]})`},g);el('rect',{x:-13,y:-72,width:26,height:116,fill:'#14100f',stroke:'#ff9ab8','stroke-width':3},k);const tt=el('text',{transform:'rotate(-90)',x:0,y:7,'text-anchor':'middle','font-family':'Limelight,serif','font-size':19,fill:'#ff9ab8'},k);tt.textContent='THEATRE'},
diner(g,b){const {x0,y0,w,d,h,base}=b;
 box(g,x0,y0,w,d,h,'#cfd6dc',{win:true,wo:{glass:true,cell:1.0,wf:.82,vh:24,v0:8,top:2,skipG:false}});
 poly([P(x0,y0+d,22),P(x0+w,y0+d,22),P(x0+w,y0+d,32),P(x0,y0+d,32)],'#d9435f',OUT,g);poly([P(x0+w,y0+d,22),P(x0+w,y0,22),P(x0+w,y0,32),P(x0+w,y0+d,32)],'#b02f48',OUT,g);
 box(g,x0-.1,y0-.1,w+.2,d+.2,8,'#e8ecf0',{z:h,trim:true});
 for(let i=0;i<8;i++){const a=.04+.92*i/8,c=.04+.92*(i+1)/8;poly([P(x0+w*a,y0+d,0),P(x0+w*c,y0+d,0),P(x0+w*c,y0+d,6),P(x0+w*a,y0+d,6)],i%2?'#14100f':'#f7efe0',{},g)}
 const t=P(x0+w*.8,y0+d*.4,h+8);el('line',{x1:t[0],y1:t[1],x2:t[0],y2:t[1]-44,stroke:'#6a7a8a','stroke-width':4},g);
 el('path',{d:`M${t[0]-44} ${t[1]-72}h60l22 16-22 16h-60Z`,fill:'#14100f',stroke:'#ff5c7a','stroke-width':3},g);const tx=el('text',{x:t[0]-14,y:t[1]-48,'text-anchor':'middle','font-family':'Limelight,serif','font-size':20,fill:'#ff8fa8'},g);tx.textContent='EATS'}
};
export function drawBuilding(g,b){shadow(g,b.x0,b.y0,b.w,b.d,b.h);STYLE[b.style](g,b);if(b.sign)sign(g,b.x0,b.y0,b.w,b.d,b.h,b.sign)}
export function plaza(g,x0,y0,w,d,kind){
 poly([P(x0,y0),P(x0+w,y0),P(x0+w,y0+d),P(x0,y0+d)],'#e2c6c8',{stroke:'#c9a24a','stroke-width':2},g);
 for(let i=1;i<4;i++){const t=i/4;[[P(x0+w*t,y0),P(x0+w*t,y0+d)],[P(x0,y0+d*t),P(x0+w,y0+d*t)]].forEach(([a,b])=>el('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:'#c9a0a8','stroke-width':1.2},g))}
 const cx=x0+w/2,cy=y0+d/2,o=[];
 if(kind=='park'){poly([P(x0+.25,y0+.25),P(x0+w-.25,y0+.25),P(x0+w-.25,y0+d-.25),P(x0+.25,y0+d-.25)],'#6fb86a',{stroke:'#4f9a52','stroke-width':1.5},g);
  o.push([cx,cy,()=>{const c=P(cx,cy);el('ellipse',{cx:c[0],cy:c[1]+4,rx:58,ry:29,fill:'#f1e6cf',stroke:'#c9a24a','stroke-width':3},g);el('ellipse',{cx:c[0],cy:c[1],rx:44,ry:22,fill:'#7fc4d8'},g);el('ellipse',{cx:c[0],cy:c[1]-10,rx:11,ry:5.5,fill:'#f1e6cf'},g);el('rect',{x:c[0]-3,y:c[1]-40,width:6,height:30,fill:'#bfe6f2',opacity:.9},g)}]);
  [[.55,.55],[w-.55,.55],[.55,d-.55],[w-.55,d-.55]].forEach(([a,b])=>o.push([x0+a,y0+b,()=>tree(g,x0+a,y0+b)]));
 }else if(kind=='truck'){o.push([x0+.5,y0+d-1.1,()=>truck(g,x0+.5,y0+d-1.25,'#e0566e')]);o.push([x0+w-.8,y0+.9,()=>umbrella(g,x0+w-.8,y0+.9,'#2f8f8a')]);o.push([x0+w-.9,y0+d-.7,()=>umbrella(g,x0+w-.9,y0+d-.7,'#d9435f')]);o.push([x0+.5,y0+.5,()=>tree(g,x0+.5,y0+.5)]);o.push([x0+w-.4,y0+d-.3,()=>planter(g,x0+w-.55,y0+d-.65)])}
 else{[[.9,.9,'#d9435f'],[w-.9,.9,'#2f8f8a'],[.9,d-.9,'#f0a83a'],[w-.9,d-.9,'#d9435f']].forEach(([a,b,c])=>o.push([x0+a,y0+b,()=>umbrella(g,x0+a,y0+b,c)]));o.push([cx,cy,()=>planter(g,cx-.25,cy-.25)])}
 o.sort((a,b)=>a[0]+a[1]-(b[0]+b[1])).forEach(k=>k[2]())}

export const STY=['deco','brown','glass','hotel','clock','townhouse','apt','dome','bank','theater'];
export const PAL={bank:['#e8e0d0','#d8d0c0','#e0d4c4'],theater:['#7d2a45','#3a3a6a','#5a2a6a'],diner:['#cfd6dc'],shop:['#e9a8b8','#a8d0c8','#f0c878','#9ab8e0'],townhouse:['#e8a0a8','#a0c8e8','#e8d090','#b8a0d8'],cafebox:['#f1e6cf','#9ad0c8','#f0d8b0'],deco:['#d8c9a0','#5a8f8a','#8a6aa0'],brown:['#a0523d','#8a4a3a','#b5694a'],glass:['#4a7fa8','#3f8f9a','#5a6fa8'],hotel:['#c9a878','#e0c9a0','#b8896a'],clock:['#8f7a9a','#a88a6a','#7a8aa8'],loft:['#9a5a45','#7a4a3a','#a86a50'],apt:['#d98a6a','#e0a86a','#6fb0a0'],dome:['#d8d0c0','#c9b8d8','#e0c8b0']};
export const FLR={bank:[3,4],theater:[4,5],diner:[1,1],shop:[2,2],townhouse:[3,3],cafebox:[1,1],deco:[5,7],brown:[4,5],glass:[6,8],hotel:[4,5],clock:[5,6],loft:[3,3],apt:[4,6],dome:[4,5]};
