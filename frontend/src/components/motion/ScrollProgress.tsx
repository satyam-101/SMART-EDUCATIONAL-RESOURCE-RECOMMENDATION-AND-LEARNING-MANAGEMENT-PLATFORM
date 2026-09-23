import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28, restDelta: 0.001 });
  return <motion.div className="fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-violet-400" style={{ scaleX: reducedMotion ? scrollYProgress : scaleX }} />;
}
