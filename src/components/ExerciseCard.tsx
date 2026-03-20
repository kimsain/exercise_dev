import Link from 'next/link';
import type { Exercise, BodyPart, WarningLevel } from '@/lib/types';

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

const warningIcons: Record<WarningLevel, string> = {
  warning: '🔴',
  caution: '🟡',
  info: '🔵',
};

interface Props {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: Props) {
  return (
    <Link
      href={`/exercises/${exercise.slug}`}
      className="block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 active:bg-gray-50 dark:active:bg-gray-800 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${bodyPartColors[exercise.bodyPart]}`}
            >
              {bodyPartLabels[exercise.bodyPart]}
            </span>
            {exercise.warningLevel && (
              <span className="text-xs">{warningIcons[exercise.warningLevel]}</span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base truncate">
            {exercise.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
            {exercise.setup}
          </p>
        </div>
        <span className="text-gray-400 dark:text-gray-600 flex-shrink-0 mt-1">›</span>
      </div>
    </Link>
  );
}
