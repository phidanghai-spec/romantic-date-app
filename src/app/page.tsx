'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AmbientBokehBackground from '@/components/ui/AmbientBokehBackground';
import FloatingDynamicIsland from '@/components/navigation/FloatingDynamicIsland';
import { CoupleSettingsModal } from '@/components/profile/CoupleSettingsModal';
import { useCoupleStore } from '@/lib/coupleStore';
import { Heart, Sparkles, Dices, CalendarHeart, Settings2 } from 'lucide-react';

export default function HomePage() {
  const { profile, getDaysTogether } = useCoupleStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const daysTogether = getDaysTogether();

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

        {/* Lớp phủ chuyển màu điện ảnh: gradient mềm đỉnh và đáy */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#FAF6EE] z-10" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/30 z-10" />
      </div>

      {/* ══════════════════════════════════════════════
          TẦNG 3: MINIMAL HEADER (LOGO & COUPLE STATUS)
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

        {/* Couple Profile Pill Button */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white text-xs font-semibold drop-shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Mở hồ sơ & ngày kỷ niệm cặp đôi"
        >
          <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300 animate-pulse" />
          <span>
            {profile.yourName} &amp; {profile.partnerName} • {daysTogether} Ngày 💕
          </span>
          <Settings2 className="w-3.5 h-3.5 text-white/70 ml-0.5" />
        </button>
      </header>

      {/* ══════════════════════════════════════════════
          TẦNG 4: HERO CINEMATIC CONTENT (GIỮA MÀN HÌNH)
         ══════════════════════════════════════════════ */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto -mt-6 sm:-mt-10 pb-28">
        {/* Cinematic Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white drop-shadow-2xl tracking-tight leading-[1.06]">
          Love at first taste<span className="text-rose-300 italic">.</span>
        </h1>

        {/* Description */}
        <p className="text-white/95 text-sm sm:text-base md:text-lg max-w-xl mt-4 font-medium drop-shadow-lg leading-relaxed">
          Xóa tan câu hỏi <em>&ldquo;Hôm nay ăn gì? Đi đâu chơi?&rdquo;</em> — Nơi cùng nhau quyết định bữa tối, lên lịch hẹn hò và lưu giữ mọi kỷ niệm ngọt ngào.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
          <Link
            href="/food-roulette"
            className="px-7 py-3 rounded-full bg-white/95 hover:bg-white text-[#4A1D2F] font-bold text-xs sm:text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/50 cursor-pointer"
          >
            <Dices className="w-4 h-4 text-rose-600" />
            <span>Quay Vòng Ẩm Thực 🎲</span>
          </Link>

          <Link
            href="/date-planner"
            className="px-7 py-3 rounded-full bg-black/40 hover:bg-black/55 backdrop-blur-md border border-white/40 text-white font-bold text-xs sm:text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <CalendarHeart className="w-4 h-4 text-rose-300" />
            <span>Gửi Lời Mời Hẹn Hò 💌</span>
          </Link>
        </div>
      </main>

      {/* ══════════════════════════════════════════════
          TẦNG 5: FLOATING DYNAMIC ISLAND
         ══════════════════════════════════════════════ */}
      <FloatingDynamicIsland />

      {/* ══════════════════════════════════════════════
          COUPLE SETTINGS MODAL
         ══════════════════════════════════════════════ */}
      <CoupleSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
