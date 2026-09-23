import { HeroSection } from '../components/landing/HeroSection';
import { CoursesSection } from '../components/landing/CoursesSection';
import { MasteryFlow } from '../components/landing/MasteryFlow';
import { CtaFooter } from '../components/landing/CtaFooter';
import { CareerHub } from '../components/careers/CareerHub';
import { CreativeHeader } from '../components/navigation/CreativeHeader';
import { AnimatedBackground } from '../components/motion/AnimatedBackground';
import { Marquee } from '../components/motion/Marquee';
import { TextReveal } from '../components/motion/TextReveal';
import { Reveal } from '../components/motion/Reveal';
import { StatsBand } from '../components/landing/StatsBand';
import { PlatformPreview } from '../components/landing/PlatformPreview';

const MARQUEE_TOPICS = [
  'Python',
  'Machine Learning',
  'Deep Learning',
  'NLP',
  'LLMs',
  'RAG',
  'MLOps',
  'Data Engineering',
  'Cloud',
  'DevOps',
  'Cybersecurity',
  'Full Stack',
];

/**
 * LANDING — the opening scene.
 * A single continuous experience: the hero wakes up and transforms into the
 * learning platform, courses reveal, domains open, the mastery loop runs
 * horizontally, and the thread closes in the footer.
 */
export function Landing() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip text-zinc-100">
      <AnimatedBackground />
      <CreativeHeader />

      <main>
        <HeroSection />

        {/* quiet knowledge-flow ticker */}
        <div className="relative border-y border-white/[0.05] py-5">
          <Marquee speed={34} className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            {MARQUEE_TOPICS.map((topic) => (
              <span key={topic} className="mx-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                <span className="h-1 w-1 rounded-full bg-violet-400/70" />
                {topic}
              </span>
            ))}
          </Marquee>
        </div>

        <StatsBand />

        <CoursesSection />

        {/* product showcase — the learning space, with graphs */}
        <PlatformPreview />

        {/* mission statement — the why, said plainly */}
        <section className="relative py-24 lg:py-32">
          <Reveal className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <p className="section-label">Why ZUNO</p>
            <p className="mt-6 text-3xl font-black leading-[1.12] tracking-[-0.04em] text-zinc-100 sm:text-4xl lg:text-5xl">
              <TextReveal text="Not a lecture dump." mode="once" />{' '}
              <span className="text-gradient-animated inline-block">
                <TextReveal text="A deliberate path." mode="once" />
              </span>
            </p>
          </Reveal>
        </section>

        <CareerHub />

        <MasteryFlow />

        {/* closing hook after the loop */}
        <section className="relative py-20">
          <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <p className="text-2xl font-black leading-snug tracking-[-0.03em] text-zinc-100 sm:text-4xl">
              <TextReveal text="Every day finished." mode="scrub" />
            </p>
          </Reveal>
        </section>

        <CtaFooter />
      </main>
    </div>
  );
}