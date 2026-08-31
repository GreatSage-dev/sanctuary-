"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X, Shield, Lock, Zap, Eye, Users, Timer } from "lucide-react";

export const PrivacyComparisonTable: React.FC = () => {
  const comparisonRows = [
    {
      feature: "Beneficiary Address Storage",
      icon: Lock,
      standardEVM: "Public plain text (0x… visible on Etherscan)",
      cotiGarbled: "100% Encrypted gtAddress ciphertext in MPC enclave",
    },
    {
      feature: "Escape Fund Allocation",
      icon: Shield,
      standardEVM: "Transparent balance visible to all block explorers",
      cotiGarbled: "Garbled uint256 balance (gtUint256) — fully private",
    },
    {
      feature: "Physical & Digital Attack Risk",
      icon: Eye,
      standardEVM: "High — Attackers track high-value dead-man recipients",
      cotiGarbled: "Zero — No external entity learns recipient identity",
    },
    {
      feature: "Public Keeper Execution",
      icon: Users,
      standardEVM: "Leaks beneficiary recipient in transaction parameters",
      cotiGarbled: "Zero-Knowledge execution via garbled circuit decryption",
    },
    {
      feature: "On-Chain Speed & Latency",
      icon: Timer,
      standardEVM: "Slow ZK-SNARK proofs (~30s+ compute time)",
      cotiGarbled: "High-speed Garbled Circuits (<2.5s execution)",
    },
  ];

  return (
    <section id="privacy" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-14"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-coti-violet text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
          <Shield className="w-3.5 h-3.5" />
          WHY COTI V2 MATTERS
        </span>
        <h2 className="text-[30px] md:text-[44px] font-extrabold tracking-tighter leading-[1.05] text-[#1A1A1A]">
          Transparent EVM vs COTI V2<br className="hidden md:block" /> Garbled Circuits
        </h2>
        <p className="text-[14px] text-[#6B7280] mt-3 max-w-xl mx-auto leading-relaxed">
          Standard dead-man switches leak your beneficiary&apos;s address and fund
          size to the entire world. Sanctuary uses COTI V2 Multi-Party
          Computation to achieve complete privacy.
        </p>
      </motion.div>

      {/* Premium Comparison Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[28px] overflow-hidden border border-[rgba(0,0,0,0.06)] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)]"
      >
        {/* Table Header */}
        <div className="grid grid-cols-12 border-b border-[rgba(0,0,0,0.06)]">
          {/* Left Feature Label */}
          <div className="col-span-4 px-8 py-5 bg-[#FAFAFA]">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#9CA3AF]">
              SECURITY DIMENSION
            </span>
          </div>

          {/* Standard EVM Column Header */}
          <div className="col-span-4 px-8 py-5 bg-[#FAFAFA] border-l border-[rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-red-50 flex items-center justify-center">
                <X className="w-3 h-3 text-red-400" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-red-400">
                STANDARD EVM
              </span>
            </div>
          </div>

          {/* COTI V2 Column Header — Premium Accent */}
          <div className="col-span-4 px-8 py-5 bg-gradient-to-r from-purple-50/80 to-purple-50/40 border-l border-purple-100/40">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-coti-violet/10 flex items-center justify-center">
                <Shield className="w-3 h-3 text-coti-violet" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-coti-violet">
                SANCTUARY ON COTI V2
              </span>
            </div>
          </div>
        </div>

        {/* Table Rows */}
        {comparisonRows.map((row, idx) => {
          const RowIcon = row.icon;
          const isLast = idx === comparisonRows.length - 1;

          return (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * idx }}
              className={`grid grid-cols-12 group transition-colors duration-200 hover:bg-[#FAFAFA] ${
                !isLast ? "border-b border-[rgba(0,0,0,0.04)]" : ""
              }`}
            >
              {/* Feature Name */}
              <div className="col-span-4 px-8 py-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#F3F4F6] group-hover:bg-purple-50 flex items-center justify-center transition-colors duration-200 shrink-0">
                  <RowIcon className="w-4 h-4 text-[#9CA3AF] group-hover:text-coti-violet transition-colors duration-200" />
                </div>
                <span className="text-[14px] font-semibold text-[#1A1A1A] tracking-[-0.01em] leading-snug">
                  {row.feature}
                </span>
              </div>

              {/* Standard EVM Value — Red / Vulnerable */}
              <div className="col-span-4 px-8 py-6 flex items-start gap-2.5 border-l border-[rgba(0,0,0,0.04)]">
                <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center mt-0.5 shrink-0">
                  <X className="w-3 h-3 text-red-400" />
                </div>
                <span className="text-[13px] text-[#6B7280] leading-relaxed">
                  {row.standardEVM}
                </span>
              </div>

              {/* COTI V2 Value — Green / Secured */}
              <div className="col-span-4 px-8 py-6 flex items-start gap-2.5 border-l border-purple-100/30 bg-gradient-to-r from-purple-50/30 to-transparent">
                <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="w-3 h-3 text-emerald-500" />
                </div>
                <span className="text-[13px] text-[#1A1A1A] font-medium leading-relaxed">
                  {row.cotiGarbled}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Bottom Summary Bar */}
        <div className="grid grid-cols-12 border-t border-[rgba(0,0,0,0.06)] bg-[#FAFAFA]">
          <div className="col-span-4 px-8 py-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9CA3AF]">
              VERDICT
            </span>
          </div>
          <div className="col-span-4 px-8 py-4 border-l border-[rgba(0,0,0,0.04)]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-500 text-[11px] font-bold">
              <X className="w-3 h-3" />
              Fully Exposed
            </span>
          </div>
          <div className="col-span-4 px-8 py-4 border-l border-purple-100/30 bg-gradient-to-r from-purple-50/50 to-transparent">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-[11px] font-bold">
              <Check className="w-3 h-3" />
              100% MPC Private
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
