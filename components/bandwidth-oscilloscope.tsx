"use client";

import React, { useEffect, useRef, useState } from "react";
import { Activity, Cpu, Wind, HardDrive } from "lucide-react";

export function BandwidthOscilloscope() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mbps, setMbps] = useState(48.2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 240);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 45);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const points: number[] = new Array(40).fill(height / 2);
    let time = 0;

    const render = () => {
      time += 0.08;
      ctx.clearRect(0, 0, width, height);

      // Generate realistic packet telemetry jitter
      const nextVal =
        height / 2 +
        Math.sin(time) * 10 +
        Math.cos(time * 2.3) * 6 +
        (Math.random() - 0.5) * 5;

      points.shift();
      points.push(nextVal);

      // Draw background grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let y = 10; y < height; y += 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw waveform
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#00f0ff";
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 8;

      const step = width / (points.length - 1);
      for (let i = 0; i < points.length; i++) {
        const x = i * step;
        const y = points[i];
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Update bitrate display
      if (Math.random() > 0.85) {
        setMbps(parseFloat((46 + Math.random() * 6).toFixed(1)));
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="p-3.5 rounded-xl bg-[#080812] border border-cyan-500/20 shadow-inner">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-bold">
          <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>LIVE UDP BITSTREAM OSCILLOSCOPE</span>
        </div>
        <span className="font-mono text-xs font-black text-white">
          {mbps} <span className="text-[10px] text-gray-400">Mbps</span>
        </span>
      </div>

      <div className="w-full h-11 relative">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="mt-2.5 pt-2 border-t border-white/5 grid grid-cols-3 gap-2 text-[10px] font-mono text-gray-400">
        <div className="flex items-center gap-1">
          <Cpu className="w-3 h-3 text-pink-400" />
          <span>2.23 GHz</span>
        </div>
        <div className="flex items-center gap-1 text-center justify-center">
          <Wind className="w-3 h-3 text-cyan-400" />
          <span>3,420 RPM</span>
        </div>
        <div className="flex items-center gap-1 justify-end text-emerald-400">
          <HardDrive className="w-3 h-3" />
          <span>448 GB/s</span>
        </div>
      </div>
    </div>
  );
}
