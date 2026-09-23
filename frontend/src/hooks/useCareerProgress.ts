import { useLocalStorage } from './useLocalStorage';

export interface CareerProgressState {
  completedPhases: string[];
  /** Skills the learner already knows — powers the adaptive "skip/test out" flow. */
  knownSkills: string[];
  completedProjects: string[];
  hours: number;
  streak: number;
  lastActiveDay: string;
  confidence: Record<string, number>;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function initial(): CareerProgressState {
  return {
    completedPhases: [],
    knownSkills: [],
    completedProjects: [],
    hours: 0,
    streak: 0,
    lastActiveDay: '',
    confidence: {},
  };
}

export interface CareerProgressApi {
  state: CareerProgressState;
  togglePhase: (phaseId: string) => void;
  toggleSkill: (skill: string) => void;
  toggleProject: (projectId: string) => void;
  addHours: (n: number) => void;
  setConfidence: (skill: string, value: number) => void;
  reset: () => void;
  /** Fraction 0–1 of phases completed. */
  fraction: number;
  /** Skills the learner has already marked known, across all phases. */
  knownCount: number;
}

/**
 * Per-career progress, persisted to localStorage.
 * Everything is derived from state — there's no server yet, and no need for one.
 */
export function useCareerProgress(pathId: string, totalPhases = 0): CareerProgressApi {
  const key = `zuno:career:${pathId}`;
  const [state, setState] = useLocalStorage<CareerProgressState>(key, initial());

  function touch() {
    const today = todayKey();
    setState((s) => {
      const streak = s.lastActiveDay === today ? s.streak : s.lastActiveDay === todayKeyMinusOne() ? s.streak + 1 : 1;
      return { ...s, streak, lastActiveDay: today };
    });
  }

  function togglePhase(phaseId: string) {
    touch();
    setState((s) => ({
      ...s,
      completedPhases: s.completedPhases.includes(phaseId) ? s.completedPhases.filter((p) => p !== phaseId) : [...s.completedPhases, phaseId],
    }));
  }

  function toggleSkill(skill: string) {
    touch();
    setState((s) => ({
      ...s,
      knownSkills: s.knownSkills.includes(skill) ? s.knownSkills.filter((k) => k !== skill) : [...s.knownSkills, skill],
    }));
  }

  function toggleProject(projectId: string) {
    touch();
    setState((s) => ({
      ...s,
      completedProjects: s.completedProjects.includes(projectId) ? s.completedProjects.filter((p) => p !== projectId) : [...s.completedProjects, projectId],
    }));
  }

  function addHours(n: number) {
    touch();
    setState((s) => ({ ...s, hours: s.hours + n }));
  }

  function setConfidence(skill: string, value: number) {
    setState((s) => ({ ...s, confidence: { ...s.confidence, [skill]: value } }));
  }

  function reset() {
    setState(initial());
  }

  return {
    state,
    togglePhase,
    toggleSkill,
    toggleProject,
    addHours,
    setConfidence,
    reset,
    fraction: totalPhases > 0 ? Math.min(1, state.completedPhases.length / totalPhases) : 0,
    knownCount: state.knownSkills.length,
  };
}

function todayKeyMinusOne(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}