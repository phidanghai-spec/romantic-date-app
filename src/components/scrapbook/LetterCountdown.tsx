"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Dices, CalendarHeart, Clock, Sparkles } from "lucide-react";

export default function LetterCountdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }>({
    days: "03",
    hours: "05",
    minutes: "21",
    seconds: "28",
  });

  useEffect(() => {
    // Đếm ngược đến buổi hẹn hò tối Thứ 7 tuần này lúc 19:00
    const now = new Date();
    const target = new Date();
    const daysUntilSaturday = (6 - now.getDay() + 7) % 7 || 7;
    target.setDate(now.getDate() + daysUntilSaturday);
    target.setHours(19, 0, 0, 0);

    const updateTimer = () => {
      const current = new Date();
      const diff = target.getTime() - current.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({
          days: String(days).padStart(2, "0"),
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* ── Wax Seal Niêm Phong Thư Trên Đỉnh Phong Bì ── */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#9F1239] via-[#831843] to-[#4C0519] border-2 border-[#BE123C]/60 shadow-xl shadow-rose-950/30 flex items-center justify-center group cursor-pointer hover:scale-105 transition-transform">
          {/* Vòng vân sáp niêm phong */}
          <div className="absolute inset-1 rounded-full border border-dashed border-rose-300/40" />
          <Heart className="w-6 h-6 text-rose-100 fill-rose-200/90 drop-shadow animate-pulse" />
          <span className="sr-only">Love Letter Wax Seal</span>
        </div>
      </div>

      {/* ── Thân Thư Tình (Vintage Love Letter Envelope Card) ── */}
      <div className="relative bg-[#FFFDF9]/92 backdrop-blur-2xl border-2 border-dashed border-rose-300/70 rounded-[2.5rem] pt-10 pb-7 px-6 sm:px-10 shadow-2xl shadow-rose-950/8 text-center overflow-hidden">
        {/* Họa tiết hoa văn góc thư */}
        <div className="absolute top-3 left-4 text-rose-300/50 text-xs font-mono select-none">
          № 520 • POSTALE
        </div>
        <div className="absolute top-3 right-4 text-rose-400/60 text-xs font-mono select-none flex items-center gap-1">
          <span>PAR AVION</span> ✈️
        </div>

        {/* Tiêu đề phong thư */}
        <div className="space-y-1 mt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-[#831843] text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-rose-500" /> Buổi hẹn hò tiếp theo của hai đứa
          </span>
          <p className="text-xs text-[#6B5B6E] font-medium pt-1">
            Thứ 7 tuần này • 19:00 PM tại quán ruột của chúng mình
          </p>
        </div>

        {/* ── 4 Con Tem Đếm Ngược (Postal Stamp Countdown) ── */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 mt-6">
          {[
            { val: timeLeft.days, label: "NGÀY" },
            { val: timeLeft.hours, label: "GIỜ" },
            { val: timeLeft.minutes, label: "PHÚT" },
            { val: timeLeft.seconds, label: "GIÂY" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative bg-gradient-to-b from-[#FFFDF9] to-[#FDF8F0] rounded-2xl py-3 sm:py-4 px-1 border border-rose-200/80 shadow-xs group hover:border-rose-400 transition-colors"
            >
              {/* Lỗ đục tem thư ở 4 góc nhỏ */}
              <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-[#FAF6EE] border border-rose-200/60" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FAF6EE] border border-rose-200/60" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-[#FAF6EE] border border-rose-200/60" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-[#FAF6EE] border border-rose-200/60" />

              <span className="block font-serif font-bold text-3xl sm:text-4xl text-[#4A1D2F] tracking-tight group-hover:text-[#831843] transition-colors">
                {item.val}
              </span>
              <span className="block text-[10px] sm:text-xs font-mono font-bold text-[#886A8B] tracking-wider uppercase mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── 2 Nút Hành Động Tem Dán Cổ Điển ── */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-7 pt-2 border-t border-rose-100">
          <Link
            href="/food-roulette"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#BE123C] via-[#E11D48] to-[#FB7185] text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-900/15 hover:shadow-rose-900/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/40 cursor-pointer"
          >
            <Dices className="w-4 h-4" />
            <span>Quay Vòng Chọn Món 🎲</span>
          </Link>

          <Link
            href="/date-planner"
            className="px-6 py-3 rounded-full bg-white/95 border-1.5 border-rose-300 text-[#4A1D2F] text-xs sm:text-sm font-bold shadow-sm hover:bg-rose-50/90 hover:border-rose-400 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <CalendarHeart className="w-4 h-4 text-rose-500" />
            <span>Gửi Lời Mời Hẹn Hò 💌</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
