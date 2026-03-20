import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sessions } from '@/data/sessions';
import { exercises } from '@/data/exercises';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return sessions.map((s) => ({ id: String(s.id) }));
}

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = sessions.find((s) => s.id === Number(id));
  if (!session) notFound();

  return (
    <div className="px-4 py-4 space-y-5">
      <Link href="/sessions" className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-1">
        <ArrowLeft className="w-4 h-4" />
        세션 목록
      </Link>
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">세션 #{session.sessionNumber}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{session.displayDate}</span>
          {session.isIncomplete && (
            <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 font-medium">
              불완전
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{session.focus}</h2>
      </div>

      {/* Incomplete warning */}
      {session.isIncomplete && (
        <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-300 dark:border-yellow-700 rounded-xl p-3">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <AlertTriangle className="w-4 h-4 inline mr-1" /> 이 세션의 내용이 불완전하게 저장되었습니다.
          </p>
        </div>
      )}

      {/* Trainer notes */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">트레이너 노트</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{session.trainerNotes}</p>
      </div>

      {/* Exercise list */}
      {session.exercises.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">운동 목록</h3>
          <div className="space-y-2">
            {session.exercises.map((se) => {
              const ex = exercises.find((e) => e.slug === se.slug);
              return (
                <Link
                  key={se.slug}
                  href={`/exercises/${se.slug}`}
                  className="block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-3 active:bg-gray-50 dark:active:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                        {ex?.name ?? se.slug}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        {se.sets && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">{se.sets}세트</span>
                        )}
                        {se.reps && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">{se.reps}회</span>
                        )}
                        {se.notes && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">— {se.notes}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-gray-400 dark:text-gray-600 flex-shrink-0">›</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
