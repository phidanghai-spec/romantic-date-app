'use client';

import React from 'react';
import Link from 'next/link';
import AmbientBokehBackground from '@/components/ui/AmbientBokehBackground';
import FloatingDynamicIsland from '@/components/navigation/FloatingDynamicIsland';
import HeaderBadge from '@/components/layout/HeaderBadge';
import { Sparkles, Dices, CalendarHeart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen bg-[#FAF6EE] text-[#2D1E2F] overflow-x-hidden selection:bg-rose-200 selection:text-rose-900 flex flex-col justify-between">
      {/* ══════════════════════════════════════════════
          TẦNG NỀN 1: BOKEH VÀ CÁNH HOA TOÀN MÀN HÌNH
         ══════════════════════════════════════════════ */}
      <AmbientBokehBackground />

      {/* ══════════════════════════════════════════════
          TẦNG 2: CINEMATIC VIDEO HOA TULIP TRÀN KHUNG HÌNH
         ══════════════════════════════════════════════ */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src="/tulip-bg.mp4" type="video/mp4" />
          <source src="/assets/tulip-3d-loop.mp4" type="video/mp4" />
        </video>

        {/* Lớp phủ chuyển màu điện ảnh */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#FAF6EE] z-10" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/30 z-10" />
      </div>

      {/* ══════════════════════════════════════════════
          TẦNG 3: MINIMAL HEADER (LOGO & COUPLE STATUS BADGE)
         ══════════════════════════════════════════════ */}
      <header className="relative z-30 w-full px-6 sm:px-12 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-lg shadow-md group-hover:scale-105 transition-transform">
            🌷
          </div>
          <span className="text-white text-xl sm:text-2xl font-serif italic font-bold tracking-tight drop-shadow-md">
            Our Date Night<span className="text-rose-300 font-sans not-italic">.</span>
          </span>
        </Link>

        {/* Unified Couple Profile Header Badge (SSOT) */}
        <HeaderBadge />
      </header>

      {/* ══════════════════════════════════════════════
          TẦNG 4: HERO CINEMATIC CONTENT
         ══════════════════════════════════════════════ */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto -mt-6 sm:-mt-10 pb-28">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white/90 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Private Dating &amp; Activity Planner</span>
        </div>

        <h1 className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-white font-bold tracking-tight drop-shadow-lg leading-tight sm:leading-tight mb-4">
          Tối Nay Mình Đi Đâu, <br className="hidden sm:inline" />
          <span className="font-sans not-italic text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-100">
            Ăn Gì Nhỉ Em Iu? 🌸
          </span>
        </h1>

        <p className="text-white/85 text-sm sm:text-base md:text-lg max-w-xl font-light leading-relaxed drop-shadow mb-8">
          Không gian riêng tư chỉ dành cho 2 người để cùng quyết định món ngon, lên lịch hẹn hò và lưu giữ từng kỷ niệm ngọt ngào.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center">
          <Link
            href="/food-roulette"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:opacity-95 active:scale-95 text-white font-bold text-sm shadow-xl shadow-rose-950/20 border border-white/40 flex items-center justify-center gap-2 transition-all group cursor-pointer"
          >
            <Dices className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span>Quay Vòng Ăn Gì Ngay 🎲</span>
          </Link>

          <Link
            href="/date-planner"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md active:scale-95 text-white font-semibold text-sm border border-white/50 flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <CalendarHeart className="w-4 h-4 text-rose-300" />
            <span>Gửi Thiệp Mời Hẹn Hò 💌</span>
          </Link>
        </div>
      </main>

      {/* ══════════════════════════════════════════════
          TẦNG 5: FLOATING DYNAMIC ISLAND (ĐÁY MÀN HÌNH)
         ══════════════════════════════════════════════ */}
      <FloatingDynamicIsland />
    </div>
  );
}
