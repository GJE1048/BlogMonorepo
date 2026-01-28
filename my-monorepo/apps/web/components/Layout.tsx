import type { PropsWithChildren } from 'react';
import { NavBar } from './NavBar';
import { Sidebar } from './Sidebar';
import type { Author } from '../lib/types';

export function Layout({ author, children }: PropsWithChildren<{ author: Author }>) {
  return (
    <div className="page">
      <NavBar />
      <div className="layout">
        <Sidebar author={author} />
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
