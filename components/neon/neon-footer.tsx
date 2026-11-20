"use client";

import React from "react";
import { Send } from "lucide-react";

export function NeonFooter() {
  return (
    <footer className="w-full py-8 border-t border-purple-500/10 bg-[#05030f] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-black text-xs">
            V
          </div>
          <span className="font-extrabold text-white text-sm">ViceCloud</span>
          <span className="text-[11px] text-slate-500">© 2026. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[11px]">
          <a
            href="https://t.me/vicecloudspport"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>24/7 Telegram Support (@vicecloudspport)</span>
          </a>
          <a href="/admin/login" className="text-slate-600 hover:text-slate-400 transition-colors">
            Operator Portal
          </a>
        </div>

      </div>
    </footer>
  );
}
