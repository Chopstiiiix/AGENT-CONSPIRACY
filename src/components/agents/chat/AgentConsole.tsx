"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LogEntry {
  id: string;
  timestamp: string;
  type: "system" | "operator" | "emily" | "status";
  content: string;
}

function getTimestamp() {
  return new Date().toLocaleTimeString("en-GB", { hour12: false });
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function AgentConsole() {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: uid(), timestamp: getTimestamp(), type: "system", content: "EMILY v7.2 — Customer Service Agent" },
    { id: uid(), timestamp: getTimestamp(), type: "system", content: "Session initialized. Encryption: AES-256-GCM" },
    { id: uid(), timestamp: getTimestamp(), type: "status", content: "AGENT ONLINE — awaiting input" },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [agentStatus, setAgentStatus] = useState<"idle" | "thinking" | "responding">("idle");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<{ role: "user" | "assistant"; content: string }[]>([]);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [logs, scrollToBottom]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = input.trim();
    if (!msg || streaming) return;

    setInput("");
    setStreaming(true);
    setAgentStatus("thinking");

    // Add operator message
    const operatorEntry: LogEntry = {
      id: uid(),
      timestamp: getTimestamp(),
      type: "operator",
      content: msg,
    };
    setLogs((prev) => [...prev, operatorEntry]);

    // Track conversation history
    messagesRef.current = [...messagesRef.current, { role: "user", content: msg }];

    // Add thinking indicator
    const thinkingId = uid();
    setLogs((prev) => [
      ...prev,
      { id: thinkingId, timestamp: getTimestamp(), type: "status", content: "EMILY is processing..." },
    ]);

    try {
      const res = await fetch("/api/agents/emily/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesRef.current }),
      });

      // Remove thinking indicator
      setLogs((prev) => prev.filter((l) => l.id !== thinkingId));
      setAgentStatus("responding");

      const emilyId = uid();
      setLogs((prev) => [
        ...prev,
        { id: emilyId, timestamp: getTimestamp(), type: "emily", content: "" },
      ]);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ") && line !== "data: [DONE]") {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.text) {
                  fullText += data.text;
                  setLogs((prev) =>
                    prev.map((l) =>
                      l.id === emilyId ? { ...l, content: fullText } : l,
                    ),
                  );
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        }
      }

      messagesRef.current = [...messagesRef.current, { role: "assistant", content: fullText }];
    } catch {
      setLogs((prev) => prev.filter((l) => l.id !== thinkingId));
      setLogs((prev) => [
        ...prev,
        { id: uid(), timestamp: getTimestamp(), type: "system", content: "CONNECTION ERROR — retry or check API key" },
      ]);
    }

    setStreaming(false);
    setAgentStatus("idle");
    inputRef.current?.focus();
  }

  return (
    <div className="flex h-[calc(100vh-65px)] max-h-[calc(100vh-65px)]">
      {/* Main console */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Console header */}
        <div
          className="flex items-center justify-between px-5 py-3 shrink-0"
          style={{ borderBottom: "1px solid var(--border-dim)", background: "var(--surface-1)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center text-[10px] font-bold tracking-wider rounded-full"
              style={{
                fontFamily: "var(--font-heading)",
                background: "rgba(0,255,136,0.12)",
                border: "1px solid rgba(0,255,136,0.4)",
                color: "var(--neon)",
              }}
            >
              EM
            </div>
            <div className="flex flex-col">
              <span
                className="text-xs tracking-[2px]"
                style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
              >
                EMILY
              </span>
              <span
                className="text-[9px] tracking-[1px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--neon)" }}
              >
                CS · CUSTOMER SERVICE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <StatusDot status={agentStatus} />
            <span
              className="text-[9px] tracking-[1px]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
            >
              SESSION {uid().toUpperCase()}
            </span>
          </div>
        </div>

        {/* Log output */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 py-4 scroll-smooth"
          style={{ background: "var(--background)" }}
        >
          <AnimatePresence initial={false}>
            {logs.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="flex gap-3 py-1.5 leading-relaxed"
              >
                <span
                  className="shrink-0 text-[10px] tabular-nums pt-0.5 select-none"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
                >
                  {entry.timestamp}
                </span>

                <span
                  className="shrink-0 text-[10px] pt-0.5 w-[52px] select-none"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color:
                      entry.type === "emily"
                        ? "var(--neon)"
                        : entry.type === "operator"
                          ? "var(--cyan)"
                          : entry.type === "status"
                            ? "var(--amber)"
                            : "var(--text-tertiary)",
                  }}
                >
                  {entry.type === "emily"
                    ? "EMILY"
                    : entry.type === "operator"
                      ? "YOU"
                      : entry.type === "status"
                        ? "SYS"
                        : "SYS"}
                </span>

                <span
                  className="text-[12px] leading-relaxed min-w-0"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color:
                      entry.type === "emily"
                        ? "var(--text-primary)"
                        : entry.type === "operator"
                          ? "var(--cyan)"
                          : entry.type === "status"
                            ? "var(--amber)"
                            : "var(--text-secondary)",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {entry.content}
                  {entry.type === "emily" && streaming && entry === logs[logs.length - 1] && (
                    <span
                      className="inline-block w-1.5 h-3 ml-0.5 align-middle"
                      style={{
                        background: "var(--neon)",
                        animation: "blink-cursor 1s step-end infinite",
                      }}
                    />
                  )}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 px-5 py-3 shrink-0"
          style={{ borderTop: "1px solid var(--border-dim)", background: "var(--surface-1)" }}
        >
          <span
            className="text-[10px] shrink-0 select-none"
            style={{ fontFamily: "var(--font-mono)", color: "var(--cyan)" }}
          >
            &gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={streaming ? "Emily is responding..." : "Type a message..."}
            disabled={streaming}
            autoFocus
            className="flex-1 bg-transparent text-[12px] outline-none placeholder:text-[var(--text-tertiary)] disabled:opacity-50"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            className="px-3 py-1 text-[9px] tracking-[2px] cursor-pointer transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_10px_rgba(0,255,136,0.2)]"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--background)",
              background: "var(--neon)",
              border: "1px solid var(--neon)",
            }}
          >
            SEND
          </button>
        </form>
      </div>

      {/* Right sidebar — agent telemetry */}
      <aside
        className="hidden lg:flex w-[220px] shrink-0 flex-col gap-4 p-4 overflow-y-auto"
        style={{ borderLeft: "1px solid var(--border-dim)", background: "var(--surface-1)" }}
      >
        <span
          className="text-[9px] tracking-[2px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
        >
          {"// TELEMETRY"}
        </span>

        <TelemetryItem label="STATUS" value={agentStatus === "idle" ? "READY" : agentStatus === "thinking" ? "PROCESSING" : "STREAMING"} color={agentStatus === "idle" ? "var(--neon)" : "var(--amber)"} />
        <TelemetryItem label="MODEL" value="CLAUDE SONNET" color="var(--text-primary)" />
        <TelemetryItem label="LATENCY" value="~0.4s" color="var(--text-primary)" />
        <TelemetryItem label="MESSAGES" value={String(messagesRef.current.length)} color="var(--text-primary)" />
        <TelemetryItem label="ENCRYPTION" value="AES-256" color="var(--neon)" />
        <TelemetryItem label="UPTIME" value="99.98%" color="var(--neon)" />

        <div className="mt-4" style={{ borderTop: "1px solid var(--border-dim)", paddingTop: 16 }}>
          <span
            className="text-[9px] tracking-[2px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
          >
            {"// CAPABILITIES"}
          </span>
          {["TICKETS", "REFUNDS", "ESCALATION", "MULTILINGUAL", "KNOWLEDGE BASE"].map((cap) => (
            <div key={cap} className="flex items-center gap-2 mt-2">
              <span
                className="h-1 w-1 rounded-full"
                style={{ background: "var(--neon)" }}
              />
              <span
                className="text-[9px] tracking-[1px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
              >
                {cap}
              </span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function StatusDot({ status }: { status: "idle" | "thinking" | "responding" }) {
  const color = status === "idle" ? "var(--neon)" : "var(--amber)";
  const label = status === "idle" ? "READY" : status === "thinking" ? "THINKING" : "RESPONDING";

  return (
    <div className="flex items-center gap-1.5">
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 6px ${status === "idle" ? "rgba(0,255,136,0.6)" : "rgba(255,170,0,0.6)"}`,
          animation: status !== "idle" ? "pulse-dot 1s ease-in-out infinite" : "none",
        }}
      />
      <span
        className="text-[9px] tracking-[1px]"
        style={{ fontFamily: "var(--font-mono)", color }}
      >
        {label}
      </span>
    </div>
  );
}

function TelemetryItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex justify-between items-center">
      <span
        className="text-[8px] tracking-[1px]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
      >
        {label}
      </span>
      <span
        className="text-[10px]"
        style={{ fontFamily: "var(--font-mono)", color }}
      >
        {value}
      </span>
    </div>
  );
}
