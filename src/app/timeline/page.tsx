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
  Heart,
  Upload,
  Star,
  X,
  Calendar,
  Utensils,
  Camera,
  Loader2
} from 'lucide-react';
import { DEFAULT_MEMORIES, DEFAULT_BUCKET_LIST, CoupleMemory, BucketListItem } from '@/lib/dateApis';
import { uploadMemoryPhoto } from '@/lib/storage';
import { useCoupleStore } from '@/lib/coupleStore';

const RATING_LABELS: Record<number, string> = {
  1: 'Chưa như mong đợi 🥺',
  2: 'Bình thường, cần cố gắng hơn 🌱',
  3: 'Buổi hẹn ấm cúng & vui vẻ 🌸',
  4: 'Rất ngọt ngào & đáng nhớ ✨',
  5: 'Hoàn hảo tuyệt đối! Yêu người ấy nhiều ❤️',
};

export default function TimelinePage() {
  const { profile, getDaysTogether } = useCoupleStore();
  const [memories, setMemories] = useState<CoupleMemory[]>(DEFAULT_MEMORIES);
  const [bucketList, setBucketList] = useState<BucketListItem[]>(DEFAULT_BUCKET_LIST);
  const [activeTab, setActiveTab] = useState<'memories' | 'bucketList'>('memories');

  // New Memory Modal Form states
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
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

  const toggleBucketItem = (id: string) => {
    setBucketList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isCompleted: !item.isCompleted,
              completedAt: !item.isCompleted ? new Date().toISOString().split('T')[0] : undefined,
            }
          : item
      )
    );
  };

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
      location: newLocation || 'TP. Hồ Chí Minh',
      note: newNote || 'Một buổi hẹn hò thật ấm áp và đáng nhớ ❤️',
      photoUrl: newPhotoUrl.trim() || fallbackPhoto,
      cuisine: newCuisine,
      rating: newRating,
    };

    setMemories([newMem, ...memories]);
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

    const newItem: BucketListItem = {
      id: `b-${Date.now()}`,
      title: newBucketTitle.trim(),
      category: newBucketCategory,
      isCompleted: false,
    };

    setBucketList([...bucketList, newItem]);
    setNewBucketTitle('');
  };

  const completedCount = bucketList.filter((b) => b.isCompleted).length;
  const progressPercent = Math.round((completedCount / bucketList.length) * 100) || 0;
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

            <h1 className="font-serif-italic text-5xl sm:text-6xl md:text-7xl text-[#2D1E2F] font-bold tracking-tight leading-none">
              {daysInLove} Ngày Bên Nhau 💕
            </h1>

            <p className="text-xs sm:text-sm text-[#715A75] font-light max-w-md mx-auto">
              Cùng nhau đi qua từng con phố, thưởng thức hàng trăm món ngon và viết nên những kỷ niệm đẹp nhất của {profile.yourName} &amp; {profile.partnerName}.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-6 text-center relative z-10">
            <div className="p-3 rounded-2xl bg-white/90 border border-rose-200/60 shadow-xs">
              <div className="font-serif-italic text-3xl text-rose-600 font-bold">{memories.length}</div>
              <div className="text-[10px] text-[#886A8B] uppercase font-mono font-semibold">Buổi hẹn đã lưu</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 border border-rose-200/60 shadow-xs">
              <div className="font-serif-italic text-3xl text-amber-600 font-bold">{completedCount}/{bucketList.length}</div>
              <div className="text-[10px] text-[#886A8B] uppercase font-mono font-semibold">Wishlist hoàn thành</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 border border-rose-200/60 shadow-xs">
              <div className="font-serif-italic text-3xl text-pink-600 font-bold">100%</div>
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
                <h3 className="font-serif-italic text-3xl text-[#2D1E2F] font-bold">Cuốn Sổ Kỷ Niệm (Scrapbook) 📸</h3>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {memories.map((mem) => (
                <div
                  key={mem.id}
                  className="cream-glass-card rounded-3xl overflow-hidden border border-rose-200/70 hover:border-rose-300 transition-all duration-300 flex flex-col justify-between group shadow-md hover:shadow-xl"
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
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif-italic text-2xl text-[#2D1E2F] font-bold group-hover:text-rose-600 transition-colors">
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
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
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
          </section>
        )}

        {/* TAB 2: COUPLE WISHLIST & BUCKET LIST */}
        {activeTab === 'bucketList' && (
          <section className="space-y-6">
            <div className="cream-glass-card rounded-3xl p-6 border border-rose-200/80 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-italic text-3xl text-[#2D1E2F] font-bold">Những Điều Muốn Làm Cùng Nhau ✨</h3>
                  <p className="text-xs text-[#715A75] font-light">Danh sách ước mơ và địa điểm cần chinh phục</p>
                </div>
                <div className="text-right">
                  <span className="font-serif-italic text-3xl text-rose-600 font-bold">{progressPercent}%</span>
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
                    onClick={() => toggleBucketItem(item.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                      item.isCompleted
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-white hover:bg-rose-50/50 border-rose-200/70 text-[#2D1E2F]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-rose-300 shrink-0" />
                      )}
                      <span className={`text-xs sm:text-sm ${item.isCompleted ? 'line-through opacity-70 text-[#715A75]' : 'font-semibold'}`}>
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-100/80 text-[10px] font-mono text-rose-800 font-bold border border-rose-200">
                        {item.category}
                      </span>
                      {item.completedAt && (
                        <span className="text-[10px] font-mono text-emerald-700 font-semibold">
                          {item.completedAt}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Bucket Item Form */}
              <form onSubmit={handleAddBucketItem} className="pt-4 border-t border-rose-200 flex gap-2">
                <input
                  type="text"
                  value={newBucketTitle}
                  onChange={(e) => setNewBucketTitle(e.target.value)}
                  placeholder="Thêm mục ước mơ mới (VD: Cùng đi ngắm tuyết Sapa)..."
                  className="flex-1 px-4 py-2.5 rounded-full bg-white border border-rose-200 text-xs sm:text-sm text-[#2D1E2F] focus:outline-rose-400 placeholder:text-[#A08DA3] shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!newBucketTitle.trim()}
                  className="py-2.5 px-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-md disabled:opacity-40 border border-white/40 cursor-pointer"
                >
                  Thêm
                </button>
              </form>
            </div>
          </section>
        )}
      </main>

      {/* Add Memory Modal with Direct File Upload & Interactive 5-Star Rating */}
      {isAddMemoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fade-in overflow-y-auto">
          <form
            onSubmit={handleAddMemory}
            className="w-full max-w-lg bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 border-2 border-rose-300 text-[#2D1E2F] space-y-4 shadow-2xl my-6 max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <div className="flex items-center justify-between border-b border-rose-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <h3 className="font-serif-italic text-2xl text-[#2D1E2F] font-bold">Thêm Kỷ Niệm Buổi Hẹn 💖</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddMemoryOpen(false)}
                className="p-1 rounded-full hover:bg-rose-100 text-[#715A75] hover:text-[#2D1E2F] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Photo Upload Area */}
              <div>
                <label className="text-[#5E4761] block mb-1.5 font-bold flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-rose-500" />
                  Ảnh chụp kỷ niệm buổi hẹn (Tự động nén tối ưu)
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />

                {isUploading ? (
                  <div className="w-full h-36 rounded-2xl border-2 border-dashed border-rose-300 bg-rose-50/50 flex flex-col items-center justify-center gap-2">
                    <Loader2 className="w-6 h-6 text-rose-500 animate-spin" />
                    <span className="text-xs font-semibold text-rose-700">Đang nén và xử lý ảnh...</span>
                  </div>
                ) : newPhotoUrl ? (
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden border-2 border-rose-300 shadow-sm group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={newPhotoUrl}
                      alt="Ảnh xem trước"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-full bg-white text-rose-700 font-bold text-xs shadow-md"
                      >
                        Đổi ảnh khác 📷
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewPhotoUrl('')}
                        className="px-3 py-1.5 rounded-full bg-rose-500 text-white font-bold text-xs shadow-md"
                      >
                        Xóa ảnh ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-36 rounded-2xl border-2 border-dashed border-rose-300 bg-rose-50/50 hover:bg-rose-100/60 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer p-4 text-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-white text-rose-500 flex items-center justify-center shadow-xs">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-rose-700 block">Bấm để tải ảnh từ máy / điện thoại</span>
                      <span className="text-[10px] text-[#886A8B] font-light">Hỗ trợ JPG, PNG, WEBP (Tự động nén &amp; xem trước)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Title Input */}
              <div>
                <label className="text-[#5E4761] block mb-1 font-bold">Tên buổi hẹn / Tiêu đề kỷ niệm</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="VD: Buổi tối lẩu cay Landmark 81..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-rose-200 text-[#2D1E2F] focus:outline-rose-400 shadow-inner font-medium"
                />
              </div>

              {/* Date & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[#5E4761] block mb-1 font-bold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" /> Ngày hẹn
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-[#2D1E2F] focus:outline-rose-400 font-medium"
                  />
                </div>
                <div>
                  <label className="text-[#5E4761] block mb-1 font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" /> Địa điểm
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="VD: Quận 1, Landmark 81..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-[#2D1E2F] focus:outline-rose-400 font-medium"
                  />
                </div>
              </div>

              {/* Cuisine Input */}
              <div>
                <label className="text-[#5E4761] block mb-1 font-bold flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5 text-rose-500" /> Món ăn / Nhà hàng đã trải nghiệm
                </label>
                <input
                  type="text"
                  value={newCuisine}
                  onChange={(e) => setNewCuisine(e.target.value)}
                  placeholder="VD: Lẩu Haidilao, BBQ Hàn Quốc..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-[#2D1E2F] focus:outline-rose-400 font-medium"
                />
              </div>

              {/* Interactive 5-Star Rating */}
              <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-1.5">
                <label className="text-[#5E4761] block font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> Đánh giá độ hạnh phúc cho buổi hẹn:
                  </span>
                  <span className="text-amber-800 font-bold">{newRating} / 5 ⭐</span>
                </label>

                {/* Stars Row */}
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((starIndex) => {
                    const isFilled = (hoverRating || newRating) >= starIndex;
                    return (
                      <button
                        key={starIndex}
                        type="button"
                        onClick={() => setNewRating(starIndex)}
                        onMouseEnter={() => setHoverRating(starIndex)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 hover:scale-125 active:scale-95 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            isFilled
                              ? 'fill-amber-400 text-amber-500 drop-shadow-xs'
                              : 'fill-rose-100 text-rose-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="text-[11px] text-rose-700 font-semibold italic pt-0.5">
                  {RATING_LABELS[hoverRating || newRating]}
                </div>
              </div>

              {/* Note / Feelings */}
              <div>
                <label className="text-[#5E4761] block mb-1 font-bold">Cảm nghĩ / Lời nhắn ngọt ngào</label>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={2}
                  placeholder="Hôm nay em vui lắm, đồ ăn rất ngon và anh chở em đi dạo..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-[#2D1E2F] focus:outline-rose-400 font-medium"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-rose-200 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsAddMemoryOpen(false)}
                className="px-4 py-2.5 text-xs text-[#715A75] hover:text-[#2D1E2F] cursor-pointer font-semibold"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="py-2.5 px-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-md shadow-rose-500/25 hover:opacity-95 active:scale-95 border border-white/40 cursor-pointer"
              >
                Lưu Kỷ Niệm Vào Sổ 💖
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
