"use client";

import React, { useState, useEffect } from "react";
import { Gamepad2, Wifi, ShieldCheck } from "lucide-react";

interface ActivityItem {
  id: string;
  gamer: string;
  country: string;
  flag: string;
  node: string;
  ping: string;
  action: string;
  timeAgo: string;
}

const ACTIVITIES: ActivityItem[] = [
  { id: "1", gamer: "Alex M.", country: "Berlin, DE", flag: "🇩🇪", node: "PS5-NODE-249", ping: "14ms", action: "Connected to 4K Stream", timeAgo: "12s ago" },
  { id: "2", gamer: "Lucas R.", country: "São Paulo, BR", flag: "🇧🇷", node: "PS5-NODE-104", ping: "22ms", action: "Resumed GTA VI Story Save", timeAgo: "24s ago" },
  { id: "3", gamer: "David W.", country: "Austin, TX, US", flag: "🇺🇸", node: "PS5-NODE-812", ping: "11ms", action: "Activated Heist Pass", timeAgo: "41s ago" },
  { id: "4", gamer: "Sophie L.", country: "London, UK", flag: "🇬🇧", node: "PS5-NODE-328", ping: "17ms", action: "DualSense Wireless Paired", timeAgo: "56s ago" },
  { id: "5", gamer: "Kenji T.", country: "Tokyo, JP", flag: "🇯🇵", node: "PS5-NODE-619", ping: "19ms", action: "Streamed 60 FPS Without Lag", timeAgo: "1m ago" },
  { id: "6", gamer: "Mateo G.", country: "Madrid, ES", flag: "🇪🇸", node: "PS5-NODE-405", ping: "18ms", action: "Completed Vice City Heist", timeAgo: "2m ago" },
];

export function LiveActivityTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ACTIVITIES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const current = ACTIVITIES[currentIndex];

  return (
    <div className="py-2.5 px-4 bg-[#05050a] border-b border-white/5 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
        
        {/* Left Live Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">
            Live Verified Gamer Sessions
          </span>
        </div>

        {/* Center Animated Activity Item */}
        <div className="flex-1 truncate text-center sm:text-left transition-all duration-500 key={current.id}">
          <span className="inline-flex items-center gap-2">
            <span>{current.flag}</span>
            <strong className="text-white font-semibold">{current.gamer}</strong>
            <span className="text-gray-500">({current.country})</span>
            <span className="text-pink-400 font-mono font-bold">• {current.node}</span>
            <span className="text-gray-400 hidden md:inline">— {current.action}</span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
              {current.ping}
            </span>
            <span className="text-gray-600 text-[10px] hidden lg:inline">{current.timeAgo}</span>
          </span>
        </div>

        {/* Right Security Note */}
        <div className="hidden sm:flex items-center gap-1.5 text-gray-400 text-[11px] shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real PlayStation 5 Fleet</span>
        </div>

      </div>
    </div>
  );
}
