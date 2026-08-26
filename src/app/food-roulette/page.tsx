'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChefHat, CalendarHeart, Dices } from 'lucide-react';
import { FoodRoulette } from '@/components/interactive/FoodRoulette';
import { CookingRecipeModal } from '@/components/food/CookingRecipeModal';

const VISUAL_FOOD_MENU = [
  {
    id: 'hotpot',
    name: 'Lẩu Haidilao & Manwah',
    tag: 'Gu của bạn gái 💖',
    image: 'https://images.unsplash.com/photo-1547928576-965be7f5f6a6?q=80&w=1000&auto=format&fit=crop',
    desc: 'Nhúng thịt bò mềm, tôm múa mì, nước lẩu cà chua & thái chua cay đậm đà.',
    price: '400k - 700k',
    vibe: 'Ấm cúng & Trò chuyện',
  },
  {
    id: 'bbq',
    name: 'K-BBQ Nướng Hàn Quốc',
    tag: 'Gu của bạn trai 🍖',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop',
    desc: 'Dẻ sườn bò nướng than hồng, cuốn lá mè kèm panchan kimchi giòn rụm.',
    price: '350k - 600k',
    vibe: 'Thơm lừng & Náo nhiệt',
  },
  {
    id: 'ramen',
    name: 'Ramen & Sushi Nhật Bản',
    tag: 'Món ăn thanh đạm 🍵',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1000&auto=format&fit=crop',
    desc: 'Nước dùng Tonkotsu hầm xương 12 tiếng, trứng lòng đào dẻo quánh.',
    price: '180k - 350k',
    vibe: 'Tinh tế & Yên tĩnh',
  },
  {
    id: 'rooftop',
    name: 'Steak & Cocktail Rooftop',
    tag: 'Hẹn hò lãng mạn 🍷',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
    desc: 'Ngắm toàn cảnh thành phố rực rỡ ánh đèn bên ly cocktail nồng nàn.',
    price: '300k - 550k',
    vibe: 'Chill & Nhạc Lo-fi',
  },
  {
    id: 'streetfood',
    name: 'Ốc Sài Gòn & Ăn Vặt',
    tag: 'Vui vẻ & Bình dân 🍢',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop',
    desc: 'Ốc hương sốt trứng muối kèm bánh mì giòn tan, trà tắc mát lạnh.',
    price: '150k - 250k',
    vibe: 'Đường phố & Thoải mái',
  },
  {
    id: 'dessert',
    name: 'Trà Sữa & Bingsu Xoài',
    tag: 'Hảo ngọt vô cực 🍰',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1000&auto=format&fit=crop',
    desc: 'Bingsu tuyết mịn phủ sốt xoài tươi mát và trân châu đường đen.',
    price: '80k - 180k',
    vibe: 'Ngọt ngào & Chụp ảnh',
  },
];

export default function FoodRoulettePage() {
  const [isCookingModalOpen, setIsCookingModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden pb-24 md:pb-12">
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12">
        {/* Header Title */}
        <section className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-mono tracking-wider uppercase border border-amber-300 font-bold">
            <Dices className="w-3.5 h-3.5 text-amber-600" />
            <span>Taste Decision Engine</span>
          </div>

          <h1 className="font-serif-italic text-5xl sm:text-6xl md:text-7xl text-[#2D1E2F] font-bold tracking-tight leading-none">
            Hôm Nay Ăn Gì Nhỉ?
          </h1>
          <p className="text-xs sm:text-sm text-[#715A75] font-light max-w-md mx-auto leading-relaxed">
            Không còn cảnh &ldquo;Ăn gì cũng được!&rdquo;. Hãy để vòng quay số phận chọn món hoặc cùng nhau nấu một bữa tối ấm áp tại nhà.
          </p>
        </section>

        {/* Interactive Spinning Wheel (Using FoodRoulette.tsx) */}
        <section className="cream-glass-card rounded-3xl p-6 sm:p-10 border border-rose-200/80 shadow-xl flex flex-col items-center">
          <FoodRoulette onOpenCookingModal={() => setIsCookingModalOpen(true)} />
        </section>

        {/* Visual Menu Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif-italic text-3xl sm:text-4xl text-[#2D1E2F] font-bold">
                Menu Quán Ruột Của Hai Đứa 🍽️
              </h3>
              <p className="text-xs text-[#715A75] font-light">
                Danh sách các món ăn &amp; không gian được cả hai bình chọn cao nhất
              </p>
            </div>

            <button
              onClick={() => setIsCookingModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full cream-glass-pill hover:bg-white text-amber-800 text-xs font-bold border border-amber-300 transition-all cursor-pointer shadow-2xs"
            >
              <ChefHat className="w-4 h-4 text-amber-600" />
              <span>Gợi ý món tự nấu (100% Tiếng Việt)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {VISUAL_FOOD_MENU.map((item) => (
              <div
                key={item.id}
                className="cream-glass-card rounded-3xl overflow-hidden border border-rose-200/70 hover:border-rose-300 transition-all duration-300 flex flex-col justify-between group shadow-md hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative w-full h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 text-[10px] font-bold text-rose-800 border border-rose-200 shadow-2xs">
                    {item.tag}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-serif-italic text-2xl text-[#2D1E2F] font-bold group-hover:text-rose-600 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#715A75] font-light mt-1 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {item.price}
                    </span>
                    <span className="text-[#886A8B] text-[11px] font-medium">{item.vibe}</span>
                  </div>

                  <Link
                    href={`/date-planner?cuisine=${encodeURIComponent(item.name)}`}
                    className="w-full py-2.5 px-4 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold text-xs flex items-center justify-center gap-1.5 border border-rose-200 transition-all"
                  >
                    <CalendarHeart className="w-3.5 h-3.5 text-rose-500" />
                    <span>Lên lịch đi ăn món này ➔</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Multi-National Cooking Recipe Modal */}
      <CookingRecipeModal
        isOpen={isCookingModalOpen}
        onClose={() => setIsCookingModalOpen(false)}
      />
    </div>
  );
}
