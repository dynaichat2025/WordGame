import { useState, useEffect, useCallback, useRef } from 'react'
import type { Question, Difficulty } from '../types'

interface Props {
  questions: Question[]
  difficulty: Difficulty
  onFinish: (score: number, correct: number) => void
}

const TIME_LIMIT: Record<Difficulty, number> = {
  easy: 20,
  normal: 15,
  hard: 10,
}

const LABELS = ['①', '②', '③', '④']

function HighlightedSentence({ sentence, word }: { sentence: string; word: string }) {
  const parts = sentence.split(word)
  return (
    <p className="text-xl leading-relaxed text-gray-800 text-center">
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="text-blue-600 font-bold underline underline-offset-4">{word}</span>
          )}
        </span>
      ))}
    </p>
  )
}

export default function QuizScreen({ questions, difficulty, onFinish }: Props) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [combo, setCombo] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT[difficulty])
  const [animKey, setAnimKey] = useState(0)
  const [correctIdx, setCorrectIdx] = useState<number | null>(null)
  const [scorePopup, setScorePopup] = useState<number | null>(null)

  const current = questions[index]
  const total = questions.length
  const timeLimit = TIME_LIMIT[difficulty]

  const scoreRef = useRef(score)
  const correctRef = useRef(correct)
  scoreRef.current = score
  correctRef.current = correct

  const goNext = useCallback(() => {
    setSelected(null)
    setCorrectIdx(null)
    setScorePopup(null)
    setTimeLeft(timeLimit)
    setAnimKey(k => k + 1)
    if (index + 1 >= total) {
      onFinish(scoreRef.current, correctRef.current)
    } else {
      setIndex(i => i + 1)
    }
  }, [index, total, onFinish, timeLimit])

  // 타이머
  useEffect(() => {
    if (selected !== null) return
    if (timeLeft <= 0) {
      setSelected(-1)
      setCombo(0)
      setTimeout(goNext, 1500)
      return
    }
    const t = setTimeout(() => setTimeLeft(n => n - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, selected, goNext])

  // 키보드 단축키 (1~4)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        handleSelect(Number(e.key) - 1)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selected, index])

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)

    if (idx === current.answer) {
      const newCombo = combo + 1
      setCombo(newCombo)
      setCorrectIdx(idx)

      const speedBonus = Math.floor(timeLeft * 0.5)
      const comboBonus = newCombo >= 3 ? (newCombo - 2) * 2 : 0
      const gained = 10 + speedBonus + comboBonus
      setScore(s => s + gained)
      setCorrect(c => c + 1)
      setScorePopup(gained)
    } else {
      setCombo(0)
    }

    setTimeout(goNext, 1500)
  }

  const timerPct = (timeLeft / timeLimit) * 100
  const timerColor = timerPct > 50 ? 'bg-green-400' : timerPct > 25 ? 'bg-yellow-400' : 'bg-red-500'

  const getOptionClass = (idx: number) => {
    const base = 'w-full text-left border-2 rounded-2xl px-5 py-4 text-lg font-medium transition-colors '
    if (selected === null)
      return base + 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
    if (idx === current.answer)
      return base + (correctIdx === idx ? 'pulse-correct ' : '') + 'bg-green-100 border-green-500 text-green-800'
    if (idx === selected) return base + 'bg-red-100 border-red-500 text-red-800'
    return base + 'bg-gray-50 border-gray-200 text-gray-400'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-lg">

        {/* 헤더 */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-400 font-medium text-base">{index + 1} / {total}</span>

          {/* 콤보 */}
          <div className="flex items-center gap-2">
            {combo >= 3 && (
              <span key={combo} className="combo-pop bg-orange-100 text-orange-600 font-black text-sm px-2 py-0.5 rounded-full">
                🔥 {combo} 콤보!
              </span>
            )}
          </div>

          {/* 점수 (팝업 포함) */}
          <div className="relative">
            <span className="text-blue-700 font-bold text-lg">🏆 {score}점</span>
            {scorePopup !== null && (
              <span
                key={score}
                className="absolute -top-5 right-0 text-sm font-bold text-green-500 pointer-events-none"
                style={{ animation: 'score-up 1s ease-out forwards' }}
              >
                +{scorePopup}
              </span>
            )}
          </div>
        </div>

        {/* 타이머 바 */}
        <div className="h-2.5 bg-gray-100 rounded-full mb-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
            style={{ width: `${timerPct}%` }}
          />
        </div>
        <div className="text-right mb-4">
          <span className={`text-sm font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-gray-400'}`}>
            {timeLeft}초
          </span>
        </div>

        {/* 문장 + 질문 (슬라이드 인 애니메이션) */}
        <div key={animKey} className="slide-in">
          <div className="bg-blue-50 rounded-2xl px-5 py-6 mb-4 min-h-[90px] flex items-center justify-center">
            <HighlightedSentence sentence={current.sentence} word={current.word} />
          </div>

          <p className="text-center text-gray-500 font-medium mb-4 text-base">
            위 문장에서{' '}
            <span className="text-blue-600 font-bold">'{current.word}'</span>
            의 뜻은 무엇인가요?
          </p>
        </div>

        {/* 피드백 */}
        <div className="min-h-[28px] text-center mb-3">
          {selected !== null && (
            <span className={`font-bold text-base ${
              selected === current.answer ? 'text-green-600' : 'text-red-600'
            }`}>
              {selected === current.answer
                ? `정답! 🎉${combo >= 3 ? ` (콤보 보너스!)` : ''}`
                : selected === -1
                ? `시간 초과! ⏰  정답: ${current.options[current.answer]}`
                : `오답! 😢  정답: ${current.options[current.answer]}`}
            </span>
          )}
        </div>

        {/* 선택지 */}
        <div className="flex flex-col gap-3">
          {current.options.map((opt, idx) => (
            <button key={idx} onClick={() => handleSelect(idx)} className={getOptionClass(idx)}>
              <span className="text-blue-300 font-bold mr-2">{LABELS[idx]}</span>
              <span className="text-[18px]">{opt}</span>
              <span className="text-gray-300 text-sm ml-2">({idx + 1})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
