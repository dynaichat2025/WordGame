import { useState, useEffect, useCallback } from 'react'
import type { Difficulty, Student } from '../types'
import { loadStudents } from '../data/students'

interface Props {
  onStart: (nickname: string, difficulty: Difficulty, studentId?: string) => void
  onTeacher: () => void
}

const difficulties: { value: Difficulty; label: string; desc: string }[] = [
  { value: 'easy',        label: '쉬움',     desc: '1~2학년' },
  { value: 'normal',      label: '보통',     desc: '3~4학년' },
  { value: 'hard',        label: '어려움',   desc: '5학년' },
  { value: 'daejanggeum', label: '대장금',   desc: '드라마' },
  { value: 'math',        label: '수학',     desc: '초등수학' },
  { value: 'proverb',     label: '속담',     desc: '속담퀴즈' },
  { value: 'engproverb',  label: 'Proverb',  desc: '영어속담' },
  { value: 'kpdh',        label: '데몬헌터', desc: 'K-Pop' },
  { value: 'uselem',      label: '초등영어', desc: 'Elementary' },
  { value: 'usmiddle',    label: '중등영어', desc: 'Middle' },
  { value: 'probability', label: '확률',     desc: 'Probability' },
]

export default function StartScreen({ onStart, onTeacher }: Props) {
  const [students, setStudents] = useState<Student[]>([])
  const [loadState, setLoadState] = useState<'loading' | 'ok' | 'error'>('loading')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)
  const [pinVerified, setPinVerified] = useState(false)
  const [difficulty, setDifficulty] = useState<Difficulty>('normal')

  const fetchStudents = useCallback(() => {
    setLoadState('loading')
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 6000)
    )
    Promise.race([loadStudents(), timeout])
      .then(s => { setStudents(s); setLoadState('ok') })
      .catch(e => { console.error('loadStudents failed', e); setLoadState('error') })
  }, [])

  useEffect(() => { fetchStudents() }, [fetchStudents])

  const handleSelectStudent = (s: Student) => {
    if (selectedStudent?.id === s.id) {
      setSelectedStudent(null)
      setPinInput('')
      setPinError(false)
      setPinVerified(false)
    } else {
      setSelectedStudent(s)
      setPinInput('')
      setPinError(false)
      setPinVerified(false)
    }
  }

  const handlePinVerify = () => {
    if (!selectedStudent) return
    if (pinInput === selectedStudent.pin) {
      setPinVerified(true)
      setPinError(false)
    } else {
      setPinError(true)
      setPinInput('')
    }
  }

  const handleStart = () => {
    if (!pinVerified || !selectedStudent) return
    onStart(selectedStudent.name, difficulty, selectedStudent.id)
  }

  const canStart = pinVerified

  return (
    <div className="min-h-screen bg-uber-white flex items-center justify-center p-4">
      <div className="bg-uber-white rounded-card shadow-card p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-uber-black">한글 단어 퀴즈</h1>
          <p className="mt-2 text-sm text-body-gray">문장 속 단어의 뜻을 고르세요.</p>
        </div>

        {/* 학생 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-body-gray mb-3">학생 선택</label>
          {loadState === 'loading' ? (
            <p className="text-sm text-muted-gray text-center py-4">학생 목록을 불러오는 중</p>
          ) : loadState === 'error' ? (
            <div className="text-center py-3">
              <p className="text-sm text-body-gray mb-3">서버에 연결할 수 없어요.</p>
              <button onClick={fetchStudents} className="btn btn-secondary text-sm">
                다시 시도
              </button>
            </div>
          ) : students.length === 0 ? (
            <p className="text-sm text-muted-gray text-center py-4">등록된 학생이 없어요. 선생님 대시보드에서 추가해주세요.</p>
          ) : (
            <>
            <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto px-1 py-1">
              {students.map(s => {
                const isSelected = selectedStudent?.id === s.id
                const isVerified = isSelected && pinVerified
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectStudent(s)}
                    aria-pressed={isSelected}
                    className={`btn-chip text-sm whitespace-nowrap ${isVerified ? 'is-active' : ''}`}
                  >
                    {s.name}{s.class ? ` (${s.class}반)` : ''}
                    {isVerified && <span aria-hidden="true" className="ml-1">✓</span>}
                  </button>
                )
              })}
            </div>

            {/* PIN 입력 (학생 선택 후, 아직 미인증) */}
            {selectedStudent && !pinVerified && (
              <div className="mt-3 flex gap-2">
                <input
                  type="password"
                  value={pinInput}
                  onChange={e => { setPinInput(e.target.value); setPinError(false) }}
                  onKeyDown={e => e.key === 'Enter' && handlePinVerify()}
                  placeholder={`${selectedStudent.name}의 PIN`}
                  className={`input flex-1 text-sm py-3 ${pinError ? 'border-feedback-wrong' : ''}`}
                />
                <button onClick={handlePinVerify} className="btn btn-primary text-sm">
                  확인
                </button>
              </div>
            )}
            {pinError && <p className="text-xs text-feedback-wrong mt-2 ml-1">PIN이 틀렸어요.</p>}
            </>
          )}
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-body-gray mb-3">퀴즈 종류</label>
          <div className="grid grid-cols-4 gap-2">
            {difficulties.map(d => (
              <button
                key={d.value}
                onClick={() => setDifficulty(d.value)}
                aria-pressed={difficulty === d.value}
                className={`btn-chip flex flex-col gap-1 px-1 py-3 ${difficulty === d.value ? 'is-active' : ''}`}
              >
                <span className="font-display font-bold text-sm whitespace-nowrap">{d.label}</span>
                <span className="text-[10px] opacity-70 whitespace-nowrap">{d.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={!canStart}
          className="btn btn-primary w-full py-4 text-base disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {!selectedStudent ? '학생을 선택하세요' : !canStart ? 'PIN을 먼저 입력하세요' : '시작하기'}
        </button>

        <button
          onClick={onTeacher}
          className="block w-full mt-4 text-sm text-body-gray hover:text-uber-black underline underline-offset-4"
        >
          선생님 대시보드
        </button>

        <p className="micro text-muted-gray text-center mt-4">v{APP_VERSION}</p>
      </div>
    </div>
  )
}
