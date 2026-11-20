"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, LogOut, Radio, ExternalLink } from "lucide-react";

export function AdminHeader() {
  const router = useRouter();
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTimeStr(new Date().toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    document.cookie = "vc_admin_session=; Max-Age=0; path=/;";
    router.push("/admin/login");
  };

  return (
    <header className="py-4 px-4 sm:px-8 bg-[#050718] border-b border-white/[0.08] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <div className="w-full h-full bg-[#07091d] rounded-[6px] flex items-center justify-center">
                <span className="font-black text-sm text-cyan-400">V</span>
              </div>
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wide text-white block leading-tight">
                ViceCloud Admin
              </span>
              <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase block">
                CONTROL CENTER
              </span>
            </div>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
            <Radio className="w-3 h-3 animate-pulse" />
            LIVE FLEET ONLINE
          </span>
        </div>

        {/* Right Info & Actions */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs font-mono">
          <span className="text-slate-400 hidden md:inline">{timeStr}</span>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/10 hover:border-red-500/40 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>
    </header>
  );
}
