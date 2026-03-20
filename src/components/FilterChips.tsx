'use client';
import type { BodyPart, Position } from '@/lib/types';

const bodyPartOptions: { value: BodyPart | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'shoulder', label: '어깨' },
  { value: 'back', label: '등' },
  { value: 'chest', label: '가슴' },
  { value: 'arms', label: '팔' },
  { value: 'legs', label: '하체' },
  { value: 'fullbody', label: '전신' },
  { value: 'core', label: '코어' },
  { value: 'stretching', label: '스트레칭' },
];

const positionOptions: { value: Position | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'floor', label: '바닥' },
  { value: 'seated', label: '앉기' },
  { value: 'standing', label: '서기' },
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
