import type { Question } from '../types'

export const mathQuestions: Question[] = [
  // 덧셈
  { id: 1301, sentence: '사과 3개와 귤 5개를 합치면 모두 몇 개인가요?', word: '합치면', options: ['6개', '7개', '8개', '9개'], answer: 2, difficulty: 'math' },
  { id: 1302, sentence: '12 + 7의 값은 얼마인가요?', word: '12 + 7', options: ['17', '18', '19', '20'], answer: 2, difficulty: 'math' },
  { id: 1303, sentence: '25 + 18의 값은 얼마인가요?', word: '25 + 18', options: ['41', '42', '43', '44'], answer: 2, difficulty: 'math' },
  { id: 1304, sentence: '버스에 8명이 타고 있었는데 정류장에서 6명이 더 탔습니다. 모두 몇 명인가요?', word: '더 탔습니다', options: ['12명', '13명', '14명', '15명'], answer: 2, difficulty: 'math' },
  { id: 1305, sentence: '37 + 45의 값은 얼마인가요?', word: '37 + 45', options: ['80', '81', '82', '83'], answer: 2, difficulty: 'math' },
  { id: 1306, sentence: '연필 15자루와 색연필 9자루를 합치면 모두 몇 자루인가요?', word: '합치면', options: ['22자루', '23자루', '24자루', '25자루'], answer: 2, difficulty: 'math' },
  { id: 1307, sentence: '56 + 27의 값은 얼마인가요?', word: '56 + 27', options: ['81', '82', '83', '84'], answer: 2, difficulty: 'math' },
  { id: 1308, sentence: '148 + 235의 값은 얼마인가요?', word: '148 + 235', options: ['381', '382', '383', '384'], answer: 2, difficulty: 'math' },

  // 뺄셈
  { id: 1311, sentence: '사탕 15개 중에서 7개를 먹으면 몇 개가 남나요?', word: '먹으면', options: ['6개', '7개', '8개', '9개'], answer: 2, difficulty: 'math' },
  { id: 1312, sentence: '20 - 8의 값은 얼마인가요?', word: '20 - 8', options: ['10', '11', '12', '13'], answer: 2, difficulty: 'math' },
  { id: 1313, sentence: '43 - 17의 값은 얼마인가요?', word: '43 - 17', options: ['24', '25', '26', '27'], answer: 2, difficulty: 'math' },
  { id: 1314, sentence: '도서관에 책이 50권 있었는데 13권을 빌려갔습니다. 남은 책은 몇 권인가요?', word: '빌려갔습니다', options: ['35권', '36권', '37권', '38권'], answer: 2, difficulty: 'math' },
  { id: 1315, sentence: '82 - 35의 값은 얼마인가요?', word: '82 - 35', options: ['45', '46', '47', '48'], answer: 2, difficulty: 'math' },
  { id: 1316, sentence: '100 - 36의 값은 얼마인가요?', word: '100 - 36', options: ['62', '63', '64', '65'], answer: 2, difficulty: 'math' },
  { id: 1317, sentence: '500 - 178의 값은 얼마인가요?', word: '500 - 178', options: ['320', '321', '322', '323'], answer: 2, difficulty: 'math' },

  // 곱셈
  { id: 1321, sentence: '3 × 7의 값은 얼마인가요?', word: '3 × 7', options: ['18', '19', '20', '21'], answer: 3, difficulty: 'math' },
  { id: 1322, sentence: '한 봉지에 사탕이 6개씩 들어있습니다. 4봉지면 사탕은 모두 몇 개인가요?', word: '6개씩', options: ['20개', '22개', '24개', '26개'], answer: 2, difficulty: 'math' },
  { id: 1323, sentence: '8 × 9의 값은 얼마인가요?', word: '8 × 9', options: ['70', '71', '72', '73'], answer: 2, difficulty: 'math' },
  { id: 1324, sentence: '5 × 12의 값은 얼마인가요?', word: '5 × 12', options: ['55', '58', '60', '62'], answer: 2, difficulty: 'math' },
  { id: 1325, sentence: '한 줄에 의자가 7개씩 놓여 있습니다. 6줄이면 의자는 모두 몇 개인가요?', word: '7개씩', options: ['40개', '41개', '42개', '43개'], answer: 2, difficulty: 'math' },
  { id: 1326, sentence: '9 × 6의 값은 얼마인가요?', word: '9 × 6', options: ['52', '53', '54', '55'], answer: 2, difficulty: 'math' },
  { id: 1327, sentence: '4 × 8의 값은 얼마인가요?', word: '4 × 8', options: ['30', '31', '32', '33'], answer: 2, difficulty: 'math' },
  { id: 1328, sentence: '15 × 3의 값은 얼마인가요?', word: '15 × 3', options: ['43', '44', '45', '46'], answer: 2, difficulty: 'math' },

  // 나눗셈
  { id: 1331, sentence: '24 ÷ 6의 값은 얼마인가요?', word: '24 ÷ 6', options: ['3', '4', '5', '6'], answer: 1, difficulty: 'math' },
  { id: 1332, sentence: '쿠키 20개를 5명에게 똑같이 나누면 한 명에게 몇 개씩인가요?', word: '나누면', options: ['3개', '4개', '5개', '6개'], answer: 1, difficulty: 'math' },
  { id: 1333, sentence: '56 ÷ 8의 값은 얼마인가요?', word: '56 ÷ 8', options: ['6', '7', '8', '9'], answer: 1, difficulty: 'math' },
  { id: 1334, sentence: '72 ÷ 9의 값은 얼마인가요?', word: '72 ÷ 9', options: ['7', '8', '9', '10'], answer: 1, difficulty: 'math' },
  { id: 1335, sentence: '색종이 36장을 4명에게 똑같이 나누면 한 명에게 몇 장인가요?', word: '나누면', options: ['7장', '8장', '9장', '10장'], answer: 2, difficulty: 'math' },
  { id: 1336, sentence: '45 ÷ 5의 값은 얼마인가요?', word: '45 ÷ 5', options: ['7', '8', '9', '10'], answer: 2, difficulty: 'math' },
  { id: 1337, sentence: '63 ÷ 7의 값은 얼마인가요?', word: '63 ÷ 7', options: ['7', '8', '9', '10'], answer: 2, difficulty: 'math' },

  // 분수
  { id: 1341, sentence: '피자 한 판을 4조각으로 나눈 것 중 1조각은 전체의 얼마인가요?', word: '1조각', options: ['1/2', '1/3', '1/4', '1/5'], answer: 2, difficulty: 'math' },
  { id: 1342, sentence: '1/2 + 1/2의 값은 얼마인가요?', word: '1/2 + 1/2', options: ['1/2', '2/4', '1', '2'], answer: 2, difficulty: 'math' },
  { id: 1343, sentence: '3/4과 2/4 중 어느 것이 더 큰가요?', word: '더 큰가요', options: ['2/4', '3/4', '같다', '비교할 수 없다'], answer: 1, difficulty: 'math' },
  { id: 1344, sentence: '케이크를 8조각으로 나눈 것 중 3조각을 먹었습니다. 남은 것은 전체의 얼마인가요?', word: '남은 것', options: ['3/8', '4/8', '5/8', '6/8'], answer: 2, difficulty: 'math' },
  { id: 1345, sentence: '1/3 + 1/3의 값은 얼마인가요?', word: '1/3 + 1/3', options: ['1/3', '2/3', '2/6', '1'], answer: 1, difficulty: 'math' },

  // 시간과 시계
  { id: 1351, sentence: '2시간 30분은 모두 몇 분인가요?', word: '2시간 30분', options: ['120분', '130분', '150분', '160분'], answer: 2, difficulty: 'math' },
  { id: 1352, sentence: '영화가 1시 20분에 시작하여 3시 10분에 끝났습니다. 영화는 몇 분 동안 상영했나요?', word: '몇 분 동안', options: ['100분', '110분', '120분', '130분'], answer: 1, difficulty: 'math' },
  { id: 1353, sentence: '90분은 몇 시간 몇 분인가요?', word: '90분', options: ['1시간 20분', '1시간 30분', '1시간 40분', '2시간'], answer: 1, difficulty: 'math' },

  // 길이와 단위
  { id: 1361, sentence: '1m는 몇 cm인가요?', word: '1m', options: ['10cm', '50cm', '100cm', '1000cm'], answer: 2, difficulty: 'math' },
  { id: 1362, sentence: '3km 200m는 모두 몇 m인가요?', word: '3km 200m', options: ['320m', '3020m', '3200m', '32000m'], answer: 2, difficulty: 'math' },
  { id: 1363, sentence: '250cm는 몇 m 몇 cm인가요?', word: '250cm', options: ['2m 5cm', '2m 50cm', '25m', '25m 0cm'], answer: 1, difficulty: 'math' },

  // 무게
  { id: 1371, sentence: '1kg은 몇 g인가요?', word: '1kg', options: ['10g', '100g', '1000g', '10000g'], answer: 2, difficulty: 'math' },
  { id: 1372, sentence: '수박의 무게가 3kg 500g입니다. 이것은 모두 몇 g인가요?', word: '3kg 500g', options: ['350g', '3050g', '3500g', '35000g'], answer: 2, difficulty: 'math' },

  // 도형
  { id: 1381, sentence: '삼각형의 세 각의 크기를 모두 더하면 얼마인가요?', word: '세 각', options: ['90도', '120도', '180도', '360도'], answer: 2, difficulty: 'math' },
  { id: 1382, sentence: '사각형의 네 각의 크기를 모두 더하면 얼마인가요?', word: '네 각', options: ['180도', '270도', '360도', '480도'], answer: 2, difficulty: 'math' },
  { id: 1383, sentence: '정사각형의 한 변의 길이가 5cm일 때, 둘레는 얼마인가요?', word: '둘레', options: ['15cm', '20cm', '25cm', '30cm'], answer: 1, difficulty: 'math' },
  { id: 1384, sentence: '직사각형의 가로가 8cm, 세로가 3cm일 때, 넓이는 얼마인가요?', word: '넓이', options: ['11cm²', '22cm²', '24cm²', '32cm²'], answer: 2, difficulty: 'math' },
  { id: 1385, sentence: '한 변의 길이가 4cm인 정사각형의 넓이는 얼마인가요?', word: '넓이', options: ['8cm²', '12cm²', '16cm²', '20cm²'], answer: 2, difficulty: 'math' },

  // 규칙과 패턴
  { id: 1391, sentence: '2, 5, 8, 11, □에서 □에 알맞은 수는 무엇인가요?', word: '□에 알맞은 수', options: ['12', '13', '14', '15'], answer: 2, difficulty: 'math' },
  { id: 1392, sentence: '1, 4, 9, 16, □에서 □에 알맞은 수는 무엇인가요?', word: '□에 알맞은 수', options: ['20', '22', '25', '28'], answer: 2, difficulty: 'math' },
  { id: 1393, sentence: '3, 6, 12, 24, □에서 □에 알맞은 수는 무엇인가요?', word: '□에 알맞은 수', options: ['30', '36', '42', '48'], answer: 3, difficulty: 'math' },

  // 혼합 문장제
  { id: 1401, sentence: '한 상자에 공이 12개씩 들어 있습니다. 3상자에서 8개를 꺼내면 남은 공은 몇 개인가요?', word: '남은 공', options: ['26개', '28개', '30개', '32개'], answer: 1, difficulty: 'math' },
  { id: 1402, sentence: '과자 한 봉지에 500원입니다. 3봉지를 사고 2000원을 냈을 때 거스름돈은 얼마인가요?', word: '거스름돈', options: ['300원', '400원', '500원', '600원'], answer: 2, difficulty: 'math' },
  { id: 1403, sentence: '어떤 수에 7을 더하면 25가 됩니다. 어떤 수는 무엇인가요?', word: '어떤 수', options: ['16', '17', '18', '19'], answer: 2, difficulty: 'math' },
  { id: 1404, sentence: '형은 12살이고, 동생은 형보다 4살 어립니다. 두 사람의 나이를 합하면 몇 살인가요?', word: '합하면', options: ['18살', '19살', '20살', '21살'], answer: 2, difficulty: 'math' },
  { id: 1405, sentence: '운동장에 남학생 23명과 여학생 19명이 있습니다. 전체 학생은 몇 명인가요?', word: '전체 학생', options: ['40명', '41명', '42명', '43명'], answer: 2, difficulty: 'math' },
  { id: 1406, sentence: '어떤 수를 6으로 나누면 몫이 8이고 나머지가 3입니다. 어떤 수는 무엇인가요?', word: '어떤 수', options: ['48', '49', '50', '51'], answer: 3, difficulty: 'math' },
  { id: 1407, sentence: '가로가 6cm, 세로가 4cm인 직사각형의 둘레는 얼마인가요?', word: '둘레', options: ['18cm', '20cm', '22cm', '24cm'], answer: 1, difficulty: 'math' },
  { id: 1408, sentence: '길이가 1m 20cm인 끈에서 45cm를 잘랐습니다. 남은 끈의 길이는 얼마인가요?', word: '남은 끈', options: ['65cm', '70cm', '75cm', '80cm'], answer: 2, difficulty: 'math' },
]
