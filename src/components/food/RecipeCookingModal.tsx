'use client';

import React, { useState } from 'react';
import { X, ChefHat, RotateCw, ExternalLink, CheckSquare, Square, Utensils, Video } from 'lucide-react';
import { COOKING_RECIPES_DATABASE, DetailedCookingRecipe } from '@/data/cookingRecipes';

interface RecipeCookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeCookingModal: React.FC<RecipeCookingModalProps> = ({ isOpen, onClose }) => {
  const [recipeIndex, setRecipeIndex] = useState<number>(0);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [showVideo, setShowVideo] = useState<boolean>(true);

  if (!isOpen) return null;

  const currentRecipe: DetailedCookingRecipe =
    COOKING_RECIPES_DATABASE[recipeIndex % COOKING_RECIPES_DATABASE.length];

  const handleNextRecipe = () => {
    setCheckedIngredients({});
    setRecipeIndex((prev) => (prev + 1) % COOKING_RECIPES_DATABASE.length);
  };

  const toggleCheck = (idx: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[88vh] bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-rose-300 text-[#2D1E2F] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-rose-200 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-amber-500" />
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-700 font-bold">
                Couple Home Cooking Date
              </span>
              <h3 className="font-serif-italic text-2xl text-[#2D1E2F] font-bold">
                Công Thức Nấu Ăn Cho 2 Người 🍳
              </h3>
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
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-4">
          {/* Meal Cover Image & Quick Info */}
          <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-rose-200 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentRecipe.thumbnail}
              alt={currentRecipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/90 text-amber-950 text-[10px] font-mono font-bold">
                {currentRecipe.tag} • {currentRecipe.cookTime}
              </span>
              <h4 className="font-serif-italic text-2xl sm:text-3xl text-white drop-shadow-md mt-1 font-bold">
                {currentRecipe.emoji} {currentRecipe.title}
              </h4>
            </div>
          </div>

          {/* YouTube Embedded Video */}
          {currentRecipe.youtubeId && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-rose-800">
                <span className="flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-red-600" />
                  Video Hướng Dẫn YouTube:
                </span>
                <button
                  type="button"
                  onClick={() => setShowVideo(!showVideo)}
                  className="text-[10px] text-[#886A8B] hover:text-rose-600 underline cursor-pointer"
                >
                  {showVideo ? 'Ẩn video' : 'Xem video'}
                </button>
              </div>

              {showVideo && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-rose-200 shadow-sm bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentRecipe.youtubeId}?autoplay=0&rel=0`}
                    title={currentRecipe.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              )}
            </div>
          )}

          {/* Ingredients Checklist */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-rose-800 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-rose-600" /> Nguyên liệu cần chuẩn bị ({currentRecipe.ingredients.length})
              </span>
              <span className="text-[10px] text-[#715A75]">Bấm để đánh dấu khi đi chợ</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {currentRecipe.ingredients.map((item, idx) => {
                const isChecked = Boolean(checkedIngredients[idx]);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 select-none ${
                      isChecked
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-800 line-through opacity-75'
                        : 'bg-white border-rose-200/70 text-[#2D1E2F] hover:bg-rose-100/50 shadow-2xs'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-rose-300 shrink-0" />
                    )}
                    <span className="truncate">
                      <strong>{item.name}</strong> ({item.amount})
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions */}
          <div className="p-4 rounded-2xl bg-white border border-rose-200 space-y-2.5 shadow-xs">
            <h5 className="text-xs font-bold text-[#2D1E2F] uppercase font-mono tracking-wider">
              Các bước chế biến (Step-by-Step)
            </h5>
            <div className="space-y-2">
              {currentRecipe.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#5E4761]">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-rose-200 flex items-center justify-between gap-3">
          <button
            onClick={handleNextRecipe}
            className="py-2.5 px-4 rounded-full cream-glass-pill hover:bg-rose-50 text-[#2D1E2F] text-xs font-semibold active:scale-95 transition-all flex items-center gap-1.5 border border-rose-300 cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Đổi món khác ({recipeIndex + 1}/{COOKING_RECIPES_DATABASE.length})</span>
          </button>

          {currentRecipe.youtubeUrl && (
            <a
              href={currentRecipe.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center gap-1.5 border border-white/40 cursor-pointer"
            >
              <span>Mở YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCookingModal;
