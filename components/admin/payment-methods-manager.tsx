"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Power, QrCode, Check, AlertCircle } from "lucide-react";
import { PaymentMethodConfig } from "@/lib/types";
import { MethodEditModal } from "./method-edit-modal";

export function PaymentMethodsManager({
  methods,
  onRefresh,
}: {
  methods: PaymentMethodConfig[];
  onRefresh: () => void;
}) {
  const [editingMethod, setEditingMethod] = useState<PaymentMethodConfig | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleToggle = async (id: string) => {
    try {
      const res = await fetch("/api/admin/payment-methods", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setActionNotice(`Method status updated!`);
        setTimeout(() => setActionNotice(null), 3000);
        onRefresh();
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this payment method?")) return;
    try {
      const res = await fetch(`/api/admin/payment-methods?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setActionNotice("Payment method deleted successfully.");
        setTimeout(() => setActionNotice(null), 3000);
        onRefresh();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="space-y-4">
      {actionNotice && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white font-mono">
            Payment Gateways &amp; Wallet Addresses ({methods.length})
          </h3>
          <p className="text-xs text-slate-400">
            Add, edit, or toggle payment options available on the user checkout modal.
          </p>
        </div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Method</span>
        </button>
      </div>

      {/* Grid of Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {methods.map((m) => (
          <div
            key={m.id}
            className={`p-4 rounded-2xl border transition-all ${
              m.isEnabled
                ? "bg-[#070a20] border-cyan-500/30 shadow-[0_4px_20px_rgba(6,182,212,0.1)]"
                : "bg-white/[0.01] border-white/5 opacity-60"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{m.name}</span>
                  {m.badge && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono">
                      {m.badge}
                    </span>
                  )}
                </h4>
                <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                  {m.networkName}
                </span>
              </div>
              <button
                onClick={() => handleToggle(m.id)}
                title={m.isEnabled ? "Click to Disable" : "Click to Enable"}
                className={`p-1.5 rounded-lg border transition-all ${
                  m.isEnabled
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : "bg-slate-800 text-slate-400 border-white/10"
                }`}
              >
                <Power className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Account Value / Wallet Details */}
            <div className="p-2.5 rounded-xl bg-[#040614] border border-white/5 my-2.5 font-mono text-[11px]">
              <span className="text-slate-400 block text-[10px]">Configured Target:</span>
              <span className="text-white truncate block select-all font-semibold">
                {m.accountValue ? m.accountValue : <span className="text-amber-400 italic">Not set (Click edit to add)</span>}
              </span>
            </div>

            {m.qrCodeUrl && (
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono mb-2">
                <QrCode className="w-3.5 h-3.5" />
                <span>QR Code Attached</span>
              </div>
            )}

            {/* Card Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
              <span className="text-slate-400 text-[10px]">
                {m.isEnabled ? "● Active on Website" : "○ Disabled"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingMethod(m)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-white transition-colors"
                  title="Edit details"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                  title="Remove method"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      {(editingMethod || isAddingNew) && (
        <MethodEditModal
          initialData={editingMethod}
          isOpen={true}
          onClose={() => {
            setEditingMethod(null);
            setIsAddingNew(false);
          }}
          onSaved={() => {
            setEditingMethod(null);
            setIsAddingNew(false);
            onRefresh();
          }}
        />
      )}
    </div>
  );
}
