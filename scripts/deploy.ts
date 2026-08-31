import { ethers } from "hardhat";

async function main() {
  console.log("--------------------------------------------------");
  console.log("Deploying SanctuaryVault to COTI V2 Testnet...");
  console.log("--------------------------------------------------");

  const [deployer] = await ethers.getSigners();
  console.log("Deployer Wallet Address:", deployer.address);

  // Initial Vault Policy Parameters:
  // 1. Check-in Interval: 24 hours (86400 seconds)
  // 2. Grace Period: 24 hours (86400 seconds)
  // 3. Encrypted Recipient: ctAddress garbled ciphertext container hash
  // 4. Encrypted Amount: gtUint256 garbled amount container hash

  const intervalSeconds = 86400; // 24 hours
  const gracePeriodSeconds = 86400; // 24 hours
  const encRecipient = ethers.keccak256(ethers.toUtf8Bytes("0x71C7656EC7ab88b098defB751B7401B5f6d8976F"));
  const encAmount = ethers.keccak256(ethers.toUtf8Bytes("5000000000000000000000")); // 5000 COTI

  const SanctuaryVault = await ethers.getContractFactory("SanctuaryVault");
  const vault = await SanctuaryVault.deploy(
    intervalSeconds,
    gracePeriodSeconds,
    encRecipient,
    encAmount
  );

  await vault.waitForDeployment();

  const vaultAddress = await vault.getAddress();

  console.log("✅ SanctuaryVault Deployed Successfully!");
  console.log("Contract Address:", vaultAddress);
  console.log("Owner Address:   ", deployer.address);
  console.log("Interval:        ", intervalSeconds, "seconds");
  console.log("Grace Period:    ", gracePeriodSeconds, "seconds");
  console.log("--------------------------------------------------");
  console.log("Next Step: Copy 'NEXT_PUBLIC_CONTRACT_ADDRESS=" + vaultAddress + "' into your .env file!");
  console.log("--------------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
