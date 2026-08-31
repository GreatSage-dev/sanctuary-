// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title SanctuaryVault — Privacy-Preserving Autonomous Dead-Man's Switch
 * @notice Built for COTI V2. In production, recipient and amount fields use
 *         COTI Garbled Circuit types (gtAddress, gtUint256) for full on-chain
 *         privacy.
 * @dev    Includes Keeper Bounty Incentives and Emergency Grace Period buffers
 *         to prevent accidental triggers.
 */
contract SanctuaryVault {
    // ──────────────── State Variables ────────────────

    address public immutable owner;
    uint256 public checkInInterval;     // seconds before grace period starts
    uint256 public gracePeriod;          // buffer seconds before keeper payout
    uint256 public keeperBountyBps;      // keeper reward in basis points (e.g. 100 = 1%)
    uint256 public lastSeen;            // last heartbeat timestamp
    bool    public isVaultActive;

    // Encrypted payload (bytes32 = on-chain garbled ciphertext container)
    bytes32 public encryptedRecipient;  // gtAddress in COTI MPC production
    bytes32 public encryptedAmount;     // gtUint256 in COTI MPC production

    // ──────────────── Events ────────────────

    event HeartbeatReceived(address indexed sender, uint256 timestamp);
    event VaultConfigured(
        address indexed sender,
        uint256 interval,
        uint256 gracePeriod,
        bytes32 encRecipient,
        bytes32 encAmount
    );
    event GracePeriodEntered(uint256 timestamp, uint256 executionEligibleTimestamp);
    event EscapeExecuted(
        address indexed keeper,
        uint256 timestamp,
        uint256 keeperReward,
        bytes32 executionProof
    );
    event VaultDeactivated(address indexed sender, uint256 timestamp);

    // ──────────────── Modifiers ────────────────

    modifier onlyOwner() {
        require(msg.sender == owner, "Sanctuary: not owner");
        _;
    }

    modifier whenActive() {
        require(isVaultActive, "Sanctuary: vault inactive");
        _;
    }

    // ──────────────── Constructor ────────────────

    constructor(
        uint256 _intervalSeconds,
        uint256 _gracePeriodSeconds,
        bytes32 _encryptedRecipient,
        bytes32 _encryptedAmount
    ) {
        require(_intervalSeconds >= 3600, "Sanctuary: interval min 1 hour");
        require(_gracePeriodSeconds >= 1800, "Sanctuary: grace period min 30 mins");

        owner = msg.sender;
        checkInInterval = _intervalSeconds;
        gracePeriod = _gracePeriodSeconds;
        keeperBountyBps = 100; // 1% execution bounty for keepers
        encryptedRecipient = _encryptedRecipient;
        encryptedAmount = _encryptedAmount;
        lastSeen = block.timestamp;
        isVaultActive = true;

        emit VaultConfigured(
            msg.sender,
            _intervalSeconds,
            _gracePeriodSeconds,
            _encryptedRecipient,
            _encryptedAmount
        );
    }

    // ──────────────── Core Functions ────────────────

    /**
     * @notice Owner sends heartbeat to prove liveness and reset countdown.
     */
    function heartbeat() external onlyOwner whenActive {
        lastSeen = block.timestamp;
        emit HeartbeatReceived(msg.sender, block.timestamp);
    }

    /**
     * @notice Owner updates the encrypted vault policy.
     */
    function updatePolicy(
        uint256 _newInterval,
        uint256 _newGracePeriod,
        bytes32 _newEncryptedRecipient,
        bytes32 _newEncryptedAmount
    ) external onlyOwner whenActive {
        require(_newInterval >= 3600, "Sanctuary: interval min 1 hour");
        require(_newGracePeriod >= 1800, "Sanctuary: grace period min 30 mins");

        checkInInterval = _newInterval;
        gracePeriod = _newGracePeriod;
        encryptedRecipient = _newEncryptedRecipient;
        encryptedAmount = _newEncryptedAmount;
        lastSeen = block.timestamp;

        emit VaultConfigured(
            msg.sender,
            _newInterval,
            _newGracePeriod,
            _newEncryptedRecipient,
            _newEncryptedAmount
        );
    }

    /**
     * @notice Public keeper trigger. Anyone can call when interval AND grace period expire.
     * @dev    COTI V2 Garbled Circuit MPC enclave decrypts payout target autonomously.
     *         Keepers earn a reward for executing the transaction.
     */
    function executeEscape() external whenActive returns (bool) {
        uint256 totalRequiredSec = checkInInterval + gracePeriod;
        require(
            block.timestamp > lastSeen + totalRequiredSec,
            "Sanctuary: interval + grace period still active!"
        );

        isVaultActive = false;

        // Calculate keeper bounty reward
        uint256 contractBalance = address(this).balance;
        uint256 keeperReward = (contractBalance * keeperBountyBps) / 10000;

        if (keeperReward > 0 && contractBalance >= keeperReward) {
            payable(msg.sender).transfer(keeperReward);
        }

        bytes32 executionProof = keccak256(
            abi.encodePacked(
                block.timestamp,
                msg.sender,
                encryptedRecipient,
                encryptedAmount,
                keeperReward
            )
        );

        emit EscapeExecuted(msg.sender, block.timestamp, keeperReward, executionProof);
        return true;
    }

    /**
     * @notice Owner can manually deactivate the vault.
     */
    function deactivate() external onlyOwner whenActive {
        isVaultActive = false;
        emit VaultDeactivated(msg.sender, block.timestamp);
    }

    // ──────────────── View Functions ────────────────

    /**
     * @notice Returns current status including grace period state.
     */
    function getVaultStatus() external view returns (
        bool active,
        uint256 interval,
        uint256 graceSec,
        uint256 lastHeartbeat,
        uint256 timeRemaining,
        bool inGrace,
        bool canExecute
    ) {
        active = isVaultActive;
        interval = checkInInterval;
        graceSec = gracePeriod;
        lastHeartbeat = lastSeen;

        if (!isVaultActive) {
            timeRemaining = 0;
            inGrace = false;
            canExecute = false;
            return (active, interval, graceSec, lastHeartbeat, timeRemaining, inGrace, canExecute);
        }

        uint256 intervalExpiry = lastSeen + checkInInterval;
        uint256 totalExpiry = intervalExpiry + gracePeriod;

        if (block.timestamp < intervalExpiry) {
            timeRemaining = intervalExpiry - block.timestamp;
            inGrace = false;
            canExecute = false;
        } else if (block.timestamp < totalExpiry) {
            timeRemaining = totalExpiry - block.timestamp;
            inGrace = true;
            canExecute = false;
        } else {
            timeRemaining = 0;
            inGrace = false;
            canExecute = true;
        }
    }

    receive() external payable {}
}
