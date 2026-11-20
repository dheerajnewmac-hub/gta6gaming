"use client";

import React, { useState } from "react";
import { Send, X } from "lucide-react";

export function FloatingSupportPill() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-24 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2 font-sans select-none">
      {/* Optional Mini Flyout Banner (Desktop only or on request) */}
      {showTooltip && (
        <div className="hidden sm:block bg-[#090d29] border border-cyan-500/40 rounded-2xl p-3 shadow-[0_10px_35px_rgba(0,0,0,0.8)] max-w-xs text-xs text-slate-200 animate-in fade-in slide-in-from-bottom-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Operator Online
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Need help with payment verification or setup? Chat with our operator directly on Telegram!
          </p>
          <a
            href="https://t.me/vicecloudspport"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(14,165,233,0.4)]"
          >
            <Send className="w-3 h-3" />
            <span>Open @vicecloudspport</span>
          </a>
        </div>
      )}

      {/* Main Floating Telegram Button (Compact & Positioned on the Side) */}
      <a
        href="https://t.me/vicecloudspport"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Contact 24/7 Telegram Support @vicecloudspport"
        className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-[#0088cc] to-[#00a2f5] hover:brightness-110 text-white font-bold text-xs shadow-[0_4px_20px_rgba(0,136,204,0.55)] border border-white/25 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <div className="relative shrink-0">
          <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white -rotate-12 group-hover:rotate-0 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 border border-[#0088cc] animate-ping" />
        </div>
        <div className="flex flex-col text-left">
          <span className="leading-tight font-extrabold text-[11px] sm:text-[12px] tracking-wide whitespace-nowrap">
            <span className="sm:hidden">Support</span>
            <span className="hidden sm:inline">24/7 Telegram Support</span>
          </span>
          <span className="text-[9px] text-sky-100 font-mono opacity-90 leading-none hidden sm:inline">
            @vicecloudspport
          </span>
        </div>
      </a>
    </div>
  );
}
