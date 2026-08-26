"use client";

import React, { useEffect, useRef } from "react";

export default function TulipMeadowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

    // Tạo các đốm sáng Bokeh tương tự hiệu ứng máy ảnh trong video
    const bokehCount = 45;
    const bokehs = Array.from({ length: bokehCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 40 + 15,
      alpha: Math.random() * 0.35 + 0.1,
      speedY: Math.random() * 0.3 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      // Tông màu lấy chuẩn từ video: Hồng tulip, vàng nắng, xanh lá mạ
      color: ["#FB7185", "#FDE047", "#86EFAC", "#FDA4AF"][
        Math.floor(Math.random() * 4)
      ],
    }));

    // Cánh hoa rơi lơ lửng
    const petalCount = 25;
    const petals = Array.from({ length: petalCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 8,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      speedY: Math.random() * 0.8 + 0.4,
      speedX: Math.sin(Math.random() * Math.PI) * 0.5,
    }));

    // Tương tác chuột Parallax
    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Lớp màu nền kem ấm pha chút sắc xanh vườn tulip
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "rgba(247, 243, 233, 0.95)");
      bgGrad.addColorStop(0.5, "rgba(250, 246, 238, 0.98)");
      bgGrad.addColorStop(1, "rgba(240, 234, 214, 0.95)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Vẽ các hạt Bokeh phát sáng
      bokehs.forEach((b) => {
        b.y -= b.speedY;
        b.x += b.speedX;
        if (b.y < -50) b.y = height + 50;
        if (b.x < -50) b.x = width + 50;

        const shiftX = (mouseX - width / 2) * 0.02;
        const shiftY = (mouseY - height / 2) * 0.02;

        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x + shiftX, b.y + shiftY, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.globalAlpha = b.alpha;
        ctx.shadowBlur = 25;
        ctx.shadowColor = b.color;
        ctx.fill();
        ctx.restore();
      });

      // 3. Vẽ cánh hoa Tulip 3D chao nghiêng
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.5;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.beginPath();
        // Vẽ cánh hoa hình elip khum
        ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(244, 114, 182, 0.45)";
        ctx.fill();
        ctx.strokeStyle = "rgba(251, 113, 133, 0.3)";
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 rounded-3xl"
    />
  );
}
