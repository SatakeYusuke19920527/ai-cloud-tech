'use client';
import AuthButton from '@/components/auth/auth-button';
import MobileNav from '@/components/dashboard/mobile-nav';
import DashboardNav from '@/components/dashboard/nav';
import { store } from '@/store/store';
import Link from 'next/link';
import React from 'react';
import { Provider } from 'react-redux';

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-background">
      <Provider store={store}>
        {/* header */}
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="flex h-16 items-center px-6">
            <MobileNav />
            <div className="flex w-full">
              <Link
                href="/dashboard"
                className="group inline-flex cursor-pointer items-center gap-2"
              >
                <span className="text-lg font-semibold tracking-tight text-transparent bg-gradient-to-r from-[#5b4bff] via-[#8a5cff] via-[#a855f7] via-[#f97316] to-[#6d28d9] bg-clip-text transition duration-200 group-hover:drop-shadow-[0_0_10px_rgba(126,87,194,0.6)]">
                  AI Cloud Tech
                </span>
              </Link>
              <div className="ml-auto hidden md:block">
                <AuthButton />
              </div>
            </div>
          </div>
        </header>
        {/* sidebar + main */}
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
          {/* sidebar */}
          <aside className="hidden md:block sticky top-16 self-start border-r">
            {/* ← 外側は幅だけ担当。パディング/高さ/スクロールは内側へ */}
            <div className="h-[calc(100vh-4rem)] overflow-y-auto px-6 py-6 lg:px-10 lg:py-8">
              <DashboardNav />
            </div>
          </aside>

          {/* main */}
          <main className="min-w-0 w-full min-h-[calc(100vh-4rem)] bg-muted px-6 py-6 lg:px-10 lg:py-8">
            {children}
          </main>
        </div>
      </Provider>
    </div>
  );
}
