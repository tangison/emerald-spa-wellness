import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:900} })).newPage();
await p.goto('http://localhost:5173/', { waitUntil:'networkidle' });
await p.waitForTimeout(3000);
const buf = await p.screenshot();
const { PNG } = await import('pngjs');
const png = PNG.sync.read(buf);
function lum(x,y){ const i=(png.width*y+x)<<2; const c=[png.data[i],png.data[i+1],png.data[i+2]].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)}); return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2];}
// regions behind key text
const regions={ heading:[760,520,1400,860], stats:[960,180,1400,290], tagline:[40,400,330,470], cta:[1130,410,1400,455] };
for(const [name,[x0,y0,x1,y1]] of Object.entries(regions)){
  let min=1,max=0,sum=0,n=0;
  for(let y=y0;y<y1;y+=3) for(let x=x0;x<x1;x+=3){ const l=lum(x,y); min=Math.min(min,l); max=Math.max(max,l); sum+=l; n++; }
  const avg=sum/n;
  const cr=(L)=>((Math.max(L,0)+0.05)/(Math.min(L,0)+0.05));
  // black text (L=0) contrast vs background luminance
  console.log(name.padEnd(9), 'avgL',avg.toFixed(3),'minL',min.toFixed(3),'| black-text CR: avg',((avg+0.05)/0.05).toFixed(2),'worst',((min+0.05)/0.05).toFixed(2));
}
await b.close();
