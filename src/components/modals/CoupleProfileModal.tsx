'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  Calendar,
  Sparkles,
  Flame,
  Utensils,
  Plus,
  Trash2,
  Check,
  Save,
  MapPin,
  Clock,
  Compass,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useCoupleStore, calculateDatingDays } from '@/lib/coupleStore';
import { CountryCuisine, FoodItem } from '@/types/couple';

const ALLERGIES_LIST = [
  'Hải sản / Tôm cua 🦐',
  'Đậu phộng / Lạc 🥜',
  'Đồ sống / Sashimi 🐟',
  'Sữa bò / Lactose 🥛',
  'Gluten / Bột mì 🌾',
  'Trứng gà 🥚',
  'Mắm tôm / Mắm nêm 🥢',
  'Thịt bò 🥩',
  'Ớt chuông 🫑',
];

const HOBBIES_LIST = [
  'Xem phim rạp Sweetbox 🎬',
  'Cafe ngắm hoàng hôn ☕',
  'Workshop làm gốm DIY 🎨',
  'Dạo phố đêm & Ăn vặt 🌙',
  'Chơi Boardgame cùng nhau 🎲',
  'Nấu ăn tại nhà ấm cúng 🍳',
  'Camping & Picnic cuối tuần ⛺',
  'Chụp ảnh Film / Photobooth 📸',
  'Bắn cung giải trí 🏹',
  'Nghe nhạc Acoustic / Jazz 🎷',
];

interface CoupleProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CoupleProfileModal: React.FC<CoupleProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    profile,
    updateProfile,
    updateTastePreferences,
    addCustomFoodItem,
    removeCustomFoodItem,
  } = useCoupleStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'taste' | 'custom_food'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form local state synced with SSOT
  const [yourName, setYourName] = useState(profile.yourName);
  const [partnerName, setPartnerName] = useState(profile.partnerName);
  const [anniversaryDate, setAnniversaryDate] = useState(profile.anniversaryDate);
  const [nextDateDate, setNextDateDate] = useState(profile.nextDateDate);
  const [nextDateTime, setNextDateTime] = useState(profile.nextDateTime);
  const [nextDateLocation, setNextDateLocation] = useState(profile.nextDateLocation);
  const [bio, setBio] = useState(profile.bio || '');

  // Custom food form
  const [customName, setCustomName] = useState('');
  const [customEmoji, setCustomEmoji] = useState('🍲');
  const [customCountry, setCustomCountry] = useState<CountryCuisine>('vietnam');
  const [customTag, setCustomTag] = useState('');
  const [customDesc, setCustomDesc] = useState('');

  // Sync state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setYourName(profile.yourName);
      setPartnerName(profile.partnerName);
      setAnniversaryDate(profile.anniversaryDate);
      setNextDateDate(profile.nextDateDate);
      setNextDateTime(profile.nextDateTime);
      setNextDateLocation(profile.nextDateLocation);
      setBio(profile.bio || '');
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  // Realtime calculated preview days
  const dynamicPreviewDays = calculateDatingDays(anniversaryDate);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      yourName: yourName.trim() || profile.yourName,
      partnerName: partnerName.trim() || profile.partnerName,
      anniversaryDate,
      nextDateDate,
      nextDateTime,
      nextDateLocation,
      bio,
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1000);
  };

  const handleAddCustomFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newItem: FoodItem = {
      id: `custom_${Date.now()}`,
      name: customName.trim(),
      emoji: customEmoji || '🍽️',
      country: customCountry,
      tag: customTag.trim() || 'Món Tự Thêm 💖',
      desc: customDesc.trim() || 'Món ăn ruột do hai bạn tự thêm vào vòng quay.',
      isCustom: true,
    };

    addCustomFoodItem(newItem);

    setCustomName('');
    setCustomTag('');
    setCustomDesc('');
  };

  const toggleAllergy = (item: string) => {
    const current = profile.tastePreferences.allergies || [];
    const updated = current.includes(item)
      ? current.filter((a) => a !== item)
      : [...current, item];
    updateTastePreferences({ allergies: updated });
  };

  const toggleHobby = (hobby: string) => {
    const current = profile.tastePreferences.entertainmentHobbies || [];
    const updated = current.includes(hobby)
      ? current.filter((h) => h !== hobby)
      : [...current, hobby];
    updateTastePreferences({ entertainmentHobbies: updated });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#FFFDF9] rounded-[2.5rem] border-2 border-rose-300 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-rose-100/90 via-pink-100/80 to-amber-100/80 border-b border-rose-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 fill-white animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif italic text-xl sm:text-2xl font-bold text-[#2D1E2F]">
                Hồ Sơ &amp; Ngày Kỷ Niệm Cặp Đôi 🌸
              </h3>
              <span className="text-[11px] text-[#715A75] font-light">
                {yourName} &amp; {partnerName} •{' '}
                <strong className="text-rose-600 font-bold">{dynamicPreviewDays} Ngày Bên Nhau 💕</strong>
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#715A75] hover:text-[#2D1E2F] flex items-center justify-center border border-rose-200 transition-colors cursor-pointer shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 pt-3 border-b border-rose-200/70 gap-2 bg-[#FAF6EE]/50">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-rose-500 text-rose-700'
                : 'border-transparent text-[#715A75] hover:text-[#2D1E2F]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Ngày Yêu &amp; Lịch Hẹn</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('taste')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'taste'
                ? 'border-rose-500 text-rose-700'
                : 'border-transparent text-[#715A75] hover:text-[#2D1E2F]'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Khẩu Vị &amp; Sở Thích</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('custom_food')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'custom_food'
                ? 'border-rose-500 text-rose-700'
                : 'border-transparent text-[#715A75] hover:text-[#2D1E2F]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Món Tự Thêm ({profile.tastePreferences.customFoodItems?.length || 0})</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-xs">
          {/* TAB 1: PROFILE & ANNIVERSARY */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[#5E4761] block mb-1 font-bold flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-rose-500" /> Tên của bạn:
                  </label>
                  <input
                    type="text"
                    required
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-2xl bg-white border border-rose-200 text-xs font-semibold text-[#2D1E2F] focus:outline-rose-400 shadow-inner"
                  />
                </div>

                <div>
                  <label className="text-[#5E4761] block mb-1 font-bold flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Tên người thương:
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-2xl bg-white border border-rose-200 text-xs font-semibold text-[#2D1E2F] focus:outline-rose-400 shadow-inner"
                  />
                </div>
              </div>

              {/* Anniversary Date Box */}
              <div className="p-4 rounded-3xl bg-rose-50/70 border border-rose-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[#5E4761] font-bold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-rose-600" /> Ngày kỷ niệm bắt đầu yêu nhau:
                  </label>
                  <span className="font-bold text-rose-600 font-mono">
                    {dynamicPreviewDays} ngày yêu 💕
                  </span>
                </div>
                <input
                  type="date"
                  required
                  value={anniversaryDate}
                  onChange={(e) => setAnniversaryDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl bg-white border border-rose-200 text-xs font-semibold text-[#2D1E2F] focus:outline-rose-400"
                />
              </div>

              {/* Next Date Schedule Box */}
              <div className="p-4 rounded-3xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                <span className="text-[11px] font-bold text-amber-900 block flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> Kế hoạch buổi hẹn tiếp theo:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[#5E4761] block mb-0.5 text-[10px] font-semibold">Ngày hẹn:</label>
                    <input
                      type="date"
                      value={nextDateDate}
                      onChange={(e) => setNextDateDate(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-xs font-semibold text-[#2D1E2F]"
                    />
                  </div>
                  <div>
                    <label className="text-[#5E4761] block mb-0.5 text-[10px] font-semibold">Giờ hẹn:</label>
                    <input
                      type="time"
                      value={nextDateTime}
                      onChange={(e) => setNextDateTime(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-xs font-semibold text-[#2D1E2F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#5E4761] block mb-0.5 text-[10px] font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-600" /> Địa điểm hẹn hò yêu thích:
                  </label>
                  <input
                    type="text"
                    value={nextDateLocation}
                    onChange={(e) => setNextDateLocation(e.target.value)}
                    placeholder="VD: Haidilao Landmark 81..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-200 text-xs font-semibold text-[#2D1E2F]"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="text-[#5E4761] block mb-1 font-bold">Lời nhắn gửi ngọt ngào (Bio):</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Cùng nhau ăn khắp thế gian..."
                  className="w-full px-3.5 py-2 rounded-2xl bg-white border border-rose-200 text-xs text-[#2D1E2F] focus:outline-rose-400"
                />
              </div>

              {/* Save CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-xs shadow-xl shadow-rose-500/20 hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/40"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>Đã lưu thành công! ✨</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Lưu Thay Đổi Hồ Sơ 💾</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: TASTE & ALLERGIES */}
          {activeTab === 'taste' && (
            <div className="space-y-5">
              {/* Spiciness Level Slider */}
              <div className="p-4 rounded-3xl bg-rose-50/60 border border-rose-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#5E4761] flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-orange-500" /> Mức độ ăn cay:
                  </span>
                  <span className="font-bold text-rose-600 font-mono">
                    Cấp {profile.tastePreferences.spiciness} / 5 🌶️
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={profile.tastePreferences.spiciness}
                  onChange={(e) => updateTastePreferences({ spiciness: Number(e.target.value) })}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#886A8B]">
                  <span>0 (Không cay)</span>
                  <span>2 (Vừa miệng)</span>
                  <span>5 (Siêu cay 🌶️)</span>
                </div>
              </div>

              {/* Allergies / Dislikes */}
              <div className="space-y-2">
                <span className="font-bold text-[#5E4761] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-red-500" /> Dị ứng hoặc không ăn được:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ALLERGIES_LIST.map((item) => {
                    const isSelected = profile.tastePreferences.allergies?.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleAllergy(item)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-red-500 text-white border-red-500 shadow-xs'
                            : 'bg-white text-[#5E4761] border-rose-200 hover:bg-rose-50'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dating Hobbies */}
              <div className="space-y-2">
                <span className="font-bold text-[#5E4761] flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-blue-500" /> Sở thích hẹn hò chung:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {HOBBIES_LIST.map((hobby) => {
                    const isSelected = profile.tastePreferences.entertainmentHobbies?.includes(hobby);
                    return (
                      <button
                        key={hobby}
                        type="button"
                        onClick={() => toggleHobby(hobby)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-blue-500 text-white border-blue-500 shadow-xs'
                            : 'bg-white text-[#5E4761] border-rose-200 hover:bg-rose-50'
                        }`}
                      >
                        {hobby}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOM FOOD ITEMS */}
          {activeTab === 'custom_food' && (
            <div className="space-y-5">
              <form onSubmit={handleAddCustomFood} className="p-4 rounded-3xl bg-rose-50/80 border border-rose-200 space-y-3">
                <span className="font-bold text-[#5E4761] block flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Thêm món ăn ruột vào vòng quay Roulette:
                </span>

                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-3">
                    <input
                      type="text"
                      required
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Tên món (VD: Bánh mì chảo Cột Điện)..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-xs font-semibold text-[#2D1E2F]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={customEmoji}
                      onChange={(e) => setCustomEmoji(e.target.value)}
                      placeholder="Emoji 🍲"
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-xs text-center font-bold text-[#2D1E2F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={customCountry}
                    onChange={(e) => setCustomCountry(e.target.value as CountryCuisine)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-rose-200 text-xs font-semibold text-[#2D1E2F]"
                  >
                    <option value="vietnam">🇻🇳 Món Việt Nam</option>
                    <option value="korea">🇰🇷 Món Hàn Quốc</option>
                    <option value="japan">🇯🇵 Món Nhật Bản</option>
                    <option value="italy">🇮🇹 Món Âu - Ý</option>
                    <option value="dessert">🍰 Tráng Miệng &amp; Cafe</option>
                  </select>

                  <input
                    type="text"
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    placeholder="Tag (VD: Món Ruột 💖)"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-xs text-[#2D1E2F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Vào Danh Sách Roulette</span>
                </button>
              </form>

              {/* List of Custom Foods */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#886A8B] uppercase tracking-wider block font-bold">
                  Danh sách món ăn tự tạo ({profile.tastePreferences.customFoodItems?.length || 0}):
                </span>

                {(!profile.tastePreferences.customFoodItems || profile.tastePreferences.customFoodItems.length === 0) ? (
                  <p className="text-xs text-[#886A8B] italic py-2">
                    Chưa có món ăn tự thêm nào. Hãy thêm những quán quen của hai bạn vào nhé!
                  </p>
                ) : (
                  <div className="space-y-2">
                    {profile.tastePreferences.customFoodItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-white border border-rose-200/80 flex items-center justify-between shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{item.emoji}</span>
                          <div>
                            <span className="font-bold text-[#2D1E2F] block text-xs">{item.name}</span>
                            <span className="text-[10px] text-rose-600 font-medium">{item.tag}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeCustomFoodItem(item.id)}
                          className="p-1.5 rounded-full hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                          title="Xóa món này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoupleProfileModal;
