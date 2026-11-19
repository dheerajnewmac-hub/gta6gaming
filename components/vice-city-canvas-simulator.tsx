"use client";

import React, { useEffect, useRef, useState } from "react";
import { Gauge, Radio, ShieldAlert } from "lucide-react";

export function ViceCityCanvasSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [speed, setSpeed] = useState(65);
  const [isAccelerating, setIsAccelerating] = useState(false);
  const [isBraking, setIsBraking] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 480);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 270);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Keyboard controls
    const keysDown: { [key: string]: boolean } = {};
    const onKeyDown = (e: KeyboardEvent) => {
      keysDown[e.key.toLowerCase()] = true;
      if (["w", "arrowup"].includes(e.key.toLowerCase())) setIsAccelerating(true);
      if ([" ", "s", "arrowdown"].includes(e.key.toLowerCase())) setIsBraking(true);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysDown[e.key.toLowerCase()] = false;
      if (["w", "arrowup"].includes(e.key.toLowerCase())) setIsAccelerating(false);
      if ([" ", "s", "arrowdown"].includes(e.key.toLowerCase())) setIsBraking(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // State for road animation
    let roadOffset = 0;
    let currentMph = 65;
    let steerOffset = 0;

    const render = () => {
      // Physics calculation
      if (keysDown["w"] || keysDown["arrowup"]) {
        currentMph = Math.min(148, currentMph + 1.2);
      } else if (keysDown[" "] || keysDown["s"] || keysDown["arrowdown"]) {
        currentMph = Math.max(10, currentMph - 2.5);
      } else {
        currentMph += (70 - currentMph) * 0.02;
      }

      if (keysDown["a"] || keysDown["arrowleft"]) {
        steerOffset = Math.max(-40, steerOffset - 2);
      } else if (keysDown["d"] || keysDown["arrowright"]) {
        steerOffset = Math.min(40, steerOffset + 2);
      } else {
        steerOffset *= 0.9;
      }

      setSpeed(Math.round(currentMph));
      roadOffset += currentMph * 0.12;

      ctx.clearRect(0, 0, width, height);

      // 1. Synthwave Vice Sunset Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.55);
      skyGrad.addColorStop(0, "#19002e");
      skyGrad.addColorStop(0.5, "#480048");
      skyGrad.addColorStop(1, "#c72c48");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height * 0.55);

      // Neon Sun
      const sunY = height * 0.38;
      const sunRad = height * 0.22;
      const sunGrad = ctx.createRadialGradient(width / 2, sunY, 10, width / 2, sunY, sunRad);
      sunGrad.addColorStop(0, "#ffe600");
      sunGrad.addColorStop(0.7, "#ff007f");
      sunGrad.addColorStop(1, "rgba(255, 0, 127, 0)");
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(width / 2, sunY, sunRad, 0, Math.PI * 2);
      ctx.fill();

      // Horizon line
      const horizon = height * 0.52;

      // 2. City Skyline Silhouette
      ctx.fillStyle = "#0c0414";
      const bldgCount = 14;
      const bldgW = width / bldgCount;
      for (let i = 0; i < bldgCount; i++) {
        const bHeight = 25 + Math.sin(i * 3.7) * 20;
        ctx.fillRect(i * bldgW, horizon - bHeight, bldgW + 1, bHeight);
      }

      // 3. Synthwave Road Perspective
      const roadGrad = ctx.createLinearGradient(0, horizon, 0, height);
      roadGrad.addColorStop(0, "#110924");
      roadGrad.addColorStop(1, "#030108");
      ctx.fillStyle = roadGrad;
      ctx.fillRect(0, horizon, width, height - horizon);

      // Perspective Grid Lines
      ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
      ctx.lineWidth = 1.5;
      const vanishX = width / 2 + steerOffset * 0.5;

      for (let i = -6; i <= 6; i++) {
        const bottomX = width / 2 + i * (width / 7) + steerOffset * 1.5;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizon);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

      // Horizontal Moving Speed Lines
      ctx.strokeStyle = "rgba(255, 0, 127, 0.6)";
      ctx.shadowColor = "#ff007f";
      ctx.shadowBlur = 6;
      for (let j = 0; j < 8; j++) {
        const lineProgress = ((roadOffset + j * 30) % 240) / 240;
        const lineY = horizon + Math.pow(lineProgress, 2.2) * (height - horizon);
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(width, lineY);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      // 4. Sports Car Rear View (Representing User in GTA 6)
      const carX = width / 2 + steerOffset;
      const carY = height * 0.78;
      const carW = width * 0.18;
      const carH = carW * 0.48;

      // Car Body
      ctx.fillStyle = "#0a0a14";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(carX - carW / 2, carY, carW, carH, [8, 8, 3, 3]);
      ctx.fill();
      ctx.stroke();

      // Rear Spoiler
      ctx.fillStyle = "#1e1e30";
      ctx.fillRect(carX - carW * 0.55, carY - 4, carW * 1.1, 4);

      // Glowing Neon Taillights
      const isBrakeActive = keysDown[" "] || keysDown["s"];
      ctx.shadowColor = isBrakeActive ? "#ff0033" : "#ff007f";
      ctx.shadowBlur = isBrakeActive ? 18 : 10;
      ctx.fillStyle = isBrakeActive ? "#ff1122" : "#ff007f";

      // Left & Right taillights
      ctx.fillRect(carX - carW * 0.45, carY + 8, carW * 0.35, 5);
      ctx.fillRect(carX + carW * 0.1, carY + 8, carW * 0.35, 5);
      ctx.shadowBlur = 0;

      // Exhaust Boost Flames when accelerating
      if (keysDown["w"] || keysDown["arrowup"]) {
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 15;
        ctx.fillStyle = "#00f0ff";
        ctx.beginPath();
        ctx.arc(carX - carW * 0.25, carY + carH + 3, 4 + Math.random() * 4, 0, Math.PI * 2);
        ctx.arc(carX + carW * 0.25, carY + carH + 3, 4 + Math.random() * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-black flex flex-col justify-between">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Top HUD Overlay */}
      <div className="relative z-10 flex items-center justify-between p-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-emerald-400 font-bold border border-emerald-500/40 flex items-center gap-1.5 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            LIVE 60.0 FPS
          </span>
          <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-cyan-300 font-semibold border border-white/10 hidden sm:inline-block">
            4K HDR STREAM
          </span>
        </div>

        {/* Speedometer Display */}
        <div className="px-3 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-pink-500/40 text-right shadow-lg">
          <span className="text-[10px] text-gray-400 block font-sans">SPEED</span>
          <span className="text-sm font-black font-mono text-white tracking-wider">
            {speed} <span className="text-pink-400 text-[10px]">MPH</span>
          </span>
        </div>
      </div>

      {/* Interactive Controls Overlay Banner */}
      <div className="relative z-10 p-3 flex items-center justify-between text-[11px] font-mono bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        <div className="flex items-center gap-2 text-gray-300">
          <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold">W</span>
          <span className="text-[10px] text-gray-400">Gas</span>
          <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold">A/D</span>
          <span className="text-[10px] text-gray-400">Steer</span>
          <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold">SPACE</span>
          <span className="text-[10px] text-gray-400">Brake</span>
        </div>

        <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
          🎮 Interactive Stream
        </span>
      </div>
    </div>
  );
}
