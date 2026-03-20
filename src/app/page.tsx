'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import type { BodyPart } from '@/lib/types';

const bodyParts: { value: BodyPart; label: string; icon: string }[] = [
  { value: 'shoulder', label: '어깨', icon: '💪' },
  { value: 'back', label: '등', icon: '🔙' },
  { value: 'chest', label: '가슴', icon: '🫁' },
  { value: 'arms', label: '팔', icon: '💪' },
  { value: 'legs', label: '하체', icon: '🦵' },
  { value: 'core', label: '코어', icon: '⚡' },
  { value: 'fullbody', label: '전신', icon: '🏋️' },
  { value: 'stretching', label: '스트레칭', icon: '🧘' },
];

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  function handleSearchChange(value: string) {
    setQuery(value);
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/exercises?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div className="px-4 py-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">안녕하세요, 사인님 👋</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">PT 24회 완료 · 독립 훈련 단계</p>
      </div>

      <div onKeyDown={handleSearchKeyDown}>
        <SearchBar
          value={query}
          onChange={handleSearchChange}
          placeholder="운동 검색 후 Enter..."
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          부위별 운동
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {bodyParts.map((bp) => (
            <Link
              key={bp.value}
              href={`/exercises?bodyPart=${bp.value}`}
              className="flex flex-col items-center justify-center gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-3 px-2 active:bg-gray-50 dark:active:bg-gray-800 transition-colors"
            >
              <span className="text-2xl">{bp.icon}</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{bp.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">독립 훈련 단계</h3>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          PT 24회 수업 완료. 트레이너 김동건의 지도 원칙을 바탕으로 혼자 훈련하는 단계입니다.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          건강 알림
        </h3>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/health"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-xs font-medium border border-red-300 dark:border-red-700"
          >
            🔴 신장 GFR 45-50 — 횡문근융해증 주의
          </Link>
          <Link
            href="/health"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 text-xs font-medium border border-yellow-300 dark:border-yellow-700"
          >
            🟡 기립성 저혈압 — 바닥→앉기→서기
          </Link>
        </div>
      </div>
    </div>
  );
}
