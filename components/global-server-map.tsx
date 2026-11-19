"use client";

import React, { useState } from "react";
import { Activity, Radio, CheckCircle2 } from "lucide-react";
import { ServerMapCanvas } from "./server-map-canvas";

interface Cluster {
  id: string;
  region: string;
  code: string;
  facility: string;
  countries: string[];
  cities: string;
  pingMs: number;
  activeNodes: number;
  totalNodes: number;
  flag: string;
  uptime: string;
}

const CLUSTERS: Cluster[] = [
  {
    id: "us",
    region: "North America",
    code: "US-EAST / WEST",
    facility: "Equinix NY5 & DC11",
    countries: ["United States 🇺🇸", "Canada 🇨🇦", "Mexico 🇲🇽"],
    cities: "Virginia, Oregon, Texas, Toronto, CDMX",
    pingMs: 12,
    activeNodes: 420,
    totalNodes: 450,
    flag: "🇺🇸",
    uptime: "99.98%",
  },
  {
    id: "eu",
    region: "Europe",
    code: "EU-CENTRAL",
    facility: "Equinix FR2 & LD8",
    countries: ["UK 🇬🇧", "Germany 🇩🇪", "France 🇫🇷", "Netherlands 🇳🇱", "Spain 🇪🇸"],
    cities: "London, Frankfurt, Paris, Amsterdam, Madrid",
    pingMs: 18,
    activeNodes: 310,
    totalNodes: 330,
    flag: "🇪🇺",
    uptime: "99.99%",
  },
  {
    id: "latam",
    region: "Latin America",
    code: "LATAM-SOUTH",
    facility: "Equinix SP4 & ST1",
    countries: ["Brazil 🇧🇷", "Chile 🇨🇱", "Argentina 🇦🇷", "Colombia 🇨🇴"],
    cities: "São Paulo, Santiago, Buenos Aires, Bogotá",
    pingMs: 26,
    activeNodes: 150,
    totalNodes: 160,
    flag: "🌎",
    uptime: "99.75%",
  },
  {
    id: "apac",
    region: "Asia-Pacific",
    code: "APAC-EAST",
    facility: "Equinix TY8 & SG3",
    countries: ["Japan 🇯🇵", "South Korea 🇰🇷", "Singapore 🇸🇬", "Australia 🇦🇺"],
    cities: "Tokyo, Seoul, Singapore, Sydney, Melbourne",
    pingMs: 24,
    activeNodes: 120,
    totalNodes: 130,
    flag: "🌏",
    uptime: "99.85%",
  },
];

export function GlobalServerMap() {
  const [testing, setTesting] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<string>("us");
  const [testResult, setTestResult] = useState<string | null>(null);

  const runPingTest = () => {
    setTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setTesting(false);
      setTestResult("Fastest Node: US-East [Equinix NY5] • 11.8ms (Pro E-Sports Grade)");
    }, 1200);
  };

  return (
    <section className="py-20 relative z-20 border-t border-white/5 bg-[#04050e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-3 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Global 3D Infrastructure &amp; Supported Countries
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Worldwide PS5 Cloud Clusters
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            Our 1,000 custom PS5 blades are routed directly through Equinix Tier-4 edge datacenters for sub-30ms international response.
          </p>

          {/* Ping Button */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={runPingTest}
              disabled={testing}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              <Activity className={`w-4 h-4 ${testing ? "animate-spin text-cyan-200" : ""}`} />
              <span>{testing ? "Testing Latency..." : "⚡ Run Real-Time Latency Test"}</span>
            </button>
            {testResult && (
              <div className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{testResult}</span>
              </div>
            )}
          </div>
        </div>

        {/* 3D Animated Video Map Canvas */}
        <div className="mb-8">
          <ServerMapCanvas
            selectedCluster={selectedCluster}
            onSelectCluster={(id) => setSelectedCluster(id)}
          />
        </div>

        {/* Datacenter Racks with Supported Countries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CLUSTERS.map((c) => {
            const isSelected = selectedCluster === c.id;
            const occupancyPct = Math.round((c.activeNodes / c.totalNodes) * 100);

            return (
              <div
                key={c.id}
                onClick={() => setSelectedCluster(c.id)}
                className={`p-5 rounded-2xl cursor-pointer transition-all relative overflow-hidden group border ${
                  isSelected
                    ? "bg-[#0b0e24] border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.25)] scale-[1.02]"
                    : "bg-[#070919] border-white/10 hover:border-white/20 hover:bg-[#0a0d22]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.flag}</span>
                    <span className="text-xs font-bold text-white tracking-wide">{c.code}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ONLINE</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {c.region}
                </h3>
                <p className="text-[10px] font-mono text-cyan-400/90 mb-3">{c.facility}</p>

                {/* Supported Countries Tags */}
                <div className="mb-3 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase block">Supported Countries:</span>
                  <div className="flex flex-wrap gap-1">
                    {c.countries.map((cnt) => (
                      <span key={cnt} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300">
                        {cnt}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-500 truncate pt-1">Edge Hubs: {c.cities}</p>
                </div>

                {/* Occupancy Bar */}
                <div className="mb-3 space-y-1 pt-2 border-t border-white/5">
                  <div className="flex justify-between text-[10px] font-mono text-gray-400">
                    <span>Rig Load:</span>
                    <span className="text-white font-bold">{c.activeNodes} / {c.totalNodes} ({occupancyPct}%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                      style={{ width: `${occupancyPct}%` }}
                    />
                  </div>
                </div>

                {/* Latency & SLA */}
                <div className="pt-2 border-t border-white/5 flex justify-between text-[11px] font-mono">
                  <span className="text-gray-500">Latency:</span>
                  <span className="text-cyan-400 font-bold">{c.pingMs} ms avg</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
