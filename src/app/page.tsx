"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Calendar,
  Clock,
  Utensils,
  Sparkles,
  ChevronLeft,
  Search,
  MessageCircle,
  Share2,
  Wifi,
  Battery,
  Signal,
  Check,
  Plus
} from "lucide-react";
import confetti from "canvas-confetti";

interface Mission {
  id: number;
  name: string;
  emoji: string;
}

interface FoodOption {
  name: string;
  emoji: string;
}

export default function RomanticDateApp() {
  const [currentStep, setCurrentStep] = useState(0); // 0: Ask Out, 1: Date/Time, 2: Food, 3: Celebration
  const [selectedFood, setSelectedFood] = useState<string>("");
  const [isCustomFood, setIsCustomFood] = useState(false);
  const [customFoodText, setCustomFoodText] = useState("");
  
  const [selectedDate, setSelectedDate] = useState("2026-06-13"); // Default: YYYY-MM-DD
  const [selectedTime, setSelectedTime] = useState("20:10"); // Default: HH:MM

  // Ask Out evasion variables
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonText, setNoButtonText] = useState("Không 😢");
  const [noClicks, setNoClicks] = useState(0);
  
  // Interactive like count
  const [likes, setLikes] = useState(31500);
  const [hasLiked, setHasLiked] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const heartIdCounter = useRef(0);

  // Real-time device clock
  const [deviceTime, setDeviceTime] = useState("23:24");

  useEffect(() => {
    // Set current time for device status bar
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setDeviceTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedDate = localStorage.getItem("romantic_date");
    const savedTime = localStorage.getItem("romantic_time");
    const savedFood = localStorage.getItem("romantic_food");
    const savedStep = localStorage.getItem("romantic_step");

    if (savedDate) setSelectedDate(savedDate);
    if (savedTime) setSelectedTime(savedTime);
    if (savedFood) {
      setSelectedFood(savedFood);
      // Check if it's custom food
      const defaultFoods = ["Jollibee", "Ramen", "Hot Pot", "BBQ"];
      if (savedFood && !defaultFoods.includes(savedFood)) {
        setIsCustomFood(true);
        setCustomFoodText(savedFood);
      }
    }
    if (savedStep) {
      const step = parseInt(savedStep, 10);
      if (step >= 0 && step <= 3) {
        setCurrentStep(step);
        if (step === 3) {
          // Trigger confetti on page mount if already on celebration screen
          setTimeout(() => triggerConfetti(), 500);
        }
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("romantic_date", selectedDate);
    localStorage.setItem("romantic_time", selectedTime);
    localStorage.setItem("romantic_food", selectedFood);
    localStorage.setItem("romantic_step", String(currentStep));
  }, [selectedDate, selectedTime, selectedFood, currentStep]);

  const missions: Mission[] = [
    { id: 1, name: "Ask Out", emoji: "❤️" },
    { id: 2, name: "Pick a Time", emoji: "⏰" },
    { id: 3, name: "Food Mission", emoji: "🍽️" },
    { id: 4, name: "Confirm", emoji: "💕" }
  ];

  const foodOptions: FoodOption[] = [
    { name: "Jollibee", emoji: "🍗" },
    { name: "Ramen", emoji: "🍜" },
    { name: "Hot Pot", emoji: "🍲" },
    { name: "BBQ", emoji: "🥩" }
  ];

  const handleFoodSelect = (foodName: string) => {
    setIsCustomFood(false);
    setSelectedFood(foodName);
  };

  const handleCustomFoodSelect = () => {
    setIsCustomFood(true);
    setSelectedFood(customFoodText || "Món ăn đặc biệt");
  };

  const handleCustomFoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomFoodText(val);
    if (isCustomFood) {
      setSelectedFood(val || "Món ăn đặc biệt");
    }
  };

  const handleNoClickOrHover = () => {
    const noMessages = [
      "Không 😢",
      "Hông cho chọn đâu nha! 😜",
      "Nha nha nha... đi mà 🥺",
      "Đi chơi đi, vui cực! 🎉",
      "Sao vẫn click thế kia 😢",
      "Thôi mà, đồng ý đi mà! ❤️",
      "Năn nỉ đóooo 🙏",
      "Chỉ được chọn Có thui 💖"
    ];
    // Generate random translations in pixels (within -90px to 90px)
    const randomX = Math.random() * 180 - 90;
    const randomY = Math.random() * 180 - 90;
    setNoButtonPosition({ x: randomX, y: randomY });
    
    const nextClickCount = noClicks + 1;
    setNoClicks(nextClickCount);
    setNoButtonText(noMessages[nextClickCount % noMessages.length]);
  };

  const handleYes = () => {
    triggerConfetti();
    setCurrentStep(1);
    setNoButtonPosition({ x: 0, y: 0 });
    setNoButtonText("Không 😢");
    setNoClicks(0);
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (selectedFood) {
        setCurrentStep(3);
        triggerConfetti();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 3) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedFood("");
    setIsCustomFood(false);
    setCustomFoodText("");
    setNoButtonPosition({ x: 0, y: 0 });
    setNoButtonText("Không 😢");
    setNoClicks(0);
    localStorage.removeItem("romantic_date");
    localStorage.removeItem("romantic_time");
    localStorage.removeItem("romantic_food");
    localStorage.removeItem("romantic_step");
  };

  const triggerConfetti = () => {
    // Primary burst
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#ec4899", "#f43f5e", "#ff8da1", "#c084fc", "#ffd700"]
    });

    // Hearts and secondary bursts
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 20 * (timeLeft / duration);
      // Confetti bursts from random coordinates
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ec4899", "#ff8da1"]
      }));
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#f43f5e", "#c084fc"]
      }));
    }, 250);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }

    // Spawn floating heart effect inside the phone screen
    const id = heartIdCounter.current++;
    const x = Math.random() * 80 + 10; // Random percentage position
    const y = 80;
    setFloatingHearts((prev) => [...prev, { id, x, y }]);

    // Remove heart after animation finishes
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
    }, 2000);
  };

  // Format date display (parsed in local timezone to avoid offset issues)
  const formatDateString = (dateStr: string) => {
    if (!dateStr) return "Saturday, June 13";
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const date = new Date(year, month, day);
        
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        
        const dayName = days[date.getDay()];
        const monthName = months[date.getMonth()];
        return `${dayName}, ${monthName} ${day}`;
      }
      return dateStr;
    } catch (e) {
      return dateStr;
    }
  };

  // Format date for display in input
  const displayDateInput = selectedDate;

  // Copy shareable details to clipboard
  const [showShareToast, setShowShareToast] = useState(false);

  const fallbackCopy = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      return false;
    }
  };

  const handleShare = () => {
    const formattedDate = formatDateString(selectedDate);
    const textToCopy = `🎀 KẾ HOẠCH HẸN HÒ HOÀN HẢO CỦA CHÚNG MÌNH 🎀\n\n📅 Ngày: ${formattedDate}\n🕰️ Giờ: ${selectedTime}\n🍽️ Món ăn: ${selectedFood || "Jollibee 🍗"}\n\nKế hoạch đã sẵn sàng rồi! Bạn yêu ơi hãy chuẩn bị tinh thần đi chơi nhé! 💕✨`;
    
    const showSuccess = () => {
      setShowShareToast(true);
      triggerConfetti();
      setTimeout(() => setShowShareToast(false), 3000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy)
        .then(showSuccess)
        .catch(() => {
          fallbackCopy(textToCopy);
          showSuccess(); // Trigger toast & confetti for UX feedback regardless
        });
    } else {
      fallbackCopy(textToCopy);
      showSuccess(); // Trigger toast & confetti for UX feedback regardless
    }
  };

  // Determine progress bar percentage and width
  const getProgressWidth = () => {
    if (currentStep === 0) return "10%";
    if (currentStep === 1) return "40%";
    if (currentStep === 2) return "75%";
    return "100%";
  };

  const getProgressPercentageText = () => {
    if (currentStep === 0) return "10%";
    if (currentStep === 1) return "40%";
    if (currentStep === 2) return "75%";
    return "100%";
  };

  // Determine which missions are completed based on steps
  const getMissionStatus = (index: number) => {
    if (currentStep === 3) return "completed"; // On celebration, everything is complete
    
    // Mission 0: Ask Out
    if (index === 0) {
      if (currentStep === 0) return "current";
      return "completed";
    }
    
    // Mission 1: Pick a Time
    if (index === 1) {
      if (currentStep === 1) return "current";
      return currentStep > 1 ? "completed" : "locked";
    }
    
    // Mission 2: Food Mission
    if (index === 2) {
      if (currentStep === 2) return "current";
      return currentStep > 2 ? "completed" : "locked";
    }
    
    // Mission 3: Confirm
    if (index === 3) {
      return "locked";
    }
    
    return "locked";
  };

  return (
    <div className="min-h-screen py-8 px-4 flex flex-col items-center justify-center select-none overflow-x-hidden">
      
      {/* Decorative Floating Hearts in Page Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[5%] text-pink-200/20 text-7xl animate-float-slow delay-100">❤️</div>
        <div className="absolute top-[40%] right-[8%] text-purple-200/20 text-8xl animate-float-slow delay-300">💖</div>
        <div className="absolute bottom-[15%] left-[12%] text-rose-200/20 text-6xl animate-float-slow delay-500">💝</div>
        <div className="absolute bottom-[45%] right-[20%] text-pink-200/20 text-7xl animate-float-slow">💕</div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[420px] mx-auto flex flex-col items-center">
        
        {/* Mobile Phone Frame Mockup */}
        <div className="relative w-full bg-slate-950 rounded-[44px] shadow-[0_25px_60px_-15px_rgba(236,72,153,0.3)] border-[12px] border-slate-900 overflow-hidden flex flex-col aspect-[9/19]">
          
          {/* Real-time Status Bar */}
          <div className="bg-slate-950 text-white/90 px-8 pt-3 pb-2 flex justify-between items-center text-xs font-semibold select-none z-20">
            <span>{deviceTime}</span>
            {/* Dynamic camera notch simulation */}
            <div className="absolute left-1/2 -translate-x-1/2 top-3 w-28 h-5 bg-slate-900 rounded-full border border-slate-800 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-sky-950/80 rounded-full mr-2 border border-sky-800/20"></div>
              <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
            </div>
            <div className="flex items-center gap-1.5 opacity-80">
              <Signal className="w-3.5 h-3.5 fill-current" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <Battery className="w-4 h-4 rotate-0" />
              </div>
            </div>
          </div>

          {/* Social Platform Top Bar / Search Bar */}
          <div className="bg-slate-950 border-b border-white/5 px-4 py-3 flex items-center gap-2 z-20 shadow-md">
            <button 
              onClick={handleBack}
              disabled={currentStep <= 1 || currentStep === 3}
              className={`p-1 rounded-full transition-all ${
                currentStep > 1 && currentStep < 3 
                  ? "text-pink-400 hover:bg-white/10 active:scale-95" 
                  : "text-white/20 cursor-not-allowed"
              }`}
              title="Quay lại"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                readOnly
                placeholder="Tìm nội dung liên quan"
                className="w-full bg-white/10 text-white placeholder-white/40 rounded-full py-1.5 pl-9 pr-4 text-xs border border-white/5 focus:outline-none focus:border-pink-500/50 cursor-default"
              />
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            
            <button className="text-white font-semibold text-xs px-3 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full active:scale-95 hover:brightness-110 transition-all">
              Tìm kiếm
            </button>
          </div>

          {/* Scrolling Screen Area */}
          <div className="flex-1 flex flex-col bg-gradient-to-b from-pink-50/90 via-white to-purple-50/90 overflow-hidden relative">
            
            {/* Embedded Floating Hearts on Click Effect */}
            {floatingHearts.map((heart) => (
              <div
                key={heart.id}
                className="absolute text-3xl text-rose-500/80 pointer-events-none select-none z-30"
                style={{
                  left: `${heart.x}%`,
                  bottom: `100px`,
                  animation: "floatUp 2.5s ease-out forwards"
                }}
              >
                ❤️
              </div>
            ))}

            {/* Mission Progress Bar Section */}
            <div className="px-5 pt-5 pb-4 bg-white border-b border-pink-100/60 shadow-sm z-10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                {missions.map((mission, idx) => {
                  const status = getMissionStatus(idx);
                  return (
                    <div key={mission.id} className="flex flex-col items-center gap-1 flex-1 relative">
                      {/* Connection Line */}
                      {idx < missions.length - 1 && (
                        <div className="absolute top-4 left-[60%] right-[-40%] h-0.5 bg-gray-200 -z-0">
                          <div 
                            className="h-full bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-500" 
                            style={{ 
                              width: status === "completed" || getMissionStatus(idx + 1) === "completed" ? "100%" : "0%" 
                            }}
                          ></div>
                        </div>
                      )}

                      {/* Badge Circle */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-md transition-all duration-300 relative z-10 ${
                          status === "completed"
                            ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white ring-2 ring-pink-200"
                            : status === "current"
                            ? "bg-white text-pink-600 border-2 border-pink-500 animate-pulse"
                            : "bg-slate-100 text-slate-400 border border-slate-200"
                        }`}
                      >
                        {status === "completed" ? (
                          <Check className="w-4 h-4 stroke-[3px]" />
                        ) : (
                          <span>{mission.id}</span>
                        )}
                      </div>
                      
                      <span className="text-[10px] font-semibold text-gray-500 text-center tracking-tight">
                        {mission.emoji} {mission.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar Indicator Percentage */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-pink-500 font-semibold px-0.5">
                  <span>Hoàn thành hành trình</span>
                  <span>
                    {getProgressPercentageText()}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500 rounded-full"
                    style={{
                      width: getProgressWidth()
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Dynamic Step Viewports */}
            <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col justify-start custom-scrollbar">
              
              {/* STEP 0: ASK OUT */}
              {currentStep === 0 && (
                <div className="space-y-6 flex-1 flex flex-col justify-center items-center animate-fade-in text-center py-4">
                  <div className="space-y-4 my-auto">
                    {/* Cute bouncing hearts/couple animation */}
                    <div className="text-7xl animate-bounce-slow">🥺👉👈</div>
                    
                    <h2 className="text-2xl font-black text-gray-800 leading-snug px-2">
                      Bạn đi chơi với mình nhé? ❤️
                    </h2>
                    
                    <p className="text-sm text-pink-600 font-semibold italic">
                      Tớ đã chuẩn bị một hành trình siêu thú vị cho chúng mình rồi á!
                    </p>

                    <div className="flex flex-col gap-4 justify-center items-center pt-8 relative min-h-[120px]">
                      {/* Yes Button */}
                      <button
                        onClick={handleYes}
                        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-md hover:shadow-lg active:scale-95 transition-all text-sm z-10 animate-pulse"
                      >
                        Đồng ý liền! 💖
                      </button>

                      {/* No Button (Evading) */}
                      <button
                        onMouseEnter={handleNoClickOrHover}
                        onClick={handleNoClickOrHover}
                        style={{
                          transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                          transition: "all 0.2s ease"
                        }}
                        className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-full font-bold transition-all text-xs border border-slate-300 shadow-sm"
                      >
                        {noButtonText}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: DATE & TIME */}
              {currentStep === 1 && (
                <div className="space-y-6 flex-1 flex flex-col justify-between animate-fade-in">
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-gray-800 text-center leading-snug px-2">
                      When should our adventure begin? 🌸
                    </h2>

                    <div className="space-y-4">
                      {/* Date Picker Card */}
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 hover:border-pink-300 transition-all">
                        <label className="text-xs font-bold text-pink-500 tracking-wide flex items-center gap-2 mb-2 uppercase">
                          <Calendar className="w-4 h-4 text-pink-500" />
                          Pick a date 📅
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={displayDateInput}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full px-4 py-2.5 bg-pink-50/50 hover:bg-pink-50 text-gray-800 font-semibold border border-pink-100 hover:border-pink-300 focus:border-pink-500 rounded-xl focus:outline-none transition-all cursor-pointer text-sm"
                          />
                        </div>
                      </div>

                      {/* Time Picker Card */}
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 hover:border-pink-300 transition-all">
                        <label className="text-xs font-bold text-purple-500 tracking-wide flex items-center gap-2 mb-2 uppercase">
                          <Clock className="w-4 h-4 text-purple-500" />
                          Choose a time 🕰️
                        </label>
                        <div className="relative">
                          <input
                            type="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="w-full px-4 py-2.5 bg-purple-50/50 hover:bg-purple-50 text-gray-800 font-semibold border border-purple-100 hover:border-purple-300 focus:border-purple-500 rounded-xl focus:outline-none transition-all cursor-pointer text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <p className="text-center text-pink-600/90 text-sm font-semibold italic flex items-center justify-center gap-1.5">
                      Perfect! I'll save that special moment 💜
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 2: FOOD SELECTION */}
              {currentStep === 2 && (
                <div className="space-y-5 flex-1 flex flex-col justify-between animate-fade-in">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 text-center leading-snug px-1">
                      Most important question... what should we eat? 😍
                    </h2>

                    {/* Food Cards Grid */}
                    <div className="grid grid-cols-2 gap-3.5">
                      {foodOptions.map((food, idx) => {
                        const isSelected = selectedFood === food.name && !isCustomFood;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleFoodSelect(food.name)}
                            className={`p-4 rounded-2xl font-bold text-center flex flex-col items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 ${
                              isSelected
                                ? "bg-gradient-to-br from-pink-500/10 to-rose-500/10 border-3 border-pink-500 shadow-md scale-102"
                                : "bg-white border-2 border-slate-100 hover:border-pink-200 hover:shadow-sm"
                            }`}
                          >
                            <span className="text-4.5xl animate-bounce-slow" style={{ animationDelay: `${idx * 0.1}s` }}>
                              {food.emoji}
                            </span>
                            <span className={`text-xs ${isSelected ? "text-pink-600 font-extrabold" : "text-gray-700"}`}>
                              {food.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Food Option Addition */}
                    <div className={`mt-3 p-3.5 rounded-2xl border transition-all duration-300 ${
                      isCustomFood 
                        ? "bg-gradient-to-br from-pink-500/5 to-purple-500/5 border-pink-300 shadow-sm" 
                        : "bg-white border-slate-100"
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                          💡 Suggest custom food
                        </span>
                        <input
                          type="checkbox"
                          checked={isCustomFood}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleCustomFoodSelect();
                            } else {
                              setSelectedFood("");
                              setIsCustomFood(false);
                            }
                          }}
                          className="w-4.5 h-4.5 accent-pink-500 rounded cursor-pointer"
                        />
                      </div>
                      
                      <div className={`flex gap-1.5 transition-all duration-300 ${
                        isCustomFood ? "opacity-100 max-h-12" : "opacity-50 pointer-events-none max-h-0 overflow-hidden"
                      }`}>
                        <input
                          type="text"
                          value={customFoodText}
                          onChange={handleCustomFoodChange}
                          placeholder="E.g., Sushi 🍣, Pizza 🍕..."
                          className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500 font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    {selectedFood && (
                      <p className="text-center text-rose-500 text-sm font-semibold italic animate-pulse">
                        Excellent choice, future food critic! ❤️
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3: CELEBRATION */}
              {currentStep === 3 && (
                <div className="space-y-5 flex-1 flex flex-col justify-between animate-fade-in text-center">
                  <div className="space-y-4">
                    {/* Pulsing couple icon with absolute badges */}
                    <div className="relative w-44 h-44 mx-auto my-3 flex items-center justify-center">
                      {/* Gradient glowing rings background */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500 opacity-20 blur-xl animate-pulse-slow"></div>
                      
                      <div className="w-36 h-36 rounded-full border-4 border-white shadow-lg bg-gradient-to-tr from-pink-400 via-rose-400 to-purple-500 flex items-center justify-center animate-pulse-slow relative z-10">
                        <span className="text-7.5xl filter drop-shadow-md select-none">💑</span>
                      </div>

                      {/* Staggered bouncing details around circle */}
                      <div className="absolute top-2 -right-3 text-3.5xl animate-bounce-slow">✨</div>
                      <div className="absolute -bottom-1 -left-2 text-3.5xl animate-bounce-delayed-1">🎉</div>
                      <div className="absolute top-1/2 -left-6 text-3xl animate-float-slow">💖</div>
                      <div className="absolute -top-3 left-1/3 text-3xl animate-bounce-delayed-2">🎈</div>
                    </div>

                    {/* Celebration Header */}
                    <div className="space-y-1">
                      <h1 className="text-3.5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 tracking-wide font-serif italic drop-shadow-sm">
                        IT'S A DATE!!!
                      </h1>
                      <div className="flex justify-center items-center gap-1.5 text-2xl text-red-500">
                        <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />
                        <span>🎉</span>
                      </div>
                    </div>

                    {/* Romantic Message */}
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-slate-800">I can't wait to see you.</p>
                      <p className="text-sm text-pink-600 font-bold italic">
                        Thank you for saying yes 💜
                      </p>
                    </div>

                    {/* Date Summary Card */}
                    <div className="bg-white rounded-2xl p-4.5 border border-pink-100/70 shadow-md text-left space-y-3 relative overflow-hidden">
                      {/* Sub-card background details */}
                      <div className="absolute -right-4 -bottom-4 text-pink-50/60 text-6xl font-bold select-none pointer-events-none">✨</div>
                      
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest text-center border-b border-slate-50 pb-2 mb-2">
                        OUR BEAUTIFUL DATE PLAN ✨
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-2.5">
                        <div className="flex items-center gap-3 p-2.5 bg-gradient-to-r from-pink-50 to-pink-50/20 rounded-xl border border-pink-100/30">
                          <div className="p-1.5 bg-white rounded-lg text-pink-500 shadow-sm">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Date</p>
                            <p className="text-xs font-bold text-slate-700">{formatDateString(selectedDate)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-2.5 bg-gradient-to-r from-purple-50 to-purple-50/20 rounded-xl border border-purple-100/30">
                          <div className="p-1.5 bg-white rounded-lg text-purple-500 shadow-sm">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time</p>
                            <p className="text-xs font-bold text-slate-700">{selectedTime}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-2.5 bg-gradient-to-r from-rose-50 to-rose-50/20 rounded-xl border border-rose-100/30">
                          <div className="p-1.5 bg-white rounded-lg text-rose-500 shadow-sm">
                            <Utensils className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Food</p>
                            <p className="text-xs font-bold text-slate-700">{selectedFood || "Jollibee 🍗"}</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-center text-pink-600/90 text-[11px] font-bold italic pt-1.5 px-2">
                        Everything looks perfect. One final tap and this date plan will be sent straight to your favorite person ❤️
                      </p>
                    </div>

                    <p className="text-slate-500 text-[10px] font-semibold leading-relaxed px-4 pt-1">
                      Now go take a screenshot and send this to your favorite human ✨
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Button Row */}
            {currentStep >= 1 && (
              <div className="px-5 py-4 bg-white border-t border-pink-100/60 shadow-[0_-4px_10px_rgba(236,72,153,0.02)] flex flex-col gap-2 z-10">
                {currentStep === 3 ? (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleShare}
                      className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Share2 className="w-4 h-4" />
                      Share Plan 💌
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-full py-2 bg-slate-50 text-slate-500 rounded-full font-bold hover:bg-slate-100 hover:text-slate-700 active:scale-[0.98] transition-all text-xs"
                    >
                      Start Again 🔄
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleContinue}
                    disabled={currentStep === 2 && !selectedFood}
                    className={`w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all text-sm ${
                      currentStep === 2 && !selectedFood ? "opacity-50 cursor-not-allowed hover:shadow-none" : ""
                    }`}
                  >
                    {currentStep === 2 ? "Confirm & Send 💌" : "Next Adventure →"}
                  </button>
                )}
              </div>
            )}

            {/* TikTok Sidebar overlay removed as requested */}

            {/* Custom toast for share feedback */}
            {showShareToast && (
              <div className="absolute top-[80px] left-1/2 -translate-x-1/2 bg-slate-900/95 text-white text-[11px] font-bold px-4 py-2.5 rounded-2xl shadow-xl z-50 text-center animate-fade-in border border-slate-800 flex items-center gap-1.5 max-w-[280px]">
                <span>💌 Đã copy kế hoạch gửi bạn yêu!</span>
              </div>
            )}

          </div>
        </div>

        {/* Desktop Browser Instructions Overlay */}
        <p className="mt-3.5 text-center text-xs text-slate-500 font-medium px-4">
          Buổi hẹn hò của <span className="text-pink-500 font-bold">chúng mình</span>. 
          Hoạt động tốt nhất trên thiết bị di động 📱
        </p>

      </div>

      {/* Global Embedded Animations */}
      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.6);
          }
          15% {
            opacity: 1;
            transform: translateY(-20px) scale(1.1);
          }
          100% {
            opacity: 0;
            transform: translateY(-220px) scale(0.8);
          }
        }
      `}</style>

    </div>
  );
}
