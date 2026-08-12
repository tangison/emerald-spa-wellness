import { Link } from 'react-router-dom';
import { ArrowUpRight, Star, MapPin, Clock, Phone } from 'lucide-react';
import Hero from '../components/Hero';
import Picture from '../components/Picture';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import business from '../data/business.json';
import services from '../data/services.json';
import gallery from '../data/gallery.json';
import reviews from '../data/reviews.json';

const ATTRIBUTES = business.features;

export default function Home() {
  const featured = services.featured;
  const topReviews = reviews.slice(0, 3);

  return (
    <>
      <Seo
        title="Spa and Wellness Centre in Windhoek"
        description={business.description}
        path="/"
      />

      <Hero />

      {/* SECTION 1: asymmetric editorial split */}
      <section id="story" className="bg-cream-paper py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
                <p className="eyebrow">The Retreat</p>
                <h2 className="mt-6 font-display text-4xl font-medium leading-[1.08] text-emerald-deep sm:text-5xl md:text-6xl">
                  A place to exhale, restore and leave renewed
                </h2>
              </Reveal>
              <Reveal index={1}>
                <p className="mt-8 max-w-[62ch] text-base leading-relaxed text-ink/75">
                  {business.description}
                </p>
              </Reveal>
              <Reveal index={2}>
                <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3">
                  {ATTRIBUTES.map((f) => (
                    <li
                      key={f}
                      className="flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-widest text-emerald-core"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-rose-gold" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal index={3}>
                <Link
                  to="/about"
                  className="mt-10 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-ultra text-emerald-core"
                >
                  More about the spa
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </Reveal>
            </div>

            <div className="md:col-span-7">
              <Reveal index={1}>
                <Picture
                  slug="reception"
                  alt={gallery[3].alt}
                  imgClassName="w-full h-auto object-cover"
                  sizes="(min-width: 768px) 58vw, 100vw"
                />
              </Reveal>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Reveal index={2}>
                  <Picture
                    slug="treatment-room"
                    alt={gallery[0].alt}
                    imgClassName="w-full h-auto object-cover"
                    sizes="(min-width: 768px) 29vw, 50vw"
                  />
                </Reveal>
                <Reveal index={3}>
                  <Picture
                    slug="candlescape"
                    alt={gallery[5].alt}
                    imgClassName="w-full h-auto object-cover"
                    sizes="(min-width: 768px) 29vw, 50vw"
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: full-width horizontal price ledger */}
      <section className="bg-emerald-deep py-20 text-cream md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-ultra text-rose-gold">
                  Signature
                </p>
                <h2 className="mt-5 font-display text-4xl font-medium leading-none sm:text-5xl md:text-6xl">
                  Most booked treatments
                </h2>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-ultra text-rose-gold"
              >
                All {business.serviceCount} treatments
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <ul className="mt-14 border-t border-cream/15">
            {featured.map((s, i) => (
              <Reveal as="li" key={s.name} index={i} className="border-b border-cream/15">
                <a
                  href={business.booking.fresha}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-1 items-baseline gap-x-8 gap-y-2 py-7 transition-colors duration-200 hover:bg-cream/5 md:grid-cols-12"
                >
                  <span className="text-[10px] font-semibold tracking-ultra text-cream/60 md:col-span-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-2xl leading-tight md:col-span-5 md:text-3xl">
                    {s.name}
                  </span>
                  <span className="max-w-[46ch] text-sm leading-relaxed text-cream/60 md:col-span-4">
                    {s.description || `Duration ${s.duration}.`}
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-widest text-rose-gold md:col-span-2 md:text-right">
                    {s.price}
                    <span className="ml-2 block text-[10px] font-normal tracking-widest text-cream/60 md:mt-1">
                      {s.duration}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 3: staggered gallery mosaic */}
      <section className="bg-cream-paper py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <p className="eyebrow">Inside</p>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-medium leading-[1.08] text-emerald-deep sm:text-5xl md:text-6xl">
              Serene rooms and a quiet garden escape
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-12">
            <Reveal className="sm:col-span-7">
              <Picture
                slug="serenity-garden"
                alt={gallery[4].alt}
                imgClassName="w-full h-full object-cover"
                sizes="(min-width: 640px) 56vw, 100vw"
              />
            </Reveal>
            <Reveal index={1} className="sm:col-span-5 sm:pt-12">
              <Picture
                slug="spa-retreat"
                alt={gallery[1].alt}
                imgClassName="w-full h-full object-cover"
                sizes="(min-width: 640px) 40vw, 100vw"
              />
            </Reveal>
            <Reveal index={2} className="sm:col-span-5">
              <Picture
                slug="green-escape"
                alt={gallery[2].alt}
                imgClassName="w-full h-full object-cover"
                sizes="(min-width: 640px) 40vw, 100vw"
              />
            </Reveal>
            <Reveal index={3} className="flex items-end sm:col-span-7">
              <div className="w-full">
                <p className="max-w-[52ch] text-base leading-relaxed text-ink/75">
                  Six rooms, a hydrotherapy suite and a garden courtyard, all on Blackett Street in
                  Windhoek West. Every photograph here was taken inside the spa.
                </p>
                <Link
                  to="/gallery"
                  className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-ultra text-emerald-core"
                >
                  Open the gallery
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: quiet centred testimonial */}
      <section className="bg-emerald-mist py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2" role="img" aria-label={`Rated ${business.rating} out of 5 stars`}>
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star key={n} size={16} className="fill-rose-gold text-rose-gold" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-ultra text-emerald-core">
                {business.rating} from {business.reviewsTotal} verified Fresha reviews
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {topReviews.map((r, i) => (
              <Reveal key={r.id} index={i}>
                <figure className="flex h-full flex-col">
                  <blockquote className="font-display text-xl leading-snug text-emerald-deep md:text-2xl">
                    {r.text}
                  </blockquote>
                  <figcaption className="mt-auto pt-6 text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                    {r.author} &middot; {r.dateLabel}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal index={3}>
            <div className="mt-14 text-center">
              <Link
                to="/reviews"
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-ultra text-emerald-core"
              >
                Read all reviews
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5: dense practical block */}
      <section className="bg-cream-paper py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <p className="eyebrow">Visit</p>
              <h2 className="mt-5 font-display text-4xl font-medium leading-[1.08] text-emerald-deep sm:text-5xl">
                Blackett Street, Windhoek West
              </h2>
              <a
                href={business.booking.fresha}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center gap-2 bg-emerald-core px-7 py-4 text-[11px] font-semibold uppercase tracking-ultra text-cream transition-colors duration-200 hover:bg-emerald-mid"
              >
                Book your treatment
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </Reveal>

            <Reveal index={1} className="md:col-span-7">
              <dl className="divide-y divide-emerald-core/12 border-y border-emerald-core/12">
                <div className="flex gap-5 py-6">
                  <dt className="w-28 shrink-0">
                    <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                      <MapPin size={13} aria-hidden="true" /> Address
                    </span>
                  </dt>
                  <dd className="text-sm leading-relaxed text-ink/80">
                    <a href={business.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                      {business.address.unit} {business.address.street}, {business.address.suburb},{' '}
                      {business.address.city}, {business.address.region}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-5 py-6">
                  <dt className="w-28 shrink-0">
                    <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                      <Clock size={13} aria-hidden="true" /> Hours
                    </span>
                  </dt>
                  <dd className="w-full text-sm text-ink/80">
                    <ul className="space-y-1.5">
                      {business.hours.map((h) => (
                        <li key={h.day} className="flex justify-between gap-4">
                          <span>{h.day}</span>
                          <span className="tabular-nums text-ink/60">{h.value}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="flex gap-5 py-6">
                  <dt className="w-28 shrink-0">
                    <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                      <Phone size={13} aria-hidden="true" /> Contact
                    </span>
                  </dt>
                  <dd className="text-sm text-ink/80">
                    <a href={`tel:${business.phoneHref}`} className="link-underline">
                      {business.phone}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
