'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  Dices, 
  Compass, 
  CalendarHeart, 
  BookHeart,
  Home
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      label: 'Trang Chủ',
      icon: Home,
      color: 'text-rose-500',
    },
    {
      href: '/food-roulette',
      label: 'Ăn Gì?',
      icon: Dices,
      color: 'text-amber-500',
    },
    {
      href: '/activities',
      label: 'Đi Đâu?',
      icon: Compass,
      color: 'text-blue-500',
    },
    {
      href: '/date-planner',
      label: 'Hẹn Hò',
      icon: CalendarHeart,
      color: 'text-pink-500',
    },
    {
      href: '/timeline',
      label: 'Kỷ Niệm',
      icon: BookHeart,
      color: 'text-rose-600',
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full pt-3 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Cream Glass Navbar Container */}
        <div className="w-full cream-glass-pill rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xl backdrop-blur-xl border border-rose-200/60 bg-white/85">
          {/* Brand Logo with Playfair / Instrument Serif */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform duration-300 border border-white/60">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div>
              <div className="font-serif-italic text-xl sm:text-2xl text-[#2D1E2F] font-bold tracking-wide leading-none group-hover:text-rose-600 transition-colors">
                Our Date Night
              </div>
              <div className="text-[9px] font-sans tracking-widest uppercase text-[#886A8B] font-semibold">
                Private Couple Planner
              </div>
            </div>
          </Link>

          {/* Desktop & Tablet Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-rose-100 text-rose-800 shadow-2xs border border-rose-300/80 font-bold scale-102'
                      : 'text-[#5E4761] hover:text-[#2D1E2F] hover:bg-rose-50/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? item.color : 'text-[#886A8B]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Date Quest Button */}
          <Link
            href="/date-planner"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 active:scale-95 text-white text-xs font-bold shadow-md shadow-rose-500/20 border border-white/40 transition-all cursor-pointer"
          >
            <CalendarHeart className="w-3.5 h-3.5" />
            <span>Mời Hẹn Hò</span>
          </Link>
        </div>
      </div>

      {/* Mobile Floating Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-4 left-3 right-3 z-50 pointer-events-auto">
        <div className="cream-glass-pill rounded-full px-2 py-2 flex items-center justify-around shadow-2xl border border-rose-200/80 bg-white/95 backdrop-blur-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-all duration-200 min-w-[50px] ${
                  isActive
                    ? 'text-rose-800 font-bold bg-rose-100 scale-105 border border-rose-200'
                    : 'text-[#715A75] hover:text-[#2D1E2F]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? item.color : 'text-[#886A8B]'}`} />
                <span className="text-[8.5px] mt-0.5 tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
