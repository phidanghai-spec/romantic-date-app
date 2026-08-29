'use client';

import React from 'react';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { MessageCircleHeart } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden pb-24 md:pb-12">
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Page Title */}
        <section className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-mono tracking-wider uppercase border border-rose-300 font-bold">
            <MessageCircleHeart className="w-3.5 h-3.5 text-rose-600" />
            <span>Private Couple Space</span>
          </div>

          <h1 className="font-serif-italic text-4xl sm:text-5xl text-[#2D1E2F] font-bold">
            Góc Trò Chuyện Riêng Tư 💕
          </h1>
          <p className="text-xs sm:text-sm text-[#715A75] font-light max-w-md mx-auto">
            Nhắn gửi yêu thương, chia sẻ cảm xúc và xác nhận các lời mời hẹn hò trong không gian 100% bảo mật cho 2 người.
          </p>
        </section>

        {/* Realtime Couple Chat Hub */}
        <section className="w-full">
          <ChatContainer />
        </section>
      </main>
    </div>
  );
}
