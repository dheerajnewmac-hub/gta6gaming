"use client";

import React, { useState } from "react";
import { Sliders, Zap, Clock, Calendar, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

interface CustomPlanBuilderProps {
  onSelectCustomPlan: (plan: { name: string; price: string; hours: string }) => void;
}

export function CustomPlanBuilder({ onSelectCustomPlan }: CustomPlanBuilderProps) {
  const [hours, setHours] = useState<number>(8);
  const [days, setDays] = useState<number>(15);
  const [resolution, setResolution] = useState<"1080p" | "4K">("1080p");

  // Dynamic progressive discount calculation
  const getRatePerHour = (h: number, is4K: boolean) => {
    let base = 1.45;
    if (h >= 40) base = 0.65;
    else if (h >= 20) base = 0.85;
    else if (h >= 10) base = 1.05;
    else if (h >= 5) base = 1.25;

    if (is4K) base += 0.25;
    return base;
  };

  const rate = getRatePerHour(hours, resolution === "4K");
  const totalPrice = parseFloat((hours * rate).toFixed(2));
  const standardPrice = hours * 1.99;
  const savingsPct = Math.round(((standardPrice - totalPrice) / standardPrice) * 100);

  const handleDeploy = () => {
    onSelectCustomPlan({
      name: `Custom Pass (${hours}h / ${days}d)`,
      price: `$${totalPrice}`,
      hours: `${hours} hours of PS5 gaming valid for ${days} days (${resolution} 60FPS)`,
    });
  };

  return (
    <div className="mt-12 rounded-3xl glass-panel p-6 sm:p-8 border border-cyan-500/30 shadow-[0_0_40px_rgba(0,210,255,0.15)] relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[11px] font-bold mb-1.5 border border-cyan-500/30">
            <Sliders className="w-3.5 h-3.5" />
            Build Your Own Custom Rig Pass
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Custom Gaming Hours &amp; Validity Calculator
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Slide to pick your exact playtime. More hours = lower rate per hour.
          </p>
        </div>

        {/* Resolution Quality Switcher */}
        <div className="inline-flex items-center p-1 rounded-xl bg-black/50 border border-white/10">
          <button
            onClick={() => setResolution("1080p")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              resolution === "1080p"
                ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/30 font-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            1080p 60FPS
          </button>
          <button
            onClick={() => setResolution("4K")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              resolution === "4K"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/40 font-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            4K HDR Ultra
          </button>
        </div>
      </div>

      {/* Slider Controls & Summary Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Sliders (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Slider 1: Total Gameplay Hours */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                Select Total Gaming Hours:
              </span>
              <span className="font-mono text-base font-black text-cyan-400 bg-cyan-950/60 px-3 py-0.5 rounded-lg border border-cyan-500/30">
                {hours} Hours
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={80}
              step={1}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full h-2 bg-[#0d1430] rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>2 hrs (Quick Test)</span>
              <span>20 hrs (Regular)</span>
              <span>80 hrs (Story Hardcore)</span>
            </div>
          </div>

          {/* Slider 2: Validity Period (Days) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-purple-400" />
                Select Validity Period (Days to use your hours):
              </span>
              <span className="font-mono text-base font-black text-purple-300 bg-purple-950/60 px-3 py-0.5 rounded-lg border border-purple-500/30">
                {days} Days
              </span>
            </div>
            <input
              type="range"
              min={7}
              max={60}
              step={1}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full h-2 bg-[#0d1430] rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>7 Days</span>
              <span>15 Days</span>
              <span>30 Days (1 Month)</span>
              <span>60 Days (2 Months)</span>
            </div>
          </div>

        </div>

        {/* Right Calculated Price Card (5 Cols) */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#0b1333] to-[#070b1e] border-2 border-cyan-400/60 shadow-[0_0_30px_rgba(0,210,255,0.25)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-gray-400 uppercase">
                CALCULATED ESTIMATE
              </span>
              {savingsPct > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  SAVE {savingsPct}%
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-black text-white tracking-tight">
                ${totalPrice}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                (${rate.toFixed(2)}/hour)
              </span>
            </div>

            <p className="text-xs text-gray-300 mb-4">
              Includes {hours} hours of dedicated PS5 node stream, valid for {days} full days with encrypted cloud save slots.
            </p>
          </div>

          <button
            onClick={handleDeploy}
            className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-[0_0_20px_rgba(0,210,255,0.6)] transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
          >
            <span>Deploy Custom Rig Pass (${totalPrice})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
