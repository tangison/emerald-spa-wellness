import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import business from '../data/business.json';

const SECTIONS = [
  {
    title: 'About these terms',
    body: 'These terms cover the use of this website. They do not replace any terms the spa gives you at the time of booking or treatment, and they do not replace Fresha\u2019s terms, which apply to every booking made through that platform.',
  },
  {
    title: 'Prices and treatment details',
    body: 'Prices and durations shown here are published from the spa\u2019s verified Fresha listing and are stated in Namibian dollars. They can change. The price confirmed at the time of booking on Fresha is the one that applies.',
  },
  {
    title: 'Bookings',
    body: 'Bookings are made through Fresha, not through this website. This site holds no availability, takes no payment, and cannot confirm, change, or cancel an appointment. Every booking control sits with Fresha and with the spa.',
  },
  {
    title: 'Cancellation and changes',
    body: 'Cancellation and rescheduling are handled by the spa under the policy shown to you in Fresha when you book. Please check that policy at the time of booking, or call the spa to discuss a change.',
  },
  {
    title: 'Treatment suitability',
    body: 'Nothing on this website is medical advice. Some treatments are not suitable during pregnancy, with certain skin conditions, or alongside some medical conditions or medication. Tell your therapist about anything relevant before your treatment begins, and speak to a medical professional if you are unsure.',
  },
  {
    title: 'Accuracy',
    body: 'The information here is published in good faith from the spa\u2019s own verified records at the time of build. Details can change after publication. Where this website and the spa disagree, the spa is correct.',
  },
  {
    title: 'Content and images',
    body: 'The Emerald Spa name, logo, and photographs belong to the business. Treatment descriptions, reviews, and ratings originate from the spa\u2019s Fresha listing. None of it may be reproduced commercially without permission.',
  },
  {
    title: 'External services',
    body: 'This site links to Fresha, WhatsApp, Instagram, Facebook, and Google Maps. It does not control those services and is not responsible for their availability or content.',
  },
];

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service"
        description="Terms covering the use of the Emerald Spa and Wellness Centre website, prices, bookings and treatment suitability."
        path="/terms"
      />

      <section className="border-b border-emerald-core/10 bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <p className="eyebrow">Legal</p>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.06] text-emerald-deep sm:text-5xl md:text-7xl">
              Terms of service
            </h1>
            <p className="mt-6 text-[11px] uppercase tracking-widest text-ink/60">
              Last updated 12 August 2026
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[820px] px-5 sm:px-8 md:px-12">
          <div className="space-y-12">
            {SECTIONS.map((s, i) => (
              <Reveal key={s.title} index={Math.min(i, 4)}>
                <h2 className="font-display text-2xl font-medium text-emerald-deep md:text-3xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink/75">{s.body}</p>
              </Reveal>
            ))}

            <Reveal index={4}>
              <h2 className="font-display text-2xl font-medium text-emerald-deep md:text-3xl">
                Getting in touch
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/75">
                Emerald Spa and Wellness Center, {business.address.unit} {business.address.street},{' '}
                {business.address.suburb}, {business.address.city}, {business.address.region},{' '}
                {business.address.country}. Telephone{' '}
                <a href={`tel:${business.phoneHref}`} className="link-underline text-emerald-core">
                  {business.phone}
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
