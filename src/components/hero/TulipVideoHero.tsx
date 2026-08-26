"use client";

import React, { useState } from "react";
import { ChevronDown, Menu, X, Heart, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function TulipVideoHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    {
      title: "Trải Nghiệm",
      dropdown: [
        { label: "Hẹn hò lãng mạn", href: "/date-planner" },
        { label: "Địa điểm bí mật", href: "/activities" },
        { label: "Cặp đôi VIP", href: "/date-planner" },
      ],
    },
    {
      title: "Tính Năng",
      dropdown: [
        { label: "Vòng quay chọn món", href: "/food-roulette" },
        { label: "Thiệp Floral Pass", href: "/date-planner" },
        { label: "Sổ kỷ niệm", href: "/timeline" },
      ],
    },
    {
      title: "Câu Chuyện",
      dropdown: [
        { label: "Khám phá gu ẩm thực", href: "/discover" },
        { label: "Taste Profile của hai bạn", href: "/profile" },
        { label: "Khoảnh khắc ngọt ngào", href: "/timeline" },
      ],
    },
    {
      title: "Hẹn Hò 4 Bước",
      href: "/date-planner",
      dropdown: null,
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between bg-black">
      {/* 1. NỀN VIDEO HOA TULIP THỰC TẾ TỪ PUBLIC */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/tulip-bg.mp4" type="video/mp4" />
      </video>

      {/* 2. Lớp phủ tối (Dark Liquid Overlay) để làm nổi bật chữ & hiệu ứng kính */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/80 z-10 pointer-events-none" />

      {/* 3. Navigation Bar (Top) */}
      <nav className="relative z-30 w-full px-6 md:px-16 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
          <Heart className="w-6 h-6 text-pink-400 fill-pink-400/40 group-hover:scale-110 transition-transform" />
          <span className="text-white text-xl font-semibold tracking-tight font-serif italic">
            Our Date Night<span className="text-pink-400 font-sans not-italic">.</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => item.dropdown && setOpenDropdown(item.title)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium transition-colors py-2"
                >
                  {item.title}
                </Link>
              ) : (
                <button className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium transition-colors py-2 cursor-pointer">
                  {item.title}
                  {item.dropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === item.title ? "rotate-180 text-pink-300" : ""
                      }`}
                    />
                  )}
                </button>
              )}

              {/* Liquid Glass Dropdown */}
              {item.dropdown && openDropdown === item.title && (
                <div className="absolute top-full left-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-2 px-1.5 min-w-[200px] shadow-2xl z-40 animate-dropdown">
                  {item.dropdown.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      href={sub.href}
                      className="block px-3.5 py-2 text-white/85 hover:text-white hover:bg-white/15 text-sm rounded-xl transition-all"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/date-planner"
            className="bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md rounded-full px-5 py-2.5 text-white text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
          >
            <Sparkles size={15} className="text-pink-300" />
            Mời Hẹn Hò Ngay
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-40 md:hidden bg-black/85 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4">
          {navItems.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <span className="font-semibold text-sm text-pink-300">{item.title}</span>
              {item.dropdown ? (
                <div className="pl-3 border-l-2 border-white/20 space-y-1.5">
                  {item.dropdown.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-white/80 hover:text-white py-1 transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  href={item.href || "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs text-white/80 hover:text-white pl-3"
                >
                  Xem chi tiết
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/date-planner"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30"
          >
            <Heart size={16} fill="white" /> Bắt đầu lên lịch hẹn
          </Link>
        </div>
      )}

      {/* 4. Hero Content */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-6 py-12">
        <div className="text-center max-w-3xl flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-pink-200 font-medium mb-6 shadow-lg shadow-black/20 animate-pulse">
            🌸 Không gian hẹn hò riêng tư của hai đứa
          </span>

          <h1 className="text-white text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight font-serif">
            Kết nối vị giác. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-amber-200 italic">
              Lưu giữ ngọt ngào.
            </span>
          </h1>

          <p className="text-white/85 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mx-auto mt-6 font-normal">
            Xóa tan câu hỏi &ldquo;Hôm nay ăn gì / Đi đâu chơi?&rdquo;. Vòng quay ẩm thực, địa điểm lãng mạn và chiếc thiệp VIP Floral Date Pass được tạo riêng cho người ấy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="/food-roulette"
              className="px-7 py-3.5 bg-white text-neutral-900 text-sm sm:text-base font-semibold rounded-full hover:bg-white/90 shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
            >
              Quay vòng chọn món
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/date-planner"
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md rounded-full text-white text-sm sm:text-base font-semibold hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-pink-300 fill-pink-300/40" />
              Mời hẹn hò 4 bước
            </Link>
          </div>
        </div>
      </div>

      {/* 5. Bottom Trust Bar / Indicator */}
      <div className="relative z-20 w-full px-6 md:px-16 py-4 flex items-center justify-between text-xs text-white/60 border-t border-white/10 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <span>✨ Video 3D Tulip thực tế</span>
          <span>•</span>
          <span>🎟️ Xuất thiệp hẹn hò PNG Retina 2x</span>
        </div>
        <div className="hidden sm:block">
          <span>Our Date Night • Private Couple Experience 💕</span>
        </div>
      </div>
    </section>
  );
}
