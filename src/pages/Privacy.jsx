import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import business from '../data/business.json';

const SECTIONS = [
  {
    title: 'What this site collects',
    body: 'This website does not run analytics, advertising trackers, or third-party cookies, and it does not store visitor data on a server. There is no account system and no login. The site is a static publication of information about the spa.',
  },
  {
    title: 'The enquiry form',
    body: 'The enquiry form on the visit page does not send anything to a server owned by this website. When you submit it, your browser opens WhatsApp with your message prefilled, and you choose whether to send it. Until you press send in WhatsApp, the details stay on your own device. Once sent, the message reaches the spa through WhatsApp and is covered by WhatsApp\u2019s own privacy terms.',
  },
  {
    title: 'Booking through Fresha',
    body: 'Every booking link on this site opens Fresha, the booking platform the spa uses. Any name, contact detail, or payment information you enter there is collected by Fresha and the spa under Fresha\u2019s privacy policy, not this website\u2019s.',
  },
  {
    title: 'Information shown about the spa',
    body: 'Treatment names, prices, durations, opening hours, photographs, ratings, and guest reviews shown here are published from the spa\u2019s own verified Fresha venue listing. Reviewer names appear exactly as Fresha publishes them, which is a first name and a surname initial, or Anonymous where the reviewer chose that.',
  },
  {
    title: 'External links',
    body: 'Links to Fresha, Instagram, Facebook, WhatsApp, and Google Maps lead to services this website does not control. Their own privacy terms apply once you follow them.',
  },
  {
    title: 'Your choices',
    body: 'You can use this site without submitting anything. If you have sent an enquiry or made a booking and want the spa to correct or delete your details, contact the spa directly and ask.',
  },
];

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How Emerald Spa and Wellness Centre handles enquiry details, booking data and information shown on this website."
        path="/privacy"
      />

      <section className="border-b border-emerald-core/10 bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <p className="eyebrow">Legal</p>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.06] text-emerald-deep sm:text-5xl md:text-7xl">
              Privacy policy
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
                Contact
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/75">
                Questions about privacy can go to the spa directly on{' '}
                <a href={`tel:${business.phoneHref}`} className="link-underline text-emerald-core">
                  {business.phone}
                </a>
                , or in person at {business.address.unit} {business.address.street},{' '}
                {business.address.suburb}, {business.address.city}.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
