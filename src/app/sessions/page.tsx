import Link from 'next/link';
import { sessions } from '@/data/sessions';

export default function SessionsPage() {
  return (
    <div className="px-4 py-4 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">세션 타임라인</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">총 {sessions.length}회 PT 수업</p>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => (
          <Link
            key={session.id}
            href={`/sessions/${session.id}`}
            className="block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 active:bg-gray-50 dark:active:bg-gray-800 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    #{session.sessionNumber}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{session.displayDate}</span>
                  {session.isIncomplete && (
                    <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 font-medium">
                      불완전
                    </span>
                  )}
                </div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{session.focus}</p>
                {session.exercises.length > 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    운동 {session.exercises.length}개
                  </p>
                )}
              </div>
              <span className="text-gray-400 dark:text-gray-600 flex-shrink-0 mt-1">›</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
