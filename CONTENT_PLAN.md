# CONTENT_PLAN.md — Emerald Spa & Wellness Centre

## Sourcing rule

Approved content comes from the Fresha venue record `awio4ik8`, retrieved 2026-08-12. Marketing
connective copy is written in the spa's voice but never states a fact that the source record does
not support. No invented metric, testimonial, credential, partner, price, or result appears anywhere.

## Voice

Calm, precise, hospitable, Namibian English. No exclamation marks, no em dashes, no hype adjectives.
Prices always carry the NAD prefix and the real duration beside them.

## Content ledger

| Route | Section | Source | Status |
| --- | --- | --- | --- |
| `/` | Hero heading, tagline, description | Written in spa voice, geometry per supplied spec | done |
| `/` | Stats: +130 treatments, +228 reviews, 4.8 rating | `business.json` verified | done |
| `/` | The Retreat editorial | `business.description` verbatim plus the 9 verified attributes | done |
| `/` | Signature treatments ledger | `services.featured`, 4 real treatments with real prices | done |
| `/` | Gallery mosaic | 4 of the 6 authentic venue photographs | done |
| `/` | Testimonials | 3 verified reviews, verbatim | done |
| `/` | Visit block | Address, all 7 days of hours, phone | done |
| `/services` | Full menu | 90 treatments across 13 categories, real prices and durations | done |
| `/services` | Filter, search, count, empty state | Derived from the same data | done |
| `/gallery` | 6 photographs with lightbox | `gallery.json`, alt text from the venue's own descriptions | done |
| `/about` | Description and review summary | `business.description`, `business.reviewSummary` verbatim | done |
| `/about` | Attributes, stat block, team | 9 features, 5 team members with real names and ratings | done |
| `/reviews` | Rating, distribution, 6 reviews | `business.ratingDistribution` sums to 228, verified | done |
| `/contact` | Address, hours, phone, socials, enquiry composer | `business.json` | done |
| `/brand` | Palette, type, motion tokens, rejected patterns | `BRAND.md` | done |
| `/sitemap` | All routes plus 13 category deep links | Derived | done |
| `/privacy` | 6 sections plus contact | Written to match actual data behaviour | done |
| `/terms` | 8 sections plus contact | Written to match actual booking reality | done |
| `/offline`, `/maintenance`, `/500`, `404` | State copy | Written, each carries the real phone number | done |

## Copy the brief supplied that was changed, and why

| Supplied | Shipped | Reason |
| --- | --- | --- |
| `+300 CRAFTED BRANDS` | `+130 SPA TREATMENTS` | Agency metric, false for a spa. Client approved the verified figure. |
| `+200 DIGITAL PRODUCTS` | `+228 GUEST REVIEWS` | Same. Verified from the source record. |
| `+100 VENTURES FUNDED` | `4.8 GUEST RATING` | Same. A rating carries no plus glyph. |
| `Fearless / Vision / Delivered` | `Emerald / Calm / Restored` | Agency positioning. Structure, sizing, and reveal timing unchanged. |
| `Shaping Bold / Visions Into Power / For Your Tribe` | `Quiet Luxury / Rooted In Windhoek / Since Opening` | Same three-line geometry, spa voice. |
| `Creative Studios Built Around Elevating Your Vision Into Striking Reality` | `A refined retreat built around calm, balance and quiet luxury on Blackett Street` | Same block width and alignment, true statement. |
| `Work With Us` | `Book With Us` | The action a spa visitor actually takes. |

Nav labels `Story`, `Expertise`, `Studios`, `Feedback` were kept verbatim from the spec, mapped
to `/about`, `/services`, `/gallery`, and `/reviews`.
