import { useState, useEffect, useMemo } from 'react'
import type { Student, PlayerRecord } from '../types'
import type { AnswerRecord } from '../App'
import { loadStudents, addStudent, removeStudent, loadAllRecords, calcStats, loadRecordAnswers } from '../data/students'

const DIFFICULTY_LABEL = { easy: 'Easy', normal: 'Normal', hard: 'Hard', daejanggeum: '대장금' } as const
const GRADE_COLOR = { S: 'text-yellow-500', A: 'text-blue-500', B: 'text-green-500', C: 'text-gray-400' }

function gradeOf(correct: number, total: number) {
  const pct = (correct / total) * 100
  return pct >= 90 ? 'S' : pct >= 70 ? 'A' : pct >= 50 ? 'B' : 'C'
}

function NoteCard({ item }: { item: AnswerRecord }) {
  const { question, selected, isCorrect } = item
  const selectedLabel =
    selected === 'timeout'
      ? '⏰ 시간 초과'
      : `${question.options[selected as number]}`

  return (
    <div className={`rounded-2xl border-2 p-4 mb-3 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
      <p className="text-sm text-gray-500 mb-1">문장</p>
      <p className="text-base font-medium text-gray-800 mb-3 leading-relaxed">
        {question.sentence.split(question.word).map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && (
              <span className={`font-bold underline underline-offset-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {question.word}
              </span>
            )}
          </span>
        ))}
      </p>
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex gap-2">
          <span className="text-green-600 font-bold w-12 shrink-0">정답</span>
          <span className="text-gray-800">{question.options[question.answer]}</span>
        </div>
        {!isCorrect && (
          <div className="flex gap-2">
            <span className="text-red-500 font-bold w-12 shrink-0">선택</span>
            <span className="text-gray-600">{selectedLabel}</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface Props {
  onClose: () => void
}

export default function TeacherScreen({ onClose }: Props) {
  const [unlocked, setUnlocked] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)

  const [tab, setTab] = useState<'students' | 'progress'>('students')
  const [students, setStudents] = useState<Student[]>([])
  const [allRecords, setAllRecords] = useState<PlayerRecord[]>([])
  const [dataLoading, setDataLoading] = useState(false)

  const [newName, setNewName] = useState('')
  const [newClass, setNewClass] = useState('')
  const [newPin, setNewPin] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [detailRecord, setDetailRecord] = useState<PlayerRecord | null>(null)
  const [detailAnswers, setDetailAnswers] = useState<AnswerRecord[] | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailTab, setDetailTab] = useState<'wrong' | 'correct'>('wrong')

  useEffect(() => {
    if (!unlocked) return
    setDataLoading(true)
    Promise.all([loadStudents(), loadAllRecords()]).then(([s, r]) => {
      setStudents(s)
      setAllRecords(r)
      setDataLoading(false)
    })
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
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm">

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xl font-bold text-gray-800">선생님 대시보드</div>
            <div className="text-xs text-gray-400">{unlocked ? '학생 관리 및 학습 현황' : 'PIN을 입력하세요'}</div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-2xl leading-none">×</button>
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
              className="border-2 border-purple-200 rounded-xl px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:border-purple-500"
            />
            {pinError && <p className="text-red-500 text-xs text-center">PIN이 틀렸어요.</p>}
            <button
              onClick={handlePinSubmit}
              className="bg-purple-600 text-white font-bold py-3 rounded-2xl hover:bg-purple-700 active:scale-95 transition-all"
            >
              확인
            </button>
          </div>
        ) : dataLoading ? (
          <div className="text-center py-16 text-gray-400 text-sm">불러오는 중...</div>
        ) : (
          <>
            {/* 탭 */}
            <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-4">
              {([
                { key: 'students', label: '학생 관리' },
                { key: 'progress', label: '학습 현황' },
              ] as { key: 'students' | 'progress'; label: string }[]).map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                    tab === t.key ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-400'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* 학생 관리 탭 */}
            {tab === 'students' && (
              <>
                <div className="flex gap-2 mb-3">
                  <input
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder="이름"
                    className="flex-1 border-2 border-purple-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                  />
                  <input
                    value={newClass}
                    onChange={e => setNewClass(e.target.value)}
                    placeholder="반"
                    className="w-12 border-2 border-purple-200 rounded-xl px-2 py-2 text-sm focus:outline-none focus:border-purple-500"
                  />
                  <input
                    value={newPin}
                    onChange={e => setNewPin(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdd()}
                    placeholder="PIN"
                    className="w-16 border-2 border-purple-200 rounded-xl px-2 py-2 text-sm focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={handleAdd}
                    className="bg-purple-600 text-white px-3 py-2 rounded-xl text-sm font-bold hover:bg-purple-700 active:scale-95 transition-all"
                  >
                    추가
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto flex flex-col gap-2 pr-1">
                  {students.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                      <div className="text-3xl mb-2">👨‍🎓</div>
                      <p className="text-sm">이름, 반, PIN을 입력하고 추가하세요.</p>
                    </div>
                  ) : (
                    students.map(s => {
                      const stats = calcStats(studentRecords(s.id))
                      return (
                        <div key={s.id} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm shrink-0">
                            {s.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-800 text-sm truncate">
                              {s.name}{s.class ? ` · ${s.class}반` : ''} <span className="text-gray-300 font-normal">PIN: {s.pin}</span>
                            </div>
                            <div className="text-xs text-gray-400">
                              {stats ? `${stats.attempts}회 · 최고 ${stats.bestScore}점 · 평균 ${stats.avgAccuracy}%` : '기록 없음'}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemove(s.id)}
                            className={`text-sm font-bold px-2 py-1 rounded-lg transition-all ${
                              confirmDeleteId === s.id ? 'bg-red-500 text-white' : 'text-red-300 hover:text-red-500'
                            }`}
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

            {/* 학습 현황 탭 */}
            {tab === 'progress' && (
              !selectedId ? (
                <div className="max-h-72 overflow-y-auto flex flex-col gap-2 pr-1">
                  {students.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                      <div className="text-3xl mb-2">📊</div>
                      <p className="text-sm">먼저 학생을 등록해주세요.</p>
                    </div>
                  ) : (
                    students.map(s => {
                      const stats = calcStats(studentRecords(s.id))
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSelectedId(s.id)}
                          className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-3 border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-all text-left w-full"
                        >
                          <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm shrink-0">
                            {s.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-800 text-sm">
                              {s.name}{s.class ? ` (${s.class}반)` : ''}
                            </div>
                            {stats ? (
                              <div className="text-xs text-gray-500">
                                {stats.attempts}회 · 평균 {stats.avgAccuracy}% · 최고 {stats.bestScore}점
                              </div>
                            ) : (
                              <div className="text-xs text-gray-400">아직 게임 기록 없음</div>
                            )}
                          </div>
                          <span className="text-gray-300 text-lg">›</span>
                        </button>
                      )
                    })
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="flex items-center gap-1 text-purple-600 text-sm font-semibold mb-3 hover:underline"
                  >
                    ‹ 목록으로
                  </button>
                  <div className="font-bold text-gray-800 mb-3 text-sm">
                    {selectedStudent?.name}
                    {selectedStudent?.class ? ` (${selectedStudent.class}반)` : ''} 학습 기록
                    <span className="text-gray-400 font-normal ml-1">총 {selectedRecords.length}회</span>
                  </div>
                  {!detailRecord ? (
                  <div className="max-h-64 overflow-y-auto flex flex-col gap-2 pr-1">
                    {selectedRecords.length === 0 ? (
                      <div className="text-center py-8 text-gray-400 text-sm">아직 게임 기록이 없어요.</div>
                    ) : (
                      selectedRecords.map((r, i) => {
                        const grade = gradeOf(r.correct, r.total)
                        const accuracy = Math.round((r.correct / r.total) * 100)
                        return (
                          <button
                            key={i}
                            onClick={() => handleRecordClick(r)}
                            className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-all text-sm text-left w-full"
                          >
                            <span className={`font-black text-lg w-5 shrink-0 ${GRADE_COLOR[grade]}`}>{grade}</span>
                            <div className="flex-1">
                              <div className="text-gray-700 font-medium">
                                {r.score}점 · {r.correct}/{r.total}문제 ({accuracy}%)
                              </div>
                              <div className="text-xs text-gray-400">
                                {DIFFICULTY_LABEL[r.difficulty]} · {r.date}
                              </div>
                            </div>
                            <span className="text-gray-300 text-lg">›</span>
                          </button>
                        )
                      })
                    )}
                  </div>
                  ) : (
                  <>
                    <button
                      onClick={() => { setDetailRecord(null); setDetailAnswers(null) }}
                      className="flex items-center gap-1 text-purple-600 text-sm font-semibold mb-3 hover:underline"
                    >
                      ‹ 기록 목록으로
                    </button>
                    <div className="font-bold text-gray-800 mb-3 text-sm">
                      {detailRecord.score}점 · {detailRecord.correct}/{detailRecord.total}문제
                      <span className="text-gray-400 font-normal ml-1">
                        {DIFFICULTY_LABEL[detailRecord.difficulty]} · {detailRecord.date}
                      </span>
                    </div>
                    {detailLoading ? (
                      <div className="text-center py-8 text-gray-400 text-sm">불러오는 중...</div>
                    ) : !detailAnswers ? (
                      <div className="text-center py-8 text-gray-400 text-sm">이 기록에는 상세 답안 데이터가 없습니다.</div>
                    ) : (
                      <>
                        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-3">
                          {([
                            { key: 'wrong' as const, label: `오답노트 ${wrongAnswers.length}` },
                            { key: 'correct' as const, label: `정답노트 ${correctAnswers.length}` },
                          ]).map(t => (
                            <button
                              key={t.key}
                              onClick={() => setDetailTab(t.key)}
                              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                                detailTab === t.key ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-400'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                        <div className="max-h-60 overflow-y-auto pr-1">
                          {detailTab === 'wrong' ? (
                            wrongAnswers.length === 0 ? (
                              <div className="text-center py-8 text-gray-400 text-sm">오답이 없어요! 완벽!</div>
                            ) : (
                              wrongAnswers.map((item, i) => <NoteCard key={i} item={item} />)
                            )
                          ) : (
                            correctAnswers.length === 0 ? (
                              <div className="text-center py-8 text-gray-400 text-sm">정답이 없어요.</div>
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

        <button
          onClick={onClose}
          className="w-full mt-4 border-2 border-purple-300 text-purple-600 font-bold py-3 rounded-2xl hover:bg-purple-50 active:scale-95 transition-all text-sm"
        >
          게임으로 돌아가기
        </button>

        <p className="text-center text-gray-300 text-xs mt-4">v{APP_VERSION}</p>
      </div>
    </div>
  )
}
