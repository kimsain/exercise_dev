import { notFound } from 'next/navigation';
import Link from 'next/link';
import { exercises } from '@/data/exercises';
import FormCueList from '@/components/FormCueList';
import { WakeLock } from './WakeLock';
import type { BodyPart, WarningLevel } from '@/lib/types';

const bodyPartLabels: Record<BodyPart, string> = {
  shoulder: '어깨',
  back: '등',
  chest: '가슴',
  arms: '팔',
  legs: '하체',
  core: '코어',
  fullbody: '전신',
  stretching: '스트레칭',
};

const bodyPartColors: Record<BodyPart, string> = {
  shoulder: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  back: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
  chest: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  arms: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  legs: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
  core: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
  fullbody: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
  stretching: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300',
};

const warningBg: Record<WarningLevel, string> = {
  warning: 'bg-red-50 dark:bg-red-950 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200',
  caution: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200',
  info: 'bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200',
};

const warningIcons: Record<WarningLevel, string> = {
  warning: '🔴',
  caution: '🟡',
  info: '🔵',
};

export function generateStaticParams() {
  return exercises.map((e) => ({ slug: e.slug }));
}

export default async function ExerciseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exercise = exercises.find((e) => e.slug === slug);
  if (!exercise) notFound();

  return (
    <div className="px-4 py-4 space-y-5">
      <WakeLock />

      {/* Name + badge */}
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${bodyPartColors[exercise.bodyPart]}`}>
            {bodyPartLabels[exercise.bodyPart]}
          </span>
          {exercise.warningLevel && (
            <span className="text-sm">{warningIcons[exercise.warningLevel]}</span>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{exercise.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{exercise.nameEn}</p>
      </div>

      {/* Setup */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">셋업</h3>
        <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{exercise.setup}</p>
      </div>

      {/* Key cues */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">핵심 큐 3가지</h3>
        <ol className="space-y-2">
          {exercise.keyCues.map((cue, i) => (
            <li key={i} className="flex items-start gap-3 bg-blue-50 dark:bg-blue-950 rounded-xl px-4 py-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm text-blue-900 dark:text-blue-100 font-medium leading-snug">{cue}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Common mistakes */}
      {exercise.commonMistakes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">흔한 실수</h3>
          <ul className="space-y-2">
            {exercise.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-2 bg-orange-50 dark:bg-orange-950 rounded-xl px-4 py-3 border border-orange-200 dark:border-orange-800">
                <span className="flex-shrink-0 text-orange-500 mt-0.5">⚠️</span>
                <span className="text-sm text-orange-800 dark:text-orange-200">{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Form cues */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">폼 큐</h3>
        <FormCueList cues={exercise.formCues} />
      </div>

      {/* Warning note */}
      {exercise.warningNote && exercise.warningLevel && (
        <div className={`rounded-xl p-4 border ${warningBg[exercise.warningLevel]}`}>
          <p className="text-sm font-medium">
            {warningIcons[exercise.warningLevel]} {exercise.warningNote}
          </p>
        </div>
      )}

      {/* Trainer notes */}
      {exercise.notes && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">트레이너 노트</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{exercise.notes}</p>
        </div>
      )}

      {/* Related sessions */}
      {exercise.sessionIds.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">관련 세션</h3>
          <div className="flex flex-wrap gap-2">
            {exercise.sessionIds.map((id) => (
              <Link
                key={id}
                href={`/sessions/${id}`}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                세션 #{id}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
