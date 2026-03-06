import { useState } from 'react'
import type { Difficulty, Question, Screen } from './types'
import { getQuestions } from './data/questions'
import StartScreen from './components/StartScreen'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'

interface GameState {
  screen: Screen
  nickname: string
  difficulty: Difficulty
  questions: Question[]
  score: number
  correct: number
}

const initialState: GameState = {
  screen: 'start',
  nickname: '',
  difficulty: 'normal',
  questions: [],
  score: 0,
  correct: 0,
}

export default function App() {
  const [state, setState] = useState<GameState>(initialState)

  const handleStart = (nickname: string, difficulty: Difficulty) => {
    setState({
      screen: 'quiz',
      nickname,
      difficulty,
      questions: getQuestions(difficulty, 10),
      score: 0,
      correct: 0,
    })
  }

  const handleFinish = (score: number, correct: number) => {
    setState(s => ({ ...s, screen: 'result', score, correct }))
  }

  const handleRetry = () => {
    setState(s => ({
      ...s,
      screen: 'quiz',
      questions: getQuestions(s.difficulty, 10),
      score: 0,
      correct: 0,
    }))
  }

  const handleHome = () => setState(initialState)

  if (state.screen === 'start') return <StartScreen onStart={handleStart} />

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
      score={state.score}
      correct={state.correct}
      total={state.questions.length}
      difficulty={state.difficulty}
      onRetry={handleRetry}
      onHome={handleHome}
    />
  )
}
