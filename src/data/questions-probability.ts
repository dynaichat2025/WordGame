import type { Question } from '../types'

export const probabilityQuestions: Question[] = [
  // ===== A. 기본 용어 (Basic Terms) — IDs 2301~2310 =====
  { id: 2301, sentence: '동전을 던질 때 앞면이 나올 가능성을 영어로 probability라고 해요.', word: 'probability', options: ['확실한 결과', '확률 (일이 일어날 가능성)', '불가능한 사건', '순서대로 일어나는 일'], answer: 1, difficulty: 'probability' },
  { id: 2302, sentence: '비가 올 chance가 높다고 해요. 우산을 가져가세요!', word: 'chance', options: ['가능성 (일이 일어날 수 있는 정도)', '날씨', '약속', '계획'], answer: 0, difficulty: 'probability' },
  { id: 2303, sentence: '제비뽑기에서 누가 당첨될지 모르는 것은 random이라고 해요.', word: 'random', options: ['공정한', '순서대로 정해진', '무작위의 (아무렇게나 정해지는)', '불가능한'], answer: 2, difficulty: 'probability' },
  { id: 2304, sentence: '모든 사람에게 같은 기회를 주는 게임을 fair한 게임이라고 해요.', word: 'fair', options: ['재미있는', '어려운', '빠른', '공정한 (모두에게 같은 기회를 주는)'], answer: 3, difficulty: 'probability' },
  { id: 2305, sentence: '주사위를 던졌을 때 나오는 숫자 하나하나를 outcome이라고 해요.', word: 'outcome', options: ['결과 (실제로 나온 것)', '과정', '규칙', '시작'], answer: 0, difficulty: 'probability' },
  { id: 2306, sentence: '주사위에서 짝수가 나오는 것처럼 관심 있는 결과를 event라고 해요.', word: 'event', options: ['실험', '표본', '사건 (관심 있는 결과의 모음)', '시행'], answer: 2, difficulty: 'probability' },
  { id: 2307, sentence: '동전 던지기나 주사위 굴리기처럼 해보는 활동을 experiment라고 해요.', word: 'experiment', options: ['결과', '실험 (직접 해보는 활동)', '우연', '규칙'], answer: 1, difficulty: 'probability' },
  { id: 2308, sentence: '주사위의 모든 눈 {1,2,3,4,5,6}을 sample space라고 해요.', word: 'sample space', options: ['가장 좋은 결과', '불가능한 결과', '하나의 결과', '표본공간 (나올 수 있는 모든 결과의 모음)'], answer: 3, difficulty: 'probability' },
  { id: 2309, sentence: '공정한 동전에서 앞면과 뒷면은 equally likely해요. 나올 가능성이 같아요!', word: 'equally likely', options: ['불가능한', '같은 가능성을 가진 (똑같이 일어날 수 있는)', '확실한', '서로 다른'], answer: 1, difficulty: 'probability' },
  { id: 2310, sentence: '동전을 한 번 던지는 것을 한 번의 trial이라고 해요.', word: 'trial', options: ['결과', '규칙', '시행 (한 번 해보는 것)', '공간'], answer: 2, difficulty: 'probability' },

  // ===== B. 가능성 척도 (Likelihood Scale) — IDs 2311~2320 =====
  { id: 2311, sentence: '내일 아침에 해가 뜨는 것은 certain한 사건이에요. 반드시 일어나요!', word: 'certain', options: ['불가능한', '확실한 (반드시 일어나는)', '가능성이 낮은', '무작위의'], answer: 1, difficulty: 'probability' },
  { id: 2312, sentence: '사람이 하늘을 날개 없이 나는 것은 impossible한 사건이에요.', word: 'impossible', options: ['가능한', '확실한', '불가능한 (일어날 수 없는)', '가능성이 높은'], answer: 2, difficulty: 'probability' },
  { id: 2313, sentence: '먹구름이 잔뜩 낀 날에 비가 오는 것은 likely한 사건이에요.', word: 'likely', options: ['가능성이 높은 (아마 일어날)', '불가능한', '확실한', '가능성이 반반인'], answer: 0, difficulty: 'probability' },
  { id: 2314, sentence: '맑은 날에 갑자기 눈이 오는 것은 unlikely한 사건이에요.', word: 'unlikely', options: ['확실한', '반반인', '무작위의', '가능성이 낮은 (아마 안 일어날)'], answer: 3, difficulty: 'probability' },
  { id: 2315, sentence: '동전을 던질 때 앞면이 나올 가능성은 even chance예요.', word: 'even chance', options: ['확실한 기회', '반반의 가능성 (절반의 확률)', '불가능한 기회', '매우 높은 기회'], answer: 1, difficulty: 'probability' },
  { id: 2316, sentence: '가위바위보에서 이길 확률과 질 확률은 거의 fifty-fifty예요.', word: 'fifty-fifty', options: ['반반 (50 대 50)', '확실한', '불가능한', '가능성이 낮은'], answer: 0, difficulty: 'probability' },
  { id: 2317, sentence: '로또에 당첨되는 것은 possible하지만 가능성이 아주 낮아요.', word: 'possible', options: ['확실한', '불가능한', '가능한 (일어날 수 있는)', '반반인'], answer: 2, difficulty: 'probability' },
  { id: 2318, sentence: '겨울에 감기에 걸리는 것은 probable한 일이에요. 조심해야 해요!', word: 'probable', options: ['불가능한', '반반인', '확실한', '있을 법한 (일어날 가능성이 꽤 높은)'], answer: 3, difficulty: 'probability' },
  { id: 2319, sentence: '운석이 우리 집 마당에 떨어지는 것은 rare한 사건이에요.', word: 'rare', options: ['드문 (매우 가끔 일어나는)', '흔한', '확실한', '반반인'], answer: 0, difficulty: 'probability' },
  { id: 2320, sentence: '물을 100도까지 가열하면 끓는 것은 guaranteed된 결과예요.', word: 'guaranteed', options: ['가능성이 낮은', '무작위의', '반반인', '보장된 (틀림없이 일어나는)'], answer: 3, difficulty: 'probability' },

  // ===== C. 실생활 확률 (Real-life Probability) — IDs 2321~2330 =====
  { id: 2321, sentence: '일기예보에서 비 올 확률 80%는 비가 올 가능성이 likely하다는 뜻이에요.', word: 'likely', options: ['불가능하다', '가능성이 높다 (아마 일어난다)', '확실하다', '가능성이 낮다'], answer: 1, difficulty: 'probability' },
  { id: 2322, sentence: '동전을 던질 때 앞면이 나오는 것과 뒷면이 나오는 것은 equally likely해요.', word: 'equally likely', options: ['앞면이 더 잘 나온다', '같은 가능성이다 (똑같이 일어날 수 있다)', '뒷면이 더 잘 나온다', '둘 다 불가능하다'], answer: 1, difficulty: 'probability' },
  { id: 2323, sentence: '주사위를 던져서 7이 나오는 것은 impossible해요. 주사위에는 7이 없거든요!', word: 'impossible', options: ['가능성이 낮다', '반반이다', '불가능하다 (절대 일어나지 않는다)', '가능성이 높다'], answer: 2, difficulty: 'probability' },
  { id: 2324, sentence: '빨간 공 8개와 파란 공 2개가 든 주머니에서 빨간 공을 뽑을 확률이 more likely해요.', word: 'more likely', options: ['불가능한', '반반인', '덜 가능한', '더 가능성이 높은 (더 잘 일어나는)'], answer: 3, difficulty: 'probability' },
  { id: 2325, sentence: '카드 한 벌에서 눈을 감고 한 장을 뽑는 것은 random한 선택이에요.', word: 'random', options: ['무작위의 (아무거나 나올 수 있는)', '정해진', '불가능한', '확실한'], answer: 0, difficulty: 'probability' },
  { id: 2326, sentence: '로또에 당첨될 확률은 매우 낮아서 rare한 사건이에요.', word: 'rare', options: ['흔한', '확실한', '드문 (거의 일어나지 않는)', '반반인'], answer: 2, difficulty: 'probability' },
  { id: 2327, sentence: '축구 경기에서 어느 팀이 이길지 예측하는 것은 확률적 outcome을 맞히는 거예요.', word: 'outcome', options: ['규칙', '결과 (실제로 일어나는 것)', '시작', '관객'], answer: 1, difficulty: 'probability' },
  { id: 2328, sentence: '뽑기 상자에서 1등이 나올 확률은 낮지만 possible해요.', word: 'possible', options: ['확실한', '불가능한', '반반인', '가능한 (일어날 수 있는)'], answer: 3, difficulty: 'probability' },
  { id: 2329, sentence: '윷놀이에서 모가 나올지 도가 나올지 미리 알 수 없는 것은 random한 결과이기 때문이에요.', word: 'random', options: ['무작위의 (예측할 수 없는)', '정해진 순서의', '확실한', '불가능한'], answer: 0, difficulty: 'probability' },
  { id: 2330, sentence: '제비뽑기에서 모든 제비를 같은 크기로 만들면 fair한 뽑기가 돼요.', word: 'fair', options: ['어려운', '재미있는', '공정한 (모두에게 같은 기회인)', '빠른'], answer: 2, difficulty: 'probability' },

  // ===== D. 확률 비교 (Comparing Probability) — IDs 2331~2340 =====
  { id: 2331, sentence: '동전을 5번 던져서 모두 앞면이 나왔어요. 다음에 뒷면이 나올 확률은 여전히 fifty-fifty예요.', word: 'fifty-fifty', options: ['뒷면이 더 잘 나온다', '앞면이 더 잘 나온다', '반반 (50 대 50)', '알 수 없다'], answer: 2, difficulty: 'probability' },
  { id: 2332, sentence: '빨간 구슬 3개, 파란 구슬 7개가 있으면 파란 구슬을 뽑는 것이 more likely해요.', word: 'more likely', options: ['더 가능성이 높은 (더 많으니까 더 잘 뽑힌다)', '덜 가능성이 높은', '불가능한', '확실한'], answer: 0, difficulty: 'probability' },
  { id: 2333, sentence: '주사위 두 개를 던질 때 합이 7이 나올 확률과 합이 2가 나올 확률은 equally likely하지 않아요.', word: 'equally likely', options: ['두 확률은 같다', '합이 2가 더 잘 나온다', '합이 12가 가장 잘 나온다', '같은 가능성이 아니다 (합이 7이 나올 경우의 수가 더 많다)'], answer: 3, difficulty: 'probability' },
  { id: 2334, sentence: '동전 던지기에서 이전 결과는 다음 결과에 영향을 주지 않아요. 매번 independent한 사건이에요.', word: 'independent', options: ['관련 있는', '독립적인 (서로 영향을 주지 않는)', '불가능한', '확실한'], answer: 1, difficulty: 'probability' },
  { id: 2335, sentence: '주사위를 아무리 많이 던져도 다음에 나올 숫자에는 영향이 없어요. 각 시행은 independent해요.', word: 'independent', options: ['많이 던지면 결과가 바뀐다', '이전 결과가 다음에 영향을 준다', '독립적이다 (이전 결과와 상관없다)', '항상 같은 숫자가 나온다'], answer: 2, difficulty: 'probability' },
  { id: 2336, sentence: '상자에서 공을 꺼내고 다시 넣지 않으면 다음 뽑기의 확률이 달라져요. 이것은 dependent한 사건이에요.', word: 'dependent', options: ['종속적인 (앞의 결과가 뒤에 영향을 주는)', '독립적인', '불가능한', '공정한'], answer: 0, difficulty: 'probability' },
  { id: 2337, sentence: '6면 주사위에서 1이 나올 확률보다 짝수가 나올 확률이 more likely해요.', word: 'more likely', options: ['1이 더 잘 나온다', '둘 다 같다', '둘 다 불가능하다', '짝수가 더 가능성이 높다 (경우의 수가 더 많다)'], answer: 3, difficulty: 'probability' },
  { id: 2338, sentence: '빨간 공만 10개 들어 있는 주머니에서 파란 공을 뽑는 것은 impossible해요.', word: 'impossible', options: ['가능성이 높다', '불가능하다 (파란 공이 없으니까)', '반반이다', '가능성이 낮다'], answer: 1, difficulty: 'probability' },
  { id: 2339, sentence: '흰 공 5개, 검은 공 5개가 있으면 흰 공을 뽑을 확률과 검은 공을 뽑을 확률은 fifty-fifty예요.', word: 'fifty-fifty', options: ['흰 공이 더 잘 나온다', '검은 공이 더 잘 나온다', '둘 다 불가능하다', '반반이다 (같은 개수이니까 확률이 같다)'], answer: 3, difficulty: 'probability' },
  { id: 2340, sentence: '노란 공 1개, 초록 공 9개가 든 주머니에서 노란 공을 뽑는 것은 less likely해요.', word: 'less likely', options: ['가능성이 더 낮은 (개수가 적어서 잘 안 뽑힌다)', '가능성이 더 높은', '확실한', '불가능한'], answer: 0, difficulty: 'probability' },
]
