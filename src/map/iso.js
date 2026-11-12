export const NS='http://www.w3.org/2000/svg';
export const el=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};
let seed=21;export const seedRandom=n=>{seed=n};
export const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
export const TW=120,TH=60,OX=1200,OY=-90,FL=34,WW=2400,WH=1500;
export const P=(gx,gy,h=0)=>[OX+(gx-gy)*TW/2,OY+(gx+gy)*TH/2-h];
export const pts=a=>a.map(p=>p.join(',')).join(' ');
export const shade=(hex,f)=>{const n=parseInt(hex.slice(1),16);const c=[n>>16,(n>>8)&255,n&255].map(v=>Math.max(0,Math.min(255,Math.round(v*f))));return '#'+c.map(v=>v.toString(16).padStart(2,'0')).join('')};
export const poly=(p,fill,extra={},par)=>el('polygon',{points:pts(p),fill,...extra},par);
export const OUT={stroke:'rgba(25,10,35,.6)','stroke-width':1.2};
export const inView=(gx,gy,m=100)=>{const q=P(gx,gy);return q[0]>-m&&q[0]<WW+m&&q[1]>-m-100&&q[1]<WH+m};
export const m6=i=>((i%6)+6)%6,isSt=i=>m6(i)>=4,G0=-14,G1=42;

