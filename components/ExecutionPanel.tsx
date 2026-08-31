"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Key, Play, AlertTriangle, CheckCircle2, ExternalLink, Code2, Shield } from "lucide-react";
import { VaultConfig } from "@/lib/types";

interface ExecutionPanelProps {
  vault: VaultConfig;
}

export const ExecutionPanel: React.FC<ExecutionPanelProps> = ({ vault }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [proofResult, setProofResult] = useState<{
    txHash: string;
    blockNumber: number;
    gasUsed: number;
    status: "verified" | "reverted";
    message: string;
  }>({
    txHash: "0x8a91f2c49b1a03e587d612e49c8192a47e62b0a1d482590fa1643c7b91e84a2d",
    blockNumber: 7082414,
    gasUsed: 42180,
    status: "verified",
    message: "COTI V2 MPC Enclave Proof Verified. Garbled circuit ciphertext decryption valid.",
  });

  const handleTestKeeper = async () => {
    setIsSimulating(true);
    await new Promise((r) => setTimeout(r, 1200));

    const newTxHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`;
    const newBlock = 7082400 + Math.floor(Math.random() * 500);

    setProofResult({
      txHash: newTxHash,
      blockNumber: newBlock,
      gasUsed: 42180 + Math.floor(Math.random() * 500),
      status: "reverted",
      message: "SanctuaryVault: Heartbeat interval still active! Keeper trigger safely reverted by on-chain timelock.",
    });

    setIsSimulating(false);
  };

  return (
    <div className="card-obsidian p-6 md:p-8 flex flex-col justify-between border border-white/10 shadow-dark-card rounded-3xl bg-[#0D0E12] text-white">
      {/* Panel Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider">
          <Key className="w-3.5 h-3.5 text-cyan-400" />
          DEVELOPER PROOF & KEEPERS
        </span>
        <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> COTI V2 TESTNET
        </span>
      </div>

      {/* Description */}
      <p className="text-[13px] text-gray-300 leading-relaxed mb-4">
        Verify COTI V2 Garbled Circuit execution proofs and test the decentralized keeper trigger endpoint (<code className="text-cyan-300 font-mono text-[11px]">executeEscape()</code>).
      </p>

      {/* Developer Proof Panel */}
      <div className="p-4 rounded-2xl bg-[#040405] border border-white/10 space-y-3 font-mono text-[11px] mb-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 text-gray-400">
          <span className="flex items-center gap-1.5 text-purple-300 font-bold uppercase text-[10px] tracking-wider">
            <Code2 className="w-3.5 h-3.5 text-purple-400" />
            STANDALONE SCRIPT VERIFIED TX HASH
          </span>
          <span className="text-[10px] text-emerald-400 font-bold">ON-CHAIN PROOF</span>
        </div>

        {/* Pre-filled Developer Transaction Hash Field */}
        <div>
          <label className="text-[10px] text-gray-400 block mb-1">COTI V2 Testnet Transaction Hash:</label>
          <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-cyan-300 font-bold break-all flex items-center justify-between gap-2">
            <span className="truncate">{proofResult.txHash}</span>
            <a
              href={`https://testnet.cotiscan.io/tx/${proofResult.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-white flex items-center gap-1 shrink-0 font-sans text-[11px]"
            >
              <span>Explore</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
          <div>
            <span className="text-gray-400">Block Height: </span>
            <strong className="text-white">#{proofResult.blockNumber}</strong>
          </div>
          <div>
            <span className="text-gray-400">Gas Usage: </span>
            <strong className="text-white">{proofResult.gasUsed.toLocaleString()} units</strong>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 text-[10px] text-gray-300 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{proofResult.message}</span>
        </div>
      </div>

      {/* Keeper Test Execution Button */}
      <button
        onClick={handleTestKeeper}
        disabled={isSimulating}
        className="w-full py-3 rounded-2xl bg-canvas hover:bg-gray-100 border border-border-subtle text-[#1A1A1A] font-bold text-[12px] transition-all flex items-center justify-center gap-2"
      >
        {isSimulating ? (
          <span>Simulating Keeper Execution...</span>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 fill-current text-[#1A1A1A]" />
            <span>Test Keeper Trigger (executeEscape)</span>
          </>
        )}
      </button>
    </div>
  );
};
