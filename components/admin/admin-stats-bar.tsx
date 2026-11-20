"use client";

import React from "react";
import { Users, DollarSign, Clock, Play } from "lucide-react";
import { AdminStats } from "@/lib/types";

export function AdminStatsBar({ stats }: { stats: AdminStats | null }) {
  const cards = [
    {
      label: "Registered Users",
      value: stats ? stats.totalUsers : "...",
      desc: "Unique gamer accounts",
      icon: <Users className="w-5 h-5 text-cyan-400" />,
      glow: "border-cyan-500/20 bg-cyan-950/10",
    },
    {
      label: "Total Revenue",
      value: stats ? `$${stats.totalRevenue.toFixed(2)}` : "...",
      desc: "Approved TRC-20 payments",
      icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
      glow: "border-emerald-500/20 bg-emerald-950/10",
    },
    {
      label: "Pending Verifications",
      value: stats ? stats.pendingCount : "...",
      desc: "Requires manual review",
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      glow: stats && stats.pendingCount > 0 ? "border-amber-500/50 bg-amber-950/20 animate-pulse" : "border-white/10 bg-white/[0.02]",
      badge: stats && stats.pendingCount > 0 ? "ACTION REQUIRED" : undefined,
    },
    {
      label: "Active Cloud Sessions",
      value: stats ? stats.activeStreams : "...",
      desc: "Allocated PS5 hardware blades",
      icon: <Play className="w-5 h-5 text-purple-400" />,
      glow: "border-purple-500/20 bg-purple-950/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`p-5 rounded-2xl border ${c.glow} relative overflow-hidden transition-all`}
        >
          {c.badge && (
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-mono font-bold">
              {c.badge}
            </span>
          )}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">{c.icon}</div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 block uppercase tracking-wider">
                {c.label}
              </span>
              <span className="text-2xl font-black text-white font-mono">{c.value}</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">{c.desc}</p>
        </div>
      ))}
    </div>
  );
}
