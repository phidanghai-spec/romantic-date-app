'use client';

import React, { useState, useEffect } from 'react';
import { X, ChefHat, RotateCw, ExternalLink, CheckSquare, Square, Utensils } from 'lucide-react';
import { MealDetail, getRandomMeal } from '@/lib/dateApis';

interface RecipeCookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeCookingModal: React.FC<RecipeCookingModalProps> = ({ isOpen, onClose }) => {
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  const fetchRecipe = async () => {
    setLoading(true);
    setCheckedIngredients({});
    const data = await getRandomMeal();
    setMeal(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen && !meal) {
      fetchRecipe();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleCheck = (idx: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[85vh] bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-rose-300 text-[#2D1E2F] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-rose-200 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-amber-500" />
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-700 font-bold">
                Couple Home Cooking Date
              </span>
              <h3 className="font-serif-italic text-2xl text-[#2D1E2F] font-bold">Công Thức Tự Nấu Tại Nhà</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-rose-100 text-[#715A75] hover:text-[#2D1E2F] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-serif-italic text-lg text-[#5E4761]">Đang tìm công thức món ngon cho hai đứa... 🍳</p>
          </div>
        ) : meal ? (
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-4">
            {/* Meal Cover Image & Quick Info */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-rose-200 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={meal.thumbnail}
                alt={meal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/90 text-amber-950 text-[10px] font-mono font-bold">
                  {meal.category} • {meal.area} Cuisine
                </span>
                <h4 className="font-serif-italic text-2xl sm:text-3xl text-white drop-shadow-md mt-1 font-bold">
                  {meal.name}
                </h4>
              </div>
            </div>

            {/* Ingredients Checklist */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-800 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-rose-600" /> Nguyên liệu cần chuẩn bị ({meal.ingredients.length})
                </span>
                <span className="text-[10px] text-[#715A75]">Bấm để đánh dấu đã mua</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {meal.ingredients.map((item, idx) => {
                  const isChecked = Boolean(checkedIngredients[idx]);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(idx)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-2 select-none ${
                        isChecked
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-800 line-through opacity-75'
                          : 'bg-white border-rose-200/60 text-[#2D1E2F] hover:bg-rose-100/50'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-rose-300 shrink-0" />
                      )}
                      <span className="truncate">
                        <strong>{item.ingredient}</strong> ({item.measure})
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructions */}
            <div className="p-4 rounded-2xl bg-white border border-rose-200 space-y-2 shadow-xs">
              <h5 className="text-xs font-bold text-[#2D1E2F] uppercase font-mono tracking-wider">
                Các bước thực hiện (Instructions)
              </h5>
              <p className="text-xs text-[#5E4761] font-light leading-relaxed whitespace-pre-line">
                {meal.instructions}
              </p>
            </div>
          </div>
        ) : (
          <div className="py-16 text-center space-y-3">
            <p className="text-[#715A75]">Không tải được công thức. Hãy thử lại nhé!</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-rose-200 flex items-center justify-between gap-3">
          <button
            onClick={fetchRecipe}
            disabled={loading}
            className="py-2.5 px-4 rounded-full cream-glass-pill hover:bg-rose-50 text-[#2D1E2F] text-xs font-semibold active:scale-95 transition-all flex items-center gap-1.5 border border-rose-300 cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Đổi món khác 🔄</span>
          </button>

          {meal?.youtubeUrl && (
            <a
              href={meal.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center gap-1.5 border border-white/40 cursor-pointer"
            >
              <span>Xem Video Hướng Dẫn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
