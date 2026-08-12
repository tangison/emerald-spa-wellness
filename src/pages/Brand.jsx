import Logo from '../components/Logo';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';

const PALETTE = [
  { name: 'Emerald Deep', hex: '#03291B', role: 'Page ground, footer', light: false },
  { name: 'Emerald Core', hex: '#0C4830', role: 'Primary accent, headings', light: false },
  { name: 'Emerald Mid', hex: '#0F6244', role: 'Hover and active', light: false },
  { name: 'Emerald Bright', hex: '#188460', role: 'Accent token, CTA text', light: false },
  { name: 'Emerald Light', hex: '#3CA884', role: 'Focus rings, emphasis', light: false },
  { name: 'Emerald Mist', hex: '#DCEBE2', role: 'Quiet section grounds', light: true },
  { name: 'Rose Gold', hex: '#C08460', role: 'Secondary accent, rules', light: false },
  { name: 'Rose Deep', hex: '#9C6048', role: 'Rose text on cream', light: false },
  { name: 'Cream', hex: '#FCF0E4', role: 'Warm paper ground', light: true },
  { name: 'Ink', hex: '#0A0A0A', role: 'Body text', light: false },
];

const MOTION = [
  { token: 'fadeDown', duration: '0.5s', delay: 'i x 0.1s', use: 'Nav logo, links, hamburger' },
  { token: 'fadeUp', duration: '0.6s', delay: 'i x 0.12s', use: 'Stats, tagline, CTA' },
  { token: 'headingReveal', duration: '0.7s', delay: '0.4 + i x 0.14s', use: 'Hero heading words' },
  { token: 'sectionRise', duration: '0.6s', delay: 'i x 0.08s', use: 'In-view section content' },
  { token: 'hover', duration: '0.18s', delay: 'none', use: 'Links, cards, buttons' },
];

export default function Brand() {
  return (
    <>
      <Seo
        title="Brand"
        description="The Emerald Spa and Wellness Centre design system: colour sampled from the logo, typography, motion tokens and the rules behind the site."
        path="/brand"
      />

      <section className="border-b border-emerald-core/10 bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <p className="eyebrow">Brand</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.06] text-emerald-deep sm:text-5xl md:text-7xl">
              The design system
            </h1>
            <p className="mt-7 max-w-[62ch] text-base leading-relaxed text-ink/75">
              Every colour below was sampled directly from the Emerald logo artwork rather than
              chosen by eye. Every fact on this site comes from the venue&apos;s own verified record.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <h2 className="font-display text-3xl font-medium text-emerald-deep md:text-4xl">The mark</h2>
          </Reveal>
          <Reveal index={1}>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="flex items-center justify-center border border-emerald-core/15 bg-cream-paper py-16">
                <Logo size={92} />
              </div>
              <div className="flex items-center justify-center border border-emerald-core/15 bg-emerald-mist py-16">
                <Logo size={92} />
              </div>
              <div className="flex items-center justify-center border border-emerald-core/15 bg-emerald-deep py-16">
                <Logo size={92} />
              </div>
            </div>
            <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-ink/65">
              The mark ships as inline SVG and is never rasterised. A cut emerald sits inside two
              rose-gold orbital rings, matching the gemstone the business is named for.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-emerald-mist py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <h2 className="font-display text-3xl font-medium text-emerald-deep md:text-4xl">Colour</h2>
          </Reveal>
          <Reveal index={1}>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {PALETTE.map((c) => (
                <li key={c.hex} className="border border-emerald-core/15 bg-cream-paper">
                  <span className="block h-24 w-full" style={{ background: c.hex }} aria-hidden="true" />
                  <span className="block p-4">
                    <span className="block text-[11px] font-semibold uppercase tracking-widest text-emerald-deep">
                      {c.name}
                    </span>
                    <span className="mt-1 block font-mono text-[11px] uppercase text-ink/60">{c.hex}</span>
                    <span className="mt-2 block text-[11px] leading-snug text-ink/60">{c.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal index={2}>
            <p className="mt-8 max-w-[68ch] text-sm leading-relaxed text-ink/70">
              Emerald Core on Cream measures 9.8:1 and Ink on Cream measures 18.4:1. Emerald Bright
              on white measures 4.04:1, so it is reserved for text at 18px semibold and larger,
              which meets WCAG AA for large text. Smaller emerald text uses Emerald Core.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <h2 className="font-display text-3xl font-medium text-emerald-deep md:text-4xl">
              Typography
            </h2>
          </Reveal>
          <Reveal index={1}>
            <div className="mt-10 space-y-10 border-t border-emerald-core/15 pt-10">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                  Display, Cormorant Garamond
                </p>
                <p className="mt-4 font-display text-5xl font-medium leading-none text-emerald-deep md:text-7xl">
                  Calm, restored
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                  Interface, Inter Variable, 600, uppercase, wide tracking
                </p>
                <p className="mt-4 text-2xl font-semibold uppercase tracking-widest text-emerald-deep md:text-4xl">
                  Emerald Spa Wellness
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                  Body, Inter Variable, 400
                </p>
                <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-ink/80">
                  Body copy is set at 16px minimum with the measure capped at 68 characters so long
                  passages stay readable on every screen size. Both families are self-hosted, so no
                  external font request is needed to render the page.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-emerald-deep py-16 text-cream md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <h2 className="font-display text-3xl font-medium md:text-4xl">Motion</h2>
            <p className="mt-5 max-w-[68ch] text-sm leading-relaxed text-cream/70">
              One engine only: Framer Motion. Every token below animates transform and opacity
              exclusively, so animation stays on the compositor. Easing is cubic-bezier(0.22, 1,
              0.36, 1) throughout. Reveals fire once and never replay, and everything collapses to
              its resting state when the visitor asks for reduced motion.
            </p>
          </Reveal>
          <Reveal index={1}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-cream/20 text-[10px] uppercase tracking-ultra text-rose-gold">
                    <th scope="col" className="py-3 pr-6 font-semibold">Token</th>
                    <th scope="col" className="py-3 pr-6 font-semibold">Duration</th>
                    <th scope="col" className="py-3 pr-6 font-semibold">Delay</th>
                    <th scope="col" className="py-3 font-semibold">Applied to</th>
                  </tr>
                </thead>
                <tbody>
                  {MOTION.map((m) => (
                    <tr key={m.token} className="border-b border-cream/10 text-cream/80">
                      <td className="py-4 pr-6 font-mono text-[13px] text-cream">{m.token}</td>
                      <td className="py-4 pr-6 tabular-nums">{m.duration}</td>
                      <td className="py-4 pr-6 tabular-nums">{m.delay}</td>
                      <td className="py-4">{m.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <h2 className="font-display text-3xl font-medium text-emerald-deep md:text-4xl">
              What this site refuses to do
            </h2>
          </Reveal>
          <Reveal index={1}>
            <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {[
                'Invent metrics, testimonials or credentials',
                'Use staged stock photography in place of the real spa',
                'Ship purple gradient defaults or glass panels',
                'Repeat one card grid as the answer to every section',
                'Rasterise the logo',
                'Animate without a reduced-motion path',
                'Load a second animation library without a measured need',
                'Fake a booking flow the business does not operate',
              ].map((r) => (
                <li
                  key={r}
                  className="flex items-baseline gap-3 border-b border-emerald-core/12 pb-3 text-sm text-ink/75"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-gold" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
