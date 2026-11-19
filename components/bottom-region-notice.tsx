"use client";

import React from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";

export function BottomRegionNotice() {
  return (
    <div className="w-full bg-[#05060f] border-t border-white/5 py-3.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Left Warning / Regional Restriction Text */}
        <div className="flex items-center gap-2 text-gray-400">
          <AlertTriangle className="w-4 h-4 text-pink-500 shrink-0" />
          <span>
            Service restricted to operator-enabled regions. Notice: India is not supported.
          </span>
        </div>

        {/* Right CTA */}
        <a
          href="#compatibility"
          className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5 transition-colors shrink-0"
        >
          <span>Check Your Region</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

      </div>
    </div>
  );
}
