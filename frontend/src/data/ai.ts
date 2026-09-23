export const mockAIPrompts = [
  'Explain the useEffect mental model simply',
  'Generate a 20-minute revision plan for this week',
  'Quiz me on React Hooks concepts',
  'Explain why I keep confusing useState and useReducer',
  'Turn my sketchy idea into a learning roadmap',
  'Debug this: my state resets on every re-render',
];

export const mockAIReplies = [
  "Here's the mental model I'd use:\n\n`useEffect` runs *after* render — it's a bridge, not a state manager. Think of it in three questions:\n1. What changed? → the dependency array\n2. When should the world react? → after paint\n3. What do I clean up? → the returned function\n\nConcretely: fetch data, subscribe to a store, or sync with the DOM. If you're deriving values from props, you usually don't need an effect at all. Want me to walk through a real example with your project?",
  'Great — here is a tight 20-minute window:\n\n- **0:00–5:00** quick flashcards on the last 3 lessons\n- **5:00–12:00** rewatch the "useEffect — the mental model" video at 1.5×\n- **12:00–18:00** do 3 spaced-repetition practice drills\n- **18:00–20:00** write one sentence summarizing the *why* behind each topic\n\nConsistency beats intensity. Schedule this at your highest-energy slot.',
  'Pop quiz time — two questions, ten seconds each:\n\n1. Which hook lets you skip re-creation of a value until its dependencies change?\n2. When a component re-renders, does `useState` preserve its value?\n\nScore yourself: `useMemo` for the first, and *yes* for the second. Want 5 more at a slightly harder level?',
  'The confusion is common — they sit on a spectrum:\n\n- `useState`: local, simple updates (a toggle, a string)\n- `useReducer`: related state that changes via *actions*, where the update logic is nontrivial\n\nRule of thumb: when calling `setState` five times in one handler feels wrong, a reducer is telling you something. I can draft a reducer for your exact case if you describe the state shape.',
  'I can turn that into a roadmap! Give me your goal and roughly how much time you can commit per week. I will then:\n\n1. Split the goal into weekly milestones\n2. Map each milestone to concrete courses and practice here\n3. Suggest the first 15-minute action you can take today\n\nStart with one sentence describing the goal.',
  'Ah, the classic disappearing-state mystery. When state resets on re-render, the usual suspects are:\n\n1. The component is mounting fresh (key changed / remount)\n2. State is being lifted into a new position in the tree\n3. You are calling `setState` in an effect with an empty dependency array\n\nShow me the component and I will give you the exact fix.',
];

export const initialChatMessages = [
  {
    id: 'seed-1',
    role: 'ai' as const,
    content:
      "Hey Aarav, I'm Zura — your AI tutor. I've reviewed your goal of becoming a Full Stack Developer. You're 45% through React Mastery and 68% through Backend Engineering. Ask me anything, or tap a suggestion below to get started.",
    time: 'Just now',
  },
];