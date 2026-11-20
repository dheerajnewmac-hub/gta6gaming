"use client";

import React, { useState } from "react";
import { Search, UserCheck, Shield } from "lucide-react";
import { UserProfile } from "@/lib/types";

export function UsersTable({
  users,
  loading,
}: {
  users: UserProfile[];
  loading: boolean;
}) {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return u.email.toLowerCase().includes(q) || u.gamerTag.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-cyan-400" />
          <span>Registered Gamer Accounts ({users.length})</span>
        </h3>
        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gamer email..."
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#070a20] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 outline-none"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-white/10 bg-[#070a20] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#050718] border-b border-white/10 text-[11px] font-mono text-slate-400 uppercase">
              <tr>
                <th className="py-3 px-4">Gamer Profile</th>
                <th className="py-3 px-4">Account ID</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Loading users list...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No registered users found.
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-sans font-bold text-white block">{u.email}</span>
                      <span className="text-[10px] text-cyan-400">{u.gamerTag}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{u.id}</td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-slate-200 font-bold">
                        {u.totalOrders} Passes
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-emerald-400 font-bold">
                      ${u.totalSpent.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                        <Shield className="w-3 h-3" />
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
