import { useState, useEffect, useMemo } from 'react'
import type { Student, PlayerRecord, QuestionReport } from '../types'
import type { AnswerRecord } from '../App'
import { loadStudents, addStudent, removeStudent, loadAllRecords, calcStats, loadRecordAnswers, loadReports, resolveReport } from '../data/students'
import NoteCard from './NoteCard'
import TabPills from './TabPills'

import { DIFFICULTY_LABEL } from '../constants/difficulty'

type MainTab = 'students' | 'progress' | 'reports'
type DetailTab = 'wrong' | 'correct'

function gradeOf(correct: number, total: number) {
  const pct = (correct / total) * 100
  return pct >= 90 ? 'S' : pct >= 70 ? 'A' : pct >= 50 ? 'B' : 'C'
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob(['\uFEFF' + content], { type: `${type};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function formatAnswersForText(answers: AnswerRecord[], studentName: string, record: PlayerRecord): string {
  const wrong = answers.filter(a => !a.isCorrect)
  const correct = answers.filter(a => a.isCorrect)
  const lines: string[] = [
    `학생: ${studentName}`,
    `점수: ${record.score}점 | ${record.correct}/${record.total}문제 (${Math.round((record.correct / record.total) * 100)}%)`,
    `난이도: ${DIFFICULTY_LABEL[record.difficulty]} | 날짜: ${record.date}`,
    '',
    `=== 오답노트 (${wrong.length}개) ===`,
  ]
  if (wrong.length === 0) {
    lines.push('오답 없음')
  } else {
    wrong.forEach((a, i) => {
      const sel = a.selected === 'timeout' ? '시간 초과' : a.question.options[a.selected as number]
      lines.push(`${i + 1}. 문장: ${a.question.sentence}`)
      lines.push(`   단어: ${a.question.word}`)
      lines.push(`   정답: ${a.question.options[a.question.answer]}`)
      lines.push(`   선택: ${sel}`)
      lines.push('')
    })
  }
  lines.push('')
  lines.push(`=== 정답노트 (${correct.length}개) ===`)
  if (correct.length === 0) {
    lines.push('정답 없음')
  } else {
    correct.forEach((a, i) => {
      lines.push(`${i + 1}. 문장: ${a.question.sentence}`)
      lines.push(`   단어: ${a.question.word}`)
      lines.push(`   정답: ${a.question.options[a.question.answer]}`)
      lines.push('')
    })
  }
  return lines.join('\n')
}

function formatAnswersForCsv(answers: AnswerRecord[]): string {
  const header = '번호,정오답,문장,단어,정답,선택'
  const rows = answers.map((a, i) => {
    const sel = a.selected === 'timeout' ? '시간 초과' : a.question.options[a.selected as number]
    const esc = (s: string) => `"${s.replace(/"/g, '""')}"`
    return [
      i + 1,
      a.isCorrect ? 'O' : 'X',
      esc(a.question.sentence),
      esc(a.question.word),
      esc(a.question.options[a.question.answer]),
      esc(sel),
    ].join(',')
  })
  return [header, ...rows].join('\n')
}

function downloadPdf(answers: AnswerRecord[], studentName: string, record: PlayerRecord) {
  const wrong = answers.filter(a => !a.isCorrect)
  const correct = answers.filter(a => a.isCorrect)

  const renderSection = (title: string, items: AnswerRecord[], isWrong: boolean) => {
    if (items.length === 0) return `<h2 style="color:#888;margin-top:24px;">${title} - 없음</h2>`
    return `<h2 style="margin-top:24px;">${title}</h2>` + items.map((a) => {
      const sel = a.selected === 'timeout' ? '시간 초과' : a.question.options[a.selected as number]
      return `<div style="border:1px solid ${isWrong ? '#fca5a5' : '#86efac'};border-radius:8px;padding:12px;margin:8px 0;background:${isWrong ? '#fef2f2' : '#f0fdf4'}">
        <p style="color:#666;font-size:12px;margin:0 0 4px;">문장</p>
        <p style="font-size:15px;margin:0 0 8px;"><b>${a.question.word}</b> - ${a.question.sentence}</p>
        <p style="margin:2px 0;"><span style="color:#16a34a;font-weight:bold;">정답:</span> ${a.question.options[a.question.answer]}</p>
        ${isWrong ? `<p style="margin:2px 0;"><span style="color:#ef4444;font-weight:bold;">선택:</span> ${sel}</p>` : ''}
      </div>`
    }).join('')
  }

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>학습 기록</title>
    <style>body{font-family:-apple-system,sans-serif;max-width:700px;margin:0 auto;padding:20px;} @media print{body{padding:0;}}</style>
    </head><body>
    <h1 style="font-size:20px;margin-bottom:4px;">${studentName} - 학습 기록</h1>
    <p style="color:#666;">${record.score}점 | ${record.correct}/${record.total}문제 (${Math.round((record.correct / record.total) * 100)}%) | ${DIFFICULTY_LABEL[record.difficulty]} | ${record.date}</p>
    ${renderSection(`오답노트 (${wrong.length}개)`, wrong, true)}
    ${renderSection(`정답노트 (${correct.length}개)`, correct, false)}
    <script>window.onload=()=>{window.print();}</script>
    </body></html>`

  const w = window.open('', '_blank')
  if (w) { w.document.write(html); w.document.close() }
}

interface Props {
  onClose: () => void
}

export default function TeacherScreen({ onClose }: Props) {
  const [unlocked, setUnlocked] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)

  const [tab, setTab] = useState<MainTab>('students')
  const [students, setStudents] = useState<Student[]>([])
  const [allRecords, setAllRecords] = useState<PlayerRecord[]>([])
  const [reports, setReports] = useState<QuestionReport[]>([])
  const [dataLoading, setDataLoading] = useState(false)

  const [newName, setNewName] = useState('')
  const [newClass, setNewClass] = useState('')
  const [newPin, setNewPin] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [detailRecord, setDetailRecord] = useState<PlayerRecord | null>(null)
  const [detailAnswers, setDetailAnswers] = useState<AnswerRecord[] | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [resolvingId, setResolvingId] = useState<number | null>(null)

  const unresolvedCount = useMemo(() => reports.filter(r => !r.resolved).length, [reports])
  const [detailTab, setDetailTab] = useState<DetailTab>('wrong')

  useEffect(() => {
    if (!unlocked) return
    setDataLoading(true)
    Promise.all([loadStudents(), loadAllRecords(), loadReports()])
      .then(([s, r, rp]) => {
        setStudents(s)
        setAllRecords(r)
        setReports(rp)
      })
      .catch(e => console.error('Teacher data load failed', e))
      .finally(() => setDataLoading(false))
  }, [unlocked])

  const handlePinSubmit = () => {
    if (pinInput === import.meta.env.VITE_TEACHER_PIN) {
      setUnlocked(true)
    } else {
      setPinError(true)
      setPinInput('')
    }
  }

  const handleAdd = async () => {
    if (!newName.trim() || !newPin.trim()) return
    await addStudent(newName, newClass, newPin)
    setStudents(await loadStudents())
    setNewName('')
    setNewClass('')
    setNewPin('')
  }

  const handleRemove = async (id: string) => {
    if (confirmDeleteId === id) {
      await removeStudent(id)
      setStudents(await loadStudents())
      if (selectedId === id) setSelectedId(null)
      setConfirmDeleteId(null)
    } else {
      setConfirmDeleteId(id)
    }
  }

  const studentRecords = (id: string) => allRecords.filter(r => r.studentId === id)
  const selectedStudent = students.find(s => s.id === selectedId)
  const selectedRecords = selectedId ? studentRecords(selectedId) : []

  const handleRecordClick = async (record: PlayerRecord) => {
    if (!record._id) return
    setDetailRecord(record)
    setDetailTab('wrong')
    setDetailLoading(true)
    const answers = await loadRecordAnswers(record._id)
    setDetailAnswers(answers)
    setDetailLoading(false)
  }

  const wrongAnswers = useMemo(() => detailAnswers?.filter(a => !a.isCorrect) ?? [], [detailAnswers])
  const correctAnswers = useMemo(() => detailAnswers?.filter(a => a.isCorrect) ?? [], [detailAnswers])

  return (
    <div className="min-h-screen bg-uber-white flex items-center justify-center p-4">
      <div className="bg-uber-white rounded-card shadow-card p-6 w-full max-w-sm">

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="font-display text-2xl font-bold text-uber-black">선생님 대시보드</div>
            <div className="caption text-body-gray mt-1">{unlocked ? '학생 관리 및 학습 현황' : 'PIN을 입력하세요'}</div>
          </div>
          <button onClick={onClose} className="text-2xl text-uber-black hover:text-body-gray leading-none">×</button>
        </div>

        {/* PIN 입력 */}
        {!unlocked ? (
          <div className="flex flex-col gap-3 mt-2">
            <input
              type="password"
              value={pinInput}
              onChange={e => { setPinInput(e.target.value); setPinError(false) }}
              onKeyDown={e => e.key === 'Enter' && handlePinSubmit()}
              placeholder="PIN 입력"
              className="input text-center text-2xl tracking-widest"
            />
            {pinError && <p className="caption text-feedback-wrong text-center">PIN이 틀렸어요.</p>}
            <button onClick={handlePinSubmit} className="btn btn-primary py-3">
              확인
            </button>
          </div>
        ) : dataLoading ? (
          <div className="text-center py-16 text-body-gray text-sm">불러오는 중</div>
        ) : (
          <>
            <TabPills
              className="mb-6"
              value={tab}
              onChange={setTab}
              items={[
                { key: 'students', label: '학생 관리' },
                { key: 'progress', label: '학습 현황' },
                { key: 'reports', label: `신고 ${unresolvedCount || ''}` },
              ]}
            />

            {/* 학생 관리 탭 */}
            {tab === 'students' && (
              <>
                <div className="flex gap-2 mb-4">
                  <input
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder="이름"
                    className="input flex-1 text-sm py-2"
                  />
                  <input
                    value={newClass}
                    onChange={e => setNewClass(e.target.value)}
                    placeholder="반"
                    className="input w-12 text-sm py-2 px-2"
                  />
                  <input
                    value={newPin}
                    onChange={e => setNewPin(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdd()}
                    placeholder="PIN"
                    className="input w-16 text-sm py-2 px-2"
                  />
                  <button onClick={handleAdd} className="btn btn-primary text-sm">
                    추가
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto flex flex-col gap-2 pr-1">
                  {students.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-sm text-body-gray">이름, 반, PIN을 입력하고 추가하세요.</p>
                    </div>
                  ) : (
                    students.map(s => {
                      const stats = calcStats(studentRecords(s.id))
                      return (
                        <div key={s.id} className="flex items-center gap-3 bg-uber-white border border-chip-gray rounded-card px-4 py-3">
                          <div className="w-8 h-8 bg-uber-black rounded-full flex items-center justify-center text-uber-white font-display font-bold text-sm shrink-0">
                            {s.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-uber-black text-sm truncate">
                              {s.name}{s.class ? ` · ${s.class}반` : ''} <span className="text-muted-gray font-normal">PIN: {s.pin}</span>
                            </div>
                            <div className="caption text-body-gray">
                              {stats ? `${stats.attempts}회 · 최고 ${stats.bestScore}점 · 평균 ${stats.avgAccuracy}%` : '기록 없음'}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemove(s.id)}
                            className={
                              confirmDeleteId === s.id
                                ? 'bg-feedback-wrong text-uber-white px-3 py-1 rounded-pill caption font-bold'
                                : 'text-body-gray hover:text-uber-black underline underline-offset-2 caption font-bold'
                            }
                          >
                            {confirmDeleteId === s.id ? '확인?' : '삭제'}
                          </button>
                        </div>
                      )
                    })
                  )}
                </div>
              </>
            )}

            {/* 문제 신고 탭 */}
            {tab === 'reports' && (
              <div className="max-h-72 overflow-y-auto flex flex-col gap-2 pr-1">
                {reports.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-sm text-body-gray">신고된 문제가 없어요.</p>
                  </div>
                ) : (
                  reports.map(r => (
                    <div
                      key={r.id}
                      className={`rounded-card p-4 text-sm ${r.resolved ? 'border border-chip-gray bg-chip-gray opacity-60' : 'border border-uber-black bg-uber-white'}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-bold text-uber-black">{r.word}</span>
                        <span className={`chip text-xs font-bold shrink-0 ${r.resolved ? 'bg-chip-gray text-body-gray' : 'bg-uber-black text-uber-white'}`}>
                          {r.resolved ? '처리됨' : '미처리'}
                        </span>
                      </div>
                      <p className="text-body-gray caption mb-1 leading-relaxed">{r.sentence}</p>
                      {r.reason && (
                        <p className="caption text-body-gray mb-1">사유: {r.reason}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="caption text-muted-gray">
                          {DIFFICULTY_LABEL[r.difficulty]} · {r.reporterName} · {new Date(r.createdAt).toLocaleDateString('ko-KR')}
                        </span>
                        <button
                          disabled={resolvingId === r.id}
                          onClick={async () => {
                            setResolvingId(r.id)
                            try {
                              await resolveReport(r.id, !r.resolved)
                              setReports(prev => prev.map(p => p.id === r.id ? { ...p, resolved: !r.resolved } : p))
                            } finally {
                              setResolvingId(null)
                            }
                          }}
                          className="caption font-bold text-body-gray hover:text-uber-black underline underline-offset-2 disabled:opacity-50"
                        >
                          {r.resolved ? '미처리로' : '처리 완료'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 학습 현황 탭 */}
            {tab === 'progress' && (
              !selectedId ? (
                <div className="max-h-72 overflow-y-auto flex flex-col gap-2 pr-1">
                  {students.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-sm text-body-gray">먼저 학생을 등록해주세요.</p>
                    </div>
                  ) : (
                    students.map(s => {
                      const stats = calcStats(studentRecords(s.id))
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSelectedId(s.id)}
                          className="flex items-center gap-3 bg-uber-white border border-chip-gray rounded-card px-4 py-3 hover:bg-chip-gray transition-colors text-left w-full"
                        >
                          <div className="w-9 h-9 bg-uber-black rounded-full flex items-center justify-center text-uber-white font-display font-bold text-sm shrink-0">
                            {s.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-uber-black text-sm">
                              {s.name}{s.class ? ` (${s.class}반)` : ''}
                            </div>
                            {stats ? (
                              <div className="caption text-body-gray">
                                {stats.attempts}회 · 평균 {stats.avgAccuracy}% · 최고 {stats.bestScore}점
                              </div>
                            ) : (
                              <div className="caption text-muted-gray">아직 게임 기록 없음</div>
                            )}
                          </div>
                          <span className="text-body-gray text-lg">›</span>
                        </button>
                      )
                    })
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="flex items-center gap-1 text-uber-black text-sm font-medium mb-4 hover:underline underline-offset-2"
                  >
                    ‹ 목록으로
                  </button>
                  <div className="font-display font-bold text-uber-black mb-4 text-sm">
                    {selectedStudent?.name}
                    {selectedStudent?.class ? ` (${selectedStudent.class}반)` : ''} 학습 기록
                    <span className="text-body-gray font-normal ml-1">총 {selectedRecords.length}회</span>
                  </div>
                  {!detailRecord ? (
                  <div className="max-h-64 overflow-y-auto flex flex-col gap-2 pr-1">
                    {selectedRecords.length === 0 ? (
                      <div className="text-center py-8 text-body-gray text-sm">아직 게임 기록이 없어요.</div>
                    ) : (
                      selectedRecords.map((r, i) => {
                        const grade = gradeOf(r.correct, r.total)
                        const accuracy = Math.round((r.correct / r.total) * 100)
                        return (
                          <button
                            key={i}
                            onClick={() => handleRecordClick(r)}
                            className="flex items-center gap-3 bg-uber-white border border-chip-gray rounded-card px-4 py-3 hover:bg-chip-gray transition-colors text-sm text-left w-full"
                          >
                            <span className="font-display font-bold text-lg w-6 shrink-0 text-uber-black">{grade}</span>
                            <div className="flex-1">
                              <div className="text-uber-black font-medium">
                                {r.score}점 · {r.correct}/{r.total}문제 ({accuracy}%)
                              </div>
                              <div className="caption text-body-gray">
                                {DIFFICULTY_LABEL[r.difficulty]} · {r.date}
                              </div>
                            </div>
                            <span className="text-body-gray text-lg">›</span>
                          </button>
                        )
                      })
                    )}
                  </div>
                  ) : (
                  <>
                    <button
                      onClick={() => { setDetailRecord(null); setDetailAnswers(null) }}
                      className="flex items-center gap-1 text-uber-black text-sm font-medium mb-4 hover:underline underline-offset-2"
                    >
                      ‹ 기록 목록으로
                    </button>
                    <div className="font-display font-bold text-uber-black mb-4 text-sm">
                      {detailRecord.score}점 · {detailRecord.correct}/{detailRecord.total}문제
                      <span className="text-body-gray font-normal ml-1">
                        {DIFFICULTY_LABEL[detailRecord.difficulty]} · {detailRecord.date}
                      </span>
                    </div>
                    {detailLoading ? (
                      <div className="text-center py-8 text-body-gray text-sm">불러오는 중</div>
                    ) : !detailAnswers ? (
                      <div className="text-center py-8 text-body-gray text-sm">이 기록에는 상세 답안 데이터가 없습니다.</div>
                    ) : (
                      <>
                        <div className="flex gap-2 mb-4">
                          {([
                            { label: 'PDF', onClick: () => downloadPdf(detailAnswers!, selectedStudent?.name ?? '', detailRecord) },
                            { label: 'CSV', onClick: () => downloadFile(`${selectedStudent?.name}_${detailRecord.date}.csv`, formatAnswersForCsv(detailAnswers!), 'text/csv') },
                            { label: 'TXT', onClick: () => downloadFile(`${selectedStudent?.name}_${detailRecord.date}.txt`, formatAnswersForText(detailAnswers!, selectedStudent?.name ?? '', detailRecord), 'text/plain') },
                          ]).map(b => (
                            <button key={b.label} onClick={b.onClick} className="btn btn-secondary flex-1 text-xs py-2">
                              {b.label}
                            </button>
                          ))}
                        </div>
                        <TabPills
                          className="mb-4"
                          value={detailTab}
                          onChange={setDetailTab}
                          items={[
                            { key: 'wrong', label: `오답노트 ${wrongAnswers.length}` },
                            { key: 'correct', label: `정답노트 ${correctAnswers.length}` },
                          ]}
                        />
                        <div className="max-h-60 overflow-y-auto pr-1">
                          {detailTab === 'wrong' ? (
                            wrongAnswers.length === 0 ? (
                              <div className="text-center py-8 text-body-gray text-sm">오답이 없어요.</div>
                            ) : (
                              wrongAnswers.map((item, i) => <NoteCard key={i} item={item} />)
                            )
                          ) : (
                            correctAnswers.length === 0 ? (
                              <div className="text-center py-8 text-body-gray text-sm">정답이 없어요.</div>
                            ) : (
                              correctAnswers.map((item, i) => <NoteCard key={i} item={item} />)
                            )
                          )}
                        </div>
                      </>
                    )}
                  </>
                  )}
                </>
              )
            )}
          </>
        )}

        <button onClick={onClose} className="btn btn-secondary w-full mt-6 text-sm">
          게임으로 돌아가기
        </button>

        <p className="micro text-muted-gray text-center mt-4">v{APP_VERSION}</p>
      </div>
    </div>
  )
}
