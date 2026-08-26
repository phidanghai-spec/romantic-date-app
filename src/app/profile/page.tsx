'use client';

import React, { useState } from 'react';
import { 
  Flame, 
  Utensils, 
  Wallet, 
  Sparkles, 
  Check, 
  Save, 
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

const ALL_CUISINES = [
  'Lẩu Haidilao',
  'BBQ Nướng Hàn Quốc',
  'Ramen',
  'Sushi & Sashimi',
  'Trà Sữa Oolong',
  'Bánh Tráng Trộn',
  'Fine Dining Âu',
  'Steak Bò Wagyu',
  'Ốc Sài Gòn',
  'Lẩu Thái Chua Cay',
  'Pasta Ý',
  'Cocktail & Tapas',
  'Bingsu Xoài',
  'Bia Thủ Công',
];

const ALL_VIBES = [
  'Lãng mạn & Ấm cúng',
  'Chill & Nhạc Acoustic',
  'Quán ngắm hoàng hôn',
  'Yên tĩnh & Tinh tế',
  'Rooftop Bar View Đẹp',
  'Năng động & Nhộn nhịp',
  'Street Food & Vỉa hè',
  'Quán Cafe Sân Vườn',
];

export default function ProfilePage() {
  const { currentUser, updateTasteProfile, updateCurrentUserProfile } = useAppStore();

  const [fullName, setFullName] = useState(currentUser.fullName);
  const [bio, setBio] = useState(currentUser.bio);
  const [spiciness, setSpiciness] = useState(currentUser.tasteProfile.spiciness);
  const [sweetness, setSweetness] = useState(currentUser.tasteProfile.sweetness);
  const [budget, setBudget] = useState(currentUser.tasteProfile.budget);
  const [favoriteCuisines, setFavoriteCuisines] = useState<string[]>(
    currentUser.tasteProfile.favoriteCuisines
  );
  const [vibePreferences, setVibePreferences] = useState<string[]>(
    currentUser.tasteProfile.vibePreferences
  );
  const [newCuisine, setNewCuisine] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const toggleCuisine = (c: string) => {
    if (favoriteCuisines.includes(c)) {
      setFavoriteCuisines(favoriteCuisines.filter((item) => item !== c));
    } else {
      setFavoriteCuisines([...favoriteCuisines, c]);
    }
  };

  const addCustomCuisine = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCuisine.trim() && !favoriteCuisines.includes(newCuisine.trim())) {
      setFavoriteCuisines([...favoriteCuisines, newCuisine.trim()]);
      setNewCuisine('');
    }
  };

  const toggleVibe = (v: string) => {
    if (vibePreferences.includes(v)) {
      setVibePreferences(vibePreferences.filter((item) => item !== v));
    } else {
      setVibePreferences([...vibePreferences, v]);
    }
  };

  const handleSave = () => {
    updateCurrentUserProfile({ fullName, bio });
    updateTasteProfile({
      spiciness,
      sweetness,
      budget,
      favoriteCuisines,
      vibePreferences,
    });

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const spiceLabels = ['', 'Không cay 👶', 'The the nhẹ 🌶️', 'Cay vừa phải 🌶️🌶️', 'Ghiền ăn cay 🌶️🌶️🌶️', 'Cực kỳ cay 🌶️🌶️🌶️🌶️🌶️'];
  const sweetLabels = ['', 'Không đường 🍃', 'Ít ngọt 🍵', 'Ngọt vừa 🍰', 'Thích ngọt 🍩', 'Hảo ngọt vô cực 🍫'];
  const budgetLabels = ['', '$ (Bình dân / Vỉa hè)', '$$ (Quán ngon & Chuỗi phổ biến)', '$$$ (Nhà hàng sang & Rooftop)', '$$$$ (Fine Dining cao cấp)'];

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden pb-24 md:pb-8">
      <main className="relative z-10 flex-1 max-w-xl w-full mx-auto px-4 py-4 sm:py-6 space-y-5">
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-italic text-3xl sm:text-4xl text-[#2D1E2F]">
              Taste Profile & Tuning 🍷
            </h2>
            <p className="text-xs text-[#6B5B6E] font-light">
              Điều chỉnh khẩu vị để thuật toán Taste Match tìm người đồng điệu chuẩn xác nhất
            </p>
          </div>

          <button
            onClick={handleSave}
            className="py-2.5 px-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-lg shadow-rose-500/30 active:scale-95 transition-all flex items-center gap-1.5 border border-white/20"
          >
            {savedNotice ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{savedNotice ? 'Đã lưu!' : 'Lưu cài đặt'}</span>
          </button>
        </div>

        {/* Basic Profile Card */}
        <div className="p-5 cream-glass-card rounded-3xl border border-rose-200/60 shadow-xl space-y-3">
          <div className="flex items-center gap-3.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.fullName}
              className="w-14 h-14 rounded-full object-cover border-2 border-white/30 shadow-md ring-1 ring-rose-500/40"
            />
            <div className="flex-1">
              <label className="text-[10px] font-mono tracking-widest text-[#886A8B] uppercase">Tên hiển thị</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-1.5 rounded-xl bg-white border border-rose-200 text-sm font-bold text-[#2D1E2F] focus:outline-rose-400"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono tracking-widest text-[#886A8B] uppercase">Tiểu sử (Bio ngắn)</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={2}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-xs text-[#2D1E2F] focus:outline-rose-400 placeholder:text-[#A08DA3]"
            />
          </div>
        </div>

        {/* Quantitative Taste Sliders */}
        <div className="p-5 sm:p-6 cream-glass-card rounded-3xl border border-rose-200/60 shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-rose-200 pb-2.5">
            <SlidersHorizontal className="w-4 h-4 text-rose-400" />
            <h3 className="font-serif-italic text-2xl text-[#2D1E2F]">Thang Đo Khẩu Vị (Taste Sliders)</h3>
          </div>

          {/* Spiciness Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-[#5E4761] font-medium flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-400" /> Cấp độ ăn cay:
              </span>
              <span className="font-bold text-rose-600">{spiceLabels[spiciness]}</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={spiciness}
              onChange={(e) => setSpiciness(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          {/* Sweetness Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-[#5E4761] font-medium flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-pink-400" /> Mức độ hảo ngọt:
              </span>
              <span className="font-bold text-pink-600">{sweetLabels[sweetness]}</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={sweetness}
              onChange={(e) => setSweetness(Number(e.target.value))}
              className="w-full accent-pink-500 cursor-pointer"
            />
          </div>

          {/* Budget Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-[#5E4761] font-medium flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5 text-amber-400" /> Phân khúc chi tiêu mỗi bữa hẹn:
              </span>
              <span className="font-bold text-amber-700">{budgetLabels[budget]}</span>
            </div>
            <input
              type="range"
              min={1}
              max={4}
              step={1}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Favorite Cuisines Multi-Select */}
        <div className="p-5 sm:p-6 cream-glass-card rounded-3xl border border-rose-200/60 shadow-xl space-y-3.5">
          <div className="flex items-center justify-between border-b border-rose-200 pb-2.5">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-rose-400" />
              <h3 className="font-serif-italic text-2xl text-[#2D1E2F]">Món Ăn Yêu Thích &amp; Quán Ruột</h3>
            </div>
            <span className="text-[10px] font-mono text-rose-600">
              Đã chọn {favoriteCuisines.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {ALL_CUISINES.map((cuisine) => {
              const isSelected = favoriteCuisines.includes(cuisine);
              return (
                <button
                  key={cuisine}
                  onClick={() => toggleCuisine(cuisine)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-rose-500 text-white shadow-md border border-white/30 font-bold'
                      : 'cream-glass-pill hover:bg-white text-[#5E4761] border border-rose-200/60'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '}
                  {cuisine}
                </button>
              );
            })}
          </div>

          {/* Add Custom Cuisine */}
          <form onSubmit={addCustomCuisine} className="flex gap-2 pt-2">
            <input
              type="text"
              value={newCuisine}
              onChange={(e) => setNewCuisine(e.target.value)}
              placeholder="Thêm món khoái khẩu khác..."
              className="flex-1 px-3.5 py-1.5 rounded-xl bg-white border border-rose-200 text-xs text-[#2D1E2F] focus:outline-rose-400 placeholder:text-[#A08DA3]"
            />
            <button
              type="submit"
              disabled={!newCuisine.trim()}
              className="px-4 py-1.5 rounded-xl cream-glass-pill hover:bg-white text-rose-600 text-xs font-bold disabled:opacity-30 border border-rose-200"
            >
              Thêm
            </button>
          </form>
        </div>

        {/* Vibe Preferences */}
        <div className="p-5 sm:p-6 cream-glass-card rounded-3xl border border-rose-200/60 shadow-xl space-y-3.5">
          <div className="flex items-center gap-2 border-b border-rose-200 pb-2.5">
            <Compass className="w-4 h-4 text-purple-400" />
            <h3 className="font-serif-italic text-2xl text-[#2D1E2F]">Không Gian &amp; Năng Lượng Buổi Hẹn</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {ALL_VIBES.map((vibe) => {
              const isSelected = vibePreferences.includes(vibe);
              return (
                <button
                  key={vibe}
                  onClick={() => toggleVibe(vibe)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-md border border-white/30 font-bold'
                      : 'cream-glass-pill hover:bg-white text-[#5E4761] border border-rose-200/60'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '}
                  {vibe}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Save Action */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-sm shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-98 transition-all flex items-center justify-center gap-2 border border-white/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Cập nhật Gu Ẩm Thực &amp; Tìm Bạn Mới</span>
          </button>
        </div>
      </main>
    </div>
  );
}
