import { useEffect, useState } from 'react';
import { CloudOff } from 'lucide-react';

/** Live offline banner. The dedicated /offline route covers the standalone surface. */
export default function ConnectionWatch() {
  const [offline, setOffline] = useState(
    typeof navigator !== 'undefined' && navigator.onLine === false,
  );

  useEffect(() => {
    const goOffline = () => setOffline(true);
    const goOnline = () => setOffline(false);
    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed inset-x-0 bottom-0 z-[60] flex items-center justify-center gap-2 bg-emerald-deep px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-ultra text-cream"
    >
      <CloudOff size={14} aria-hidden="true" />
      You are offline. Treatment details are still readable, booking needs a connection.
    </div>
  );
}
