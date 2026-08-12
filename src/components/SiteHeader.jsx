import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import Logo from './Logo';
import business from '../data/business.json';

const LINKS = [
  { label: 'Treatments', to: '/services' },
  { label: 'The Spa', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Visit', to: '/contact' },
];

/** Site chrome for every route except the landing hero, which carries its own nav. */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-emerald-core/10 bg-cream-paper/95 backdrop-blur-sm'
          : 'border-transparent bg-cream-paper'
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8 md:px-12">
        <Link to="/" className="flex items-center gap-3" aria-label="Emerald Spa and Wellness Centre, home">
          <Logo size={34} />
          <span className="hidden text-xs font-semibold uppercase tracking-ultra text-emerald-core sm:block">
            Emerald Spa
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `link-underline text-[11px] font-semibold uppercase tracking-ultra transition-colors duration-200 ${
                  isActive ? 'text-emerald-core' : 'text-ink hover:text-emerald-core'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={business.booking.fresha}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 bg-emerald-core px-5 py-3 text-[11px] font-semibold uppercase tracking-ultra text-cream transition-colors duration-200 hover:bg-emerald-mid sm:flex"
          >
            Book
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full bg-emerald-deep lg:hidden"
          >
            <span className="block h-0.5 w-4 bg-cream" />
            <span className="block h-0.5 w-4 bg-cream" />
            <span className="block h-0.5 w-4 bg-cream" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-cream-paper px-5 py-4 sm:px-8"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <Logo size={34} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-deep"
              >
                <X size={18} color="#FCF0E4" aria-hidden="true" />
              </button>
            </div>

            <nav className="mt-16 flex flex-col gap-7" aria-label="Mobile">
              {LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-3xl font-semibold uppercase tracking-widest text-emerald-deep"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <a
              href={business.booking.fresha}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-auto flex items-center gap-2 text-xl font-semibold uppercase tracking-widest text-emerald-bright"
            >
              Book On Fresha
              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
