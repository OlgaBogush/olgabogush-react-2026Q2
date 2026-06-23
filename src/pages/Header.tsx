'use client';

import { useContext } from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { ThemeContext } from '../context/ThemeContext';

export default function Header() {
  const context = useContext(ThemeContext);
  const pathname = usePathname();
  if (!context) {
    return null;
  }
  const { isDarkTheme, toggleTheme } = context;

  return (
    <header
      className={`w-full max-w-[1240px] mx-auto p-6 flex items-center justify-between gap-6 border rounded-sm border-gray-300`}
    >
      <div className="flex items-center gap-6">
        <p className="font-bold">The Rick and Morty</p>
        <ul className="flex gap-4">
          <li>
            <Link
              href="/"
              className={`flex items-center justify-center min-w-20 h-8 text-base border rounded-sm border-gray-300 ${pathname === '/' ? 'bg-gray-300' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`flex items-center justify-center min-w-20 h-8 text-base border rounded-sm border-gray-300 ${pathname === '/about' ? 'bg-gray-300' : ''}`}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
      <button
        className="min-w-20 h-8 text-base cursor-pointer border rounded-sm border-gray-300"
        onClick={toggleTheme}
      >
        {isDarkTheme ? 'Light' : 'Dark'}
      </button>
    </header>
  );
}
