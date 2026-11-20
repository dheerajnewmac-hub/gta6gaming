"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Play } from "lucide-react";
import { CryptoCheckoutView } from "./crypto-checkout-view";
import { WaitlistReviewView } from "./waitlist-review-view";

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: { name: string; price: string; hours: string } | null;
}

export function SessionModal({ isOpen, onClose, selectedPlan }: SessionModalProps) {
  const [stage, setStage] = useState<"CHECKOUT" | "WAITLIST" | "ACTIVATED" | "PLAYING">("CHECKOUT");
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [allocatedNode, setAllocatedNode] = useState("PS5-RIG-0842");
  const [passcode, setPasscode] = useState("VICE-8842-PS5X");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setStage("CHECKOUT");
      setPaymentId(null);
      const nodeNum = Math.floor(Math.random() * 800) + 100;
      setAllocatedNode(`PS5-RIG-0${nodeNum}`);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#080b22] border border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.3)] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#050718]">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wide">
              {stage === "CHECKOUT" && `Activate ${selectedPlan?.name || "Pass"}`}
              {stage === "WAITLIST" && "Verification Queue • Under Review"}
              {stage === "ACTIVATED" && "PS5 Blade Rig Reserved & Ready"}
              {stage === "PLAYING" && "Live PS5 Cloud Stream Session"}
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
        <div className="p-5 sm:p-6 max-h-[85vh] overflow-y-auto">
          
          {/* STAGE 1: CHECKOUT */}
          {stage === "CHECKOUT" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#040614] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-wider">
                    Selected Rig Pass
                  </span>
                  <h4 className="text-base font-black text-white">{selectedPlan?.name || "Starter Pack"}</h4>
                  <p className="text-xs text-gray-400">{selectedPlan?.hours || "5 hours remote PS5 session time"}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white">{selectedPlan?.price || "$8.99"}</span>
                  <span className="block text-[10px] text-emerald-400 font-semibold">Instant Allocation</span>
                </div>
              </div>

              <CryptoCheckoutView
                planName={selectedPlan?.name || "Starter Pack"}
                price={selectedPlan?.price || "$8.99"}
                hours={selectedPlan?.hours || "5 hours"}
                onPaymentSubmitted={(id) => {
                  setPaymentId(id);
                  setStage("WAITLIST");
                }}
              />
            </div>
          )}

          {/* STAGE 2: WAITLIST REVIEW SCREEN */}
          {stage === "WAITLIST" && paymentId && (
            <WaitlistReviewView
              paymentId={paymentId}
              onApproved={(data) => {
                setAllocatedNode(data.allocatedNode);
                setPasscode(data.sessionPasscode);
                setStage("ACTIVATED");
              }}
              onBackToCheckout={() => setStage("CHECKOUT")}
            />
          )}

          {/* STAGE 3: ACTIVATED (Shows Credentials & Launch Button) */}
          {stage === "ACTIVATED" && (
            <div className="space-y-4 py-2">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-2 shadow-[0_0_20px_rgba(160,185,129,0.4)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-white">Payment Approved! Rig Online.</h4>
                <p className="text-xs text-gray-400">Your dedicated PS5 hardware blade is assigned and ready to stream.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#040614] border border-cyan-500/30 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Allocated Rig:</span>
                  <span className="text-cyan-300 font-bold">{allocatedNode}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Active Pass:</span>
                  <span className="text-white font-bold">{selectedPlan?.name || "Starter Pack"} ({selectedPlan?.hours})</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Stream Protocol:</span>
                  <span className="text-emerald-400 font-bold">WebRTC 4K/60FPS Hardware Accelerated</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Session Passcode:</span>
                  <span className="text-pink-400 font-bold">{passcode}</span>
                </div>
              </div>

              <button
                onClick={() => setStage("PLAYING")}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Launch GTA VI Stream Fullscreen</span>
              </button>
            </div>
          )}

          {/* STAGE 4: PLAYING */}
          {stage === "PLAYING" && (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-black aspect-video flex flex-col justify-between p-4 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-950/80 via-blue-900/40 to-cyan-950/80" />
                <div className="relative z-10 flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-black/70 text-emerald-400 font-bold border border-emerald-500/30">
                    ● STREAM LIVE (60.0 FPS LOCKED)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/70 text-cyan-300 font-bold">
                    LATENCY: 14.2ms
                  </span>
                </div>
                <div className="relative z-10 text-center py-6">
                  <p className="text-lg font-black text-white drop-shadow-md">
                    GTA VI Active Session Connected
                  </p>
                  <p className="text-xs text-gray-300 font-mono mt-1">
                    Keyboard &amp; Mouse Pointer Lock Enabled • Press F11 for Fullscreen
                  </p>
                </div>
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>Press ESC to exit modal</span>
                  <span className="text-emerald-400 font-bold">Auto Cloud Save Active</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
