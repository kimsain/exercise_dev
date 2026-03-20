import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import HealthChip from "@/components/HealthChip";

export const metadata: Metadata = {
  title: "운동 노트",
  description: "김사인의 개인 피트니스 코칭 지식 베이스",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="운동노트" />
      </head>
      <body className="min-h-full flex flex-col antialiased font-sans">
        <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 h-12">
            <h1 className="text-base font-bold text-gray-900 dark:text-gray-100">운동 노트</h1>
            <HealthChip />
          </div>
        </header>
        <main className="flex-1 pb-20"><div className="max-w-[680px] mx-auto">{children}</div></main>
        <Navigation />
      </body>
    </html>
  );
}
