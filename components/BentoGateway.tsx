"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Play,
  ArrowRight,
} from "lucide-react";
import { usePublicClient, useWalletClient } from "wagmi";
import { VaultConfig, HeartbeatStatus } from "@/lib/types";
import { executeEscape, isContractDeployed } from "@/lib/cotiService";

interface BentoGatewayProps {
  vault: VaultConfig;
  status: HeartbeatStatus;
  onOpenPolicyModal: () => void;
}

/* ── Custom SVG: Garbled Circuit Ring ── */
const GarbledRingSVG = () => (
  <svg width="120" height="120" viewBox="0 0 160 160" fill="none" className="mx-auto">
    <defs>
      <linearGradient id="bentoRing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    <circle cx="80" cy="80" r="55" stroke="url(#bentoRing)" strokeWidth="8" strokeDasharray="10 6" opacity="0.8" />
    <circle cx="80" cy="80" r="35" stroke="#A78BFA" strokeWidth="4" opacity="0.5" />
    <circle cx="80" cy="80" r="14" fill="#8B5CF6" />
    <circle cx="80" cy="80" r="6" fill="#0D0E12" />
  </svg>
);

/* ── Custom SVG: 3D Abstract Organic Blob (for right cards) ── */
const AbstractBlobSVG = ({ variant }: { variant: "top" | "bottom" }) => (
  <svg width="180" height="120" viewBox="0 0 240 160" fill="none">
    <defs>
      <linearGradient id={`blob-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={variant === "top" ? "#C4B5FD" : "#A78BFA"} />
        <stop offset="100%" stopColor={variant === "top" ? "#8B5CF6" : "#6D28D9"} />
      </linearGradient>
    </defs>
    {variant === "top" ? (
      <>
        <path d="M60 130 Q80 40 140 60 Q200 80 180 130 Q160 160 100 150 Z" fill={`url(#blob-${variant})`} opacity="0.8" />
        <path d="M80 110 Q100 50 150 70 Q190 85 170 120 Z" fill="white" opacity="0.15" />
        <ellipse cx="130" cy="50" rx="30" ry="15" fill="#DDD6FE" opacity="0.4" />
      </>
    ) : (
      <>
        <path d="M40 80 Q60 20 120 40 Q180 60 200 120 Q180 150 120 140 Q60 130 40 80Z" fill={`url(#blob-${variant})`} opacity="0.85" />
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse
            key={i}
            cx={120 + Math.cos((i * 72 * Math.PI) / 180) * 40}
            cy={90 + Math.sin((i * 72 * Math.PI) / 180) * 40}
            rx="18"
            ry="8"
            fill="#C4B5FD"
            opacity="0.6"
            transform={`rotate(${i * 72} ${120 + Math.cos((i * 72 * Math.PI) / 180) * 40} ${90 + Math.sin((i * 72 * Math.PI) / 180) * 40})`}
          />
        ))}
      </>
    )}
  </svg>
);

export const BentoGateway: React.FC<BentoGatewayProps> = ({
  vault,
  status,
  onOpenPolicyModal,
}) => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [showRawAddress, setShowRawAddress] = useState(false);
  const [isExecutingKeeper, setIsExecutingKeeper] = useState(false);
  const [keeperResult, setKeeperResult] = useState<{
    success?: boolean;
    message?: string;
    txHash?: string;
  } | null>(null);

  const handleTestKeeper = async () => {
    setIsExecutingKeeper(true);
    setKeeperResult(null);
    try {
      if (walletClient && publicClient) {
        const deployed = await isContractDeployed(publicClient);
        if (deployed) {
          const res = await executeEscape(walletClient, publicClient);
          setKeeperResult({
            success: res.success,
            message: res.message,
            txHash: res.txHash,
          });
        } else {
          // Mock fallback for preview mode
          await new Promise((r) => setTimeout(r, 1500));
          setKeeperResult({
            success: false,
            message: "SanctuaryVault: Heartbeat still active! Execution reverted. (Preview Mode)",
          });
        }
      } else {
        await new Promise((r) => setTimeout(r, 1500));
        setKeeperResult({
          success: false,
          message: "Connect wallet first to test keeper execution.",
        });
      }
    } catch (err: any) {
      setKeeperResult({ success: false, message: err?.message || "Error" });
    } finally {
      setIsExecutingKeeper(false);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16">
      {/* Section divider */}
      <div className="section-divider mb-16" />

      {/* Big Centered Section Title (matches reference "The Gateway to Solana-AI") */}
      <div className="text-center mb-12">
        <h2 className="text-[32px] md:text-[48px] font-extrabold tracking-tighter leading-[1.05] text-[#1A1A1A]">
          The Gateway to<br />Confidential Automation
        </h2>
      </div>

      {/* Bento Grid (1:1 reference layout: left dark 7col, right white 5col stacked) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ── Left: Large Dark Obsidian Card (7 cols) ── */}
        <div className="lg:col-span-7 card-obsidian p-7 md:p-9 flex flex-col justify-between min-h-[480px]">
          {/* Tag */}
          <div className="mb-6">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-coti-violet-light">
              COTI V2 Garbled Vault
            </span>
          </div>

          <div className="flex-1">
            <h3 className="text-[22px] md:text-[26px] font-bold tracking-tight text-white mb-2">
              Autonomous Encrypted Vaults
            </h3>
            <p className="text-[13px] text-gray-400 leading-relaxed mb-6 max-w-md">
              Configure check-in intervals, garbled recipient addresses
              (<code className="text-coti-violet-light font-mono text-[12px]">ctAddress</code>),
              and private escape balances on COTI V2. Your target beneficiary
              is never visible on-chain.
            </p>

            {/* Encrypted Payload Preview Box */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] font-mono text-[11px] space-y-2.5">
              <div className="flex items-center justify-between text-gray-500 pb-2 border-b border-white/[0.06]">
                <span className="uppercase tracking-wider">On-Chain Payload</span>
                <button
                  onClick={() => setShowRawAddress(!showRawAddress)}
                  className="flex items-center gap-1 text-coti-violet-light hover:text-white transition-colors"
                >
                  {showRawAddress ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showRawAddress ? "Hide" : "Preview"}</span>
                </button>
              </div>
              <div>
                <span className="text-gray-500 block mb-0.5 text-[10px]">Recipient (gtAddress):</span>
                <span className="text-coti-violet-light break-all">
                  {showRawAddress
                    ? "0x9f83a21b4c90e12d887a2b91c… (RAW — HIDDEN ON-CHAIN)"
                    : vault.encryptedRecipient}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block mb-0.5 text-[10px]">Allocation (gtUint256):</span>
                <span className="text-[#C4B5FD] break-all">{vault.encryptedAmount}</span>
              </div>
              <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-gray-500 text-[10px]">
                <span>Interval: <strong className="text-white">{vault.checkInIntervalHours}h</strong></span>
                <span className="text-coti-emerald">100% MPC Garbled</span>
              </div>
            </div>
          </div>

          {/* Graphic: Garbled Circuit Ring */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
            <GarbledRingSVG />
            <button
              onClick={onOpenPolicyModal}
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-[12px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              Update Vault
            </button>
          </div>
        </div>

        {/* ── Right Column: Stacked White Cards (5 cols) ── */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Right Top White Card: Heartbeat Monitor */}
          <div className="card-white p-6 flex flex-col justify-between relative overflow-hidden flex-1">
            {/* Small tag icon (matches reference "tc" tiny icons top-right) */}
            <div className="flex items-center justify-end mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-25">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* 3D Blob Graphic (matches reference purple 3D abstract images in right cards) */}
            <div className="flex justify-center mb-4">
              <AbstractBlobSVG variant="top" />
            </div>

            <div>
              <h4 className="text-[18px] font-bold tracking-tight text-[#1A1A1A] mb-1">
                Heartbeat Monitor
              </h4>
              <p className="text-[13px] text-[#6B7280] leading-relaxed">
                Real-time visual pulse indicator with automated wallet check-in triggers.
              </p>

              {/* Live countdown badge */}
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-canvas border border-border-subtle text-[12px] font-mono font-bold text-[#1A1A1A]">
                <span className={`w-2 h-2 rounded-full pulse-dot ${status.status === 'active' ? 'bg-coti-emerald' : 'bg-coti-amber'}`} />
                {status.formattedCountdown}
              </div>
            </div>
          </div>

          {/* Right Bottom White Card: Keeper Network */}
          <div className="card-white p-6 flex flex-col justify-between flex-1">
            {/* Small tag icon */}
            <div className="flex items-center justify-end mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-25">
                <circle cx="12" cy="12" r="10" stroke="#1A1A1A" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            {/* 3D Blob Graphic */}
            <div className="flex justify-center mb-4">
              <AbstractBlobSVG variant="bottom" />
            </div>

            <div>
              <h4 className="text-[18px] font-bold tracking-tight text-[#1A1A1A] mb-1">
                Keeper Execution
              </h4>
              <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3">
                Public trigger allowing external keepers to call{" "}
                <code className="font-mono text-[12px] text-coti-violet">executeEscape()</code>
                {" "}without learning the beneficiary.
              </p>

              <button
                onClick={handleTestKeeper}
                disabled={isExecutingKeeper}
                className="w-full py-2.5 rounded-xl bg-canvas hover:bg-gray-100 border border-border-subtle text-[12px] font-semibold text-[#1A1A1A] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2"
              >
                {isExecutingKeeper ? (
                  <span>Simulating…</span>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span>Test Keeper Trigger</span>
                  </>
                )}
              </button>

              {/* Keeper Result Feedback */}
              {keeperResult && (
                <div
                  className={`mt-3 p-3 rounded-xl border text-[11px] font-mono leading-relaxed ${
                    keeperResult.success
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-amber-50 border-amber-200 text-amber-700"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    {keeperResult.success ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5" />
                    )}
                    <span>{keeperResult.success ? "EXECUTED" : "REVERTED"}</span>
                  </div>
                  <p className="text-[10px]">{keeperResult.message}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
