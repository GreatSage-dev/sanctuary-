"use client";

import React from "react";

export const PartnerFooter: React.FC = () => {
  const partners = ["COTI V2", "ETHEREUM", "ETHERS.JS", "METAMASK", "WAGMI"];

  return (
    <footer className="w-full max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-12">
      <div className="section-divider mb-8 opacity-20" />

      <div className="text-center mb-6">
        <span className="text-[12px] text-gray-400 font-medium tracking-wider font-mono uppercase">
          Ecosystem Partners
        </span>
      </div>

      <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
        {partners.map((name) => (
          <span
            key={name}
            className="text-[14px] md:text-[16px] font-extrabold tracking-tight text-white opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer font-mono"
          >
            {name}
          </span>
        ))}
      </div>
    </footer>
  );
};
