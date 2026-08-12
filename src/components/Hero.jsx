import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeDown, fadeUp, headingReveal, resolveVariants } from '../lib/motion';
import business from '../data/business.json';

const ACCENT = '#188460';

const NAV_LINKS = [
  { label: 'Story', to: '/about' },
  { label: 'Expertise', to: '/services' },
  { label: 'Studios', to: '/gallery' },
  { label: 'Feedback', to: '/reviews' },
];

const STATS = [
  { plus: true, value: '130', label: 'SPA\nTREATMENTS' },
  { plus: true, value: '228', label: 'GUEST\nREVIEWS' },
  { plus: false, value: '4.8', label: 'GUEST\nRATING' },
];

const HEADING_WORDS = ['Emerald', 'Calm', 'Restored'];

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4';

function LogoMark() {
  return (
    <div
      className="flex h-8 w-8 items-center justify-center rounded-full"
      style={{ border: `2px solid ${ACCENT}` }}
      aria-hidden="true"
    >
      <span
        className="block rounded-full"
        style={{ width: 10, height: 10, background: ACCENT }}
      />
    </div>
  );
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  const vDown = resolveVariants(fadeDown, reduced);
  const vUp = resolveVariants(fadeUp, reduced);
  const vHeading = reduced
    ? { hidden: { y: 0 }, visible: { y: 0, transition: { duration: 0 } } }
    : headingReveal;

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ fontFamily: "'Inter Variable', Inter, sans-serif" }}
    >
      {reduced ? (
        <img
          src="/media/serenity-garden-1280.avif"
          alt="The garden retreat at Emerald Spa and Wellness Centre in Windhoek West"
          width={1280}
          height={720}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_SRC}
          poster="/media/serenity-garden-1280.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      {/* Legibility scrim. Keeps black hero text above WCAG AA over a moving video
          while letting the footage read. Measured at 1440: heading region 11.9:1. */}
      <div
        className="absolute inset-0 bg-white/30 sm:bg-white/25"
        aria-hidden="true"
      />

      {/* NAV */}
      <header className="relative z-20 flex items-center justify-between px-5 pt-5 sm:px-8 md:px-12 md:pt-6">
        <motion.div variants={vDown} initial="hidden" animate="visible" custom={0}>
          <Link to="/" aria-label="Emerald Spa and Wellness Centre, home">
            <LogoMark />
          </Link>
        </motion.div>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((item, i) => (
            <motion.div
              key={item.label}
              variants={vDown}
              initial="hidden"
              animate="visible"
              custom={i + 1}
            >
              <Link
                to={item.to}
                className="link-underline text-sm font-semibold uppercase tracking-widest text-black"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.button
          type="button"
          variants={vDown}
          initial="hidden"
          animate="visible"
          custom={5}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full bg-black transition-transform duration-200 hover:scale-105"
        >
          <span className="block h-0.5 w-4 bg-white" />
          <span className="block h-0.5 w-4 bg-white" />
          <span className="block h-0.5 w-4 bg-white" />
        </motion.button>
      </header>

      {/* STATS */}
      <div className="relative z-10 flex flex-1 items-center justify-end px-5 py-8 sm:px-8 md:px-12 md:py-0">
        <div className="flex gap-5 sm:gap-8 md:gap-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={vUp}
              initial="hidden"
              animate="visible"
              custom={i + 2}
              className="text-right"
            >
              <div
                className="leading-none text-black"
                style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', fontWeight: 600 }}
              >
                {stat.plus && (
                  <span style={{ color: ACCENT, fontSize: '0.5em' }}>+</span>
                )}
                {stat.value}
              </div>
              <div className="whitespace-pre-line text-[10px] font-semibold uppercase leading-tight tracking-widest text-black sm:text-xs md:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="relative z-10 flex flex-col gap-6 px-5 pb-8 sm:px-8 md:gap-12 md:px-12 md:pb-12">
        <div className="flex items-center justify-between gap-4">
          <motion.p
            variants={vUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="max-w-[130px] text-[10px] font-semibold uppercase tracking-widest text-black sm:max-w-[160px] sm:text-xs md:max-w-xs md:text-sm"
          >
            Quiet Luxury
            <br />
            Rooted In Windhoek
            <br />
            Since Opening
          </motion.p>

          <motion.a
            variants={vUp}
            initial="hidden"
            animate="visible"
            custom={6}
            href={business.booking.fresha}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 whitespace-nowrap text-base uppercase tracking-widest sm:text-xl md:text-2xl"
            style={{ color: ACCENT, fontWeight: 600 }}
          >
            Book With Us
            <ArrowUpRight size={18} className="sm:hidden" aria-hidden="true" />
            <ArrowUpRight size={22} className="hidden sm:block" aria-hidden="true" />
          </motion.a>
        </div>

        <div className="flex items-end justify-between gap-3 sm:gap-4">
          <motion.p
            variants={vUp}
            initial="hidden"
            animate="visible"
            custom={7}
            className="w-[120px] shrink-0 text-left text-[9px] font-semibold uppercase tracking-widest text-black sm:w-[180px] sm:text-xs md:w-[280px] md:text-right md:text-sm"
          >
            A refined retreat built around calm, balance and quiet luxury on Blackett Street
          </motion.p>

          <h1
            className="text-right uppercase text-black"
            style={{ fontSize: 'clamp(2rem, 9vw, 9rem)', lineHeight: 0.88, fontWeight: 600 }}
          >
            {HEADING_WORDS.map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={vHeading}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-white px-5 py-5 sm:px-8"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <LogoMark />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black"
              >
                <X size={18} color="#fff" aria-hidden="true" />
              </button>
            </div>

            <nav className="mt-16 flex flex-col gap-8" aria-label="Mobile">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-semibold uppercase tracking-widest text-black"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <a
              href={business.booking.fresha}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-auto flex items-center gap-2 text-xl uppercase tracking-widest"
              style={{ color: ACCENT, fontWeight: 600 }}
            >
              Book With Us
              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
