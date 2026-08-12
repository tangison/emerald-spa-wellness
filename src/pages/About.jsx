import { ArrowUpRight, Star } from 'lucide-react';
import Picture from '../components/Picture';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import business from '../data/business.json';
import team from '../data/team.json';
import gallery from '../data/gallery.json';

/**
 * The record named "Emerald Spa" with role "Hydrotherapy" is a service account in the
 * source data, not a person, so it is excluded from the team display. See BUILD_PLAN.md
 * assumption 9. No role is invented for members whose jobTitle is null.
 */
const PEOPLE = team.filter((t) => t.name !== 'Emerald Spa');

export default function About() {
  return (
    <>
      <Seo
        title="The Spa"
        description="Emerald Spa and Wellness Centre is a woman-owned, Indigenous-owned retreat on Blackett Street in Windhoek West, rated 4.8 from 228 reviews."
        path="/about"
      />

      <section className="border-b border-emerald-core/10 bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <p className="eyebrow">The Spa</p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-medium leading-[1.06] text-emerald-deep sm:text-5xl md:text-7xl">
              Calm, balance and quiet luxury
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-6">
              <Picture
                slug="green-escape"
                alt={gallery[2].alt}
                imgClassName="w-full h-auto object-cover"
                sizes="(min-width: 768px) 48vw, 100vw"
                priority
              />
            </Reveal>
            <div className="md:col-span-6">
              <Reveal index={1}>
                <p className="text-lg leading-relaxed text-ink/80">{business.description}</p>
              </Reveal>
              <Reveal index={2}>
                <p className="mt-6 text-base leading-relaxed text-ink/70">
                  {business.reviewSummary}
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-widest text-ink/60">
                  Summary of guest feedback, drawn from the venue&apos;s verified Fresha reviews.
                </p>
              </Reveal>
              <Reveal index={3}>
                <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-emerald-core/15 pt-8">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                      Rating
                    </dt>
                    <dd className="mt-2 flex items-baseline gap-2 font-display text-4xl text-emerald-deep">
                      {business.rating}
                      <Star size={16} className="fill-rose-gold text-rose-gold" aria-hidden="true" />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                      Reviews
                    </dt>
                    <dd className="mt-2 font-display text-4xl text-emerald-deep">
                      {business.reviewsTotal}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                      Treatments
                    </dt>
                    <dd className="mt-2 font-display text-4xl text-emerald-deep">
                      {business.serviceCount}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                      From
                    </dt>
                    <dd className="mt-2 font-display text-4xl text-emerald-deep">
                      NAD {business.priceMin}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-mist py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <p className="eyebrow">Good to know</p>
            <h2 className="mt-5 font-display text-3xl font-medium text-emerald-deep md:text-5xl">
              What the spa offers
            </h2>
          </Reveal>
          <Reveal index={1}>
            <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {business.features.map((f) => (
                <li
                  key={f}
                  className="flex items-baseline gap-3 border-b border-emerald-core/12 pb-4 text-sm font-medium text-emerald-deep"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-gold" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <p className="eyebrow">The team</p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium text-emerald-deep md:text-5xl">
              Therapists you can book by name
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {PEOPLE.map((p, i) => (
              <Reveal as="li" key={p.slug} index={Math.min(i, 4)}>
                <Picture
                  slug={`team-${p.slug}`}
                  alt={`${p.name}, ${p.role || 'team member'} at Emerald Spa and Wellness Centre`}
                  imgClassName="w-full h-auto object-cover grayscale-0"
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 100vw"
                />
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-widest text-emerald-deep">
                  {p.name}
                </h3>
                {p.role && (
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-ink/60">{p.role}</p>
                )}
                <p className="mt-2 flex items-center gap-1.5 text-[11px] tracking-widest text-emerald-core">
                  <Star size={11} className="fill-rose-gold text-rose-gold" aria-hidden="true" />
                  {p.rating}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-emerald-deep py-16 text-cream md:py-20">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-5 sm:px-8 md:flex-row md:items-center md:px-12">
          <p className="max-w-xl font-display text-2xl leading-snug md:text-3xl">
            Woman-owned and Indigenous-owned, on Blackett Street in Windhoek West.
          </p>
          <a
            href={business.booking.fresha}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 border border-rose-gold px-7 py-4 text-[11px] font-semibold uppercase tracking-ultra text-rose-gold transition-colors duration-200 hover:bg-rose-gold hover:text-emerald-deep"
          >
            Book a visit
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
