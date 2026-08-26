"use client";

import React, { useEffect, useRef } from "react";

export default function FullBleedBokehBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 1. Hệ thống đốm sáng Bokeh (Màu hoa tulip, ánh nắng vàng kem, xanh cuống lá mạ)
    const bokehCount = 55;
    const colors = ["#FB7185", "#FDE047", "#86EFAC", "#FDA4AF", "#F472B6", "#FED7AA"];
    const bokehs = Array.from({ length: bokehCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 45 + 18,
      alpha: Math.random() * 0.28 + 0.08,
      speedY: Math.random() * 0.35 + 0.12,
      speedX: (Math.random() - 0.5) * 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    // 2. Cánh hoa Tulip & Hoa Sao rơi lơ lửng
    const petalCount = 30;
    const petals = Array.from({ length: petalCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 14 + 7,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.025,
      speedY: Math.random() * 0.75 + 0.35,
      speedX: Math.sin(Math.random() * Math.PI) * 0.6,
      color: Math.random() > 0.3 ? "rgba(251, 113, 133, 0.45)" : "rgba(244, 114, 182, 0.4)",
    }));

    // 3. Tương tác chuột Parallax
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
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
      time += 0.015;

      // Mouse lerp for ultra-smooth parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const shiftX = (mouseX - width / 2) * 0.025;
      const shiftY = (mouseY - height / 2) * 0.025;

      // ── Vẽ các đốm sáng Bokeh đa tầng phát sáng ──
      bokehs.forEach((b) => {
        b.y -= b.speedY;
        b.x += b.speedX;
        if (b.y < -60) b.y = height + 60;
        if (b.x < -60) b.x = width + 60;

        const dynamicAlpha = b.alpha + Math.sin(time * 2 + b.pulsePhase) * 0.05;

        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x + shiftX, b.y + shiftY, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.globalAlpha = Math.max(0.02, dynamicAlpha);
        ctx.shadowBlur = 30;
        ctx.shadowColor = b.color;
        ctx.fill();
        ctx.restore();
      });

      // ── Vẽ cánh hoa Tulip 3D chao nghiêng ──
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.008 + time) * 0.6;
        p.rotation += p.rotSpeed;

        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x + shiftX * 0.5, p.y + shiftY * 0.5);
        ctx.rotate(p.rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.55, p.size, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.strokeStyle = "rgba(251, 113, 133, 0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();
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
      style={{ willChange: "transform" }}
    />
  );
}
