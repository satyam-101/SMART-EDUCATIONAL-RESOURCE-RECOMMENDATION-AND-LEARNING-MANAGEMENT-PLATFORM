// ─── Career Roadmaps — shared data model ─────────────────────────
// Every career path in ZUNO is plain data. The UI is one reusable engine:
//   CareerPath → CareerPhase → skills → concepts → tools → projects → milestones.
// Adding a new career = adding one data file. No new pages.

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type ProjectDifficulty = 'Beginner' | 'Mini' | 'Intermediate' | 'Advanced' | 'Capstone';

/** The broad mastery ladder every roadmap walks — a career may skip levels. */
export type LevelLabel = 'Explorer' | 'Foundation' | 'Core Skills' | 'Intermediate' | 'Advanced' | 'Specialization' | 'Production' | 'Job Ready' | 'Professional';

export interface CareerLevel {
  value: number;
  label: LevelLabel;
  short: string;
  color: string;
  blurb: string;
}

export const CAREER_LEVELS: CareerLevel[] = [
  { value: 0, label: 'Explorer', short: 'L0', color: '#71717a', blurb: 'You are discovering what this world is made of.' },
  { value: 1, label: 'Foundation', short: 'L1', color: '#a78bfa', blurb: 'Flooring in place — syntax, tools, and mental models.' },
  { value: 2, label: 'Core Skills', short: 'L2', color: '#8b5cf6', blurb: 'The working essentials of the discipline.' },
  { value: 3, label: 'Intermediate', short: 'L3', color: '#6366f1', blurb: 'You can build real things and evaluate them honestly.' },
  { value: 4, label: 'Advanced', short: 'L4', color: '#f59e0b', blurb: 'Deep mechanics, trade-offs, and architecture thinking.' },
  { value: 5, label: 'Specialization', short: 'L5', color: '#f97316', blurb: 'Branch into the niche that fits how you think.' },
  { value: 6, label: 'Production', short: 'L6', color: '#10b981', blurb: 'Shipping, monitoring, reliability, and operations.' },
  { value: 7, label: 'Job Ready', short: 'L7', color: '#22d3ee', blurb: 'Portfolio + interview patterns + hiring face.' },
  { value: 8, label: 'Professional', short: 'L8', color: '#e879f9', blurb: 'Autonomous on real teams, mentoring, and scoping work.' },
];

export function levelFor(value: number): CareerLevel {
  return CAREER_LEVELS.find((l) => l.value === value) ?? CAREER_LEVELS[0];
}

export interface SkillNode {
  /** Display name used across the graph. */
  name: string;
  /** Skill names you should have before attempting this one. */
  prerequisites: string[];
}

export interface CareerProject {
  id: string;
  title: string;
  /** The problem the project exists to solve. */
  problem: string;
  difficulty: ProjectDifficulty;
  estimatedTime: string;
  /** What you actually hand over at the end. */
  output: string;
  skills: string[];
  technologies: string[];
  milestones: string[];
  /** How an AI coach can help you move through this project. */
  aiGuidance: string;
  /** 1–5: how strongly this lifts a portfolio (and interviews). */
  portfolioValue: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
}

export interface CareerResource {
  label: string;
  type: 'docs' | 'course' | 'practice' | 'community';
}

/** Visual metaphor a phase animates with — every career mixes these differently. */
export type AnimationType =
  | 'code'            // editor builds itself
  | 'data'            // raw data → charts
  | 'model'           // data points → model → prediction
  | 'network'         // neural network grows layer by layer
  | 'attention'       // words → tokens → attention
  | 'tokens'          // token chips assemble
  | 'pipeline'        // documents flow end-to-end
  | 'infra'           // infrastructure boxes stack
  | 'assemble'        // components assemble
  | 'connect'         // nodes connect into a graph
  | 'flow'            // particles flow through a path
  | 'shield'          // network + shield
  | 'ui'              // UI components assemble
  | 'device'          // sensor → device → cloud
  | 'architecture'    // code → architecture
  | 'materialize';    // a finished object materializes

export interface CareerPhase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** Which rung of the 0–8 ladder this phase sits on. */
  level: number;
  estimatedTime: string;
  /** Phase ids that must come before this one. */
  prerequisites: string[];
  skills: string[];
  concepts: string[];
  tools: string[];
  projects: CareerProject[];
  milestones: Milestone[];
  resources: CareerResource[];
  animationType: AnimationType;
}

export interface CareerSpecialization {
  id: string;
  title: string;
  description: string;
  skills: string[];
  projects: string[];
}

export interface CareerJobRole {
  title: string;
  level: 'Entry' | 'Mid' | 'Senior';
  description: string;
}

export type CareerMetaphor =
  | 'neural'          // AI — knowledge graph / neural connections
  | 'data-viz'        // Data Science — data visualization
  | 'pipeline'        // Data Engineering — data flowing through pipelines
  | 'flow'            // LLM apps — prompts flowing into products
  | 'architecture'    // Software — code → architecture
  | 'infra'           // Cloud/DevOps — infrastructure topology
  | 'shield'          // Cybersecurity — security network
  | 'component-tree'  // Frontend — component tree
  | 'device-cloud'    // IoT — sensor → device → cloud
  | 'mobile';         // Mobile — phone interface constructing

export interface CareerPath {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  /** Primary accent hex for glows / dots. */
  color: string;
  /** Tailwind gradient classes used on the premium card / CTA. */
  gradient: string;
  difficulty: Difficulty;
  estimatedMonths: number;
  /** General knowledge a learner should already have (not gatekeeping). */
  prerequisites: string[];
  phases: CareerPhase[];
  jobs: CareerJobRole[];
  specializations: CareerSpecialization[];
  recommendedProjects: string[];
  technologies: string[];
  /** Curated skill precedence — powers the interactive dependency graph. */
  skillGraph: SkillNode[];
  /** Ambient background metaphor for the whole journey. */
  metaphor: CareerMetaphor;
  /** Closing note — what this career involves, not why it is best. */
  endingNote: string;
}

/** How a career scores on the shared comparison axes (1–5). Never ranked head-to-head. */
export interface CareerAttributeScore {
  label: string;
  score: number;
  hint: string;
}

export function careerAttributes(c: CareerPath): CareerAttributeScore[] {
  const deep = (k: string) => {
    const hits = c.phases.flatMap((p) => [...p.skills, ...p.concepts, ...p.tools]).filter((v) => v.toLowerCase().includes(k));
    return hits.length;
  };
  const band = (n: number) => (n >= 3 ? 5 : n >= 2 ? 4 : n >= 1 ? 3 : 0);
  return [
    { label: 'Programming', score: band(deep('python') + deep('javascript') + deep('java') + deep('c++') + deep('go')), hint: 'Core coding workload across phases.' },
    { label: 'Data', score: band(deep('sql') + deep('pandas') + deep('data') + deep('dataset')), hint: 'Working with structured and raw data.' },
    { label: 'ML & AI', score: band(deep('machine learning') + deep('neural') + deep('llm') + deep('model')), hint: 'Models, training, and AI systems.' },
    { label: 'Cloud & Infra', score: band(deep('docker') + deep('cloud') + deep('kubernetes') + deep('aws')), hint: 'Deployment, containers, and infrastructure.' },
    { label: 'Systems Design', score: band(deep('system design') + deep('microservice') + deep('scalab') + deep('architecture')), hint: 'Designing systems that scale.' },
    { label: 'Security', score: band(deep('security') + deep('threat') + deep('owasp') + deep('encryption')), hint: 'Hardening systems and assessing risk.' },
    { label: 'Visualization', score: band(deep('visual') + deep('dashboard') + deep('chart') + deep('bi')), hint: 'Turning outputs into insight people can read.' },
  ];
}