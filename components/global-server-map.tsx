"use client";

import React from "react";
import { Globe, Wifi, CheckCircle2, Shield, Activity } from "lucide-react";

export function GlobalServerMap() {
  const clusters = [
    {
      region: "North America",
      locations: "Virginia, Oregon, Texas (US)",
      ping: "12 - 18 ms",
      capacity: "99.8% Uptime",
      activeNodes: 420,
      flag: "🇺🇸",
      status: "Optimal",
    },
    {
      region: "Europe",
      locations: "Frankfurt (DE), London (UK), Paris (FR)",
      ping: "16 - 22 ms",
      capacity: "99.9% Uptime",
      activeNodes: 310,
      flag: "🇪🇺",
      status: "Optimal",
    },
    {
      region: "Latin America",
      locations: "São Paulo (BR), Santiago (CL), Mexico City (MX)",
      ping: "24 - 32 ms",
      capacity: "99.7% Uptime",
      activeNodes: 150,
      flag: "🌎",
      status: "Optimal",
    },
    {
      region: "Asia-Pacific",
      locations: "Tokyo (JP), Singapore (SG), Sydney (AU)",
      ping: "22 - 28 ms",
      capacity: "99.8% Uptime",
      activeNodes: 120,
      flag: "🌏",
      status: "Optimal",
    },
  ];

  return (
    <section className="py-16 relative z-20 border-t border-white/5 bg-[#050610]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-950/40 border border-blue-500/30 text-blue-400 text-xs font-bold mb-3 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Globe className="w-3.5 h-3.5" />
            Global Edge Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Worldwide PS5 Cloud Clusters
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            Our 1,000 consoles are distributed across Equinix Tier-4 datacenters globally to ensure sub-30ms ping worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {clusters.map((c) => (
            <div
              key={c.region}
              className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-cyan-400/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{c.flag}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {c.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {c.region}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5 mb-4 leading-tight">
                {c.locations}
              </p>

              <div className="space-y-2 pt-3 border-t border-white/5 text-xs font-mono">
                <div className="flex items-center justify-between text-gray-300">
                  <span className="text-gray-500">Latency:</span>
                  <span className="text-cyan-400 font-bold">{c.ping}</span>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span className="text-gray-500">Active Rigs:</span>
                  <span className="text-white font-bold">{c.activeNodes} Units</span>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span className="text-gray-500">Health:</span>
                  <span className="text-emerald-400 font-bold">{c.capacity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
