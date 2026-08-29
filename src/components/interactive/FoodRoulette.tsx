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
  Plus,
  Settings2,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import { useCoupleStore } from '@/lib/coupleStore';
import { CUISINES_DATA, CountryId, RouletteFood } from '@/data/cuisines';
import { CoupleSettingsModal } from '@/components/profile/CoupleSettingsModal';
import { CookingRecipeModal } from '@/components/food/CookingRecipeModal';

interface FoodRouletteProps {
  onPickMeal?: (item: RouletteFood) => void;
  onOpenCookingModal?: () => void;
}

export const FoodRoulette: React.FC<FoodRouletteProps> = ({
  onPickMeal,
  onOpenCookingModal,
}) => {
  const { profile } = useCoupleStore();
  const [selectedCountry, setSelectedCountry] = useState<CountryId>('vietnam');
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<RouletteFood | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [targetRecipeTitle, setTargetRecipeTitle] = useState<string | undefined>(undefined);

  // Get current country items from CUISINES_DATA
  const countryConfig =
    CUISINES_DATA.find((c) => c.id === selectedCountry) || CUISINES_DATA[0];

  // Also include user custom food items for this country
  const customItemsForCountry: RouletteFood[] = (
    profile.tastePreferences?.customFoodItems || []
  )
    .filter((f) => f.country === selectedCountry)
    .map((f) => ({
      id: f.id,
      name: f.name,
      emoji: f.emoji,
      tag: f.tag,
      desc: f.desc,
      price: 'Quán ruột',
      vibe: 'Cặp đôi',
    }));

  // Combine items, ensure exact 8 slices on wheel
  const combinedItems: RouletteFood[] = [
    ...customItemsForCountry,
    ...countryConfig.rouletteItems,
  ].slice(0, 8);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedFood(null);

    const totalItems = combinedItems.length;
    const sliceAngle = 360 / totalItems;

    const winningTargetIndex = Math.floor(Math.random() * totalItems);
    const extraFullTurns = 5;

    const targetOffset = 360 - winningTargetIndex * sliceAngle - sliceAngle / 2;
    const nextTargetAngle = 360 * extraFullTurns + targetOffset;

    const currentBase = Math.floor(rotation / 360) * 360;
    const finalRotation = currentBase + 360 * 2 + nextTargetAngle;

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const winner = combinedItems[winningTargetIndex];
      setSelectedFood(winner);
      if (onPickMeal) onPickMeal(winner);

      try {
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#F472B6', '#FB7185', '#60A5FA', '#FDE68A', '#E11D48'],
        });
      } catch {
        // Safe fallback
      }
    }, 4500);
  };

  const handleCountryChange = (country: CountryId) => {
    if (isSpinning) return;
    setSelectedCountry(country);
    setSelectedFood(null);
  };

  const handleOpenSpecificRecipe = (dishName?: string) => {
    setTargetRecipeTitle(dishName);
    setIsRecipeModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* ── 5 Country Switcher Tabs ── */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-rose-50/90 border border-rose-200/80 shadow-xs">
        {CUISINES_DATA.map((cat) => {
          const isActive = selectedCountry === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCountryChange(cat.id)}
              disabled={isSpinning}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white shadow-md shadow-rose-500/25 scale-105 border border-white/50'
                  : 'text-[#5E4761] hover:text-[#2D1E2F] hover:bg-white/80'
              }`}
            >
              <span className="text-sm">{cat.flag}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Button mở Cài Đặt Khẩu Vị & Thêm Món */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 border border-rose-200 text-[#831843] text-xs font-bold shadow-xs hover:bg-rose-50 hover:border-rose-300 transition-all cursor-pointer"
        >
          <Settings2 className="w-3.5 h-3.5 text-rose-500" />
          <span>Tùy chỉnh món ruột &amp; Khẩu vị cặp đôi</span>
        </button>
      </div>

      {/* ── Visual Spinning Wheel Frame ── */}
      <div className="relative w-72 h-72 sm:w-84 sm:h-84 flex items-center justify-center select-none">
        {/* Top Pointer Indicator (Kim chỉ đỉnh chính xác) */}
        <div className="absolute -top-3.5 z-30 flex flex-col items-center pointer-events-none drop-shadow-md">
          <div className="w-5 h-7 bg-gradient-to-b from-rose-500 to-pink-500 rounded-t-full shadow-lg border border-white" />
          <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[12px] border-t-pink-500 drop-shadow-md" />
        </div>

        {/* Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-200/60 via-amber-100/50 to-blue-200/50 blur-xl animate-pulse" />

        {/* The Animated SVG Wheel Container */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4.5, ease: [0.15, 0.9, 0.2, 1] }}
          className="relative w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white cursor-pointer"
          onClick={spinWheel}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {combinedItems.map((item, index) => {
              const count = combinedItems.length;
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
                  {/* Item Emoji UTF-8 Standard */}
                  <text
                    x={textX}
                    y={textY}
                    fontSize="6.8"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${index * 45 + 22.5 + 90}, ${textX}, ${textY})`}
                    className="select-none font-sans font-medium"
                  >
                    {item.emoji}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Central Button / Hub */}
          <div className="absolute inset-0 m-auto w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/95 backdrop-blur-md border-2 border-rose-300 shadow-xl flex flex-col items-center justify-center text-center group">
            <span className="text-xl sm:text-2xl group-hover:scale-125 transition-transform">
              🎲
            </span>
            <span className="text-[8.5px] font-bold text-rose-600 font-mono tracking-wider uppercase">
              {isSpinning ? 'Đang quay' : 'Chạm để quay'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Main Action Buttons ── */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-sm shadow-xl shadow-rose-500/25 hover:opacity-95 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2 border border-white/40 cursor-pointer"
        >
          <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'Bánh xe đang quay...' : `Quay Món ${countryConfig.label} 🎲`}</span>
        </button>

        <button
          onClick={() => {
            if (onOpenCookingModal) onOpenCookingModal();
            else handleOpenSpecificRecipe();
          }}
          className="px-6 py-3.5 rounded-full bg-white/95 border-1.5 border-rose-300 text-[#831843] font-bold text-xs hover:bg-rose-50 active:scale-95 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <ChefHat className="w-4 h-4 text-amber-600" />
          <span>Công Thức Nấu Tại Nhà ({countryConfig.flag} {countryConfig.label})</span>
        </button>
      </div>

      {/* ── Winner Result Display Card (With 2-Way Interactive Recipe Shortcut) ── */}
      {selectedFood && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md p-6 rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-rose-300 shadow-2xl shadow-rose-900/10 space-y-4 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-mono uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Món Ăn Được Chọn Cho Buổi Hẹn!</span>
          </div>

          <div className="space-y-1.5">
            <div className="text-4xl">{selectedFood.emoji}</div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#4A1D2F]">
              {selectedFood.name}
            </h3>
            <p className="text-xs text-[#6B5B6E] leading-relaxed max-w-sm mx-auto font-light">
              {selectedFood.desc}
            </p>
          </div>

          {/* Action Row: Lên lịch hẹn & Xem công thức món này */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href={`/date-planner?cuisine=${encodeURIComponent(selectedFood.name)}`}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <CalendarHeart className="w-4 h-4" />
              <span>Chốt Món &amp; Lên Lịch Hẹn Ngay 💌</span>
            </Link>

            {/* Shortcut Xem Công Thức Món Này */}
            <button
              type="button"
              onClick={() => handleOpenSpecificRecipe(selectedFood.name)}
              className="px-4 py-2.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Xem công thức món này 👨‍🍳</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Couple Profile Settings Modal */}
      <CoupleSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Home Cooking Recipe Modal */}
      <CookingRecipeModal
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        selectedCountry={selectedCountry}
        initialRecipeTitle={targetRecipeTitle}
      />
    </div>
  );
};
