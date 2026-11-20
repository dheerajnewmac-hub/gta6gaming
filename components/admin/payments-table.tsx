"use client";

import React, { useState } from "react";
import { Check, X, Eye, ExternalLink, Search, Clock, CheckCircle2, XCircle } from "lucide-react";
import { PaymentSubmission } from "@/lib/types";

interface PaymentsTableProps {
  payments: PaymentSubmission[];
  loading: boolean;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string, reason: string) => Promise<void>;
  onInspectImage: (img: string, id: string) => void;
}

export function PaymentsTable({
  payments,
  loading,
  onApprove,
  onReject,
  onInspectImage,
}: PaymentsTableProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [search, setSearch] = useState("");
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("Transaction not confirmed on TronScan");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const filtered = payments.filter((p) => {
    if (filter !== "all" && p.status !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.id.toLowerCase().includes(q) ||
        p.userEmail.toLowerCase().includes(q) ||
        p.gamerTag.toLowerCase().includes(q) ||
        (p.txid && p.txid.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleConfirmReject = async () => {
    if (!rejectId) return;
    setProcessingId(rejectId);
    await onReject(rejectId, rejectReason);
    setRejectId(null);
    setProcessingId(null);
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#070a20] border border-white/10 text-xs font-bold w-full sm:w-auto">
          {(["pending", "all", "approved", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                filter === tab
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab === "pending" ? "Pending Review" : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search email, ID, TXID..."
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
                <th className="py-3 px-4">Order / Time</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Plan / Due</th>
                <th className="py-3 px-4">TXID</th>
                <th className="py-3 px-4">Proof</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Loading verification queue...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No payment records match this filter.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-white block">{p.id}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(p.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-white block font-sans font-medium">{p.userEmail}</span>
                      <span className="text-[10px] text-cyan-400">{p.gamerTag}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-white font-bold block">{p.amount}</span>
                      <span className="text-[10px] text-slate-400">{p.planName}</span>
                    </td>
                    <td className="py-3.5 px-4 max-w-[150px]">
                      {p.txid ? (
                        <a
                          href={`https://tronscan.org/#/transaction/${p.txid}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:underline truncate block flex items-center gap-1"
                        >
                          <span className="truncate">{p.txid}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-slate-500 italic">Not provided</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => onInspectImage(p.screenshotUrl, p.id)}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Inspect</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4">
                      {p.status === "pending" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                          <Clock className="w-3 h-3 animate-pulse" />
                          Pending
                        </span>
                      )}
                      {p.status === "approved" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          Approved
                        </span>
                      )}
                      {p.status === "rejected" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-300 border border-red-500/30 text-[10px] font-bold" title={p.rejectionReason}>
                          <XCircle className="w-3 h-3" />
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {p.status === "pending" ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={async () => {
                              setProcessingId(p.id);
                              await onApprove(p.id);
                              setProcessingId(null);
                            }}
                            disabled={processingId === p.id}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1 transition-all"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => setRejectId(p.id)}
                            disabled={processingId === p.id}
                            className="px-2.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-bold flex items-center gap-1 transition-all"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-[10px]">Settled</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0d24] border border-red-500/40 rounded-2xl p-5 max-w-sm w-full space-y-3 shadow-2xl">
            <h4 className="text-sm font-bold text-white">Decline Verification</h4>
            <p className="text-xs text-slate-300">Select reason to notify the user on their screen:</p>
            <select
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#060818] border border-white/10 text-xs text-white outline-none focus:border-red-400"
            >
              <option value="Transaction not confirmed on TronScan">Transaction not confirmed on TronScan</option>
              <option value="Incorrect payment amount sent">Incorrect payment amount sent</option>
              <option value="Invalid screenshot proof provided">Invalid screenshot proof provided</option>
              <option value="Duplicate transaction hash used">Duplicate transaction hash used</option>
            </select>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setRejectId(null)}
                className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs text-white font-bold"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
