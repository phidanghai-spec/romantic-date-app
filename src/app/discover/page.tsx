'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  X, 
  Star, 
  RotateCcw, 
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { SwipeCard } from '@/components/cards/SwipeCard';
import { MatchModal } from '@/components/cards/MatchModal';


export default function DiscoverPage() {
  const { discoverQueue, swipeRight, swipeLeft, superLike, resetDiscoverQueue, currentUser } = useAppStore();

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (discoverQueue.length === 0) return;
    const topUser = discoverQueue[0];

    if (direction === 'right') {
      swipeRight(topUser);
    } else if (direction === 'left') {
      swipeLeft(topUser);
    } else if (direction === 'up') {
      superLike(topUser);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden pb-24 md:pb-8">
      <main className="relative z-10 flex-1 max-w-md w-full mx-auto px-4 py-4 sm:py-6 flex flex-col justify-between">
        {/* Top Mini Bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#6B5B6E]">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Discover Culinary Matches</span>
          </div>

          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-[11px] font-medium text-[#4A3B4E] cream-glass-pill hover:bg-white px-3 py-1 rounded-full transition-all border border-rose-200/60"
          >
            <SlidersHorizontal className="w-3 h-3 text-rose-400" />
            <span>Gu của bạn ({currentUser.tasteProfile.favoriteCuisines.length} món)</span>
          </Link>
        </div>

        {/* Swipe Card Deck Area */}
        <div className="relative w-full h-[520px] sm:h-[560px] mx-auto">
          {discoverQueue.length > 0 ? (
            <AnimatePresence>
              {discoverQueue.slice(0, 2).map((user, index) => {
                const isTop = index === 0;
                return (
                  <SwipeCard
                    key={user.id}
                    user={user}
                    onSwipe={handleSwipe}
                    isTopCard={isTop}
                  />
                );
              })}
            </AnimatePresence>
          ) : (
            /* Empty Queue State */
            <div className="w-full h-full rounded-3xl cream-glass-card border border-rose-200/60 p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-3xl shadow-inner animate-pulse">
                🍲
              </div>
              <div className="space-y-2">
                <h3 className="font-serif-italic text-3xl text-[#2D1E2F]">
                  Đã khám phá hết hôm nay!
                </h3>
                <p className="text-xs text-[#6B5B6E] max-w-xs font-light leading-relaxed">
                  Bạn đã xem hết các gợi ý ẩm thực quanh đây. Hãy làm mới danh sách hoặc điều chỉnh lại sở thích để tìm thêm nhiều bạn mới nhé!
                </p>
              </div>

              <button
                onClick={resetDiscoverQueue}
                className="py-3 px-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/20"
              >
                <RotateCcw className="w-4 h-4" />
                Làm mới danh sách gợi ý
              </button>
            </div>
          )}
        </div>

        {/* Swipe Action Controls Bar */}
        {discoverQueue.length > 0 && (
          <div className="flex items-center justify-center gap-5 pt-4">
            {/* Pass / Nope Button */}
            <button
              onClick={() => handleSwipe('left')}
              aria-label="Pass"
              className="w-14 h-14 rounded-full cream-glass-pill text-rose-400 border border-rose-300 flex items-center justify-center shadow-xl hover:bg-rose-100 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Super Like Button */}
            <button
              onClick={() => handleSwipe('up')}
              aria-label="Super Like"
              className="w-12 h-12 rounded-full cream-glass-pill text-amber-500 border border-amber-300 flex items-center justify-center shadow-xl hover:bg-amber-100 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Star className="w-5 h-5 stroke-[2.5] fill-amber-300/40" />
            </button>

            {/* Like / Heart Button */}
            <button
              onClick={() => handleSwipe('right')}
              aria-label="Like"
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-2xl shadow-rose-500/40 hover:scale-110 hover:shadow-rose-500/60 active:scale-95 transition-all duration-200 cursor-pointer border border-white/30"
            >
              <Heart className="w-7 h-7 stroke-[2.5] fill-white" />
            </button>
          </div>
        )}
      </main>

      {/* Match Modal */}
      <MatchModal />
    </div>
  );
}
