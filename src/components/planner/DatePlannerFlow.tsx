'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Calendar, 
  Clock, 
  Sparkles, 
  Compass,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import { useCoupleStore } from '@/lib/coupleStore';
import { useChatStore } from '@/store/chatStore';
import { TastePicker } from '@/components/food/TastePicker';
import { DateCard } from '@/components/cards/DateCard';

interface DatePlannerFlowProps {
  partnerName?: string;
  initialCuisine?: string;
  initialLocation?: string;
}

const NO_BUTTON_TEXTS = [
  'Hong đi đâu 😜',
  'Nút này bị kẹt gòii 🙈',
  'Năn nỉ luônn á 🥺',
  'Chỉ được chọn CÓ thuii 💖',
  'Đừng bấm nút này mòoo 🥺',
  'Bấm Có đi anh bao ăn ngon nè! 🍖',
  'Thương anh thì bấm Có nhaaa ✨',
];

function getTomorrowDateStr(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

export const DatePlannerFlow: React.FC<DatePlannerFlowProps> = ({
  partnerName: propPartnerName,
  initialCuisine,
  initialLocation,
}) => {
  const { profile, updateProfile } = useCoupleStore();
  const { sendMessage } = useChatStore();

  const effectivePartnerName = propPartnerName || profile.partnerName || 'em';
  const effectiveSenderName = profile.yourName || 'anh';

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>(() => getTomorrowDateStr());
  const [selectedTime, setSelectedTime] = useState<string>('19:00');
  const [selectedFoods, setSelectedFoods] = useState<string[]>(() =>
    initialCuisine ? [initialCuisine] : ['Lẩu Haidilao / Hot Pot']
  );
  const [customCuisine, setCustomCuisine] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>(() =>
    initialLocation || 'Trung tâm Sài Gòn'
  );
  const specialNote = 'Em chỉ cần chuẩn bị một tâm hồn thật đẹp thôi ❤️';

  // Evasive No button states
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [noIndex, setNoIndex] = useState<number>(0);
  const [noDodges, setNoDodges] = useState<number>(0);

  // Floating hearts reaction
  const [likes, setLikes] = useState<number>(99);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number }[]>([]);

  // Trigger evasive move on No button
  const handleNoHoverOrClick = () => {
    const randomX = Math.floor(Math.random() * 220) - 110;
    const randomY = Math.floor(Math.random() * 160) - 80;
    setNoPosition({ x: randomX, y: randomY });
    setNoIndex((prev) => (prev + 1) % NO_BUTTON_TEXTS.length);
    setNoDodges((prev) => prev + 1);
  };

  const handleFloatingHeart = () => {
    setLikes((prev) => prev + 1);
    const newHeart = { id: Date.now(), left: Math.floor(Math.random() * 80) + 10 };
    setFloatingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);
  };

  const handleAcceptYes = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#F472B6', '#FB7185', '#60A5FA', '#FDE68A'],
      });
    } catch {
      // safe fallback
    }
    setCurrentStep(1);
  };

  const handleFinishPlan = () => {
    try {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#F472B6', '#FB7185', '#60A5FA', '#FDE68A', '#E11D48'],
      });
    } catch {
      // safe fallback
    }

    const combinedCuisine = customCuisine.trim()
      ? (selectedFoods.length > 0 ? `${selectedFoods.join(', ')} & ${customCuisine.trim()}` : customCuisine.trim())
      : (selectedFoods.length > 0 ? selectedFoods.join(', ') : 'Ăn ngon cùng nhau');

    // Update couple profile next date
    updateProfile({
      nextDateDate: selectedDate,
      nextDateTime: selectedTime,
      nextDateLocation: selectedLocation,
    });

    // Send Date Invitation message directly into Couple Chat Stream
    sendMessage({
      sender: 'me',
      senderName: effectiveSenderName,
      text: `💌 [Thiệp mời hẹn hò] Anh mời em đi ăn ${combinedCuisine} vào ngày ${selectedDate} lúc ${selectedTime} tại ${selectedLocation}!`,
      type: 'date_invite',
      invitationData: {
        partnerName: effectivePartnerName,
        senderName: effectiveSenderName,
        dateTime: `${selectedDate} vào lúc ${selectedTime}`,
        dateStr: selectedDate,
        timeStr: selectedTime,
        cuisine: combinedCuisine,
        location: selectedLocation,
        specialNote,
        status: 'pending',
      },
    });

    setCurrentStep(3);
  };

  const currentDisplayCuisine = customCuisine.trim()
    ? (selectedFoods.length > 0 ? `${selectedFoods.join(', ')} + ${customCuisine.trim()}` : customCuisine.trim())
    : (selectedFoods.length > 0 ? selectedFoods.join(', ') : 'Lẩu Haidilao / Hot Pot');

  return (
    <div className="relative w-full max-w-xl mx-auto min-h-[640px] cream-glass rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200/60 bg-[#FFFDFB]/90 flex flex-col justify-between overflow-hidden">
      {/* Floating Hearts Animation layer */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          style={{ left: `${heart.left}%` }}
          className="absolute bottom-16 pointer-events-none text-2xl transition-transform duration-1000 -translate-y-48 opacity-0"
        >
          💖
        </div>
      ))}

      {/* Top Stepper Indicator */}
      <div className="flex items-center justify-between border-b border-rose-200/60 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-mono font-bold text-xs border border-rose-300">
            0{currentStep + 1}
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#886A8B] uppercase font-semibold">
              {currentStep === 0 && 'Step 01 • Lời Ngỏ Hẹn Hò'}
              {currentStep === 1 && 'Step 02 • Thời Gian Hoàn Hảo'}
              {currentStep === 2 && 'Step 03 • Món Khoái Khẩu'}
              {currentStep === 3 && 'Step 04 • VIP Date Pass'}
            </div>
            <div className="font-serif italic text-lg text-[#2D1E2F] font-bold">
              {currentStep === 0 && `Gửi lời mời đến ${effectivePartnerName}`}
              {currentStep === 1 && 'Chọn ngày giờ hoàn hảo'}
              {currentStep === 2 && 'Hôm nay chúng mình ăn gì?'}
              {currentStep === 3 && 'Tấm vé VIP cho buổi hẹn'}
            </div>
          </div>
        </div>

        {/* Floating Heart Reaction Pill */}
        <button
          type="button"
          onClick={handleFloatingHeart}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full cream-glass-pill hover:bg-rose-50 text-rose-600 text-xs font-semibold border border-rose-200 transition-transform active:scale-90 cursor-pointer"
        >
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>{likes}</span>
        </button>
      </div>

      {/* STEP 0: ASK OUT & EVASIVE BUTTON */}
      {currentStep === 0 && (
        <div className="my-auto py-6 text-center space-y-6 animate-fade-in">
          <div className="w-24 h-24 mx-auto rounded-full bg-rose-50 p-1 shadow-xl border-2 border-rose-300 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-rose-400/20 via-pink-400/20 to-amber-300/20 flex items-center justify-center text-4xl">
              💌
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl font-serif italic text-[#2D1E2F] font-bold tracking-tight leading-tight">
              Đi ăn &amp; hẹn hò với anh nhé? 💕
            </h2>
            <p className="text-xs sm:text-sm text-[#715A75] max-w-sm mx-auto font-light leading-relaxed">
              Anh đã chuẩn bị sẵn một danh sách quán ăn ngon đúng gu của {effectivePartnerName} rồi nè! ✨
            </p>
          </div>

          {/* Interactive Dual Action Buttons */}
          <div className="relative min-h-[140px] flex items-center justify-center gap-4 pt-4">
            {/* Yes Button (Grows with dodges) */}
            <button
              type="button"
              onClick={handleAcceptYes}
              style={{ transform: `scale(${1 + Math.min(noDodges * 0.08, 0.4)})` }}
              className="py-3.5 px-8 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-sans font-bold text-sm sm:text-base shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2 border border-white/50 z-10"
            >
              <Sparkles className="w-4 h-4" />
              Cóoo! Đồng ý luôn 💖
            </button>

            {/* Evasive No Button */}
            <button
              type="button"
              onClick={handleNoHoverOrClick}
              onMouseEnter={handleNoHoverOrClick}
              style={{
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              className="py-3 px-5 rounded-full cream-glass-pill hover:bg-rose-50 text-[#715A75] text-xs sm:text-sm font-medium border border-rose-200 shadow-xs select-none cursor-pointer"
            >
              {NO_BUTTON_TEXTS[noIndex]}
            </button>
          </div>
        </div>
      )}

      {/* STEP 1: DATE & TIME SELECTION */}
      {currentStep === 1 && (
        <div className="my-auto py-2 space-y-5 animate-fade-in">
          <div className="text-center space-y-1">
            <h3 className="font-serif italic text-3xl text-[#2D1E2F] font-bold">
              Khi nào chúng mình gặp nhau? 🌸
            </h3>
            <p className="text-xs text-[#715A75] font-light">
              Chọn thời điểm tuyệt vời nhất cho buổi hẹn của hai đứa
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl cream-glass border border-rose-200/70 space-y-2 bg-white/80">
              <label className="text-xs font-semibold text-rose-700 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-rose-500" />
                Ngày Hẹn Hò
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-rose-50/50 border border-rose-200 text-sm font-semibold text-[#2D1E2F] focus:outline-rose-400 shadow-inner"
              />
            </div>

            <div className="p-4 rounded-2xl cream-glass border border-rose-200/70 space-y-2 bg-white/80">
              <label className="text-xs font-semibold text-purple-700 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-500" />
                Giờ Đón
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/50 border border-purple-200 text-sm font-semibold text-[#2D1E2F] focus:outline-purple-400 shadow-inner"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#886A8B] mb-2 font-semibold">
              Gợi ý thời gian lý tưởng:
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Tối nay 19:00 🌙', time: '19:00' },
                { label: 'Thứ 7 lúc 18:30 🍷', time: '18:30' },
                { label: 'Chủ nhật lúc 11:30 🍲', time: '11:30' },
                { label: 'Hoàng hôn 17:00 🌇', time: '17:00' },
              ].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedTime(preset.time)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedTime === preset.time
                      ? 'bg-rose-500 text-white shadow-md border border-rose-400'
                      : 'cream-glass-pill hover:bg-rose-50 text-[#5E4761] border-rose-200/60'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location input */}
          <div className="p-4 rounded-2xl cream-glass border border-rose-200/70 space-y-1.5 bg-white/80">
            <label className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-600" />
              Khu vực dự kiến đón &amp; hẹn hò
            </label>
            <input
              type="text"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              placeholder="VD: Quận 1, Landmark 81, Hồ Bán Nguyệt, Thảo Điền..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-amber-50/40 border border-amber-200/80 text-xs sm:text-sm text-[#2D1E2F] focus:outline-amber-400 shadow-inner"
            />
          </div>

          {/* Bottom navigation */}
          <div className="flex items-center justify-between pt-3">
            <button
              type="button"
              onClick={() => setCurrentStep(0)}
              className="px-4 py-2 text-xs text-[#886A8B] hover:text-[#2D1E2F] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Quay lại
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="py-3 px-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-lg shadow-rose-500/25 hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 border border-white/30 cursor-pointer"
            >
              <span>Tiếp tục chọn món</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: TASTE & CUISINE PICKER */}
      {currentStep === 2 && (
        <div className="my-auto py-2 space-y-4 animate-fade-in">
          <div className="text-center space-y-1">
            <h3 className="font-serif italic text-3xl text-[#2D1E2F] font-bold">
              Hôm nay chúng mình ăn gì? 🍽️
            </h3>
            <p className="text-xs text-[#715A75] font-light">
              Chọn các món khoái khẩu (có thể chọn nhiều món) hoặc nhập quán quen của hai bạn
            </p>
          </div>

          <TastePicker
            selectedFoods={selectedFoods}
            onChangeSelectedFoods={setSelectedFoods}
            customCuisine={customCuisine}
            onChangeCustomCuisine={setCustomCuisine}
          />

          {/* Bottom navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs text-[#886A8B] hover:text-[#2D1E2F] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Quay lại
            </button>
            <button
              type="button"
              onClick={handleFinishPlan}
              className="py-3 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-xs shadow-xl shadow-rose-500/25 hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 border border-white/40 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Hoàn tất &amp; Nhận VIP Date Pass 🎉</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CELEBRATION & VIP DATE PASS */}
      {currentStep === 3 && (
        <div className="my-auto py-2 animate-fade-in">
          <DateCard
            partnerName={effectivePartnerName}
            senderName={effectiveSenderName}
            dateTime={`${selectedDate} vào lúc ${selectedTime}`}
            dateStr={selectedDate}
            timeStr={selectedTime}
            cuisine={currentDisplayCuisine}
            location={selectedLocation}
            specialNote={specialNote}
            onResetPlan={() => setCurrentStep(0)}
          />
        </div>
      )}
    </div>
  );
};

export default DatePlannerFlow;
