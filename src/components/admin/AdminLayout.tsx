'use client';

import Sidebar from '@/Sidebar/Sidebar';
import Header from '../shared/Header';
import { Toaster } from '../ui/toaster';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {children}
          <Toaster />
        </main>
      </div>
    </div>
  );
}