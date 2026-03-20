import { healthProfile } from '@/data/health-profile';
import type { HealthCondition } from '@/lib/types';
import { AlertTriangle, AlertCircle } from 'lucide-react';

const severityConfig: Record<HealthCondition['severity'], { label: string; className: string }> = {
  critical: { label: '중요', className: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700' },
  moderate: { label: '보통', className: 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700' },
  mild: { label: '경미', className: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700' },
};

export default function HealthPage() {
  return (
    <div className="px-4 py-4 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">건강 프로필</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{healthProfile.background}</p>
      </div>

      {/* Emergency note */}
      <div className="bg-red-50 dark:bg-red-950 border-2 border-red-400 dark:border-red-600 rounded-xl p-4">
        <p className="text-sm font-bold text-red-800 dark:text-red-200">
          <AlertTriangle className="w-4 h-4 inline mr-1" /> 증상 발생 시 즉시 운동 중단 후 응급실 방문
        </p>
      </div>

      {/* Health conditions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">건강 상태</h3>
        <div className="space-y-3">
          {healthProfile.conditions.map((condition) => {
            const config = severityConfig[condition.severity];
            return (
              <div
                key={condition.name}
                className={`rounded-xl border p-4 ${config.className}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{condition.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full border font-medium ${config.className}`}>
                    {config.label}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{condition.detail}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rhabdomyolysis checklist */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          횡문근융해증 증상 체크리스트
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          아래 증상 중 하나라도 나타나면 즉시 운동을 중단하고 의료기관을 방문하세요.
        </p>
        <ul className="space-y-2">
          {healthProfile.rhabdomyolysisSymptoms.map((symptom, i) => (
            <li
              key={i}
              className="flex items-center gap-3 bg-red-50 dark:bg-red-950 rounded-xl px-4 py-3 border border-red-200 dark:border-red-800"
            >
              <span className="text-red-500 flex-shrink-0 flex-shrink-0"><AlertCircle className="w-4 h-4" /></span>
              <span className="text-sm text-red-800 dark:text-red-200">{symptom}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Nutrition restrictions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">영양 제한 사항</h3>
        <div className="space-y-3">
          {healthProfile.nutritionRestrictions.map((nr) => (
            <div
              key={nr.category}
              className="bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800 p-4"
            >
              <p className="font-semibold text-orange-800 dark:text-orange-200 text-sm mb-1">{nr.category}</p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mb-2">{nr.reason}</p>
              <div className="flex flex-wrap gap-1.5">
                {nr.items.map((item) => (
                  <span
                    key={item}
                    className="inline-block px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">훈련 목표</h3>
        <div className="flex flex-wrap gap-2">
          {healthProfile.goals.map((goal) => (
            <span
              key={goal}
              className="inline-block px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-200 dark:border-blue-800"
            >
              {goal}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
