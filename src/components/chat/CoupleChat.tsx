'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Heart, 
  Calendar, 
  Smile, 
  Clock,
  Utensils,
  MapPin,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useCouple } from '@/context/CoupleContext';
import { CoupleMessageModel } from '@/types/couple';

const QUICK_STICKERS = ['🥰', '💖', '🍲', '🥩', '🍿', '🌹', '✨', '🥺'];

export const CoupleChat: React.FC = () => {
  const { currentUser, partner, couple, messages, sendMessage } = useCouple();

  const [inputContent, setInputContent] = useState('');
  const [showStickers, setShowStickers] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim() || isSending) return;

    try {
      setIsSending(true);
      const text = inputContent.trim();
      setInputContent('');
      await sendMessage(text, 'text');
    } finally {
      setIsSending(false);
    }
  };

  const handleSendSticker = async (sticker: string) => {
    setShowStickers(false);
    await sendMessage(sticker, 'sticker');
  };

  return (
    <div className="w-full max-w-2xl mx-auto cream-glass-card rounded-[2.5rem] border-2 border-rose-300 shadow-2xl overflow-hidden flex flex-col h-[680px]">
      {/* ── Dynamic Chat Header ── */}
      <div className="px-6 py-4 bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border-b border-rose-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center font-serif font-bold text-lg shadow-md overflow-hidden">
              {partner.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={partner.avatarUrl} alt={partner.fullName} className="w-full h-full object-cover" />
              ) : (
                '💕'
              )}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-serif font-bold text-lg text-[#4A1D2F]">
                {partner.fullName}
              </h3>
              <span className="text-[10px] font-mono font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                Đang trực tuyến
              </span>
            </div>
            <span className="text-[11px] text-[#886A8B] block">
              Mã ghép đôi: <strong className="font-mono text-[#831843]">{couple.coupleCode || 'LOVE-520'}</strong>
            </span>
          </div>
        </div>

        <Link
          href="/date-planner"
          className="px-3.5 py-1.5 rounded-full bg-white border border-rose-200 text-[#831843] text-xs font-bold shadow-xs hover:bg-rose-50 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-rose-500" />
          <span>Gửi vé hẹn hò</span>
        </Link>
      </div>

      {/* ── Realtime Messages Stream ── */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar bg-[#FFFDF9]/60">
        {messages.map((msg: CoupleMessageModel) => {
          const isMe = msg.senderId === currentUser.id;
          const timeFormatted = new Date(msg.createdAt).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fadeIn`}
            >
              <span className="text-[10px] text-[#886A8B] font-medium px-1 mb-1">
                {isMe ? currentUser.fullName : (msg.senderName || partner.fullName)} • {timeFormatted}
              </span>

              {msg.type === 'date_invite' && msg.invitationData ? (
                <div className="w-full max-w-sm rounded-3xl p-4 bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-300 shadow-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center">
                      <Heart className="w-4 h-4 fill-white" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase font-bold text-rose-600 tracking-wider">
                        VIP Date Invitation
                      </span>
                      <h4 className="font-serif font-bold text-sm text-[#4A1D2F]">
                        Buổi Hẹn Hò Ngọt Ngào 💌
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs bg-white/80 p-3 rounded-2xl border border-rose-200/80">
                    <div className="flex items-center gap-1.5 text-[#2D1E2F]">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{msg.invitationData.dateTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#2D1E2F]">
                      <Utensils className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <strong className="text-rose-700">{msg.invitationData.cuisine}</strong>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#2D1E2F]">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{msg.invitationData.location}</span>
                    </div>
                  </div>

                  <Link
                    href="/date-planner"
                    className="w-full py-2 rounded-full bg-rose-500 text-white text-xs font-bold text-center block hover:bg-rose-600 transition-colors shadow-xs"
                  >
                    Xem chi tiết vé VIP ➔
                  </Link>
                </div>
              ) : msg.type === 'sticker' ? (
                <div className="text-5xl py-1 animate-bounce" style={{ animationDuration: '2.5s' }}>
                  {msg.content}
                </div>
              ) : (
                <div
                  className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed max-w-[82%] shadow-sm ${
                    isMe
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-br-xs'
                      : 'bg-white border border-rose-200 text-[#2D1E2F] rounded-bl-xs'
                  }`}
                >
                  {msg.content}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Quick Stickers Drawer ── */}
      {showStickers && (
        <div className="p-2 border-t border-rose-200 bg-rose-50/80 flex items-center justify-around animate-fadeIn">
          {QUICK_STICKERS.map((stk, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendSticker(stk)}
              className="text-2xl p-1.5 hover:scale-125 active:scale-95 transition-transform cursor-pointer"
            >
              {stk}
            </button>
          ))}
        </div>
      )}

      {/* ── Chat Input Bar ── */}
      <form
        onSubmit={handleFormSubmit}
        className="p-3 sm:p-4 border-t border-rose-200 bg-white/90 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => setShowStickers(!showStickers)}
          className={`p-2 rounded-full border transition-colors cursor-pointer ${
            showStickers
              ? 'bg-rose-100 border-rose-300 text-rose-700'
              : 'border-rose-200 text-[#715A75] hover:bg-rose-50'
          }`}
        >
          <Smile className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          placeholder={`Nhắn tin cho ${partner.fullName}...`}
          className="flex-1 px-4 py-2.5 rounded-full bg-rose-50/50 border border-rose-200 text-xs sm:text-sm text-[#2D1E2F] focus:outline-rose-400 placeholder:text-[#A08DA3] shadow-inner font-medium"
        />

        <button
          type="submit"
          disabled={!inputContent.trim() || isSending}
          className="p-2.5 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-md disabled:opacity-40 flex items-center gap-1.5 hover:opacity-95 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Gửi</span>
        </button>
      </form>
    </div>
  );
};

export default CoupleChat;
