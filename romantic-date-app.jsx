import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Clock, Utensils, Sparkles } from 'lucide-react';

const RomanticDateApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedDate, setSelectedDate] = useState('13/06/2026');
  const [selectedTime, setSelectedTime] = useState('20:10');
  const [showCelebration, setShowCelebration] = useState(false);

  const missions = [
    { id: 1, name: 'Ask Out', emoji: '❤️', completed: true },
    { id: 2, name: 'Pick a Time', emoji: '⏰', completed: true },
    { id: 3, name: 'Food Mission', emoji: '🍽️', completed: false },
    { id: 4, name: 'Confirm', emoji: '💕', completed: false }
  ];

  const foodOptions = [
    { name: 'Jollibee', emoji: '🍗' },
    { name: 'Ramen', emoji: '🍜' },
    { name: 'Hot Pot', emoji: '🍲' },
    { name: 'BBQ', emoji: '🥩' }
  ];

  const questions = [
    {
      title: 'When should our adventure begin?',
      type: 'datetime'
    },
    {
      title: 'Most important question... what should we eat? 😍',
      type: 'food',
      options: foodOptions
    }
  ];

  const handleFoodSelect = (food) => {
    setSelectedFood(food.name);
  };

  const handleContinue = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowCelebration(true);
    }
  };

  const handleConfirm = () => {
    setShowCelebration(true);
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 animate-fadeIn">
          {/* Celebration Circle */}
          <div className="relative w-48 h-48 mx-auto">
            <div className="w-full h-full rounded-full border-4 border-pink-200 flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
              <div className="text-8xl animate-pulse">💑</div>
            </div>
            <div className="absolute -top-4 -right-4 text-4xl animate-bounce">✨</div>
            <div className="absolute -bottom-4 -left-4 text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</div>
          </div>

          {/* Celebration Text */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-pink-600" style={{ fontStyle: 'italic' }}>
              IT'S A DATE!!!
            </h1>
            <div className="flex justify-center gap-2 text-3xl">
              <Heart className="w-8 h-8 fill-red-500 text-red-500" />
              <span>🎉</span>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            <p className="text-2xl font-semibold text-gray-700">I can't wait to see you.</p>
            <p className="text-lg text-pink-600" style={{ fontStyle: 'italic' }}>
              Thank you for saying yes 💜
            </p>
          </div>

          {/* Date Details */}
          <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-gray-700">Our Beautiful Date Plan ✨</h2>
            
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                <Calendar className="w-5 h-5 text-pink-600" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-800">Saturday, June 13</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold text-gray-800">{selectedTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg">
                <Utensils className="w-5 h-5 text-rose-600" />
                <div>
                  <p className="text-sm text-gray-600">Food</p>
                  <p className="font-semibold text-gray-800">{selectedFood || 'Jollibee'}</p>
                </div>
              </div>
            </div>

            <p className="text-center text-pink-600 text-sm" style={{ fontStyle: 'italic' }}>
              Everything looks perfect. One final tap and this date plan will be sent straight to your favorite person ❤️
            </p>
          </div>

          {/* Messages */}
          <div className="space-y-2 pt-4">
            <p className="text-gray-600">Now go take a screenshot and send this to your favorite human ✨</p>
            <button
              onClick={() => {
                setShowCelebration(false);
                setCurrentStep(0);
                setSelectedFood(null);
              }}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Start Again 🔄
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Mobile Phone Frame */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-800">
          {/* Status Bar */}
          <div className="bg-gray-800 text-white px-6 py-2 flex justify-between items-center text-xs">
            <span>23:24</span>
            <div className="flex gap-1">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 px-4 py-3 flex gap-2">
            <button className="text-white text-xl">&lt;</button>
            <input
              type="text"
              placeholder="Tìm nội dung liên quan"
              className="flex-1 bg-gray-700 bg-opacity-50 text-white placeholder-gray-300 rounded-full px-4 py-2 text-sm"
            />
            <button className="text-white font-semibold">Tìm kiếm</button>
          </div>

          {/* Progress Bar */}
          <div className="px-4 py-3 bg-white">
            <div className="flex items-center justify-between mb-2">
              {missions.map((mission, idx) => (
                <div key={mission.id} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      mission.completed
                        ? 'bg-pink-400 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {mission.completed ? '✓' : mission.id}
                  </div>
                  <p className="text-xs text-center text-gray-600">{mission.name}</p>
                </div>
              ))}
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-rose-400 transition-all"
                style={{ width: `${(currentStep / (questions.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-8 space-y-6 h-96 overflow-y-auto">
            {/* Step 1: Date & Time Selection */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                  When should our adventure begin? 🌸
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-pink-600" />
                      Pick a date 📅
                    </label>
                    <input
                      type="date"
                      value={selectedDate.split('/').reverse().join('-')}
                      onChange={(e) => {
                        const parts = e.target.value.split('-');
                        setSelectedDate(`${parts[2]}/${parts[1]}/${parts[0]}`);
                      }}
                      className="w-full mt-2 px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-pink-600" />
                      Choose a time 🕰️
                    </label>
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full mt-2 px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 bg-white"
                    />
                  </div>
                </div>

                <p className="text-center text-pink-600 text-sm" style={{ fontStyle: 'italic' }}>
                  Perfect! I'll save that special moment 💜
                </p>
              </div>
            )}

            {/* Step 2: Food Selection */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                  Most important question... what should we eat? 😍
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  {foodOptions.map((food, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFoodSelect(food)}
                      className={`p-4 rounded-xl font-semibold transition-all ${
                        selectedFood === food.name
                          ? 'border-3 border-pink-500 bg-pink-50 shadow-lg'
                          : 'border-2 border-gray-200 bg-white hover:border-pink-300'
                      }`}
                    >
                      <div className="text-4xl mb-2">{food.emoji}</div>
                      <p className="text-sm">{food.name}</p>
                    </button>
                  ))}
                </div>

                <p className="text-center text-pink-600 text-sm" style={{ fontStyle: 'italic' }}>
                  {selectedFood && `Excellent choice, future food critic! ❤️`}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Button */}
          <div className="px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 flex gap-2">
            {currentStep === 1 && selectedFood ? (
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-full font-bold hover:shadow-lg transition-all"
              >
                Confirm & Send 💌
              </button>
            ) : (
              <button
                onClick={handleContinue}
                disabled={currentStep === 1 && !selectedFood}
                className="flex-1 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-full font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Adventure →
              </button>
            )}
          </div>

          {/* Right Side Icons */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 space-y-4 pointer-events-none">
            <div className="text-center">
              <Heart className="w-8 h-8 fill-red-500 text-red-500 mx-auto" />
              <p className="text-xs text-gray-600 font-semibold">31,5K</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">💬</div>
              <p className="text-xs text-gray-600 font-semibold">159</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default RomanticDateApp;
