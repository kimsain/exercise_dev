'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: '홈', icon: '🏠' },
  { href: '/exercises', label: '운동', icon: '💪' },
  { href: '/sessions', label: '세션', icon: '📅' },
  { href: '/health', label: '건강', icon: '❤️' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <ul className="flex">
        {tabs.map((tab) => {
          const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={`flex flex-col items-center justify-center min-h-[48px] py-2 gap-0.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <span className="text-xl leading-none">{tab.icon}</span>
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
