import type { Question } from '../types'

export const kpdhQuestions: Question[] = [
  // 한국 신화/초자연 용어
  { id: 1701, sentence: '귀마는 인간의 영혼을 먹고 힘을 키우는 무시무시한 존재입니다.', word: '귀마', options: ['착한 요정', '귀신과 마귀를 합친 말로 악마의 왕', '한국의 전통 악기', '오래된 절'], answer: 1, difficulty: 'kpdh' },
  { id: 1702, sentence: '혼문은 인간 세계와 악마 세계를 나누는 마법의 장벽입니다.', word: '혼문', options: ['학교 정문', '영혼의 문, 마법의 장벽', '전통 악기', '한복의 한 종류'], answer: 1, difficulty: 'kpdh' },
  { id: 1703, sentence: '저승사자는 죽은 사람의 영혼을 저승으로 데려가는 존재입니다.', word: '저승사자', options: ['왕의 신하', '죽은 사람의 영혼을 저승으로 안내하는 사자', '동물원의 사자', '우체부'], answer: 1, difficulty: 'kpdh' },
  { id: 1704, sentence: '도깨비는 한국 전설에 나오는 뿔 달린 장난꾸러기 요괴입니다.', word: '도깨비', options: ['요리사', '한국 전설 속 뿔 달린 요괴', '전통 춤', '한국의 꽃'], answer: 1, difficulty: 'kpdh' },
  { id: 1705, sentence: '귀신은 이승에 미련이 남아 떠도는 영혼을 말합니다.', word: '귀신', options: ['동물', '이승에 떠도는 영혼, 유령', '악기', '음식'], answer: 1, difficulty: 'kpdh' },
  { id: 1706, sentence: '무당은 굿을 통해 귀신과 소통하는 사람입니다.', word: '무당', options: ['의사', '굿을 하며 귀신과 소통하는 사람', '선생님', '농부'], answer: 1, difficulty: 'kpdh' },
  { id: 1707, sentence: '굿은 노래와 춤으로 귀신을 달래는 한국의 전통 의식입니다.', word: '굿', options: ['운동 경기', '노래와 춤으로 귀신을 달래는 전통 의식', '전통 음식', '새해 인사'], answer: 1, difficulty: 'kpdh' },
  { id: 1708, sentence: '사자라는 말에는 심부름꾼이라는 뜻과 동물 사자라는 뜻이 있습니다.', word: '사자', options: ['항상 동물만 뜻한다', '심부름꾼(使者)과 동물 사자(獅子) 두 가지 뜻이 있다', '왕을 뜻한다', '노래를 뜻한다'], answer: 1, difficulty: 'kpdh' },
  { id: 1709, sentence: '마귀는 사람을 나쁜 길로 이끄는 악한 귀신을 말합니다.', word: '마귀', options: ['좋은 친구', '사람을 나쁜 길로 이끄는 악한 귀신', '맛있는 음식', '예쁜 꽃'], answer: 1, difficulty: 'kpdh' },
  { id: 1710, sentence: '영혼은 사람의 몸속에 있다고 믿어지는 정신적 존재입니다.', word: '영혼', options: ['뼈', '사람의 몸속에 있는 정신적 존재', '피부', '근육'], answer: 1, difficulty: 'kpdh' },

  // 한국 전통 문화
  { id: 1711, sentence: '한복은 설날이나 추석 같은 명절에 입는 한국의 전통 옷입니다.', word: '한복', options: ['양복', '한국의 전통 옷', '일본의 옷', '운동복'], answer: 1, difficulty: 'kpdh' },
  { id: 1712, sentence: '갓은 조선 시대 남자들이 머리에 쓰던 검은 모자입니다.', word: '갓', options: ['신발', '조선 시대에 쓰던 전통 모자', '가방', '장갑'], answer: 1, difficulty: 'kpdh' },
  { id: 1713, sentence: '노리개는 한복에 달아서 장식하는 한국의 전통 장신구입니다.', word: '노리개', options: ['장난감', '한복에 다는 전통 장신구', '음식', '신발'], answer: 1, difficulty: 'kpdh' },
  { id: 1714, sentence: '민화는 옛날 서민들이 그린 한국의 전통 그림입니다.', word: '민화', options: ['만화', '서민들이 그린 한국 전통 그림', '사진', '지도'], answer: 1, difficulty: 'kpdh' },
  { id: 1715, sentence: '작호도는 까치와 호랑이를 함께 그린 전통 그림입니다.', word: '작호도', options: ['풍경화', '까치와 호랑이를 그린 전통 그림', '인물화', '꽃 그림'], answer: 1, difficulty: 'kpdh' },
  { id: 1716, sentence: '비파는 줄을 튕겨서 소리를 내는 한국의 전통 악기입니다.', word: '비파', options: ['북', '줄을 튕기는 전통 현악기', '피리', '거울'], answer: 1, difficulty: 'kpdh' },
  { id: 1717, sentence: '판소리는 한 사람이 노래와 이야기를 섞어서 하는 전통 공연입니다.', word: '판소리', options: ['춤', '노래와 이야기를 섞은 전통 공연', '그림', '요리'], answer: 1, difficulty: 'kpdh' },
  { id: 1718, sentence: '아리랑은 한국 사람이라면 누구나 아는 유명한 전통 민요입니다.', word: '아리랑', options: ['음식 이름', '한국의 유명한 전통 민요', '산 이름', '동물 이름'], answer: 1, difficulty: 'kpdh' },
  { id: 1719, sentence: '이승은 살아있는 사람들이 사는 이 세상을 뜻합니다.', word: '이승', options: ['하늘나라', '살아있는 사람들이 사는 세상', '바다 속 세상', '꿈속 세상'], answer: 1, difficulty: 'kpdh' },
  { id: 1720, sentence: '저승은 사람이 죽은 뒤에 간다고 믿어지는 세상입니다.', word: '저승', options: ['학교', '사람이 죽은 뒤에 가는 세상', '놀이공원', '시장'], answer: 1, difficulty: 'kpdh' },

  // K-pop 용어
  { id: 1721, sentence: '아이돌은 노래와 춤으로 무대에 서는 인기 가수를 말합니다.', word: '아이돌', options: ['선생님', '노래와 춤을 하는 인기 가수', '운동선수', '과학자'], answer: 1, difficulty: 'kpdh' },
  { id: 1722, sentence: '음원은 인터넷에서 들을 수 있는 디지털 음악 파일입니다.', word: '음원', options: ['악기', '디지털 음악 파일', '음식', '운동'], answer: 1, difficulty: 'kpdh' },
  { id: 1723, sentence: '컴백은 가수가 새 노래를 발표하고 다시 활동을 시작하는 것입니다.', word: '컴백', options: ['은퇴', '새 노래를 발표하고 다시 활동하는 것', '여행', '졸업'], answer: 1, difficulty: 'kpdh' },
  { id: 1724, sentence: '팬덤은 어떤 가수나 그룹을 좋아하는 팬들의 모임입니다.', word: '팬덤', options: ['동물원', '가수를 좋아하는 팬들의 모임', '도서관', '병원'], answer: 1, difficulty: 'kpdh' },
  { id: 1725, sentence: '막내는 그룹에서 나이가 가장 어린 멤버를 부르는 말입니다.', word: '막내', options: ['리더', '그룹에서 가장 어린 멤버', '가장 나이 많은 멤버', '매니저'], answer: 1, difficulty: 'kpdh' },
  { id: 1726, sentence: '안무는 노래에 맞춰 추는 춤의 동작을 짜놓은 것입니다.', word: '안무', options: ['노래 가사', '노래에 맞춰 짜놓은 춤 동작', '악기 연주', '무대 장치'], answer: 1, difficulty: 'kpdh' },
  { id: 1727, sentence: '무대에서 멤버들이 힘차게 퍼포먼스를 보여주었습니다.', word: '퍼포먼스', options: ['간식', '무대 위에서 보여주는 공연, 연기', '숙제', '여행'], answer: 1, difficulty: 'kpdh' },
  { id: 1728, sentence: '음원 차트에서 1위를 하면 혼문이 더 강해집니다.', word: '차트', options: ['지도', '인기 순위를 매기는 표', '편지', '달력'], answer: 1, difficulty: 'kpdh' },

  // 등장인물과 스토리
  { id: 1731, sentence: '헌트릭스는 악마를 사냥하는 케이팝 걸그룹입니다.', word: '사냥', options: ['도망치는 것', '잡으려고 쫓는 것', '숨는 것', '노래하는 것'], answer: 1, difficulty: 'kpdh' },
  { id: 1732, sentence: '루미는 헌트릭스의 리더이자 메인 보컬입니다.', word: '리더', options: ['막내', '팀을 이끄는 사람', '팬', '매니저'], answer: 1, difficulty: 'kpdh' },
  { id: 1733, sentence: '사자 보이즈는 악마들이 변장한 보이그룹입니다.', word: '변장', options: ['노래하는 것', '다른 모습으로 꾸미는 것', '춤추는 것', '요리하는 것'], answer: 1, difficulty: 'kpdh' },
  { id: 1734, sentence: '셀린은 은퇴한 데몬 헌터이자 루미의 양어머니입니다.', word: '은퇴', options: ['시작하는 것', '활동을 그만두는 것', '여행하는 것', '공부하는 것'], answer: 1, difficulty: 'kpdh' },
  { id: 1735, sentence: '악마들은 팬들의 에너지를 빼앗아 혼문을 무너뜨리려 합니다.', word: '무너뜨리다', options: ['쌓다', '세우다', '부수어 허물다', '지키다'], answer: 2, difficulty: 'kpdh' },
  { id: 1736, sentence: '헌트릭스는 노래의 힘으로 장벽을 유지합니다.', word: '장벽', options: ['다리', '가로막는 벽, 방어막', '계단', '창문'], answer: 1, difficulty: 'kpdh' },
  { id: 1737, sentence: '황금 혼문은 악마를 영원히 봉인할 수 있는 완벽한 장벽입니다.', word: '봉인', options: ['풀어주는 것', '단단히 막아 가두는 것', '노래하는 것', '달리는 것'], answer: 1, difficulty: 'kpdh' },
  { id: 1738, sentence: '진우는 사자 보이즈의 리더로 비파를 가지고 있습니다.', word: '비파', options: ['칼', '줄을 튕기는 전통 현악기', '방패', '거울'], answer: 1, difficulty: 'kpdh' },

  // 감정/성격 관련 한글 단어
  { id: 1741, sentence: '루미는 용감하게 귀마에 맞서 싸웁니다.', word: '용감하다', options: ['겁이 많다', '두려움 없이 씩씩하다', '게으르다', '조용하다'], answer: 1, difficulty: 'kpdh' },
  { id: 1742, sentence: '헌트릭스 멤버들은 서로를 끈끈하게 믿으며 우정을 지킵니다.', word: '우정', options: ['미움', '친구 사이의 정', '경쟁', '질투'], answer: 1, difficulty: 'kpdh' },
  { id: 1743, sentence: '귀마는 교활한 계획을 세워 인간 세계를 노립니다.', word: '교활하다', options: ['순수하다', '꾀가 많고 간사하다', '착하다', '느리다'], answer: 1, difficulty: 'kpdh' },
  { id: 1744, sentence: '조이는 자신감 넘치는 래퍼로 작사도 직접 합니다.', word: '자신감', options: ['슬픔', '자기 자신을 믿는 마음', '걱정', '두려움'], answer: 1, difficulty: 'kpdh' },
  { id: 1745, sentence: '미라는 끈기 있게 연습하여 최고의 댄서가 되었습니다.', word: '끈기', options: ['게으름', '포기하지 않고 끝까지 하는 힘', '재미', '슬픔'], answer: 1, difficulty: 'kpdh' },
  { id: 1746, sentence: '헌트릭스는 역경을 이겨내고 더 강해졌습니다.', word: '역경', options: ['행운', '어렵고 힘든 상황', '즐거움', '휴식'], answer: 1, difficulty: 'kpdh' },
  { id: 1747, sentence: '팬들의 응원이 헌트릭스에게 큰 힘이 됩니다.', word: '응원', options: ['비난', '힘을 내도록 격려하는 것', '무시', '방해'], answer: 1, difficulty: 'kpdh' },
  { id: 1748, sentence: '루미는 셀린의 희생에 감사하며 눈물을 흘렸습니다.', word: '희생', options: ['즐거움', '남을 위해 자신을 바치는 것', '이기심', '거짓말'], answer: 1, difficulty: 'kpdh' },

  // 한국 음식
  { id: 1751, sentence: '김밥은 밥과 여러 재료를 김으로 말아 만든 한국 음식입니다.', word: '김밥', options: ['빵', '밥과 재료를 김으로 말은 음식', '국수', '과자'], answer: 1, difficulty: 'kpdh' },
  { id: 1752, sentence: '라면은 뜨거운 물에 끓여 먹는 한국에서 인기 있는 면 요리입니다.', word: '라면', options: ['과일', '뜨거운 물에 끓이는 면 요리', '샐러드', '떡'], answer: 1, difficulty: 'kpdh' },
  { id: 1753, sentence: '빙수는 얼음을 갈고 달콤한 재료를 올린 여름 간식입니다.', word: '빙수', options: ['뜨거운 국', '얼음을 간 달콤한 여름 간식', '볶음밥', '김치'], answer: 1, difficulty: 'kpdh' },
  { id: 1754, sentence: '떡볶이는 떡을 매콤한 양념에 볶아 만든 길거리 음식입니다.', word: '떡볶이', options: ['생선회', '떡을 매콤하게 볶은 길거리 음식', '과일 주스', '빵'], answer: 1, difficulty: 'kpdh' },

  // 추가 문제
  { id: 1761, sentence: '헌트릭스는 세 명의 수호자가 대대로 혼문을 지켜온 전통을 잇고 있습니다.', word: '수호자', options: ['파괴하는 사람', '소중한 것을 지키는 사람', '구경하는 사람', '도망치는 사람'], answer: 1, difficulty: 'kpdh' },
  { id: 1762, sentence: '귀마는 인간 세계를 정복하려는 야망을 품고 있습니다.', word: '야망', options: ['작은 소원', '크고 대담한 욕심이나 꿈', '슬픈 감정', '두려운 마음'], answer: 1, difficulty: 'kpdh' },
  { id: 1763, sentence: '사자 보이즈는 팬들의 환호 속에 숨겨진 정체를 감추고 있습니다.', word: '정체', options: ['노래 실력', '숨겨진 본래의 모습', '좋아하는 음식', '사는 곳'], answer: 1, difficulty: 'kpdh' },
  { id: 1764, sentence: '조이는 가사를 직접 쓰는 작사가이기도 합니다.', word: '작사', options: ['춤을 추는 것', '노래의 가사를 쓰는 것', '악기를 연주하는 것', '그림을 그리는 것'], answer: 1, difficulty: 'kpdh' },
  { id: 1765, sentence: '헌트릭스의 노래가 차트 순위에서 올라가자 혼문이 강화되었습니다.', word: '강화', options: ['약해지는 것', '더 세고 튼튼해지는 것', '사라지는 것', '변하지 않는 것'], answer: 1, difficulty: 'kpdh' },
  { id: 1766, sentence: '한국에서 호랑이는 나쁜 기운을 쫓아내는 수호 동물로 여겨집니다.', word: '수호 동물', options: ['애완동물', '지키고 보호해 주는 동물', '사냥하는 동물', '동물원의 동물'], answer: 1, difficulty: 'kpdh' },
  { id: 1767, sentence: '귀마의 부하들은 인간의 모습으로 위장하여 사람들 사이에 숨어 있습니다.', word: '위장', options: ['솔직하게 말하는 것', '본모습을 숨기고 다른 모습으로 꾸미는 것', '크게 소리치는 것', '빠르게 달리는 것'], answer: 1, difficulty: 'kpdh' },
  { id: 1768, sentence: '미라는 전통 무용과 현대 춤을 융합한 독특한 안무를 만듭니다.', word: '융합', options: ['나누는 것', '서로 다른 것을 합쳐 새로운 것을 만드는 것', '없애는 것', '복사하는 것'], answer: 1, difficulty: 'kpdh' },
  { id: 1769, sentence: '셀린은 과거의 전투에서 입은 부상 때문에 은퇴할 수밖에 없었습니다.', word: '부상', options: ['선물', '싸움이나 사고로 몸을 다치는 것', '승리', '기쁜 일'], answer: 1, difficulty: 'kpdh' },
  { id: 1770, sentence: '헌트릭스는 결국 단결하여 귀마를 물리치는 데 성공합니다.', word: '단결', options: ['혼자 행동하는 것', '마음과 힘을 하나로 모으는 것', '싸우는 것', '포기하는 것'], answer: 1, difficulty: 'kpdh' },

  // 추가 문제 2
  { id: 1771, sentence: '사자 보이즈는 무대 위에서 매혹적인 공연으로 관객을 사로잡았습니다.', word: '매혹적', options: ['지루한', '마음을 홀리듯 끌어당기는', '무서운', '시끄러운'], answer: 1, difficulty: 'kpdh' },
  { id: 1772, sentence: '헌트릭스의 음악에는 악마를 퇴치하는 신비한 힘이 담겨 있습니다.', word: '퇴치', options: ['도와주는 것', '물리쳐서 쫓아내는 것', '초대하는 것', '따라가는 것'], answer: 1, difficulty: 'kpdh' },
  { id: 1773, sentence: '귀마는 인간 세계를 지배하려는 음모를 오랫동안 꾸며왔습니다.', word: '음모', options: ['좋은 계획', '나쁜 일을 몰래 꾸미는 것', '음악 연습', '요리법'], answer: 1, difficulty: 'kpdh' },
  { id: 1774, sentence: '루미는 셀린에게서 전수받은 능력으로 혼문을 지킵니다.', word: '전수', options: ['빼앗는 것', '기술이나 지식을 가르쳐 넘겨주는 것', '숨기는 것', '잊어버리는 것'], answer: 1, difficulty: 'kpdh' },
  { id: 1775, sentence: '조이의 랩 가사에는 자신의 경험과 감정이 솔직하게 담겨 있습니다.', word: '솔직하다', options: ['거짓말하다', '숨김없이 있는 그대로 말하다', '조용하다', '화내다'], answer: 1, difficulty: 'kpdh' },
  { id: 1776, sentence: '까치는 한국 전통에서 좋은 소식을 전해주는 길조로 알려져 있습니다.', word: '길조', options: ['나쁜 징조', '좋은 일이 생길 조짐', '새의 이름', '노래 제목'], answer: 1, difficulty: 'kpdh' },
  { id: 1777, sentence: '헌트릭스는 연습생 시절부터 혹독한 훈련을 견뎌냈습니다.', word: '혹독하다', options: ['쉽고 편하다', '매우 모질고 심하다', '즐겁다', '따뜻하다'], answer: 1, difficulty: 'kpdh' },
  { id: 1778, sentence: '사자 보이즈의 인기가 치솟으면서 혼문이 점점 약해졌습니다.', word: '치솟다', options: ['내려가다', '갑자기 세차게 올라가다', '멈추다', '천천히 움직이다'], answer: 1, difficulty: 'kpdh' },
  { id: 1779, sentence: '한국의 탈춤은 탈을 쓰고 추는 전통 가면극입니다.', word: '탈춤', options: ['현대 무용', '탈을 쓰고 추는 전통 가면극', '발레', '힙합 댄스'], answer: 1, difficulty: 'kpdh' },
  { id: 1780, sentence: '바비는 헌트릭스의 매니저로 멤버들을 헌신적으로 돌봅니다.', word: '헌신적', options: ['이기적인', '자기를 돌보지 않고 온 힘을 다하는', '게으른', '무관심한'], answer: 1, difficulty: 'kpdh' },
  { id: 1781, sentence: '힐러 한은 독특한 방법으로 상처를 치유하는 의사입니다.', word: '치유', options: ['아프게 하는 것', '병이나 상처를 낫게 하는 것', '무시하는 것', '숨기는 것'], answer: 1, difficulty: 'kpdh' },
]
