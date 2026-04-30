import type { AnswerRecord } from '../App'
import { findHighlight } from './QuizScreen'

interface Props {
  item: AnswerRecord
  onReport?: (item: AnswerRecord) => void
  reported?: boolean
}

export default function NoteCard({ item, onReport, reported }: Props) {
  const { question, selected, isCorrect } = item
  const selectedLabel =
    selected === 'timeout' ? '시간 초과' : `${question.options[selected as number]}`
  const hl = findHighlight(question.sentence, question.word)

  return (
    <div className="rounded-card border border-chip-gray bg-uber-white p-6 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <span aria-hidden="true" className="font-bold text-uber-black">{isCorrect ? '✓' : '✗'}</span>
        <span className="caption font-medium text-body-gray">{isCorrect ? '정답' : '오답'}</span>
      </div>

      <p className="caption text-body-gray mb-1">문장</p>
      <p className="text-base font-medium text-uber-black mb-3 leading-relaxed">
        {hl ? (
          <>
            {hl.before}
            <span className="font-bold underline underline-offset-2 text-uber-black">{hl.match}</span>
            {hl.after}
          </>
        ) : question.sentence}
      </p>

      <div className="flex flex-col gap-1 text-sm">
        <div className="flex gap-2">
          <span className="caption text-body-gray font-medium w-12 shrink-0">정답</span>
          <span className="text-uber-black">{question.options[question.answer]}</span>
        </div>
        {!isCorrect && (
          <div className="flex gap-2">
            <span className="caption text-body-gray font-medium w-12 shrink-0">내 답</span>
            <span className="text-body-gray">{selectedLabel}</span>
          </div>
        )}
      </div>

      {onReport && (
        <div className="mt-3 flex justify-end">
          {reported ? (
            <span className="caption text-body-gray font-medium">신고 완료</span>
          ) : (
            <button
              onClick={() => onReport(item)}
              className="caption text-muted-gray hover:text-uber-black underline underline-offset-2"
            >
              문제 신고
            </button>
          )}
        </div>
      )}
    </div>
  )
}
