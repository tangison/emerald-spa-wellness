# BUILD_PLAN.md — Emerald Spa & Wellness Centre

**Mode:** full build (not demo). **Webman phase:** build.
**Art-direction owner:** Hallmark. **Motion owner:** tangison-motion-master.
**Started:** 2026-08-12. **Stack:** React 18, Vite 5, Tailwind 3, Framer Motion, Lucide React, React Router 6.

## Assumptions recorded before writing code

1. **Reference site unreachable.** `wearecolins.com` returns NXDOMAIN from the sandbox resolver
   and from Google Public DNS (`Status: 3`). It could not be inspected. The detailed hero
   specification in the brief is therefore treated as the complete and authoritative design
   reference, since it describes that site's hero directly.
2. **Accent colour.** Escalated to the client because it crossed the brand-direction threshold.
   Client selected emerald and rose gold. `#188460` replaces `#5E0ED7` at all three accent
   positions. *Alternative set aside:* implementing `#5E0ED7` literally sitewide, and the
   hybrid of purple hero with emerald elsewhere. Both were rejected by the client.
3. **Statistics.** Escalated for the same reason. The spec's `+300 CRAFTED BRANDS`,
   `+200 DIGITAL PRODUCTS`, `+100 VENTURES FUNDED` are agency metrics that would be fabricated
   claims for a spa. Client selected verified Fresha figures: `+130 SPA TREATMENTS`,
   `+228 GUEST REVIEWS`, `4.8 GUEST RATING`. The literal agency numbers were rejected.
   The `+` glyph, the separate accent colouring, and the `0.5em` sizing are kept exactly as specified.
   The third stat shows `4.8` with no `+` because a rating cannot carry one.
4. **Nav labels.** The spec's `Story, Expertise, Studios, Feedback` are agency labels. They map
   to the spa's real sections: `Story` to /about, `Expertise` to /services, `Studios` to /gallery,
   `Feedback` to /reviews. Label text is kept verbatim so the hero matches the spec exactly.
5. **Hero tagline and heading.** Kept structurally identical to the spec (three-line tagline,
   three stacked heading words) but written in the spa's own voice, because the agency copy
   ("Crafted Brands", "Ventures Funded") would be a false claim. Heading: `Emerald`, `Calm`,
   `Restored`. Geometry, sizing, and reveal timing are unchanged.
6. **Booking.** The venue has no first-party booking engine and Fresha Pay is disabled. Every
   booking action deep-links to the real Fresha venue URL. No fake checkout is built.
7. **Contact form.** No backend was authorised and no form endpoint exists. The contact route
   ships a real working enquiry form that composes a prefilled WhatsApp or email message to the
   verified number, with full validation, success, and error states. This is simpler than
   standing up an unauthorised server and it actually delivers the message.
8. **No second motion library.** Framer Motion alone covers every motion requirement in the spec.
   Anime.js and GSAP ScrollTrigger were considered and rejected per Ponytail: no measured need.
9. **Team roles.** Two of six team members have a null `jobTitle` in the source record. They are
   rendered with their verified name and rating only. No role is invented for them. The record
   named "Emerald Spa" with role "Hydrotherapy" is a service account in the source data, so it is
   excluded from the team display rather than presented as a person.

## Routes (full mode, all required)

| # | Route | Purpose | Status |
| --- | --- | --- | --- |
| 1 | `/` | Hero to spec, plus editorial, featured treatments, gallery, reviews, visit | done |
| 2 | `/services` | All 90 services across 13 verified categories with real prices | done |
| 3 | `/gallery` | 6 authentic venue photographs, lightbox | done |
| 4 | `/about` | Verified description, attributes, team, hours | done |
| 5 | `/reviews` | 4.8 rating, real distribution, 6 verified reviews | done |
| 6 | `/contact` | Address, map link, hours, working enquiry composer | done |
| 7 | `/brand` | Designed public brand page (mandatory) | done |
| 8 | `/sitemap` | Human-readable sitemap | done |
| 9 | `/privacy` | Privacy policy | done |
| 10 | `/terms` | Terms of service | done |
| 11 | `*` | 404 not found | done |
| 12 | `/500` | Server error surface + runtime ErrorBoundary | done |
| 13 | `/offline` | Offline surface | done |
| 14 | `/maintenance` | Maintenance surface | done |

## Operational states (full mode)

Loading, empty, success, validation error, server failure, timeout, offline, maintenance,
access denied, session expired, 404, 500. Delivered as a shared `StateNotice` system plus the
dedicated routes above, and exercised by the contact composer and the services filter.

## Technical files

`robots.txt`, `sitemap.xml`, `manifest.webmanifest`, favicon set (SVG + ICO + apple-touch),
`og-image`, canonical tags per route, JSON-LD `DaySpa` with real `openingHoursSpecification`,
`geo`, `aggregateRating`, and `Offer` data.

## Verification criteria per slice

Each slice is complete only when: production build passes, no console errors, renders correctly
at 320/375/414/768/1024/1280/1440, reduced-motion path verified, contrast checked, content
matched against `src/data/*.json`, and Hallmark plus Impeccable critique passes are recorded in
`PROOF.md`.

## Deployment

GitHub repo under `tangison`, then Vercel production deploy of that exact commit, then live audit.
