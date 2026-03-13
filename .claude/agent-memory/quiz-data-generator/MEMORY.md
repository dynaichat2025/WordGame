# Quiz Data Generator Memory

## Current State of questions.ts / questions-daejanggeum.ts
- questions.ts total: 1204 (last id 1204, unchanged)
- questions-daejanggeum.ts last id: 1234 (30 questions added 2026-03-08)
- daejanggeum total: 134 questions (ids 1101-1234)
- Per-difficulty counts in questions.ts:
  - easy: 368 (ids include 1071-1080)
  - normal: 368 (ids include 1081-1090)
  - hard: 364 (ids include 1091-1100)
  - daejanggeum: 104 (ids 1101-1204, in questions.ts)

## File Structure - questions-daejanggeum.ts
- Path: /Volumes/AppDrive/WIP/Claude Code/WordGame/src/data/questions-daejanggeum.ts
- Import: `import type { Question } from '../types'`
- Export: `export const daejanggeumQuestions: Question[] = [...]`
- Separate from questions.ts — append here only, do NOT touch questions.ts for daejanggeum

## File Structure
- Path: /Volumes/AppDrive/WIP/Claude Code/WordGame/src/data/questions.ts
- Import: `import type { Question, Difficulty } from '../types'`
- Export: `export const questions: Question[] = [...]`
- Helper functions after array: DIFFICULTY_MAP, shuffle, getQuestions

## Edit Strategy
- For large batches (600+): write temp part files, then use Python to insert before closing `]`
- Python insertion pattern: find `"    difficulty: 'hard',\n  },\n]"` at file end and replace
- For small additions (30개 이하): use Edit tool directly, replacing the last `},\n]` block
- New question blocks appended just before the `]` that closes the questions array
- Always delete temp files after merging

## Words Already Used (do not reuse)
See words-used.md for full list. Recent additions (ids 921-1100):
- easy (921-970): 깔깔, 팔랑팔랑, 졸고, 포근했다, 살금살금, 촉촉이, 왁자지껄, 반갑게, 살뜰히, 컬컬했다, 뚝딱, 꼭, 송송, 스르르, 재잘재잘, 풍겼다, 졸졸, 보드랍고, 시원하게, 반짝반짝, 팔딱팔딱, 눈이 부셨다, 날아갈 것 같았다, 맑게 개었다, 칼칼했다, 꼬박꼬박, 뿌듯했다, 쓰다듬어, 확, 뒤덮인다, 담그니, 덮어, 살랑살랑, 펄럭펄럭, 두둥실, 열심히, 주렁주렁, 풍기며, 데굴데굴, 와르르, 토닥토닥, 슬쩍, 보글보글, 뻐끔뻐끔, 방긋, 활짝, 지저귀었다, 소곤소곤, 읽어, 추적추적
- easy (1071-1080): 알록달록, 사뿐사뿐, 해맑은, 뭉클한, 오도독, 폭신폭신, 아롱아롱, 방실방실, 달콤한, 총총
- normal (971-1020): 차분하게, 어색했다, 고른, 감싸, 드디어, 당당히, 반듯했다, 풀린다, 버팀목, 부끄러워하지, 인정하고, 거슬러, 벗어나지, 귀 기울여, 체력, 정겨운, 흠뻑, 투덜댔다, 간추려, 차츰, 들였다, 보람, 복습하며, 또렷하게, 금방, 충실히, 풍습, 파악해야, 존중하며, 강조하셨다, 너그러운, 포기하지, 홀가분했다, 경로, 예방하려면, 풍부해진다, 헤아려, 합의, 뿌듯함, 쌀쌀해져, 탐방했다, 조상들, 신중하게, 실천해야, 역할, 취약한, 성황리에, 캠페인, 소생하는, 감동적으로
- normal (1081-1090): 끈기있게, 사려깊은, 협력하여, 배려하는, 균형잡힌, 도전하는, 지속적인, 소통하며, 주도적인, 근면한
- hard (1021-1070): 굽히지, 부조리, 퇴색하지, 내면, 소용돌이, 둔감했다, 간결하면서도, 사색, 황폐해졌다, 굴복하지, 수난, 침묵하는, 번영, 정체성, 공감하게, 불의, 승화시켰다, 성찰하고, 해체시켰다, 모순, 울분, 유한성, 탐욕, 허위, 역경을, 여운, 안주하지, 과도기, 보장하지, 강인해졌다, 내밀한, 안위, 비애, 귀감, 애도했다, 봉건, 자존감, 저력, 절감했다, 항거했다, 암울함, 역설한다, 반영하는, 수호했다, 진보, 비극, 경제성, 이상, 근원적인, 굳건해졌다
- hard (1091-1100): 편협한, 자성, 포용하는, 명멸하는, 자괴감, 응축된, 갈등하는, 비루한, 초월한, 결연히
- daejanggeum (1101-1120): 수라간, 상궁, 의녀, 어의, 탕약, 수라상, 약재, 처방, 나인, 연회, 침술, 진상, 구중궁궐, 식의, 곤룡포, 숙수, 간택, 어선, 궁녀, 반상
- daejanggeum (1121-1140): 내의원, 혜민서, 본초, 뜸, 경혈, 구절판, 신선로, 약식, 수정과, 식혜, 내명부, 중전, 세자, 내시, 소주방, 침방, 사약, 귀양, 직첩, 한과
- daejanggeum (1141-1170): 전복죽, 잡채, 떡국, 전골, 갈비찜, 맥박, 음양, 한열, 보약, 독초, 해독, 오장육부, 기혈, 사상체질, 외명부, 대전, 동궁, 후원, 상의원, 규장각, 사헌부, 의금부, 영의정, 승지, 사관, 암행어사, 어명, 옥새, 어진, 종묘제례
- daejanggeum (1171-1184, 등장인물): 서장금, 민정호, 최금영, 한상궁, 최상궁, 중종, 장덕, 연생, 오겸호, 신비, 장녹수, 정상궁, 이영로, 신익필
- daejanggeum (1185-1204, 배경지식): 수라, 내전, 편전, 모함, 누명, 복수, 충절, 절개, 사가, 출궁, 삼강오륜, 칠거지악, 적서차별, 조회, 오행, 식치, 약전, 약령시, 탕관, 별감
- daejanggeum (1205-1234, 드라마 배경): 하례, 진찬, 책봉, 수렴청정, 국문, 국상, 어가, 대령, 하직, 국문장, 고신, 삼족, 유배, 참형, 장형, 진맥, 침구, 사혈, 해열, 금기, 의서, 동의보감, 포, 젓갈, 장, 약과, 엿, 죽, 전, 나물

## Quality Notes
- answer distribution: aim for even spread of 0,1,2,3 across questions
- easy: familiar daily life words, short simple sentences, onomatopoeia and mimetic words work well
- normal: social/academic context, moderate complexity
- hard: literary/academic vocabulary, nuanced meaning
- Always verify word appears exactly as token in sentence before writing
- answer: 1 tends to dominate — consciously vary to 0, 2, 3 in future batches
- Duplicate-prone words: 두근두근, 꾸준히, 긍정적인, 성실하게, 살며시, 묵묵히, 적극적인, 자발적인, 통찰 (already used)
