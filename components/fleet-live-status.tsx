"use client";

import React, { useState, useEffect } from "react";
import { Server, Activity, HardDrive, ShieldCheck, Cpu } from "lucide-react";

export function FleetLiveStatus() {
  const [activeNodes, setActiveNodes] = useState(842);

  // Minor realistic fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes((prev) => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.min(980, Math.max(810, prev + change));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-[#06060c] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-4 rounded-xl bg-[#0c0c16] border border-white/5 flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-pink-500/10 text-pink-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Total Fleet
              </span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono">
                1,000 PS5s
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0c16] border border-white/5 flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Active In-Game
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                {activeNodes} Nodes
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0c16] border border-white/5 flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Avg Latency
              </span>
              <span className="text-xl sm:text-2xl font-black text-cyan-300 font-mono">
                18.4 ms
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0c16] border border-white/5 flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Fleet Health
              </span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono">
                99.98%
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
