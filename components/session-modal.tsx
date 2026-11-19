"use client";

import React, { useState, useEffect } from "react";
import { X, Server, Shield, CheckCircle2, Lock, ArrowRight, Zap } from "lucide-react";

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: { name: string; price: string; hours: string } | null;
}

export function SessionModal({ isOpen, onClose, selectedPlan }: SessionModalProps) {
  const [stage, setStage] = useState<"CONNECTING" | "PLAYING" | "CHECKOUT">("CHECKOUT");
  const [allocatedNode, setAllocatedNode] = useState("PS5-RIG-0842");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      if (selectedPlan) {
        setStage("CHECKOUT");
      } else {
        setStage("CONNECTING");
        const nodeNum = Math.floor(Math.random() * 800) + 100;
        setAllocatedNode(`PS5-RIG-0${nodeNum}`);

        const timer = setTimeout(() => {
          setStage("PLAYING");
        }, 1500);

        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, selectedPlan]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#090c1e] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,210,255,0.25)] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#060816]">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wide">
              {stage === "CHECKOUT"
                ? `Activate ${selectedPlan?.name || "Pass"}`
                : "Live PS5 Cloud Stream Session"}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* 1. CONNECTING STAGE */}
          {stage === "CONNECTING" && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 p-[2px] mx-auto animate-spin">
                <div className="w-full h-full bg-[#090c1e] rounded-full flex items-center justify-center">
                  <Server className="w-7 h-7 text-cyan-400" />
                </div>
              </div>
              <h4 className="text-lg font-bold text-white">
                Allocating PlayStation 5 Console...
              </h4>
              <p className="text-xs text-gray-400 font-mono">
                Assigned Node: <span className="text-cyan-400 font-bold">{allocatedNode}</span> • Handshaking WebRTC 60 FPS Stream...
              </p>
            </div>
          )}

          {/* 2. PLAYING / DEMO STREAM STAGE */}
          {stage === "PLAYING" && (
            <div>
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 bg-black aspect-video flex flex-col justify-between p-4 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-950/80 via-blue-900/40 to-cyan-950/80" />
                
                <div className="relative z-10 flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-black/70 text-emerald-400 font-bold border border-emerald-500/30">
                    ● STREAM LIVE (60.0 FPS)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/70 text-cyan-300 font-bold">
                    NODE: {allocatedNode}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/70 text-pink-400 font-bold">
                    LATENCY: 14ms
                  </span>
                </div>

                <div className="relative z-10 text-center my-auto space-y-2">
                  <div className="inline-block px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 shadow-lg">
                    <p className="text-sm font-extrabold text-white tracking-wider uppercase">
                      Grand Theft Auto VI: Ready To Play
                    </p>
                    <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                      Keyboard &amp; Mouse / Controller Input Active
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-gray-300">
                  <span>Press ESC to exit stream</span>
                  <span className="text-yellow-400 font-bold">Session Active</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                <div className="text-xs text-gray-400">
                  Need more remote session time?
                </div>
                <button
                  onClick={() => setStage("CHECKOUT")}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
                >
                  <span>Select Pass</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* 3. CHECKOUT STAGE */}
          {stage === "CHECKOUT" && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#060816] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-cyan-400 font-mono font-bold uppercase">
                    Selected Pass
                  </span>
                  <h4 className="text-lg font-black text-white">
                    {selectedPlan?.name || "Starter Pack"}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {selectedPlan?.hours || "5 hours of remote PS5 session time"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white">
                    {selectedPlan?.price || "$19.99"}
                  </span>
                  <span className="block text-[10px] text-emerald-400 font-semibold">
                    Instant Activation
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wide block">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 rounded-xl bg-[#0c122b] border-2 border-cyan-400 text-left flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold text-white">Card / Apple Pay</span>
                      <span className="text-[10px] text-gray-400">Stripe Global (Zero Fee)</span>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </button>

                  <button className="p-3 rounded-xl bg-[#060816] border border-white/10 hover:border-cyan-400 text-left flex items-center justify-between transition-colors">
                    <div>
                      <span className="block text-xs font-bold text-white">Crypto (USDT/SOL)</span>
                      <span className="text-[10px] text-gray-400">Anonymous 0-Wait</span>
                    </div>
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </button>
                </div>
              </div>

              {/* Email / Username field */}
              <div className="space-y-1.5">
                <label htmlFor="gamer-email" className="text-xs font-semibold text-gray-300">
                  Gamer Email (Where session credentials are sent)
                </label>
                <input
                  id="gamer-email"
                  name="email"
                  type="email"
                  required
                  placeholder="gamer@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060816] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

              {/* Security Note & CTA */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    alert("Order Confirmed! Your dedicated PS5 Rig #401 is now ready for GTA VI.");
                    setStage("PLAYING");
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,210,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Confirm &amp; Launch GTA VI Rig</span>
                </button>
                <p className="text-center text-[10px] text-gray-500 mt-2 flex items-center justify-center gap-1.5">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  256-Bit SSL Encrypted Checkout • Non-US operator disclaimer applies
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
