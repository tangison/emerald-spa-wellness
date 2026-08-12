import { useState, useMemo } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import StateNotice from '../components/StateNotice';
import business from '../data/business.json';
import services from '../data/services.json';

const ALL = 'all';

export default function Services() {
  const [active, setActive] = useState(ALL);
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.categories
      .filter((c) => active === ALL || c.slug === active)
      .map((c) => ({
        ...c,
        items: q
          ? c.items.filter(
              (i) =>
                i.name.toLowerCase().includes(q) ||
                (i.description || '').toLowerCase().includes(q),
            )
          : c.items,
      }))
      .filter((c) => c.items.length > 0);
  }, [active, query]);

  const count = visible.reduce((n, c) => n + c.items.length, 0);

  return (
    <>
      <Seo
        title="Treatments and Prices"
        description="Every treatment at Emerald Spa and Wellness Centre in Windhoek West, with real durations and NAD prices. Massages, facials, hydrotherapy, nails, waxing and more."
        path="/services"
      />

      <section className="border-b border-emerald-core/10 bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <p className="eyebrow">Treatments</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.06] text-emerald-deep sm:text-5xl md:text-7xl">
              The full treatment menu
            </h1>
            <p className="mt-7 max-w-[62ch] text-base leading-relaxed text-ink/75">
              Prices are in Namibian dollars and include the listed duration. Bookings are handled on
              Fresha, where availability is live.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-paper py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0">
              <button
                type="button"
                onClick={() => setActive(ALL)}
                aria-pressed={active === ALL}
                className={`shrink-0 border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-colors duration-200 ${
                  active === ALL
                    ? 'border-emerald-core bg-emerald-core text-cream'
                    : 'border-emerald-core/25 text-emerald-core hover:border-emerald-core'
                }`}
              >
                All
              </button>
              {services.categories.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setActive(c.slug)}
                  aria-pressed={active === c.slug}
                  className={`shrink-0 border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-colors duration-200 ${
                    active === c.slug
                      ? 'border-emerald-core bg-emerald-core text-cream'
                      : 'border-emerald-core/25 text-emerald-core hover:border-emerald-core'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-core/75"
                aria-hidden="true"
              />
              <label htmlFor="service-search" className="sr-only">
                Search treatments
              </label>
              <input
                id="service-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search treatments"
                className="w-full border border-emerald-core/25 bg-transparent py-3 pl-9 pr-3 text-sm text-ink placeholder:text-ink/60 focus:border-emerald-core focus:outline-none"
              />
            </div>
          </div>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-widest text-emerald-core/75" role="status">
            {count} {count === 1 ? 'treatment' : 'treatments'} shown
          </p>
        </div>
      </section>

      <section className="bg-cream-paper pb-24 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          {visible.length === 0 ? (
            <StateNotice
              state="empty"
              title="No treatments match that search"
              message="Try a different word, or clear the search to see the full menu."
              actionLabel="Clear search"
              onAction={() => {
                setQuery('');
                setActive(ALL);
              }}
            />
          ) : (
            <div className="space-y-20">
              {visible.map((cat) => (
                <div key={cat.slug} id={cat.slug}>
                  <Reveal>
                    <div className="flex items-baseline justify-between gap-4 border-b border-emerald-core/20 pb-4">
                      <h2 className="font-display text-3xl font-medium text-emerald-deep md:text-4xl">
                        {cat.name}
                      </h2>
                      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                        {cat.items.length}
                      </span>
                    </div>
                  </Reveal>

                  <ul className="divide-y divide-emerald-core/10">
                    {cat.items.map((item, i) => (
                      <Reveal as="li" key={`${cat.slug}-${item.name}-${i}`} index={Math.min(i, 4)}>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-2 py-6 md:grid-cols-12">
                          <div className="md:col-span-7">
                            <h3 className="text-base font-semibold text-emerald-deep">{item.name}</h3>
                            {item.description && (
                              <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-ink/65">
                                {item.description}
                              </p>
                            )}
                            {item.variants.length > 1 && (
                              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                                {item.variants.map((v, vi) => (
                                  <li
                                    key={`${v.name}-${vi}`}
                                    className="text-[11px] uppercase tracking-widest text-emerald-core/75"
                                  >
                                    {v.duration} &middot; {v.price}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="md:col-span-3">
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-ink/60">
                              {item.duration}
                            </p>
                          </div>
                          <div className="md:col-span-2 md:text-right">
                            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-core">
                              {item.price}
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-emerald-deep py-16 text-cream md:py-20">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-5 sm:px-8 md:flex-row md:items-center md:px-12">
          <p className="max-w-xl font-display text-2xl leading-snug md:text-3xl">
            Availability is live on Fresha, including same-day slots.
          </p>
          <a
            href={business.booking.freshaBook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 border border-rose-gold px-7 py-4 text-[11px] font-semibold uppercase tracking-ultra text-rose-gold transition-colors duration-200 hover:bg-rose-gold hover:text-emerald-deep"
          >
            Book a treatment
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
