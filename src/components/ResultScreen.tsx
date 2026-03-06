import { useEffect, useState } from 'react'
import type { Difficulty, PlayerRecord } from '../types'

interface Props {
  nickname: string
  score: number
  correct: number
  total: number
  difficulty: Difficulty
  onRetry: () => void
  onHome: () => void
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: 'Easy',
  normal: 'Normal',
  hard: 'Hard',
}

const GRADE_INFO = {
  S: { label: 'S', color: 'text-yellow-500', bg: 'bg-yellow-50', message: '완벽해요! 🌟' },
  A: { label: 'A', color: 'text-blue-500',   bg: 'bg-blue-50',   message: '훌륭해요! 👍' },
  B: { label: 'B', color: 'text-green-500',  bg: 'bg-green-50',  message: '잘했어요! 😊' },
  C: { label: 'C', color: 'text-gray-400',   bg: 'bg-gray-50',   message: '다시 도전! 💪' },
}

function loadRecords(): PlayerRecord[] {
  try {
    return JSON.parse(localStorage.getItem('wordgame_records') || '[]')
  } catch {
    return []
  }
}

function saveRecord(record: PlayerRecord): PlayerRecord[] {
  const records = loadRecords()
  records.push(record)
  records.sort((a, b) => b.score - a.score)
  const top10 = records.slice(0, 10)
  localStorage.setItem('wordgame_records', JSON.stringify(top10))
  return top10
}

export default function ResultScreen({ nickname, score, correct, total, difficulty, onRetry, onHome }: Props) {
  const [records, setRecords] = useState<PlayerRecord[]>([])
  const [myRank, setMyRank] = useState(-1)
  const [displayScore, setDisplayScore] = useState(0)

  const accuracy = Math.round((correct / total) * 100)
  const grade = accuracy >= 90 ? 'S' : accuracy >= 70 ? 'A' : accuracy >= 50 ? 'B' : 'C'
  const gradeInfo = GRADE_INFO[grade]
  const today = new Date().toLocaleDateString('ko-KR')

  // 점수 카운트업 애니메이션
  useEffect(() => {
    let current = 0
    const step = Math.ceil(score / 30)
    const timer = setInterval(() => {
      current = Math.min(current + step, score)
      setDisplayScore(current)
      if (current >= score) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [score])

  useEffect(() => {
    const record: PlayerRecord = { nickname, score, correct, total, difficulty, date: today }
    const saved = saveRecord(record)
    setRecords(saved)
    const rank = saved.findIndex(r => r.nickname === nickname && r.score === score && r.date === today)
    setMyRank(rank)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm">

        {/* 결과 헤더 */}
        <div className="text-center mb-5">
          <div className="text-5xl mb-2">🎊</div>
          <h2 className="text-2xl font-bold text-gray-800">{nickname}님의 결과</h2>
        </div>

        {/* 점수 카드 */}
        <div className={`${gradeInfo.bg} rounded-2xl p-5 mb-5`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className={`text-7xl font-black leading-none ${gradeInfo.color}`}>{gradeInfo.label}</div>
              <div className="text-gray-500 text-sm mt-1">{gradeInfo.message}</div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-700">{displayScore}점</div>
              <div className="text-gray-400 text-sm mt-1">{DIFFICULTY_LABEL[difficulty]}</div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 border-t border-gray-200 pt-3">
            <span>정답 <strong className="text-gray-800">{correct}/{total}</strong></span>
            <span>정확도 <strong className="text-gray-800">{accuracy}%</strong></span>
            {myRank >= 0 && <span>순위 <strong className="text-blue-600">{myRank + 1}위</strong></span>}
          </div>
        </div>

        {/* 정확도 바 */}
        <div className="mb-5">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>정확도</span>
            <span>{accuracy}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-1000"
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>

        {/* 리더보드 */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-700 mb-2 text-base">🏆 리더보드 Top 10</h3>
          <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
            {records.map((r, i) => {
              const isMe = i === myRank
              return (
                <div
                  key={i}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                    isMe
                      ? 'bg-blue-100 border-2 border-blue-400 font-bold'
                      : 'bg-gray-50 border border-gray-100'
                  }`}
                >
                  <span className={`w-5 font-bold ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-amber-600' : 'text-gray-400'}`}>
                    {i + 1}
                  </span>
                  <span className="flex-1 text-gray-700 truncate">{r.nickname}</span>
                  <span className="text-gray-400 text-xs">{DIFFICULTY_LABEL[r.difficulty]}</span>
                  <span className="text-blue-700 font-bold">{r.score}점</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={onHome}
            className="flex-1 border-2 border-blue-300 text-blue-600 font-bold py-3 rounded-2xl hover:bg-blue-50 active:scale-95 transition-all text-base"
          >
            처음으로
          </button>
          <button
            onClick={onRetry}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl active:scale-95 transition-all shadow-md text-base"
          >
            다시 하기
          </button>
        </div>
      </div>
    </div>
  )
}
