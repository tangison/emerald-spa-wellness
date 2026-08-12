import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import services from '../data/services.json';

const GROUPS = [
  {
    title: 'Main',
    links: [
      { to: '/', label: 'Home', note: 'Hero, the retreat, signature treatments, gallery, reviews, visit' },
      { to: '/services', label: 'Treatments and prices', note: '90 treatments across 13 categories' },
      { to: '/gallery', label: 'Gallery', note: 'Six photographs taken inside the spa' },
      { to: '/about', label: 'The spa', note: 'Story, attributes, team, ratings' },
      { to: '/reviews', label: 'Guest reviews', note: '4.8 from 228 verified reviews' },
      { to: '/contact', label: 'Visit and contact', note: 'Address, hours, enquiry composer' },
    ],
  },
  {
    title: 'Reference',
    links: [
      { to: '/brand', label: 'Brand', note: 'Colour, type and motion system' },
      { to: '/sitemap', label: 'Sitemap', note: 'This page' },
      { to: '/privacy', label: 'Privacy policy', note: 'How enquiry details are handled' },
      { to: '/terms', label: 'Terms of service', note: 'Booking, cancellation and site terms' },
    ],
  },
  {
    title: 'Service states',
    links: [
      { to: '/offline', label: 'Offline', note: 'Shown when the connection drops' },
      { to: '/maintenance', label: 'Maintenance', note: 'Shown during planned downtime' },
      { to: '/500', label: 'Server error', note: 'Shown when a request fails' },
      { to: '/not-a-real-page', label: '404 not found', note: 'Shown for an unknown address' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Seo
        title="Sitemap"
        description="Every page on the Emerald Spa and Wellness Centre website, including treatment categories and service states."
        path="/sitemap"
      />

      <section className="border-b border-emerald-core/10 bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <p className="eyebrow">Sitemap</p>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.06] text-emerald-deep sm:text-5xl md:text-7xl">
              Everything on this site
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <div className="grid gap-14 md:grid-cols-3">
            {GROUPS.map((g, gi) => (
              <Reveal key={g.title} index={gi}>
                <h2 className="text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                  {g.title}
                </h2>
                <ul className="mt-6 space-y-5">
                  {g.links.map((l) => (
                    <li key={l.to} className="border-b border-emerald-core/12 pb-4">
                      <Link
                        to={l.to}
                        className="link-underline text-base font-semibold text-emerald-deep"
                      >
                        {l.label}
                      </Link>
                      <p className="mt-1.5 text-sm text-ink/60">{l.note}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal index={3}>
            <h2 className="mt-20 text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
              Treatment categories
            </h2>
            <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {services.categories.map((c) => (
                <li key={c.slug} className="border-b border-emerald-core/12 pb-3">
                  <Link
                    to={`/services#${c.slug}`}
                    className="link-underline flex items-baseline justify-between gap-4 text-sm text-emerald-deep"
                  >
                    {c.name}
                    <span className="shrink-0 text-[11px] tabular-nums text-ink/60">
                      {c.items.length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
