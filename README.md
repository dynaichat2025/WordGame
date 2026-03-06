# 한글 단어 퀴즈 게임

초등학교 5학년 이하(10세 이하) 어린이를 위한 한글 어휘 학습 퀴즈 게임입니다.
문장 속 단어의 뜻을 4지선다로 맞히며 어휘력을 키웁니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:5173 접속

## 배포 (Vercel)

```bash
npm run build
# GitHub에 push 후 Vercel 연동
```

## 게임 규칙

1. 닉네임을 입력하고 난이도를 선택합니다.
2. 문장이 제시되면 파란색으로 강조된 단어의 뜻을 4개 보기 중 고릅니다.
3. 정답 즉시 결과가 표시되고 1.5초 후 다음 문제로 이동합니다.
4. 10문제가 끝나면 최종 점수와 리더보드를 확인합니다.

## 점수 계산

| 항목 | 점수 |
|------|------|
| 기본 점수 | 정답당 10점 |
| 스피드 보너스 | 남은 시간 × 0.5점 |
| 콤보 보너스 | 연속 정답 3개부터 (콤보 - 2) × 2점 추가 |

## 등급 기준

| 등급 | 정확도 |
|------|--------|
| S | 90% 이상 |
| A | 70% 이상 |
| B | 50% 이상 |
| C | 50% 미만 |

## 난이도

| 레벨 | 대상 | 제한 시간 |
|------|------|-----------|
| Easy | 1~2학년 | 60초 |
| Normal | 3~4학년 | 60초 |
| Hard | 5학년 | 60초 |

## 키보드 단축키

- `1` `2` `3` `4` — 보기 선택

## 폴더 구조

```
src/
  components/
    StartScreen.tsx   # 시작 화면
    QuizScreen.tsx    # 퀴즈 화면
    ResultScreen.tsx  # 결과 화면
  data/
    questions.ts      # 문제 데이터 (20개)
  types/
    index.ts          # TypeScript 타입 정의
  App.tsx
  main.tsx
  index.css
```

## 기술 스택

- React + TypeScript
- Vite
- Tailwind CSS v4
- localStorage (리더보드 저장)
