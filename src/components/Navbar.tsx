'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Dices, 
  Compass, 
  CalendarHeart, 
  BookHeart,
  MessageCircleHeart,
  Home,
  Heart,
  LogOut,
  LogIn,
  User,
  ChevronDown
} from 'lucide-react';
import { useCouple } from '@/context/CoupleContext';
import { useCoupleAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, partner, couple, datingDays } = useCouple();
  const { user, signOut } = useCoupleAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Trang Chủ', icon: Home, color: 'text-rose-500' },
    { href: '/food-roulette', label: 'Ăn Gì?', icon: Dices, color: 'text-amber-500' },
    { href: '/activities', label: 'Đi Đâu?', icon: Compass, color: 'text-blue-500' },
    { href: '/date-planner', label: 'Hẹn Hò', icon: CalendarHeart, color: 'text-pink-500' },
    { href: '/chat', label: 'Góc Chat', icon: MessageCircleHeart, color: 'text-rose-500' },
    { href: '/timeline', label: 'Kỷ Niệm', icon: BookHeart, color: 'text-rose-600' },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsDropdownOpen(false);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full pt-3 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        <div className="w-full cream-glass-pill rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xl backdrop-blur-xl border border-rose-200/60 bg-white/85">
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

          <nav className="hidden lg:flex items-center gap-1.5">
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

          <div className="flex items-center gap-2 relative">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-rose-50/80 hover:bg-rose-100 border border-rose-200/80 transition-all cursor-pointer shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center font-bold text-xs shadow-xs overflow-hidden">
                  {currentUser.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={currentUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-3.5 h-3.5" />
                  )}
                </div>

                <div className="hidden sm:flex flex-col text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-[#4A1D2F] max-w-[90px] truncate">
                      {partner.fullName.split(' ')[0]}
                    </span>
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  </div>
                  <span className="text-[9.5px] font-mono text-[#886A8B]">
                    {datingDays} ngày yêu
                  </span>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-[#886A8B]" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-12 w-56 rounded-3xl cream-glass-card p-2.5 shadow-2xl border border-rose-200 text-xs space-y-1 animate-dropdown z-50">
                  <div className="px-3 py-2 border-b border-rose-100/80 mb-1">
                    <span className="text-[10px] text-[#886A8B] font-mono uppercase font-bold block">
                      Đang đăng nhập:
                    </span>
                    <span className="font-bold text-[#4A1D2F] truncate block">
                      {currentUser.fullName}
                    </span>
                    <span className="text-[10px] text-rose-600 font-mono block mt-0.5">
                      Mã ghép đôi: <strong>{couple.coupleCode}</strong>
                    </span>
                  </div>

                  <Link
                    href="/onboarding"
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full px-3 py-2 rounded-2xl hover:bg-rose-50 text-[#2D1E2F] font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>Ghép đôi lại / Mã mới</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full px-3 py-2 rounded-2xl hover:bg-red-50 text-red-600 font-bold flex items-center gap-2 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              )}
            </div>

            <Link
              href="/date-planner"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 active:scale-95 text-white text-xs font-bold shadow-md shadow-rose-500/20 border border-white/40 transition-all cursor-pointer"
            >
              <CalendarHeart className="w-3.5 h-3.5" />
              <span>Mời Hẹn Hò</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-4 left-3 right-3 z-50 pointer-events-auto">
        <div className="cream-glass-pill rounded-full px-2 py-2 flex items-center justify-around shadow-2xl border border-rose-200/80 bg-white/95 backdrop-blur-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-full transition-all duration-200 min-w-[44px] ${
                  isActive ? 'text-rose-800 font-bold bg-rose-100 scale-105 border border-rose-200' : 'text-[#715A75]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? item.color : 'text-[#886A8B]'}`} />
                <span className="text-[8px] mt-0.5 tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
