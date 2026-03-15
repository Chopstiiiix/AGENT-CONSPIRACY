"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const BOOT_LINES = [
  { prefix: "[SYS]", text: "Initializing agent instance...", color: "var(--text-secondary)" },
  { prefix: "[OK]", text: "Knowledge base indexed", color: "var(--neon)" },
  { prefix: "[OK]", text: "Gmail authenticated", color: "var(--neon)" },
  { prefix: "[OK]", text: "Zendesk authenticated", color: "var(--neon)" },
  { prefix: "[OK]", text: "Listening for events...", color: "var(--neon)" },
  { prefix: "[>>>]", text: "Agent ONLINE", color: "var(--neon)" },
];

export function DeploySuccess({ agentName }: { agentName: string }) {
  return (
    <div className="flex flex-col items-center gap-8 max-w-lg mx-auto py-10">
      {/* Check circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="flex h-20 w-20 items-center justify-center text-3xl"
        style={{
          borderRadius: "50%",
          border: "2px solid var(--neon)",
          color: "var(--neon)",
          boxShadow: "0 0 30px rgba(0,255,136,0.3), 0 0 60px rgba(0,255,136,0.1)",
        }}
      >
        ✓
      </motion.div>

      {/* Title */}
      <h1
        className="text-2xl tracking-[4px] text-center"
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 900,
          color: "var(--neon)",
          textShadow: "0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.15)",
        }}
      >
        AGENT DEPLOYED
      </h1>

      {/* Terminal readout */}
      <div
        className="w-full p-5 flex flex-col gap-0"
        style={{
          background: "var(--surface-1)",
          border: "1px solid var(--border-dim)",
        }}
      >
        <div
          className="mb-3 text-[9px] tracking-[2px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
        >
          {"// BOOT_SEQUENCE — " + agentName}
        </div>

        {BOOT_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.3, duration: 0.3 }}
            className="flex gap-2 py-1 text-[12px]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span style={{ color: line.color }}>{line.prefix}</span>
            <span style={{ color: "var(--text-secondary)" }}>
              {line.text}
              {i === BOOT_LINES.length - 1 && (
                <span
                  className="inline-block w-2 h-3.5 ml-1 align-middle"
                  style={{
                    background: "var(--neon)",
                    animation: "blink-cursor 1s step-end infinite",
                  }}
                />
              )}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-2">
        <Link
          href="/browse"
          className="px-6 py-2.5 text-[10px] tracking-[2px] transition-colors"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-secondary)",
            background: "transparent",
            border: "1px solid var(--border-dim)",
          }}
        >
          ← MARKETPLACE
        </Link>
        <Link
          href="#"
          className="px-6 py-2.5 text-[10px] tracking-[2px] font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]"
          style={{
            fontFamily: "var(--font-heading)",
            background: "var(--neon)",
            color: "var(--background)",
            border: "1px solid var(--neon)",
          }}
        >
          VIEW DASHBOARD
        </Link>
      </div>
    </div>
  );
}
