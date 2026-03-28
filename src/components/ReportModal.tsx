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
      <div className="bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm">
        <h3 className="font-bold text-gray-800 mb-3">문제 신고</h3>
        <div className="bg-gray-50 rounded-xl p-3 mb-3 text-sm">
          <p className="text-gray-500 text-xs mb-1">단어</p>
          <p className="font-bold text-gray-800">{word}</p>
          <p className="text-gray-500 text-xs mt-2 mb-1">문장</p>
          <p className="text-gray-700">{sentence}</p>
        </div>
        <textarea
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder="어떤 점이 이상한가요? (선택)"
          className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none h-20 mb-3"
        />
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 border-2 border-gray-200 text-gray-500 font-bold py-2.5 rounded-xl hover:bg-gray-50 active:scale-95 transition-all text-sm"
          >
            취소
          </button>
          <button
            onClick={submit}
            disabled={sending}
            className="flex-1 bg-orange-500 text-white font-bold py-2.5 rounded-xl hover:bg-orange-600 active:scale-95 transition-all text-sm disabled:opacity-50"
          >
            {sending ? '전송 중...' : '신고하기'}
          </button>
        </div>
      </div>
    </div>
  )
}
