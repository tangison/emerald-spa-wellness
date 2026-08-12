import StateNotice from '../components/StateNotice';
import Seo from '../components/Seo';
import business from '../data/business.json';

export default function Maintenance() {
  return (
    <>
      <Seo
        title="Scheduled maintenance"
        description="The website is briefly unavailable while it is updated."
        path="/maintenance"
        noindex
      />
      <section className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-center justify-center px-5 sm:px-8 md:px-12">
        <StateNotice
          state="maintenance"
          showMark
          headingLevel="h1"
          title="Back shortly"
          message="The website is being updated. The spa is open as usual and bookings are still live on Fresha."
          actionLabel="Book on Fresha"
          actionHref={business.booking.fresha}
        />
        <p className="mt-2 text-center text-sm text-ink/60">
          Or call{' '}
          <a href={`tel:${business.phoneHref}`} className="link-underline text-emerald-core">
            {business.phone}
          </a>
          .
        </p>
      </section>
    </>
  );
}
