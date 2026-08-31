"use client";

import React from "react";
import Link from "next/link";
import {
  Dices,
  Compass,
  CalendarHeart,
  BookHeart,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function ScrapbookGrid() {
  const cards = [
    {
      id: "food-roulette",
      href: "/food-roulette",
      title: "Hôm Nay Ăn Gì?",
      subtitle: "Taste Decision Engine",
      desc: "Vòng quay bánh xe 8 món ngẫu nhiên (Lẩu, BBQ, Ramen, Sushi, Steak...) hoặc mở Cooking Mode lấy công thức chuẩn ngon tự nấu tại nhà.",
      features: [
        "Vòng quay xúc xắc & hiệu ứng pháo hoa rực rỡ",
        "Menu ảnh HD: Phân loại gu Nàng 💖 vs gu Chàng 🍖",
      ],
      icon: "🍲",
      badgeIcon: Dices,
      badgeText: "Feature 01",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300/80",
      accentColor: "from-amber-400 to-rose-400",
      btnText: "Quay Vòng Ẩm Thực Ngay",
      btnBg: "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200",
      rotation: "-rotate-1",
      tapeColor: "bg-amber-100/80 border-amber-200/60",
    },
    {
      id: "activities",
      href: "/activities",
      title: "Đi Chơi Ở Đâu?",
      subtitle: "Date Spots & Live Weather",
      desc: "Gợi ý địa điểm hẹn hò thông minh đồng bộ thời tiết thực tế: Cafe hoàng hôn lãng mạn, rạp chiếu phim Sweetbox, rooftop cocktail và workshop làm gốm.",
      features: [
        "Cập nhật thời tiết Open-Meteo tự động",
        "Tuyển tập phim tình cảm & chi phí dự kiến",
      ],
      icon: "🗺️",
      badgeIcon: Compass,
      badgeText: "Feature 02",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300/80",
      accentColor: "from-blue-400 to-pink-400",
      btnText: "Khám Phá Địa Điểm Hẹn Hò",
      btnBg: "bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200",
      rotation: "rotate-1",
      tapeColor: "bg-blue-100/80 border-blue-200/60",
    },
    {
      id: "date-planner",
      href: "/date-planner",
      title: "Kế Hoạch & VIP Pass",
      subtitle: "Romantic Quest & Ticket",
      desc: "Lời ngỏ hẹn hò tinh tế với nút 'Không đi' tự động né chuột cực dí dỏm, chọn món ăn và xuất thiệp VIP Floral Date Pass tải ảnh Retina 2x.",
      features: [
        "Nút từ chối tự né chuột kèm câu năn nỉ hài hước",
        "Xuất thiệp VIP Date Pass chuẩn PNG Retina 2x",
      ],
      icon: "🎟️",
      badgeIcon: CalendarHeart,
      badgeText: "Feature 03",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300/80",
      accentColor: "from-rose-500 to-pink-500",
      btnText: "Mở Trình Lên Kế Hoạch 4 Bước",
      btnBg: "bg-rose-50 hover:bg-rose-100 text-rose-900 border-rose-200",
      rotation: "rotate-0.5",
      tapeColor: "bg-rose-100/80 border-rose-200/60",
    },
    {
      id: "timeline",
      href: "/timeline",
      title: "Sổ Kỷ Niệm & Wishlist",
      subtitle: "Memories Scrapbook & Goals",
      desc: "Bộ đếm ngày yêu nhau, album ảnh lưu giữ khoảnh khắc từng buổi hẹn hò kèm chấm điểm sao và Couple Wishlist những việc cần làm cùng nhau.",
      features: [
        "Album ảnh kỷ niệm kèm cảm nghĩ & đánh giá sao",
        "Wishlist ước mơ có thanh tiến độ % hoàn thành",
      ],
      icon: "💖",
      badgeIcon: BookHeart,
      badgeText: "Feature 04",
      badgeColor: "bg-pink-100 text-pink-800 border-pink-300/80",
      accentColor: "from-pink-500 to-rose-400",
      btnText: "Xem Sổ Kỷ Niệm & Wishlist",
      btnBg: "bg-pink-50 hover:bg-pink-100 text-pink-900 border-pink-200",
      rotation: "-rotate-0.5",
      tapeColor: "bg-pink-100/80 border-pink-200/60",
    },
  ];

  return (
    <div className="w-full">
      {/* ── Tiêu Đề Mục Scrapbook ── */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 text-[#831843] text-xs font-bold font-mono uppercase tracking-wider border border-rose-300 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>The Couple Scrapbook Memories</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#4A1D2F] font-bold tracking-tight">
          Bốn Mảnh Ghép Hoàn Hảo Cho Tình Yêu
        </h2>
        <p className="text-xs sm:text-sm text-[#6B5B6E] max-w-lg mx-auto font-sans font-light">
          Mỗi tính năng là một tấm bưu thiếp kỷ niệm được thiết kế riêng để hai bạn luôn tìm thấy niềm vui mỗi khi bên nhau.
        </p>
      </div>

      {/* ── Lưới 4 Thẻ Polaroid Postcard ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-9">
        {cards.map((card) => {
          const BadgeIcon = card.badgeIcon;
          return (
            <div
              key={card.id}
              className={`relative bg-[#FFFDF9]/95 backdrop-blur-xl border border-rose-200/80 rounded-[2rem] p-7 sm:p-8 shadow-xl shadow-rose-950/6 transition-all duration-300 hover:shadow-2xl hover:shadow-rose-950/12 hover:-translate-y-2 hover:rotate-0 ${card.rotation} group flex flex-col justify-between`}
            >
              {/* Băng dính Washi Tape trang trí góc trên */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 ${card.tapeColor} backdrop-blur-xs rounded-xs shadow-xs border rotate-[-1deg] pointer-events-none select-none`}
              />

              {/* Con dấu bưu chính góc phải */}
              <div className="absolute top-4 right-5 font-mono text-[10px] text-rose-300 font-semibold uppercase tracking-widest select-none">
                POSTCARD • 2026
              </div>

              {/* Nội dung chính */}
              <div className="space-y-4 pt-1">
                {/* Header: Icon + Badge */}
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-100 border border-rose-200 flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold uppercase border ${card.badgeColor}`}
                    >
                      <BadgeIcon className="w-3 h-3" />
                      {card.badgeText}
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-[#2D1E2F] group-hover:text-[#831843] transition-colors mt-0.5">
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Mô tả */}
                <p className="text-xs sm:text-[13px] text-[#6B5B6E] leading-relaxed font-sans font-light">
                  {card.desc}
                </p>

                {/* Bullet points đặc trưng */}
                <div className="space-y-1.5 pt-1 text-xs text-[#4A1D2F] font-medium">
                  {card.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <span className="text-rose-400 font-bold">✦</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nút hành động */}
              <div className="pt-6 mt-4 border-t border-rose-100">
                <Link
                  href={card.href}
                  className={`w-full py-2.5 px-5 rounded-full ${card.btnBg} font-semibold text-xs sm:text-sm flex items-center justify-between transition-all border shadow-xs group-hover:shadow-md cursor-pointer`}
                >
                  <span>{card.btnText}</span>
                  <ChevronRight className="w-4 h-4 text-rose-500 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
