import manifest from '../data/media-manifest.json';

const bySlug = Object.fromEntries(manifest.map((m) => [m.slug, m]));

/**
 * Responsive picture element. AVIF first, WebP second, progressive JPEG fallback.
 * Intrinsic dimensions are always declared so layout is reserved before decode.
 */
export default function Picture({
  slug,
  alt,
  className = '',
  imgClassName = '',
  sizes = '100vw',
  priority = false,
}) {
  const entry = bySlug[slug];
  if (!entry) return null;

  const srcset = (fmt) =>
    entry.sources[fmt].map((s) => `${s.path} ${s.w}w`).join(', ');

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={entry.fallback.path}
        alt={alt}
        width={entry.width}
        height={entry.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
      />
    </picture>
  );
}
