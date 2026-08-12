# PRODUCT.md — Emerald Spa & Wellness Centre

## What this is

A production marketing and booking-gateway website for Emerald Spa & Wellness Centre, a
woman-owned and Indigenous-owned day spa at No. 7 Blackett Street, Windhoek West, Windhoek,
Khomas Region, Namibia.

## Who it serves

Guests in and around Windhoek looking for massage, facial, hydrotherapy, nail, waxing, and
brow treatments, plus visitors to the city searching for a spa. Most arrive on a phone, so
the build is mobile-first and every layout is verified from 320px upward.

## What it does

1. Presents the spa credibly, using only its own photographs and its own verified description.
2. Publishes the complete treatment menu with real durations and real NAD prices, filterable
   by category and searchable by name.
3. Hands every booking intent to Fresha, the platform the spa actually operates on.
4. Gives practical visiting information: address, map link, opening hours, phone, and WhatsApp.
5. Shows verified social proof: 4.8 from 228 reviews, with the true rating distribution.

## What it deliberately does not do

- It does not take payment. The spa does not have Fresha Pay enabled, so a checkout would be fiction.
- It does not hold availability. Fresha owns the calendar, so this site never implies otherwise.
- It does not run analytics or advertising trackers, so there is no cookie banner to serve.
- It does not host a contact backend. The enquiry form composes a real WhatsApp message instead
  of pretending to deliver mail through a server nobody authorised.

## Source of truth

Every fact originates from the Fresha venue record `awio4ik8`, retrieved 2026-08-12 with
Scrapling, and is stored in `src/data/*.json`:

| File | Contents |
| --- | --- |
| `business.json` | Name, phone, address, coordinates, hours, rating, distribution, features, socials |
| `services.json` | 13 categories, 90 published treatments, 4 featured, with real prices |
| `gallery.json` | 6 venue photographs with the venue's own descriptions |
| `reviews.json` | 6 verified guest reviews, verbatim |
| `team.json` | 6 team records with real names, roles where published, and ratings |

`tests/content.test.mjs` asserts the shipped data still matches that record, so a silent
content drift fails the test run rather than reaching a visitor.

## Success criteria

- A visitor can find a treatment, see its real price, and reach the correct booking page in
  two clicks from any route.
- Address, hours, and phone are readable without JavaScript succeeding, via the noscript block.
- The site passes WCAG 2.1 AA with zero axe-core violations on every route.
- Zero console errors and no horizontal overflow at 320, 375, 414, 768, 1024, 1280, and 1440.
- Nothing on the site can be contradicted by the spa's own Fresha listing.
