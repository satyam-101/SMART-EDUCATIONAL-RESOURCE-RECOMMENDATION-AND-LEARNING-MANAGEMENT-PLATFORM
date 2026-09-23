import { motion } from 'framer-motion';
import { AnimatedNumber } from '../motion/AnimatedNumber';
import { stagger } from '../../config/motionConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const STATS = [
  { value: 12000, label: 'Active learners', format: (n: number) => `+${Math.round(n).toLocaleString()}` },
  { value: 85000, label: 'AI tutor sessions', format: (n: number) => `${Math.round(n).toLocaleString()}+` },
  { value: 96, label: 'Curated courses', format: (n: number) => `${Math.round(n)}` },
  { value: 4.9, label: 'Learner rating', format: (n: number) => n.toFixed(1) },
];

/**
 * STATS BAND — a slim strip of animated proof numbers that counts up the
 * moment it scrolls into view, then sits quietly as a social-proof divider.
 */
export function StatsBand() {
  const reduced = useReducedMotion();
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.02]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 py-14 sm:px-8 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="flex flex-col items-center gap-2 text-center"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * stagger.tight }}
          >
            <p className="text-3xl font-black tracking-[-0.03em] text-gradient sm:text-4xl">
              <AnimatedNumber value={stat.value} format={stat.format} duration={1.2 + i * 0.15} />
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}