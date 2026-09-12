import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import CommandPalette from '../ui/CommandPalette';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#050505] font-sans text-slate-100 selection:bg-indigo-500/30">
      <CommandPalette />
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
