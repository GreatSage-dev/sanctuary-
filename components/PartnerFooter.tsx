"use client";

import React from "react";

export const PartnerFooter: React.FC = () => {
  const partners = [
    "COTI V2",
    "ETHEREUM",
    "ETHERS.JS",
    "METAMASK",
  ];

  return (
    <footer className="w-full max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-12">
      {/* Divider */}
      <div className="section-divider mb-8" />

      {/* Label */}
      <div className="text-center mb-6">
        <span className="text-[12px] text-[#9CA3AF] font-medium">
          Our Partners
        </span>
      </div>

      {/* Partner logo text strip (matches reference logo bar) */}
      <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
        {partners.map((name) => (
          <span
            key={name}
            className="text-[14px] md:text-[16px] font-extrabold tracking-tight text-[#1A1A1A] opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          >
            {name}
          </span>
        ))}
      </div>
    </footer>
  );
};
