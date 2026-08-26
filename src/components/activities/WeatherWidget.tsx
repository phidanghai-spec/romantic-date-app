'use client';

import React, { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Sparkles, MapPin } from 'lucide-react';
import { WeatherData, getWeatherForecast } from '@/lib/dateApis';

export const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadWeather() {
      const data = await getWeatherForecast();
      setWeather(data);
      setLoading(false);
    }
    loadWeather();
  }, []);

  if (loading) {
    return (
      <div className="w-full cream-glass rounded-3xl p-5 border border-rose-200/60 animate-pulse text-center text-xs text-[#715A75]">
        Đang cập nhật thời tiết buổi hẹn... ⛅
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="w-full cream-glass-card rounded-3xl p-5 sm:p-6 border border-rose-200/80 shadow-lg relative overflow-hidden">
      {/* Ambient background highlight */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-amber-200/40 via-rose-100/30 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Temp & Weather Icon */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-100/90 flex items-center justify-center text-rose-600 border border-rose-200 shadow-md">
            {weather.isRain ? (
              <CloudRain className="w-7 h-7 text-blue-500 animate-bounce" />
            ) : weather.weatherCode >= 1 && weather.weatherCode <= 3 ? (
              <Cloud className="w-7 h-7 text-[#715A75]" />
            ) : (
              <Sun className="w-7 h-7 text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-italic text-4xl text-[#2D1E2F] font-bold">
                {weather.temperature}°C
              </span>
              <span className="text-xs text-[#715A75] font-normal font-sans">
                (Cảm giác như {weather.apparentTemperature}°C)
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-rose-700 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>TP. Hồ Chí Minh • Dự báo hẹn hò hôm nay</span>
            </div>
          </div>
        </div>

        {/* Right: Advice & Sub-metrics */}
        <div className="flex flex-col sm:items-end space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 text-xs text-amber-900 font-bold border border-amber-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{weather.weatherText}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#715A75] font-mono font-medium">
            <span className="flex items-center gap-1">
              <Droplets className="w-3 h-3 text-blue-500" /> Độ ẩm {weather.humidity}%
            </span>
            <span className="flex items-center gap-1">
              <Wind className="w-3 h-3 text-emerald-600" /> Gió {weather.windSpeed} km/h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
