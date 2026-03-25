import { useState, useEffect } from 'react'
import type { Difficulty, Student } from '../types'
import { loadStudents } from '../data/students'

interface Props {
  onStart: (nickname: string, difficulty: Difficulty, studentId?: string) => void
  onTeacher: () => void
}

const difficulties: { value: Difficulty; label: string; desc: string; selected: string; idle: string }[] = [
  {
    value: 'easy',
    label: '쉬움',
    desc: '1~2학년',
    selected: 'bg-green-100 border-green-500 text-green-800',
    idle: 'bg-white border-gray-200 text-gray-500',
  },
  {
    value: 'normal',
    label: '보통',
    desc: '3~4학년',
    selected: 'bg-yellow-100 border-yellow-500 text-yellow-800',
    idle: 'bg-white border-gray-200 text-gray-500',
  },
  {
    value: 'hard',
    label: '어려움',
    desc: '5학년',
    selected: 'bg-red-100 border-red-500 text-red-800',
    idle: 'bg-white border-gray-200 text-gray-500',
  },
  {
    value: 'daejanggeum',
    label: '대장금',
    desc: '드라마',
    selected: 'bg-purple-100 border-purple-500 text-purple-800',
    idle: 'bg-white border-gray-200 text-gray-500',
  },
  {
    value: 'math',
    label: '수학',
    desc: '초등수학',
    selected: 'bg-cyan-100 border-cyan-500 text-cyan-800',
    idle: 'bg-white border-gray-200 text-gray-500',
  },
  {
    value: 'proverb',
    label: '속담',
    desc: '속담퀴즈',
    selected: 'bg-orange-100 border-orange-500 text-orange-800',
    idle: 'bg-white border-gray-200 text-gray-500',
  },
  {
    value: 'engproverb',
    label: 'Proverb',
    desc: '영어속담',
    selected: 'bg-indigo-100 border-indigo-500 text-indigo-800',
    idle: 'bg-white border-gray-200 text-gray-500',
  },
  {
    value: 'kpdh',
    label: '데몬헌터',
    desc: 'K-Pop',
    selected: 'bg-pink-100 border-pink-500 text-pink-800',
    idle: 'bg-white border-gray-200 text-gray-500',
  },
  {
    value: 'uselem',
    label: 'Elementary',
    desc: '초등학교',
    selected: 'bg-teal-100 border-teal-500 text-teal-800',
    idle: 'bg-white border-gray-200 text-gray-500',
  },
  {
    value: 'usmiddle',
    label: 'Middle',
    desc: '중학교',
    selected: 'bg-emerald-100 border-emerald-500 text-emerald-800',
    idle: 'bg-white border-gray-200 text-gray-500',
  },
]

export default function StartScreen({ onStart, onTeacher }: Props) {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)
  const [pinVerified, setPinVerified] = useState(false)
  const [difficulty, setDifficulty] = useState<Difficulty>('normal')

  useEffect(() => {
    loadStudents().then(setStudents)
  }, [])

  const handleSelectStudent = (s: Student) => {
    if (selectedStudent?.id === s.id) {
      // 선택 해제
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
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">📖</div>
          <h1 className="text-3xl font-bold text-blue-700">한글 단어 퀴즈</h1>
          <p className="text-gray-400 mt-1 text-sm">문장 속 단어의 뜻을 맞혀보세요!</p>
        </div>

        {/* 학생 선택 */}
        <div className="mb-5">
          <label className="block text-base font-semibold text-gray-600 mb-2">학생 선택</label>
          {students.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">학생 목록을 불러오는 중...</p>
          ) : (
            <>
            <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto px-1 py-1">
              {students.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleSelectStudent(s)}
                  className={`px-3 py-1.5 rounded-xl border-2 text-sm font-medium transition-all whitespace-nowrap ${
                    selectedStudent?.id === s.id
                      ? pinVerified
                        ? 'bg-blue-100 border-blue-500 text-blue-800 scale-105 shadow-sm'
                        : 'bg-yellow-50 border-yellow-400 text-yellow-800 scale-105 shadow-sm'
                      : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300'
                  }`}
                >
                  {s.name}{s.class ? ` (${s.class}반)` : ''}
                  {selectedStudent?.id === s.id && pinVerified && ' ✓'}
                </button>
              ))}
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
                  className={`flex-1 border-2 rounded-xl px-3 py-2 text-sm focus:outline-none transition-colors ${
                    pinError ? 'border-red-400 bg-red-50' : 'border-yellow-300 focus:border-blue-500'
                  }`}
                />
                <button
                  onClick={handlePinVerify}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 active:scale-95 transition-all"
                >
                  확인
                </button>
              </div>
            )}
            {pinError && <p className="text-red-500 text-xs mt-1 ml-1">PIN이 틀렸어요. 다시 입력해주세요.</p>}
            </>
          )}
        </div>

        <div className="mb-8">
          <label className="block text-base font-semibold text-gray-600 mb-2">난이도</label>
          <div className="grid grid-cols-4 gap-2">
            {difficulties.map(d => (
              <button
                key={d.value}
                onClick={() => setDifficulty(d.value)}
                className={`border-2 rounded-xl py-3 transition-all font-medium ${
                  difficulty === d.value ? d.selected + ' scale-105 shadow-sm' : d.idle
                }`}
              >
                <div className="text-sm font-bold">{d.label}</div>
                <div className="text-xs mt-0.5 opacity-70">{d.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={!canStart}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xl font-bold py-4 rounded-2xl transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {!selectedStudent ? '학생을 선택하세요' : !canStart ? 'PIN을 먼저 입력하세요' : '시작하기 🚀'}
        </button>

        <button
          onClick={onTeacher}
          className="w-full mt-3 text-gray-400 hover:text-gray-600 text-sm py-1 transition-colors"
        >
          선생님 대시보드
        </button>

        <p className="text-center text-gray-300 text-xs mt-4">v{APP_VERSION}</p>
      </div>
    </div>
  )
}
