import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, GitCompare, Map, Sparkles } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { PageTransition } from '../components/motion/PageTransition';
import { CareerHub } from '../components/careers/CareerHub';
import { CareerCompare } from '../components/careers/CareerCompare';
import { CareerDiscover } from '../components/careers/CareerDiscover';
import { cn } from '../lib/utils';

type Tab = 'paths' | 'compare' | 'discover';

const TABS: Array<{ id: Tab; label: string; icon: React.ReactNode }> = [
  { id: 'paths', label: 'Career paths', icon: <Map className="h-4 w-4" /> },
  { id: 'compare', label: 'Compare paths', icon: <GitCompare className="h-4 w-4" /> },
  { id: 'discover', label: 'Not sure? Discover', icon: <Sparkles className="h-4 w-4" /> },
];

/**
 * CAREERS — the hub. Paths, comparison, and the discovery quiz live on one
 * page so choosing a career is a look-around, not a menu hop.
 */
export function Careers() {
  const [tab, setTab] = useState<Tab>('paths');

  return (
    <PageTransition>
      <div className="min-h-screen overflow-hidden pt-16">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-zuno-950/72 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
            <div className="flex items-center gap-4">
              <Link to="/" className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.05] px-2.5 py-1.5 text-sm font-semibold text-zinc-300 transition hover:border-violet-400/40 hover:bg-white/[0.09] hover:text-white" aria-label="Back to home">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link to="/" aria-label="ZUNO home" className="flex items-center gap-2.5 text-zinc-100 transition hover:text-violet-200">
                <Logo className="h-7 w-7" />
                <span className="text-lg font-black tracking-[-0.04em]">ZUNO</span>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p className="text-[11px] font-black uppercase tracking-[0.22em] text-violet-300" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              From zero to know-how
            </motion.p>
            <motion.h1 className="mt-3 text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              What do you want to become?
            </motion.h1>
          </div>

          <motion.nav className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition-all duration-300',
                  tab === t.id ? 'border-violet-300/40 bg-violet-500/15 text-white' : 'border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:text-zinc-100',
                )}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </motion.nav>

          <motion.div className="mt-6" key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {tab === 'paths' && <CareerHub />}
            {tab === 'compare' && (
              <div className="mx-auto max-w-4xl py-14">
                <div className="text-center">
                  <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">See paths side by side.</h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-400">
                    Same axes, different weights per path. Pick up to three and see what each actually involves.
                  </p>
                </div>
                <div className="mt-10">
                  <CareerCompare />
                </div>
              </div>
            )}
            {tab === 'discover' && (
              <div className="py-14">
                <CareerDiscover />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}