다음 조건에 맞는 한글 단어 퀴즈 문제를 생성하고 `src/data/questions.ts` 파일에 추가해줘.

## 조건

- 난이도: $ARGUMENTS (easy / normal / hard 중 하나. 미입력 시 normal)
- 생성 개수: 5개
- 대상: 초등학교 5학년 이하 (10세 이하)

## 문제 형식

```ts
{
  id: number,          // 기존 마지막 id + 1부터 순서대로
  sentence: string,    // 타깃 단어가 자연스럽게 포함된 완전한 문장
  word: string,        // 문장 안의 타깃 단어 (sentence 안에 정확히 일치해야 함)
  options: [string, string, string, string],  // 뜻 4개 (정답 1개 + 오답 3개)
  answer: 0 | 1 | 2 | 3,  // 정답 인덱스
  difficulty: 'easy' | 'normal' | 'hard',
}
```

## 난이도 기준

- easy: 1~2학년 수준 (예: 가득, 따뜻한, 소중한, 신나게)
- normal: 3~4학년 수준 (예: 부지런한, 조심스럽게, 넉넉한, 의연하게)
- hard: 5학년 수준 (예: 허름한, 드물다, 빽빽한, 메말랐다)

## 규칙

1. sentence 안에 word가 반드시 포함되어야 함 (문자열 일치)
2. 오답 3개는 정답과 혼동할 수 있을 만큼 그럴듯해야 함
3. 기존 questions.ts에 있는 단어와 중복되지 않도록 함
4. 문장은 어린이가 이해할 수 있는 자연스러운 한국어 문장으로 작성
5. 생성 후 questions.ts의 questions 배열 끝에 추가

## 작업 순서

1. 현재 `src/data/questions.ts` 파일을 읽어 기존 문제와 마지막 id 확인
2. 조건에 맞는 문제 5개 생성
3. 파일에 추가 후 결과 요약 출력
