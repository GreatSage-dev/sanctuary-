"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X, Shield } from "lucide-react";

export const PrivacyComparisonTable: React.FC = () => {
  const comparisonRows = [
    {
      feature: "Beneficiary Address Storage",
      standardEVM: "Public plain text (0x... visible on Etherscan)",
      cotiGarbled: "100% Encrypted (`gtAddress` ciphertext in MPC enclave)",
    },
    {
      feature: "Escape Fund Allocation",
      standardEVM: "Transparent balance visible to all block explorers",
      cotiGarbled: "Garbled uint256 balance (`gtUint256`) — fully private",
    },
    {
      feature: "Physical & Digital Attack Risk",
      standardEVM: "High — Attackers track high-value dead-man recipients",
      cotiGarbled: "Zero — No external entity learns recipient identity",
    },
    {
      feature: "Public Keeper Execution",
      standardEVM: "Leaks beneficiary recipient in transaction parameters",
      cotiGarbled: "Zero-Knowledge execution via garbled circuit decryption",
    },
    {
      feature: "On-Chain Speed & Latency",
      standardEVM: "Slow ZK-SNARK proofs (~30s+ compute time)",
      cotiGarbled: "High-speed Garbled Circuits (<2.5s execution)",
    },
  ];

  return (
    <section id="privacy" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-coti-violet text-[12px] font-mono font-bold mb-3">
          <Shield className="w-3.5 h-3.5" />
          WHY COTI V2 MATTERS
        </span>
        <h2 className="text-[30px] md:text-[44px] font-extrabold tracking-tighter leading-[1.05] text-[#1A1A1A]">
          Transparent EVM vs COTI V2 Garbled Circuits
        </h2>
        <p className="text-[14px] text-[#6B7280] mt-2 max-w-xl mx-auto">
          Standard dead-man switches leak your beneficiary's address and fund size to the entire world. Sanctuary uses COTI V2 Multi-Party Computation to achieve complete privacy.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="card-white overflow-hidden shadow-card-rest border border-border-subtle"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-canvas border-b border-border-subtle text-[12px] font-mono font-bold uppercase text-[#6B7280]">
                <th className="py-4 px-6">Security & Privacy Dimension</th>
                <th className="py-4 px-6 text-red-600">Standard Transparent EVM</th>
                <th className="py-4 px-6 text-coti-violet bg-purple-50/50">Sanctuary on COTI V2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-[13px]">
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#1A1A1A]">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 text-[#6B7280] font-mono text-[12px]">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{row.standardEVM}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#1A1A1A] font-mono text-[12px] bg-purple-50/30 font-bold">
                    <div className="flex items-center gap-2 text-coti-violet">
                      <Check className="w-4 h-4 text-coti-emerald shrink-0" />
                      <span>{row.cotiGarbled}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
};
