import StateNotice from '../components/StateNotice';
import Seo from '../components/Seo';
import business from '../data/business.json';

export default function Offline() {
  return (
    <>
      <Seo
        title="You are offline"
        description="This page needs a connection."
        path="/offline"
        noindex
      />
      <section className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-center justify-center px-5 sm:px-8 md:px-12">
        <StateNotice
          state="offline"
          showMark
          headingLevel="h1"
          title="You are offline"
          message="Pages you already opened stay readable. Booking and directions need a connection to load."
          actionLabel="Retry"
          onAction={() => window.location.reload()}
        />
        <div className="mt-2 text-center text-sm leading-relaxed text-ink/60">
          <p>
            {business.address.unit} {business.address.street}, {business.address.suburb},{' '}
            {business.address.city}
          </p>
          <p className="mt-1">
            <a href={`tel:${business.phoneHref}`} className="link-underline text-emerald-core">
              {business.phone}
            </a>
          </p>
          <p className="mt-1">Monday to Saturday 09:00 to 18:00, Sunday 10:00 to 16:00</p>
        </div>
      </section>
    </>
  );
}
