"use client";

import React from "react";

const FLOWERS = ["🌷", "🌸", "💮", "🪻", "✨"];

interface PetalItem {
  id: number;
  icon: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

// Generate static deterministic petals to avoid client hydration cascading renders (ESLint set-state-in-effect fix)
const STATIC_PETALS: PetalItem[] = Array.from({ length: 18 }).map((_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const rnd1 = (seed % 1000) / 1000;
  const rnd2 = ((seed * 7) % 1000) / 1000;
  const rnd3 = ((seed * 13) % 1000) / 1000;
  const rnd4 = ((seed * 19) % 1000) / 1000;

  return {
    id: i,
    icon: FLOWERS[i % FLOWERS.length],
    left: Math.round(rnd1 * 95 * 10) / 10,
    duration: Math.round((8 + rnd2 * 7) * 10) / 10,
    delay: Math.round(rnd3 * 5 * 10) / 10,
    size: Math.round((16 + rnd4 * 14) * 10) / 10,
  };
});

export default function FloralBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Lớp nền loang màu pastel nhẹ */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Các bông hoa rơi */}
      {STATIC_PETALS.map((p) => (
        <span
          key={p.id}
          className="petal select-none"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            fontSize: `${p.size}px`,
          }}
        >
          {p.icon}
        </span>
      ))}
    </div>
  );
}
