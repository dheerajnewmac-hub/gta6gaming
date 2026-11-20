"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

interface Activity {
  name: string;
  location: string;
  flag: string;
  plan: string;
  price: string;
  node: string;
  time: string;
}

const ACTIVITIES: Activity[] = [
  { name: "Jack M.", location: "Austin, TX (US)", flag: "🇺🇸", plan: "Starter Pack (5 hrs)", price: "$8.99", node: "PS5-MIA-408", time: "Just now" },
  { name: "Liam W.", location: "London (UK)", flag: "🇬🇧", plan: "Weekend Marathon (12 hrs)", price: "$14.99", node: "PS5-LDN-112", time: "2m ago" },
  { name: "Mateo R.", location: "Madrid (Spain)", flag: "🇪🇸", plan: "15-Day Unlimited Pass", price: "$24.99", node: "PS5-FRA-204", time: "3m ago" },
  { name: "Lukas B.", location: "Berlin (Germany)", flag: "🇩🇪", plan: "Custom Rig (24 hrs)", price: "$21.60", node: "PS5-FRA-309", time: "4m ago" },
  { name: "Camila S.", location: "São Paulo (Brazil)", flag: "🇧🇷", plan: "Solo Trial Pass (1 hr)", price: "$1.99", node: "PS5-SAO-082", time: "1m ago" },
  { name: "Kenji T.", location: "Tokyo (Japan)", flag: "🇯🇵", plan: "30-Day Syndicate Pass (VIP)", price: "$39.99", node: "PS5-TYO-501", time: "5m ago" },
  { name: "Noah D.", location: "Toronto (Canada)", flag: "🇨🇦", plan: "Starter Pack (5 hrs)", price: "$8.99", node: "PS5-NY5-419", time: "Just now" },
];

export function LiveActivityToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show after initial 3.5s delay
    const initial = setTimeout(() => {
      setVisible(true);
    }, 3500);

    return () => clearTimeout(initial);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed || paused) return;

    // Cycle notifications: show for 4.5s, hide for 4s
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ACTIVITIES.length);
        setVisible(true);
      }, 3500);
    }, 8500);

    return () => clearInterval(cycle);
  }, [dismissed, paused]);

  if (dismissed) return null;

  const current = ACTIVITIES[index];

  return (
    <aside
      aria-label="Live gamer activity notification"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`fixed bottom-3 left-3 sm:bottom-6 sm:left-6 z-40 max-w-[275px] sm:max-w-[360px] transition-all duration-500 transform ${
        visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 pointer-events-none scale-95"
      }`}
    >
      <div className="relative rounded-2xl bg-[#090d26]/95 backdrop-blur-xl border border-cyan-500/40 p-2.5 sm:p-4 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.25)] flex items-start gap-2.5 sm:gap-3">
        {/* Flag Avatar */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#0e1438] border border-cyan-400/30 flex items-center justify-center text-base sm:text-xl shrink-0 shadow-inner">
          {current.flag}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[11px] sm:text-xs font-bold text-white truncate">{current.name}</span>
            <span className="text-[9px] sm:text-[10px] text-gray-400 font-mono truncate">({current.location})</span>
            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
          </div>

          <p className="text-[11px] sm:text-xs text-gray-200 font-medium leading-tight truncate">
            Rented <span className="text-cyan-300 font-bold">{current.plan}</span>
          </p>

          <div className="flex items-center gap-2 mt-1 text-[9px] sm:text-[10px] font-mono text-gray-400">
            <span className="text-emerald-400 font-bold">{current.price}</span>
            <span>•</span>
            <span className="text-gray-500 truncate hidden sm:inline">Rig {current.node}</span>
            <span className="text-cyan-400/80">{current.time}</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss notification"
          className="absolute top-2 right-2 text-gray-500 hover:text-white transition-colors p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
