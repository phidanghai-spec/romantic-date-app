'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, Clock, Utensils, MapPin, Check, X, Heart } from 'lucide-react';
import { DateInvitation } from '@/types';
import { useAppStore } from '@/lib/store';

interface DateInviteCardProps {
  invitation: DateInvitation;
  isSender: boolean;
}

export const DateInviteCard: React.FC<DateInviteCardProps> = ({ invitation, isSender }) => {
  const { respondToInvitation } = useAppStore();
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>(invitation.status);

  const handleAccept = () => {
    setStatus('accepted');
    respondToInvitation(invitation.id, 'accepted');
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleDecline = () => {
    setStatus('declined');
    respondToInvitation(invitation.id, 'declined');
  };

  return (
    <div className="w-full max-w-sm my-2 rounded-3xl overflow-hidden liquid-glass shadow-2xl border border-white/20 bg-gradient-to-br from-white/10 via-black/80 to-black text-white p-4 sm:p-5 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-rose-300">
            VIP Date Invitation
          </span>
        </div>
        {status === 'accepted' && (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold flex items-center gap-1 border border-emerald-500/30">
            <Check className="w-3 h-3" /> Đã chấp nhận
          </span>
        )}
        {status === 'declined' && (
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/50 text-[10px] font-medium">
            Đã từ chối
          </span>
        )}
        {status === 'pending' && (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-400/30 animate-pulse">
            Chờ phản hồi
          </span>
        )}
      </div>

      {/* Details */}
      <div className="liquid-glass rounded-2xl p-3.5 space-y-2 text-xs border border-white/10">
        <div className="flex items-center gap-2 font-serif-italic text-lg text-white">
          <Utensils className="w-4 h-4 text-rose-400" />
          <span>{invitation.cuisine}</span>
        </div>
        <div className="flex items-center gap-2 text-white/70 text-xs font-light">
          <Clock className="w-3.5 h-3.5 text-white/50" />
          <span>{invitation.dateTime}</span>
        </div>
        {invitation.location && (
          <div className="flex items-center gap-2 text-white/70 text-xs font-light">
            <MapPin className="w-3.5 h-3.5 text-white/50" />
            <span>{invitation.location}</span>
          </div>
        )}
        {invitation.specialMessage && (
          <p className="text-[11px] italic text-white/60 pt-1.5 border-t border-white/10 font-light">
            &ldquo;{invitation.specialMessage}&rdquo;
          </p>
        )}
      </div>

      {/* Interactive Response Buttons (If recipient & pending) */}
      {!isSender && status === 'pending' && (
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleAccept}
            className="py-2.5 px-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 border border-white/20"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Đồng ý đi 💖</span>
          </button>
          <button
            onClick={handleDecline}
            className="py-2.5 px-3 rounded-full liquid-glass-pill hover:bg-white/10 text-white/60 font-medium text-xs active:scale-95 transition-all flex items-center justify-center gap-1 border border-white/10"
          >
            <X className="w-3.5 h-3.5" />
            <span>Bận mất rồi</span>
          </button>
        </div>
      )}
    </div>
  );
};
