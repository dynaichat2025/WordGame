import { useState } from 'react'
import type { Difficulty } from '../types'
import { reportQuestion } from '../data/students'

interface Props {
  questionId: number
  word: string
  sentence: string
  difficulty: Difficulty
  nickname: string
  onClose: () => void
  onReported: (questionId: number) => void
}

export default function ReportModal({ questionId, word, sentence, difficulty, nickname, onClose, onReported }: Props) {
  const [reason, setReason] = useState('')
  const [sending, setSending] = useState(false)

  const submit = async () => {
    setSending(true)
    try {
      await reportQuestion({
        questionId,
        difficulty,
        word,
        sentence,
        reporterName: nickname,
        reason,
      })
      onReported(questionId)
      onClose()
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-uber-white rounded-card shadow-card p-6 w-full max-w-sm">
        <h3 className="font-display text-lg font-bold text-uber-black mb-4">문제 신고</h3>
        <div className="bg-chip-gray rounded-card p-4 mb-4 text-sm">
          <p className="caption text-body-gray">단어</p>
          <p className="font-bold text-uber-black">{word}</p>
          <p className="caption text-body-gray mt-2">문장</p>
          <p className="text-body-gray">{sentence}</p>
        </div>
        <textarea
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder="어떤 점이 이상한가요? (선택)"
          className="input w-full text-sm resize-none h-24 mb-4"
        />
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="btn btn-secondary flex-1 text-sm"
          >
            취소
          </button>
          <button
            onClick={submit}
            disabled={sending}
            className="btn btn-primary flex-1 text-sm disabled:opacity-50"
          >
            {sending ? '전송 중' : '신고하기'}
          </button>
        </div>
      </div>
    </div>
  )
}
