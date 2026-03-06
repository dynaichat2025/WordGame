import { supabase } from '../lib/supabase'
import type { Student, PlayerRecord, Difficulty } from '../types'
import { getPoolForDifficulty, shuffle } from './questions'

export async function loadStudents(): Promise<Student[]> {
  const { data } = await supabase.from('students').select('*').order('name')
  return (data ?? []).map(r => ({ id: r.id, name: r.name, class: r.class, pin: r.pin }))
}

export async function addStudent(name: string, cls: string, pin: string): Promise<void> {
  await supabase.from('students').insert({ id: String(Date.now()), name: name.trim(), class: cls.trim(), pin: pin.trim() })
}

export async function removeStudent(id: string): Promise<void> {
  await supabase.from('students').delete().eq('id', id)
}

export async function saveGameRecord(record: PlayerRecord): Promise<number | null> {
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
    })
    .select('id')
    .single()
  return data?.id ?? null
}

export async function loadLeaderboard(): Promise<PlayerRecord[]> {
  const { data } = await supabase
    .from('game_records')
    .select('*')
    .order('score', { ascending: false })
    .limit(10)
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

export async function loadAllRecords(): Promise<PlayerRecord[]> {
  const { data } = await supabase
    .from('game_records')
    .select('*')
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
  const pool = getPoolForDifficulty(difficulty)
  const masteredIds = await loadMastery(studentId, difficulty)
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

export function calcStats(records: PlayerRecord[]) {
  if (records.length === 0) return null
  const avgAccuracy = Math.round(
    records.reduce((s, r) => s + (r.correct / r.total) * 100, 0) / records.length
  )
  const bestScore = Math.max(...records.map(r => r.score))
  return { attempts: records.length, avgAccuracy, bestScore, lastDate: records[0].date }
}
