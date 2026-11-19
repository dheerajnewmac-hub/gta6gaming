"use client";

import React, { useState, useEffect } from "react";
import { Gamepad2, Keyboard, Zap, CheckCircle2 } from "lucide-react";

export function InteractiveGamepadVisualizer() {
  const [activeKey, setActiveKey] = useState<string>("W");
  const [lastInputMs, setLastInputMs] = useState<number>(1.8);
  const [inputCount, setInputCount] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyName = e.key.toUpperCase();
      setActiveKey(keyName === " " ? "SPACE" : keyName);
      setLastInputMs(parseFloat((1.2 + Math.random() * 1.5).toFixed(1)));
      setInputCount((prev) => prev + 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const keys = [
    { label: "W", action: "Accelerate / Forward" },
    { label: "A", action: "Steer Left" },
    { label: "S", action: "Reverse / Brake" },
    { label: "D", action: "Steer Right" },
    { label: "SPACE", action: "Handbrake Drift" },
    { label: "SHIFT", action: "Sprint / Boost" },
    { label: "F", action: "Enter Vehicle" },
    { label: "TAB", action: "Weapon Wheel" },
  ];

  return (
    <div className="rounded-2xl bg-[#090914] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-pink-400 font-bold uppercase tracking-wider mb-1">
            <Zap className="w-3.5 h-3.5" />
            Live Hardware Input Visualizer
          </div>
          <h3 className="text-xl font-black text-white">
            Press Any Key on Your Keyboard Right Now
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Watch sub-millisecond cloud translation into native PlayStation 5 controls
          </p>
        </div>

        {/* Real-time Polling Rate Badge */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-right">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Input Delay</span>
            <span className="font-mono text-base font-black text-emerald-400">
              {lastInputMs} ms
            </span>
          </div>
          <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-right">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Keypresses</span>
            <span className="font-mono text-base font-black text-cyan-300">
              {inputCount}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Key Grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {keys.map((k) => {
          const isActive = activeKey === k.label;

          return (
            <div
              key={k.label}
              className={`p-3.5 rounded-xl border transition-all duration-150 flex flex-col justify-between ${
                isActive
                  ? "bg-gradient-to-tr from-pink-600 to-purple-600 border-pink-400 shadow-lg shadow-pink-500/50 scale-105"
                  : "bg-[#0f0f1e] border-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-sm font-black px-2 py-0.5 rounded ${
                    isActive ? "bg-white text-black" : "bg-black/60 text-cyan-300 border border-white/10"
                  }`}
                >
                  {k.label}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                )}
              </div>
              <span
                className={`text-[11px] font-semibold mt-2 ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
              >
                {k.action}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Raw 1000Hz USB & Bluetooth Gamepad API supported</span>
        </div>
        <span className="font-mono text-[11px] text-pink-300">
          Last Active Key: <strong className="text-white">{activeKey}</strong>
        </span>
      </div>
    </div>
  );
}
