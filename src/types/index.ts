export type Difficulty = 'easy' | 'normal' | 'hard' | 'daejanggeum' | 'math' | 'proverb' | 'engproverb'

export interface Question {
  id: number
  sentence: string
  word: string
  options: [string, string, string, string]
  answer: 0 | 1 | 2 | 3
  difficulty: Difficulty
}

export interface Student {
  id: string
  name: string
  class: string
  pin: string
}

export interface PlayerRecord {
  studentId?: string
  nickname: string
  score: number
  correct: number
  total: number
  difficulty: Difficulty
  date: string
  _id?: number  // 고유 식별자 (timestamp), 중복 순위 탐색 방지용
}

export type Screen = 'start' | 'quiz' | 'result' | 'teacher'
