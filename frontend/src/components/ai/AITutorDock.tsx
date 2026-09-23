import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Send, X, Sparkles, Lightbulb, ListChecks, Hammer, FileText, BookOpen } from 'lucide-react';
import { duration, ease, spring } from '../../config/motionConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';

const SUGGESTED = [
  { label: 'Explain this simply', Icon: Lightbulb },
  { label: 'Quiz me', Icon: ListChecks },
  { label: 'Give me a project', Icon: Hammer },
  { label: 'Create notes', Icon: FileText },
  { label: 'Give me an example', Icon: BookOpen },
];

const SEED_REPLY =
  'I want to make that crystal clear. Think of a concept like a map: you can memorize the roads, or you can understand the terrain. As your ZUNO tutor, let’s build from where you are — want me to explain it simply, quiz you, or turn it into a mini project?';

const TIMING = [
  'Taking in your question…',
  'Turning it into a path…',
  'Finding the simplest explanation…',
];

/**
 * The AI Orb + dock. The floating orb has a distinct motion identity; on click
 * it morphs from the button into a chat panel rather than popping open like a
 * random modal.
 */
export function AITutorDock() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ from: 'ai' | 'user'; text: string }>>([]);
  const [input, setInput] = useState('');
  const [thinkingStep, setThinkingStep] = useState(-1);
  const [done, setDone] = useState(true);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reply = useRef(SEED_REPLY);

  useEffect(() => {
    if (!done || messages.length === 0) return;
    panelRef.current?.scrollTo({ top: panelRef.current.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
  }, [messages, done, reduced]);

  function ask(text: string) {
    if (!text.trim() || !done) return;
    setMessages((m) => [...m, { from: 'user', text }]);
    setDone(false);
    setThinkingStep(0);
    reply.current = SEED_REPLY;

    TIMING.forEach((_, i) => {
      window.setTimeout(() => setThinkingStep(i), i * 560);
    });
    window.setTimeout(() => {
      setMessages((m) => [...m, { from: 'ai', text: reply.current }]);
      setThinkingStep(-1);
      setDone(true);
    }, TIMING.length * 560 + 320);
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[90]">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="orb"
              type="button"
              data-cursor-label="ASK AI"
              onClick={() => setOpen(true)}
              className="group relative grid h-14 w-14 place-items-center rounded-full"
              aria-label="Open ZUNO AI tutor"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0, transition: { duration: duration.normal } }}
              transition={spring.snappy}
              whileHover={reduced ? undefined : { scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-violet-600"
                animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.span
                className="absolute inset-0 rounded-full border border-white/25"
                animate={reduced ? undefined : { scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
              />
              <Bot className="relative h-6 w-6 text-[#fff]" strokeWidth={2.2} />
            </motion.button>
          ) : (
            <motion.div
              key="panel"
              ref={panelRef}
              role="dialog"
              aria-label="ZUNO AI tutor"
              className="flex h-[480px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-violet-400/25 bg-zuno-950/90 shadow-2xl backdrop-blur-2xl"
              initial={{ scale: 0.35, opacity: 0, y: 40, originX: 1, originY: 1, borderRadius: 999 }}
              animate={{ scale: 1, opacity: 1, y: 0, borderRadius: 24, transition: { type: 'spring', stiffness: 320, damping: 26, mass: 0.8 } }}
              exit={{ scale: 0.35, opacity: 0, y: 40, borderRadius: 999, transition: { type: 'spring', stiffness: 340, damping: 26 } }}
            >
              <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-violet-600">
                  <Sparkles className="h-4 w-4 text-[#fff]" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">ZUNO AI</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Ready to help
                  </p>
                </div>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close tutor" className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/[0.07] hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    className={cn('flex', m.from === 'user' ? 'justify-end' : 'justify-start')}
                    initial={reduced ? false : { opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: duration.normal, ease: ease.out }}
                  >
                    <div className={cn('max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed', m.from === 'user' ? 'rounded-br-md bg-violet-600 text-[#fff]' : 'rounded-bl-md border border-white/[0.08] bg-white/[0.05] text-zinc-200')}>
                      {m.text}
                    </div>
                  </motion.div>
                ))}

                {!done && (
                  <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.05] px-4 py-3">
                      {thinkingStep >= 0 ? (
                        <motion.p key={thinkingStep} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-zinc-400">
                          {TIMING[thinkingStep]}
                        </motion.p>
                      ) : (
                        <span className="flex gap-1.5 py-1">
                          {[0, 1, 2].map((d) => (
                            <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-violet-300" animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.16 }} />
                          ))}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {messages.length === 0 && (
                <div className="px-4 pb-3">
                  <p className="pb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Try asking</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED.map(({ label, Icon }, i) => (
                      <motion.button
                        key={label}
                        type="button"
                        onClick={() => ask(label)}
                        className="flex items-center gap-1.5 rounded-xl border border-violet-400/20 bg-violet-500/[0.08] px-3 py-2 text-xs font-semibold text-violet-200 transition-colors hover:border-violet-300/40 hover:bg-violet-500/[0.16]"
                        initial={reduced ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.06, duration: duration.normal, ease: ease.out }}
                        whileHover={reduced ? undefined : { x: 3 }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              <form
                className="flex items-center gap-2 border-t border-white/[0.07] p-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(input);
                  setInput('');
                }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about any concept…"
                  aria-label="Ask ZUNO AI"
                  className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-violet-400/40"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!input.trim() || !done}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-600 text-white transition-transform active:scale-95 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}