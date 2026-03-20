import ExerciseCard from '@/components/ExerciseCard';
import { exercises } from '@/data/exercises';
import { principles } from '@/data/principles';

const stretchingPrincipleIds = [7]; // 스트레칭은 비타협적

export default function StretchingPage() {
  const stretchingExercises = exercises.filter((e) => e.bodyPart === 'stretching');
  const stretchingPrinciples = principles.filter((p) => stretchingPrincipleIds.includes(p.id));

  return (
    <div className="px-4 py-4 space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">스트레칭 가이드</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">기립성 저혈압 고려 — 바닥에서 시작</p>
      </div>

      {/* Key principles */}
      {stretchingPrinciples.map((p) => (
        <div key={p.id} className="bg-teal-50 dark:bg-teal-950 rounded-xl border border-teal-200 dark:border-teal-800 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{p.icon}</span>
            <h3 className="font-semibold text-teal-900 dark:text-teal-100 text-sm">{p.title}</h3>
          </div>
          <p className="text-sm text-teal-700 dark:text-teal-300 leading-relaxed">{p.detail}</p>
        </div>
      ))}

      {/* Stretching exercises */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
          스트레칭 운동 ({stretchingExercises.length}개)
        </h3>
        <div className="space-y-3">
          {stretchingExercises.map((ex) => (
            <ExerciseCard key={ex.slug} exercise={ex} />
          ))}
        </div>
      </div>

      {/* Position guidance */}
      <div className="bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-2">자세 순서 (기립성 저혈압)</h3>
        <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-lg font-medium">바닥</span>
          <span>→</span>
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-lg font-medium">앉기</span>
          <span>→</span>
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-lg font-medium">서기</span>
        </div>
      </div>
    </div>
  );
}
