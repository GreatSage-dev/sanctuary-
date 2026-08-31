"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Sanctuary keep beneficiary addresses 100% private?",
      a: "Sanctuary is built natively on COTI V2 Garbled Circuits (Multi-Party Computation). When you configure a beneficiary address, it is garbled into a private `gtAddress` ciphertext. Block explorers and public RPC nodes only see garbled bytes — never your raw 0x address.",
    },
    {
      q: "What happens if I miss a check-in interval?",
      a: "If your check-in interval (e.g. 24h or 7d) expires without receiving a heartbeat ping signature from your owner wallet, the vault enters an 'Expired' state. At that point, any external keeper can trigger `executeEscape()`, which decrypts the payout target within COTI's MPC enclave autonomously.",
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
      a: "Sanctuary is deployed on COTI V2 Devnet / Testnet (Chain ID 13068200) and is designed for full EVM compatibility.",
    },
  ];

  return (
    <section id="faq" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16">
      <div className="section-divider mb-16" />

      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-coti-violet text-[12px] font-mono font-bold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-tighter text-[#1A1A1A]">
          Protocol FAQ & Deep Dive
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.q}
              className="card-white overflow-hidden transition-all duration-300 border border-border-subtle"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-[16px] text-[#1A1A1A]"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#6B7280] transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-coti-violet" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-[14px] text-[#6B7280] leading-relaxed border-t border-border-subtle/50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
