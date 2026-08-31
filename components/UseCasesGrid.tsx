"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Key, Users, Building2, ShieldAlert, ArrowUpRight } from "lucide-react";

/* Magnetic tilt hook */
function useMagneticTilt() {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  return { ref, tilt, handleMouseMove, handleMouseLeave };
}

/* Small decorative SVG illustrations */
const InheritanceSVG = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="20" stroke="#C4B5FD" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M24 12v24M16 20l8-8 8 8" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="38" r="3" fill="#8B5CF6" opacity="0.5" />
    <circle cx="16" cy="38" r="2" fill="#C4B5FD" />
    <circle cx="32" cy="38" r="2" fill="#C4B5FD" />
  </svg>
);

const DistressSVG = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 8L40 40H8L24 8Z" stroke="#8B5CF6" strokeWidth="2" fill="none" />
    <line x1="24" y1="18" x2="24" y2="28" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="24" cy="33" r="1.5" fill="#8B5CF6" />
    <circle cx="24" cy="24" r="22" stroke="#C4B5FD" strokeWidth="0.5" strokeDasharray="4 4" />
  </svg>
);

const DaoSVG = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="12" y="20" width="24" height="20" rx="3" stroke="#8B5CF6" strokeWidth="1.5" />
    <path d="M12 20L24 10L36 20" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="20" y="28" width="8" height="12" rx="1" fill="#C4B5FD" opacity="0.4" />
    <circle cx="24" cy="16" r="2" fill="#8B5CF6" />
  </svg>
);

const KeyReleaseSVG = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="18" cy="20" r="8" stroke="#8B5CF6" strokeWidth="1.5" />
    <line x1="24" y1="24" x2="40" y2="24" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
    <line x1="34" y1="24" x2="34" y2="30" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
    <line x1="38" y1="24" x2="38" y2="28" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
    <circle cx="18" cy="20" r="3" fill="#C4B5FD" opacity="0.4" />
  </svg>
);

const illustrations = [InheritanceSVG, DistressSVG, DaoSVG, KeyReleaseSVG];

export const UseCasesGrid: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const useCases = [
    {
      title: "Confidential Crypto Inheritance",
      desc: "Safeguard high-value crypto portfolios for family and beneficiaries without revealing beneficiary wallet addresses or asset allocation amounts during your lifetime.",
      icon: Key,
      tag: "Estate Planning",
      featured: true,
    },
    {
      title: "Emergency Distress Signal",
      desc: "Automatically trigger backup key releases or distress payloads to trusted emergency contacts if periodic check-in pings stop.",
      icon: ShieldAlert,
      tag: "Distress Switch",
      featured: false,
    },
    {
      title: "DAO Treasury Fallback",
      desc: "Protect DAO governance and treasury multisigs. If core signers become unreachable, emergency execution transfers management to secondary cold storage.",
      icon: Building2,
      tag: "DAO Security",
      featured: false,
    },
    {
      title: "Private Secret Key Release",
      desc: "Encrypted recovery key payload release. Non-custodial, permissionless, and executed zero-knowledge by COTI MPC nodes.",
      icon: Users,
      tag: "Key Backup",
      featured: false,
    },
  ];

  return (
    <section ref={sectionRef} id="use-cases" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-20">
      <div className="section-divider mb-16" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-14"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-coti-violet text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
          WEB3 APPLICATIONS
        </span>
        <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-tighter leading-[1.05] text-[#1A1A1A] mt-1">
          Built for Mission-Critical Privacy
        </h2>
      </motion.div>

      {/* Bento Grid: first card spans 2 cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {useCases.map((uc, idx) => {
          const Icon = uc.icon;
          const Illustration = illustrations[idx];
          return (
            <BentoCard
              key={uc.title}
              uc={uc}
              idx={idx}
              inView={inView}
              Icon={Icon}
              Illustration={Illustration}
            />
          );
        })}
      </div>
    </section>
  );
};

function BentoCard({
  uc,
  idx,
  inView,
  Icon,
  Illustration,
}: {
  uc: { title: string; desc: string; tag: string; featured: boolean };
  idx: number;
  inView: boolean;
  Icon: any;
  Illustration: React.FC;
}) {
  const { ref, tilt, handleMouseMove, handleMouseLeave } = useMagneticTilt();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: idx * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className={`relative bg-white rounded-[24px] p-7 md:p-8 border border-[rgba(0,0,0,0.06)] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_20px_50px_-12px_rgba(139,92,246,0.12)] hover:border-[rgba(139,92,246,0.2)] transition-shadow duration-400 ${
        uc.featured ? "lg:col-span-2 lg:row-span-1" : ""
      }`}
    >
      {/* Animated gradient mesh on featured card */}
      {uc.featured && (
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, #8B5CF6 0%, transparent 50%), radial-gradient(circle at 80% 70%, #C4B5FD 0%, transparent 50%)",
          }}
        />
      )}

      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-coti-violet group-hover:bg-coti-violet group-hover:text-white transition-colors duration-300">
            <Icon className="w-4.5 h-4.5" />
          </div>
          <span className="px-3 py-1 rounded-full bg-[#F3F4F6] text-[10px] font-mono font-bold uppercase tracking-wider text-[#9CA3AF]">
            {uc.tag}
          </span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Illustration />
        </div>
      </div>

      <h3 className="text-[20px] md:text-[22px] font-bold tracking-tight text-[#1A1A1A] mb-2 leading-snug">
        {uc.title}
      </h3>

      <p className="text-[13px] text-[#6B7280] leading-relaxed mb-5">
        {uc.desc}
      </p>

      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-coti-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Learn more</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </div>
    </motion.div>
  );
}
