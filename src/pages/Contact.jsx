import { useState } from 'react';
import { MapPin, Phone, Clock, ArrowUpRight, MessageCircle } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../components/SocialIcon';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import StateNotice from '../components/StateNotice';
import business from '../data/business.json';
import services from '../data/services.json';

const TREATMENT_OPTIONS = services.categories.map((c) => c.name);

const EMPTY = { name: '', contact: '', treatment: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  else if (values.name.trim().length < 2) errors.name = 'Please enter at least two characters.';

  if (!values.contact.trim()) errors.contact = 'Please enter a phone number or email address.';
  else {
    const v = values.contact.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    const isPhone = /^[+]?[\d\s()-]{7,}$/.test(v);
    if (!isEmail && !isPhone) errors.contact = 'Enter a valid phone number or email address.';
  }

  if (!values.message.trim()) errors.message = 'Please tell us what you would like to book.';
  else if (values.message.trim().length < 10) errors.message = 'Please add a little more detail.';

  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const composeMessage = () =>
    [
      `Enquiry from ${values.name.trim()}`,
      values.treatment ? `Interested in: ${values.treatment}` : null,
      `Message: ${values.message.trim()}`,
      `Reach me on: ${values.contact.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.getElementById(`field-${Object.keys(found)[0]}`);
      if (first) first.focus();
      return;
    }
    window.open(`${business.whatsapp}?text=${encodeURIComponent(composeMessage())}`, '_blank', 'noopener');
    setSent(true);
  };

  const fieldClass = (field) =>
    `w-full border bg-transparent px-4 py-3.5 text-sm text-ink placeholder:text-ink/60 focus:outline-none transition-colors duration-200 ${
      errors[field]
        ? 'border-rose-deep focus:border-rose-deep'
        : 'border-emerald-core/25 focus:border-emerald-core'
    }`;

  return (
    <>
      <Seo
        title="Visit and Contact"
        description="Emerald Spa and Wellness Centre, No. 7 Blackett Street, Windhoek West. Call +264 85 607 7143. Open Monday to Saturday 09:00 to 18:00 and Sunday 10:00 to 16:00."
        path="/contact"
      />

      <section className="border-b border-emerald-core/10 bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <p className="eyebrow">Visit</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.06] text-emerald-deep sm:text-5xl md:text-7xl">
              Find us in Windhoek West
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <dl className="space-y-8">
                <div>
                  <dt className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                    <MapPin size={13} aria-hidden="true" /> Address
                  </dt>
                  <dd className="mt-3 text-base leading-relaxed text-ink/80">
                    {business.address.unit} {business.address.street}
                    <br />
                    {business.address.suburb}, {business.address.city}
                    <br />
                    {business.address.region}, {business.address.country}
                  </dd>
                  <dd className="mt-3">
                    <a
                      href={business.address.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-ultra text-emerald-core"
                    >
                      Get directions
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                    <Phone size={13} aria-hidden="true" /> Phone and WhatsApp
                  </dt>
                  <dd className="mt-3 text-base text-ink/80">
                    <a href={`tel:${business.phoneHref}`} className="link-underline">
                      {business.phone}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                    <Clock size={13} aria-hidden="true" /> Opening hours
                  </dt>
                  <dd className="mt-3">
                    <ul className="space-y-2 text-sm text-ink/80">
                      {business.hours.map((h) => (
                        <li
                          key={h.day}
                          className="flex justify-between gap-6 border-b border-emerald-core/10 pb-2"
                        >
                          <span>{h.day}</span>
                          <span className="tabular-nums text-ink/60">{h.value}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>

                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                    Follow
                  </dt>
                  <dd className="mt-3 flex gap-3">
                    <a
                      href={business.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Emerald Spa on Instagram"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-core/25 text-emerald-core transition-colors duration-200 hover:border-emerald-core hover:bg-emerald-core hover:text-cream"
                    >
                      <InstagramIcon size={16} />
                    </a>
                    <a
                      href={business.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Emerald Spa on Facebook"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-core/25 text-emerald-core transition-colors duration-200 hover:border-emerald-core hover:bg-emerald-core hover:text-cream"
                    >
                      <FacebookIcon size={16} />
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal index={1} className="md:col-span-7">
              <div className="border border-emerald-core/15 p-6 sm:p-10">
                <h2 className="font-display text-2xl font-medium text-emerald-deep md:text-3xl">
                  Send an enquiry
                </h2>
                <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-ink/65">
                  This opens WhatsApp with your message ready to send to the spa. For a confirmed
                  time slot, book on Fresha where availability is live.
                </p>

                {sent ? (
                  <StateNotice
                    state="success"
                    compact
                    title="Your message is ready"
                    message="WhatsApp opened in a new tab with your enquiry prefilled. If it did not open, call the spa on +264 85 607 7143."
                    actionLabel="Send another"
                    onAction={() => {
                      setSent(false);
                      setValues(EMPTY);
                      setErrors({});
                    }}
                  />
                ) : (
                  <form onSubmit={onSubmit} noValidate className="mt-8 space-y-6">
                    <div>
                      <label
                        htmlFor="field-name"
                        className="block text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75"
                      >
                        Your name
                      </label>
                      <input
                        id="field-name"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={update('name')}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                        className={`mt-2 ${fieldClass('name')}`}
                        placeholder="Full name"
                      />
                      {errors.name && (
                        <p id="error-name" role="alert" className="mt-2 text-xs text-rose-deep">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="field-contact"
                        className="block text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75"
                      >
                        Phone or email
                      </label>
                      <input
                        id="field-contact"
                        name="contact"
                        type="text"
                        value={values.contact}
                        onChange={update('contact')}
                        aria-invalid={Boolean(errors.contact)}
                        aria-describedby={errors.contact ? 'error-contact' : undefined}
                        className={`mt-2 ${fieldClass('contact')}`}
                        placeholder="081 000 0000 or you@example.com"
                      />
                      {errors.contact && (
                        <p id="error-contact" role="alert" className="mt-2 text-xs text-rose-deep">
                          {errors.contact}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="field-treatment"
                        className="block text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75"
                      >
                        Treatment area (optional)
                      </label>
                      <select
                        id="field-treatment"
                        name="treatment"
                        value={values.treatment}
                        onChange={update('treatment')}
                        className="mt-2 w-full border border-emerald-core/25 bg-transparent px-4 py-3.5 text-sm text-ink transition-colors duration-200 focus:border-emerald-core focus:outline-none"
                      >
                        <option value="">No preference</option>
                        {TREATMENT_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="field-message"
                        className="block text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75"
                      >
                        Message
                      </label>
                      <textarea
                        id="field-message"
                        name="message"
                        rows={4}
                        value={values.message}
                        onChange={update('message')}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'error-message' : undefined}
                        className={`mt-2 resize-y ${fieldClass('message')}`}
                        placeholder="What would you like to book, and roughly when?"
                      />
                      {errors.message && (
                        <p id="error-message" role="alert" className="mt-2 text-xs text-rose-deep">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-emerald-core px-7 py-4 text-[11px] font-semibold uppercase tracking-ultra text-cream transition-colors duration-200 hover:bg-emerald-mid"
                      >
                        <MessageCircle size={14} aria-hidden="true" />
                        Send on WhatsApp
                      </button>
                      <a
                        href={business.booking.freshaBook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-emerald-core/30 px-7 py-4 text-[11px] font-semibold uppercase tracking-ultra text-emerald-core transition-colors duration-200 hover:border-emerald-core"
                      >
                        Book on Fresha
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream-paper pb-20 md:pb-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
          <Reveal>
            <a
              href={business.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-emerald-core/15 bg-emerald-mist p-8 transition-colors duration-200 hover:border-emerald-core/40 sm:p-12"
            >
              <p className="text-[10px] font-semibold uppercase tracking-ultra text-emerald-core/75">
                Location
              </p>
              <p className="mt-4 font-display text-2xl text-emerald-deep sm:text-3xl">
                {business.address.unit} {business.address.street}, {business.address.suburb}
              </p>
              <p className="mt-2 text-sm tabular-nums text-ink/60">
                {business.address.lat}, {business.address.lng}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-ultra text-emerald-core">
                Open in Google Maps
                <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
