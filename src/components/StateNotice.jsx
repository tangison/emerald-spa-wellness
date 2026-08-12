import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  CloudOff,
  Hourglass,
  Lock,
  Search,
  ServerCrash,
  Wrench,
  Timer,
  Loader2,
} from 'lucide-react';
import Logo from './Logo';

const ICONS = {
  loading: Loader2,
  empty: Search,
  success: CheckCircle2,
  validation: AlertTriangle,
  server: ServerCrash,
  timeout: Timer,
  offline: CloudOff,
  maintenance: Wrench,
  denied: Lock,
  expired: Hourglass,
  notfound: Search,
};

/**
 * Single source of truth for every operational state the build requires:
 * loading, empty, success, validation, server, timeout, offline, maintenance,
 * denied, expired, notfound.
 */
export default function StateNotice({
  state = 'empty',
  headingLevel = 'h2',
  title,
  message,
  actionLabel,
  actionTo,
  actionHref,
  onAction,
  compact = false,
  showMark = false,
}) {
  const Icon = ICONS[state] || Search;
  const isPositive = state === 'success';
  const isAlert = ['validation', 'server', 'timeout', 'offline', 'denied', 'expired'].includes(state);

  const Heading = headingLevel;

  const tone = isPositive
    ? 'text-emerald-bright'
    : isAlert
      ? 'text-rose-deep'
      : 'text-emerald-core';

  return (
    <div
      role={isAlert ? 'alert' : 'status'}
      aria-live={isAlert ? 'assertive' : 'polite'}
      className={`flex flex-col items-center text-center ${compact ? 'py-10' : 'py-20 md:py-28'}`}
    >
      {showMark && <Logo size={48} className="mb-8" />}

      <Icon
        size={compact ? 24 : 32}
        className={`${tone} ${state === 'loading' ? 'animate-spin' : ''}`}
        aria-hidden="true"
      />

      <Heading
        className={`mt-5 font-display font-medium text-emerald-deep ${
          compact ? 'text-xl' : 'text-3xl md:text-4xl'
        }`}
      >
        {title}
      </Heading>

      {message && (
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/65">{message}</p>
      )}

      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-8 inline-flex bg-emerald-core px-7 py-3.5 text-[11px] font-semibold uppercase tracking-ultra text-cream transition-colors duration-200 hover:bg-emerald-mid"
        >
          {actionLabel}
        </Link>
      )}

      {actionLabel && actionHref && (
        <a
          href={actionHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex bg-emerald-core px-7 py-3.5 text-[11px] font-semibold uppercase tracking-ultra text-cream transition-colors duration-200 hover:bg-emerald-mid"
        >
          {actionLabel}
        </a>
      )}

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-8 inline-flex bg-emerald-core px-7 py-3.5 text-[11px] font-semibold uppercase tracking-ultra text-cream transition-colors duration-200 hover:bg-emerald-mid"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
