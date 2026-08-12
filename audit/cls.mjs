import { chromium } from 'playwright';
const b=await chromium.launch();
const p=await (await b.newContext({viewport:{width:1280,height:900}})).newPage();
await p.goto('http://localhost:4173/services',{waitUntil:'load'});
const shifts = await p.evaluate(()=>new Promise(res=>{
  const out=[];
  new PerformanceObserver(l=>{
    for(const e of l.getEntries()){
      if(e.hadRecentInput) continue;
      out.push({ value: Math.round(e.value*1000)/1000, time: Math.round(e.startTime),
        sources: (e.sources||[]).map(s=>({
          node: s.node ? (s.node.tagName+'.'+(s.node.className||'').toString().slice(0,60)) : 'unknown',
          prev: s.previousRect ? `${Math.round(s.previousRect.y)},h${Math.round(s.previousRect.height)}` : null,
          cur: s.currentRect ? `${Math.round(s.currentRect.y)},h${Math.round(s.currentRect.height)}` : null,
        }))});
    }
  }).observe({type:'layout-shift',buffered:true});
  setTimeout(()=>res(out),3500);
}));
let total=0;
for(const s of shifts){ total+=s.value; console.log(`t=${s.time}ms shift=${s.value}`); s.sources.forEach(x=>console.log(`    ${x.node}  ${x.prev} -> ${x.cur}`)); }
console.log('TOTAL CLS', Math.round(total*1000)/1000);
await b.close();
