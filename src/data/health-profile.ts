import type { HealthProfile } from '@/lib/types';

export const healthProfile: HealthProfile = {
  background: '110kg에서 80kg으로 8개월간 다이어트 성공. 마라톤 Sub3 경험. 아쿠아슬론/하이록스 도전 목표.',
  goals: ['운동능력향상', '골격근량 증가', '체지방 감소'],
  conditions: [
    {
      name: '신장기능 저하',
      detail: 'GFR 45~50 (일반인의 절반 수준). 과도한 운동으로 인한 횡문근융해증 절대 금지. 분말형 단백질 보충제 섭취 불가.',
      severity: 'critical',
    },
    {
      name: '기립성 저혈압',
      detail: '운동 자세 순서 고려 필요. 바닥 → 앉기 → 서기 순서로 진행 권장.',
      severity: 'moderate',
    },
    {
      name: '장경인대 부상 이력',
      detail: '2026년 1월 좌측 장경인대 염증 치료. 무릎 주변 운동 시 주의.',
      severity: 'mild',
    },
  ],
  nutritionRestrictions: [
    {
      category: '분말형 보충제',
      items: ['단백질 파우더', '크레아틴 파우더', '기타 분말형 보충제'],
      reason: '신장 기능 저하로 인해 분말형 섭취 불가',
    },
    {
      category: '고칼륨 식품',
      items: ['바나나', '키위', '감', '고구마'],
      reason: '신장 기능 저하 시 칼륨 배출 능력 감소',
    },
  ],
  rhabdomyolysisSymptoms: [
    '극심한 근육 약화 또는 통증',
    '어둡거나 갈색빛 소변 (콜라색)',
    '심한 부종 (특히 팔다리)',
    '극도의 피로감',
    '메스꺼움 또는 구토',
    '소변량 감소',
    '발열',
    '혼란 또는 의식 저하',
  ],
};
