# BRAND.md — Emerald Spa & Wellness Centre

Art-direction owner: **Hallmark** (structural anti-slop gate and final design audit).
Taste applies to the landing surface only. Impeccable owns responsive hardening and polish.
tangison-widget-master governs pattern choice. tangison-motion-master governs all motion.

## 1. Brand truth

Every fact below is scraped from the live Fresha venue record `awio4ik8` on 2026-08-12.
Nothing here is invented. Source of record: `src/data/business.json`.

| Field | Verified value |
| --- | --- |
| Trading name | Emerald Spa & Wellness Centre |
| Category | Spa and Wellness Centre (primary type: Massage) |
| Address | Blackett Street, No. 7, Windhoek West, Windhoek, Khomas Region, Namibia |
| Coordinates | -22.5540581, 17.0755901 |
| Phone | +264 85 607 7143 |
| Rating | 4.8 from 228 reviews |
| Services | 130 bookable services, 90 published on this site across 13 categories |
| Price range | NAD 10 to NAD 4,500 |
| Hours | Mon to Sat 09:00 to 18:00, Sun 10:00 to 16:00 |
| Instagram | @emerald_spa_and_wellness |
| Facebook | Emerald Spa and Wellness Center |
| Booking | Fresha (isBookable: true, Fresha Pay disabled) |
| Attributes | Woman-owned, Indigenous-owned, environmentally friendly, kid-friendly, parking, near public transport, showers, lockers, bath towels |

## 2. Colour system

Sampled directly from the supplied logo artwork, not guessed.

| Token | Hex | Sampled from | Role |
| --- | --- | --- | --- |
| `emerald.deep` | `#03291B` | gem shadow facets | page ground, footer, nav scrim |
| `emerald.core` | `#0C4830` | dominant gem body | primary accent, headings on light |
| `emerald.mid` | `#0F6244` | mid facets | hover and active states |
| `emerald.bright` | `#188460` | lit facets | the accent token, logo dot, stat glyphs, CTA text |
| `emerald.light` | `#3CA884` | crown highlight | focus rings, small emphasis |
| `emerald.mist` | `#DCEBE2` | derived tint | quiet section grounds |
| `rose.gold` | `#C08460` | orbital ring | secondary accent, rules, numerals |
| `rose.deep` | `#9C6048` | ring shadow | rose-gold text on cream |
| `cream` | `#FCF0E4` | ring highlight | warm paper ground |
| `ink` | `#0A0A0A` | — | body text |

**Accent decision (authorised by the client, 2026-08-12).** The supplied hero specification
fixed the accent at `#5E0ED7`. That purple contradicts the real emerald and rose-gold logo,
and a purple default is explicitly on the anti-slop reject list. The client selected the
brand-true option, so `emerald.bright #188460` is the accent everywhere the spec said
`#5E0ED7`: the logo dot, the stat glyphs, and the CTA link text. Every other hero
instruction (geometry, sizing, weights, tracking, stagger, easing, breakpoints) is
implemented exactly as written. The alternative set aside is recorded in `BUILD_PLAN.md`.

Contrast: `emerald.core` on `cream` is 9.8:1. `ink` on `cream` is 18.4:1. `emerald.bright`
on white is 4.04:1, so it is used at 18px semibold or larger only, which clears WCAG AA for
large text. Small emerald text uses `emerald.core`.

## 3. Typography

- **Inter Variable**, self-hosted through `@fontsource-variable/inter`. No external font CDN,
  so the sandboxed preview and the deployed site render identically.
- **Cormorant Garamond** for the display voice on editorial surfaces only. The hero uses Inter
  exactly as the specification requires.
- Hero and navigation text: uppercase, `tracking-widest`, weight 600.
- Body copy: sentence case, weight 400, 16px minimum, measure capped at 68 characters.
- Scale is fluid via `clamp()`. The hero heading is `clamp(2rem, 9vw, 9rem)` at `line-height 0.88`
  and the stat numerals are `clamp(1.5rem, 5vw, 3.5rem)`, both per the specification.

## 4. Motion system (tangison-motion-master)

**Purpose.** Motion signals arrival and hierarchy in a calm retreat. It never competes with the
content. One primary engine only: Framer Motion. No Anime.js, no GSAP, no ScrollTrigger. Ponytail
rejects a second runtime animation library when a measured need does not exist, and here it does not.

**Hierarchy.**
1. Hero entrance is the single loudest moment on the site.
2. Section reveals are quiet: 24px rise, one shot, `viewport once`.
3. Interaction feedback is immediate and under 200ms.

**Timing and easing.**

| Token | Duration | Easing | Applied to |
| --- | --- | --- | --- |
| `fadeDown` | 0.5s, delay `i * 0.1s` | `[0.22, 1, 0.36, 1]` | nav logo, 4 nav links, hamburger |
| `fadeUp` | 0.6s, delay `i * 0.12s` | `[0.22, 1, 0.36, 1]` | stats, tagline, CTA, description |
| `headingReveal` | 0.7s, delay `0.4 + i * 0.14s` | `[0.22, 1, 0.36, 1]` | 3 hero words, clip reveal from `y: 110%` |
| `sectionRise` | 0.6s | `[0.22, 1, 0.36, 1]` | in-view section content |
| `hover` | 0.18s | `ease-out` | links, cards, buttons |

**Scroll behaviour.** Reveals fire once at 20% visibility and never replay. No parallax, no
scroll-jacking, no pinned sections. Native scrolling only, with `scroll-behavior: smooth`
disabled under reduced motion.

**Reduced motion.** `prefers-reduced-motion: reduce` is honoured at two levels: a global CSS
block that collapses animation and transition duration to 0.01ms, and `useReducedMotion()`
inside the motion components so variants resolve to their final state with zero displacement.
The hero video is replaced by a static poster frame. Nothing is hidden and no content depends
on an animation completing.

**Cleanup and performance.** Only `transform` and `opacity` are animated, so every animation
stays on the compositor. No layout-triggering properties. `will-change` is not set globally.
Observers unmount with their components through Framer Motion's own lifecycle. Budget: no more
than 12 animated elements in one viewport, and the hero entrance completes within 1.1s.

**Frequency gate.** One entrance per element per session. A reveal never repeats on scroll-back.
Decorative looping animation is limited to the hero video itself.

## 5. Layout and rhythm

Page rhythm alternates deliberately so no two sections share a silhouette: full-bleed hero video,
then an asymmetric editorial split, then a full-width horizontal price ledger, then a staggered
gallery mosaic, then a quiet centred testimonial, then a dense practical footer. No repeated card
grid is used as the primary device on more than one section.

## 6. Rejected patterns

Purple gradient defaults, repeated three-up card grids, pill clusters, glass panels, blurred
blobs, staged stock photography, fabricated metrics, generic geometric sans display type, and
interchangeable section rhythm are all rejected. Every photograph on the site is an actual
Emerald Spa photograph pulled from the venue's own Fresha gallery.

## 7. Imagery

Six authentic venue photographs at 1280x720 and six team portraits at 340x340. Delivered as AVIF
with WebP and progressive JPEG fallbacks at 640, 960, and 1280 widths. Originals are preserved in
`/assets/original`. Intrinsic `width` and `height` are declared on every image to reserve layout.
Below-fold media is `loading="lazy"` and `decoding="async"`. Only the hero poster is preloaded.
The logo is delivered as inline SVG and is never rasterised.

## 8. Voice

Calm, precise, hospitable. Namibian English. No exclamation marks, no em dashes, no hype
adjectives, no invented outcomes. Prices always carry the NAD prefix and the real duration.
