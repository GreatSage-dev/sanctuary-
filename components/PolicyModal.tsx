"use client";

import React, { useState } from "react";
import { X, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { VaultConfig } from "@/lib/types";
import { garbleAddress, garbleAmount } from "@/lib/cotiService";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVault: VaultConfig;
  onVaultUpdated: (
    intervalHours: number,
    gracePeriodHours: number,
    recipient: string,
    amount: string
  ) => Promise<void>;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  currentVault,
  onVaultUpdated,
}) => {
  const [intervalHours, setIntervalHours] = useState(currentVault.checkInIntervalHours);
  const [gracePeriodHours, setGracePeriodHours] = useState(currentVault.gracePeriodHours || 24);
  const [recipient, setRecipient] = useState("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
  const [amountCOTI, setAmountCOTI] = useState("5000");
  const [showGarbled, setShowGarbled] = useState(true);
  const [isDeploying, setIsDeploying] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isOpen) return null;

  const isValidEvmAddress = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr);

  const garbledRecip = garbleAddress(recipient);
  const garbledAmt = garbleAmount(amountCOTI);

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validation Check 1: Address format
    if (!isValidEvmAddress(recipient)) {
      setValidationError("Invalid Ethereum/COTI beneficiary address. Format must be 0x followed by 40 hex characters.");
      return;
    }

    // Validation Check 2: Amount
    const amtNum = parseFloat(amountCOTI);
    if (isNaN(amtNum) || amtNum <= 0) {
      setValidationError("Fund amount must be greater than 0 $COTI.");
      return;
    }

    setIsDeploying(true);
    try {
      await onVaultUpdated(intervalHours, gracePeriodHours, recipient, amountCOTI);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeploying(false);
    }
  };

  const intervals = [
    { label: "24 Hours", value: 24 },
    { label: "48 Hours", value: 48 },
    { label: "7 Days", value: 168 },
    { label: "30 Days", value: 720 },
  ];

  const graceOptions = [
    { label: "12 Hours Buffer", value: 12 },
    { label: "24 Hours Buffer", value: 24 },
    { label: "48 Hours Buffer", value: 48 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-card-elevated border border-border-subtle max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[22px] font-bold tracking-tight text-[#1A1A1A]">
              Configure Vault Policy
            </h3>
            <p className="text-[13px] text-[#6B7280] mt-0.5">
              Encrypted COTI V2 dead-man's switch parameters
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-canvas hover:bg-gray-200 flex items-center justify-center text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-[12px] flex items-start gap-2.5 font-medium">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleDeploy} className="space-y-6">
          {/* Interval Selector */}
          <div>
            <label className="block text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
              1. Heartbeat Check-In Interval
            </label>
            <div className="grid grid-cols-4 gap-2">
              {intervals.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setIntervalHours(opt.value)}
                  className={`py-2.5 px-2 rounded-xl text-[12px] font-semibold border transition-all duration-300 ${
                    intervalHours === opt.value
                      ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-btn-black"
                      : "bg-canvas border-border-subtle text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#1A1A1A]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grace Period Buffer Selector */}
          <div>
            <label className="block text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
              2. Emergency Grace Period Buffer
            </label>
            <div className="grid grid-cols-3 gap-2">
              {graceOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setGracePeriodHours(opt.value)}
                  className={`py-2 px-2 rounded-xl text-[11px] font-semibold border transition-all duration-300 ${
                    gracePeriodHours === opt.value
                      ? "bg-coti-violet text-white border-coti-violet shadow-sm"
                      : "bg-canvas border-border-subtle text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#1A1A1A]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#6B7280] mt-1">
              Grace window after heartbeat expiry before keepers can execute payouts.
            </p>
          </div>

          {/* Recipient Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">
                3. Beneficiary Address
              </label>
              <button
                type="button"
                onClick={() => setShowGarbled(!showGarbled)}
                className="text-[11px] font-medium text-coti-violet hover:underline flex items-center gap-1"
              >
                {showGarbled ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{showGarbled ? "Hide Preview" : "Show ctAddress"}</span>
              </button>
            </div>

            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
              required
              className={`w-full px-4 py-3 rounded-xl bg-canvas border text-[#1A1A1A] font-mono text-[13px] focus:outline-none focus:ring-2 focus:ring-coti-violet/20 transition-all ${
                recipient && !isValidEvmAddress(recipient)
                  ? "border-red-300 focus:border-red-500"
                  : "border-border-subtle focus:border-coti-violet"
              }`}
            />

            {showGarbled && (
              <div className="mt-2 p-3 rounded-xl bg-purple-50 border border-purple-100 text-[11px] font-mono">
                <span className="text-coti-violet font-semibold block mb-0.5">ctAddress Output:</span>
                <span className="text-purple-600 break-all">{garbledRecip.garbledCiphertext}</span>
              </div>
            )}
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
              4. Escape Fund ($COTI)
            </label>
            <div className="relative">
              <input
                type="number"
                value={amountCOTI}
                onChange={(e) => setAmountCOTI(e.target.value)}
                placeholder="5000"
                required
                className="w-full px-4 py-3 rounded-xl bg-canvas border border-border-subtle text-[#1A1A1A] font-mono text-[13px] focus:outline-none focus:ring-2 focus:ring-coti-violet/20 focus:border-coti-violet transition-all pr-20"
              />
              <span className="absolute right-4 top-3 text-[12px] font-mono font-bold text-[#9CA3AF]">
                $COTI
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-border-subtle flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-[13px] font-medium text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isDeploying}
              className="px-6 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white text-[13px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-btn-black hover:shadow-btn-black-hover flex items-center gap-2 disabled:opacity-50"
            >
              <span>{isDeploying ? "Deploying…" : "Deploy Vault"}</span>
              {!isDeploying && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
