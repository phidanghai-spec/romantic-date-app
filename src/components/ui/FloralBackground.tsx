"use client";

import React, { useEffect, useState } from "react";

const FLOWERS = ["🌷", "🌸", "💮", "🪻", "✨"];

interface PetalItem {
  id: number;
  icon: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

export default function FloralBackground() {
  const [petals, setPetals] = useState<PetalItem[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      icon: FLOWERS[i % FLOWERS.length],
      left: Math.random() * 95,
      duration: 8 + Math.random() * 7,
      delay: Math.random() * 5,
      size: 16 + Math.random() * 14,
    }));
    setPetals(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Lớp nền loang màu pastel nhẹ */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Các bông hoa rơi */}
      {petals.map((p) => (
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
