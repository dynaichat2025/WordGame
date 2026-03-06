import { supabase } from '../lib/supabase'
import type { Student, PlayerRecord } from '../types'

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

export function calcStats(records: PlayerRecord[]) {
  if (records.length === 0) return null
  const avgAccuracy = Math.round(
    records.reduce((s, r) => s + (r.correct / r.total) * 100, 0) / records.length
  )
  const bestScore = Math.max(...records.map(r => r.score))
  return { attempts: records.length, avgAccuracy, bestScore, lastDate: records[0].date }
}
