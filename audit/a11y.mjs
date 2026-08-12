import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const BASE = process.env.BASE || 'http://localhost:5173';
const ROUTES = ['/','/services','/gallery','/about','/reviews','/contact','/brand','/sitemap','/privacy','/terms','/offline','/maintenance','/500','/no-such-page'];
const b = await chromium.launch();
let total=0;
for (const r of ROUTES){
  const ctx = await b.newContext({viewport:{width:1280,height:900}});
  const p = await ctx.newPage();
  await p.goto(BASE+r,{waitUntil:'networkidle'}); await p.waitForTimeout(1500);
  const res = await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  const v = res.violations;
  total += v.length;
  console.log(`${r.padEnd(15)} violations: ${v.length}`);
  v.forEach(x=>{
    console.log(`   [${x.impact}] ${x.id}: ${x.help}`);
    x.nodes.slice(0,2).forEach(n=>console.log('      '+n.html.slice(0,150)));
  });
  await ctx.close();
}
await b.close();
console.log(`\nTOTAL WCAG 2.1 AA violations: ${total}`);
process.exit(total>0?1:0);
