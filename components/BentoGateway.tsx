"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Play,
  Shield,
  Lock,
  Key,
  Zap,
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

/* ── PREMIUM ILLUSTRATION 1: Heartbeat Pulse & Liveness Radar ── */
const HeartbeatPulseGraphic = () => (
  <div className="relative w-full h-[140px] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-purple-50/80 to-purple-100/30 border border-purple-100/60 p-4">
    <svg width="220" height="100" viewBox="0 0 220 100" fill="none" className="z-10">
      <defs>
        <linearGradient id="pulseLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.2" />
          <stop offset="40%" stopColor="#8B5CF6" />
          <stop offset="60%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Grid background lines */}
      <line x1="0" y1="25" x2="220" y2="25" stroke="#8B5CF6" strokeWidth="0.5" opacity="0.1" />
      <line x1="0" y1="50" x2="220" y2="50" stroke="#8B5CF6" strokeWidth="0.5" opacity="0.15" />
      <line x1="0" y1="75" x2="220" y2="75" stroke="#8B5CF6" strokeWidth="0.5" opacity="0.1" />

      {/* Heartbeat EKG Pulse Waveform */}
      <path
        d="M 10 50 L 50 50 L 60 40 L 70 65 L 85 15 L 100 85 L 115 35 L 125 55 L 135 50 L 210 50"
        stroke="url(#pulseLineGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Live Glowing Pulse Indicator */}
      <circle cx="100" cy="85" r="14" fill="url(#pulseGlow)" />
      <circle cx="100" cy="85" r="5" fill="#10B981" />

      {/* Frequency Labels */}
      <text x="15" y="20" fill="#6B7280" fontSize="8" fontFamily="monospace" fontWeight="bold">LIVENESS WAVE</text>
      <text x="165" y="20" fill="#10B981" fontSize="8" fontFamily="monospace" fontWeight="bold">100% PING SAFE</text>
    </svg>

    {/* Subtle pulsing background glow */}
    <div className="absolute inset-0 bg-radial from-purple-200/30 to-transparent pointer-events-none" />
  </div>
);

/* ── PREMIUM ILLUSTRATION 2: Keeper Enclave Key Release Mechanism ── */
const KeeperEnclaveGraphic = () => (
  <div className="relative w-full h-[140px] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-purple-50/80 to-purple-100/30 border border-purple-100/60 p-4">
    <svg width="220" height="100" viewBox="0 0 220 100" fill="none" className="z-10">
      <defs>
        <linearGradient id="keyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Outer Enclave Shield Boundary */}
      <path
        d="M 110 15 L 160 30 V 60 C 160 80 140 93 110 98 C 80 93 60 80 60 60 V 30 Z"
        fill="url(#shieldGrad)"
        stroke="#8B5CF6"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />

      {/* Center Lock / Key Emblem */}
      <rect x="96" y="42" width="28" height="24" rx="6" fill="#0D0E12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M 104 42 V 34 C 104 29 116 29 116 34 V 42" stroke="#C4B5FD" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="110" cy="52" r="3" fill="#10B981" />
      <path d="M 110 55 V 60" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />

      {/* Orbiting MPC Keeper Nodes */}
      <circle cx="45" cy="50" r="10" fill="#F3E8FF" stroke="#8B5CF6" strokeWidth="1.5" />
      <path d="M 41 50 L 49 50 M 45 46 L 45 54" stroke="#8B5CF6" strokeWidth="1.5" />

      <circle cx="175" cy="50" r="10" fill="#F3E8FF" stroke="#8B5CF6" strokeWidth="1.5" />
      <path d="M 171 50 L 179 50 M 175 46 L 175 54" stroke="#8B5CF6" strokeWidth="1.5" />

      {/* Connection Dash Lines */}
      <line x1="55" y1="50" x2="96" y2="52" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="124" y1="52" x2="165" y2="50" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3 3" />

      {/* Labels */}
      <text x="15" y="90" fill="#6B7280" fontSize="8" fontFamily="monospace" fontWeight="bold">COTI MPC ENCLAVE</text>
      <text x="150" y="90" fill="#8B5CF6" fontSize="8" fontFamily="monospace" fontWeight="bold">1% BOUNTY</text>
    </svg>

    {/* Glow backdrop */}
    <div className="absolute inset-0 bg-radial from-purple-200/30 to-transparent pointer-events-none" />
  </div>
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

      {/* Big Centered Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-[32px] md:text-[48px] font-extrabold tracking-tighter leading-[1.05] text-[#1A1A1A]">
          The Gateway to<br />Confidential Automation
        </h2>
      </div>

      {/* Bento Grid Layout */}
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
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-coti-violet">
                LIVENESS RHYTHM
              </span>
              <Activity className="w-4 h-4 text-[#6B7280]" />
            </div>

            {/* Premium Heartbeat Waveform Illustration */}
            <div className="my-3">
              <HeartbeatPulseGraphic />
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
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-coti-violet">
                MPC KEEPERS
              </span>
              <Key className="w-4 h-4 text-[#6B7280]" />
            </div>

            {/* Premium Keeper Enclave Key Release Illustration */}
            <div className="my-3">
              <KeeperEnclaveGraphic />
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
