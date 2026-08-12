import { chromium } from 'playwright';
import fs from 'fs';

const BASE = process.env.BASE || 'http://localhost:5173';
const ROUTES = ['/','/services','/gallery','/about','/reviews','/contact','/brand','/sitemap','/privacy','/terms','/offline','/maintenance','/500','/no-such-page'];
const VIEWPORTS = [
  { w: 320, h: 720, name: '320' },
  { w: 375, h: 812, name: '375' },
  { w: 414, h: 896, name: '414' },
  { w: 768, h: 1024, name: '768' },
  { w: 1024, h: 768, name: '1024' },
  { w: 1280, h: 800, name: '1280' },
  { w: 1440, h: 900, name: '1440' },
];

const browser = await chromium.launch();
const report = [];

for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  const warnings = [];
  const failed = [];
  page.on('console', m => {
    if (m.type() === 'error') errors.push(m.text());
    if (m.type() === 'warning') warnings.push(m.text());
  });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('requestfailed', r => {
    const u = r.url();
    if (!u.includes('cloudfront.net')) failed.push(`${u} :: ${r.failure()?.errorText}`);
  });

  const resp = await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(1400);

  const info = await page.evaluate(() => {
    const de = document.documentElement;
    const imgs = [...document.images];
    return {
      title: document.title,
      h1: [...document.querySelectorAll('h1')].map(h => h.textContent.trim()),
      h1Count: document.querySelectorAll('h1').length,
      canonical: document.querySelector('link[rel=canonical]')?.href || null,
      desc: document.querySelector('meta[name=description]')?.content?.slice(0,80) || null,
      robots: document.querySelector('meta[name=robots]')?.content || null,
      scrollW: de.scrollWidth,
      clientW: de.clientWidth,
      overflow: de.scrollWidth > de.clientWidth + 1,
      imgsTotal: imgs.length,
      imgsBroken: imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.currentSrc || i.src),
      imgsNoAlt: imgs.filter(i => !i.hasAttribute('alt')).length,
      imgsNoDims: imgs.filter(i => !i.getAttribute('width') || !i.getAttribute('height')).length,
      buttonsNoName: [...document.querySelectorAll('button')].filter(b => !b.textContent.trim() && !b.getAttribute('aria-label')).length,
      linksNoName: [...document.querySelectorAll('a')].filter(a => !a.textContent.trim() && !a.getAttribute('aria-label')).length,
      credit: !!document.querySelector('a[href="https://studio.tangison.com"]'),
    };
  });

  const vp = [];
  for (const v of VIEWPORTS) {
    await page.setViewportSize({ width: v.w, height: v.h });
    await page.waitForTimeout(450);
    const m = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    vp.push({ vp: v.name, overflow: m.scrollW > m.clientW + 1, scrollW: m.scrollW, clientW: m.clientW });
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(400);
  const slug = route === '/' ? 'home' : route.replace(/\//g,'').replace(/^$/,'root');
  await page.screenshot({ path: `audit/shots/${slug}-desktop.png`, fullPage: false });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `audit/shots/${slug}-mobile.png`, fullPage: false });

  report.push({ route, status: resp?.status(), ...info, errors, warnings: warnings.slice(0,3), failed, viewports: vp });
  await ctx.close();
}

await browser.close();
fs.writeFileSync('audit/report.json', JSON.stringify(report, null, 1));

let bad = 0;
for (const r of report) {
  const issues = [];
  if (r.errors.length) issues.push(`${r.errors.length} console errors`);
  if (r.failed.length) issues.push(`${r.failed.length} failed requests`);
  if (r.imgsBroken.length) issues.push(`${r.imgsBroken.length} broken images`);
  if (r.imgsNoAlt) issues.push(`${r.imgsNoAlt} imgs no alt`);
  if (r.imgsNoDims) issues.push(`${r.imgsNoDims} imgs no dims`);
  if (r.buttonsNoName) issues.push(`${r.buttonsNoName} unnamed buttons`);
  if (r.linksNoName) issues.push(`${r.linksNoName} unnamed links`);
  if (r.h1Count !== 1) issues.push(`h1 count ${r.h1Count}`);
  if (!r.credit) issues.push('missing credit');
  const ov = r.viewports.filter(v => v.overflow).map(v => v.vp);
  if (ov.length) issues.push(`overflow @ ${ov.join(',')}`);
  if (issues.length) bad++;
  console.log(`${r.route.padEnd(16)} ${String(r.status).padEnd(4)} ${issues.length ? 'ISSUES: ' + issues.join(' | ') : 'clean'}`);
  r.errors.slice(0,3).forEach(e => console.log('     ERR ' + e.slice(0,180)));
  r.failed.slice(0,3).forEach(e => console.log('     REQ ' + e.slice(0,180)));
}
console.log(`\n${report.length - bad}/${report.length} routes clean`);
