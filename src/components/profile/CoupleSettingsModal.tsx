'use client';

import React, { useState } from 'react';
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
  ShieldAlert,
  Compass,
} from 'lucide-react';
import { useCoupleStore } from '@/lib/coupleStore';
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

interface CoupleSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CoupleSettingsModal: React.FC<CoupleSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    profile,
    updateProfile,
    updateTastePreferences,
    addCustomFoodItem,
    removeCustomFoodItem,
    getDaysTogether,
  } = useCoupleStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'taste' | 'foods' | 'hobbies'>('profile');

  // Form states
  const [yourName, setYourName] = useState(profile.yourName);
  const [partnerName, setPartnerName] = useState(profile.partnerName);
  const [anniversaryDate, setAnniversaryDate] = useState(profile.anniversaryDate);
  const [nextDateDate, setNextDateDate] = useState(profile.nextDateDate);
  const [nextDateTime, setNextDateTime] = useState(profile.nextDateTime);
  const [nextDateLocation, setNextDateLocation] = useState(profile.nextDateLocation);
  const [bio, setBio] = useState(profile.bio || '');

  // Taste states
  const [spiciness, setSpiciness] = useState(profile.tastePreferences.spiciness);
  const [sweetness, setSweetness] = useState(profile.tastePreferences.sweetness);
  const [allergies, setAllergies] = useState<string[]>(profile.tastePreferences.allergies || []);
  const [hobbies, setHobbies] = useState<string[]>(profile.tastePreferences.entertainmentHobbies || []);

  // Custom food state
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodEmoji, setNewFoodEmoji] = useState('🍲');
  const [newFoodCountry, setNewFoodCountry] = useState<CountryCuisine>('vietnam');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const daysTogether = getDaysTogether();

  const toggleAllergy = (item: string) => {
    if (allergies.includes(item)) {
      setAllergies(allergies.filter((a) => a !== item));
    } else {
      setAllergies([...allergies, item]);
    }
  };

  const toggleHobby = (hobby: string) => {
    if (hobbies.includes(hobby)) {
      setHobbies(hobbies.filter((h) => h !== hobby));
    } else {
      setHobbies([...hobbies, hobby]);
    }
  };

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFoodName.trim()) return;

    const newItem: FoodItem = {
      id: `custom_${Date.now()}`,
      name: newFoodName.trim(),
      emoji: newFoodEmoji || '🍲',
      country: newFoodCountry,
      tag: 'Món Ruột Của Hai Bạn 💖',
      desc: 'Món ăn yêu thích tự chọn trong danh sách của cặp đôi.',
      isCustom: true,
    };

    addCustomFoodItem(newItem);
    setNewFoodName('');
    setNewFoodEmoji('🍲');
  };

  const handleSaveAll = () => {
    updateProfile({
      yourName,
      partnerName,
      anniversaryDate,
      nextDateDate,
      nextDateTime,
      nextDateLocation,
      bio,
    });

    updateTastePreferences({
      spiciness,
      sweetness,
      allergies,
      entertainmentHobbies: hobbies,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const spiceLabels = [
    '0 - Không ăn cay 👶',
    '1 - The the nhẹ 🌶️',
    '2 - Cay vừa phải 🌶️🌶️',
    '3 - Ghiền ăn cay 🌶️🌶️🌶️',
    '4 - Rất cay 🔥',
    '5 - Siêu cay vô cực 🌶️🔥',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      {/* Container Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#FFFDF9] border-2 border-rose-200/90 rounded-[2.5rem] shadow-2xl shadow-rose-950/20 overflow-hidden text-[#2D1E2F]">
        {/* Header Modal */}
        <div className="px-6 py-5 border-b border-rose-100 flex items-center justify-between bg-gradient-to-r from-rose-50/80 to-pink-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 text-white flex items-center justify-center text-xl shadow-md shadow-rose-400/30">
              💖
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#4A1D2F]">
                Hồ Sơ Cặp Đôi &amp; Khẩu Vị 🌷
              </h2>
              <p className="text-xs text-[#6B5B6E]">
                Cá nhân hóa trải nghiệm hẹn hò và ngày kỷ niệm của hai bạn
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/80 border border-rose-200 text-[#4A1D2F] hover:bg-rose-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Tabs Selector */}
        <div className="flex border-b border-rose-100 px-4 pt-2 bg-rose-50/30 gap-1 sm:gap-2 overflow-x-auto custom-scrollbar">
          {[
            { id: 'profile', label: '💖 Cặp Đôi & Ngày Yêu' },
            { id: 'taste', label: '🌶️ Khẩu Vị & Kiêng Cử' },
            { id: 'foods', label: '🍲 Món Ruột Vòng Quay' },
            { id: 'hobbies', label: '🎨 Sở Thích Hẹn Hò' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-t-2xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#FFFDF9] text-[#831843] border-t-2 border-x-2 border-rose-200/90 shadow-xs'
                  : 'text-[#6B5B6E] hover:text-[#2D1E2F] hover:bg-white/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* TAB 1: PROFILE & ANNIVERSARY */}
          {activeTab === 'profile' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Widget Đếm Ngày Yêu Nhau Thời Gian Thực */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border border-rose-200 shadow-sm flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-500">
                    Anniversary Tracker
                  </span>
                  <div className="font-serif font-bold text-2xl sm:text-3xl text-[#4A1D2F]">
                    {daysTogether} Ngày Bên Nhau 💕
                  </div>
                  <p className="text-xs text-[#6B5B6E]">
                    {yourName} &amp; {partnerName} • Bắt đầu từ ngày{' '}
                    <span className="font-semibold text-rose-600">
                      {anniversaryDate || '2023-11-20'}
                    </span>
                  </p>
                </div>
                <div className="w-14 h-14 rounded-full bg-white/90 border border-rose-200 flex items-center justify-center text-2xl shadow-xs animate-bounce">
                  💌
                </div>
              </div>

              {/* Input Tên Cặp Đôi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4A1D2F] flex items-center gap-1.5">
                    <span>Tên / Nickname của Bạn</span>
                  </label>
                  <input
                    type="text"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    placeholder="VD: Anh yêu, Hoàng..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-rose-200 text-sm font-semibold text-[#2D1E2F] focus:outline-rose-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4A1D2F] flex items-center gap-1.5">
                    <span>Tên / Nickname Người Ấy</span>
                  </label>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="VD: Bé iu, Mai Linh..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-rose-200 text-sm font-semibold text-[#2D1E2F] focus:outline-rose-400"
                  />
                </div>
              </div>

              {/* Ngày Bắt Đầu Yêu */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#4A1D2F] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-rose-500" />
                  <span>Ngày Bắt Đầu Yêu Nhau (Anniversary Date)</span>
                </label>
                <input
                  type="date"
                  value={anniversaryDate}
                  onChange={(e) => setAnniversaryDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-white border border-rose-200 text-sm font-semibold text-[#2D1E2F] focus:outline-rose-400"
                />
              </div>

              {/* Ngày Hẹn Tiếp Theo & Địa Điểm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4A1D2F] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Ngày &amp; Giờ Hẹn Kế Tiếp</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={nextDateDate}
                      onChange={(e) => setNextDateDate(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-2xl bg-white border border-rose-200 text-xs font-semibold text-[#2D1E2F] focus:outline-rose-400"
                    />
                    <input
                      type="time"
                      value={nextDateTime}
                      onChange={(e) => setNextDateTime(e.target.value)}
                      className="w-24 px-3 py-2 rounded-2xl bg-white border border-rose-200 text-xs font-semibold text-[#2D1E2F] focus:outline-rose-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4A1D2F] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>Địa Điểm Hẹn Hò Quen Thuộc</span>
                  </label>
                  <input
                    type="text"
                    value={nextDateLocation}
                    onChange={(e) => setNextDateLocation(e.target.value)}
                    placeholder="VD: Haidilao Landmark 81 &amp; Rooftop..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-rose-200 text-xs font-semibold text-[#2D1E2F] focus:outline-rose-400"
                  />
                </div>
              </div>

              {/* Bio Cặp Đôi */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#4A1D2F]">Lời Nhắn Nhủ / Bio Ngọt Ngào</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  placeholder="Cùng nhau ăn khắp thế gian..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-white border border-rose-200 text-xs text-[#2D1E2F] focus:outline-rose-400"
                />
              </div>
            </div>
          )}

          {/* TAB 2: TASTE & ALLERGIES */}
          {activeTab === 'taste' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Thang Đo Cay */}
              <div className="p-5 rounded-3xl bg-rose-50/50 border border-rose-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#4A1D2F] flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-rose-500" /> Mức độ ăn cay của hai bạn:
                  </span>
                  <span className="text-xs font-bold text-rose-600">
                    {spiceLabels[spiciness]}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={1}
                  value={spiciness}
                  onChange={(e) => setSpiciness(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#886A8B] font-mono">
                  <span>Không cay</span>
                  <span>Cay nhẹ</span>
                  <span>Cay vừa</span>
                  <span>Siêu cay</span>
                </div>
              </div>

              {/* Thang Đo Ngọt */}
              <div className="p-5 rounded-3xl bg-pink-50/50 border border-rose-200/80 space-y-3">
                <span className="text-xs font-bold text-[#4A1D2F] flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-pink-500" /> Gu độ ngọt:
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'low', label: 'Ít Ngọt 🍃', desc: 'Thanh mát, 30% đường' },
                    { id: 'medium', label: 'Vừa Phải 🍯', desc: 'Chuẩn vị, 50-70% đường' },
                    { id: 'high', label: 'Hảo Ngọt 🍫', desc: '100% đường & đậm vị' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSweetness(s.id as any)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        sweetness === s.id
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-400 shadow-md font-bold'
                          : 'bg-white text-[#4A1D2F] border-rose-200 hover:bg-rose-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{s.label}</div>
                      <div className={`text-[10px] mt-0.5 ${sweetness === s.id ? 'text-pink-100' : 'text-[#886A8B]'}`}>
                        {s.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Checkbox Dị Ứng / Kiêng Cử */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#4A1D2F] flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-500" /> Dị ứng hoặc món kiêng cử (Vòng quay sẽ cảnh báo):
                </span>
                <div className="flex flex-wrap gap-2">
                  {ALLERGIES_LIST.map((item) => {
                    const isSelected = allergies.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleAllergy(item)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-white font-bold border border-amber-600 shadow-xs'
                            : 'bg-white text-[#5E4761] border border-rose-200 hover:bg-rose-50'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOM FOODS IN ROULETTE */}
          {activeTab === 'foods' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Form Thêm Món Mới Vào Vòng Quay */}
              <form onSubmit={handleAddFood} className="p-5 rounded-3xl bg-rose-50/70 border border-rose-200 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#831843]">
                  <Plus className="w-4 h-4" />
                  <span>Thêm Món Ăn Ruột Vào Vòng Quay</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <input
                    type="text"
                    value={newFoodName}
                    onChange={(e) => setNewFoodName(e.target.value)}
                    placeholder="Tên món (VD: Bánh Tráng Nướng...)"
                    className="sm:col-span-2 px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-xs font-semibold text-[#2D1E2F] focus:outline-rose-400"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFoodEmoji}
                      onChange={(e) => setNewFoodEmoji(e.target.value)}
                      placeholder="Icon (VD: 🍕)"
                      maxLength={4}
                      className="w-16 px-2 py-2 text-center rounded-xl bg-white border border-rose-200 text-sm focus:outline-rose-400"
                    />
                    <select
                      value={newFoodCountry}
                      onChange={(e) => setNewFoodCountry(e.target.value as any)}
                      className="flex-1 px-2 py-2 rounded-xl bg-white border border-rose-200 text-xs font-semibold text-[#2D1E2F]"
                    >
                      <option value="vietnam">🇻🇳 Việt Nam</option>
                      <option value="korea">🇰🇷 Hàn Quốc</option>
                      <option value="japan">🇯🇵 Nhật Bản</option>
                      <option value="italy">🇮🇹 Âu - Ý</option>
                      <option value="dessert">🍰 Tráng miệng</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!newFoodName.trim()}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs shadow-sm hover:scale-[1.01] active:scale-95 disabled:opacity-40 transition-all cursor-pointer"
                >
                  + Thêm Ngay Vào Danh Sách Vòng Quay
                </button>
              </form>

              {/* Danh Sách Món Đã Thêm */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#4A1D2F]">
                  <span>Món Tự Thêm Của Cặp Đôi ({(profile.tastePreferences.customFoodItems || []).length}):</span>
                </div>

                {(profile.tastePreferences.customFoodItems || []).length === 0 ? (
                  <p className="text-xs text-[#886A8B] italic p-4 bg-white rounded-2xl border border-rose-100 text-center">
                    Chưa có món tự thêm nào. Hãy gõ tên món ruột của hai bạn ở trên nhé!
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(profile.tastePreferences.customFoodItems || []).map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-white border border-rose-200 flex items-center justify-between shadow-2xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{item.emoji}</span>
                          <div>
                            <div className="text-xs font-bold text-[#2D1E2F]">{item.name}</div>
                            <div className="text-[10px] text-rose-500 uppercase font-mono">
                              {item.country}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCustomFoodItem(item.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Xóa món này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: HOBBIES & ACTIVITIES */}
          {activeTab === 'hobbies' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#4A1D2F] flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-purple-500" />
                  <span>Sở thích hẹn hò &amp; hoạt động yêu thích của hai đứa:</span>
                </span>
                <p className="text-xs text-[#6B5B6E]">
                  Chọn các hoạt động bạn thích để nhận gợi ý địa điểm chính xác nhất.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {HOBBIES_LIST.map((hobby) => {
                  const isSelected = hobbies.includes(hobby);
                  return (
                    <button
                      key={hobby}
                      type="button"
                      onClick={() => toggleHobby(hobby)}
                      className={`p-3 rounded-2xl text-left text-xs font-semibold transition-all border flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-xs font-bold'
                          : 'bg-white border-rose-200 text-[#4A1D2F] hover:bg-rose-50'
                      }`}
                    >
                      <span>{hobby}</span>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-purple-600" />
                      ) : (
                        <span className="text-rose-300">+</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-rose-100 bg-rose-50/40 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white border border-rose-200 text-xs font-semibold text-[#4A1D2F] hover:bg-rose-50 transition-colors"
          >
            Đóng
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            className="px-7 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? 'Đã lưu hồ sơ thành công!' : 'Lưu Thay Đổi'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
