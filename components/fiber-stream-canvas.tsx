"use client";

import React, { useEffect, useRef } from "react";

interface FiberStreamCanvasProps {
  latency?: string;
}

export function FiberStreamCanvas({ latency = "16ms" }: FiberStreamCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 80);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // High energy particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: height / 2 + (Math.random() - 0.5) * 24,
      speed: 2.5 + Math.random() * 3.5,
      size: 1.5 + Math.random() * 2.5,
      color: Math.random() > 0.4 ? "#00f0ff" : "#ff007f",
      glow: 6 + Math.random() * 10,
    }));

    let waveOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing sine wave core beam
      waveOffset += 0.04;
      ctx.beginPath();
      ctx.lineWidth = 3;
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "rgba(0, 240, 255, 0.2)");
      gradient.addColorStop(0.5, "rgba(255, 0, 127, 0.9)");
      gradient.addColorStop(1, "rgba(0, 240, 255, 0.8)");
      ctx.strokeStyle = gradient;
      ctx.shadowColor = "#ff007f";
      ctx.shadowBlur = 14;

      for (let x = 0; x < width; x += 3) {
        const y = height / 2 + Math.sin(x * 0.02 + waveOffset) * 8 + Math.cos(x * 0.04 - waveOffset) * 4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Secondary high-frequency laser thread
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(0, 240, 255, 0.7)";
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 8;
      for (let x = 0; x < width; x += 4) {
        const y = height / 2 + Math.sin(x * 0.035 - waveOffset * 1.5) * 5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 3. Render moving high-speed stream particles
      particles.forEach((p) => {
        p.x += p.speed;
        if (p.x > width) {
          p.x = 0;
          p.y = height / 2 + (Math.random() - 0.5) * 20;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y + Math.sin(p.x * 0.03 + waveOffset) * 6, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.glow;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-16 sm:h-20" />
      <div className="absolute top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-[#080814]/90 border border-cyan-400/50 backdrop-blur-md shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 pointer-events-auto">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-mono text-[11px] font-black text-cyan-300 tracking-wider">
          {latency} BITSTREAM
        </span>
      </div>
    </div>
  );
}
