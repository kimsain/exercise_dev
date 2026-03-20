import Link from 'next/link';
import type { Exercise } from '@/lib/types';
import { bodyPartLabels, bodyPartColors, warningIcons } from '@/lib/types';

interface Props {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: Props) {
  return (
    <Link
      href={`/exercises/${exercise.slug}`}
      className="block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 active:bg-gray-50 dark:active:bg-gray-800 active:scale-[0.98] transition-all"
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
