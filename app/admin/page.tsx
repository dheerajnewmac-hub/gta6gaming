"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminStatsBar } from "@/components/admin/admin-stats-bar";
import { PaymentsTable } from "@/components/admin/payments-table";
import { UsersTable } from "@/components/admin/users-table";
import { ScreenshotModal } from "@/components/admin/screenshot-modal";
import { PaymentSubmission, UserProfile, AdminStats } from "@/lib/types";
import { RefreshCw, CheckCircle2 } from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"payments" | "users">("payments");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [payments, setPayments] = useState<PaymentSubmission[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [inspectModal, setInspectModal] = useState<{ isOpen: boolean; img: string | null; id: string }>({
    isOpen: false,
    img: null,
    id: "",
  });
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [sRes, pRes, uRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/payments"),
        fetch("/api/admin/users"),
      ]);

      const sData = await sRes.json();
      const pData = await pRes.json();
      const uData = await uRes.json();

      if (sData.success) setStats(sData.stats);
      if (pData.success) setPayments(pData.payments);
      if (uData.success) setUsers(uData.users);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 4000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "approved" }),
      });
      const data = await res.json();
      if (data.success) {
        setActionNotice(`Payment ${id} approved & PS5 node unlocked!`);
        setTimeout(() => setActionNotice(null), 3000);
        fetchData();
      }
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  const handleReject = async (id: string, reason: string) => {
    try {
      const res = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "rejected", reason }),
      });
      const data = await res.json();
      if (data.success) {
        setActionNotice(`Payment ${id} declined.`);
        setTimeout(() => setActionNotice(null), 3000);
        fetchData();
      }
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#030511] text-slate-100 flex flex-col font-sans">
      <AdminHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Top Notification Toast */}
        {actionNotice && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* High-Level Overview Metrics */}
        <AdminStatsBar stats={stats} />

        {/* Section Tabs & Refresh Trigger */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-4 text-xs font-bold font-mono">
            <button
              onClick={() => setActiveTab("payments")}
              className={`pb-2 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "payments"
                  ? "border-cyan-400 text-cyan-300"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <span>Verification Queue</span>
              {stats && stats.pendingCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-black">
                  {stats.pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`pb-2 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "users"
                  ? "border-cyan-400 text-cyan-300"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <span>Registered Gamers</span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px]">
                {users.length}
              </span>
            </button>
          </div>

          <button
            onClick={() => {
              setLoading(true);
              fetchData();
            }}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-mono transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Auto-Sync (4s)</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "payments" ? (
          <PaymentsTable
            payments={payments}
            loading={loading}
            onApprove={handleApprove}
            onReject={handleReject}
            onInspectImage={(img, id) => setInspectModal({ isOpen: true, img, id })}
          />
        ) : (
          <UsersTable users={users} loading={loading} />
        )}

      </main>

      {/* Screenshot Lightbox Modal */}
      <ScreenshotModal
        isOpen={inspectModal.isOpen}
        imageUrl={inspectModal.img}
        paymentId={inspectModal.id}
        onClose={() => setInspectModal({ isOpen: false, img: null, id: "" })}
      />
    </div>
  );
}
