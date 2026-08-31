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
    <html lang="en" className="scroll-smooth">
      <body className="bg-canvas text-[#1A1A1A] font-sans antialiased selection:bg-coti-violet/20 selection:text-coti-violet">
        <Web3Providers>{children}</Web3Providers>
      </body>
    </html>
  );
}
