"use client";

import React, { useState } from "react";
import { Shield, Eye, EyeOff, Lock, ArrowRight, Cpu, CheckCircle2 } from "lucide-react";
import { garbleAddress, garbleAmount } from "@/lib/cotiService";

export const GarbledPlayground: React.FC = () => {
  const [address, setAddress] = useState("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
  const [amount, setAmount] = useState("10000");

  const garbledRecip = garbleAddress(address);
  const garbledAmt = garbleAmount(amount);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-12">
      <div className="card-white p-8 md:p-12 border border-border-subtle relative overflow-hidden">
        <div className="max-w-2xl mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-coti-violet text-[12px] font-mono font-bold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            LIVE MPC GARBLED SIMULATOR
          </span>
          <h2 className="text-[28px] md:text-[38px] font-extrabold tracking-tighter text-[#1A1A1A] leading-[1.08]">
            Test COTI V2 Garbled Circuit Encoding
          </h2>
          <p className="text-[14px] text-[#6B7280] mt-2">
            Try typing any beneficiary address or fund amount below to see how COTI V2 Multi-Party Computation converts sensitive data into unreadable on-chain ciphertexts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-5 space-y-5 bg-canvas p-6 rounded-2xl border border-border-subtle">
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase text-[#6B7280] mb-2">
                Sample Beneficiary Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x…"
                className="w-full px-4 py-3 rounded-xl bg-white border border-border-subtle font-mono text-[12px] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-coti-violet/20 focus:border-coti-violet transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase text-[#6B7280] mb-2">
                Sample Fund Amount ($COTI)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10000"
                className="w-full px-4 py-3 rounded-xl bg-white border border-border-subtle font-mono text-[12px] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-coti-violet/20 focus:border-coti-violet transition-all"
              />
            </div>
          </div>

          {/* Garbled Output Column */}
          <div className="lg:col-span-7 bg-[#0D0E12] text-white p-6 md:p-8 rounded-2xl border border-white/10 font-mono text-[12px] space-y-4 shadow-card-elevated">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-coti-violet-light font-bold flex items-center gap-2">
                <Lock className="w-4 h-4 text-coti-violet" />
                ON-CHAIN GARBLED STORAGE PRIMITIVES
              </span>
              <span className="text-[10px] text-coti-emerald font-bold">STATE: 100% PRIVATE</span>
            </div>

            <div>
              <span className="text-gray-500 block mb-1 text-[11px]">COTI `gtAddress` Garbled Container:</span>
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-coti-cyan font-bold break-all">
                {garbledRecip.garbledCiphertext}
              </div>
            </div>

            <div>
              <span className="text-gray-500 block mb-1 text-[11px]">COTI `gtUint256` Garbled Container:</span>
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-[#C4B5FD] font-bold break-all">
                {garbledAmt.garbledCiphertext}
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
              <span>Circuit Proof: <strong className="text-white">{garbledRecip.circuitProofHash.slice(0, 16)}…</strong></span>
              <span className="text-coti-emerald flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Zero Leakage
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
