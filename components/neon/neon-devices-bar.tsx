"use client";

import React from "react";
import { ArrowRight, Crown, Laptop, Tablet, Smartphone, Gamepad, Apple } from "lucide-react";

interface NeonDevicesBarProps {
  onOpenPlans: () => void;
}

export function NeonDevicesBar({ onOpenPlans }: NeonDevicesBarProps) {
  const devices = [
    { label: "Windows", icon: <Laptop className="w-5 h-5" /> },
    { label: "MacOS", icon: <Apple className="w-5 h-5" /> },
    { label: "Linux", icon: <Laptop className="w-5 h-5 text-amber-300" /> },
    { label: "Tablet", icon: <Tablet className="w-5 h-5" /> },
    { label: "Mobile", icon: <Smartphone className="w-5 h-5" /> },
    { label: "Steam Deck", icon: <Gamepad className="w-5 h-5 text-purple-400" /> },
  ];

  return (
    <section className="relative w-full py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Card: Play on Any Device */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#0e0726]/90 border border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_25px_rgba(0,0,0,0.4)]">
            <div className="text-center md:text-left space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Play on Any Device
              </h3>
              <p className="text-xs text-slate-400">
                Your game. Your device. No limits.
              </p>
            </div>

            {/* Devices Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300 font-mono">
              {devices.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 hover:text-white transition-colors">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {d.icon}
                  </div>
                  <span className="text-[10px]">{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card: Live the GTA VI Dream */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1b0a38] via-[#110729] to-[#070414] border border-pink-500/30 flex flex-col items-center justify-center text-center space-y-3.5 shadow-[0_0_30px_rgba(219,39,119,0.2)]">
            <div className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-300">
              <Crown className="w-4 h-4 text-amber-300" />
            </div>
            <h4 className="text-sm font-extrabold text-white max-w-[200px] leading-snug">
              Live the GTA VI Dream with ViceCloud
            </h4>
            <button
              onClick={onOpenPlans}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(219,39,119,0.5)] transition-all active:scale-95"
            >
              <span>View Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
