"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dices,
  Compass,
  CalendarHeart,
  BookHeart,
} from "lucide-react";

export default function FloatingDynamicIsland() {
  const pathname = usePathname();

  // Mini live countdown đến Thứ 7 tuần này lúc 19:00
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
  }>({
    days: 2,
    hours: 6,
    minutes: 45,
  });

  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
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
        setCountdown({ days, hours, minutes });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const navTabs = [
    {
      id: "food",
      label: "Hôm Nay Ăn Gì?",
      sublabel: "Vòng quay ẩm thực",
      href: "/food-roulette",
      emoji: "🍜",
      icon: Dices,
      color: "hover:bg-amber-100 hover:text-amber-700",
      activeColor: "bg-amber-100 text-amber-800 border-amber-300",
    },
    {
      id: "spots",
      label: "Đi Chơi Ở Đâu?",
      sublabel: "Gợi ý thời tiết thực",
      href: "/activities",
      emoji: "🗺️",
      icon: Compass,
      color: "hover:bg-blue-100 hover:text-blue-700",
      activeColor: "bg-blue-100 text-blue-800 border-blue-300",
    },
    {
      id: "pass",
      label: "Lời Mời & VIP Pass",
      sublabel: "Thiệp hẹn hò né chuột",
      href: "/date-planner",
      emoji: "🎟️",
      icon: CalendarHeart,
      color: "hover:bg-rose-100 hover:text-rose-700",
      activeColor: "bg-rose-100 text-rose-800 border-rose-300",
    },
    {
      id: "memories",
      label: "Sổ Kỷ Niệm",
      sublabel: "Bộ đếm & Wishlist",
      href: "/timeline",
      emoji: "💖",
      icon: BookHeart,
      color: "hover:bg-pink-100 hover:text-pink-700",
      activeColor: "bg-pink-100 text-pink-800 border-pink-300",
    },
  ];

  return (
    <aside aria-label="Quick Actions" className="fixed bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-xl sm:w-auto">
      {/* ── Dynamic Island Capsule Container ── */}
      <div className="relative bg-white/80 backdrop-blur-2xl border border-white/70 shadow-2xl shadow-rose-950/15 rounded-full px-3.5 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between sm:justify-center gap-2 sm:gap-4 transition-all duration-300">
        {/* Glow viền ambient mềm mại */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400/10 via-pink-400/10 to-amber-400/10 pointer-events-none -z-10 blur-sm" />

        {/* ── Khu Vực 1: Mini Live Countdown Widget ── */}
        <Link
          href="/date-planner"
          className="flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-full bg-rose-50/90 border border-rose-200/80 hover:bg-rose-100/80 transition-colors group cursor-pointer"
          title="Xem chi tiết kế hoạch hẹn hò"
        >
          {/* Pulsing indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>

          <div className="text-left">
            <span className="block text-[9.5px] sm:text-[10px] font-mono uppercase font-bold text-rose-500 tracking-wider">
              Hẹn Hò Sau
            </span>
            <span className="font-serif font-bold text-xs sm:text-sm text-[#4A1D2F] whitespace-nowrap">
              {countdown.days}d {countdown.hours}h {countdown.minutes}m
            </span>
          </div>
        </Link>

        {/* ── Vạch Ngăn Cách Thanh Mảnh ── */}
        <div className="h-7 w-[1px] bg-rose-200/80 hidden xs:block" />

        {/* ── Khu Vực 2: 4 Quick-Action Action Tabs ── */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {navTabs.map((tab) => {
            const isActive = pathname === tab.href;
            const isHovered = activeTooltip === tab.id;

            return (
              <div
                key={tab.id}
                className="relative"
                onMouseEnter={() => setActiveTooltip(tab.id)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                {/* Tooltip nổi phía trên icon (Desktop) */}
                {isHovered && (
                  <div className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-xl bg-[#2D1E2F]/90 backdrop-blur-md text-white text-center shadow-xl pointer-events-none z-50 animate-dropdown whitespace-nowrap">
                    <div className="text-xs font-bold font-serif">{tab.label}</div>
                    <div className="text-[10px] text-pink-200 font-sans">{tab.sublabel}</div>
                    {/* Mũi tên tooltip */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#2D1E2F]/90" />
                  </div>
                )}

                {/* Tab Button */}
                <Link
                  href={tab.href}
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-lg sm:text-xl transition-all duration-200 active:scale-90 cursor-pointer border ${
                    isActive
                      ? `${tab.activeColor} shadow-md scale-105`
                      : `bg-white/60 border-rose-100/60 text-[#4A1D2F] ${tab.color} hover:scale-110 shadow-xs`
                  }`}
                  aria-label={tab.label}
                >
                  <span className="select-none group-hover:animate-bounce">{tab.emoji}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
