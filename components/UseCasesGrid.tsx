"use client";

import React from "react";
import { Key, Users, Building2, ShieldAlert } from "lucide-react";

export const UseCasesGrid: React.FC = () => {
  const useCases = [
    {
      title: "Confidential Crypto Inheritance",
      desc: "Safeguard high-value crypto portfolios for family and beneficiaries without revealing beneficiary wallet addresses or asset allocation amounts during your lifetime.",
      icon: Key,
      tag: "Estate Planning",
    },
    {
      title: "Emergency Distress Signal",
      desc: "Automatically trigger backup key releases or distress payloads to trusted emergency contacts if periodic check-in pings stop.",
      icon: ShieldAlert,
      tag: "Distress Switch",
    },
    {
      title: "DAO Treasury Fallback",
      desc: "Protect DAO governance and treasury multisigs. If core signers become unreachable, emergency execution transfers management to secondary cold storage.",
      icon: Building2,
      tag: "DAO Security",
    },
    {
      title: "Private Secret Key Release",
      desc: "Encrypted recovery key payload release. Non-custodial, permissionless, and executed zero-knowledge by COTI MPC nodes.",
      icon: Users,
      tag: "Key Backup",
    },
  ];

  return (
    <section id="use-cases" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16">
      <div className="section-divider mb-16" />

      <div className="text-center mb-12">
        <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-[#6B7280]">
          WEB3 APPLICATIONS
        </span>
        <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-tighter leading-[1.05] text-[#1A1A1A] mt-1">
          Built for Mission-Critical Privacy
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {useCases.map((uc) => {
          const Icon = uc.icon;
          return (
            <div key={uc.title} className="card-white p-8 flex flex-col justify-between border border-border-subtle group hover:border-[#1A1A1A] transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-coti-violet">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-canvas border border-border-subtle text-[11px] font-mono font-semibold text-[#6B7280]">
                    {uc.tag}
                  </span>
                </div>

                <h3 className="text-[20px] font-bold tracking-tight text-[#1A1A1A] mb-2">
                  {uc.title}
                </h3>

                <p className="text-[14px] text-[#6B7280] leading-relaxed">
                  {uc.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
