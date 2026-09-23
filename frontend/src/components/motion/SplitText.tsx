import { Fragment, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { duration, ease } from '../../config/motionConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type SplitLevel = 'words' | 'chars' | 'lines';

interface SplitTextProps {
  text: string;
  level?: SplitLevel;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}

const unitVariants = {
  hidden: { opacity: 0, y: '0.7em', filter: 'blur(8px)' },
  show: { opacity: 1, y: '0em', filter: 'blur(0px)', transition: { duration: duration.normal, ease: ease.out } },
};

/**
 * Character / word / line reveal. Use sparingly for brand statements only.
 */
export function SplitText({ text, level = 'words', className = '', delay = 0, stagger = 0.04, as: Tag = 'span' }: SplitTextProps) {
  const reduced = useReducedMotion();

  const units = level === 'lines' ? text.split('\n').map((l) => l.trim()).filter(Boolean) : level === 'chars' ? Array.from(text) : text.split(' ').filter(Boolean);

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={`overflow-hidden ${className}`} aria-label={text}>
      <motion.span
        className="inline-block"
        style={{ display: 'flex', flexWrap: 'wrap' }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {units.map((unit, i) => (
          <Fragment key={`${unit}-${i}`}>
            <motion.span className="inline-block overflow-hidden" variants={unitVariants} aria-hidden>
              <span className="inline-block">{unit}</span>
            </motion.span>
            {level === 'words' ? <span className="inline-block">&nbsp;</span> : level === 'chars' && i < units.length - 1 ? <span>&nbsp;</span> : null}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Line-by-line reveal of a multi-line string. */
export function LineReveal({ children, className, delay = 0, stagger = 0.12 }: { children: ReactNode; className?: string; delay?: number; stagger?: number }) {
  const reduced = useReducedMotion();
  const lines = Array.isArray(children) ? children : [children];

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={`block ${className ?? ''}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: duration.emphasis, ease: ease.out, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}