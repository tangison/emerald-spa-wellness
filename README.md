# Emerald Spa & Wellness Centre

Production website for [Emerald Spa & Wellness Centre](https://www.fresha.com/a/emerald-spa-wellness-centre-windhoek-blackett-street-awio4ik8),
No. 7 Blackett Street, Windhoek West, Windhoek, Khomas Region, Namibia.

**Live:** https://emerald-spa-wellness.vercel.app

## Stack

React 18, Vite 5, Tailwind CSS 3, Framer Motion, Lucide React, React Router 6.

## Data provenance

Every fact on this site comes from the venue's own Fresha record `awio4ik8`, retrieved
2026-08-12 with [Scrapling](https://github.com/D4Vinci/Scrapling), and is stored in
`src/data/`. Nothing is invented. `tests/content.test.mjs` fails the build if the shipped
content drifts from that record.

- 130 bookable services, 90 published here across 13 categories
- 6 authentic venue photographs, no stock imagery
- Rated 4.8 from 228 verified reviews

## Commands

```bash
npm install
npm run dev      # dev server on 0.0.0.0:5173
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run lint     # eslint with react, hooks and jsx-a11y
npm test         # content verification tests
```

## Audit scripts

```bash
node audit/inspect.mjs    # 14 routes: console errors, images, headings, 7 viewport widths
node audit/a11y.mjs       # axe-core WCAG 2.1 AA on every route
node audit/journeys.mjs   # 28 interaction journeys including reduced motion
node audit/perf.mjs       # FCP, LCP, CLS
```

Point any of them at production with `BASE=https://emerald-spa-wellness.vercel.app`.

## Verified results

| Check | Result |
| --- | --- |
| Production build | passes |
| ESLint | 0 errors, 0 warnings |
| Content tests | 13/13 |
| Interaction journeys | 28/28 |
| axe-core WCAG 2.1 AA | 0 violations on all 14 routes |
| Console errors | 0 on all routes |
| Horizontal overflow | none at 320, 375, 414, 768, 1024, 1280, 1440 |
| Lighthouse `/services` | 99 performance, 100 accessibility, 100 best practices, 100 SEO |
| Lighthouse `/` | 93 performance, 100 accessibility, 100 best practices, 100 SEO |

## Documentation

`PRODUCT.md`, `BRAND.md`, `BUILD_PLAN.md`, `CONTENT_PLAN.md`, `PROOF.md`.

Made by [Tangison Studio](https://studio.tangison.com).
