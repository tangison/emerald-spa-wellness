import { Star, ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import business from '../data/business.json';
import reviews from '../data/reviews.json';

const DIST = [
  { stars: 5, count: business.ratingDistribution.star5 },
  { stars: 4, count: business.ratingDistribution.star4 },
  { stars: 3, count: business.ratingDistribution.star3 },
  { stars: 2, count: business.ratingDistribution.star2 },
  { stars: 1, count: business.ratingDistribution.star1 },
];

const TOTAL = DIST.reduce((n, d) => n + d.count, 0);

export default function Reviews() {
  return (
    <>
      <Seo
        title="Guest Reviews"
        description="Emerald Spa and Wellness Centre is rated 4.8 from 228 verified Fresha reviews. Read what guests say about the massages, facials and the atmosphere."
        path="/reviews"
      />

      <section className="border-b border-emerald-core/10 bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <p className="eyebrow">Feedback</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.06] text-emerald-deep sm:text-5xl md:text-7xl">
              What guests say
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-4">
              <p
                className="font-display text-7xl leading-none text-emerald-deep md:text-8xl"
              >
                {business.rating}
              </p>
              <div className="mt-4 flex gap-1.5" role="img" aria-label={`Rated ${business.rating} out of 5 stars`}>
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star key={n} size={16} className="fill-rose-gold text-rose-gold" />
                ))}
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-ultra text-emerald-core">
                {business.reviewsTotal} verified reviews
              </p>
              <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-ink/65">
                Ratings and reviews are collected by Fresha after a completed appointment, so every
                one comes from a real booking.
              </p>
            </Reveal>

            <Reveal index={1} className="md:col-span-8">
              <ul className="space-y-3">
                {DIST.map((d) => {
                  const pct = TOTAL ? Math.round((d.count / TOTAL) * 100) : 0;
                  return (
                    <li key={d.stars} className="flex items-center gap-4">
                      <span className="w-14 shrink-0 text-[11px] font-semibold uppercase tracking-widest text-emerald-core/75">
                        {d.stars} star
                      </span>
                      <span
                        className="h-2 flex-1 bg-emerald-core/10"
                        role="img"
                        aria-label={`${d.stars} star: ${d.count} reviews, ${pct} percent`}
                      >
                        <span
                          className="block h-full bg-emerald-bright"
                          style={{ width: `${pct}%` }}
                        />
                      </span>
                      <span className="w-10 shrink-0 text-right text-[11px] tabular-nums text-ink/60">
                        {d.count}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-10 max-w-[68ch] text-base leading-relaxed text-ink/75">
                {business.reviewSummary}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-emerald-mist py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <h2 className="font-display text-3xl font-medium text-emerald-deep md:text-4xl">
              Most recent reviews
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {reviews.map((r, i) => (
              <Reveal as="li" key={r.id} index={Math.min(i, 4)}>
                <figure className="border-t border-emerald-core/20 pt-6">
                  <div className="flex gap-1" role="img" aria-label={`Rated ${r.rating} out of 5 stars`}>
                    {Array.from({ length: r.rating }).map((_, n) => (
                      <Star
                        key={n}
                        size={13}
                        className="fill-rose-gold text-rose-gold"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 font-display text-xl leading-snug text-emerald-deep md:text-2xl">
                    {r.text}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-core text-[10px] font-semibold tracking-widest text-cream"
                      aria-hidden="true"
                    >
                      {r.initials}
                    </span>
                    <span className="text-[11px] uppercase tracking-widest text-ink/60">
                      {r.author}
                      <span className="mt-0.5 block text-ink/60">{r.dateLabel}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>

          <Reveal index={2}>
            <a
              href={business.booking.fresha}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-14 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-ultra text-emerald-core"
            >
              See all {business.reviewsTotal} reviews on Fresha
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
