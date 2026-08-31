"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { AppHeader } from "@/components/AppHeader";
import { BentoGateway } from "@/components/BentoGateway";
import { StatusCard } from "@/components/StatusCard";
import { ExecutionPanel } from "@/components/ExecutionPanel";
import { PolicyModal } from "@/components/PolicyModal";
import { PartnerFooter } from "@/components/PartnerFooter";
import { VaultConfig, HeartbeatStatus } from "@/lib/types";
import {
  MOCK_VAULT_STATE,
  calculateHeartbeatStatus,
  isContractDeployed,
  readVaultStatus,
  sendHeartbeat,
  deployVault,
} from "@/lib/cotiService";
import { CheckCircle2, AlertTriangle, Zap, Shield, ArrowRight, RefreshCw, AlertCircle } from "lucide-react";

export default function VaultApp() {
  const { isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [vault, setVault] = useState<VaultConfig>(MOCK_VAULT_STATE);
  const [status, setStatus] = useState<HeartbeatStatus>(() =>
    calculateHeartbeatStatus(MOCK_VAULT_STATE)
  );
  const [isLive, setIsLive] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isProcessingHeartbeat, setIsProcessingHeartbeat] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Check contract status
  useEffect(() => {
    async function checkContract() {
      if (!publicClient) return;
      const deployed = await isContractDeployed(publicClient);
      setIsLive(deployed);

      if (deployed) {
        try {
          const liveVault = await readVaultStatus(publicClient);
          setVault(liveVault);
          setStatus(calculateHeartbeatStatus(liveVault));
        } catch (err) {
          console.warn("Failed to read live contract state, using preview:", err);
        }
      }
    }
    checkContract();
  }, [publicClient]);

  // Timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(calculateHeartbeatStatus(vault));
    }, 1000);
    return () => clearInterval(timer);
  }, [vault]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Send Heartbeat
  const handleSendHeartbeat = useCallback(async () => {
    setIsProcessingHeartbeat(true);
    try {
      if (isLive && walletClient && publicClient) {
        const txHash = await sendHeartbeat(walletClient, publicClient);
        const updated = await readVaultStatus(publicClient);
        setVault(updated);
        setToast({
          message: `Heartbeat confirmed on-chain! Tx: ${txHash.slice(0, 10)}…`,
          type: "success",
        });
      } else {
        await new Promise((r) => setTimeout(r, 1000));
        const mockUpdated = {
          ...vault,
          lastSeenTimestamp: Math.floor(Date.now() / 1000),
        };
        setVault(mockUpdated);
        setToast({
          message: "Heartbeat Signal Emitted! Countdown reset.",
          type: "success",
        });
      }
    } catch (err: any) {
      setToast({
        message: err?.shortMessage || err?.message || "Heartbeat failed",
        type: "error",
      });
    } finally {
      setIsProcessingHeartbeat(false);
    }
  }, [isLive, walletClient, publicClient, vault]);

  // Deploy Policy
  const handleVaultUpdated = useCallback(
    async (
      intervalHours: number,
      gracePeriodHours: number,
      recipient: string,
      amount: string
    ) => {
      try {
        if (isLive && walletClient && publicClient) {
          const txHash = await deployVault(
            walletClient,
            publicClient,
            intervalHours,
            gracePeriodHours,
            recipient,
            amount
          );
          const updated = await readVaultStatus(publicClient);
          setVault(updated);
          setToast({
            message: `Vault policy updated on-chain! Tx: ${txHash.slice(0, 10)}…`,
            type: "success",
          });
        } else {
          await new Promise((r) => setTimeout(r, 1400));
          setVault({
            ...vault,
            checkInIntervalHours: intervalHours,
            gracePeriodHours: gracePeriodHours,
            lastSeenTimestamp: Math.floor(Date.now() / 1000),
          });
          setToast({
            message: "Sanctuary Vault Policy successfully updated.",
            type: "success",
          });
        }
      } catch (err: any) {
        setToast({
          message: err?.shortMessage || err?.message || "Policy update failed",
          type: "error",
        });
      }
    },
    [isLive, walletClient, publicClient, vault]
  );

  return (
    <main className="min-h-screen flex flex-col bg-canvas">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl text-[13px] font-semibold shadow-card-elevated flex items-center gap-2.5 ${
            toast.type === "success"
              ? "bg-[#1A1A1A] text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-coti-emerald" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-white" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Mode Banner */}
      {!isLive && (
        <div className="w-full bg-amber-50 border-b border-amber-200 text-center py-1.5 text-[12px] font-mono text-amber-700">
          ⚡ Sanctuary Vault Application — Decoupled Zero-Latency Hybrid Mode (COTI V2 Testnet Ready)
        </div>
      )}

      {/* Grace Period Alert Banner */}
      {status.inGracePeriod && (
        <div className="w-full bg-red-600 text-white text-center py-2.5 text-[13px] font-mono font-bold flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 animate-bounce" />
          <span>EMERGENCY GRACE PERIOD ACTIVE! Heartbeat missed. Send heartbeat immediately to prevent keeper execution.</span>
        </div>
      )}

      {/* Vault Header */}
      <AppHeader onOpenPolicyModal={() => setIsPolicyModalOpen(true)} />

      {/* Vault Dashboard Hero Status Panel */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-10">
        <div className="card-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl pointer-events-none" />

          {/* Left Status Text */}
          <div className="space-y-4 max-w-lg z-10">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-mono font-bold ${status.inGracePeriod ? "bg-red-100 text-red-700 border border-red-200" : "bg-purple-50 border border-purple-100 text-coti-violet"}`}>
              <Shield className="w-3.5 h-3.5" />
              <span>{status.inGracePeriod ? "GRACE PERIOD BUFFER ACTIVE" : "COTI V2 GARBLED VAULT ACTIVE"}</span>
            </div>

            <h1 className="text-[32px] md:text-[42px] font-extrabold tracking-tighter leading-[1.05] text-[#1A1A1A]">
              Sanctuary Control Center
            </h1>

            <p className="text-[14px] text-[#6B7280] leading-relaxed">
              Your autonomous dead-man&apos;s switch is active on COTI V2. Send a heartbeat signal before the check-in timer + grace period expires to reset execution countdown.
            </p>

            <div className="flex items-center gap-4 text-[12px] font-mono text-[#6B7280] pt-2">
              <span>Interval: <strong className="text-[#1A1A1A]">{vault.checkInIntervalHours}h</strong></span>
              <span>•</span>
              <span>Grace Buffer: <strong className="text-coti-violet">{vault.gracePeriodHours}h</strong></span>
              <span>•</span>
              <span>Keeper Bounty: <strong className="text-coti-emerald">1%</strong></span>
            </div>
          </div>

          {/* Right Timer & Heartbeat Action Button */}
          <div className="flex flex-col items-center gap-5 p-6 rounded-3xl bg-canvas border border-border-subtle z-10 min-w-[280px]">
            <div className="text-center">
              <span className="text-[11px] font-mono font-semibold text-[#6B7280] uppercase tracking-wider block mb-1">
                {status.inGracePeriod ? "Grace Window Remaining" : "Time Remaining Until Execution"}
              </span>
              <div className={`text-[36px] font-mono font-extrabold tracking-tight ${status.inGracePeriod ? "text-red-600 animate-pulse" : "text-[#1A1A1A]"}`}>
                {status.formattedCountdown}
              </div>
            </div>

            <button
              onClick={handleSendHeartbeat}
              disabled={isProcessingHeartbeat}
              className="w-full py-3.5 px-6 rounded-full bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white text-[13px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-btn-black hover:shadow-btn-black-hover flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessingHeartbeat ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Emitting Signal…</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-coti-emerald fill-coti-emerald" />
                  <span>SEND HEARTBEAT SIGNAL</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Dedicated StatusCard & ExecutionPanel Grid */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatusCard vault={vault} onHeartbeatSent={handleSendHeartbeat} />
          <ExecutionPanel vault={vault} />
        </div>
      </section>

      {/* Bento Gateway Section */}
      <BentoGateway
        vault={vault}
        status={status}
        onOpenPolicyModal={() => setIsPolicyModalOpen(true)}
      />

      <PartnerFooter />

      {/* Configure Policy Modal */}
      <PolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        currentVault={vault}
        onVaultUpdated={handleVaultUpdated}
      />
    </main>
  );
}
