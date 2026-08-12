import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const b=await chromium.launch();
const p=await (await b.newContext({viewport:{width:1280,height:900}})).newPage();
await p.goto('http://localhost:5173/contact',{waitUntil:'networkidle'}); await p.waitForTimeout(1500);
const res=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
for(const v of res.violations) for(const n of v.nodes){
  console.log('TARGET:', n.target);
  console.log('HTML:', n.html.slice(0,220));
  n.any.forEach(a=>console.log('DATA:', JSON.stringify(a.data)));
}
await b.close();
