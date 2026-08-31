import type { Metadata } from "next";
import { Web3Providers } from "@/components/Web3Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "SANCTUARY — Privacy Dead-Man's Switch on COTI V2",
  description:
    "Autonomous, privacy-preserving dead-man's switch built on COTI V2 Garbled Circuits. 100% confidential beneficiaries, encrypted vault balances, and permissionless keeper execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="bg-[#08080A] text-[#F3F4F6] font-sans antialiased selection:bg-purple-500/30 selection:text-purple-200">
        <Web3Providers>{children}</Web3Providers>
      </body>
    </html>
  );
}
