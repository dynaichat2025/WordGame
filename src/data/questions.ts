import type { Question, Difficulty } from '../types'

const DIFFICULTY_MAP: Record<Difficulty, Difficulty[]> = {
  easy: ['easy'],
  normal: ['easy', 'normal'],
  hard: ['easy', 'normal', 'hard'],
  daejanggeum: ['daejanggeum'],
  math: ['math'],
  proverb: ['proverb'],
  engproverb: ['engproverb'],
}

// Fisher-Yates 셔플 (균일한 무작위성 보장)
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// 난이도별 dynamic import 로더
const loaders: Record<Difficulty, () => Promise<Question[]>> = {
  easy: () => import('./questions-easy').then(m => m.easyQuestions),
  normal: () => import('./questions-normal').then(m => m.normalQuestions),
  hard: () => import('./questions-hard').then(m => m.hardQuestions),
  daejanggeum: () => import('./questions-daejanggeum').then(m => m.daejanggeumQuestions),
  math: () => import('./questions-math').then(m => m.mathQuestions),
  proverb: () => import('./questions-proverb').then(m => m.proverbQuestions),
  engproverb: () => import('./questions-engproverb').then(m => m.engproverbQuestions),
}

// 캐시: 한 번 로드된 난이도는 재사용
const cache = new Map<Difficulty, Question[]>()

async function loadQuestions(difficulty: Difficulty): Promise<Question[]> {
  if (cache.has(difficulty)) return cache.get(difficulty)!
  const questions = await loaders[difficulty]()
  cache.set(difficulty, questions)
  return questions
}

export async function getPoolForDifficulty(difficulty: Difficulty): Promise<Question[]> {
  const levels = DIFFICULTY_MAP[difficulty]
  const pools = await Promise.all(levels.map(loadQuestions))
  return pools.flat()
}

export async function getQuestions(difficulty: Difficulty, count = 10): Promise<Question[]> {
  const pool = await getPoolForDifficulty(difficulty)
  const shuffled = shuffle(pool)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
