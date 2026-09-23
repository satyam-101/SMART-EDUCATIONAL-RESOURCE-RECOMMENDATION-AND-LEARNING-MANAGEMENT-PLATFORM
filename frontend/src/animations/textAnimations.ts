import { ease, duration } from '../config/motionConfig';

/** Split text into lines (by breakpoints) for line-by-line reveals. */
export function splitLines(text: string): string[] {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Split a phrase into words, keeping default spacing safe. */
export function splitWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

/** Split a word into characters (emoji-pair safe enough for layout). */
export function splitChars(word: string): string[] {
  return Array.from(word);
}

export const textDefaults = {
  duration: duration.emphasis,
  ease: ease.out,
};