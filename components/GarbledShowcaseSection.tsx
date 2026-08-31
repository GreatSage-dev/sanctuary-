"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Cpu } from "lucide-react";

export const GarbledShowcaseSection: React.FC = () => {
  const cards = [
    {
      badge: "COTI `gtAddress`",
      title: "Confidential Beneficiary",
      desc: "Your target heir or emergency contact address is converted into a garbled ciphertext. Public block explorers only see encrypted bytes.",
      codePreview: "ctAddress0x9f83a…[MPC_GARBLED]",
      icon: Shield,
    },
    {
      badge: "COTI `gtUint256`",
      title: "Encrypted Payout Balance",
      desc: "Vault balances and emergency escape funds are stored as garbled integer ciphertexts. No external observer can discover your wallet wealth.",
      codePreview: "ctUint256_500000000000…[MPC_KEY]",
      icon: Lock,
    },
    {
      badge: "COTI MPC Enclave",
      title: "Zero-Knowledge Keeper",
      desc: "When countdown pings expire, decentralized keepers trigger executeEscape(). The MPC enclave decrypts payout targets without leaking identity.",
      codePreview: "Proof: 0x8a91f2c4…[ZK_VERIFIED]",
      icon: Cpu,
    },
  ];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 md:px-10 py-24 overflow-hidden">
      {/* ── GIANT BACKGROUND WATERMARK TEXT (Makes Frosted Glassmorphism Pop) ── */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 w-full text-center">
        <span className="text-[120px] sm:text-[180px] md:text-[250px] font-black tracking-tighter text-purple-900/[0.08] leading-none uppercase">
          GARBLED
        </span>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-coti-violet text-[12px] font-mono font-bold mb-3">
          <Shield className="w-3.5 h-3.5 text-coti-violet" />
          FROSTED MPC ARCHITECTURE
        </span>
        <h2 className="text-[34px] md:text-[48px] font-extrabold tracking-tighter text-[#1A1A1A] leading-[1.05]">
          Confidential Garbled Primitives
        </h2>
        <p className="text-[15px] text-[#6B7280] mt-3 max-w-xl mx-auto">
          Explore how COTI V2 Multi-Party Computation encrypts your vault state directly on-chain.
        </p>
      </div>

      {/* ── 3 FROSTED GLASSMORPHISM CARDS OVERLAYING THE GIANT TEXT ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-frosted glass-card-frosted-hover p-8 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle top glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/60 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-[11px] font-mono font-bold text-coti-violet">
                    {card.badge}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-coti-violet border border-purple-100">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-[22px] font-bold tracking-tight text-[#1A1A1A] mb-3">
                  {card.title}
                </h3>

                <p className="text-[14px] text-[#6B7280] leading-relaxed mb-6">
                  {card.desc}
                </p>

                {/* Translucent Code Box */}
                <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-100 font-mono text-[11px] text-coti-violet font-semibold break-all">
                  <span className="text-[10px] text-gray-400 block mb-0.5 font-normal">State Output:</span>
                  {card.codePreview}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
