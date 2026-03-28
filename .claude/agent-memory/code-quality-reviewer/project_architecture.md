---
name: Project architecture and question data pipeline
description: Core data flow for question loading, shuffling, and quiz rendering in WordGame
type: project
---

Quiz question data pipeline:

- Question data files: `src/data/questions-{difficulty}.ts` — each exports a typed array of `Question` objects
- Question type (`src/types/index.ts`): `{ id, sentence, word, options: [string,string,string,string], answer: 0|1|2|3, difficulty }`
- Central loader (`src/data/questions.ts`): exports `shuffle<T>()` (Fisher-Yates), `getQuestions()`, `getPoolForDifficulty()`. Questions are lazy-loaded via dynamic import and cached per difficulty.
- `getQuestions()` calls `shuffle(pool)` to randomize which questions are drawn, but does NOT shuffle the options array within each question.
- `QuizScreen.tsx` renders `current.options` in-order and uses `current.answer` as the correct index. No option shuffling happens at render time.

**Why this matters:** The `answer` index in each question object is the source of truth for correctness. If options are shuffled without updating `answer`, questions break silently.
