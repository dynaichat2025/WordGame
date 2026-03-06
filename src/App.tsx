import { useState } from 'react'
import type { Difficulty, Question, Screen } from './types'
import { getQuestions } from './data/questions'
import { getQuestionsForStudent, updateMastery } from './data/students'
import StartScreen from './components/StartScreen'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'
import TeacherScreen from './components/TeacherScreen'

export interface AnswerRecord {
  question: Question
  selected: number | 'timeout'
  isCorrect: boolean
}

interface GameState {
  screen: Screen
  nickname: string
  studentId?: string
  difficulty: Difficulty
  questions: Question[]
  score: number
  correct: number
  answers: AnswerRecord[]
}

const initialState: GameState = {
  screen: 'start',
  nickname: '',
  studentId: undefined,
  difficulty: 'normal',
  questions: [],
  score: 0,
  correct: 0,
  answers: [],
}

export default function App() {
  const [state, setState] = useState<GameState>(initialState)
  const [loading, setLoading] = useState(false)

  const handleStart = async (nickname: string, difficulty: Difficulty, studentId?: string) => {
    setLoading(true)
    const questions = studentId
      ? await getQuestionsForStudent(difficulty, studentId)
      : getQuestions(difficulty, 10)
    setLoading(false)
    setState({
      screen: 'quiz',
      nickname,
      studentId,
      difficulty,
      questions,
      score: 0,
      correct: 0,
      answers: [],
    })
  }

  const handleFinish = (score: number, correct: number, answers: AnswerRecord[]) => {
    if (state.studentId) {
      updateMastery(state.studentId, state.difficulty, answers.map(a => ({
        questionId: a.question.id,
        isCorrect: a.isCorrect,
      })))
    }
    setState(s => ({ ...s, screen: 'result', score, correct, answers }))
  }

  const handleRetry = async () => {
    setLoading(true)
    const questions = state.studentId
      ? await getQuestionsForStudent(state.difficulty, state.studentId)
      : getQuestions(state.difficulty, 10)
    setLoading(false)
    setState(s => ({
      ...s,
      screen: 'quiz',
      questions,
      score: 0,
      correct: 0,
      answers: [],
    }))
  }

  const handleHome = () => setState(initialState)

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-600 flex items-center justify-center">
      <div className="text-white text-xl font-bold">문제 준비 중...</div>
    </div>
  )

  if (state.screen === 'teacher') return <TeacherScreen onClose={handleHome} />

  if (state.screen === 'start') return <StartScreen onStart={handleStart} onTeacher={() => setState(s => ({ ...s, screen: 'teacher' }))} />

  if (state.screen === 'quiz') {
    return (
      <QuizScreen
        questions={state.questions}
        difficulty={state.difficulty}
        onFinish={handleFinish}
      />
    )
  }

  return (
    <ResultScreen
      nickname={state.nickname}
      studentId={state.studentId}
      score={state.score}
      correct={state.correct}
      total={state.questions.length}
      difficulty={state.difficulty}
      answers={state.answers}
      onRetry={handleRetry}
      onHome={handleHome}
    />
  )
}
