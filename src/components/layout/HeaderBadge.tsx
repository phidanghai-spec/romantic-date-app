'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { Heart, Settings2 } from 'lucide-react';
import { useCoupleStore } from '@/lib/coupleStore';
import { CoupleProfileModal } from '@/components/modals/CoupleProfileModal';

function useIsHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export const HeaderBadge: React.FC = () => {
  const isHydrated = useIsHydrated();
  const { profile, getDaysTogether } = useCoupleStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const datingDays = getDaysTogether();
  const displayDays = isHydrated ? datingDays : 520;
  const displayName = isHydrated
    ? `${profile.yourName.split(' ')[0]} & ${profile.partnerName.split(' ')[0]}`
    : 'Bạn & Người thương';

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white text-xs font-semibold drop-shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer select-none"
        title="Mở hồ sơ & ngày kỷ niệm cặp đôi"
      >
        <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300 animate-pulse shrink-0" />
        <span suppressHydrationWarning className="truncate max-w-[200px] sm:max-w-xs">
          {displayName} • {displayDays} Ngày 💕
        </span>
        <Settings2 className="w-3.5 h-3.5 text-white/70 ml-0.5 shrink-0" />
      </button>

      <CoupleProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default HeaderBadge;
