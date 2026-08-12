import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import ConnectionWatch from './components/ConnectionWatch';
import StateNotice from './components/StateNotice';
import Home from './pages/Home';

const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const About = lazy(() => import('./pages/About'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Contact = lazy(() => import('./pages/Contact'));
const Brand = lazy(() => import('./pages/Brand'));
const SitemapPage = lazy(() => import('./pages/SitemapPage'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ServerError = lazy(() => import('./pages/ServerError'));
const Offline = lazy(() => import('./pages/Offline'));
const Maintenance = lazy(() => import('./pages/Maintenance'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * Reserves close to the height a real route occupies. Without this the footer paints
 * high and jumps down when the lazy chunk resolves, which measured CLS 0.318 on /services.
 */
function RouteFallback() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1400px] items-center justify-center px-5">
      <StateNotice state="loading" compact title="Loading" message="One moment please." />
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const isLanding = pathname === '/';

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      {!isLanding && <SiteHeader />}
      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/500" element={<ServerError />} />
            <Route path="/offline" element={<Offline />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <SiteFooter />
      <ConnectionWatch />
    </>
  );
}
