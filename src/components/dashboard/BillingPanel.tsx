"use client";

import { useState } from "react";
import type { ContractRecord, InvoiceRecord } from "@/lib/data/queries";

export function BillingPanel({
  contracts,
  invoices,
}: {
  contracts: ContractRecord[];
  invoices: InvoiceRecord[];
}) {
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null);

  const activeContracts = contracts.filter((c) => c.status === "active");

  return (
    <div className="flex flex-col gap-8">
      {/* Active subscriptions */}
      <div className="flex flex-col gap-4">
        <h2
          className="text-[11px] tracking-[3px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
        >
          {"// ACTIVE_SUBSCRIPTIONS"}
        </h2>

        {activeContracts.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between p-4"
            style={{ background: "var(--surface-1)", border: "1px solid var(--border-dim)" }}
          >
            <div className="flex flex-col gap-1">
              <span
                className="text-sm"
                style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
              >
                {c.agentName}
              </span>
              <span
                className="text-[10px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
              >
                {c.billingPeriod.toUpperCase()} · ${c.price}/{c.unit}
              </span>
              <span
                className="text-[9px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
              >
                NEXT BILLING: {getNextBillingDate(c)}
              </span>
            </div>

            {confirmCancel === c.id ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmCancel(null)}
                  className="px-3 py-1.5 text-[9px] tracking-[1px] cursor-pointer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-dim)",
                    background: "transparent",
                  }}
                >
                  KEEP
                </button>
                <button
                  onClick={() => setConfirmCancel(null)}
                  className="px-3 py-1.5 text-[9px] tracking-[1px] cursor-pointer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--pink)",
                    border: "1px solid var(--pink)",
                    background: "rgba(255,0,102,0.08)",
                  }}
                >
                  CONFIRM CANCEL
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmCancel(c.id)}
                className="px-3 py-1.5 text-[9px] tracking-[2px] cursor-pointer transition-colors hover:text-[var(--pink)] hover:border-[var(--pink)]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-tertiary)",
                  border: "1px solid var(--border-dim)",
                  background: "transparent",
                }}
              >
                CANCEL
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Invoice history */}
      <div className="flex flex-col gap-4">
        <h2
          className="text-[11px] tracking-[3px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
        >
          {"// INVOICE_HISTORY"}
        </h2>

        <div
          style={{ border: "1px solid var(--border-dim)" }}
        >
          {/* Header */}
          <div
            className="grid grid-cols-4 gap-2 px-4 py-2"
            style={{
              background: "var(--surface-2)",
              borderBottom: "1px solid var(--border-dim)",
            }}
          >
            {["DATE", "AGENT", "AMOUNT", "STATUS"].map((h) => (
              <span
                key={h}
                className="text-[8px] tracking-[2px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="grid grid-cols-4 gap-2 px-4 py-2.5"
              style={{ borderBottom: "1px solid var(--border-dim)" }}
            >
              <span
                className="text-[10px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
              >
                {inv.date}
              </span>
              <span
                className="text-[10px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}
              >
                {inv.agentName}
              </span>
              <span
                className="text-[10px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}
              >
                ${inv.amount.toLocaleString()}
              </span>
              <span
                className="text-[9px] tracking-[1px]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: inv.status === "paid" ? "var(--neon)" : "var(--amber)",
                }}
              >
                {inv.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getNextBillingDate(c: ContractRecord): string {
  const start = new Date(c.startedAt);
  const now = new Date();
  const next = new Date(start);

  if (c.billingPeriod === "daily") {
    next.setDate(now.getDate() + 1);
  } else if (c.billingPeriod === "monthly") {
    next.setMonth(now.getMonth() + 1);
    next.setDate(start.getDate());
  } else if (c.billingPeriod === "yearly") {
    next.setFullYear(now.getFullYear() + 1);
  } else {
    return "N/A";
  }

  return next.toISOString().split("T")[0];
}
