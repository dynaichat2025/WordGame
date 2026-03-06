# Quiz Data Generator Memory

## Current State of questions.ts
- Total questions: 320 (20 original + 300 added)
- Last id used: 320
- Per-difficulty counts:
  - easy: 108 (original 8 + added 100, ids 1-8 and 21-120)
  - normal: 108 (original 8 + added 100, ids 9-16 and 121-220)
  - hard: 104 (original 4 + added 100, ids 17-20 and 221-320)

## File Structure
- Path: /Volumes/AppDrive/WIP/Claude Code/WordGame/src/data/questions.ts
- Import: `import type { Question, Difficulty } from '../types'`
- Export: `export const questions: Question[] = [...]`
- Helper functions after array: DIFFICULTY_MAP, shuffle, getQuestions

## Edit Strategy
- Use Edit tool targeting `// hard (5학년)` comment block to insert before existing hard questions
- New question blocks are inserted in order: easy additions, then normal additions, then hard additions
- All new additions placed before the original id 17-20 hard questions

## Words Already Used (do not reuse)
See words-used.md for full list.

## Quality Notes
- answer distribution: aim for even spread of 0,1,2,3 across questions
- easy: familiar daily life words, short simple sentences
- normal: social/academic context, moderate complexity
- hard: literary/academic vocabulary, nuanced meaning
- Always verify word appears exactly as token in sentence before writing
