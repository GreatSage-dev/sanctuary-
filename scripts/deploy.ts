import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  SANCTUARY VAULT — Deployment Script");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`  Deployer:  ${deployer.address}`);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`  Balance:   ${ethers.formatEther(balance)} COTI`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  // ── Deploy Parameters ──
  // Default: 24-hour check-in interval (86400 seconds)
  const intervalSeconds = 86400;

  // Placeholder encrypted payloads (bytes32)
  // In production, these come from COTI Garbled Circuit MPC encoding
  const encryptedRecipient = ethers.encodeBytes32String("GARBLED_RECIPIENT");
  const encryptedAmount = ethers.encodeBytes32String("GARBLED_AMOUNT");

  console.log("\n  Deploying SanctuaryVault...");
  console.log(`  Interval:  ${intervalSeconds}s (${intervalSeconds / 3600}h)`);

  const SanctuaryVault = await ethers.getContractFactory("SanctuaryVault");
  const vault = await SanctuaryVault.deploy(
    intervalSeconds,
    encryptedRecipient,
    encryptedAmount
  );

  await vault.waitForDeployment();

  const address = await vault.getAddress();

  console.log("\n  ✓ SanctuaryVault deployed successfully!");
  console.log(`  ┌──────────────────────────────────────────┐`);
  console.log(`  │  Contract: ${address}  │`);
  console.log(`  └──────────────────────────────────────────┘`);
  console.log("\n  Add this to your .env file:");
  console.log(`  NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
