/**
 * Emerald mark as inline SVG. Never rasterised, per BRAND.md section 7.
 * Facet geometry and the orbital ring echo the supplied logo artwork.
 */
export default function Logo({ size = 32, className = '', title = 'Emerald Spa and Wellness Centre' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <ellipse
        cx="32"
        cy="30"
        rx="29"
        ry="15"
        transform="rotate(-28 32 30)"
        stroke="#C08460"
        strokeWidth="2"
      />
      <ellipse
        cx="32"
        cy="30"
        rx="29"
        ry="15"
        transform="rotate(28 32 30)"
        stroke="#C08460"
        strokeWidth="2"
      />
      <path d="M16 26h32L32 54 16 26Z" fill="#0C4830" />
      <path d="M16 26h32l-6-9H22l-6 9Z" fill="#188460" />
      <path d="M24 26h16l-8 28-8-28Z" fill="#0F6244" />
      <path d="M22 17h20l-4 9H26l-4-9Z" fill="#3CA884" />
    </svg>
  );
}
