"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Sanctuary keep beneficiary addresses 100% private?",
      a: "Sanctuary is built natively on COTI V2 Garbled Circuits (Multi-Party Computation). When you configure a beneficiary address, it is garbled into a private gtAddress ciphertext. Block explorers and public RPC nodes only see garbled bytes — never your raw 0x address.",
    },
    {
      q: "What happens if I miss a check-in interval?",
      a: "If your check-in interval (e.g. 24h or 7d) + emergency grace period expires without receiving a heartbeat ping signature from your owner wallet, the vault enters an 'Expired' state. At that point, any external keeper can trigger executeEscape(), which decrypts the payout target within COTI's MPC enclave autonomously.",
    },
    {
      q: "Can external keepers steal my funds or discover who receives them?",
      a: "No. Keepers only initiate the smart contract execution trigger. The payout target is decrypted and executed entirely inside COTI V2's Garbled Circuit enclave. Keepers never learn the recipient's identity, nor can they alter the execution target.",
    },
    {
      q: "Is Sanctuary non-custodial?",
      a: "Yes. Sanctuary is 100% non-custodial and permissionless. Only you hold the key to send heartbeat signals or update policy parameters.",
    },
    {
      q: "Which networks are supported?",
      a: "Sanctuary is deployed on COTI V2 Testnet (Chain ID 7082400) and is designed for full EVM compatibility.",
    },
  ];

  return (
    <section id="faq" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-20">
      <div className="section-divider mb-16" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Section Header (sticky on desktop) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-coti-violet text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ
            </span>
            <h2 className="text-[30px] md:text-[38px] font-extrabold tracking-tighter text-[#1A1A1A] leading-[1.08]">
              Protocol FAQ &<br />Deep Dive
            </h2>
            <p className="text-[14px] text-[#6B7280] mt-3 leading-relaxed">
              Everything you need to know about how Sanctuary protects your assets using COTI V2 Garbled Circuits.
            </p>
          </motion.div>
        </div>

        {/* Right: Accordion Items */}
        <div className="lg:col-span-8 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isOpen
                    ? "border-[rgba(139,92,246,0.25)] shadow-[0_12px_40px_-10px_rgba(139,92,246,0.1)]"
                    : "border-[rgba(0,0,0,0.06)] shadow-[0_4px_16px_-4px_rgba(0,0,0,0.03)]"
                }`}
              >
                {/* Animated left accent bar */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-400 to-violet-600 origin-top"
                />

                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center gap-4"
                >
                  {/* Number badge */}
                  <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold transition-colors duration-300 ${
                    isOpen
                      ? "bg-coti-violet text-white"
                      : "bg-[#F3F4F6] text-[#9CA3AF]"
                  }`}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <span className={`flex-1 font-semibold text-[15px] transition-colors duration-200 ${
                    isOpen ? "text-[#1A1A1A]" : "text-[#4B5563]"
                  }`}>
                    {faq.q}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <ChevronDown className={`w-5 h-5 transition-colors duration-200 ${
                      isOpen ? "text-coti-violet" : "text-[#9CA3AF]"
                    }`} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-[4.25rem] text-[14px] text-[#6B7280] leading-[1.7]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
