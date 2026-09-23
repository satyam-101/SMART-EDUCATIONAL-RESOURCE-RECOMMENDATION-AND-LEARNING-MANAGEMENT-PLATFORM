import type { CareerPath } from '../../types/careers';
import { aiEngineer } from './aiEngineer';
import { mlEngineer } from './mlEngineer';
import { dataScientist } from './dataScientist';
import { dataEngineer } from './dataEngineer';
import { softwareEngineer } from './softwareEngineer';
import { fullStack } from './fullStack';
import { backend } from './backend';
import { cloudDevops } from './cloudDevops';
import { mlops } from './mlops';
import { cybersecurity } from './cybersecurity';
import { dataAnalyst } from './dataAnalyst';
import { llmEngineer } from './llmEngineer';
import { frontend } from './frontend';
import { mobile } from './mobile';
import { embedded } from './embedded';

export type { CareerPath, CareerPhase, CareerProject, Milestone, CareerSpecialization, CareerJobRole, CareerLevel, SkillNode, CareerAttributeScore } from '../../types/careers';
export { CAREER_LEVELS, levelFor, careerAttributes } from '../../types/careers';

export const careers: CareerPath[] = [
  aiEngineer,
  mlEngineer,
  dataScientist,
  dataEngineer,
  softwareEngineer,
  fullStack,
  backend,
  cloudDevops,
  mlops,
  cybersecurity,
  dataAnalyst,
  llmEngineer,
  frontend,
  mobile,
  embedded,
];

/** Lexicographic, human-friendly ordering for the hub. */
export const careersByTitle: CareerPath[] = [...careers].sort((a, b) => a.title.localeCompare(b.title));

export function getCareer(id: string | undefined): CareerPath | undefined {
  return careers.find((c) => c.id === id);
}

/** Core roadmap (first 12) vs optional tracks (last 3). */
export const coreCareers = careers.filter((c) => c.id !== 'frontend' && c.id !== 'mobile' && c.id !== 'embedded');
export const optionalCareers = careers.filter((c) => c.id === 'frontend' || c.id === 'mobile' || c.id === 'embedded');

export function totalPhases(c: CareerPath): number {
  return c.phases.length;
}

export function allSkills(c: CareerPath): string[] {
  return [...new Set(c.phases.flatMap((p) => p.skills))];
}

/** Combined estimated study time across phases, for the progress model. */
export function totalSkillHours(c: CareerPath): number {
  const weeks = c.phases.reduce((acc, p) => acc + (parseFloat(String(p.estimatedTime).replace(/[^\d.]/g, '')) || 0), 0);
  return Math.round(weeks * 6);
}