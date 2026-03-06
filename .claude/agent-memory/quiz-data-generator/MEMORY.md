# Quiz Data Generator Memory

## Current State of questions.ts
- Total questions: 920 (20 original + 900 added)
- Last id used: 920
- Per-difficulty counts:
  - easy: 308 (original 8 + added 300, ids 1-8, 21-120, 321-520)
  - normal: 308 (original 8 + added 300, ids 9-16, 121-220, 521-720)
  - hard: 304 (original 4 + added 300, ids 17-20, 221-320, 721-920)

## File Structure
- Path: /Volumes/AppDrive/WIP/Claude Code/WordGame/src/data/questions.ts
- Import: `import type { Question, Difficulty } from '../types'`
- Export: `export const questions: Question[] = [...]`
- Helper functions after array: DIFFICULTY_MAP, shuffle, getQuestions

## Edit Strategy
- For large batches (600+): write temp part files, then use Python to insert before closing `]`
- Python insertion pattern: find `"    difficulty: 'hard',\n  },\n]"` at file end and replace
- For small additions: use Edit tool directly
- New question blocks appended just before the `]` that closes the questions array

## Words Already Used (do not reuse)
See words-used.md for full list.

## Quality Notes
- answer distribution: aim for even spread of 0,1,2,3 across questions
- easy: familiar daily life words, short simple sentences
- normal: social/academic context, moderate complexity
- hard: literary/academic vocabulary, nuanced meaning
- Always verify word appears exactly as token in sentence before writing
