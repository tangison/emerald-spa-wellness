import StateNotice from '../components/StateNotice';
import Seo from '../components/Seo';
import business from '../data/business.json';

export default function ServerError() {
  return (
    <>
      <Seo
        title="Server error"
        description="Something went wrong on our side."
        path="/500"
        noindex
      />
      <section className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-center justify-center px-5 sm:px-8 md:px-12">
        <StateNotice
          state="server"
          showMark
          headingLevel="h1"
          title="Something went wrong on our side"
          message="The page could not be loaded. Try again in a moment. Bookings are unaffected and still open on Fresha."
          actionLabel="Try again"
          onAction={() => window.location.reload()}
        />
        <p className="mt-2 text-center text-sm text-ink/60">
          Need the spa now? Call{' '}
          <a href={`tel:${business.phoneHref}`} className="link-underline text-emerald-core">
            {business.phone}
          </a>
          .
        </p>
      </section>
    </>
  );
}
