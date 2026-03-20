import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function HealthChip() {
  return (
    <Link
      href="/health"
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-xs font-medium border border-red-300 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
    >
      <span className="relative flex">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
      </span>
      <AlertTriangle className="w-3 h-3" />
      <span>GFR 45-50</span>
    </Link>
  );
}
