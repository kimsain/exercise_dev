'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import FilterChips from '@/components/FilterChips';
import ExerciseCard from '@/components/ExerciseCard';
import { exercises } from '@/data/exercises';
import type { BodyPart, Position } from '@/lib/types';

function ExercisesContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [bodyPart, setBodyPart] = useState<BodyPart | 'all'>('all');
  const [position, setPosition] = useState<Position | 'all'>('all');

  useEffect(() => {
    const bp = searchParams.get('bodyPart') as BodyPart | null;
    const q = searchParams.get('q');
    if (bp) setBodyPart(bp);
    if (q) setQuery(q);
  }, [searchParams]);

  const filtered = exercises.filter((ex) => {
    const matchesQuery =
      !query ||
      ex.name.toLowerCase().includes(query.toLowerCase()) ||
      ex.nameEn.toLowerCase().includes(query.toLowerCase());
    const matchesBodyPart = bodyPart === 'all' || ex.bodyPart === bodyPart;
    const matchesPosition = position === 'all' || ex.position === position;
    return matchesQuery && matchesBodyPart && matchesPosition;
  });

  return (
    <div className="px-4 py-4 space-y-4">
      <SearchBar value={query} onChange={setQuery} placeholder="운동 검색..." />
      <FilterChips
        selectedBodyPart={bodyPart}
        selectedPosition={position}
        onBodyPartChange={setBodyPart}
        onPositionChange={setPosition}
      />
      <p className="text-xs text-gray-500 dark:text-gray-400">{filtered.length}개 운동</p>
      <div className="space-y-3">
        {filtered.map((ex) => (
          <ExerciseCard key={ex.slug} exercise={ex} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default function ExercisesPage() {
  return (
    <Suspense fallback={<div className="px-4 py-8 text-center text-gray-500">로딩 중...</div>}>
      <ExercisesContent />
    </Suspense>
  );
}
