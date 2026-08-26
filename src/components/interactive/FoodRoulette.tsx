'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  RotateCw, 
  CalendarHeart, 
  ChefHat, 
  Heart, 
  Utensils, 
  Flame, 
  Check,
  Wine,
  Cake,
  Coffee
} from 'lucide-react';
import Link from 'next/link';

export interface RouletteFoodItem {
  id: string;
  name: string;
  emoji: string;
  tag: string;
  desc: string;
}

export interface CategoryData {
  id: 'nang' | 'chang' | 'dessert' | 'romantic';
  label: string;
  icon: string;
  items: RouletteFoodItem[];
}

export const CATEGORIES_CONFIG: CategoryData[] = [
  {
    id: 'nang',
    label: 'Gu Nàng 💖',
    icon: '💖',
    items: [
      { id: 'n1', name: 'Lẩu Haidilao', emoji: '🍲', tag: 'Nàng Mê 💖', desc: 'Nhúng thịt bò, múa mì kungfu & nước lẩu cà chua đậm đà' },
      { id: 'n2', name: 'Trà Sữa Trân Châu', emoji: '🧋', tag: 'Hảo Ngọt 🧋', desc: 'Trà sữa đậm vị kèm trân châu đường đen dẻo thơm' },
      { id: 'n3', name: 'Sushi & Sashimi', emoji: '🍣', tag: 'Thanh Nhẹ 🍵', desc: 'Cá hồi Na Uy tươi béo mềm tan và cơm cuộn rong biển' },
      { id: 'n4', name: 'Bánh Mousse Dâu', emoji: '🍰', tag: 'Ngọt Ngào 🍓', desc: 'Bánh kem dâu tây chua ngọt mát lạnh và trà hoa quả' },
      { id: 'n5', name: 'Mì Ý Sốt Nấm', emoji: '🍝', tag: 'Béo Ngậy 🧀', desc: 'Sợi mì Ý dai mềm quyện sốt kem nấm truffle thơm lừng' },
      { id: 'n6', name: 'Bingsu Xoài Tuyết', emoji: '🍧', tag: 'Mát Lạnh 🥭', desc: 'Tuyết sữa bào mịn phủ sốt xoài tươi và kem vani' },
      { id: 'n7', name: 'Tokbokki Phô Mai', emoji: '🧀', tag: 'Cay Cay 🌶️', desc: 'Bánh gạo dẻo quánh sốt tương ớt Hàn Quốc kéo sợi phô mai' },
      { id: 'n8', name: 'Gà Rán Giòn Rụm', emoji: '🍗', tag: 'Giòn Tan 🍗', desc: 'Gà rán sốt mật ong tỏi giòn tan nhâm nhi cùng nước ngọt' },
    ],
  },
  {
    id: 'chang',
    label: 'Gu Chàng 🍖',
    icon: '🍖',
    items: [
      { id: 'c1', name: 'K-BBQ Nướng', emoji: '🥩', tag: 'Chàng Khoái 🍖', desc: 'Dẻ sườn bò nướng than hồng xèo xèo cuốn lá mè' },
      { id: 'c2', name: 'Bò Né Ốp La', emoji: '🍳', tag: 'Năng Lượng 🥖', desc: 'Bò bít tết chảo gang xèo xèo kèm pate béo ngậy và bánh mì' },
      { id: 'c3', name: 'Bún Đậu Mắm Tôm', emoji: '🥢', tag: 'Đậm Đà 🍃', desc: 'Chả cốm giòn rụm, thịt bắp giò luộc & mắm tôm thơm ngậy' },
      { id: 'c4', name: 'Cơm Tấm Sườn Bì', emoji: '🍚', tag: 'No Bụng 🍛', desc: 'Sườn nướng mỡ hành thơm phức, chả trứng & nước mắm kẹo' },
      { id: 'c5', name: 'Ốc Sài Gòn & Đồ Cay', emoji: '🍢', tag: 'Náo Nhiệt 🥢', desc: 'Ốc hương trứng muối, càng ghẹ rang muối ớt & trà tắc' },
      { id: 'c6', name: 'Phở Bò Tái Nạm', emoji: '🍜', tag: 'Truyền Thống 🍲', desc: 'Nước dùng hầm xương ngọt thanh, hành hoa & quẩy giòn' },
      { id: 'c7', name: 'Burger Bò Mỹ', emoji: '🍔', tag: 'Đẫm Sốt 🍟', desc: 'Thịt bò Angus nướng phô mai cheddar kèm khoai tây chiên' },
      { id: 'c8', name: 'Bia Thủ Công & Mồi', emoji: '🍺', tag: 'Chill Tối 🍻', desc: 'Craft beer mát lạnh cùng snack khô bò & xúc xích nướng' },
    ],
  },
  {
    id: 'dessert',
    label: 'Đồ Ngọt & Cafe 🍰',
    icon: '🍰',
    items: [
      { id: 'd1', name: 'Bingsu Tuyết Mịn', emoji: '🍧', tag: 'Mát Lạnh 🍧', desc: 'Đá bào sữa tuyết phủ đầy trân châu phô mai và sữa đặc' },
      { id: 'd2', name: 'Trà Sữa Ô Long', emoji: '🧋', tag: 'Đậm Vị 🧋', desc: 'Trà ô long nướng thơm nồng kết hợp lớp kem cheese sánh mịn' },
      { id: 'd3', name: 'Tiramisu Ý', emoji: '🍰', tag: 'Đậm Đà ☕', desc: 'Bánh mascarpone mềm mịn đẫm vị cafe espresso thơm lừng' },
      { id: 'd4', name: 'Chè Thái Sầu Riêng', emoji: '🥣', tag: 'Thơm Béo 🥥', desc: 'Sầu riêng tươi thơm phức cùng nước cốt dừa và thạch ngọc' },
      { id: 'd5', name: 'Gelato Ý Thủ Công', emoji: '🍨', tag: 'Mềm Mịn 🍨', desc: 'Kem gelato hạt dẻ cười pistachio và socola đen nguyên chất' },
      { id: 'd6', name: 'Bánh Crepe Sầu Riêng', emoji: '🥞', tag: 'Béo Ngậy 🥞', desc: 'Vỏ bánh mỏng tang bọc đầy kem tươi và múi sầu riêng vàng ươm' },
      { id: 'd7', name: 'Croissant Bơ Pháp', emoji: '🥐', tag: 'Thơm Bơ 🥐', desc: 'Bánh sừng bò ngàn lớp thơm lừng bơ Pháp kèm tách socola nóng' },
      { id: 'd8', name: 'Cafe Trứng Hà Nội', emoji: '☕', tag: 'Ấm Áp ☕', desc: 'Lớp kem trứng đánh bông béo ngậy trên nền cafe phin đậm đà' },
    ],
  },
  {
    id: 'romantic',
    label: 'Hẹn Hò Lãng Mạn 🍷',
    icon: '🍷',
    items: [
      { id: 'r1', name: 'Steak & Rượu Vang', emoji: '🍷', tag: 'Lãng Mạn 🕯️', desc: 'Thăn bò Wagyu nướng than hồng mềm tan bên ly vang đỏ nồng nàn' },
      { id: 'r2', name: 'Rooftop Pasta & Cocktail', emoji: '🍝', tag: 'View Phố 🌃', desc: 'Ngắm toàn cảnh thành phố rực rỡ ánh đèn và thưởng thức pasta' },
      { id: 'r3', name: 'Fine Dining Hải Sản', emoji: '🦞', tag: 'Sang Trọng ✨', desc: 'Tôm hùm bỏ lò phô mai và hàu nướng bơ tỏi trong không gian ấm cúng' },
      { id: 'r4', name: 'Teppanyaki Nhật Bản', emoji: '🍱', tag: 'Biểu Diễn 🔥', desc: 'Xem đầu bếp múa dao xào nấu thịt bò và hải sản nóng hổi trước mắt' },
      { id: 'r5', name: 'Sushi Omakase', emoji: '🍣', tag: 'Tinh Hoa 🍣', desc: 'Trải nghiệm ẩm thực cao cấp với từng miếng sushi tuyển chọn' },
      { id: 'r6', name: 'Lẩu Uyên Ương Ánh Nến', emoji: '🍲', tag: 'Ấm Cúng 🕯️', desc: 'Nồi lẩu 2 ngăn chua cay & ngọt thanh bên bàn tiệc trải hoa' },
      { id: 'r7', name: 'Pizza Nướng Củi', emoji: '🍕', tag: 'Thủ Công 🍕', desc: 'Đế bánh giòn rụm nướng lò củi phủ phô mai Burrata tươi béo' },
      { id: 'r8', name: 'Fondue Phô Mai & Trái Cây', emoji: '🫕', tag: 'Ngọt Ngào 🍓', desc: 'Nhúng dâu tây và bánh mì giòn vào nồi phô mai hoặc socola ấm nóng' },
    ],
  },
];

interface FoodRouletteProps {
  onPickMeal?: (item: RouletteFoodItem) => void;
  onOpenCookingModal?: () => void;
}

export const FoodRoulette: React.FC<FoodRouletteProps> = ({
  onPickMeal,
  onOpenCookingModal,
}) => {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<'nang' | 'chang' | 'dessert' | 'romantic'>('nang');
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<RouletteFoodItem | null>(null);

  const currentCategory = CATEGORIES_CONFIG.find((c) => c.id === selectedCategoryKey) || CATEGORIES_CONFIG[0];
  const items = currentCategory.items;

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedFood(null);

    const totalItems = items.length; // 8 items
    const sliceAngle = 360 / totalItems; // 45 degrees

    const winningTargetIndex = Math.floor(Math.random() * totalItems);
    const extraFullTurns = 5; // 5 full turns

    // Formula for top pointer at 0 deg:
    // θ = 360 * N + (360 - targetIndex * sliceAngle - sliceAngle/2)
    const targetOffset = 360 - winningTargetIndex * sliceAngle - sliceAngle / 2;
    const nextTargetAngle = 360 * extraFullTurns + targetOffset;

    // Calculate delta to always spin forward smoothly
    const currentBase = Math.floor(rotation / 360) * 360;
    const finalRotation = currentBase + 360 * 2 + nextTargetAngle;

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const winner = items[winningTargetIndex];
      setSelectedFood(winner);
      if (onPickMeal) onPickMeal(winner);

      // Trigger Confetti celebration
      try {
        confetti({
          particleCount: 110,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#F472B6', '#FB7185', '#60A5FA', '#FDE68A', '#E11D48'],
        });
      } catch {
        // Safe fallback
      }
    }, 4500);
  };

  const handleCategoryChange = (key: 'nang' | 'chang' | 'dessert' | 'romantic') => {
    if (isSpinning) return;
    setSelectedCategoryKey(key);
    setSelectedFood(null);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* 4 Dynamic Category Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-rose-50/90 border border-rose-200 shadow-inner">
        {CATEGORIES_CONFIG.map((cat) => {
          const isActive = selectedCategoryKey === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              disabled={isSpinning}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/30 scale-105 border border-white/40'
                  : 'text-[#5E4761] hover:text-[#2D1E2F] hover:bg-white/80'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Visual Spinning Wheel Frame */}
      <div className="relative w-72 h-72 sm:w-84 sm:h-84 flex items-center justify-center select-none">
        {/* Top Pointer Indicator (Kim chỉ đỉnh chính xác) */}
        <div className="absolute -top-3.5 z-30 flex flex-col items-center pointer-events-none drop-shadow-md">
          <div className="w-5 h-7 bg-gradient-to-b from-rose-500 to-pink-500 rounded-t-full shadow-lg border border-white" />
          <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[12px] border-t-pink-500 drop-shadow-md" />
        </div>

        {/* Outer Glow Ring with Tulip/Star Pastel colors */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-200/60 via-amber-100/50 to-blue-200/50 blur-xl animate-pulse" />

        {/* The Animated SVG Wheel Container */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4.5, ease: [0.15, 0.9, 0.2, 1] }}
          className="relative w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white cursor-pointer"
          onClick={spinWheel}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {items.map((item, index) => {
              const count = items.length;
              const angle = (360 / count) * (Math.PI / 180);
              const startAngle = index * angle;
              const endAngle = (index + 1) * angle;

              const x1 = 50 + 50 * Math.cos(startAngle);
              const y1 = 50 + 50 * Math.sin(startAngle);
              const x2 = 50 + 50 * Math.cos(endAngle);
              const y2 = 50 + 50 * Math.sin(endAngle);

              const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

              // Calculate emoji and text position
              const midAngle = startAngle + angle / 2;
              const textX = 50 + 33 * Math.cos(midAngle);
              const textY = 50 + 33 * Math.sin(midAngle);

              const isEven = index % 2 === 0;

              return (
                <g key={item.id}>
                  {/* Slice Path */}
                  <path
                    d={pathData}
                    fill={isEven ? '#FFF8F6' : '#FFF0F2'}
                    stroke="rgba(244, 114, 182, 0.35)"
                    strokeWidth="0.6"
                  />
                  {/* Item Emoji */}
                  <text
                    x={textX}
                    y={textY}
                    fontSize="6.8"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${index * 45 + 22.5 + 90}, ${textX}, ${textY})`}
                    className="select-none font-medium"
                  >
                    {item.emoji}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Absolute Center Hub: Pastel Pink SPIN Button */}
          <div className="absolute inset-0 m-auto w-18 h-18 rounded-full bg-white/90 p-1 shadow-xl border-2 border-rose-300 z-20 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="w-full h-full rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex flex-col items-center justify-center text-white shadow-md cursor-pointer"
            >
              <span className="text-[11px] font-black tracking-wider leading-none">SPIN</span>
              <span className="text-[7.5px] font-medium tracking-tighter opacity-90">QUAY</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="py-3 px-8 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:opacity-95 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/25 transition-all flex items-center gap-2 border border-white/50 cursor-pointer disabled:opacity-60"
        >
          <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'Đang quay món...' : `Quay Danh Mục ${currentCategory.label}`}</span>
        </button>

        {onOpenCookingModal && (
          <button
            onClick={onOpenCookingModal}
            className="py-3 px-6 rounded-full cream-glass-pill hover:bg-white text-[#4A3B4E] text-xs font-semibold active:scale-95 transition-all flex items-center gap-2 border border-rose-200 shadow-xs cursor-pointer"
          >
            <ChefHat className="w-4 h-4 text-amber-500" />
            <span>Hôm nay tự nấu ở nhà 🍳</span>
          </button>
        )}
      </div>

      {/* Winning Result Card */}
      {selectedFood && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-sm cream-glass-card rounded-3xl p-5 text-center space-y-3.5 border border-rose-300/80 shadow-xl relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-mono tracking-wider uppercase border border-rose-200 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Vòng quay đã chọn món</span>
          </div>

          <div className="flex items-center justify-center gap-3.5">
            <span className="text-4xl p-2 rounded-2xl bg-rose-50 border border-rose-200/60 shadow-inner">
              {selectedFood.emoji}
            </span>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <h4 className="font-serif-italic text-2xl text-[#2D1E2F] font-bold">
                  {selectedFood.name}
                </h4>
              </div>
              <span className="inline-block text-[10px] font-semibold text-rose-600 bg-rose-100/80 px-2 py-0.2 rounded-full">
                {selectedFood.tag}
              </span>
              <p className="text-[11px] text-[#715A75] font-light mt-1 line-clamp-2">
                {selectedFood.desc}
              </p>
            </div>
          </div>

          <Link
            href={`/date-planner?cuisine=${encodeURIComponent(selectedFood.name)}`}
            className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:scale-102 active:scale-98 text-white font-bold text-xs shadow-md shadow-rose-500/25 transition-all flex items-center justify-center gap-1.5 border border-white/30"
          >
            <CalendarHeart className="w-4 h-4" />
            <span>Lên Lịch Đi Ăn Món Này Ngay ➔</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
};
