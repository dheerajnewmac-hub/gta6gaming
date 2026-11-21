"use client";

import React from "react";
import { Send } from "lucide-react";

export function FloatingSupportPill() {
  return (
    <aside aria-label="Live Support" className="fixed bottom-6 right-5 z-50 select-none">
      <a
        href="https://t.me/ViceCloudSupport"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with ViceCloudSupport on Telegram"
        className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#0088cc] to-[#0099e6] hover:brightness-110 text-white font-bold text-xs tracking-wide shadow-[0_6px_25px_rgba(0,136,204,0.45)] border border-white/25 transition-all duration-200 hover:scale-[1.03] active:scale-95"
      >
        <div className="relative shrink-0 flex items-center justify-center">
          <Send className="w-3.5 h-3.5 fill-white text-white -rotate-12 group-hover:rotate-0 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 border border-[#0088cc] animate-ping" />
        </div>
        <span className="whitespace-nowrap">ViceCloudSupport</span>
      </a>
    </aside>
  );
}
