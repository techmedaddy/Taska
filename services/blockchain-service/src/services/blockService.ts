import crypto from "crypto";
import { Block } from "../models/Block.js";
import { Transaction } from "../models/Transaction.js";

let blockchain: Block[] = [];
const difficulty = 3; // Mining difficulty level

/**
 * Create a new block in the blockchain.
 */
export function createBlock(transactions: Transaction[], previousHash: string): Block {
    let nonce = 0;
    let timestamp = new Date(); // Fixed timestamp type

    let hash = calculateBlockHash(transactions, previousHash, nonce, timestamp);

    // Proof-of-work: Adjust nonce until we get a valid hash
    while (!hash.startsWith("0".repeat(difficulty))) {
        nonce++;
        timestamp = new Date();
        hash = calculateBlockHash(transactions, previousHash, nonce, timestamp);
    }

    const newBlock: Block = {
        id: blockchain.length,
        blockNumber: blockchain.length + 1, // Added missing `blockNumber`
        blockHash: hash,
        previousHash,
        transactions,
        miner: "unknown",
        difficulty,
        nonce,
        timestamp,
        hash, // Fixed hash property
    };

    blockchain.push(newBlock);
    return newBlock;
}

/**
 * Calculate the SHA-256 hash of a block.
 */
function calculateBlockHash(transactions: Transaction[], previousHash: string, nonce: number, timestamp: Date): string {
    const data = JSON.stringify(transactions) + previousHash + nonce + timestamp.toISOString();
    return crypto.createHash("sha256").update(data).digest("hex");
}

/**
 * Validate the blockchain by checking hashes.
 */
export function isBlockchainValid(): boolean {
    for (let i = 1; i < blockchain.length; i++) {
        if (blockchain[i].previousHash !== blockchain[i - 1].blockHash) return false;
    }
    return true;
}

/**
 * Retrieve the blockchain.
 */
export function getBlockchain(): Block[] {
    return blockchain;
}
