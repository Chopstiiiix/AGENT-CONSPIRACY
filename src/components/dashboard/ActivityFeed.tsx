"use client";

import { motion } from "framer-motion";

const ACTIVITY_ITEMS = [
  { time: "14:32:07", agent: "EMILY", action: "Resolved ticket #4821 — order status query", color: "#00ff88" },
  { time: "14:31:44", agent: "FELIX-3", action: "Reconciled 47 transactions — March batch", color: "#00d4ff" },
  { time: "14:29:18", agent: "EMILY", action: "Escalated ticket #4819 to human operator — low confidence", color: "#00ff88" },
  { time: "14:27:55", agent: "FELIX-3", action: "Generated weekly P&L summary report", color: "#00d4ff" },
  { time: "14:25:02", agent: "EMILY", action: "Processed refund $42.99 — order #91204", color: "#00ff88" },
  { time: "14:22:31", agent: "EMILY", action: "Resolved ticket #4818 — shipping delay inquiry", color: "#00ff88" },
  { time: "14:19:47", agent: "FELIX-3", action: "Categorised 23 expense entries — travel & meals", color: "#00d4ff" },
  { time: "14:17:12", agent: "EMILY", action: "Updated knowledge base — new return policy v3.2", color: "#00ff88" },
  { time: "14:14:08", agent: "FELIX-3", action: "Flagged duplicate invoice #INV-4401", color: "#00d4ff" },
  { time: "14:11:33", agent: "EMILY", action: "Resolved ticket #4816 — password reset assistance", color: "#00ff88" },
];

export function ActivityFeed() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2
          className="text-[11px] tracking-[3px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
        >
          {"// ACTIVITY_FEED"}
        </h2>
        <span
          className="flex items-center gap-1.5 text-[9px] tracking-[1px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--neon)" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: "var(--neon)",
              boxShadow: "0 0 6px rgba(0,255,136,0.6)",
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
          LIVE
        </span>
      </div>

      <div className="flex flex-col gap-0">
        {ACTIVITY_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.25 }}
            className="flex items-start gap-3 px-3 py-2.5"
            style={{
              borderBottom: "1px solid var(--border-dim)",
            }}
          >
            <span
              className="shrink-0 text-[10px] tabular-nums pt-px"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
            >
              {item.time}
            </span>
            <span
              className="shrink-0 text-[10px] tracking-[1px] pt-px"
              style={{ fontFamily: "var(--font-mono)", color: item.color }}
            >
              [{item.agent}]
            </span>
            <span
              className="text-[11px] leading-relaxed"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
            >
              {item.action}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
