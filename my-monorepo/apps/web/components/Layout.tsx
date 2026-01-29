import React, { type PropsWithChildren } from 'react';
import { NavBar } from './NavBar';
import { Sidebar } from './Sidebar';
import type { Author } from '../lib/types';

interface LayoutProps {
  author: Author;
  hero?: React.ReactNode;
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function Layout({ author, hero, children, showSidebar = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] pb-20 font-sans selection:bg-[var(--color-accent-soft)] selection:text-[var(--color-accent)]">
      <div className="px-6 md:px-12">
        <NavBar />
      </div>
      {hero}
      <div className="px-6 md:px-12">
        <div className={`grid grid-cols-1 ${showSidebar ? 'md:grid-cols-[320px_1fr]' : ''} gap-8 max-w-7xl mx-auto mt-8`}>
          {showSidebar && <Sidebar author={author} className="order-last md:order-first" />}
          <main className="flex flex-col gap-8 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
