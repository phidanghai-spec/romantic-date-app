'use client';

import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Clock, Utensils, MapPin, Check, X, Heart } from 'lucide-react';
import { DateInvitationPayload, useChatStore } from '@/store/chatStore';
import { useCoupleStore } from '@/lib/coupleStore';

interface DateInviteCardProps {
  messageId: string;
  invitation: DateInvitationPayload;
  isSender: boolean;
}

export const DateInviteCard: React.FC<DateInviteCardProps> = ({
  messageId,
  invitation,
  isSender,
}) => {
  const { respondToInvitation } = useChatStore();
  const { updateProfile } = useCoupleStore();
  const status = invitation.status || 'pending';

  const handleAccept = () => {
    respondToInvitation(messageId, 'accepted');
    // Update couple's next date
    if (invitation.dateStr) {
      updateProfile({
        nextDateDate: invitation.dateStr,
        nextDateTime: invitation.timeStr || '19:00',
        nextDateLocation: invitation.location,
      });
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#FB7185', '#60A5FA', '#FDE68A'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleDecline = () => {
    respondToInvitation(messageId, 'declined');
  };

  return (
    <div className="w-full max-w-sm my-2 rounded-3xl overflow-hidden shadow-2xl border border-rose-200/80 bg-white/95 text-[#2D1E2F] p-4 sm:p-5 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-rose-100 pb-2.5">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-rose-600 font-bold">
            VIP Date Invitation
          </span>
        </div>
        {status === 'accepted' && (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-1 border border-emerald-300">
            <Check className="w-3 h-3" /> Đã đồng ý
          </span>
        )}
        {status === 'declined' && (
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-medium border border-slate-200">
            Đã từ chối
          </span>
        )}
        {status === 'pending' && (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300 animate-pulse">
            Chờ phản hồi
          </span>
        )}
      </div>

      {/* Details */}
      <div className="rounded-2xl p-3.5 space-y-2 text-xs bg-rose-50/50 border border-rose-100">
        <div className="flex items-center gap-2 font-serif text-base font-bold text-[#4A1D2F]">
          <Utensils className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{invitation.cuisine}</span>
        </div>
        <div className="flex items-center gap-2 text-[#715A75] text-xs font-light">
          <Clock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>{invitation.dateTime}</span>
        </div>
        {invitation.location && (
          <div className="flex items-center gap-2 text-[#715A75] text-xs font-light">
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>{invitation.location}</span>
          </div>
        )}
        {invitation.specialNote && (
          <p className="text-[11px] italic text-[#886A8B] pt-1.5 border-t border-rose-100/80 font-light">
            &ldquo;{invitation.specialNote}&rdquo;
          </p>
        )}
      </div>

      {/* Interactive Response Buttons (If recipient & pending) */}
      {!isSender && status === 'pending' && (
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleAccept}
            className="py-2.5 px-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 border border-white/20 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Đồng ý đi 💖</span>
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="py-2.5 px-3 rounded-full bg-rose-100 hover:bg-rose-200 text-[#715A75] font-medium text-xs active:scale-95 transition-all flex items-center justify-center gap-1 border border-rose-200 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Bận mất rồi</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DateInviteCard;
