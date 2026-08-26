"use client";

import React, { useState } from "react";
import { ChevronDown, Menu, X, Heart, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Three.js
const Tulip3DCanvas = dynamic(() => import("@/components/3d/Tulip3DCanvas"), {
  ssr: false,
});

export default function RomanticTulipHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    {
      title: "Hôm Nay Ăn Gì?",
      href: "/food-roulette",
      dropdown: [
        "Vòng quay món ăn",
        "Gu của Nàng 💖",
        "Gu của Chàng 🍖",
        "Menu Tráng miệng 🍰",
      ],
    },
    {
      title: "Đi Chơi Ở Đâu?",
      href: "/activities",
      dropdown: [
        "Dự báo thời tiết",
        "Cafe & View đẹp",
        "Phim rạp cuối tuần",
        "Workshop DIY",
      ],
    },
    {
      title: "Sổ Kỷ Niệm",
      href: "/timeline",
      dropdown: [
        "Cột mốc 520 ngày",
        "Album ảnh buổi hẹn",
        "Couple Bucket List",
      ],
    },
  ];

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between bg-[#FAF6EE]">
      {/* 1. Interactive 3D Tulip Canvas */}
      <Tulip3DCanvas />

      {/* 2. Romantic Pastel Glow Overlays */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-rose-200/40 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* 3. Top Navigation */}
      <header className="relative z-30 w-full px-5 sm:px-8 md:px-14 py-5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-400 to-pink-300 flex items-center justify-center text-white shadow-md shadow-rose-300/40 group-hover:scale-105 transition-transform">
            🌷
          </div>
          <span className="text-[#2D1E2F] text-xl font-serif italic tracking-tight font-semibold">
            Our Date Night
            <span className="text-rose-400 font-sans not-italic">.</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.title)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1.5 text-[#4A3B4E] hover:text-[#E11D48] text-sm font-medium transition-colors py-2 cursor-pointer">
                {item.title}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === item.title
                      ? "rotate-180 text-rose-500"
                      : ""
                  }`}
                />
              </button>

              {/* Cream Glass Dropdown */}
              {openDropdown === item.title && (
                <div className="absolute top-full left-0 bg-white/90 backdrop-blur-md border border-rose-200/70 rounded-2xl py-2 px-1.5 min-w-[200px] shadow-xl shadow-rose-100/40 z-40">
                  {item.dropdown.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      href={item.href}
                      className="block px-3.5 py-2 text-[#4A3B4E] hover:text-[#E11D48] hover:bg-rose-50/80 text-sm rounded-xl transition-colors"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/date-planner"
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium rounded-full shadow-lg shadow-rose-300/40 hover:shadow-rose-400/50 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Sparkles size={16} /> Mời Hẹn Hò Ngay
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-[#2D1E2F] rounded-full bg-white/80 border border-rose-200/60 cursor-pointer"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-40 md:hidden bg-[#FAF6EE]/95 backdrop-blur-2xl border border-rose-200/80 rounded-3xl p-6 shadow-2xl space-y-4">
          {navItems.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <span className="font-semibold text-sm text-[#2D1E2F]">
                {item.title}
              </span>
              <div className="pl-3 border-l-2 border-rose-200 space-y-1">
                {item.dropdown.map((sub, sIdx) => (
                  <Link
                    key={sIdx}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs text-[#6B5B6E] hover:text-rose-600 py-1"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link
            href="/date-planner"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 bg-rose-500 text-white text-sm font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-rose-300/50"
          >
            <Heart size={16} fill="white" /> Bắt đầu lên lịch hẹn
          </Link>
        </div>
      )}

      {/* 4. Hero Content */}
      <div className="relative z-10 flex-1 flex items-center px-6 md:px-16 max-w-5xl">
        <div className="text-left space-y-6 max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-rose-200 text-rose-600 text-xs font-semibold shadow-sm">
            <span className="animate-pulse">🌸</span> Không gian hẹn hò riêng
            tư của hai đứa
          </div>

          {/* Headline tiếng Việt chuẩn Unicode */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#2D1E2F] leading-[1.1] font-bold tracking-tight">
            Kết nối vị giác. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400">
              Lưu giữ ngọt ngào.
            </span>
          </h1>

          <p className="text-[#6B5B6E] text-base sm:text-lg leading-relaxed max-w-lg font-sans">
            Xóa tan câu hỏi <em>&ldquo;Hôm nay ăn gì / Đi đâu chơi?&rdquo;</em>
            . Vòng quay ẩm thực, địa điểm lãng mạn và chiếc thiệp VIP Floral
            Date Pass được tạo riêng cho người ấy.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/food-roulette"
              className="px-7 py-3.5 bg-[#2D1E2F] text-[#FAF6EE] text-sm font-semibold rounded-full hover:bg-black shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
            >
              Quay vòng chọn món
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/date-planner"
              className="px-7 py-3.5 bg-white/80 border border-rose-200/80 text-[#2D1E2F] text-sm font-semibold rounded-full hover:bg-rose-50/60 shadow-md transition-all flex items-center gap-2"
            >
              <Heart size={16} className="text-rose-500 fill-rose-500/30" />
              Mời hẹn hò 4 bước
            </Link>
          </div>
        </div>
      </div>

      {/* 5. Footer Trust Bar */}
      <footer className="relative z-10 w-full px-6 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#886A8B] border-t border-rose-100 gap-2">
        <div className="flex items-center gap-3">
          <span>✨ Tự động gợi ý món theo thời tiết</span>
          <span>•</span>
          <span>🎟️ Xuất thiệp hẹn hò PNG HD</span>
        </div>
        <div>
          <span>Dành riêng cho hai bạn 💕</span>
        </div>
      </footer>
    </section>
  );
}
