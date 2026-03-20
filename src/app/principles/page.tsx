import { principles } from '@/data/principles';

export default function PrinciplesPage() {
  return (
    <div className="px-4 py-4 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">코칭 원칙</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">트레이너 김동건의 10가지 핵심 원칙</p>
      </div>

      <div className="space-y-3">
        {principles.map((principle) => (
          <div
            key={principle.id}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-xl">
                {principle.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">#{principle.id}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{principle.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{principle.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
