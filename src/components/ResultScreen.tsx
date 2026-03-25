import { useEffect, useMemo, useRef, useState } from 'react'
import type { Difficulty, PlayerRecord } from '../types'
import type { AnswerRecord } from '../App'
import { saveGameRecord, loadLeaderboard, reportQuestion } from '../data/students'

interface Props {
  nickname: string
  studentId?: string
  score: number
  correct: number
  total: number
  difficulty: Difficulty
  answers: AnswerRecord[]
  onRetry: () => void
  onHome: () => void
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: '쉬움',
  normal: '보통',
  hard: '어려움',
  daejanggeum: '대장금',
  math: '수학',
  proverb: '속담',
  engproverb: '영어속담',
  kpdh: '데몬헌터',
  uselem: 'Elementary',
  usmiddle: 'Middle',
}

const GRADE_INFO = {
  S: { color: 'text-yellow-500', bg: 'bg-yellow-50', message: '완벽해요! 🌟' },
  A: { color: 'text-blue-500',   bg: 'bg-blue-50',   message: '훌륭해요! 👍' },
  B: { color: 'text-green-500',  bg: 'bg-green-50',  message: '잘했어요! 😊' },
  C: { color: 'text-gray-400',   bg: 'bg-gray-50',   message: '다시 도전! 💪' },
}


type Tab = 'result' | 'wrong' | 'correct'

function NoteCard({ item, onReport, reported }: { item: AnswerRecord; onReport: (item: AnswerRecord) => void; reported: boolean }) {
  const { question, selected, isCorrect } = item
  const selectedLabel =
    selected === 'timeout'
      ? '⏰ 시간 초과'
      : `${question.options[selected as number]}`

  return (
    <div className={`rounded-2xl border-2 p-4 mb-3 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
      {/* 문장 */}
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

      {/* 정답 */}
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex gap-2">
          <span className="text-green-600 font-bold w-12 shrink-0">정답</span>
          <span className="text-gray-800">{question.options[question.answer]}</span>
        </div>
        {!isCorrect && (
          <div className="flex gap-2">
            <span className="text-red-500 font-bold w-12 shrink-0">내 답</span>
            <span className="text-gray-600">{selectedLabel}</span>
          </div>
        )}
      </div>

      {/* 신고 버튼 */}
      <div className="mt-2 flex justify-end">
        {reported ? (
          <span className="text-xs text-orange-400 font-medium">신고 완료</span>
        ) : (
          <button
            onClick={() => onReport(item)}
            className="text-xs text-gray-400 hover:text-orange-500 transition-colors"
          >
            문제 신고
          </button>
        )}
      </div>
    </div>
  )
}

export default function ResultScreen({ nickname, studentId, score, correct, total, difficulty, answers, onRetry, onHome }: Props) {
  const [records, setRecords] = useState<PlayerRecord[]>([])
  const [myRank, setMyRank] = useState(-1)
  const [displayScore, setDisplayScore] = useState(0)
  const [tab, setTab] = useState<Tab>('result')
  const [reportTarget, setReportTarget] = useState<AnswerRecord | null>(null)
  const [reportReason, setReportReason] = useState('')
  const [reportedIds, setReportedIds] = useState<Set<number>>(new Set())
  const [reportSending, setReportSending] = useState(false)

  const accuracy = Math.round((correct / total) * 100)
  const grade = accuracy >= 90 ? 'S' : accuracy >= 70 ? 'A' : accuracy >= 50 ? 'B' : 'C'
  const gradeInfo = GRADE_INFO[grade]

  const wrongAnswers = useMemo(() => answers.filter(a => !a.isCorrect), [answers])
  const correctAnswers = useMemo(() => answers.filter(a => a.isCorrect), [answers])

  // 점수 카운트업 애니메이션
  useEffect(() => {
    if (score === 0) { setDisplayScore(0); return }
    let current = 0
    const step = Math.ceil(score / 30)
    const timer = setInterval(() => {
      current = Math.min(current + step, score)
      setDisplayScore(current)
      if (current >= score) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [score])

  const handleReport = (item: AnswerRecord) => {
    setReportTarget(item)
    setReportReason('')
  }

  const submitReport = async () => {
    if (!reportTarget) return
    setReportSending(true)
    try {
      await reportQuestion({
        questionId: reportTarget.question.id,
        difficulty,
        word: reportTarget.question.word,
        sentence: reportTarget.question.sentence,
        reporterName: nickname,
        reason: reportReason,
      })
      setReportedIds(prev => new Set(prev).add(reportTarget.question.id))
      setReportTarget(null)
      setReportReason('')
    } finally {
      setReportSending(false)
    }
  }

  // StrictMode 이중 실행 방지
  const savedRef = useRef(false)
  useEffect(() => {
    if (savedRef.current) return
    savedRef.current = true
    const record: PlayerRecord = {
      studentId,
      nickname, score, correct, total, difficulty,
      date: new Date().toLocaleDateString('ko-KR'),
    }
    saveGameRecord(record, answers).then(insertedId => {
      return loadLeaderboard().then(top10 => {
        setRecords(top10)
        const rank = insertedId !== null ? top10.findIndex(r => r._id === insertedId) : -1
        setMyRank(rank)
      })
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm">

        {/* 결과 헤더 */}
        <div className="text-center mb-4">
          <div className="text-4xl mb-1">🎊</div>
          <h2 className="text-xl font-bold text-gray-800">{nickname}님의 결과</h2>
        </div>

        {/* 탭 */}
        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-4">
          {([
            { key: 'result', label: '결과' },
            { key: 'wrong',  label: `오답노트 ${wrongAnswers.length}` },
            { key: 'correct', label: `정답노트 ${correctAnswers.length}` },
          ] as { key: Tab; label: string }[]).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                tab === t.key ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 결과 탭 */}
        {tab === 'result' && (
          <>
            <div className={`${gradeInfo.bg} rounded-2xl p-4 mb-4`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className={`text-6xl font-black leading-none ${gradeInfo.color}`}>{grade}</div>
                  <div className="text-gray-500 text-sm mt-1">{gradeInfo.message}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-700">{displayScore}점</div>
                  <div className="text-gray-400 text-sm mt-1">{DIFFICULTY_LABEL[difficulty]}</div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 border-t border-gray-200 pt-3">
                <span>정답 <strong className="text-gray-800">{correct}/{total}</strong></span>
                <span>정확도 <strong className="text-gray-800">{accuracy}%</strong></span>
                {myRank >= 0 && <span>순위 <strong className="text-blue-600">{myRank + 1}위</strong></span>}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>정확도</span><span>{accuracy}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${accuracy}%` }} />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-gray-700 mb-2 text-sm">🏆 리더보드 Top 10</h3>
              <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1">
                {records.map((r, i) => (
                  <div
                    key={r._id ?? i}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${
                      i === myRank ? 'bg-blue-100 border-2 border-blue-400 font-bold' : 'bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <span className={`w-5 font-bold ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-amber-600' : 'text-gray-400'}`}>{i + 1}</span>
                    <span className="flex-1 text-gray-700 truncate">{r.nickname}</span>
                    <span className="text-gray-400 text-xs">{DIFFICULTY_LABEL[r.difficulty]}</span>
                    <span className="text-blue-700 font-bold">{r.score}점</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 오답노트 탭 */}
        {tab === 'wrong' && (
          <div className="max-h-[420px] overflow-y-auto pr-1">
            {wrongAnswers.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <div className="text-4xl mb-2">🎉</div>
                <p className="font-medium">오답이 없어요! 완벽해요!</p>
              </div>
            ) : (
              wrongAnswers.map((item, i) => (
                <NoteCard key={i} item={item} onReport={handleReport} reported={reportedIds.has(item.question.id)} />
              ))
            )}
          </div>
        )}

        {/* 정답노트 탭 */}
        {tab === 'correct' && (
          <div className="max-h-[420px] overflow-y-auto pr-1">
            {correctAnswers.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <div className="text-4xl mb-2">😢</div>
                <p className="font-medium">정답이 없어요. 다시 도전해봐요!</p>
              </div>
            ) : (
              correctAnswers.map((item, i) => (
                <NoteCard key={i} item={item} onReport={handleReport} reported={reportedIds.has(item.question.id)} />
              ))
            )}
          </div>
        )}

        {/* 버튼 */}
        <div className="flex gap-3 mt-4">
          <button onClick={onHome} className="flex-1 border-2 border-blue-300 text-blue-600 font-bold py-3 rounded-2xl hover:bg-blue-50 active:scale-95 transition-all text-base">
            처음으로
          </button>
          <button onClick={onRetry} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl active:scale-95 transition-all shadow-md text-base">
            다시 하기
          </button>
        </div>
      </div>

      {/* 문제 신고 모달 */}
      {reportTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm">
            <h3 className="font-bold text-gray-800 mb-3">문제 신고</h3>
            <div className="bg-gray-50 rounded-xl p-3 mb-3 text-sm">
              <p className="text-gray-500 text-xs mb-1">단어</p>
              <p className="font-bold text-gray-800">{reportTarget.question.word}</p>
              <p className="text-gray-500 text-xs mt-2 mb-1">문장</p>
              <p className="text-gray-700">{reportTarget.question.sentence}</p>
            </div>
            <textarea
              value={reportReason}
              onChange={e => setReportReason(e.target.value)}
              placeholder="어떤 점이 이상한가요? (선택)"
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none h-20 mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setReportTarget(null)}
                className="flex-1 border-2 border-gray-200 text-gray-500 font-bold py-2.5 rounded-xl hover:bg-gray-50 active:scale-95 transition-all text-sm"
              >
                취소
              </button>
              <button
                onClick={submitReport}
                disabled={reportSending}
                className="flex-1 bg-orange-500 text-white font-bold py-2.5 rounded-xl hover:bg-orange-600 active:scale-95 transition-all text-sm disabled:opacity-50"
              >
                {reportSending ? '전송 중...' : '신고하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
