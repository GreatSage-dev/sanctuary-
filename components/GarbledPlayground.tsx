"use client";

import React, { useState } from "react";
import { Shield, Lock, Cpu, CheckCircle2 } from "lucide-react";
import { garbleAddress, garbleAmount } from "@/lib/cotiService";

export const GarbledPlayground: React.FC = () => {
  const [address, setAddress] = useState("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
  const [amount, setAmount] = useState("10000");

  const garbledRecip = garbleAddress(address);
  const garbledAmt = garbleAmount(amount);

  return (
    <section id="garbled-mpc" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16">
      <div className="glass-card p-8 md:p-12 relative overflow-hidden border border-white/10">
        <div className="max-w-2xl mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[12px] font-mono font-bold mb-3">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            LIVE MPC GARBLED SIMULATOR
          </span>
          <h2 className="text-[28px] md:text-[38px] font-extrabold tracking-tighter text-white leading-[1.08]">
            Test COTI V2 Garbled Circuit Encoding
          </h2>
          <p className="text-[14px] text-gray-400 mt-2">
            Try typing any beneficiary address or fund amount below to see how COTI V2 Multi-Party Computation converts sensitive data into unreadable on-chain ciphertexts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-5 space-y-5 bg-white/[0.03] p-6 rounded-2xl border border-white/10">
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase text-gray-400 mb-2">
                Sample Beneficiary Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x…"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 font-mono text-[12px] text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase text-gray-400 mb-2">
                Sample Fund Amount ($COTI)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10000"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 font-mono text-[12px] text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
              />
            </div>
          </div>

          {/* Garbled Output Column */}
          <div className="lg:col-span-7 bg-[#040405] text-white p-6 md:p-8 rounded-2xl border border-white/15 font-mono text-[12px] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-purple-300 font-bold flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" />
                ON-CHAIN GARBLED STORAGE PRIMITIVES
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">STATE: 100% PRIVATE</span>
            </div>

            <div>
              <span className="text-gray-400 block mb-1 text-[11px]">COTI `gtAddress` Garbled Container:</span>
              <div className="p-3 rounded-xl bg-black/80 border border-purple-500/30 text-cyan-300 font-bold break-all">
                {garbledRecip.garbledCiphertext}
              </div>
            </div>

            <div>
              <span className="text-gray-400 block mb-1 text-[11px]">COTI `gtUint256` Garbled Container:</span>
              <div className="p-3 rounded-xl bg-black/80 border border-purple-500/30 text-purple-300 font-bold break-all">
                {garbledAmt.garbledCiphertext}
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
              <span>Circuit Proof: <strong className="text-white">{garbledRecip.circuitProofHash.slice(0, 16)}…</strong></span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Zero Leakage
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
