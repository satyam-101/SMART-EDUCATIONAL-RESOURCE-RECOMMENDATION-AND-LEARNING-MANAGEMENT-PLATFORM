import type { CareerJobRole, CareerPhase, CareerProject, CareerResource, CareerSpecialization, Milestone, SkillNode } from '../../types/careers';

/** Compact array builder — keeps data files readable. */
export const $s = (...names: string[]) => names;
export const $c = (...names: string[]) => names;
export const $t = (...names: string[]) => names;
export const $r = (...ids: string[]) => ids;

export function $res(label: string, type: CareerResource['type']): CareerResource {
  return { label, type };
}

export function $milestone(id: string, title: string, description: string): Milestone {
  return { id, title, description };
}

export function $node(name: string, ...prerequisites: string[]): SkillNode {
  return { name, prerequisites };
}

export interface ProjectSpec {
  id: string;
  title: string;
  problem: string;
  difficulty: CareerProject['difficulty'];
  estimatedTime: string;
  output: string;
  skills: string[];
  technologies: string[];
  milestones?: string[];
  aiGuidance: string;
  portfolioValue?: number;
}

export function $project(spec: ProjectSpec): CareerProject {
  return {
    id: spec.id,
    title: spec.title,
    problem: spec.problem,
    difficulty: spec.difficulty,
    estimatedTime: spec.estimatedTime,
    output: spec.output,
    skills: spec.skills,
    technologies: spec.technologies,
    milestones: spec.milestones ?? [spec.output],
    aiGuidance: spec.aiGuidance,
    portfolioValue: spec.portfolioValue ?? 3,
  };
}

export function $job(title: string, level: CareerJobRole['level'], description: string): CareerJobRole {
  return { title, level, description };
}

export function $specialization(id: string, title: string, description: string, skills: string[], projects: string[]): CareerSpecialization {
  return { id, title, description, skills, projects };
}

export type RawPhase = Omit<CareerPhase, 'projects' | 'milestones' | 'resources'> & {
  projects: CareerProject[];
  milestones: Milestone[];
  resources: CareerResource[];
};

export function $phase(raw: RawPhase): CareerPhase {
  return { ...raw };
}