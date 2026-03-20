'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <h2 className="text-xl font-semibold">오류가 발생했습니다.</h2>
          <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-zinc-900 text-white rounded">
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
