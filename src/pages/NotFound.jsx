import { Link } from 'react-router-dom';
import StateNotice from '../components/StateNotice';
import Seo from '../components/Seo';

const SUGGESTIONS = [
  { to: '/services', label: 'Treatments and prices' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Visit and contact' },
];

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="That page does not exist on the Emerald Spa and Wellness Centre website."
        path="/404"
        noindex
      />
      <section className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-center justify-center px-5 sm:px-8 md:px-12">
        <StateNotice
          state="notfound"
          showMark
          headingLevel="h1"
          title="That page does not exist"
          message="The address may have changed or been mistyped. The treatment menu and booking links are all still here."
          actionLabel="Back to home"
          actionTo="/"
        />
        <ul className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {SUGGESTIONS.map((s) => (
            <li key={s.to}>
              <Link
                to={s.to}
                className="link-underline text-[11px] font-semibold uppercase tracking-ultra text-emerald-core"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
