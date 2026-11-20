"use client";

import React from "react";
import { ArrowRight, Crown, Laptop, Tablet, Smartphone, Gamepad, Apple } from "lucide-react";

interface NeonDevicesBarProps {
  onOpenPlans: () => void;
}

export function NeonDevicesBar({ onOpenPlans }: NeonDevicesBarProps) {
  const devices = [
    { label: "Windows", icon: <Laptop className="w-5 h-5 text-cyan-400" /> },
    { label: "MacOS", icon: <Apple className="w-5 h-5 text-slate-200" /> },
    { label: "Linux", icon: <Laptop className="w-5 h-5 text-amber-300" /> },
    { label: "Tablet", icon: <Tablet className="w-5 h-5 text-pink-400" /> },
    { label: "Mobile", icon: <Smartphone className="w-5 h-5 text-purple-400" /> },
    { label: "Steam Deck", icon: <Gamepad className="w-5 h-5 text-emerald-400" /> },
  ];

  return (
    <section className="relative w-full py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Card: Play on Any Device */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#0c0722]/80 backdrop-blur-xl border border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_25px_rgba(0,0,0,0.4)]">
            <div className="text-center md:text-left space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Play on Any Device
              </h3>
              <p className="text-xs text-slate-400">
                Your game. Your device. No hardware limits.
              </p>
            </div>

            {/* Devices Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-slate-300 font-mono">
              {devices.map((d, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 group cursor-default transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-3 rounded-2xl bg-[#12082b] border border-white/10 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center transition-all">
                    {d.icon}
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors">
                    {d.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card: Live the GTA VI Dream */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1d093d] via-[#110729] to-[#070414] border border-pink-500/30 flex flex-col items-center justify-center text-center space-y-4 shadow-[0_0_35px_rgba(236,72,153,0.25)]">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.4)]">
              <Crown className="w-5 h-5 text-amber-300" />
            </div>
            <h4 className="text-sm sm:text-base font-extrabold text-white max-w-[220px] leading-snug">
              Live the GTA VI Dream with ViceCloud
            </h4>
            <button
              onClick={onOpenPlans}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all active:scale-95"
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
