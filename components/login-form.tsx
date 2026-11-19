"use client";

import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, UserPlus, LogIn, Sparkles } from "lucide-react";
import { loginSchema } from "@/lib/auth-schema";
import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase";

export function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [pendingPlanName, setPendingPlanName] = useState<string | null>(null);

  const { loginUser } = useAuth();

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("vicecloud_pending_plan");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name) setPendingPlanName(parsed.name);
      }
    } catch {
      // Ignore
    }
  }, []);

  const finishAndRedirect = (gamerEmail: string, id?: string) => {
    loginUser(gamerEmail, id);
    setTimeout(() => {
      window.location.href = "/?checkout=true";
    }, 1100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setErrorMsg(validation.error.issues[0]?.message || "Invalid credentials");
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        // Real Supabase Account Registration
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
        });

        if (error) {
          setErrorMsg(error.message);
          setLoading(false);
          return;
        }

        setSuccessMsg("Gamer account created! Reserving your PS5 Blade Node...");
        finishAndRedirect(email.trim().toLowerCase(), data.user?.id);
      } else {
        // Real Supabase Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

        if (error) {
          setErrorMsg(
            error.message.includes("Invalid login credentials")
              ? "Account not found or wrong password. Click 'Create Account' below to sign up."
              : error.message
          );
          setLoading(false);
          return;
        }

        setSuccessMsg("Welcome back! Reserving your PS5 Blade Node...");
        finishAndRedirect(email.trim().toLowerCase(), data.user?.id);
      }
    } catch {
      setErrorMsg("Connection issue. Please verify your internet and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {pendingPlanName && (
        <div className="mb-4 p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Sign in to activate your selected <strong>{pendingPlanName}</strong>
          </span>
        </div>
      )}

      {/* Mode Switch Tabs */}
      <div className="flex rounded-xl bg-slate-900/80 p-1 border border-white/10 mb-5">
        <button
          type="button"
          onClick={() => {
            setIsSignUp(false);
            setErrorMsg(null);
          }}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            !isSignUp
              ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Sign In</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setIsSignUp(true);
            setErrorMsg(null);
          }}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            isSignUp
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Create Account</span>
        </button>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">Gamer Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="gamer@gmail.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[10px] text-gray-500 mt-1">Minimum 6 characters</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg active:scale-[0.99] disabled:opacity-50 ${
            isSignUp
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/25"
              : "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white shadow-pink-500/25"
          }`}
        >
          {loading
            ? isSignUp
              ? "Creating Account in Database..."
              : "Verifying with Database..."
            : isSignUp
            ? "Create Gamer Account & Continue"
            : "Sign In & Deploy Session"}
        </button>
      </form>
    </div>
  );
}
