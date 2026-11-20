"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Invalid credentials");
      }

      router.push("/admin");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication error";
      setErrorMsg(msg);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030511] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-[#070a20] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
        
        {/* Brand & Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-black text-white tracking-wide">
            ViceCloud Admin Portal
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Restricted Operator Access Only
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 mb-1 font-semibold">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="myw8210@gmail.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#030514] border border-white/10 text-white focus:border-cyan-400 outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-semibold">Secret Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#030514] border border-white/10 text-white focus:border-cyan-400 outline-none font-mono"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Authorize Session"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </main>
  );
}
