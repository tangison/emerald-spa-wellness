import { motion, useReducedMotion } from 'framer-motion';
import { sectionRise, resolveVariants, inView } from '../lib/motion';

/**
 * Quiet section reveal. Fires once at 20% visibility and never replays,
 * per the frequency gate in BRAND.md section 4.
 */
export default function Reveal({ children, index = 0, as = 'div', className = '' }) {
  const reduced = useReducedMotion();
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      variants={resolveVariants(sectionRise, reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      custom={index}
    >
      {children}
    </Tag>
  );
}
