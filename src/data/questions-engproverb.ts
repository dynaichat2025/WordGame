import type { Question } from '../types'

export const engproverbQuestions: Question[] = [
  // 노력과 성공
  { id: 1601, sentence: 'Practice makes perfect라는 말처럼 연습을 많이 해야 해요.', word: 'Practice makes perfect', options: ['연습이 어렵다', '연습이 완벽을 만든다', '완벽한 연습이 필요하다', '연습은 필요 없다'], answer: 1, difficulty: 'engproverb' },
  { id: 1602, sentence: 'No pain, no gain이라는 말을 기억하며 열심히 했어요.', word: 'No pain, no gain', options: ['아프면 안 된다', '고통 없이는 얻는 것도 없다', '이익이 없다', '고통이 싫다'], answer: 1, difficulty: 'engproverb' },
  { id: 1603, sentence: 'Where there is a will, there is a way라고 포기하지 마세요.', word: 'Where there is a will, there is a way', options: ['길이 있다', '뜻이 있는 곳에 길이 있다', '의지가 필요하다', '길을 찾아야 한다'], answer: 1, difficulty: 'engproverb' },
  { id: 1604, sentence: 'Rome was not built in a day처럼 꾸준히 노력하면 됩니다.', word: 'Rome was not built in a day', options: ['로마가 크다', '큰 일은 하루아침에 이루어지지 않는다', '로마를 여행해야 한다', '하루가 짧다'], answer: 1, difficulty: 'engproverb' },
  { id: 1605, sentence: 'The early bird catches the worm이라고 일찍 일어났어요.', word: 'The early bird catches the worm', options: ['새가 벌레를 잡는다', '일찍 일어나는 새가 벌레를 잡는다', '아침이 좋다', '벌레가 많다'], answer: 1, difficulty: 'engproverb' },
  { id: 1606, sentence: 'Never put off till tomorrow what you can do today라고 합니다.', word: 'Never put off till tomorrow what you can do today', options: ['내일은 없다', '오늘 할 수 있는 일을 내일로 미루지 마라', '내일 해도 된다', '오늘이 중요하다'], answer: 1, difficulty: 'engproverb' },
  { id: 1607, sentence: 'A journey of a thousand miles begins with a single step이에요.', word: 'A journey of a thousand miles begins with a single step', options: ['여행이 길다', '천 리 길도 한 걸음부터 시작된다', '한 걸음이 중요하다', '걸어야 한다'], answer: 1, difficulty: 'engproverb' },

  // 지혜와 교훈
  { id: 1611, sentence: 'Actions speak louder than words라고 행동으로 보여줘야 해요.', word: 'Actions speak louder than words', options: ['말이 중요하다', '행동이 말보다 더 큰 힘을 가진다', '큰 소리로 말해야 한다', '행동이 시끄럽다'], answer: 1, difficulty: 'engproverb' },
  { id: 1612, sentence: 'Honesty is the best policy라고 정직하게 말했어요.', word: 'Honesty is the best policy', options: ['정책이 좋다', '정직이 최선의 방책이다', '정직하면 손해다', '정책을 따라야 한다'], answer: 1, difficulty: 'engproverb' },
  { id: 1613, sentence: 'Better late than never라고 지금이라도 시작하세요.', word: 'Better late than never', options: ['늦으면 안 된다', '안 하는 것보다 늦더라도 하는 것이 낫다', '일찍 해야 한다', '절대 늦지 마라'], answer: 1, difficulty: 'engproverb' },
  { id: 1614, sentence: 'Don\'t judge a book by its cover라고 겉모습만 보면 안 돼요.', word: 'Don\'t judge a book by its cover', options: ['책 표지가 중요하다', '겉모습만으로 판단하지 마라', '책을 읽어야 한다', '표지를 바꿔야 한다'], answer: 1, difficulty: 'engproverb' },
  { id: 1615, sentence: 'Think before you speak라고 말하기 전에 생각해야 해요.', word: 'Think before you speak', options: ['말하지 마라', '말하기 전에 생각하라', '생각이 중요하다', '빨리 말해야 한다'], answer: 1, difficulty: 'engproverb' },
  { id: 1616, sentence: 'Look before you leap라고 신중하게 결정해야 해요.', word: 'Look before you leap', options: ['뛰어야 한다', '뛰기 전에 살펴보라 (신중하게 행동하라)', '높이 뛰어야 한다', '앞을 봐야 한다'], answer: 1, difficulty: 'engproverb' },
  { id: 1617, sentence: 'Knowledge is power라고 열심히 공부합시다.', word: 'Knowledge is power', options: ['힘이 세야 한다', '아는 것이 힘이다', '공부가 어렵다', '힘이 중요하다'], answer: 1, difficulty: 'engproverb' },

  // 인간관계
  { id: 1621, sentence: 'A friend in need is a friend indeed라고 진정한 친구를 알게 됐어요.', word: 'A friend in need is a friend indeed', options: ['친구가 많아야 한다', '어려울 때 돕는 친구가 진정한 친구다', '친구에게 도움을 청해야 한다', '필요할 때만 친구다'], answer: 1, difficulty: 'engproverb' },
  { id: 1622, sentence: 'Birds of a feather flock together라고 비슷한 애들끼리 모여요.', word: 'Birds of a feather flock together', options: ['새가 모인다', '같은 깃털의 새들이 모인다 (유유상종)', '새를 키워야 한다', '깃털이 중요하다'], answer: 1, difficulty: 'engproverb' },
  { id: 1623, sentence: 'Two heads are better than one이라고 같이 생각해 봅시다.', word: 'Two heads are better than one', options: ['머리가 둘이다', '둘이 함께 생각하면 더 낫다 (백지장도 맞들면 낫다)', '하나면 충분하다', '머리가 좋아야 한다'], answer: 1, difficulty: 'engproverb' },
  { id: 1624, sentence: 'Do unto others as you would have them do unto you라고 해요.', word: 'Do unto others as you would have them do unto you', options: ['남을 도와야 한다', '남에게 대접받고 싶은 대로 남을 대접하라', '자기가 먼저 해야 한다', '남을 따라해야 한다'], answer: 1, difficulty: 'engproverb' },
  { id: 1625, sentence: 'Blood is thicker than water라고 가족이 가장 중요해요.', word: 'Blood is thicker than water', options: ['피가 진하다', '피는 물보다 진하다 (가족이 가장 소중하다)', '물이 필요하다', '피를 조심해야 한다'], answer: 1, difficulty: 'engproverb' },
  { id: 1626, sentence: 'Love is blind라고 사랑에 빠지면 단점이 안 보여요.', word: 'Love is blind', options: ['사랑이 아프다', '사랑은 눈이 멀다 (사랑하면 결점이 안 보인다)', '눈이 나쁘다', '사랑이 어렵다'], answer: 1, difficulty: 'engproverb' },

  // 경고와 조심
  { id: 1631, sentence: 'Haste makes waste라고 서두르지 마세요.', word: 'Haste makes waste', options: ['빨리 해야 한다', '서두르면 일을 그르친다', '낭비하면 안 된다', '빠른 게 좋다'], answer: 1, difficulty: 'engproverb' },
  { id: 1632, sentence: 'Curiosity killed the cat처럼 지나친 호기심은 위험해요.', word: 'Curiosity killed the cat', options: ['고양이가 죽었다', '지나친 호기심은 화를 부른다', '고양이가 궁금하다', '호기심이 좋다'], answer: 1, difficulty: 'engproverb' },
  { id: 1633, sentence: 'Don\'t cry over spilled milk라고 이미 지난 일은 잊으세요.', word: 'Don\'t cry over spilled milk', options: ['우유를 흘리면 안 된다', '이미 엎질러진 일에 울지 마라', '우유가 비싸다', '울면 안 된다'], answer: 1, difficulty: 'engproverb' },
  { id: 1634, sentence: 'Too many cooks spoil the broth라고 사람이 너무 많아도 안 돼요.', word: 'Too many cooks spoil the broth', options: ['요리사가 많아야 한다', '요리사가 너무 많으면 국을 망친다 (사공이 많으면 배가 산으로 간다)', '국이 맛없다', '요리가 어렵다'], answer: 1, difficulty: 'engproverb' },
  { id: 1635, sentence: 'All that glitters is not gold라고 겉모습에 속지 마세요.', word: 'All that glitters is not gold', options: ['금이 비싸다', '반짝인다고 다 금은 아니다 (겉모습에 속지 마라)', '빛나는 것이 좋다', '금을 사야 한다'], answer: 1, difficulty: 'engproverb' },
  { id: 1636, sentence: 'An apple a day keeps the doctor away라고 건강을 챙기세요.', word: 'An apple a day keeps the doctor away', options: ['사과가 맛있다', '하루에 사과 하나면 의사가 필요 없다 (건강 관리가 중요하다)', '의사를 피해야 한다', '매일 과일을 먹어야 한다'], answer: 1, difficulty: 'engproverb' },

  // 긍정과 희망
  { id: 1641, sentence: 'Every cloud has a silver lining이라고 희망을 가지세요.', word: 'Every cloud has a silver lining', options: ['구름이 예쁘다', '모든 구름에는 은빛 테두리가 있다 (고생 끝에 낙이 온다)', '은이 비싸다', '구름이 많다'], answer: 1, difficulty: 'engproverb' },
  { id: 1642, sentence: 'When life gives you lemons, make lemonade라고 긍정적으로 생각해요.', word: 'When life gives you lemons, make lemonade', options: ['레몬이 맛있다', '어려운 상황을 긍정적으로 바꿔라', '레모네이드를 만들어야 한다', '인생이 시다'], answer: 1, difficulty: 'engproverb' },
  { id: 1643, sentence: 'After a storm comes a calm이라고 곧 좋아질 거예요.', word: 'After a storm comes a calm', options: ['폭풍이 무섭다', '폭풍이 지나면 고요가 온다 (고진감래)', '날씨가 좋다', '폭풍을 피해야 한다'], answer: 1, difficulty: 'engproverb' },
  { id: 1644, sentence: 'Hope for the best, prepare for the worst라고 합니다.', word: 'Hope for the best, prepare for the worst', options: ['최고가 좋다', '최선을 바라되, 최악에 대비하라', '준비가 필요 없다', '걱정하지 마라'], answer: 1, difficulty: 'engproverb' },
  { id: 1645, sentence: 'Tomorrow is another day라고 내일은 또 새로운 날이에요.', word: 'Tomorrow is another day', options: ['내일이 없다', '내일은 또 다른 날이다 (새로운 기회가 있다)', '오늘이 중요하다', '내일 해도 된다'], answer: 1, difficulty: 'engproverb' },

  // 돈과 가치
  { id: 1651, sentence: 'Money doesn\'t grow on trees라고 돈을 아껴 써야 해요.', word: 'Money doesn\'t grow on trees', options: ['나무가 중요하다', '돈은 나무에서 자라지 않는다 (돈은 쉽게 벌 수 없다)', '나무를 심어야 한다', '돈이 많다'], answer: 1, difficulty: 'engproverb' },
  { id: 1652, sentence: 'Time is money라고 시간을 낭비하지 마세요.', word: 'Time is money', options: ['시계가 비싸다', '시간은 돈이다 (시간을 소중히 여겨라)', '돈이 중요하다', '시간이 없다'], answer: 1, difficulty: 'engproverb' },
  { id: 1653, sentence: 'The best things in life are free라는 말이 있어요.', word: 'The best things in life are free', options: ['공짜가 좋다', '인생에서 가장 좋은 것들은 돈으로 살 수 없다', '무료가 최고다', '돈이 필요 없다'], answer: 1, difficulty: 'engproverb' },
  { id: 1654, sentence: 'A penny saved is a penny earned라고 절약이 중요해요.', word: 'A penny saved is a penny earned', options: ['동전을 모아야 한다', '절약한 한 푼은 번 한 푼과 같다', '돈을 벌어야 한다', '동전이 작다'], answer: 1, difficulty: 'engproverb' },

  // 생활의 지혜
  { id: 1661, sentence: 'Laughter is the best medicine이라고 많이 웃으세요.', word: 'Laughter is the best medicine', options: ['약이 좋다', '웃음이 최고의 약이다', '웃으면 안 된다', '약을 먹어야 한다'], answer: 1, difficulty: 'engproverb' },
  { id: 1662, sentence: 'When in Rome, do as the Romans do라고 적응해야 해요.', word: 'When in Rome, do as the Romans do', options: ['로마에 가야 한다', '로마에 가면 로마법을 따르라 (그 곳의 풍습을 따르라)', '로마 사람이 되어야 한다', '로마가 좋다'], answer: 1, difficulty: 'engproverb' },
  { id: 1663, sentence: 'Seeing is believing이라고 직접 보고 나서야 믿었어요.', word: 'Seeing is believing', options: ['보는 것이 좋다', '보는 것이 믿는 것이다 (백문이 불여일견)', '믿어야 한다', '눈이 중요하다'], answer: 1, difficulty: 'engproverb' },
  { id: 1664, sentence: 'You can\'t have your cake and eat it too라고 하나만 골라야 해요.', word: 'You can\'t have your cake and eat it too', options: ['케이크가 맛있다', '두 가지를 동시에 가질 수 없다', '케이크를 먹으면 안 된다', '케이크를 사야 한다'], answer: 1, difficulty: 'engproverb' },
  { id: 1665, sentence: 'Easy come, easy go라고 쉽게 번 돈은 쉽게 없어져요.', word: 'Easy come, easy go', options: ['쉬운 게 좋다', '쉽게 온 것은 쉽게 간다', '빨리 가야 한다', '쉽게 오면 좋다'], answer: 1, difficulty: 'engproverb' },
  { id: 1666, sentence: 'Silence is golden이라고 가끔은 조용한 것이 좋아요.', word: 'Silence is golden', options: ['금이 좋다', '침묵은 금이다', '조용히 해야 한다', '소리가 싫다'], answer: 1, difficulty: 'engproverb' },
  { id: 1667, sentence: 'Necessity is the mother of invention이라고 어려울 때 아이디어가 나와요.', word: 'Necessity is the mother of invention', options: ['발명이 중요하다', '필요는 발명의 어머니다', '어머니가 발명했다', '필요한 것을 사야 한다'], answer: 1, difficulty: 'engproverb' },
  { id: 1668, sentence: 'The pen is mightier than the sword라고 글의 힘은 위대해요.', word: 'The pen is mightier than the sword', options: ['펜이 비싸다', '펜은 칼보다 강하다 (글의 힘이 무력보다 강하다)', '칼이 위험하다', '펜을 사야 한다'], answer: 1, difficulty: 'engproverb' },
]
