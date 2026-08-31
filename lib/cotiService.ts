import {
  type PublicClient,
  type WalletClient,
  keccak256,
  toHex,
  toBytes,
  type Address,
  type Hash,
} from "viem";
import { SANCTUARY_VAULT_ABI } from "./abi";
import { VaultConfig, HeartbeatStatus, GarbledCircuitPreview } from "./types";

export const CONTRACT_ADDRESS: Address =
  (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address) ||
  "0x0000000000000000000000000000000000000000";

export const MOCK_VAULT_STATE: VaultConfig = {
  checkInIntervalHours: 24,
  gracePeriodHours: 24,
  encryptedRecipient: "ctAddress0x9f83a…[MPC_GARBLED_0x8f2a]",
  encryptedAmount: "ctUint256_5000000000000000000000",
  lastSeenTimestamp: Math.floor(Date.now() / 1000),
  isActive: true,
  vaultAddress: CONTRACT_ADDRESS,
  ownerAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  keeperBountyBps: 100, // 1% execution bounty
};

export function garbleAddress(address: string): GarbledCircuitPreview {
  if (!address || address.length < 10) {
    return {
      rawInput: address,
      garbledCiphertext: "ctAddress0x0000…[WAITING_INPUT]",
      circuitProofHash: "0x0000000000000000",
      isEncryptedOnChain: false,
    };
  }
  const hash = keccak256(toBytes(address)).slice(0, 26);
  return {
    rawInput: address,
    garbledCiphertext: `ctAddress${hash}…[MPC_GARBLED]`,
    circuitProofHash: keccak256(toBytes(`coti_garble_${address}`)),
    isEncryptedOnChain: true,
  };
}

export function garbleAmount(amountStr: string): GarbledCircuitPreview {
  const num = parseFloat(amountStr) || 0;
  const encoded = toHex(BigInt(Math.floor(num * 1e18)));
  return {
    rawInput: `${num} COTI`,
    garbledCiphertext: `ctUint256_${encoded.slice(0, 18)}…[MPC_KEY]`,
    circuitProofHash: keccak256(toBytes(`coti_garble_amt_${num}`)),
    isEncryptedOnChain: true,
  };
}

export function calculateHeartbeatStatus(vault: VaultConfig): HeartbeatStatus {
  const now = Math.floor(Date.now() / 1000);
  const intervalExpiry = vault.lastSeenTimestamp + vault.checkInIntervalHours * 3600;
  const graceExpiry = intervalExpiry + (vault.gracePeriodHours || 24) * 3600;

  let remainingSeconds = 0;
  let status: "active" | "warning" | "grace_period" | "expired" = "active";
  let inGracePeriod = false;

  if (now < intervalExpiry) {
    remainingSeconds = intervalExpiry - now;
    if (remainingSeconds < 3600 * 4) status = "warning";
    else status = "active";
  } else if (now < graceExpiry) {
    remainingSeconds = graceExpiry - now;
    status = "grace_period";
    inGracePeriod = true;
  } else {
    remainingSeconds = 0;
    status = "expired";
  }

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  const formattedCountdown = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const totalSec = vault.checkInIntervalHours * 3600;
  const healthPercentage = inGracePeriod ? 0 : Math.min(100, Math.max(0, (remainingSeconds / totalSec) * 100));

  return {
    remainingSeconds,
    status,
    formattedCountdown,
    healthPercentage,
    inGracePeriod,
  };
}

export async function readVaultStatus(publicClient: PublicClient): Promise<VaultConfig> {
  const [active, interval, graceSec, lastHeartbeat, timeRemaining, inGrace, canExecute] =
    (await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: SANCTUARY_VAULT_ABI,
      functionName: "getVaultStatus",
    })) as [boolean, bigint, bigint, bigint, bigint, boolean, boolean];

  const ownerAddress = (await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: SANCTUARY_VAULT_ABI,
    functionName: "owner",
  })) as Address;

  const encRecipient = (await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: SANCTUARY_VAULT_ABI,
    functionName: "encryptedRecipient",
  })) as `0x${string}`;

  const encAmount = (await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: SANCTUARY_VAULT_ABI,
    functionName: "encryptedAmount",
  })) as `0x${string}`;

  return {
    checkInIntervalHours: Number(interval) / 3600,
    gracePeriodHours: Number(graceSec) / 3600,
    encryptedRecipient: encRecipient,
    encryptedAmount: encAmount,
    lastSeenTimestamp: Number(lastHeartbeat),
    isActive: active,
    vaultAddress: CONTRACT_ADDRESS,
    ownerAddress: ownerAddress,
    keeperBountyBps: 100,
  };
}

export async function sendHeartbeat(
  walletClient: WalletClient,
  publicClient: PublicClient
): Promise<Hash> {
  const [account] = await walletClient.getAddresses();
  const { request } = await publicClient.simulateContract({
    address: CONTRACT_ADDRESS,
    abi: SANCTUARY_VAULT_ABI,
    functionName: "heartbeat",
    account,
  });
  const txHash = await walletClient.writeContract(request);
  await publicClient.waitForTransactionReceipt({ hash: txHash });
  return txHash;
}

export async function deployVault(
  walletClient: WalletClient,
  publicClient: PublicClient,
  intervalHours: number,
  gracePeriodHours: number,
  recipientAddress: string,
  amountCOTI: string
): Promise<Hash> {
  const [account] = await walletClient.getAddresses();
  const encRecipient = keccak256(toBytes(recipientAddress));
  const encAmount = keccak256(toBytes(`coti_amount_${amountCOTI}`));
  const intervalSeconds = BigInt(intervalHours * 3600);
  const graceSeconds = BigInt(gracePeriodHours * 3600);

  const { request } = await publicClient.simulateContract({
    address: CONTRACT_ADDRESS,
    abi: SANCTUARY_VAULT_ABI,
    functionName: "updatePolicy",
    args: [intervalSeconds, graceSeconds, encRecipient, encAmount],
    account,
  });

  const txHash = await walletClient.writeContract(request);
  await publicClient.waitForTransactionReceipt({ hash: txHash });
  return txHash;
}

export async function executeEscape(
  walletClient: WalletClient,
  publicClient: PublicClient
): Promise<{ txHash: Hash; success: boolean; message: string }> {
  const [account] = await walletClient.getAddresses();
  try {
    const { request } = await publicClient.simulateContract({
      address: CONTRACT_ADDRESS,
      abi: SANCTUARY_VAULT_ABI,
      functionName: "executeEscape",
      account,
    });
    const txHash = await walletClient.writeContract(request);
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    return {
      txHash,
      success: receipt.status === "success",
      message: "SanctuaryVault: Private execution successful! Keeper bounty earned & payout processed.",
    };
  } catch (error: any) {
    const revertMsg = error?.shortMessage || error?.message || "Sanctuary: Heartbeat / Grace period still active!";
    return {
      txHash: "0x" as Hash,
      success: false,
      message: revertMsg,
    };
  }
}

export async function isContractDeployed(publicClient: PublicClient): Promise<boolean> {
  if (CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") return false;
  try {
    const code = await publicClient.getCode({ address: CONTRACT_ADDRESS });
    return !!code && code !== "0x";
  } catch {
    return false;
  }
}
