import { chromium } from 'playwright';
const BASE=process.env.BASE||'http://localhost:4173';
const b=await chromium.launch();
for (const route of ['/','/services','/about']) {
  const ctx=await b.newContext({viewport:{width:1280,height:900}});
  const p=await ctx.newPage();
  let bytes=0, reqs=0;
  p.on('response', async r=>{ reqs++; try{ const h=r.headers()['content-length']; if(h) bytes+=parseInt(h);}catch{} });
  const t0=Date.now();
  await p.goto(BASE+route,{waitUntil:'load'});
  const loadMs=Date.now()-t0;
  await p.waitForTimeout(2500);
  const m = await p.evaluate(()=>new Promise(res=>{
    const out={};
    const nav=performance.getEntriesByType('navigation')[0];
    out.domContentLoaded=Math.round(nav.domContentLoadedEventEnd);
    out.loadEvent=Math.round(nav.loadEventEnd);
    const fcp=performance.getEntriesByName('first-contentful-paint')[0];
    out.fcp=fcp?Math.round(fcp.startTime):null;
    new PerformanceObserver(l=>{const e=l.getEntries(); out.lcp=Math.round(e[e.length-1].startTime);}).observe({type:'largest-contentful-paint',buffered:true});
    let cls=0;
    new PerformanceObserver(l=>{for(const e of l.getEntries()) if(!e.hadRecentInput) cls+=e.value;}).observe({type:'layout-shift',buffered:true});
    setTimeout(()=>{out.cls=Math.round(cls*1000)/1000; res(out);},1200);
  }));
  console.log(`${route.padEnd(11)} FCP ${String(m.fcp).padStart(5)}ms  LCP ${String(m.lcp).padStart(5)}ms  CLS ${String(m.cls).padStart(5)}  load ${String(loadMs).padStart(5)}ms  reqs ${reqs}  ~${Math.round(bytes/1024)}KB`);
  await ctx.close();
}
await b.close();
