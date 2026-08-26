"use client";

import React, { useEffect, useRef } from "react";

export default function AmbientBokehBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // ── Hạt ánh sáng Bokeh mờ ảo lấy tone màu từ video ──
    const bokehCount = 40;
    const palette = ["#FB7185", "#FDE047", "#86EFAC", "#FDA4AF", "#F472B6"];
    const bokehs = Array.from({ length: bokehCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 50 + 20,
      alpha: Math.random() * 0.22 + 0.05,
      speedY: Math.random() * 0.25 + 0.08,
      speedX: (Math.random() - 0.5) * 0.18,
      color: palette[Math.floor(Math.random() * palette.length)],
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    // ── Cánh hoa rơi chao lượn nhẹ ──
    const petalCount = 20;
    const petals = Array.from({ length: petalCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 6,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      speedY: Math.random() * 0.6 + 0.25,
      speedX: Math.sin(Math.random() * Math.PI) * 0.4,
    }));

    // ── Tương tác chuột Parallax ──
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = mouseX;
    let targetY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.012;

      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      const shiftX = (mouseX - width / 2) * 0.02;
      const shiftY = (mouseY - height / 2) * 0.02;

      // 1. Vẽ Bokeh
      bokehs.forEach((b) => {
        b.y -= b.speedY;
        b.x += b.speedX;
        if (b.y < -70) b.y = height + 70;
        if (b.x < -70) b.x = width + 70;

        const dynAlpha = b.alpha + Math.sin(time * 1.5 + b.pulsePhase) * 0.04;

        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x + shiftX, b.y + shiftY, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.globalAlpha = Math.max(0.01, dynAlpha);
        ctx.shadowBlur = 35;
        ctx.shadowColor = b.color;
        ctx.fill();
        ctx.restore();
      });

      // 2. Vẽ Cánh hoa
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.006 + time) * 0.5;
        p.rotation += p.rotSpeed;

        if (p.y > height + 25) {
          p.y = -25;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x + shiftX * 0.4, p.y + shiftY * 0.4);
        ctx.rotate(p.rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.55, p.size, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(251, 113, 133, 0.35)";
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
