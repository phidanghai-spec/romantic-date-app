'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Sparkles, CalendarHeart, X, Heart } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export const MatchModal: React.FC = () => {
  const router = useRouter();
  const { matchedUserModal, currentUser, closeMatchModal } = useAppStore();

  useEffect(() => {
    if (matchedUserModal) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F472B6', '#FB7185', '#60A5FA', '#FDE68A'],
        });
      } catch (err) {
        console.error('Confetti error:', err);
      }
    }
  }, [matchedUserModal]);

  if (!matchedUserModal) return null;

  const { user, match } = matchedUserModal;

  const goToPlanner = () => {
    closeMatchModal();
    router.push(`/date-planner?partnerId=${user.id}&partnerName=${encodeURIComponent(user.fullName)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-[#FFFDF9] rounded-3xl p-7 shadow-2xl border-2 border-rose-300 text-center overflow-hidden text-[#2D1E2F]">
        {/* Close Button */}
        <button
          onClick={closeMatchModal}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-rose-100 text-[#715A75] hover:text-[#2D1E2F] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Floating Sparkles & Title */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-mono tracking-wider uppercase mb-3 border border-rose-300 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>It&apos;s a Taste Match!</span>
        </div>

        <h3 className="font-serif-italic text-4xl text-[#2D1E2F] font-bold">
          Hai Bạn Đã Khớp Gu! 🎉
        </h3>
        <p className="text-xs text-[#715A75] mt-1 font-light">
          Độ tương đồng khẩu vị &amp; phong cách hẹn hò lên đến{' '}
          <strong className="text-rose-600 font-bold text-sm font-sans">{match.compatibilityScore}%</strong>
        </p>

        {/* Dual Avatars with Pulsing Heart */}
        <div className="my-6 flex items-center justify-center gap-4">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.fullName}
              className="w-18 h-18 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-rose-400"
            />
            <span className="absolute bottom-0 right-0 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white font-mono">
              Bạn
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md animate-pulse">
            <Heart className="w-5 h-5 fill-white" />
          </div>

          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="w-18 h-18 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-rose-400"
            />
            <span className="absolute bottom-0 right-0 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white font-mono">
              {match.compatibilityScore}%
            </span>
          </div>
        </div>

        {/* Highlights Pill */}
        <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/70 shadow-xs mb-6 text-left space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-widest text-rose-700 font-bold">
            Điểm chung nổi bật:
          </div>
          {match.compatibilityBreakdown.highlights.slice(0, 2).map((item, idx) => (
            <div key={idx} className="text-xs text-[#4A3B4E] font-medium flex items-center gap-1.5">
              <span className="text-rose-500">✦</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <button
          onClick={goToPlanner}
          className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-xs shadow-md shadow-rose-500/25 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/40 cursor-pointer"
        >
          <CalendarHeart className="w-4 h-4" />
          <span>Lên Lịch Hẹn Hò 4 Bước Ngay 💌</span>
        </button>
      </div>
    </div>
  );
};
