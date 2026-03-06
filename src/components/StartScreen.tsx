import { useState } from 'react'
import type { Difficulty } from '../types'

interface Props {
  onStart: (nickname: string, difficulty: Difficulty) => void
}

const difficulties: { value: Difficulty; label: string; desc: string; selected: string; idle: string }[] = [
  {
    value: 'easy',
    label: 'Easy',
    desc: '1~2학년 · 20초',
    selected: 'bg-green-100 border-green-500 text-green-800',
    idle: 'bg-white border-gray-200 text-gray-500',
  },
  {
    value: 'normal',
    label: 'Normal',
    desc: '3~4학년 · 15초',
    selected: 'bg-yellow-100 border-yellow-500 text-yellow-800',
    idle: 'bg-white border-gray-200 text-gray-500',
  },
  {
    value: 'hard',
    label: 'Hard',
    desc: '5학년 · 10초',
    selected: 'bg-red-100 border-red-500 text-red-800',
    idle: 'bg-white border-gray-200 text-gray-500',
  },
]

export default function StartScreen({ onStart }: Props) {
  const [nickname, setNickname] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty>('normal')

  const handleStart = () => {
    onStart(nickname.trim() || '익명', difficulty)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">📖</div>
          <h1 className="text-3xl font-bold text-blue-700">한글 단어 퀴즈</h1>
          <p className="text-gray-400 mt-1 text-sm">문장 속 단어의 뜻을 맞혀보세요!</p>
        </div>

        <div className="mb-5">
          <label className="block text-base font-semibold text-gray-600 mb-2">닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleStart()}
            placeholder="이름을 입력하세요"
            maxLength={10}
            className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="mb-8">
          <label className="block text-base font-semibold text-gray-600 mb-2">난이도</label>
          <div className="flex gap-2">
            {difficulties.map(d => (
              <button
                key={d.value}
                onClick={() => setDifficulty(d.value)}
                className={`flex-1 border-2 rounded-xl py-3 transition-all font-medium ${
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
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xl font-bold py-4 rounded-2xl transition-all shadow-lg"
        >
          시작하기 🚀
        </button>
      </div>
    </div>
  )
}
