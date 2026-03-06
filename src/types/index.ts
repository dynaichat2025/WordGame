export type Difficulty = 'easy' | 'normal' | 'hard'

export interface Question {
  id: number
  sentence: string
  word: string
  options: [string, string, string, string]
  answer: 0 | 1 | 2 | 3
  difficulty: Difficulty
}

export interface PlayerRecord {
  nickname: string
  score: number
  correct: number
  total: number
  difficulty: Difficulty
  date: string
}

export type Screen = 'start' | 'quiz' | 'result'
