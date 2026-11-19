import React from "react";
import Link from "next/link";
import { Gamepad2, ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gamer Sign In | ViceCloud GTA VI Cloud Gaming",
  description: "Sign in to access your allocated PS5 cloud gaming rig and cloud saves.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#03040c] text-white flex flex-col justify-between relative overflow-hidden py-8 px-4 sm:px-6">
      
      {/* Background Neon Atmospheric Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Top Header Bar */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>1,000 RIGS ONLINE</span>
        </div>
      </div>

      {/* Center Auth Card */}
      <div className="max-w-md w-full mx-auto my-8 relative z-10">
        <div className="rounded-3xl bg-[#090c24]/90 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          
          {/* Brand Header */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-lg tracking-wider text-white">
                VICE<span className="text-cyan-400">CLOUD</span>
              </span>
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tight">Gamer Portal Sign In</h1>
            <p className="text-xs text-gray-400 mt-1">
              Connect to your allocated PlayStation 5 rig &amp; encrypted cloud saves
            </p>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Footer Callout */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center space-y-3">
            <p className="text-xs text-gray-400">
              Don&apos;t have an active rig pass?{" "}
              <Link href="/#plans" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
                Choose a Pass from $1.99 &rarr;
              </Link>
            </p>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit SSL Encrypted Gaming Session</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-[11px] text-gray-600 font-mono z-10">
        &copy; {new Date().getFullYear()} ViceCloud Network Ltd. All rights reserved.
      </div>

    </main>
  );
}
