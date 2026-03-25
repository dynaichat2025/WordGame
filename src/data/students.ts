import { supabase } from '../lib/supabase'
import type { Student, PlayerRecord, Difficulty, QuestionReport } from '../types'
import type { AnswerRecord } from '../App'
import { getPoolForDifficulty, shuffle } from './questions'

export async function loadStudents(): Promise<Student[]> {
  const { data } = await supabase.from('students').select('id,name,class,pin').order('name')
  return (data ?? []).map(r => ({ id: r.id, name: r.name, class: r.class, pin: r.pin }))
}

export async function addStudent(name: string, cls: string, pin: string): Promise<void> {
  await supabase.from('students').insert({ id: String(Date.now()), name: name.trim(), class: cls.trim(), pin: pin.trim() })
}

export async function removeStudent(id: string): Promise<void> {
  await supabase.from('students').delete().eq('id', id)
}

export async function saveGameRecord(record: PlayerRecord, answers?: AnswerRecord[]): Promise<number | null> {
  const answersJson = answers?.map(a => ({
    questionId: a.question.id,
    word: a.question.word,
    sentence: a.question.sentence,
    options: a.question.options,
    answer: a.question.answer,
    selected: a.selected,
    isCorrect: a.isCorrect,
  }))
  const { data } = await supabase
    .from('game_records')
    .insert({
      student_id: record.studentId ?? null,
      nickname: record.nickname,
      score: record.score,
      correct: record.correct,
      total: record.total,
      difficulty: record.difficulty,
      date: record.date,
      answers: answersJson ?? null,
    })
    .select('id')
    .single()
  // 새 기록 저장 시 리더보드 캐시 무효화
  leaderboardCache = null
  return data?.id ?? null
}

export async function loadRecordAnswers(recordId: number): Promise<AnswerRecord[] | null> {
  const { data } = await supabase
    .from('game_records')
    .select('answers')
    .eq('id', recordId)
    .single()
  if (!data?.answers) return null
  return (data.answers as Array<{
    questionId: number; word: string; sentence: string;
    options: [string, string, string, string]; answer: 0 | 1 | 2 | 3;
    selected: number | 'timeout'; isCorrect: boolean
  }>).map(a => ({
    question: { id: a.questionId, word: a.word, sentence: a.sentence, options: a.options, answer: a.answer, difficulty: 'easy' as Difficulty },
    selected: a.selected,
    isCorrect: a.isCorrect,
  }))
}

// --- 리더보드 인메모리 캐시 (30초 TTL) ---
let leaderboardCache: { data: PlayerRecord[]; timestamp: number } | null = null
const LEADERBOARD_TTL = 30_000

export async function loadLeaderboard(): Promise<PlayerRecord[]> {
  if (leaderboardCache && Date.now() - leaderboardCache.timestamp < LEADERBOARD_TTL) {
    return leaderboardCache.data
  }
  const { data } = await supabase
    .from('game_records')
    .select('id,student_id,nickname,score,correct,total,difficulty,date')
    .order('score', { ascending: false })
    .limit(10)
  const records = (data ?? []).map(r => ({
    studentId: r.student_id,
    nickname: r.nickname,
    score: r.score,
    correct: r.correct,
    total: r.total,
    difficulty: r.difficulty,
    date: r.date,
    _id: r.id,
  }))
  leaderboardCache = { data: records, timestamp: Date.now() }
  return records
}

export async function loadAllRecords(): Promise<PlayerRecord[]> {
  const { data } = await supabase
    .from('game_records')
    .select('id,student_id,nickname,score,correct,total,difficulty,date')
    .order('created_at', { ascending: false })
  return (data ?? []).map(r => ({
    studentId: r.student_id,
    nickname: r.nickname,
    score: r.score,
    correct: r.correct,
    total: r.total,
    difficulty: r.difficulty,
    date: r.date,
    _id: r.id,
  }))
}

export async function loadMastery(studentId: string, difficulty: Difficulty): Promise<Set<number>> {
  const { data } = await supabase
    .from('student_mastery')
    .select('question_id')
    .eq('student_id', studentId)
    .eq('difficulty', difficulty)
    .eq('mastered', true)
  return new Set((data ?? []).map((r: { question_id: number }) => r.question_id))
}

export async function updateMastery(
  studentId: string,
  difficulty: Difficulty,
  results: { questionId: number; isCorrect: boolean }[]
): Promise<void> {
  if (results.length === 0) return
  await supabase.from('student_mastery').upsert(
    results.map(r => ({
      student_id: studentId,
      question_id: r.questionId,
      difficulty,
      mastered: r.isCorrect,
    })),
    { onConflict: 'student_id,question_id,difficulty' }
  )
}

export async function getQuestionsForStudent(difficulty: Difficulty, studentId: string, count = 10) {
  const [pool, masteredIds] = await Promise.all([
    getPoolForDifficulty(difficulty),
    loadMastery(studentId, difficulty),
  ])
  const unmastered = pool.filter(q => !masteredIds.has(q.id))

  if (unmastered.length === 0) {
    // 전체 마스터 → 전체 풀에서 랜덤
    return shuffle(pool).slice(0, count)
  }
  if (unmastered.length >= count) {
    // 미마스터 문제가 충분 → 미마스터만
    return shuffle(unmastered).slice(0, count)
  }
  // 미마스터 < count → 미마스터 전부 + 마스터로 채움
  const mastered = pool.filter(q => masteredIds.has(q.id))
  return shuffle([...unmastered, ...shuffle(mastered).slice(0, count - unmastered.length)])
}

// --- 문제 신고 ---
export async function reportQuestion(params: {
  questionId: number
  difficulty: Difficulty
  word: string
  sentence: string
  reporterName: string
  reason: string
}): Promise<void> {
  await supabase.from('question_reports').insert({
    question_id: params.questionId,
    difficulty: params.difficulty,
    word: params.word,
    sentence: params.sentence,
    reporter_name: params.reporterName,
    reason: params.reason,
  })
}

export async function loadReports(): Promise<QuestionReport[]> {
  const { data } = await supabase
    .from('question_reports')
    .select('*')
    .order('created_at', { ascending: false })
  return (data ?? []).map(r => ({
    id: r.id,
    questionId: r.question_id,
    difficulty: r.difficulty,
    word: r.word,
    sentence: r.sentence,
    reporterName: r.reporter_name,
    reason: r.reason,
    resolved: r.resolved,
    createdAt: r.created_at,
  }))
}

export async function resolveReport(id: number, resolved: boolean): Promise<void> {
  await supabase.from('question_reports').update({ resolved }).eq('id', id)
}

export function calcStats(records: PlayerRecord[]) {
  if (records.length === 0) return null
  const avgAccuracy = Math.round(
    records.reduce((s, r) => s + (r.correct / r.total) * 100, 0) / records.length
  )
  const bestScore = Math.max(...records.map(r => r.score))
  return { attempts: records.length, avgAccuracy, bestScore, lastDate: records[0].date }
}
