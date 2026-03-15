"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { MyAgentsPanel } from "@/components/dashboard/MyAgentsPanel";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { AgentControlPanel } from "@/components/dashboard/AgentControlPanel";
import { BillingPanel } from "@/components/dashboard/BillingPanel";
import {
  getUserContracts,
  getUserInvoices,
  type ContractRecord,
  type InvoiceRecord,
} from "@/lib/data/queries";

export default function DashboardPage() {
  const { userId } = useAuth();
  const [panel, setPanel] = useState("agents");
  const [contracts, setContracts] = useState<ContractRecord[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [managingContract, setManagingContract] = useState<ContractRecord | null>(null);

  useEffect(() => {
    if (!userId) return;
    getUserContracts(userId).then(setContracts);
    getUserInvoices(userId).then(setInvoices);
  }, [userId]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-6">
      <div className="flex min-h-[70vh]">
        <DashboardSidebar active={panel} onNavigate={(id) => { setPanel(id); setManagingContract(null); }} />

        <main className="flex-1 pl-8 py-2">
          {panel === "agents" && !managingContract && (
            <MyAgentsPanel
              contracts={contracts}
              onManage={(c) => setManagingContract(c)}
            />
          )}

          {panel === "agents" && managingContract && (
            <AgentControlPanel
              contract={managingContract}
              onClose={() => setManagingContract(null)}
            />
          )}

          {panel === "activity" && <ActivityFeed />}

          {panel === "billing" && (
            <BillingPanel contracts={contracts} invoices={invoices} />
          )}

          {panel === "settings" && (
            <div className="flex flex-col gap-4">
              <h2
                className="text-[11px] tracking-[3px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
              >
                {"// SETTINGS"}
              </h2>
              <p
                className="text-[12px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
              >
                Account settings will be available in a future update.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
