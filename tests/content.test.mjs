import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const read = (p) => JSON.parse(fs.readFileSync(path.join('src/data', p), 'utf8'));
const business = read('business.json');
const services = read('services.json');
const reviews = read('reviews.json');
const gallery = read('gallery.json');
const team = read('team.json');

// Ground truth captured from the Fresha venue record awio4ik8 on 2026-08-12.
const TRUTH = {
  name: 'Emerald Spa & Wellness Centre',
  phone: '+264 85 607 7143',
  street: 'Blackett Street',
  unit: 'No. 7',
  suburb: 'Windhoek West',
  city: 'Windhoek',
  region: 'Khomas Region',
  lat: -22.5540581,
  lng: 17.0755901,
  rating: 4.8,
  reviewsTotal: 228,
  serviceCount: 130,
  currency: 'NAD',
  priceMin: 10,
  priceMax: 4500,
  instagram: 'https://www.instagram.com/emerald_spa_and_wellness/',
  facebook: 'https://www.facebook.com/p/Emerald-Spa-and-Wellness-Center-61571981360103/',
};

test('business identity matches the source record exactly', () => {
  assert.equal(business.name, TRUTH.name);
  assert.equal(business.phone, TRUTH.phone);
  assert.equal(business.rating, TRUTH.rating);
  assert.equal(business.reviewsTotal, TRUTH.reviewsTotal);
  assert.equal(business.serviceCount, TRUTH.serviceCount);
  assert.equal(business.currency, TRUTH.currency);
  assert.equal(business.priceMin, TRUTH.priceMin);
  assert.equal(business.priceMax, TRUTH.priceMax);
});

test('address and coordinates match the source record', () => {
  assert.equal(business.address.street, TRUTH.street);
  assert.equal(business.address.unit, TRUTH.unit);
  assert.equal(business.address.suburb, TRUTH.suburb);
  assert.equal(business.address.city, TRUTH.city);
  assert.equal(business.address.region, TRUTH.region);
  assert.equal(business.address.lat, TRUTH.lat);
  assert.equal(business.address.lng, TRUTH.lng);
});

test('social links are the verified ones', () => {
  assert.equal(business.social.instagram, TRUTH.instagram);
  assert.equal(business.social.facebook, TRUTH.facebook);
});

test('opening hours match the source record', () => {
  assert.equal(business.hours.length, 7);
  const weekday = business.hours.filter((h) => h.day !== 'Sunday');
  weekday.forEach((h) => assert.equal(h.value, '9:00 AM - 6:00 PM'));
  const sunday = business.hours.find((h) => h.day === 'Sunday');
  assert.equal(sunday.value, '10:00 AM - 4:00 PM');
});

test('rating distribution sums to the published review total', () => {
  const d = business.ratingDistribution;
  const sum = d.star1 + d.star2 + d.star3 + d.star4 + d.star5;
  assert.equal(sum, TRUTH.reviewsTotal);
});

test('services carry real categories, prices and durations', () => {
  assert.equal(services.categories.length, 13);
  const total = services.categories.reduce((n, c) => n + c.items.length, 0);
  assert.equal(total, 90);
  for (const cat of services.categories) {
    assert.ok(cat.name.length > 0, 'category has a name');
    for (const item of cat.items) {
      assert.ok(item.name.length > 0, `${cat.name} item has a name`);
      assert.ok(/NAD/.test(item.price), `${item.name} price is in NAD: ${item.price}`);
      assert.ok(item.duration && item.duration.length > 0, `${item.name} has a duration`);
    }
  }
});

test('featured treatments are a subset of the real menu', () => {
  assert.equal(services.featured.length, 4);
  services.featured.forEach((f) => assert.ok(/NAD/.test(f.price)));
});

test('reviews are verbatim and carry real ratings and dates', () => {
  assert.equal(reviews.length, 6);
  for (const r of reviews) {
    assert.ok(r.rating >= 1 && r.rating <= 5);
    assert.ok(r.text.length > 0);
    assert.ok(r.author.length > 0);
    assert.ok(!Number.isNaN(Date.parse(r.date)));
  }
});

test('gallery entries have real dimensions and descriptive alt text', () => {
  assert.equal(gallery.length, 6);
  for (const g of gallery) {
    assert.equal(g.width, 1398);
    assert.equal(g.height, 786);
    assert.ok(g.alt.length > 20, `alt text is descriptive: ${g.alt}`);
    assert.ok(g.source.startsWith('https://images.fresha.com/'));
  }
});

test('team members come from the source record with no invented roles', () => {
  assert.equal(team.length, 6);
  for (const t of team) {
    assert.ok(t.name.length > 0);
    assert.ok(typeof t.rating === 'number');
    assert.ok(t.role === null || typeof t.role === 'string');
  }
});

test('no agency placeholder metrics survive anywhere in the source', () => {
  const banned = ['CRAFTED BRANDS', 'DIGITAL PRODUCTS', 'VENTURES FUNDED', 'Fearless', 'Lorem ipsum', '#5E0ED7'];
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
  const files = walk('src').filter((f) => /\.(jsx|js|json|css)$/.test(f));
  for (const f of files) {
    const s = fs.readFileSync(f, 'utf8');
    for (const b of banned) {
      assert.ok(!s.includes(b), `${f} must not contain "${b}"`);
    }
  }
});

test('no placeholder or truncation markers in shipped source', () => {
  const banned = ['TODO', 'FIXME', 'rest of code', 'implement here', 'coming soon', 'Lorem'];
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
  for (const f of walk('src').filter((x) => /\.(jsx|js)$/.test(x))) {
    const s = fs.readFileSync(f, 'utf8');
    for (const b of banned) assert.ok(!s.includes(b), `${f} contains "${b}"`);
  }
});

test('no em dashes in shipped copy', () => {
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
  for (const f of walk('src').filter((x) => /\.(jsx)$/.test(x))) {
    const s = fs.readFileSync(f, 'utf8');
    assert.ok(!s.includes('\u2014'), `${f} contains an em dash`);
  }
});
