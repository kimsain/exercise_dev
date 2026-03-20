'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { bodyPartLabels, bodyPartIcons } from '@/lib/types';
import { sessions } from '@/data/sessions';
import { exercises } from '@/data/exercises';

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  function handleSearchChange(value: string) {
    setQuery(value);
  }

  return (
    <div className="px-4 py-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">안녕하세요, 사인님 👋</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">PT 24회 완료 · 독립 훈련 단계</p>
      </div>

      <SearchBar
        value={query}
        onChange={handleSearchChange}
        placeholder="운동 검색 후 Enter..."
        onKeyDown={(e, isComposing) => {
          if (e.key === 'Enter' && query.trim() && !isComposing()) {
            router.push(`/exercises?q=${encodeURIComponent(query.trim())}`);
          }
        }}
      />

      {/* Recent session */}
      {(() => {
        const lastSession = sessions[sessions.length - 1];
        const exTags = lastSession.exercises.slice(0, 4);
        const extraCount = lastSession.exercises.length - exTags.length;
        return (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">최근 세션</h3>
            <Link
              href={`/sessions/${lastSession.id}`}
              className="block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">세션 #{lastSession.sessionNumber}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{lastSession.displayDate}</span>
              </div>
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-2">{lastSession.focus}</p>
              <div className="flex flex-wrap gap-1.5">
                {exTags.map((se) => {
                  const ex = exercises.find((e) => e.slug === se.slug);
                  return (
                    <span key={se.slug} className="inline-block px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">
                      {ex?.name ?? se.slug}
                    </span>
                  );
                })}
                {extraCount > 0 && (
                  <span className="inline-block px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 text-xs">+{extraCount}</span>
                )}
              </div>
            </Link>
          </div>
        );
      })()}

      <div>
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          부위별 운동
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {(['shoulder', 'back', 'chest', 'arms', 'legs', 'core'] as const).map((bp) => {
            const count = exercises.filter((e) => e.bodyPart === bp).length;
            return (
              <Link
                key={bp}
                href={`/exercises?bodyPart=${bp}`}
                className="flex flex-col items-center justify-center gap-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-3 px-2 active:scale-[0.98] transition-all"
              >
                {bodyPartIcons[bp] ? (
                  <Image src={bodyPartIcons[bp]} alt={bodyPartLabels[bp]} width={32} height={32} className="w-8 h-8 object-contain" />
                ) : null}
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{bodyPartLabels[bp]}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{count}개</span>
              </Link>
            );
          })}
        </div>
      </div>

      <Link
        href="/health"
        className="flex items-start gap-3 bg-red-50 dark:bg-red-950 rounded-xl p-4 border border-red-200 dark:border-red-800 active:scale-[0.98] transition-all"
      >
        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-red-800 dark:text-red-200">건강 주의 사항</p>
          <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">신장 GFR 45-50 · 횡문근융해증 금지 · 기립성 저혈압</p>
        </div>
      </Link>

      <Link
        href="/stretching"
        className="flex items-center justify-between bg-teal-50 dark:bg-teal-950 rounded-xl p-4 border border-teal-200 dark:border-teal-800 active:scale-[0.98] transition-all"
      >
        <div>
          <p className="text-sm font-semibold text-teal-800 dark:text-teal-200">스트레칭 루틴</p>
          <p className="text-xs text-teal-600 dark:text-teal-400 mt-0.5">운동 전후 필수 스트레칭</p>
        </div>
        <span className="text-teal-500">›</span>
      </Link>
    </div>
  );
}
