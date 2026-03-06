import type { Question, Difficulty } from '../types'

export const questions: Question[] = [
  // easy (1~2학년)
  {
    id: 1,
    sentence: '엄마가 바구니에 사과를 가득 담아 왔다.',
    word: '가득',
    options: ['조금', '넘치도록 많이', '겨우', '따로따로'],
    answer: 1,
    difficulty: 'easy',
  },
  {
    id: 2,
    sentence: '강아지는 나에게 소중한 친구이다.',
    word: '소중한',
    options: ['귀찮은', '낯선', '매우 귀하고 중요한', '작고 귀여운'],
    answer: 2,
    difficulty: 'easy',
  },
  {
    id: 3,
    sentence: '할머니의 손은 따뜻하고 부드러웠다.',
    word: '따뜻하고',
    options: ['차갑고', '온도가 알맞게 높고', '거칠고', '딱딱하고'],
    answer: 1,
    difficulty: 'easy',
  },
  {
    id: 4,
    sentence: '동생은 넘어져서 엉엉 울었다.',
    word: '엉엉',
    options: ['조용히', '크게 소리 내어', '살짝', '깜짝 놀라며'],
    answer: 1,
    difficulty: 'easy',
  },
  {
    id: 5,
    sentence: '날씨가 맑아서 기분이 상쾌했다.',
    word: '상쾌했다',
    options: ['답답했다', '졸렸다', '기분이 시원하고 좋았다', '무서웠다'],
    answer: 2,
    difficulty: 'easy',
  },
  {
    id: 6,
    sentence: '친구가 넘어졌을 때 얼른 달려가 도와주었다.',
    word: '얼른',
    options: ['천천히', '몰래', '빠르게', '억지로'],
    answer: 2,
    difficulty: 'easy',
  },
  {
    id: 7,
    sentence: '아침마다 꼭 이를 닦는 것은 올바른 습관이다.',
    word: '습관',
    options: ['오래된 물건', '자주 반복하여 굳어진 행동', '좋은 음식', '새로운 생각'],
    answer: 1,
    difficulty: 'easy',
  },
  {
    id: 8,
    sentence: '수업이 끝나고 운동장에서 신나게 뛰어놀았다.',
    word: '신나게',
    options: ['억지로', '무섭게', '즐겁고 흥겹게', '조용하게'],
    answer: 2,
    difficulty: 'easy',
  },
  // normal (3~4학년)
  {
    id: 9,
    sentence: '아버지는 매일 일찍 일어나는 부지런한 분이시다.',
    word: '부지런한',
    options: ['게으른', '쉬지 않고 열심히 일하는', '조용한', '무서운'],
    answer: 1,
    difficulty: 'normal',
  },
  {
    id: 10,
    sentence: '도서관에서는 조심스럽게 걸어야 한다.',
    word: '조심스럽게',
    options: ['빠르게', '크게 소리치며', '실수하지 않도록 주의하며', '신나게'],
    answer: 2,
    difficulty: 'normal',
  },
  {
    id: 11,
    sentence: '추수가 끝난 들판은 텅 비어 쓸쓸해 보였다.',
    word: '쓸쓸해',
    options: ['반갑고 기뻐', '외롭고 허전해', '시끄럽고 복잡해', '따뜻하고 아늑해'],
    answer: 1,
    difficulty: 'normal',
  },
  {
    id: 12,
    sentence: '할머니는 손자에게 넉넉한 용돈을 주셨다.',
    word: '넉넉한',
    options: ['아주 적은', '부족하지 않고 여유 있는', '무거운', '빛나는'],
    answer: 1,
    difficulty: 'normal',
  },
  {
    id: 13,
    sentence: '선생님은 틀린 답을 쓴 아이에게 부드럽게 타일렀다.',
    word: '타일렀다',
    options: ['크게 야단쳤다', '칭찬했다', '잘 알아듣도록 달래며 말했다', '못 본 척했다'],
    answer: 2,
    difficulty: 'normal',
  },
  {
    id: 14,
    sentence: '그 아이는 어려운 상황에서도 의연하게 행동했다.',
    word: '의연하게',
    options: ['흔들리지 않고 침착하게', '크게 소리 지르며', '슬프게 울며', '도망가며'],
    answer: 0,
    difficulty: 'normal',
  },
  {
    id: 15,
    sentence: '비가 오자 개울물이 불어나 도로까지 넘쳤다.',
    word: '불어나',
    options: ['줄어들어', '양이 늘어나', '없어져', '얼어붙어'],
    answer: 1,
    difficulty: 'normal',
  },
  {
    id: 16,
    sentence: '친구의 생일을 깜빡 잊어버려서 미안했다.',
    word: '깜빡',
    options: ['일부러', '잠깐 잊어버리는 모양', '천천히', '크게'],
    answer: 1,
    difficulty: 'normal',
  },
  // hard (5학년)
  {
    id: 17,
    sentence: '할머니 댁은 허름한 골목 끝에 있었다.',
    word: '허름한',
    options: ['낡고 보잘것없는', '밝고 화려한', '크고 넓은', '새롭고 깨끗한'],
    answer: 0,
    difficulty: 'hard',
  },
  {
    id: 18,
    sentence: '이렇게 맑은 날씨는 겨울에 드물다.',
    word: '드물다',
    options: ['자주 있다', '매우 흔하다', '좀처럼 없어 흔하지 않다', '위험하다'],
    answer: 2,
    difficulty: 'hard',
  },
  {
    id: 19,
    sentence: '산속 나무들이 빽빽하게 들어서 있어 햇빛이 닿지 않았다.',
    word: '빽빽하게',
    options: ['드문드문', '사이가 없을 만큼 촘촘하게', '가볍게', '크게'],
    answer: 1,
    difficulty: 'hard',
  },
  {
    id: 20,
    sentence: '오랜 가뭄으로 강바닥이 드러날 만큼 메말랐다.',
    word: '메말랐다',
    options: ['넘쳐흘렀다', '깨끗해졌다', '수분이 없어 바짝 말랐다', '차갑게 얼었다'],
    answer: 2,
    difficulty: 'hard',
  },
]

const DIFFICULTY_MAP: Record<Difficulty, Difficulty[]> = {
  easy: ['easy'],
  normal: ['easy', 'normal'],
  hard: ['easy', 'normal', 'hard'],
}

// Fisher-Yates 셔플 (균일한 무작위성 보장)
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function getQuestions(difficulty: Difficulty, count = 10): Question[] {
  const levels = DIFFICULTY_MAP[difficulty]
  const filtered = questions.filter(q => levels.includes(q.difficulty))
  const shuffled = shuffle(filtered)
  // 문항이 count보다 적을 경우 있는 만큼만 반환
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
