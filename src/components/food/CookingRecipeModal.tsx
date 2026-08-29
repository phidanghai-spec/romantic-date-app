'use client';

import React, { useState } from 'react';
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

interface ModalContentProps {
  onClose: () => void;
  selectedCountry: CookingCountry;
  initialRecipeTitle?: string;
}

const CookingRecipeModalContent: React.FC<ModalContentProps> = ({
  onClose,
  selectedCountry,
  initialRecipeTitle,
}) => {
  const [currentCountryId, setCurrentCountryId] = useState<CookingCountry>(selectedCountry);
  const [recipeIndex, setRecipeIndex] = useState<number>(() => {
    const filtered = COOKING_RECIPES_DATABASE.filter((r) => r.country === selectedCountry);
    if (initialRecipeTitle && filtered.length > 0) {
      const foundIdx = filtered.findIndex(
        (r) =>
          r.title.toLowerCase().includes(initialRecipeTitle.toLowerCase()) ||
          initialRecipeTitle.toLowerCase().includes(r.title.toLowerCase())
      );
      return foundIdx >= 0 ? foundIdx : 0;
    }
    return 0;
  });
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const showEmbedVideo = true;

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

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 custom-scrollbar text-xs">
          {/* Dish Header Info Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-rose-50/70 via-pink-50/50 to-amber-50/70 border border-rose-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{currentRecipe.emoji}</span>
                <div>
                  <h3 className="font-serif font-bold text-2xl text-[#4A1D2F] leading-tight">
                    {currentRecipe.title}
                  </h3>
                  <span className="text-[11px] font-mono text-rose-600 font-semibold">
                    Độ khó: {currentRecipe.difficulty} • Tag: {currentRecipe.tag}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#6B5B6E] font-light max-w-md pt-1">
                {currentRecipe.description}
              </p>
            </div>

            {/* Switch / Next Recipe Button */}
            <button
              onClick={handleNextRecipe}
              className="px-4 py-2 rounded-full bg-white border border-rose-200 text-[#831843] font-bold text-xs shadow-xs hover:bg-rose-50 flex items-center gap-1.5 transition-all self-end sm:self-auto cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 text-rose-500" />
              <span>Đổi món khác ({recipeIndex + 1}/{activeRecipes.length})</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center">
            <div className="p-3 rounded-2xl bg-white border border-rose-100/90 shadow-2xs">
              <Clock className="w-4 h-4 mx-auto mb-1 text-rose-500" />
              <span className="text-[10px] text-[#886A8B] block">Thời gian nấu</span>
              <strong className="text-xs text-[#2D1E2F]">{currentRecipe.cookTime}</strong>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-rose-100/90 shadow-2xs">
              <Users className="w-4 h-4 mx-auto mb-1 text-pink-500" />
              <span className="text-[10px] text-[#886A8B] block">Khẩu phần</span>
              <strong className="text-xs text-[#2D1E2F]">{currentRecipe.servings}</strong>
            </div>
          </div>

          {/* Romantic Couple Tip Alert */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-100/80 via-rose-100/60 to-amber-100/70 border border-pink-300/80 flex items-start gap-3 shadow-2xs">
            <Sparkles className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-xs text-[#4A1D2F] block">
                Mẹo gắn kết cặp đôi khi nấu món này 💕
              </span>
              <p className="text-[11px] text-[#6B5B6E] font-light mt-0.5 leading-relaxed">
                {currentRecipe.coupleTip}
              </p>
            </div>
          </div>

          {/* Ingredients Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-rose-200/60 pb-1.5">
              <span className="font-bold text-xs text-[#4A1D2F] flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                Nguyên liệu chuẩn bị ({currentRecipe.ingredients.length} mục):
              </span>
              <span className="text-[10px] text-[#886A8B] italic">
                Chạm vào để đánh dấu đã mua
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
                    className={`p-2.5 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-800 line-through opacity-75'
                        : 'bg-white border-rose-100 hover:border-rose-300 text-[#2D1E2F]'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-[#886A8B] shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs flex-1">
                      <strong>{ing.name}</strong>: {ing.amount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step by Step Cooking Instructions */}
          <div className="space-y-3">
            <div className="border-b border-rose-200/60 pb-1.5">
              <span className="font-bold text-xs text-[#4A1D2F] block">
                Các bước thực hiện chi tiết (Bước từng bước):
              </span>
            </div>

            <div className="space-y-3">
              {currentRecipe.steps.map((stepText, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-rose-100/90 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-rose-700 font-mono">
                      Bước {idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-[#4A1D2F] font-light leading-relaxed">
                    {stepText}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* YouTube Video Guide Section */}
          <div className="p-4 rounded-3xl bg-white border border-rose-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-red-500" />
                <span className="font-bold text-xs text-[#4A1D2F]">
                  Video hướng dẫn nấu món này:
                </span>
              </div>

              <a
                href={currentRecipe.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-red-600 font-bold hover:underline"
              >
                <span>Xem trên YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {showEmbedVideo && currentRecipe.youtubeId ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-inner border border-rose-100 bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${currentRecipe.youtubeId}`}
                  title={`Video hướng dẫn ${currentRecipe.title}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 text-center space-y-2">
                <p className="text-xs text-[#6B5B6E]">
                  Xem video các đầu bếp hướng dẫn từng thao tác chuẩn vị cho món{' '}
                  <strong>{currentRecipe.title}</strong>
                </p>
                <a
                  href={currentRecipe.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-600 text-white text-xs font-bold shadow-md hover:bg-red-700 transition-colors"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Mở YouTube Tìm Video Món Này 📺</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CookingRecipeModal: React.FC<CookingRecipeModalProps> = ({
  isOpen,
  onClose,
  selectedCountry = 'vietnam',
  initialRecipeTitle,
}) => {
  if (!isOpen) return null;

  return (
    <CookingRecipeModalContent
      key={`${selectedCountry}-${initialRecipeTitle || 'all'}`}
      onClose={onClose}
      selectedCountry={selectedCountry}
      initialRecipeTitle={initialRecipeTitle}
    />
  );
};

export default CookingRecipeModal;
