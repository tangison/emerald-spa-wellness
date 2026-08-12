# PROOF.md — Emerald Spa & Wellness Centre

Every material action, in order. Format:
Phase | Action | Target | Command or method | Result | Evidence | Timestamp | Status

All timestamps are 2026-08-12, Africa/Windhoek.

## Inspect

| Phase | Action | Target | Command or method | Result | Evidence | Timestamp | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Inspect | Map harness capability | Sandbox | `node -v; npm -v; git --version; python3 -V` | Node 20.20.2, npm 10.8.2, git 2.47.3, Python 3.13.14, 2 cores, 20 GB free | shell output | 03:01 | complete |
| Inspect | Verify GitHub credential | api.github.com/user | authenticated GET | 200, login `tangison` | API response | 03:01 | complete |
| Inspect | Verify Vercel credential | api.vercel.com/v2/user | authenticated GET | 200, user `gemsweb-digital`, team `team_HPpsONetnPZzQqRcX57gaKP2` | API response | 03:01 | complete |
| Inspect | Verify Tavily credential | api.tavily.com/search | POST | 200, live results | API response | 03:01 | complete |
| Inspect | Resolve reference site | wearecolins.com | `getent hosts`, Google DNS resolve API | NXDOMAIN both, `Status: 3`. Site does not exist | shell + DNS API | 03:03 | complete |

## Research and data extraction

| Phase | Action | Target | Command or method | Result | Evidence | Timestamp | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Research | Install Scrapling from primary source | PyPI `scrapling[fetchers]` | `pip install` | 0.4.14 installed with curl_cffi, playwright, browserforge | shell output | 03:02 | complete |
| Research | Scrape venue record | Fresha `awio4ik8` | `Fetcher.get` stealthy | 200, 771,881 bytes | `research/fresha_venue.html` | 03:02 | complete |
| Research | Extract structured payload | `__NEXT_DATA__` | JSON parse | 121,921 byte payload, full venue object | `research/next_data.json` | 03:05 | complete |
| Research | Extract services | Venue payload | Python transform | 13 categories, 90 published treatments, 4 featured | `src/data/services.json` | 03:12 | complete |
| Research | Extract business record | Venue payload | Python transform | Phone, address, coordinates, hours, rating 4.8 of 228, 130 services, 9 attributes, socials | `src/data/business.json` | 03:12 | complete |
| Research | Extract reviews | Venue payload | Python transform | 6 verbatim reviews, distribution 199/23/6/0/0 summing to 228 | `src/data/reviews.json` | 03:12 | complete |
| Research | Extract gallery and team | Venue payload | Python transform | 6 photographs, 6 team records | `src/data/gallery.json`, `team.json` | 03:12 | complete |
| Research | Download authentic media | images.fresha.com | Scrapling fetch | 6 venue photos at 1280x720, 6 avatars at 340x340. 4 portfolio URLs returned 404 and were discarded, not substituted | `assets/original/` | 03:04 | complete |
| Research | Sample brand palette | Supplied logo PNG | Pillow colour histogram | Emerald `#0C4830`, `#188460`, rose gold `#C08460`, cream `#FCF0E4` | shell output | 03:13 | complete |
| Research | Verify hero video | CloudFront URL | `curl -sIL` | HTTP 200, video/mp4, 21,980,883 bytes, accept-ranges | headers | 03:06 | complete |

## Decisions requiring authority

| Phase | Action | Target | Command or method | Result | Evidence | Timestamp | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Decide | Escalate accent conflict | `#5E0ED7` vs emerald brand | asked client | Client chose emerald and rose gold | `BUILD_PLAN.md` assumption 2 | 03:07 | complete |
| Decide | Escalate fabricated metrics | Agency stats on a spa | asked client | Client chose verified Fresha figures | `BUILD_PLAN.md` assumption 3 | 03:07 | complete |

## Build

| Phase | Action | Target | Command or method | Result | Evidence | Timestamp | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Build | Scaffold stack | Vite 5, React 18, Tailwind 3 | `npm i` | framer-motion 13.1.0, lucide-react 1.31.0, react-router-dom 6.30.4 | `package.json` | 03:13 | complete |
| Build | Verify motion API before use | framer-motion | Node import probe | `motion`, `AnimatePresence`, `useReducedMotion` all present | shell output | 03:14 | complete |
| Build | Optimise media | 12 source assets | Pillow, AVIF and WebP | 73 files at 640/960/1280 plus progressive JPEG fallbacks, originals preserved | `public/media/` | 03:08 | complete |
| Build | Author BRAND.md | Design system | written | Palette sampled from logo, motion tokens, contrast rules | `BRAND.md` | 03:15 | complete |
| Build | Hero to exact specification | `src/components/Hero.jsx` | written | Geometry, sizing, weights, tracking, stagger, easing all per spec | `src/components/Hero.jsx` | 03:16 | complete |
| Build | 14 routes | `src/pages/` | written | All approved routes plus 404, 500, offline, maintenance | `src/pages/` | 03:18 | complete |
| Build | Technical files | `public/` | written and generated | robots, sitemap.xml with 10 URLs, manifest, favicon SVG/ICO/PNG/maskable, apple-touch, og-image | `public/` | 03:19 | complete |
| Build | JSON-LD structured data | `index.html` | written | `DaySpa` with real geo, openingHoursSpecification, aggregateRating, ReserveAction | `index.html` | 03:17 | complete |

## Debug and fix, each with the exact failing check rerun

| Phase | Action | Target | Command or method | Result | Evidence | Timestamp | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Debug | Build failure on brand icons | `npm run build` | rollup error | `Instagram` not exported by lucide-react | build log | 03:22 | reproduced |
| Debug | Root cause | lucide-react 1.31.0 | Node export probe | 6069 exports, zero brand icons. v1 removed them | shell output | 03:22 | root cause found |
| Debug | Fix | `SocialIcon.jsx` | inline SVG, no wrong substitute | Instagram and Facebook glyphs shipped locally | `src/components/SocialIcon.jsx` | 03:22 | complete |
| Debug | Rerun exact check | `npm run build` | rebuild | Built in 6.88s, 0 errors | build log | 03:22 | verified |
| Debug | 4 state routes had no h1 | axe and DOM audit | `audit/inspect.mjs` | `/offline`, `/maintenance`, `/500`, 404 reported h1 count 0 | `audit/report.json` | 03:24 | reproduced |
| Debug | Fix | `StateNotice.jsx` | added `headingLevel` prop | Standalone state routes render h1, embedded uses stay h2 | `src/components/StateNotice.jsx` | 03:26 | complete |
| Debug | Rerun exact check | `audit/inspect.mjs` | full 14-route sweep | 14/14 clean | shell output | 03:29 | verified |
| Debug | WhatsApp journey failed | `audit/journeys.mjs` | assertion failure | Test asserted `wa.me` host | shell output | 03:30 | reproduced |
| Debug | Root cause | wa.me redirect | isolated repro script | wa.me 301s to `api.whatsapp.com/send/`. App was correct, test was wrong | shell output | 03:30 | root cause found |
| Debug | Fix and rerun | `audit/journeys.mjs` | corrected assertion to number and body | 28/28 journeys pass | shell output | 03:31 | verified |
| Debug | 9 axe violations | axe-core 14 routes | `audit/a11y.mjs` | 2 `aria-prohibited-attr`, 7 `color-contrast` | shell output | 03:32 | reproduced |
| Debug | Root cause, contrast | Tailwind alpha text | computed minimum alpha per ground | emerald-core needs 75%, ink 60%, cream 55% | shell output | 03:33 | root cause found |
| Debug | Fix, contrast | 11 source files | raised every alpha to measured threshold | All small text at or above 4.5:1 | git diff | 03:33 | complete |
| Debug | Root cause, ARIA | star rows | axe detail | `aria-label` prohibited on generic div | shell output | 03:33 | root cause found |
| Debug | Fix, ARIA | Home and Reviews | added `role="img"` | Star rows announce as labelled graphics | git diff | 03:33 | complete |
| Debug | Residual violation | 11px emerald-bright link | axe detail, 4.39:1 | Violated the project's own 18px rule from BRAND.md | shell output | 03:34 | root cause found |
| Debug | Fix | 6 links plus nav active state | switched to emerald-core at 9.8:1 | Brand rule now enforced everywhere | git diff | 03:34 | complete |
| Debug | Rerun exact check | `audit/a11y.mjs` | axe-core all 14 routes | 0 violations | shell output | 03:35 | verified |
| Debug | 2 lint errors | `npx eslint` | lint run | `fetchpriority` casing, setState in effect | shell output | 03:36 | reproduced |
| Debug | Fix | `Picture.jsx`, `SiteHeader.jsx` | corrected prop casing, removed cascading effect | Menu closes in the click handler instead | git diff | 03:36 | complete |
| Debug | Verify behaviour preserved | mobile menu | `audit/menu.mjs` | Opens, navigates, closes, restores scroll, 0 console errors | shell output | 03:37 | verified |
| Debug | CLS 0.318 on /services | `audit/perf.mjs` | perf run | Fails the 0.1 budget | shell output | 03:37 | reproduced |
| Debug | Root cause | Suspense fallback | layout-shift source attribution | Footer painted at y=614 then jumped to 0 when the lazy chunk resolved | `audit/cls.mjs` output | 03:37 | root cause found |
| Debug | Fix | `App.jsx` | fallback reserves `min-h-screen`, removed invalid nested `main` | CLS 0.318 to 0 | git diff | 03:38 | complete |
| Debug | Rerun exact check | `audit/perf.mjs` | perf run | `/services` CLS 0, `/about` CLS 0 | shell output | 03:38 | verified |
| Debug | Lighthouse 85 on home | Lighthouse | live run | 136 KiB oversized image, LCP 3.5s, TBT 230ms | `audit/lh-home.json` | 03:44 | reproduced |
| Debug | Root cause | Hero poster and reduced-motion image | audit detail | Poster reused the full 1280 gallery JPEG, reduced-motion branch hard-coded AVIF with no fallback | shell output | 03:44 | root cause found |
| Debug | Fix | `Hero.jsx`, `index.html` | dedicated 960w poster at 155 KB, reduced-motion routed through Picture, preload corrected | Deployed | commit 0b91311 | 03:46 | complete |
| Debug | Rerun exact check | Lighthouse home | live run | Performance 85 to 93, CLS 0.001 to 0, TBT 230ms to 90ms | `audit/lh-home2.json` | 03:47 | verified |

## Verification gate

| Phase | Action | Target | Command or method | Result | Evidence | Timestamp | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Verify | Production build | `npm run build` | vite build | Passes, 2247 modules, chunked react/motion/routes | build log | 03:39 | complete |
| Verify | Lint | `npx eslint . --ext js,jsx` | eslint 8 with react, hooks, jsx-a11y | 0 errors, 0 warnings | shell output | 03:39 | complete |
| Verify | Content tests | `node --test tests/` | 13 assertions against the source record | 13/13 pass. Catches drift in identity, address, hours, distribution sum, 90 services, NAD prices, banned agency metrics, placeholders, em dashes | shell output | 03:39 | complete |
| Verify | Route and state sweep | 14 routes | `audit/inspect.mjs` | 14/14 clean: 0 console errors, 0 failed requests, 0 broken images, all images have alt and intrinsic dimensions, exactly one h1, credit present | shell output | 03:39 | complete |
| Verify | Responsive | 320, 375, 414, 768, 1024, 1280, 1440 | scrollWidth vs clientWidth per route | No horizontal overflow at any width on any route | `audit/report.json` | 03:39 | complete |
| Verify | Critical journeys | 6 flows | `audit/journeys.mjs` | 28/28 pass: menu, filter, search, empty state, 5 validation cases, success, reset, lightbox keyboard, reduced motion, skip link | shell output | 03:39 | complete |
| Verify | Reduced motion | `prefers-reduced-motion: reduce` | Playwright emulation | Heading visible, all 3 words present, opacity 1, transform none, video replaced by still, no content stuck at opacity 0 | shell output | 03:39 | complete |
| Verify | Accessibility | axe-core, WCAG 2.1 A and AA | `audit/a11y.mjs` | 0 violations across all 14 routes | shell output | 03:35 | complete |
| Verify | Hero contrast over video | Rendered pixels | luminance sampling | Heading 13.5:1, stats 16.6:1, tagline 14.6:1, CTA 17.6:1 against black text | shell output | 03:28 | complete |
| Verify | Media inspection | og-image | visual review | First render rejected: logo in a cream box, busy sprinkler photo, flat scrim. Rebuilt with transparent mark, candlelit interior, gradient scrim, rose-gold rule | `public/og-image.jpg` | 03:20 | complete |
| Verify | Production bundle | `vite preview` | full sweep against built output | 14/14 routes clean, 28/28 journeys pass | shell output | 03:41 | complete |

## Deploy

| Phase | Action | Target | Command or method | Result | Evidence | Timestamp | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Deploy | Commit | git | `git commit` | `eec7aca`, 140 files | git log | 03:37 | complete |
| Deploy | Create repository | GitHub | REST API | `tangison/emerald-spa-wellness`, public | API response | 03:37 | complete |
| Deploy | Push | GitHub | `git push -u origin main` | main pushed, remote SHA `eec7aca` confirmed via API | API response | 03:38 | complete |
| Deploy | Create project | Vercel | REST API | Git link rejected, account has no GitHub login connection. Created unlinked project `prj_rHEQl3rVlMiPiB2vIXU6Nat25kx1` and deployed the same commit by CLI instead | API response | 03:38 | complete |
| Deploy | Production deploy | Vercel CLI | `vercel deploy --prod` | Ready in 30s, aliased | deploy log | 03:39 | complete |
| Deploy | Optimisation redeploy | Vercel CLI | `vercel deploy --prod` | commit `0b91311` live, ready in 22s | deploy log | 03:46 | complete |

## Live audit

| Phase | Action | Target | Command or method | Result | Evidence | Timestamp | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Live | TLS and security headers | Production URL | `curl -sI` | HTTP/2 200, HSTS 63072000 preload, nosniff, SAMEORIGIN, strict-origin-when-cross-origin, Permissions-Policy | headers | 03:42 | complete |
| Live | All routes | 14 routes | HTTP status sweep | All 200, SPA rewrite correct, no false 404 | shell output | 03:42 | complete |
| Live | Technical files | 8 files | HTTP status and content type | robots text/plain, sitemap application/xml, manifest application/manifest+json, favicon svg and ico, og jpeg, apple-touch and icon png | shell output | 03:42 | complete |
| Live | Route and state sweep | Production | `audit/inspect.mjs` | 14/14 clean | shell output | 03:43 | complete |
| Live | Accessibility | Production | `audit/a11y.mjs` | 0 WCAG 2.1 AA violations on all 14 routes | shell output | 03:43 | complete |
| Live | Critical journeys | Production | `audit/journeys.mjs` | 28/28 pass | shell output | 03:44 | complete |
| Live | Lighthouse `/services` | Production | Lighthouse CLI | Performance 99, Accessibility 100, Best Practices 100, SEO 100, CLS 0 | `audit/lh-services.json` | 03:44 | complete |
| Live | Lighthouse `/` | Production | Lighthouse CLI | Performance 93, Accessibility 100, Best Practices 100, SEO 100, CLS 0, TBT 90ms | `audit/lh-home2.json` | 03:47 | complete |

## Deliverable count reconciliation

| Item | Required | Delivered | Status |
| --- | --- | --- | --- |
| Routes | 14 | 14 | complete |
| Treatment categories | 13 | 13 | complete |
| Published treatments | 90 | 90 | complete |
| Venue photographs | 6 | 6 | complete |
| Team members displayed | 5 of 6 records, 1 excluded as a service account | 5 | complete |
| Verified reviews | 6 | 6 | complete |
| Operational states | 12 | 12 | complete |
| Documentation files | 6 | 6 | complete |
| Content tests | 13 | 13 passing | complete |
| Interaction journeys | 28 | 28 passing | complete |

## Known limitations, stated plainly

1. The landing route carries the client-supplied 22 MB hero video from CloudFront. It is muted,
   `playsInline`, `preload="metadata"`, and poster-backed, so it does not block first paint, and
   the load event fires in about 55 ms locally. The file itself cannot be re-encoded without
   replacing the asset the brief specified.
2. Vercel could not link the GitHub repository automatically because the Vercel account has no
   GitHub login connection. The audited commit is deployed by CLI, and the repository holds the
   identical commit. Connecting GitHub in the Vercel dashboard would enable push-to-deploy.
3. No custom domain was supplied, so the site runs on the Vercel production alias. No DNS record
   was created or modified anywhere.
4. Lighthouse still reports about 68 KiB of theoretical image savings on the landing route, which
   is the hero poster serving at a size chosen to stay sharp on large displays.
