import { useEffect, useMemo, useRef, useState } from 'react'
import type { Difficulty, PlayerRecord } from '../types'
import type { AnswerRecord } from '../App'
import { saveGameRecord, loadLeaderboard } from '../data/students'
import ReportModal from './ReportModal'
import NoteCard from './NoteCard'
import TabPills from './TabPills'

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

import { DIFFICULTY_LABEL } from '../constants/difficulty'

const GRADE_INFO = {
  S: { message: '완벽해요' },
  A: { message: '훌륭해요' },
  B: { message: '잘했어요' },
  C: { message: '다시 도전' },
}


type Tab = 'result' | 'wrong' | 'correct'

export default function ResultScreen({ nickname, studentId, score, correct, total, difficulty, answers, onRetry, onHome }: Props) {
  const [records, setRecords] = useState<PlayerRecord[]>([])
  const [myRank, setMyRank] = useState(-1)
  const [displayScore, setDisplayScore] = useState(0)
  const [tab, setTab] = useState<Tab>('result')
  const [reportTarget, setReportTarget] = useState<AnswerRecord | null>(null)
  const [reportedIds, setReportedIds] = useState<Set<number>>(new Set())

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
    <div className="min-h-screen bg-uber-white flex items-center justify-center p-4">
      <div className="bg-uber-white rounded-card shadow-card p-6 w-full max-w-sm">

        {/* 결과 헤더 */}
        <div className="text-center mb-6">
          <h2 className="font-display text-2xl font-bold text-uber-black">{nickname}님의 결과</h2>
        </div>

        <TabPills
          className="mb-6"
          value={tab}
          onChange={setTab}
          items={[
            { key: 'result', label: '결과' },
            { key: 'wrong', label: `오답노트 ${wrongAnswers.length}` },
            { key: 'correct', label: `정답노트 ${correctAnswers.length}` },
          ]}
        />

        {/* 결과 탭 */}
        {tab === 'result' && (
          <>
            <div className="bg-chip-gray rounded-feat p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-display text-[80px] font-bold leading-none text-uber-black">{grade}</div>
                  <div className="text-sm text-body-gray mt-2">{gradeInfo.message}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-3xl font-bold text-uber-black">{displayScore}점</div>
                  <div className="caption text-body-gray mt-1">{DIFFICULTY_LABEL[difficulty]}</div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-body-gray border-t border-muted-gray pt-4 mt-4">
                <span>정답 <strong className="text-uber-black">{correct}/{total}</strong></span>
                <span>정확도 <strong className="text-uber-black">{accuracy}%</strong></span>
                {myRank >= 0 && <span>순위 <strong className="text-uber-black">{myRank + 1}위</strong></span>}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-body-gray mb-2">
                <span>정확도</span><span>{accuracy}%</span>
              </div>
              <div className="h-1 bg-chip-gray rounded-pill overflow-hidden">
                <div className="h-full bg-uber-black rounded-pill transition-all duration-1000" style={{ width: `${accuracy}%` }} />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-display font-bold text-base text-uber-black mb-3">리더보드 Top 10</h3>
              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
                {records.map((r, i) => (
                  <div
                    key={r._id ?? i}
                    className={`flex items-center gap-2 px-3 py-2 rounded-card text-sm ${
                      i === myRank ? 'bg-chip-gray border border-uber-black font-bold' : 'bg-uber-white border border-chip-gray'
                    }`}
                  >
                    <span className="w-6 font-bold text-uber-black">{i < 3 ? '★ ' : ''}{i + 1}</span>
                    <span className="flex-1 text-uber-black truncate">{r.nickname}</span>
                    <span className="micro text-body-gray">{DIFFICULTY_LABEL[r.difficulty]}</span>
                    <span className="font-bold text-uber-black">{r.score}점</span>
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
              <div className="text-center py-10">
                <p className="text-body-gray">오답이 없어요.</p>
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
              <div className="text-center py-10">
                <p className="text-body-gray">정답이 없어요. 다시 도전하세요.</p>
              </div>
            ) : (
              correctAnswers.map((item, i) => (
                <NoteCard key={i} item={item} onReport={handleReport} reported={reportedIds.has(item.question.id)} />
              ))
            )}
          </div>
        )}

        {/* 버튼 */}
        <div className="flex gap-3 mt-6">
          <button onClick={onHome} className="btn btn-secondary flex-1 py-3 text-base">
            처음으로
          </button>
          <button onClick={onRetry} className="btn btn-primary flex-1 py-3 text-base">
            다시 하기
          </button>
        </div>
      </div>

      {reportTarget && (
        <ReportModal
          questionId={reportTarget.question.id}
          word={reportTarget.question.word}
          sentence={reportTarget.question.sentence}
          difficulty={difficulty}
          nickname={nickname}
          onClose={() => setReportTarget(null)}
          onReported={(id) => setReportedIds(prev => new Set(prev).add(id))}
        />
      )}
    </div>
  )
}
