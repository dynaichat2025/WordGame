import { useState, useEffect, useCallback, useRef, memo } from 'react'
import type { Question, Difficulty } from '../types'
import type { AnswerRecord } from '../App'
import ReportModal from './ReportModal'

interface Props {
  questions: Question[]
  difficulty: Difficulty
  nickname: string
  onFinish: (score: number, correct: number, answers: AnswerRecord[]) => void
}

const TIME_LIMIT = 60

const LABELS = ['①', '②', '③', '④']
const WORD_BOUNDARY = /[\s,.:;!?'"()~]/

export function findHighlight(sentence: string, word: string): { before: string; match: string; after: string } | null {
  const exactIdx = sentence.indexOf(word)
  if (exactIdx !== -1) {
    return { before: sentence.slice(0, exactIdx), match: word, after: sentence.slice(exactIdx + word.length) }
  }

  const lowerIdx = sentence.toLowerCase().indexOf(word.toLowerCase())
  if (lowerIdx !== -1) {
    return { before: sentence.slice(0, lowerIdx), match: sentence.slice(lowerIdx, lowerIdx + word.length), after: sentence.slice(lowerIdx + word.length) }
  }

  // 한국어 어간 매칭 (~하다, ~다 활용형)
  const stems: string[] = []
  if (word.endsWith('하다') && word.length > 2) stems.push(word.slice(0, -2))
  if (word.endsWith('다') && word.length > 1) stems.push(word.slice(0, -1))

  for (const stem of stems) {
    const stemIdx = sentence.indexOf(stem)
    if (stemIdx !== -1) {
      let end = stemIdx + stem.length
      while (end < sentence.length && !WORD_BOUNDARY.test(sentence[end])) end++
      return { before: sentence.slice(0, stemIdx), match: sentence.slice(stemIdx, end), after: sentence.slice(end) }
    }
  }

  return null
}

const HighlightedSentence = memo(function HighlightedSentence({
  sentence,
  word,
}: {
  sentence: string
  word: string
}) {
  const hl = findHighlight(sentence, word)
  if (!hl) return <p className="font-display text-xl leading-snug text-uber-black text-center">{sentence}</p>

  return (
    <p className="font-display text-xl leading-snug text-uber-black text-center">
      {hl.before}
      <span className="text-uber-black font-bold underline underline-offset-4">{hl.match}</span>
      {hl.after}
    </p>
  )
})

type SelectedState = number | 'timeout' | null

export default function QuizScreen({ questions, difficulty, nickname, onFinish }: Props) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<SelectedState>(null)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [combo, setCombo] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [animKey, setAnimKey] = useState(0)
  const [scorePopup, setScorePopup] = useState<number | null>(null)
  const answersRef = useRef<AnswerRecord[]>([])

  const [reportOpen, setReportOpen] = useState(false)
  const [reportedIds, setReportedIds] = useState<Set<number>>(new Set())

  const current = questions[index]
  const total = questions.length
  const timeLimit = TIME_LIMIT

  // 최신 score/correct를 goNext에서 읽기 위한 ref (stale closure 방지)
  const scoreRef = useRef(score)
  const correctRef = useRef(correct)
  scoreRef.current = score
  correctRef.current = correct

  // goNext 중복 호출 방지용 ref
  const nextTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isTransitioningRef = useRef(false)

  const goNext = useCallback(() => {
    if (isTransitioningRef.current) return
    isTransitioningRef.current = true

    setSelected(null)
    setScorePopup(null)
    setTimeLeft(timeLimit)
    setAnimKey(k => k + 1)

    if (index + 1 >= total) {
      onFinish(scoreRef.current, correctRef.current, answersRef.current)
    } else {
      setIndex(i => i + 1)
      isTransitioningRef.current = false
    }
  }, [index, total, onFinish, timeLimit])

  // handleSelect를 useCallback으로 감싸 키보드 핸들러 stale closure 방지
  const handleSelect = useCallback(
    (idx: number) => {
      if (selected !== null) return

      setSelected(idx)

      const isCorrect = idx === current.answer
      answersRef.current = [
        ...answersRef.current,
        { question: current, selected: idx, isCorrect },
      ]

      if (isCorrect) {
        const newCombo = combo + 1
        setCombo(newCombo)
        const speedBonus = Math.floor(timeLeft * 0.5)
        const comboBonus = newCombo >= 3 ? (newCombo - 2) * 2 : 0
        const gained = 10 + speedBonus + comboBonus
        setScore(s => s + gained)
        setCorrect(c => c + 1)
        setScorePopup(gained)
      } else {
        setCombo(0)
      }

      // 기존 타이머 취소 후 단일 타이머 등록
      if (nextTimerRef.current) clearTimeout(nextTimerRef.current)
      nextTimerRef.current = setTimeout(goNext, 1500)
    },
    [selected, current, combo, timeLeft, goNext],
  )

  // 타이머
  useEffect(() => {
    if (selected !== null || reportOpen) return
    if (timeLeft <= 0) {
      setSelected('timeout')
      setCombo(0)
      answersRef.current = [
        ...answersRef.current,
        { question: current, selected: 'timeout', isCorrect: false },
      ]
      if (nextTimerRef.current) clearTimeout(nextTimerRef.current)
      nextTimerRef.current = setTimeout(goNext, 1500)
      return
    }
    const t = setTimeout(() => setTimeLeft(n => n - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, selected, reportOpen, goNext])

  useEffect(() => {
    if (reportOpen) return
    const handler = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        handleSelect(Number(e.key) - 1)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSelect, reportOpen])

  // 컴포넌트 언마운트 시 pending 타이머 정리
  useEffect(() => {
    return () => {
      if (nextTimerRef.current) clearTimeout(nextTimerRef.current)
    }
  }, [])

  const timerPct = (timeLeft / timeLimit) * 100
  const timerColor = timerPct <= 25 ? 'bg-feedback-wrong' : 'bg-uber-black'

  const getOptionClass = (idx: number) => {
    const base = 'w-full text-left rounded-card border px-5 py-4 text-base font-medium transition-colors '
    if (selected === null)
      return base + 'bg-uber-white border-uber-black hover:bg-chip-gray cursor-pointer'
    if (idx === current.answer)
      return base + 'bg-feedback-correct text-uber-white border-feedback-correct'
    if (idx === selected)
      return base + 'bg-feedback-wrong text-uber-white border-feedback-wrong'
    return base + 'bg-uber-white border-muted-gray text-muted-gray'
  }

  const isCorrect = typeof selected === 'number' && selected === current.answer

  return (
    <div className="min-h-screen bg-uber-white flex items-center justify-center p-4">
      <div className="bg-uber-white rounded-card shadow-card p-6 w-full max-w-lg">

        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <span className="caption text-body-gray font-medium">{index + 1} / {total}</span>

          <div className="flex items-center gap-2">
            {combo >= 3 && (
              <span key={combo} className="chip text-uber-black font-bold">
                {combo}× 콤보
              </span>
            )}
          </div>

          <div className="relative">
            <span className="font-display font-bold text-lg text-uber-black">{score}점</span>
            {scorePopup !== null && (
              <span
                key={score}
                className="absolute -top-5 right-0 text-sm font-bold text-feedback-correct pointer-events-none"
                style={{ animation: 'score-up 600ms ease-out forwards' }}
              >
                +{scorePopup}
              </span>
            )}
          </div>
        </div>

        {/* 타이머 바 */}
        <div className="h-1 bg-chip-gray rounded-pill mb-2 overflow-hidden">
          <div
            className={`h-full rounded-pill transition-all duration-1000 ${timerColor}`}
            style={{ width: `${timerPct}%` }}
          />
        </div>
        <div className="text-right mb-6">
          <span className={`caption font-medium ${timeLeft <= 5 ? 'text-feedback-wrong' : 'text-muted-gray'}`}>
            {timeLeft}초
          </span>
        </div>

        {/* 문장 + 질문 */}
        <div key={animKey} className="slide-up">
          <div className="bg-chip-gray rounded-feat px-6 py-8 mb-6 min-h-[96px] flex items-center justify-center">
            <HighlightedSentence sentence={current.sentence} word={current.word} />
          </div>

          <p className="text-center text-body-gray font-medium mb-4 text-base">
            {difficulty === 'math' || difficulty === 'probability' ? (
              <>정답을 고르세요.</>
            ) : difficulty === 'proverb' || difficulty === 'engproverb' ? (
              <>위 속담의 뜻은 무엇인가요?</>
            ) : (
              <>위 문장에서{' '}
              <span className="text-uber-black font-bold">'{current.word}'</span>
              의 뜻은 무엇인가요?</>
            )}
          </p>
        </div>

        {/* 피드백 */}
        <div className="min-h-[28px] text-center mb-3">
          {selected !== null && (
            <span className={`font-bold text-base ${isCorrect ? 'text-feedback-correct' : 'text-feedback-wrong'}`}>
              {isCorrect
                ? `정답${combo >= 3 ? ' · 콤보 보너스' : ''}`
                : selected === 'timeout'
                ? `시간 초과 · 정답: ${current.options[current.answer]}`
                : `오답 · 정답: ${current.options[current.answer]}`}
            </span>
          )}
        </div>

        {/* 선택지 */}
        <div className="flex flex-col gap-3">
          {current.options.map((opt, idx) => (
            <button key={idx} onClick={() => handleSelect(idx)} className={getOptionClass(idx)}>
              <span className="font-bold mr-3 opacity-60">{LABELS[idx]}</span>
              <span>{opt}</span>
              <span className="caption text-current opacity-50 ml-2">({idx + 1})</span>
            </button>
          ))}
        </div>

        {/* 문제 신고 버튼 - 오른쪽 아래 */}
        <div className="mt-4 flex justify-end">
          {reportedIds.has(current.id) ? (
            <span className="caption text-body-gray font-medium">신고 완료</span>
          ) : (
            <button
              onClick={() => setReportOpen(true)}
              className="caption text-muted-gray hover:text-uber-black underline underline-offset-2"
            >
              문제 신고
            </button>
          )}
        </div>
      </div>

      {reportOpen && (
        <ReportModal
          questionId={current.id}
          word={current.word}
          sentence={current.sentence}
          difficulty={difficulty}
          nickname={nickname}
          onClose={() => setReportOpen(false)}
          onReported={(id) => setReportedIds(prev => new Set(prev).add(id))}
        />
      )}
    </div>
  )
}
