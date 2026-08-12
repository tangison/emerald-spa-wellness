import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './SocialIcon';
import Logo from './Logo';
import business from '../data/business.json';

const NAV = [
  { label: 'Treatments', to: '/services' },
  { label: 'The Spa', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Visit', to: '/contact' },
];

const LEGAL = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Sitemap', to: '/sitemap' },
  { label: 'Brand', to: '/brand' },
];

export default function SiteFooter() {
  return (
    <footer className="bg-emerald-deep text-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo size={44} />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/70">
              A refined retreat in Windhoek West where calm, balance and quiet luxury set the tone.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Emerald Spa on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition-colors duration-200 hover:border-rose-gold hover:text-rose-gold"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href={business.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Emerald Spa on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition-colors duration-200 hover:border-rose-gold hover:text-rose-gold"
              >
                <FacebookIcon size={17} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-[10px] font-semibold uppercase tracking-ultra text-rose-gold">Explore</h2>
            <ul className="mt-5 space-y-3">
              {NAV.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-underline text-sm text-cream/85 hover:text-cream">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <h2 className="text-[10px] font-semibold uppercase tracking-ultra text-rose-gold">Visit</h2>
            <ul className="mt-5 space-y-4 text-sm text-cream/85">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-rose-gold" aria-hidden="true" />
                <a
                  href={business.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  {business.address.unit} {business.address.street}, {business.address.suburb},{' '}
                  {business.address.city}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-rose-gold" aria-hidden="true" />
                <a href={`tel:${business.phoneHref}`} className="link-underline">
                  {business.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="mt-0.5 shrink-0 text-rose-gold" aria-hidden="true" />
                <span>
                  Monday to Saturday 09:00 to 18:00
                  <br />
                  Sunday 10:00 to 16:00
                </span>
              </li>
            </ul>

            <a
              href={business.booking.fresha}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 border border-rose-gold px-6 py-3.5 text-[11px] font-semibold uppercase tracking-ultra text-rose-gold transition-colors duration-200 hover:bg-rose-gold hover:text-emerald-deep"
            >
              Book on Fresha
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/15 pt-8 text-[11px] uppercase tracking-widest text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Emerald Spa and Wellness Center</p>
          <ul className="flex flex-wrap gap-5">
            {LEGAL.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-underline hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="https://studio.tangison.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hover:text-cream"
          >
            Made by Tangison Studio
          </a>
        </div>
      </div>
    </footer>
  );
}
