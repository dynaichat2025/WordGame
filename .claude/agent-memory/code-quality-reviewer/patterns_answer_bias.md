---
name: Answer position bias in question data files
description: Most question files have a heavy answer:1 bias; questions-kpdh.ts was manually shuffled to fix this
type: project
---

Answer distribution by file (measured 2026-03-24):

| File                    | total | 0   | 1   | 2   | 3   |
|-------------------------|-------|-----|-----|-----|-----|
| questions-easy.ts       | 368   | 12  | 275 | 79  | 2   |
| questions-normal.ts     | 368   | 5   | 285 | 73  | 5   |
| questions-hard.ts       | 364   | 5   | 252 | 103 | 4   |
| questions-engproverb.ts | 43    | 0   | 43  | 0   | 0   |
| questions-proverb.ts    | 50    | 0   | 50  | 0   | 0   |
| questions-daejanggeum.ts| 134   | 43  | 65  | 19  | 7   |
| questions-kpdh.ts       | 251   | 69  | 67  | 64  | 51  |
| questions-math.ts       | 59    | 0   | 12  | 44  | 3   |

questions-easy, normal, hard, engproverb, and proverb all have a severe answer:1 concentration (~70-100% of questions). The correct answer is almost always option index 1 in those files.

The recent change to questions-kpdh.ts was a manual shuffle to redistribute answer positions — the only file where this was done.

**How to apply:** When reviewing question data edits, flag answer position bias in other files. The systemic fix would be runtime option shuffling in `getQuestions()` rather than per-file manual shuffling.
