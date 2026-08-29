'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  RotateCw,
  ExternalLink,
  CheckSquare,
  Square,
  Clock,
  Users,
  Sparkles,
  Heart,
  Video,
} from 'lucide-react';
import {
  COOKING_RECIPES_DATABASE,
  DetailedCookingRecipe,
  CookingCountry,
} from '@/data/cookingRecipes';

const COUNTRIES_LIST: { id: CookingCountry; label: string; flag: string }[] = [
  { id: 'vietnam', label: 'Việt Nam', flag: '🇻🇳' },
  { id: 'korea', label: 'Hàn Quốc', flag: '🇰🇷' },
  { id: 'japan', label: 'Nhật Bản', flag: '🇯🇵' },
  { id: 'italy', label: 'Âu - Ý', flag: '🇮🇹' },
  { id: 'dessert', label: 'Tráng Miệng', flag: '🍰' },
];

interface CookingRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry?: CookingCountry;
  initialRecipeTitle?: string;
}

export const CookingRecipeModal: React.FC<CookingRecipeModalProps> = ({
  isOpen,
  onClose,
  selectedCountry = 'vietnam',
  initialRecipeTitle,
}) => {
  const [currentCountryId, setCurrentCountryId] = useState<CookingCountry>(selectedCountry);
  const [recipeIndex, setRecipeIndex] = useState<number>(0);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [showEmbedVideo, setShowEmbedVideo] = useState<boolean>(true);

  // Sync state when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentCountryId(selectedCountry);
      setCheckedIngredients({});
      setShowEmbedVideo(true);

      const filtered = COOKING_RECIPES_DATABASE.filter((r) => r.country === selectedCountry);
      if (initialRecipeTitle && filtered.length > 0) {
        const foundIdx = filtered.findIndex(
          (r) =>
            r.title.toLowerCase().includes(initialRecipeTitle.toLowerCase()) ||
            initialRecipeTitle.toLowerCase().includes(r.title.toLowerCase())
        );
        setRecipeIndex(foundIdx >= 0 ? foundIdx : 0);
      } else {
        setRecipeIndex(0);
      }
    }
  }, [isOpen, selectedCountry, initialRecipeTitle]);

  if (!isOpen) return null;

  // Filter recipes by current country
  const countryRecipes = COOKING_RECIPES_DATABASE.filter((r) => r.country === currentCountryId);
  const activeRecipes = countryRecipes.length > 0 ? countryRecipes : COOKING_RECIPES_DATABASE;
  const currentRecipe: DetailedCookingRecipe =
    activeRecipes[recipeIndex % activeRecipes.length] || activeRecipes[0];

  const handleNextRecipe = () => {
    setCheckedIngredients({});
    setRecipeIndex((prev) => (prev + 1) % activeRecipes.length);
  };

  const handleCountryTabChange = (countryId: CookingCountry) => {
    setCurrentCountryId(countryId);
    setRecipeIndex(0);
    setCheckedIngredients({});
  };

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const activeCountryMeta =
    COUNTRIES_LIST.find((c) => c.id === currentCountryId) || COUNTRIES_LIST[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn">
      {/* Container Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#FFFDF9] rounded-[2.5rem] border-2 border-rose-300 shadow-2xl shadow-rose-950/20 text-[#2D1E2F] flex flex-col overflow-hidden">
        {/* ── Header Modal ── */}
        <div className="px-6 py-4 border-b border-rose-200/80 bg-gradient-to-r from-rose-50/90 via-pink-50/80 to-amber-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 text-white flex items-center justify-center text-2xl shadow-md shadow-rose-500/25">
              🍳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-rose-600 font-bold bg-white px-2 py-0.5 rounded-full border border-rose-200 shadow-2xs">
                  Couple Cooking Mode
                </span>
                <span className="text-xs font-semibold text-[#886A8B]">
                  • {activeCountryMeta.flag} Ẩm thực {activeCountryMeta.label}
                </span>
              </div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#4A1D2F]">
                Công Thức Nấu Ăn Tại Nhà 🍷
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/90 border border-rose-200 text-[#4A1D2F] hover:bg-rose-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── 5 Country Tabs Switcher ── */}
        <div className="flex border-b border-rose-100 px-4 pt-2 bg-rose-50/40 gap-1.5 overflow-x-auto custom-scrollbar">
          {COUNTRIES_LIST.map((country) => {
            const isActive = currentCountryId === country.id;
            return (
              <button
                key={country.id}
                onClick={() => handleCountryTabChange(country.id)}
                className={`px-3.5 py-2 text-xs font-bold rounded-t-2xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#FFFDF9] text-[#831843] border-t-2 border-x-2 border-rose-300 shadow-xs'
                    : 'text-[#6B5B6E] hover:text-[#2D1E2F] hover:bg-white/60'
                }`}
              >
                <span>{country.flag}</span>
                <span>{country.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Recipe Body Scrollable ── */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 custom-scrollbar">
          {/* Card Tiêu Đề Món Ăn & Badges */}
          <div className="space-y-3 p-5 rounded-3xl bg-gradient-to-r from-rose-50/70 via-pink-50/50 to-amber-50/60 border border-rose-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-white text-[#831843] text-xs font-bold font-mono border border-rose-200 shadow-2xs">
                {currentRecipe.tag}
              </span>

              {/* Badges: Thời gian, khẩu phần, độ khó */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#6B5B6E]">
                <span className="inline-flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-full border border-rose-100">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  {currentRecipe.cookTime}
                </span>
                <span className="inline-flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-full border border-rose-100">
                  <Users className="w-3.5 h-3.5 text-rose-500" />
                  {currentRecipe.servings}
                </span>
                <span className="inline-flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-full border border-rose-100">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  {currentRecipe.difficulty}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">{currentRecipe.emoji}</span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#4A1D2F]">
                {currentRecipe.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#6B5B6E] leading-relaxed font-light">
              {currentRecipe.description}
            </p>
          </div>

          {/* ── YouTube Video Embed Section ── */}
          {currentRecipe.youtubeId && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-700 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-red-600" />
                  Video Hướng Dẫn Nấu Chi Tiết (YouTube)
                </span>
                <button
                  type="button"
                  onClick={() => setShowEmbedVideo(!showEmbedVideo)}
                  className="text-[11px] text-[#886A8B] hover:text-rose-600 cursor-pointer underline"
                >
                  {showEmbedVideo ? 'Thu nhỏ video' : 'Hiện video'}
                </button>
              </div>

              {showEmbedVideo && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-rose-200 shadow-md bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentRecipe.youtubeId}?autoplay=0&rel=0`}
                    title={currentRecipe.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              )}
            </div>
          )}

          {/* Khung Nguyên Liệu Đi Chợ (Interactive Checkboxes) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-lg text-[#4A1D2F] flex items-center gap-2">
                <span>🛒 Danh Sách Nguyên Liệu Cần Mua ({currentRecipe.ingredients.length})</span>
              </h4>
              <span className="text-[11px] text-[#886A8B] font-mono">
                Tích chọn khi đi siêu thị
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentRecipe.ingredients.map((ing, idx) => {
                const isChecked = !!checkedIngredients[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleIngredient(idx)}
                    className={`p-3 rounded-2xl border text-left flex items-start justify-between gap-2 transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-rose-100/60 border-rose-300 text-[#4A1D2F] line-through opacity-70'
                        : 'bg-white border-rose-200/90 text-[#2D1E2F] hover:bg-rose-50/60 shadow-2xs'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold">{ing.name}</div>
                      <div className="text-[11px] text-rose-600 font-medium">
                        {ing.amount}
                      </div>
                    </div>
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Khung Hướng Dẫn Cách Nấu Từng Bước */}
          <div className="space-y-3.5">
            <h4 className="font-serif font-bold text-lg text-[#4A1D2F] flex items-center gap-2">
              <span>👨‍🍳 Cách Chế Biến Từng Bước (Step-by-Step)</span>
            </h4>

            <div className="space-y-3">
              {currentRecipe.steps.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="p-4 rounded-2xl bg-white border border-rose-200/80 shadow-2xs flex items-start gap-3.5"
                >
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {sIdx + 1}
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#2D1E2F] leading-relaxed font-normal">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mẹo Nhỏ Cho Cặp Đôi (Couple Tip) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 flex items-start gap-3">
            <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-0.5 fill-rose-500/30" />
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#831843]">
                Mẹo Nhỏ Để Buổi Nấu Ăn Đôi Thêm Ngọt Ngào 💕
              </span>
              <p className="text-xs text-[#6B5B6E] leading-relaxed italic">
                {currentRecipe.coupleTip}
              </p>
            </div>
          </div>
        </div>

        {/* ── Footer Actions ── */}
        <div className="px-6 py-4 border-t border-rose-200/80 bg-rose-50/50 flex flex-wrap items-center justify-between gap-2.5">
          {/* Nút Đổi Món Khác */}
          {activeRecipes.length > 1 && (
            <button
              onClick={handleNextRecipe}
              className="px-4 py-2.5 rounded-full bg-white border border-rose-300 text-[#831843] text-xs font-bold hover:bg-rose-100 flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Đổi món khác ({recipeIndex + 1}/{activeRecipes.length})</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            {/* Nút Mở Video YouTube Tiếng Việt */}
            <a
              href={currentRecipe.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Mở trên YouTube</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-white border border-rose-200 text-xs font-semibold text-[#4A1D2F] hover:bg-rose-50 transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingRecipeModal;
