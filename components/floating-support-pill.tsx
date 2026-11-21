"use client";

import React from "react";
import { Send } from "lucide-react";

export function FloatingSupportPill() {
  return (
    <aside
      aria-label="Live Telegram Support"
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 select-none pointer-events-auto"
    >
      <a
        href="https://t.me/ViceCloudSupport"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact ViceCloudSupport on Telegram"
        className="group flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#0088cc]/95 hover:bg-[#0088cc] active:scale-95 text-white font-medium text-[11px] sm:text-xs tracking-wide shadow-[0_4px_18px_rgba(0,136,204,0.35)] hover:shadow-[0_6px_24px_rgba(0,136,204,0.55)] border border-sky-300/30 backdrop-blur-sm transition-all duration-200"
      >
        <span className="relative flex items-center justify-center">
          <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white -rotate-12 group-hover:rotate-0 transition-transform duration-200" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-2 ring-[#0088cc]" />
        </span>
        <span className="font-semibold text-white/95 group-hover:text-white whitespace-nowrap">
          ViceCloudSupport
        </span>
      </a>
    </aside>
  );
}
