'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCw, CalendarHeart, ChefHat, Flame, Utensils } from 'lucide-react';
import Link from 'next/link';

interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bgDark: string;
  desc: string;
}

const FOOD_ITEMS: FoodItem[] = [
  { id: '1', name: 'Lẩu Haidilao', emoji: '🍲', color: '#f43f5e', bgDark: 'from-rose-950 to-black', desc: 'Ấm cúng, nhúng thịt bò & tôm múa mì' },
  { id: '2', name: 'K-BBQ Nướng', emoji: '🥩', color: '#fb923c', bgDark: 'from-orange-950 to-black', desc: 'Dẻ sườn nướng xèo xèo cuốn xà lách' },
  { id: '3', name: 'Ramen & Sushi', emoji: '🍜', color: '#facc15', bgDark: 'from-amber-950 to-black', desc: 'Nước dùng đậm đà, không gian Nhật Bản' },
  { id: '4', name: 'Ốc & Ăn Vặt', emoji: '🍢', color: '#4ade80', bgDark: 'from-emerald-950 to-black', desc: 'Náo nhiệt, ốc hương sốt trứng muối' },
  { id: '5', name: 'Pizza & Pasta', emoji: '🍕', color: '#38bdf8', bgDark: 'from-sky-950 to-black', desc: 'Phô mai kéo sợi, mì Ý sốt kem nấm' },
  { id: '6', name: 'Steak & Rượu Vang', emoji: '🍷', color: '#c084fc', bgDark: 'from-purple-950 to-black', desc: 'Ánh nến lãng mạn, bò Wagyu mềm tan' },
  { id: '7', name: 'Bún Đậu Mắm Tôm', emoji: '🥢', color: '#e879f9', bgDark: 'from-pink-950 to-black', desc: 'Chả cốm giòn rụm, thịt bắp hoa luộc' },
  { id: '8', name: 'Trà Sữa & Bingsu', emoji: '🧋', color: '#f472b6', bgDark: 'from-rose-950 to-black', desc: 'Hảo ngọt tráng miệng, mát lạnh sảng khoái' },
];

interface FoodRouletteWheelProps {
  onPickMeal?: (item: FoodItem) => void;
  onOpenCookingModal?: () => void;
}

export const FoodRouletteWheel: React.FC<FoodRouletteWheelProps> = ({
  onPickMeal,
  onOpenCookingModal,
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedFood(null);

    const sliceAngle = 360 / FOOD_ITEMS.length;
    const randomExtraTurns = Math.floor(Math.random() * 5 + 5) * 360; // 5 to 10 full turns
    const randomSliceIndex = Math.floor(Math.random() * FOOD_ITEMS.length);
    // Align index to top pointer (subtract offset)
    const targetAngle = randomExtraTurns + randomSliceIndex * sliceAngle;

    const finalRotation = rotation + targetAngle;
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      // Calculate selected slice
      const actualWinningIndex = (FOOD_ITEMS.length - (Math.floor(finalRotation / sliceAngle) % FOOD_ITEMS.length)) % FOOD_ITEMS.length;
      const winner = FOOD_ITEMS[actualWinningIndex] || FOOD_ITEMS[randomSliceIndex];
      setSelectedFood(winner);
      if (onPickMeal) onPickMeal(winner);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fbbf24', '#c084fc', '#38bdf8'],
        });
      } catch {
        // safe
      }
    }, 4000);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* Visual Spinning Wheel Frame */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
        {/* Top Pointer Indicator */}
        <div className="absolute -top-3 z-30 flex flex-col items-center pointer-events-none">
          <div className="w-4 h-6 bg-gradient-to-b from-rose-500 to-amber-400 rounded-b-full shadow-lg shadow-rose-500/50" />
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-amber-400 drop-shadow-md" />
        </div>

        {/* Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/20 via-purple-500/20 to-amber-500/20 blur-xl animate-pulse" />

        {/* The SVG Wheel */}
        <motion.div
          style={{ rotate: rotation }}
          transition={{ duration: 4, ease: [0.15, 0.9, 0.2, 1] }}
          className="relative w-full h-full rounded-full border-4 border-white/20 shadow-2xl overflow-hidden bg-black/90 cursor-pointer"
          onClick={spinWheel}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {FOOD_ITEMS.map((item, index) => {
              const count = FOOD_ITEMS.length;
              const angle = (360 / count) * (Math.PI / 180);
              const startAngle = index * angle;
              const endAngle = (index + 1) * angle;

              const x1 = 50 + 50 * Math.cos(startAngle);
              const y1 = 50 + 50 * Math.sin(startAngle);
              const x2 = 50 + 50 * Math.cos(endAngle);
              const y2 = 50 + 50 * Math.sin(endAngle);

              const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

              // Calculate text position
              const midAngle = startAngle + angle / 2;
              const textX = 50 + 34 * Math.cos(midAngle);
              const textY = 50 + 34 * Math.sin(midAngle);

              return (
                <g key={item.id}>
                  <path
                    d={pathData}
                    fill={index % 2 === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)'}
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="0.5"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="white"
                    fontSize="6.5"
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

          {/* Wheel Center Hub */}
          <div className="absolute inset-0 m-auto w-16 h-16 rounded-full liquid-glass-pill flex items-center justify-center shadow-xl border border-white/30 z-20">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white text-xs font-black shadow-md">
              SPIN
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="py-3 px-8 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:scale-105 active:scale-95 text-white font-bold text-sm shadow-xl shadow-rose-500/30 transition-all flex items-center gap-2 border border-white/20 disabled:opacity-50"
        >
          <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'Đang quay món...' : 'Quay Vòng Xúc Xắc 🎲'}</span>
        </button>

        {onOpenCookingModal && (
          <button
            onClick={onOpenCookingModal}
            className="py-3 px-6 rounded-full liquid-glass-pill hover:bg-white/10 text-white text-xs font-medium active:scale-95 transition-all flex items-center gap-2 border border-white/15"
          >
            <ChefHat className="w-4 h-4 text-amber-300" />
            <span>Hôm nay tự nấu ở nhà 🍳</span>
          </button>
        )}
      </div>

      {/* Result Display Box */}
      {selectedFood && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-sm liquid-glass rounded-3xl p-5 text-center space-y-3 border border-rose-500/40 bg-gradient-to-b from-rose-950/40 to-black shadow-2xl"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-mono tracking-wider uppercase border border-rose-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Vòng quay đã chọn</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">{selectedFood.emoji}</span>
            <div className="text-left">
              <h4 className="font-serif-italic text-2xl text-white">{selectedFood.name}</h4>
              <p className="text-xs text-white/60 font-light">{selectedFood.desc}</p>
            </div>
          </div>

          <Link
            href={`/date-planner?cuisine=${encodeURIComponent(selectedFood.name)}`}
            className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:scale-102 active:scale-98 text-white font-bold text-xs shadow-lg shadow-rose-500/30 transition-all flex items-center justify-center gap-1.5 border border-white/20"
          >
            <CalendarHeart className="w-4 h-4" />
            <span>Lên Lịch Đi Ăn Món Này Ngay ➔</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
};
