import { chromium } from 'playwright';
const b=await chromium.launch();
const p=await (await b.newContext({viewport:{width:375,height:812}})).newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:5173/services',{waitUntil:'networkidle'}); await p.waitForTimeout(1200);
await p.getByRole('button',{name:'Open menu'}).click(); await p.waitForTimeout(600);
console.log('menu open:', await p.getByRole('dialog',{name:'Menu'}).isVisible());
await p.getByRole('dialog',{name:'Menu'}).getByRole('link',{name:'Reviews'}).click(); await p.waitForTimeout(1200);
console.log('navigated:', p.url().endsWith('/reviews'));
console.log('menu closed after nav:', await p.getByRole('dialog',{name:'Menu'}).count()===0);
console.log('body scroll restored:', await p.evaluate(()=>document.body.style.overflow===''));
// close button path
await p.getByRole('button',{name:'Open menu'}).click(); await p.waitForTimeout(500);
await p.getByRole('button',{name:'Close menu'}).click(); await p.waitForTimeout(500);
console.log('close button works:', await p.getByRole('dialog',{name:'Menu'}).count()===0);
console.log('console errors:', errs.length, errs.slice(0,2));
await b.close();
