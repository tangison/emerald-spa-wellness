import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Picture from '../components/Picture';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import gallery from '../data/gallery.json';

const SLUGS = [
  'treatment-room',
  'spa-retreat',
  'green-escape',
  'reception',
  'serenity-garden',
  'candlescape',
];

const SPANS = [
  'sm:col-span-7',
  'sm:col-span-5',
  'sm:col-span-5',
  'sm:col-span-7',
  'sm:col-span-8',
  'sm:col-span-4',
];

export default function Gallery() {
  const [open, setOpen] = useState(null);
  const reduced = useReducedMotion();

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((n) => (n === null ? null : (n - 1 + gallery.length) % gallery.length)),
    [],
  );
  const next = useCallback(
    () => setOpen((n) => (n === null ? null : (n + 1) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, prev, next]);

  return (
    <>
      <Seo
        title="Gallery"
        description="Inside Emerald Spa and Wellness Centre in Windhoek West: treatment rooms, the reception, the hydrotherapy suite and the garden escape."
        path="/gallery"
      />

      <section className="border-b border-emerald-core/10 bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <p className="eyebrow">Gallery</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.06] text-emerald-deep sm:text-5xl md:text-7xl">
              Inside the spa
            </h1>
            <p className="mt-7 max-w-[62ch] text-base leading-relaxed text-ink/75">
              Every photograph on this page was taken inside Emerald Spa on Blackett Street. Select
              any image to view it larger.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-paper py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <ul className="grid gap-4 sm:grid-cols-12">
            {gallery.map((g, i) => (
              <Reveal as="li" key={g.slug} index={Math.min(i, 4)} className={SPANS[i]}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group block w-full text-left"
                  aria-label={`View larger: ${g.title}`}
                >
                  <span className="block overflow-hidden">
                    <Picture
                      slug={SLUGS[i]}
                      alt={g.alt}
                      imgClassName="w-full h-auto object-cover transition-transform duration-500 ease-emerald group-hover:scale-[1.03]"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  </span>
                  <span className="mt-3 block text-[10px] font-semibold uppercase tracking-ultra text-emerald-core">
                    {g.title}
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="fixed inset-0 z-[70] flex flex-col bg-emerald-deep/97 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={gallery[open].title}
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-ultra text-cream">
                {gallery[open].title}
                <span className="ml-3 text-cream/60">
                  {open + 1} of {gallery.length}
                </span>
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close image"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors duration-200 hover:bg-cream hover:text-emerald-deep"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center gap-3 py-6">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors duration-200 hover:bg-cream hover:text-emerald-deep"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>

              <Picture
                slug={SLUGS[open]}
                alt={gallery[open].alt}
                priority
                className="max-h-full"
                imgClassName="max-h-[70vh] w-auto object-contain"
                sizes="90vw"
              />

              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors duration-200 hover:bg-cream hover:text-emerald-deep"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>

            <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-cream/70">
              {gallery[open].alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
