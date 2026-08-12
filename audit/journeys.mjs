import { chromium } from 'playwright';
const BASE = process.env.BASE || 'http://localhost:5173';
const b = await chromium.launch();
const pass=[], fail=[];
const ok=(c,n)=> c?pass.push(n):fail.push(n);

// 1. Mobile menu open/close/navigate
{
  const p = await (await b.newContext({viewport:{width:375,height:812}})).newPage();
  await p.goto(BASE+'/', {waitUntil:'networkidle'}); await p.waitForTimeout(1500);
  await p.getByRole('button',{name:'Open menu'}).click(); await p.waitForTimeout(600);
  ok(await p.getByRole('dialog',{name:'Menu'}).isVisible(), 'hero mobile menu opens');
  ok(await p.getByRole('link',{name:'Expertise'}).isVisible(), 'hero menu shows nav links');
  await p.getByRole('link',{name:'Expertise'}).click(); await p.waitForTimeout(1200);
  ok(p.url().endsWith('/services'), 'hero menu navigates to /services');
  ok((await p.locator('h1').textContent()).includes('full treatment menu'), 'services h1 correct');
  await p.close();
}
// 2. Services filter + search + empty state
{
  const p = await (await b.newContext({viewport:{width:1280,height:900}})).newPage();
  await p.goto(BASE+'/services', {waitUntil:'networkidle'}); await p.waitForTimeout(900);
  const all = (await p.locator('[role=status]').textContent()).trim();
  ok(all.startsWith('90'), `all treatments = 90 (got "${all}")`);
  await p.getByRole('button',{name:'Hydrotherapy'}).click(); await p.waitForTimeout(500);
  const hy = (await p.locator('[role=status]').textContent()).trim();
  ok(/^\d+ treatments? shown/.test(hy) && !hy.startsWith('90'), `filter narrows (got "${hy}")`);
  await p.getByRole('button',{name:'All'}).click();
  await p.getByLabel('Search treatments').fill('massage'); await p.waitForTimeout(500);
  const ms = (await p.locator('[role=status]').textContent()).trim();
  ok(!ms.startsWith('90') && !ms.startsWith('0'), `search returns subset (got "${ms}")`);
  await p.getByLabel('Search treatments').fill('zzzznotreal'); await p.waitForTimeout(500);
  ok(await p.getByText('No treatments match that search').isVisible(), 'empty state renders');
  await p.getByRole('button',{name:'Clear search'}).click(); await p.waitForTimeout(500);
  ok((await p.locator('[role=status]').textContent()).trim().startsWith('90'), 'clear restores 90');
  await p.close();
}
// 3. Contact form validation + success
{
  const p = await (await b.newContext({viewport:{width:1280,height:900}})).newPage();
  await p.goto(BASE+'/contact', {waitUntil:'networkidle'}); await p.waitForTimeout(900);
  await p.getByRole('button',{name:/Send on WhatsApp/}).click(); await p.waitForTimeout(400);
  ok(await p.getByText('Please enter your name.').isVisible(), 'validation: name required');
  ok(await p.getByText('Please enter a phone number or email address.').isVisible(), 'validation: contact required');
  ok(await p.getByText('Please tell us what you would like to book.').isVisible(), 'validation: message required');
  await p.locator('#field-name').fill('Test Guest');
  await p.locator('#field-contact').fill('not-valid!!');
  await p.locator('#field-message').fill('short');
  await p.getByRole('button',{name:/Send on WhatsApp/}).click(); await p.waitForTimeout(400);
  ok(await p.getByText('Enter a valid phone number or email address.').isVisible(), 'validation: bad contact format');
  ok(await p.getByText('Please add a little more detail.').isVisible(), 'validation: message too short');
  await p.locator('#field-contact').fill('081 234 5678');
  await p.locator('#field-message').fill('I would like a Swedish massage on Friday afternoon please.');
  const [popup] = await Promise.all([
    p.waitForEvent('popup').catch(()=>null),
    p.getByRole('button',{name:/Send on WhatsApp/}).click(),
  ]);
  await p.waitForTimeout(800);
  ok(await p.getByText('Your message is ready').isVisible(), 'success state renders');
  if (popup){
    // wa.me 301-redirects to api.whatsapp.com/send/?phone=... so assert on the number
    // and the prefilled body, both of which survive the redirect.
    // query-string encoding uses + for spaces, which decodeURIComponent does not convert
    const u = decodeURIComponent(popup.url()).replace(/\+/g, ' ');
    ok(u.includes('264856077143'), 'whatsapp deeplink targets the verified number');
    ok(u.includes('Enquiry from Test Guest') && u.includes('Swedish massage'), 'whatsapp message prefilled');
    await popup.close();
  }
  await p.getByRole('button',{name:'Send another'}).click(); await p.waitForTimeout(400);
  ok(await p.locator('#field-name').isVisible() && (await p.locator('#field-name').inputValue())==='', 'form resets');
  await p.close();
}
// 4. Gallery lightbox + keyboard
{
  const p = await (await b.newContext({viewport:{width:1280,height:900}})).newPage();
  await p.goto(BASE+'/gallery', {waitUntil:'networkidle'}); await p.waitForTimeout(900);
  await p.getByRole('button',{name:/View larger/}).first().click(); await p.waitForTimeout(600);
  ok(await p.getByRole('dialog').isVisible(), 'lightbox opens');
  const first = await p.getByRole('dialog').textContent();
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(500);
  ok((await p.getByRole('dialog').textContent()) !== first, 'arrow key advances image');
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  ok(await p.getByRole('dialog').count()===0, 'escape closes lightbox');
  await p.close();
}
// 5. Reduced motion: content visible, no displacement
{
  const p = await (await b.newContext({viewport:{width:1280,height:900}, reducedMotion:'reduce'})).newPage();
  await p.goto(BASE+'/', {waitUntil:'networkidle'}); await p.waitForTimeout(1800);
  const h1 = p.locator('h1');
  ok(await h1.isVisible(), 'reduced-motion: hero heading visible');
  const box = await h1.boundingBox();
  const words = await p.locator('h1 span span').count();
  ok(words===3, 'reduced-motion: all 3 heading words present');
  const op = await p.locator('h1 span span').first().evaluate(e=>getComputedStyle(e).opacity);
  ok(op==='1', `reduced-motion: word opacity 1 (got ${op})`);
  const tf = await p.locator('h1 span span').first().evaluate(e=>getComputedStyle(e).transform);
  ok(tf==='none'||/matrix\(1, 0, 0, 1, 0, 0\)/.test(tf), `reduced-motion: no residual transform (got ${tf})`);
  ok(await p.locator('video').count()===0, 'reduced-motion: video replaced by poster image');
  ok(await p.locator('img[src*="serenity-garden"]').first().isVisible(), 'reduced-motion: poster image shown');
  await p.goto(BASE+'/about', {waitUntil:'networkidle'}); await p.waitForTimeout(1500);
  const hidden = await p.evaluate(()=>[...document.querySelectorAll('section h2, section p')].filter(e=>getComputedStyle(e).opacity==='0').length);
  ok(hidden===0, `reduced-motion: no content stuck at opacity 0 (found ${hidden})`);
  await p.close();
}
// 6. Keyboard accessibility: skip link
{
  const p = await (await b.newContext({viewport:{width:1280,height:900}})).newPage();
  await p.goto(BASE+'/services', {waitUntil:'networkidle'}); await p.waitForTimeout(800);
  await p.keyboard.press('Tab'); await p.waitForTimeout(300);
  const f = await p.evaluate(()=>document.activeElement.textContent);
  ok(/Skip to content/i.test(f||''), `skip link first in tab order (got "${f}")`);
  await p.close();
}
await b.close();
console.log('PASS ('+pass.length+')'); pass.forEach(x=>console.log('  ok  '+x));
if(fail.length){ console.log('FAIL ('+fail.length+')'); fail.forEach(x=>console.log('  XX  '+x)); process.exit(1);}
else console.log('\nAll journeys passed.');
