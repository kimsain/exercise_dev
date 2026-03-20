'use client';
import type { BodyPart, Position } from '@/lib/types';
import { bodyPartLabels, positionLabels } from '@/lib/types';

const bodyPartOptions: { value: BodyPart | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  ...Object.entries(bodyPartLabels).map(([value, label]) => ({ value: value as BodyPart, label })),
];

const positionOptions: { value: Position | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  ...Object.entries(positionLabels).map(([value, label]) => ({ value: value as Position, label })),
];

interface Props {
  selectedBodyPart: BodyPart | 'all';
  selectedPosition: Position | 'all';
  onBodyPartChange: (value: BodyPart | 'all') => void;
  onPositionChange: (value: Position | 'all') => void;
}

export default function FilterChips({
  selectedBodyPart,
  selectedPosition,
  onBodyPartChange,
  onPositionChange,
}: Props) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {bodyPartOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onBodyPartChange(opt.value)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors min-h-[48px] ${
              selectedBodyPart === opt.value
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {positionOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onPositionChange(opt.value)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors min-h-[48px] ${
              selectedPosition === opt.value
                ? 'bg-indigo-600 text-white'
                : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
