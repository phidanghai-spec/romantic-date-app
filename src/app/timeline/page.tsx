'use client';

import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Plus, 
  MapPin, 
  CheckCircle2, 
  Circle, 
  Image as ImageIcon, 
  BookHeart, 
  Upload, 
  Star, 
  X, 
  Calendar, 
  Utensils, 
  Loader2,
  Trash2,
} from 'lucide-react';
import { CoupleMemory } from '@/lib/dateApis';
import { uploadMemoryPhoto } from '@/lib/storage';
import { useCoupleStore } from '@/lib/coupleStore';
import { useTimelineStore } from '@/lib/timelineStore';

const RATING_LABELS: Record<number, string> = {
  1: 'Chưa như mong đợi 🥺',
  2: 'Bình thường, cần cố gắng hơn 🌱',
  3: 'Buổi hẹn ấm cúng & vui vẻ 🌸',
  4: 'Rất ngọt ngào & đáng nhớ ✨',
  5: 'Hoàn hảo tuyệt đối! Yêu người ấy nhiều ❤️',
};

export default function TimelinePage() {
  const { profile, getDaysTogether } = useCoupleStore();
  const { 
    memories, 
    bucketList, 
    addMemory, 
    deleteMemory, 
    toggleBucketItem, 
    addBucketItem, 
    deleteBucketItem 
  } = useTimelineStore();

  const [activeTab, setActiveTab] = useState<'memories' | 'bucketList'>('memories');

  // New Memory Modal Form states
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [newLocation, setNewLocation] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newCuisine, setNewCuisine] = useState('Lẩu Haidilao');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newRating, setNewRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // New Bucket List Item state
  const [newBucketTitle, setNewBucketTitle] = useState('');
  const [newBucketCategory, setNewBucketCategory] = useState('Kỷ Niệm');

  // Handle direct file upload with HTML5 Canvas compression
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const uploadedUrl = await uploadMemoryPhoto(file, 'couple-memories');
      setNewPhotoUrl(uploadedUrl);
    } catch (err) {
      console.error('Error uploading photo:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const fallbackPhoto = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop';

    const newMem: CoupleMemory = {
      id: `mem-${Date.now()}`,
      title: newTitle.trim(),
      date: newDate,
      location: newLocation.trim() || 'TP. Hồ Chí Minh',
      note: newNote.trim() || 'Một buổi hẹn hò thật ấm áp và đáng nhớ ❤️',
      photoUrl: newPhotoUrl.trim() || fallbackPhoto,
      cuisine: newCuisine,
      rating: newRating,
    };

    addMemory(newMem);
    setIsAddMemoryOpen(false);
    setNewTitle('');
    setNewNote('');
    setNewLocation('');
    setNewPhotoUrl('');
    setNewRating(5);
  };

  const handleAddBucketItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBucketTitle.trim()) return;

    addBucketItem(newBucketTitle.trim(), newBucketCategory);
    setNewBucketTitle('');
  };

  const completedCount = bucketList.filter((b) => b.isCompleted).length;
  const progressPercent = bucketList.length > 0 ? Math.round((completedCount / bucketList.length) * 100) : 0;
  const daysInLove = getDaysTogether();

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden pb-24 md:pb-12">
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        {/* LOVE DAYS COUNTER & BANNER */}
        <section className="cream-glass-card rounded-3xl p-6 sm:p-8 border border-rose-200/80 text-center relative overflow-hidden shadow-xl">
          {/* Ambient glow highlight */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-rose-200/40 via-amber-100/30 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-mono tracking-wider uppercase border border-rose-300 font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span>Our Love Story Milestone</span>
            </div>

            <h1 className="font-serif italic text-5xl sm:text-6xl md:text-7xl text-[#2D1E2F] font-bold tracking-tight leading-none">
              {daysInLove} Ngày Bên Nhau 💕
            </h1>

            <p className="text-xs sm:text-sm text-[#715A75] font-light max-w-md mx-auto">
              Cùng nhau đi qua từng con phố, thưởng thức hàng trăm món ngon và viết nên những kỷ niệm đẹp nhất của {profile.yourName} &amp; {profile.partnerName}.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-6 text-center relative z-10">
            <div className="p-3 rounded-2xl bg-white/90 border border-rose-200/60 shadow-xs">
              <div className="font-serif italic text-3xl text-rose-600 font-bold">{memories.length}</div>
              <div className="text-[10px] text-[#886A8B] uppercase font-mono font-semibold">Buổi hẹn đã lưu</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 border border-rose-200/60 shadow-xs">
              <div className="font-serif italic text-3xl text-amber-600 font-bold">{completedCount}/{bucketList.length}</div>
              <div className="text-[10px] text-[#886A8B] uppercase font-mono font-semibold">Wishlist hoàn thành</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 border border-rose-200/60 shadow-xs">
              <div className="font-serif italic text-3xl text-pink-600 font-bold">100%</div>
              <div className="text-[10px] text-[#886A8B] uppercase font-mono font-semibold">Đồng điệu khẩu vị</div>
            </div>
          </div>
        </section>

        {/* TAB TOGGLE: MEMORIES VS BUCKET LIST */}
        <section className="flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('memories')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'memories'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 border border-rose-400 scale-102'
                : 'cream-glass-pill hover:bg-white text-[#715A75] border-rose-200/50'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Album Kỷ Niệm Hẹn Hò ({memories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bucketList')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'bucketList'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 border border-rose-400 scale-102'
                : 'cream-glass-pill hover:bg-white text-[#715A75] border-rose-200/50'
            }`}
          >
            <BookHeart className="w-4 h-4" />
            <span>Couple Wishlist ({completedCount}/{bucketList.length})</span>
          </button>
        </section>

        {/* TAB 1: MEMORIES SCRAPBOOK */}
        {activeTab === 'memories' && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif italic text-3xl text-[#2D1E2F] font-bold">Cuốn Sổ Kỷ Niệm (Scrapbook) 📸</h3>
                <p className="text-xs text-[#715A75] font-light">Những khoảnh khắc hẹn hò ngọt ngào nhất của hai đứa</p>
              </div>

              <button
                onClick={() => setIsAddMemoryOpen(true)}
                className="py-2.5 px-5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 active:scale-95 text-white font-bold text-xs shadow-md shadow-rose-500/25 transition-all flex items-center gap-1.5 border border-white/40 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm kỷ niệm mới</span>
              </button>
            </div>

            {memories.length === 0 ? (
              <div className="cream-glass-card rounded-3xl p-12 text-center border border-rose-200/70 space-y-3">
                <div className="text-4xl">🌸</div>
                <h4 className="font-serif italic text-2xl text-[#2D1E2F] font-bold">Chưa có kỷ niệm nào được lưu</h4>
                <p className="text-xs text-[#715A75] max-w-sm mx-auto">
                  Hãy nhấn nút &ldquo;Thêm kỷ niệm mới&rdquo; để bắt đầu lưu giữ những bức ảnh và khoảnh khắc đẹp của hai bạn!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {memories.map((mem) => (
                  <div
                    key={mem.id}
                    className="cream-glass-card rounded-3xl overflow-hidden border border-rose-200/70 hover:border-rose-300 transition-all duration-300 flex flex-col justify-between group shadow-md hover:shadow-xl relative"
                  >
                    <div className="relative w-full h-56 overflow-hidden bg-rose-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={mem.photoUrl}
                        alt={mem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-[10px] font-mono text-rose-800 border border-rose-200 font-bold shadow-2xs">
                        {mem.date}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteMemory(mem.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white/80 hover:text-red-400 hover:bg-black/70 transition-colors"
                        title="Xóa kỷ niệm này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif italic text-2xl text-[#2D1E2F] font-bold group-hover:text-rose-600 transition-colors">
                            {mem.title}
                          </h4>
                          <div className="flex items-center gap-0.5 text-amber-500 text-sm">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star
                                key={idx}
                                className={`w-3.5 h-3.5 ${
                                  idx < mem.rating
                                    ? 'fill-amber-400 text-amber-500'
                                    : 'fill-rose-100 text-rose-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-[#5E4761] font-light mt-1.5 leading-relaxed italic">
                          &ldquo;{mem.note}&rdquo;
                        </p>
                      </div>

                      <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-xs text-[#715A75] font-light">
                        <div className="flex items-center gap-1 text-rose-700 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="truncate">{mem.location}</span>
                        </div>
                        <span className="font-mono text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {mem.cuisine}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* TAB 2: COUPLE WISHLIST & BUCKET LIST */}
        {activeTab === 'bucketList' && (
          <section className="space-y-6">
            <div className="cream-glass-card rounded-3xl p-6 border border-rose-200/80 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif italic text-3xl text-[#2D1E2F] font-bold">Những Điều Muốn Làm Cùng Nhau ✨</h3>
                  <p className="text-xs text-[#715A75] font-light">Danh sách ước mơ và địa điểm cần chinh phục</p>
                </div>
                <div className="text-right">
                  <span className="font-serif italic text-3xl text-rose-600 font-bold">{progressPercent}%</span>
                  <span className="text-[10px] text-[#886A8B] block font-mono font-semibold">Đã hoàn thành</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-rose-100 overflow-hidden border border-rose-200">
                <div
                  style={{ width: `${progressPercent}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-500"
                />
              </div>

              {/* Bucket List Items */}
              <div className="space-y-2 pt-2">
                {bucketList.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      item.isCompleted
                        ? 'bg-rose-50/70 border-rose-300 text-rose-900 opacity-90'
                        : 'bg-white border-rose-200 text-[#2D1E2F] hover:border-rose-300'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleBucketItem(item.id)}
                      className="flex items-center gap-3 text-left flex-1 cursor-pointer"
                    >
                      {item.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-rose-500 fill-rose-100 shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-rose-300 shrink-0 hover:text-rose-500 transition-colors" />
                      )}
                      <div>
                        <span className={`text-xs sm:text-sm font-medium block ${item.isCompleted ? 'line-through text-rose-700' : ''}`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] text-[#886A8B] font-mono">
                          Chủ đề: {item.category} {item.completedAt && `• Hoàn thành: ${item.completedAt}`}
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteBucketItem(item.id)}
                      className="p-1.5 rounded-full text-[#886A8B] hover:text-red-500 hover:bg-rose-50 transition-colors"
                      title="Xóa mục này"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Bucket Item Form */}
              <form onSubmit={handleAddBucketItem} className="pt-4 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newBucketTitle}
                  onChange={(e) => setNewBucketTitle(e.target.value)}
                  placeholder="Thêm một ước mơ mới (VD: Đi ngắm tuyết ở Sapa, cùng làm bánh kem...)"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-rose-50/40 border border-rose-200 text-xs sm:text-sm text-[#2D1E2F] focus:outline-rose-400 placeholder:text-[#A08DA3]"
                />
                <select
                  value={newBucketCategory}
                  onChange={(e) => setNewBucketCategory(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-rose-50/40 border border-rose-200 text-xs text-[#2D1E2F] focus:outline-rose-400 font-medium"
                >
                  <option value="Kỷ Niệm">Kỷ Niệm 📸</option>
                  <option value="Ăn Uống">Ăn Uống 🍲</option>
                  <option value="Du Lịch">Du Lịch ✈️</option>
                  <option value="Trải Nghiệm">Trải Nghiệm 🎨</option>
                </select>
                <button
                  type="submit"
                  disabled={!newBucketTitle.trim()}
                  className="px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs shadow-md hover:bg-rose-600 disabled:opacity-40 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm</span>
                </button>
              </form>
            </div>
          </section>
        )}

        {/* MODAL: THÊM KỶ NIỆM MỚI */}
        {isAddMemoryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
            <div className="relative w-full max-w-lg cream-glass-card bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-300 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif italic text-2xl text-[#2D1E2F] font-bold">Lưu Giữ Khoảnh Khắc Mới</h3>
                </div>
                <button
                  onClick={() => setIsAddMemoryOpen(false)}
                  className="p-1.5 rounded-full hover:bg-rose-50 text-[#886A8B] hover:text-[#2D1E2F] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddMemory} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#5E4761]">Tiêu đề kỷ niệm *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="VD: Buổi tối ngắm hoàng hôn Thảo Điền"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-rose-50/40 border border-rose-200 text-xs sm:text-sm text-[#2D1E2F] focus:outline-rose-400 shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#5E4761] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-rose-500" /> Ngày hẹn
                    </label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-rose-50/40 border border-rose-200 text-xs text-[#2D1E2F] focus:outline-rose-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#5E4761] flex items-center gap-1">
                      <Utensils className="w-3.5 h-3.5 text-amber-500" /> Món ăn
                    </label>
                    <input
                      type="text"
                      value={newCuisine}
                      onChange={(e) => setNewCuisine(e.target.value)}
                      placeholder="VD: Haidilao, Sushi, Cafe..."
                      className="w-full px-3 py-2 rounded-xl bg-rose-50/40 border border-rose-200 text-xs text-[#2D1E2F] focus:outline-rose-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#5E4761] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" /> Địa điểm
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="VD: Haidilao Landmark 81, Quận 1..."
                    className="w-full px-3.5 py-2 rounded-xl bg-rose-50/40 border border-rose-200 text-xs text-[#2D1E2F] focus:outline-rose-400 shadow-inner"
                  />
                </div>

                {/* Direct Image Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#5E4761] flex items-center justify-between">
                    <span>Ảnh kỷ niệm (Tự động nén Canvas HD)</span>
                    <span className="text-[10px] text-rose-600 font-mono">Tối ưu ~150KB</span>
                  </label>

                  <div className="flex gap-2 items-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="px-4 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isUploading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>{isUploading ? 'Đang nén ảnh...' : 'Tải ảnh từ máy'}</span>
                    </button>

                    <span className="text-xs text-[#886A8B] truncate flex-1">
                      {newPhotoUrl ? '✓ Đã sẵn sàng ảnh' : 'Chưa chọn tệp'}
                    </span>
                  </div>

                  {newPhotoUrl && (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden border border-rose-200 mt-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={newPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Happiness Rating */}
                <div className="space-y-1.5 p-3 rounded-2xl bg-rose-50/50 border border-rose-100">
                  <label className="text-xs font-semibold text-[#5E4761] block">
                    Đánh giá mức độ hạnh phúc:
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-hidden cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= (hoverRating || newRating)
                                ? 'fill-amber-400 text-amber-500'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-medium text-rose-700 italic">
                      {RATING_LABELS[hoverRating || newRating]}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#5E4761]">Cảm xúc / Lời nhắn nhủ</label>
                  <textarea
                    rows={2}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Viết vài dòng yêu thương về buổi hẹn hôm ấy..."
                    className="w-full px-3.5 py-2 rounded-xl bg-rose-50/40 border border-rose-200 text-xs text-[#2D1E2F] focus:outline-rose-400 shadow-inner"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-rose-100">
                  <button
                    type="button"
                    onClick={() => setIsAddMemoryOpen(false)}
                    className="px-4 py-2 rounded-full text-xs text-[#715A75] hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-md shadow-rose-500/25 hover:opacity-95 active:scale-95 transition-all cursor-pointer"
                  >
                    Lưu Kỷ Niệm 💖
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
