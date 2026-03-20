import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { exercises } from '@/data/exercises';
import { sessions } from '@/data/sessions';
import FormCueList from '@/components/FormCueList';
import { WakeLock } from './WakeLock';
import { bodyPartLabels, bodyPartColors, warningBg, exerciseImages } from '@/lib/types';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

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
      <Link href="/exercises" className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-1">
        <ArrowLeft className="w-4 h-4" />
        운동 목록
      </Link>
      <WakeLock />

      {/* Name + badge */}
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${bodyPartColors[exercise.bodyPart]}`}>
            {bodyPartLabels[exercise.bodyPart]}
          </span>
          {exercise.warningLevel && (
            <AlertTriangle className="w-4 h-4 text-red-500" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{exercise.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{exercise.nameEn}</p>
      </div>

      {/* Hero image */}
      {exerciseImages[exercise.slug] && (
        <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={exerciseImages[exercise.slug]}
            alt={exercise.name}
            width={640}
            height={360}
            priority={true}
            sizes="(max-width: 640px) 100vw, 640px"
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Setup */}
      <details open className="group">
        <summary className="flex items-center justify-between cursor-pointer list-none py-2 border-b border-gray-200 dark:border-gray-700 mb-3 [&::marker]:hidden [&::-webkit-details-marker]:hidden">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">셋업</h3>
          <span className="text-gray-400 text-xs group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{exercise.setup}</p>
        </div>
      </details>

      {/* Key cues */}
      <details open className="group">
        <summary className="flex items-center justify-between cursor-pointer list-none py-2 border-b border-gray-200 dark:border-gray-700 mb-3 [&::marker]:hidden [&::-webkit-details-marker]:hidden">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">핵심 큐 3가지</h3>
          <span className="text-gray-400 text-xs group-open:rotate-180 transition-transform">▼</span>
        </summary>
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
      </details>

      {/* Common mistakes */}
      {exercise.commonMistakes.length > 0 && (
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer list-none py-2 border-b border-gray-200 dark:border-gray-700 mb-3 [&::marker]:hidden [&::-webkit-details-marker]:hidden">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">흔한 실수</h3>
            <span className="text-gray-400 text-xs group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <ul className="space-y-2">
            {exercise.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-2 bg-orange-50 dark:bg-orange-950 rounded-xl px-4 py-3 border border-orange-200 dark:border-orange-800">
                <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-orange-800 dark:text-orange-200">{mistake}</span>
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* Form cues */}
      <details open className="group">
        <summary className="flex items-center justify-between cursor-pointer list-none py-2 border-b border-gray-200 dark:border-gray-700 mb-3 [&::marker]:hidden [&::-webkit-details-marker]:hidden">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">폼 큐</h3>
          <span className="text-gray-400 text-xs group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <FormCueList cues={exercise.formCues} />
      </details>

      {/* Warning note — always visible, no accordion */}
      {exercise.warningNote && exercise.warningLevel && (
        <div className={`rounded-xl p-4 border ${warningBg[exercise.warningLevel]}`}>
          <p className="text-sm font-medium">
            <AlertTriangle className="w-4 h-4 inline mr-1" /> {exercise.warningNote}
          </p>
        </div>
      )}

      {/* Trainer notes */}
      {exercise.notes && (
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer list-none py-2 border-b border-gray-200 dark:border-gray-700 mb-3 [&::marker]:hidden [&::-webkit-details-marker]:hidden">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">트레이너 노트</h3>
            <span className="text-gray-400 text-xs group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{exercise.notes}</p>
          </div>
        </details>
      )}

      {/* Related sessions */}
      {exercise.sessionIds.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">관련 세션</h3>
          <div className="flex flex-wrap gap-2">
            {exercise.sessionIds.map((id) => {
              const session = sessions.find((s) => s.id === id);
              const sessionEx = session?.exercises.find((se) => se.slug === exercise.slug);
              return (
                <Link
                  key={id}
                  href={`/sessions/${id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <span>세션 #{id}</span>
                  {sessionEx?.sets && sessionEx?.reps && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">{sessionEx.sets}×{sessionEx.reps}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
