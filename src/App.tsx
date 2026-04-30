import { useState, useCallback, lazy, Suspense } from 'react'
import type { Difficulty, Question, Screen } from './types'
import { getQuestions } from './data/questions'
import { getQuestionsForStudent, updateMastery } from './data/students'
import StartScreen from './components/StartScreen'
import QuizScreen from './components/QuizScreen'

const ResultScreen = lazy(() => import('./components/ResultScreen'))
const TeacherScreen = lazy(() => import('./components/TeacherScreen'))

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

const SuspenseFallback = (
  <div className="min-h-screen bg-uber-white flex items-center justify-center">
    <div className="font-display text-xl font-bold text-uber-black">로딩 중</div>
  </div>
)

export default function App() {
  const [state, setState] = useState<GameState>(initialState)
  const [loading, setLoading] = useState(false)

  const handleStart = useCallback(async (nickname: string, difficulty: Difficulty, studentId?: string) => {
    setLoading(true)
    const questions = await (studentId
      ? getQuestionsForStudent(difficulty, studentId)
      : getQuestions(difficulty, 10))
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
  }, [])

  const handleFinish = useCallback((score: number, correct: number, answers: AnswerRecord[]) => {
    setState(s => {
      if (s.studentId) {
        updateMastery(s.studentId, s.difficulty, answers.map(a => ({
          questionId: a.question.id,
          isCorrect: a.isCorrect,
        })))
      }
      return { ...s, screen: 'result' as const, score, correct, answers }
    })
  }, [])

  const handleRetry = useCallback(async () => {
    setLoading(true)
    setState(s => {
      const fetchQuestions = s.studentId
        ? getQuestionsForStudent(s.difficulty, s.studentId)
        : getQuestions(s.difficulty, 10)
      fetchQuestions.then(questions => {
        setLoading(false)
        setState(prev => ({
          ...prev,
          screen: 'quiz',
          questions,
          score: 0,
          correct: 0,
          answers: [],
        }))
      })
      return s
    })
  }, [])

  const handleHome = useCallback(() => setState(initialState), [])

  if (loading) return (
    <div className="min-h-screen bg-uber-white flex items-center justify-center">
      <div className="font-display text-xl font-bold text-uber-black">문제 준비 중</div>
    </div>
  )

  if (state.screen === 'teacher') return (
    <Suspense fallback={SuspenseFallback}>
      <TeacherScreen onClose={handleHome} />
    </Suspense>
  )

  if (state.screen === 'start') return <StartScreen onStart={handleStart} onTeacher={() => setState(s => ({ ...s, screen: 'teacher' }))} />

  if (state.screen === 'quiz') {
    return (
      <QuizScreen
        questions={state.questions}
        difficulty={state.difficulty}
        nickname={state.nickname}
        onFinish={handleFinish}
      />
    )
  }

  return (
    <Suspense fallback={SuspenseFallback}>
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
    </Suspense>
  )
}
