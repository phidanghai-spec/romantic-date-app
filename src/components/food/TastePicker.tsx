'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Check, Sparkles, Heart } from 'lucide-react';

export interface CuisineItem {
  id: string;
  name: string;
  icon: string;
  tag: string;
  desc: string;
  category: 'gu_nang' | 'gu_chang' | 'lang_man' | 'an_vat' | 'tu_nau';
}

export const POPULAR_CUISINES: CuisineItem[] = [
  {
    id: 'hotpot',
    name: 'Lẩu Haidilao / Hot Pot',
    icon: '🍲',
    tag: 'Gu nàng mê 💖',
    desc: 'Ấm cúng, nhúng thịt bò, tôm múa mì & tán gẫu',
    category: 'gu_nang',
  },
  {
    id: 'bbq',
    name: 'K-BBQ Nướng Hàn Quốc',
    icon: '🥩',
    tag: 'Gu chàng khoái 🍖',
    desc: 'Dẻ sườn nướng xèo xèo, panchan kimchi giòn rụm',
    category: 'gu_chang',
  },
  {
    id: 'ramen',
    name: 'Ramen & Sushi Nhật Bản',
    icon: '🍜',
    tag: 'Thanh đạm 🍵',
    desc: 'Nước dùng Tonkotsu hầm 12h, không gian yên tĩnh',
    category: 'lang_man',
  },
  {
    id: 'steak',
    name: 'Steak & Rượu Vang',
    icon: '🍷',
    tag: 'Hẹn hò lãng mạn ✨',
    desc: 'Ánh nến lung linh, bò mềm tan và rượu vang đỏ',
    category: 'lang_man',
  },
  {
    id: 'cafe',
    name: 'Cafe Lãng Mạn & Bánh Ngọt',
    icon: '☕',
    tag: 'Chill & Sống ảo 🍰',
    desc: 'Bánh mousse, trà hoa quả và góc chụp hình xinh',
    category: 'an_vat',
  },
  {
    id: 'streetfood',
    name: 'Ốc Sài Gòn & Ăn Vặt',
    icon: '🍢',
    tag: 'Náo nhiệt & Vui vẻ 🥢',
    desc: 'Ốc hương trứng muối, bánh mì giòn & trà tắc',
    category: 'an_vat',
  },
  {
    id: 'bundau',
    name: 'Bún Đậu Mắm Tôm',
    icon: '🥢',
    tag: 'Đậm đà chuẩn vị 🍃',
    desc: 'Chả cốm giòn rụm, bắp giò hoa luộc & tắc chua ngọt',
    category: 'an_vat',
  },
  {
    id: 'homecooking',
    name: 'Bữa Tối Nấu Tại Nhà',
    icon: '🍳',
    tag: 'Ấm áp bên nhau 🏡',
    desc: 'Cùng nhau đi chợ, vào bếp và thưởng thức món tự làm',
    category: 'tu_nau',
  },
];

interface TastePickerProps {
  selectedFoods: string[];
  onChangeSelectedFoods: (foods: string[]) => void;
  customCuisine: string;
  onChangeCustomCuisine: (value: string) => void;
}

export const TastePicker: React.FC<TastePickerProps> = ({
  selectedFoods,
  onChangeSelectedFoods,
  customCuisine,
  onChangeCustomCuisine,
}) => {
  const toggleFood = (foodName: string) => {
    if (selectedFoods.includes(foodName)) {
      if (selectedFoods.length === 1 && !customCuisine.trim()) {
        // Keep at least one or let user unselect if custom exists
        onChangeSelectedFoods([]);
      } else {
        onChangeSelectedFoods(selectedFoods.filter((f) => f !== foodName));
      }
    } else {
      onChangeSelectedFoods([...selectedFoods, foodName]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Cuisines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1.5">
        {POPULAR_CUISINES.map((item) => {
          const isSelected = selectedFoods.includes(item.name);
          return (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleFood(item.name)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative select-none ${
                isSelected
                  ? 'bg-rose-50/90 border-rose-400 tulip-glow-border shadow-md'
                  : 'cream-glass hover:bg-white/95 border-rose-200/40'
              }`}
            >
              {/* Tulip Icon & Emoji Hub */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-colors ${
                  isSelected ? 'bg-rose-100 text-rose-600 shadow-inner' : 'bg-rose-50/60'
                }`}
              >
                {item.icon}
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#2D1E2F] truncate">{item.name}</span>
                </div>
                <span className="inline-block mt-0.5 text-[9.5px] font-medium text-rose-600 bg-rose-100/70 px-2 py-0.2 rounded-full">
                  {item.tag}
                </span>
                <p className="text-[11px] text-[#715A75] font-light mt-1 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Selected Tulip Indicator Badge */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Selected Items Counter Banner */}
      {selectedFoods.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50/70 border border-rose-200/60 text-xs text-[#4A3B4E]">
          <span className="font-semibold text-rose-600 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            Đã chọn {selectedFoods.length} món:
          </span>
          {selectedFoods.map((f, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white text-rose-700 font-medium text-[11px] border border-rose-200 shadow-2xs"
            >
              {f}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFood(f);
                }}
                className="hover:text-rose-900 font-bold ml-0.5 text-xs"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Custom Cuisine & Secret Spot Input */}
      <div className="p-4 rounded-2xl cream-glass border border-rose-200/50 space-y-2 bg-gradient-to-r from-rose-50/40 via-white/80 to-pink-50/40">
        <label className="text-xs font-semibold text-rose-800 flex items-center gap-1.5">
          <Utensils className="w-4 h-4 text-rose-500" />
          <span>Hoặc nhập quán ruột / món ăn đặc biệt của hai bạn:</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={customCuisine}
            onChange={(e) => onChangeCustomCuisine(e.target.value)}
            placeholder="VD: Quán ốc đường D2, Bánh mì chảo cô Ba, Cafe The Vintage..."
            className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-rose-200 text-xs sm:text-sm text-[#2D1E2F] placeholder:text-[#A08DA3] focus:outline-hidden focus:border-rose-400 focus:ring-2 focus:ring-rose-200/60 shadow-inner"
          />
          {customCuisine.trim() && (
            <span className="absolute right-3 top-2.5 px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-semibold">
              Món riêng ✨
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
