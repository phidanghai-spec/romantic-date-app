'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  Star, 
  CalendarHeart, 
  Compass, 
  Film, 
  Coffee, 
  Heart, 
  Palette
} from 'lucide-react';
import { WeatherWidget } from '@/components/activities/WeatherWidget';
import { COUPLE_ACTIVITIES } from '@/lib/dateApis';

const CATEGORIES = [
  { id: 'all', label: 'Tất cả gợi ý', icon: Sparkles },
  { id: 'romantic', label: 'Lãng Mạn & Ấm Cúng 🕯️', icon: Heart },
  { id: 'chill', label: 'Cafe & View Đẹp ☕', icon: Coffee },
  { id: 'entertainment', label: 'Xem Phim & Giải Trí 🎬', icon: Film },
  { id: 'active', label: 'Năng Động & Workshop 🎨', icon: Palette },
];

const TRENDING_MOVIES = [
  {
    title: 'La La Land (Những Kẻ Khờ Mộng Mơ)',
    genre: 'Lãng mạn, Nhạc kịch',
    rating: '8.0/10 IMDb',
    desc: 'Giai điệu piano ngọt ngào và chuyện tình lãng mạn dưới ánh sao Los Angeles.',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop',
  },
  {
    title: 'About Time (Đã Đến Lúc)',
    genre: 'Hài hước, Tình cảm, Ý nghĩa',
    rating: '7.8/10 IMDb',
    desc: 'Bộ phim ấm áp giúp hai bạn trân trọng từng khoảnh khắc bình dị bên nhau.',
    poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1000&auto=format&fit=crop',
  }
];

export default function ActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredActivities = selectedCategory === 'all'
    ? COUPLE_ACTIVITIES
    : COUPLE_ACTIVITIES.filter((a) => a.category === selectedCategory);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden pb-24 md:pb-12">
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12">
        {/* Header Title */}
        <section className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-mono tracking-wider uppercase border border-blue-200 font-bold">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>Date Spot &amp; Activity Finder</span>
          </div>

          <h1 className="font-serif-italic text-5xl sm:text-6xl md:text-7xl text-[#2D1E2F] font-bold tracking-tight leading-none">
            Hôm Nay Đi Chơi Ở Đâu?
          </h1>
          <p className="text-xs sm:text-sm text-[#715A75] font-light max-w-md mx-auto leading-relaxed">
            Khám phá các địa điểm hẹn hò lãng mạn, quán cafe view hoàng hôn và workshop nghệ thuật dành riêng cho hai người.
          </p>
        </section>

        {/* Realtime Weather Forecast Widget */}
        <section>
          <WeatherWidget />
        </section>

        {/* Category Filters */}
        <section className="flex items-center gap-2.5 overflow-x-auto custom-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 border border-rose-400 font-bold scale-102'
                    : 'cream-glass-pill hover:bg-white text-[#5E4761] border-rose-200/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </section>

        {/* Activities Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="cream-glass-card rounded-3xl overflow-hidden border border-rose-200/70 hover:border-rose-300 transition-all duration-300 flex flex-col justify-between group shadow-md hover:shadow-xl"
            >
              {/* Activity Image */}
              <div className="relative w-full h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={act.image}
                  alt={act.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Rating Badge */}
                {act.rating && (
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-white/90 text-[10px] font-bold text-amber-600 flex items-center gap-1 border border-amber-200 shadow-2xs">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{act.rating}</span>
                  </span>
                )}
              </div>

              {/* Activity Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
                <div>
                  <h4 className="font-serif-italic text-2xl text-[#2D1E2F] font-bold group-hover:text-rose-600 transition-colors">
                    {act.title}
                  </h4>
                  <p className="text-xs text-[#715A75] font-light mt-1 line-clamp-2 leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-[#4A3B4E] pt-2 border-t border-rose-100">
                  <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{act.locationSuggest}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#886A8B] font-mono">
                    <span>Chi phí ước tính:</span>
                    <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {act.estimatedCost}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/date-planner?location=${encodeURIComponent(act.locationSuggest)}`}
                  className="w-full py-2.5 px-4 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold text-xs flex items-center justify-center gap-1.5 border border-rose-200 transition-all"
                >
                  <CalendarHeart className="w-3.5 h-3.5 text-rose-500" />
                  <span>Chọn địa điểm này vào lịch hẹn ➔</span>
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Movie Date Night Feature Card */}
        <section className="cream-glass-card rounded-3xl p-6 sm:p-8 border border-rose-200/80 space-y-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center border border-rose-200 shadow-xs">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-rose-700 font-bold">
                  Movie Date Night
                </span>
                <h3 className="font-serif-italic text-3xl text-[#2D1E2F] font-bold">Gợi Ý Phim Tình Cảm Cuối Tuần</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRENDING_MOVIES.map((movie, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-rose-200/70 flex gap-3.5 items-center shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-20 h-28 rounded-xl object-cover border border-rose-200 shrink-0"
                />
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[9px] font-mono font-bold border border-rose-200">
                    {movie.rating}
                  </span>
                  <h5 className="font-serif-italic text-xl text-[#2D1E2F] font-bold leading-tight">{movie.title}</h5>
                  <p className="text-[11px] text-[#715A75] font-light line-clamp-2">{movie.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
