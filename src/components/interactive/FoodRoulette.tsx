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
} from 'lucide-react';
import Link from 'next/link';
import { useCoupleStore } from '@/lib/coupleStore';
import { CountryCuisine, FoodItem } from '@/types/couple';
import { CoupleSettingsModal } from '@/components/profile/CoupleSettingsModal';

export interface CountryCategory {
  id: CountryCuisine;
  label: string;
  flag: string;
  items: FoodItem[];
}

export const COUNTRY_FOOD_DATABASE: CountryCategory[] = [
  {
    id: 'vietnam',
    label: 'Việt Nam',
    flag: '🇻🇳',
    items: [
      { id: 'vn1', name: 'Bún Đậu Mắm Tôm', emoji: '🥢', country: 'vietnam', tag: 'Đậm Đà Dân Dã 🍃', desc: 'Chả cốm giòn rụm, thịt bắp giò luộc, đậu rán vàng giòn và mắm tôm chuẩn vị.' },
      { id: 'vn2', name: 'Phở Bò Tái Lăn', emoji: '🍜', country: 'vietnam', tag: 'Truyền Thống 🍲', desc: 'Nước dùng hầm xương ngọt thanh 24h, thịt bò xào lăn thơm phức và quẩy giòn.' },
      { id: 'vn3', name: 'Bún Bò Huế', emoji: '🍲', country: 'vietnam', tag: 'Cay Nồng 🌶️', desc: 'Nước dùng sả ớt đậm đà, chả cua thơm béo, giò heo mềm và rau sống tươi rói.' },
      { id: 'vn4', name: 'Cơm Tấm Sườn Bì', emoji: '🍛', country: 'vietnam', tag: 'No Bụng 🍖', desc: 'Sườn cốt lết nướng mỡ hành thơm nức mũi, chả trứng béo ngậy và nước mắm kẹo.' },
      { id: 'vn5', name: 'Bánh Mì Chảo', emoji: '🥖', country: 'vietnam', tag: 'Năng Lượng 🍳', desc: 'Pate béo ngậy, trứng ốp la xèo xèo, xúc xích và sốt cà chua bánh mì giòn tan.' },
      { id: 'vn6', name: 'Nem Nướng Nha Trang', emoji: '🍢', country: 'vietnam', tag: 'Tươi Mát 🥗', desc: 'Nem nướng thơm lừng cuốn bánh tráng, ram giòn, xoài xanh và nước chấm tôm thịt.' },
      { id: 'vn7', name: 'Lẩu Cua Đồng', emoji: '🦀', country: 'vietnam', tag: 'Ấm Cúng 🥘', desc: 'Riêu cua đồng thơm béo, sườn sụn giòn sần sật, bắp bò nhúng rau muống tươi.' },
      { id: 'vn8', name: 'Ốc Sài Gòn & Đồ Cay', emoji: '🐚', country: 'vietnam', tag: 'Náo Nhiệt 🍻', desc: 'Ốc hương sốt trứng muối kèm bánh mì, càng ghẹ rang muối ớt và trà tắc mát lạnh.' },
    ],
  },
  {
    id: 'korea',
    label: 'Hàn Quốc',
    flag: '🇰🇷',
    items: [
      { id: 'kr1', name: 'K-BBQ Nướng Than', emoji: '🥩', country: 'korea', tag: 'Chàng Khoái 🍖', desc: 'Dẻ sườn bò ướp sốt nướng than hồng xèo xèo, cuộn lá mè tỏi ớt và kimchi giòn.' },
      { id: 'kr2', name: 'Tokbokki Phô Mai', emoji: '🧀', country: 'korea', tag: 'Cay Kéo Sợi 🌶️', desc: 'Bánh gạo dẻo quánh đẫm sốt tương ớt Hàn Quốc kéo sợi phô mai mozzarella béo ngậy.' },
      { id: 'kr3', name: 'Gà Rán Sốt Cay', emoji: '🍗', country: 'korea', tag: 'Giòn Rụm 🍗', desc: 'Gà rán sốt mật ong tỏi hoặc sốt cay ngọt giòn tan nhâm nhi cùng bia mát lạnh.' },
      { id: 'kr4', name: 'Canh Kim Chi Thịt Bò', emoji: '🍲', country: 'korea', tag: 'Nóng Hổi ♨️', desc: 'Canh kimchi chua cay hầm thịt ba chỉ bò mềm và đậu hũ non ấm lòng ngày mưa.' },
      { id: 'kr5', name: 'Kimbap Chiên Giòn', emoji: '🍙', country: 'korea', tag: 'Thơm Ngon 🍱', desc: 'Cơm cuộn rong biển nhân thanh cua trứng xúc xích lăn bột chiên xù giòn tan.' },
      { id: 'kr6', name: 'Mì Lạnh Naengmyeon', emoji: '🍜', country: 'korea', tag: 'Mát Lạnh 🧊', desc: 'Sợi mì kiều mạch dai ngon trong nước dùng thịt bò lạnh thanh mát giải nhiệt.' },
      { id: 'kr7', name: 'Cơm Trộn Bibimbap', emoji: '🍚', country: 'korea', tag: 'Đầy Đủ 🥗', desc: 'Cơm thố đá nóng xèo xèo trộn thịt bò băm, rau củ xào, trứng lòng đào và sốt Gochujang.' },
      { id: 'kr8', name: 'Bánh Xèo Kim Chi', emoji: '🥞', country: 'korea', tag: 'Giòn Tan 🥢', desc: 'Bánh xèo kimchi hải sản chiên giòn viền chấm nước tương ớt cay nhẹ.' },
    ],
  },
  {
    id: 'japan',
    label: 'Nhật Bản',
    flag: '🇯🇵',
    items: [
      { id: 'jp1', name: 'Sushi Cá Hồi & Sashimi', emoji: '🍣', country: 'japan', tag: 'Tươi Sống 🐟', desc: 'Cá hồi Na Uy và cá ngừ tươi béo mềm tan chấm mù tạt wasabi cay nồng.' },
      { id: 'jp2', name: 'Ramen Tonkotsu', emoji: '🍜', country: 'japan', tag: 'Tinh Túy 🍲', desc: 'Nước dùng hầm xương heo 14 tiếng sánh đậm, thịt chashu mềm rục và trứng dẻo.' },
      { id: 'jp3', name: 'Cơm Lươn Unagi', emoji: '🍱', country: 'japan', tag: 'Bổ Dưỡng 🍚', desc: 'Lươn nướng sốt ngọt Teriyaki bóng bẩy trên nền cơm trắng dẻo hạt Nhật Bản.' },
      { id: 'jp4', name: 'Bò Wagyu Nướng', emoji: '🥩', country: 'japan', tag: 'Thượng Hạng ✨', desc: 'Thịt bò Wagyu vân mỡ cẩm thạch mềm tan như bơ nướng đá muối hồng.' },
      { id: 'jp5', name: 'Tempura Tôm Giòn', emoji: '🍤', country: 'japan', tag: 'Vàng Rụm 🍤', desc: 'Tôm sú tươi tẩm bột tempura chiên phồng giòn xốp chấm nước sốt củ cải mài.' },
      { id: 'jp6', name: 'Udon Bò Nóng Hổi', emoji: '🍲', country: 'japan', tag: 'Thanh Nhẹ 🍵', desc: 'Sợi mì Udon to tròn trơn mượt trong nước súp dashi thanh ngọt thịt bò.' },
      { id: 'jp7', name: 'Bánh Bạch Tuộc Takoyaki', emoji: '🐙', country: 'japan', tag: 'Ăn Vặt 🥢', desc: 'Bánh viên nhân bạch tuộc nóng hổi phủ sốt mayonnaise và cá bào nhảy múa.' },
      { id: 'jp8', name: 'Mì Soba Lạnh', emoji: '🥢', country: 'japan', tag: 'Mát Lành 🍃', desc: 'Mì kiều mạch ướp lạnh chấm sốt tsuyu thanh mát ăn kèm rong biển giòn.' },
    ],
  },
  {
    id: 'italy',
    label: 'Âu - Ý & Lãng Mạn',
    flag: '🇮🇹',
    items: [
      { id: 'it1', name: 'Pizza Nướng Củi', emoji: '🍕', country: 'italy', tag: 'Thủ Công 🍕', desc: 'Đế bánh mỏng giòn nướng lò củi phủ phô mai Mozzarella tươi và sốt cà chua Ý.' },
      { id: 'it2', name: 'Mì Ý Carbonara', emoji: '🍝', country: 'italy', tag: 'Béo Ngậy 🧀', desc: 'Sợi mì spaghetti quyện sốt lòng đỏ trứng gà, phô mai Pecorino và thịt xông khói giòn.' },
      { id: 'it3', name: 'Steak Bò Sốt Tiêu & Vang', emoji: '🍷', country: 'italy', tag: 'Lãng Mạn 🕯️', desc: 'Thăn bò Black Angus nướng medium rare sốt tiêu đen bên ly rượu vang đỏ nồng nàn.' },
      { id: 'it4', name: 'Pasta Nấm Truffle', emoji: '🧀', country: 'italy', tag: 'Thơm Lừng ✨', desc: 'Mì dẹt fettuccine sốt kem nấm hương thảo và dầu nấm Truffle đen quý giá.' },
      { id: 'it5', name: 'Salad Burrata Phô Mai', emoji: '🥗', country: 'italy', tag: 'Thanh Mát 🍅', desc: 'Phô mai Burrata tươi béo múp míp cắt đôi chảy kem bên cà chua bi và sốt pesto.' },
      { id: 'it6', name: 'Súp Bí Đỏ Kem Nấm', emoji: '🥣', country: 'italy', tag: 'Mịn Màng 🥣', desc: 'Súp bí đỏ sánh mịn thơm bơ tỏi ăn kèm bánh mì bơ nướng giòn rụm.' },
      { id: 'it7', name: 'Bò Bít Tết Thăn Ngoại', emoji: '🥩', country: 'italy', tag: 'Đậm Vị 🥩', desc: 'Bò nướng chảo gang bơ tỏi lá hương thảo ăn kèm khoai tây nghiền mịn.' },
      { id: 'it8', name: 'Rượu Vang & Tapas', emoji: '🍾', country: 'italy', tag: 'Rooftop Chill 🌃', desc: 'Đĩa thịt nguội phô mai tổng hợp nhâm nhi cùng cocktail và ngắm hoàng hôn.' },
    ],
  },
  {
    id: 'dessert',
    label: 'Tráng Miệng & Cafe',
    flag: '🍰',
    items: [
      { id: 'de1', name: 'Trà Sữa Trân Châu', emoji: '🧋', country: 'dessert', tag: 'Hảo Ngọt 🧋', desc: 'Trà sữa đậm vị trà ô long nướng kết hợp trân châu đen dẻo quánh thơm lừng.' },
      { id: 'de2', name: 'Bingsu Xoài Tuyết', emoji: '🍧', country: 'dessert', tag: 'Mát Lạnh 🥭', desc: 'Tuyết sữa bào mịn như bông tuyết phủ sốt xoài tươi thơm phức và kem vani.' },
      { id: 'de3', name: 'Chè Sầu Riêng Béo', emoji: '🥣', country: 'dessert', tag: 'Thơm Béo 🥥', desc: 'Múi sầu riêng vàng ươm dầm nước cốt dừa béo ngậy, thạch ngọc và hạt lựu giòn.' },
      { id: 'de4', name: 'Tiramisu Espresso', emoji: '🍰', country: 'dessert', tag: 'Đậm Đà ☕', desc: 'Bánh quy ladyfinger đẫm cafe espresso và kem mascarpone bồng bềnh phủ bột cacao.' },
      { id: 'de5', name: 'Cafe Trứng Hà Nội', emoji: '☕', country: 'dessert', tag: 'Ấm Áp ☕', desc: 'Lớp kem trứng đánh bông mịn như mây trên nền cafe phin đắng nhẹ thơm phức.' },
      { id: 'de6', name: 'Bánh Flan Caramel', emoji: '🍮', country: 'dessert', tag: 'Mềm Mịn 🍮', desc: 'Bánh flan trứng sữa mềm tan trong miệng đẫm nước sốt caramel cafe đắng nhẹ.' },
      { id: 'de7', name: 'Kem Gelato Ý', emoji: '🍨', country: 'dessert', tag: 'Thủ Công 🍨', desc: 'Kem gelato hạt dẻ cười pistachio và dâu tây hữu cơ béo ngậy không ngấy.' },
      { id: 'de8', name: 'Croissant Bơ Pháp', emoji: '🥐', country: 'dessert', tag: 'Thơm Bơ 🥐', desc: 'Bánh sừng bò ngàn lớp thơm lừng bơ Pháp nướng giòn tan ăn kèm socola nóng.' },
    ],
  },
];

interface FoodRouletteProps {
  onPickMeal?: (item: FoodItem) => void;
  onOpenCookingModal?: () => void;
}

export const FoodRoulette: React.FC<FoodRouletteProps> = ({
  onPickMeal,
  onOpenCookingModal,
}) => {
  const { profile } = useCoupleStore();
  const [selectedCountry, setSelectedCountry] = useState<CountryCuisine>('vietnam');
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Get current country items + user custom items belonging to this category
  const countryConfig =
    COUNTRY_FOOD_DATABASE.find((c) => c.id === selectedCountry) ||
    COUNTRY_FOOD_DATABASE[0];

  const customItemsForCountry = (
    profile.tastePreferences?.customFoodItems || []
  ).filter((f) => f.country === selectedCountry);

  // Combine items, ensure exact 8 slices on wheel (fill or slice)
  const combinedItems = [...customItemsForCountry, ...countryConfig.items].slice(0, 8);

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

  const handleCountryChange = (country: CountryCuisine) => {
    if (isSpinning) return;
    setSelectedCountry(country);
    setSelectedFood(null);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* 5 Country Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-rose-50/90 border border-rose-200/80 shadow-xs">
        {COUNTRY_FOOD_DATABASE.map((cat) => {
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

      {/* Visual Spinning Wheel Frame */}
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

      {/* Main Spin CTA Button */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-sm shadow-xl shadow-rose-500/25 hover:opacity-95 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2 border border-white/40 cursor-pointer"
        >
          <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'Bánh xe đang quay...' : 'Quay Bánh Xe Ẩm Thực 🎲'}</span>
        </button>

        {onOpenCookingModal && (
          <button
            onClick={onOpenCookingModal}
            className="px-6 py-3.5 rounded-full bg-white/90 border border-rose-200 text-[#4A1D2F] font-bold text-xs hover:bg-rose-50 active:scale-95 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <ChefHat className="w-4 h-4 text-amber-600" />
            <span>Chế Độ Cooking Mode (Nấu Ăn Tại Nhà)</span>
          </button>
        )}
      </div>

      {/* Winner Result Display Card */}
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

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href={`/date-planner?cuisine=${encodeURIComponent(selectedFood.name)}`}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <CalendarHeart className="w-4 h-4" />
              <span>Chốt Món &amp; Lên Lịch Hẹn Ngay 💌</span>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Couple Profile Settings Modal */}
      <CoupleSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};
