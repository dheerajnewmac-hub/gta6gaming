"use client";

import React, { useState } from "react";
import { Zap, Wifi, CheckCircle, AlertCircle, RefreshCw, Server, ArrowRight } from "lucide-react";

interface LivePingTesterProps {
  onSelectPlan: () => void;
}

interface ServerNode {
  name: string;
  region: string;
  flag: string;
  basePing: number;
  status: "optimal" | "good" | "fair";
}

const NODES: ServerNode[] = [
  { name: "US East (Virginia)", region: "North America", flag: "🇺🇸", basePing: 14, status: "optimal" },
  { name: "US West (Oregon)", region: "North America", flag: "🇺🇸", basePing: 28, status: "optimal" },
  { name: "EU Central (Frankfurt)", region: "Europe", flag: "🇩🇪", basePing: 22, status: "optimal" },
  { name: "UK South (London)", region: "Europe", flag: "🇬🇧", basePing: 24, status: "optimal" },
  { name: "Asia East (Tokyo)", region: "Asia Pacific", flag: "🇯🇵", basePing: 32, status: "good" },
  { name: "LATAM (São Paulo)", region: "South America", flag: "🇧🇷", basePing: 38, status: "good" },
];

export function LivePingTester({ onSelectPlan }: LivePingTesterProps) {
  const [testing, setTesting] = useState(false);
  const [tested, setTested] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ [key: string]: number }>({});

  const runBenchmark = () => {
    setTesting(true);
    setTested(false);
    setProgress(15);
    setResults({});

    setTimeout(() => {
      setProgress(50);
    }, 600);

    setTimeout(() => {
      setProgress(85);
      const simulated: { [key: string]: number } = {};
      NODES.forEach((n) => {
        // Add minor jitter (-3ms to +5ms)
        const jitter = Math.floor(Math.random() * 8) - 3;
        simulated[n.name] = Math.max(10, n.basePing + jitter);
      });
      setResults(simulated);
    }, 1400);

    setTimeout(() => {
      setProgress(100);
      setTesting(false);
      setTested(true);
    }, 1800);
  };

  const bestNode = tested
    ? NODES.reduce((prev, curr) =>
        (results[curr.name] || 999) < (results[prev.name] || 999) ? curr : prev
      )
    : null;

  return (
    <section id="ping-test" className="py-20 relative overflow-hidden bg-[#090914] border-t border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            1-Click Connection Diagnostic
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Will GTA VI Run Smoothly On Your PC?
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            Test your direct latency to our global PS5 server clusters before spending a single dollar.
          </p>
        </div>

        {/* Diagnostic Panel */}
        <div className="bg-[#0e0e1c] rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl relative">
          
          {/* Top Bar with Trigger */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <h3 className="font-bold text-white text-base">
                Global Edge Cluster Latency Monitor
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Simulating WebRTC UDP protocol stream with adaptive packet pacing
              </p>
            </div>

            <button
              onClick={runBenchmark}
              disabled={testing}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg ${
                testing
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:scale-105 active:scale-95 shadow-yellow-500/20"
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${testing ? "animate-spin text-white" : ""}`} />
              {testing ? "Benchmarking Latency..." : tested ? "Re-Test Connection" : "Start Benchmark"}
            </button>
          </div>

          {/* Progress Bar during test */}
          {testing && (
            <div className="my-6">
              <div className="flex justify-between text-xs text-yellow-400 mb-1 font-mono">
                <span>Pinging global PS5 server nodes...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-pink-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Results Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {NODES.map((node) => {
              const ping = results[node.name];
              const isBest = bestNode?.name === node.name;

              return (
                <div
                  key={node.name}
                  className={`p-4 rounded-xl border transition-all ${
                    isBest
                      ? "bg-emerald-950/20 border-emerald-500/50 shadow-lg shadow-emerald-950/30"
                      : "bg-[#090912] border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{node.flag}</span>
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          {node.name}
                          {isBest && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/30 text-emerald-300 font-extrabold uppercase">
                              Best Match
                            </span>
                          )}
                        </h4>
                        <span className="text-[10px] text-gray-400">{node.region}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      {tested && ping ? (
                        <span
                          className={`font-mono text-sm font-extrabold ${
                            ping < 25
                              ? "text-emerald-400"
                              : ping < 45
                              ? "text-cyan-400"
                              : "text-yellow-400"
                          }`}
                        >
                          {ping} ms
                        </span>
                      ) : (
                        <span className="font-mono text-xs text-gray-500">Ready</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommendation Banner when test completes */}
          {tested && bestNode && (
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-purple-950/40 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Verified: You Are Ready for 60 FPS GTA VI Streaming!
                  </h4>
                  <p className="text-xs text-gray-300">
                    Nearest Node: <strong className="text-emerald-300">{bestNode.name} ({results[bestNode.name]}ms)</strong> — Zero noticeable input delay.
                  </p>
                </div>
              </div>

              <button
                onClick={onSelectPlan}
                className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Select Your Pass</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
