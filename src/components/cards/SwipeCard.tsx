'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { 
  Heart, 
  X, 
  Star, 
  MapPin, 
  Flame, 
  Sparkles, 
  Info, 
  ChevronRight, 
  ChevronLeft,
  Utensils,
  Wallet
} from 'lucide-react';
import { UserProfile } from '@/types';
import { getCompatibilityLabel } from '@/lib/tasteEngine';

interface SwipeCardProps {
  user: UserProfile;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  isTopCard?: boolean;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ user, onSwipe, isTopCard = false }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Motion values for swipe drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-16, 16]);
  const opacity = useTransform(x, [-260, 0, 260], [0.4, 1, 0.4]);

  // Stamp opacities
  const likeOpacity = useTransform(x, [40, 130], [0, 1]);
  const nopeOpacity = useTransform(x, [-40, -130], [0, 1]);
  const superLikeOpacity = useTransform(y, [-40, -110], [0, 1]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 100;
    const velocityThreshold = 350;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      onSwipe('left');
    } else if (info.offset.y < -threshold || info.velocity.y < -velocityThreshold) {
      onSwipe('up');
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user.photos && user.photos.length > 1) {
      setPhotoIndex((prev) => (prev + 1) % user.photos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user.photos && user.photos.length > 1) {
      setPhotoIndex((prev) => (prev - 1 + user.photos.length) % user.photos.length);
    }
  };

  const compLabel = getCompatibilityLabel(user.compatibilityScore || 85);
  const budgetIcons = ['$', '$$', '$$$', '$$$$'];

  return (
    <motion.div
      style={{
        x: isTopCard ? x : 0,
        y: isTopCard ? y : 0,
        rotate: isTopCard ? rotate : 0,
        opacity: isTopCard ? opacity : 1,
      }}
      drag={isTopCard ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.75}
      onDragEnd={handleDragEnd}
      className={`absolute inset-0 w-full h-full select-none cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden liquid-glass shadow-2xl flex flex-col justify-between border border-white/15 bg-black/90 ${
        isTopCard ? 'z-20' : 'z-10 scale-[0.96] translate-y-3 opacity-80'
      }`}
    >
      {/* Background Image Carousel */}
      <div className="relative w-full h-[62%] sm:h-[65%] bg-black overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.photos?.[photoIndex] || user.avatarUrl}
          alt={user.fullName}
          className="w-full h-full object-cover transition-transform duration-300 pointer-events-none brightness-95"
        />

        {/* Cinematic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/30 pointer-events-none" />

        {/* Carousel Photo Progress Dots */}
        {user.photos && user.photos.length > 1 && (
          <div className="absolute top-3 left-4 right-4 flex gap-1.5 z-30 pointer-events-none">
            {user.photos.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  idx === photoIndex ? 'bg-white shadow-sm' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}

        {/* Navigation Tap Zones */}
        {user.photos && user.photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              aria-label="Previous photo"
              className="absolute left-0 top-0 bottom-0 w-1/3 z-20 flex items-center justify-start pl-2 text-white/30 hover:text-white transition-opacity"
            >
              <ChevronLeft className="w-6 h-6 drop-shadow-md" />
            </button>
            <button
              onClick={nextPhoto}
              aria-label="Next photo"
              className="absolute right-0 top-0 bottom-0 w-1/3 z-20 flex items-center justify-end pr-2 text-white/30 hover:text-white transition-opacity"
            >
              <ChevronRight className="w-6 h-6 drop-shadow-md" />
            </button>
          </>
        )}

        {/* Dynamic Glowing Stamps */}
        {isTopCard && (
          <>
            {/* LIKE Stamp */}
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-10 left-6 -rotate-12 border-2 border-emerald-400 text-emerald-300 font-sans font-black text-2xl sm:text-3xl px-4 py-1.5 rounded-2xl tracking-wider pointer-events-none z-30 shadow-2xl bg-emerald-950/80 backdrop-blur-md shadow-emerald-500/40"
            >
              LIKE 💖
            </motion.div>

            {/* NOPE Stamp */}
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-10 right-6 rotate-12 border-2 border-rose-400 text-rose-300 font-sans font-black text-2xl sm:text-3xl px-4 py-1.5 rounded-2xl tracking-wider pointer-events-none z-30 shadow-2xl bg-rose-950/80 backdrop-blur-md shadow-rose-500/40"
            >
              PASS 💔
            </motion.div>

            {/* SUPER LIKE Stamp */}
            <motion.div
              style={{ opacity: superLikeOpacity }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 border-2 border-amber-300 text-amber-200 font-sans font-black text-xl sm:text-2xl px-5 py-1.5 rounded-2xl tracking-wider pointer-events-none z-30 shadow-2xl bg-amber-950/80 backdrop-blur-md shadow-amber-500/40 text-center"
            >
              SUPER LIKE ⭐
            </motion.div>
          </>
        )}

        {/* Taste Match Glowing Glass Pill */}
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass-pill text-white border border-rose-500/40 bg-black/60 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="font-sans font-bold text-xs text-white">
              {user.compatibilityScore || 88}%
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-300">Match</span>
          </div>
        </div>

        {/* User Info Overlay with Instrument Serif */}
        <div className="absolute bottom-3 left-4 right-4 z-20 text-white">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl sm:text-4xl font-serif-italic tracking-wide text-white drop-shadow-lg">
                  {user.fullName}
                </h2>
                <span className="text-lg font-sans font-light text-white/70">{user.age}</span>
              </div>
              <p className="text-xs text-white/60 flex items-center gap-1 mt-0.5 font-light">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {user.location} • {user.distanceKm} km
              </p>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label="Toggle details"
              className="p-2 rounded-full liquid-glass-pill hover:bg-white/20 text-white/80 transition-all"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Card Content & Taste Profile Highlights */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-black/95 overflow-y-auto custom-scrollbar">
        <div className="space-y-3">
          {/* Compatibility Highlight Pill */}
          <div className="p-2.5 rounded-2xl liquid-glass border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">✨</span>
              <div className="text-xs font-semibold text-rose-300">{compLabel.label}</div>
            </div>
            <span className="text-[11px] text-white/60 font-light truncate max-w-[180px]">
              {user.compatibilityBreakdown?.highlights?.[0] || 'Rất nhiều điểm chung ẩm thực!'}
            </span>
          </div>

          {/* Taste Metrics Row */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl liquid-glass border border-white/10 flex flex-col items-center">
              <span className="text-white/50 text-[10px] font-medium flex items-center gap-1">
                <Flame className="w-3 h-3 text-rose-400" /> Độ cay
              </span>
              <span className="font-bold text-rose-400 mt-0.5">
                {'🌶️'.repeat(Math.min(5, user.tasteProfile.spiciness))}
              </span>
            </div>
            <div className="p-2 rounded-xl liquid-glass border border-white/10 flex flex-col items-center">
              <span className="text-white/50 text-[10px] font-medium flex items-center gap-1">
                <Utensils className="w-3 h-3 text-pink-400" /> Hảo ngọt
              </span>
              <span className="font-bold text-pink-300 mt-0.5">
                {'🍰'.repeat(Math.min(5, user.tasteProfile.sweetness))}
              </span>
            </div>
            <div className="p-2 rounded-xl liquid-glass border border-white/10 flex flex-col items-center">
              <span className="text-white/50 text-[10px] font-medium flex items-center gap-1">
                <Wallet className="w-3 h-3 text-amber-400" /> Ngân sách
              </span>
              <span className="font-bold text-amber-300 mt-0.5">
                {budgetIcons[user.tasteProfile.budget - 1] || '$$'}
              </span>
            </div>
          </div>

          {/* Favorite Cuisines Pills */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-1.5 font-medium">
              Món khoái khẩu &amp; Quán ruột
            </div>
            <div className="flex flex-wrap gap-1.5">
              {user.tasteProfile.favoriteCuisines.slice(0, 4).map((cuisine, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-xs font-medium liquid-glass-pill text-white/90 border border-white/10"
                >
                  🍲 {cuisine}
                </span>
              ))}
            </div>
          </div>

          {/* Expanded Bio & Details */}
          {isExpanded && (
            <div className="pt-2 border-t border-white/10 text-xs text-white/80 space-y-1.5 animate-fade-in">
              <p className="italic text-white/60 font-light">&ldquo;{user.bio}&rdquo;</p>
              <div>
                <span className="text-white/50 font-medium">Không gian yêu thích: </span>
                <span className="text-rose-300">
                  {user.tasteProfile.vibePreferences.join(', ')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
