# Quiz Data Generator Memory

## Current State of questions.ts
- Total questions: 1100
- Last id used: 1100
- Per-difficulty counts:
  - easy: 368
  - normal: 368
  - hard: 364
- All duplicates resolved as of 2026-03-06

## File Structure
- Path: /Volumes/AppDrive/WIP/Claude Code/WordGame/src/data/questions.ts
- Import: `import type { Question, Difficulty } from '../types'`
- Export: `export const questions: Question[] = [...]`
- Helper functions after array: DIFFICULTY_MAP, shuffle, getQuestions
- Each question block ends with trailing comma after difficulty field

## Edit Strategy
- For large batches (600+): write temp part files, then use Python to insert before closing `]`
- Python insertion pattern: find `"    difficulty: 'hard',\n  },\n]"` at file end and replace
- For small additions (30개 이하): use Edit tool directly, replacing the last `},\n]` block
- For in-place replacements: parse with regex pattern `\{[^{}]*?id:\s*(\d+),[^{}]*?difficulty:\s*'[^']+',?\s*\n\s*\}` (DOTALL), replace in reverse id order to preserve positions
- Always delete temp files after merging

## Duplicate Repair (2026-03-06)
- Repaired 55 duplicate word entries + 2 identical sentence pairs + 1 word-not-in-sentence (id=501)
- id=501: sentence changed from '낫다' form to '나았다' to match word field
- After repair: zero duplicate IDs, zero duplicate words, zero duplicate sentences, all word-in-sentence checks pass

## Quality Notes
- answer distribution: aim for even spread of 0,1,2,3 across questions
- easy: familiar daily life words, short simple sentences, onomatopoeia and mimetic words work well
- normal: social/academic context, moderate complexity
- hard: literary/academic vocabulary, nuanced meaning
- Always verify word appears exactly as token in sentence before writing
- answer: 1 tends to dominate — consciously vary to 0, 2, 3 in future batches
- Duplicate-prone words to avoid: 두근두근, 꾸준히, 긍정적인, 성실하게, 살며시, 묵묵히, 적극적인, 자발적인, 통찰 (already used)
- When picking new words, always run conflict check against existing_words set before finalizing

## Validation Workflow (canonical)
1. Parse with regex, extract ids/words/sentences into lists
2. Check Counter for duplicates in each
3. Check word-in-sentence with DOTALL pattern across all 1100 questions
4. Check ID sequence for gaps
5. Report all issues with specific ids

## Words Already Used
See words-used.md for full list (1100 unique words as of 2026-03-06).
