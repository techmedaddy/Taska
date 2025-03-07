import { Request, Response } from "express";
import { createBlock, getBlockchain, isBlockchainValid } from "../services/blockService.js";
import { getMempoolTransactions, confirmTransactions } from "../services/transactionService.js";

/**
 * Create a new block with confirmed transactions.
 */
export function mineBlock(req: Request, res: Response): void {
    const transactions = confirmTransactions();
    if (transactions.length === 0) {
        res.status(400).json({ message: "No transactions to mine" });
        return;
    }

    const lastBlock = getBlockchain().slice(-1)[0] || { hash: "0" };
    const newBlock = createBlock(transactions, lastBlock.hash);

    res.status(201).json({ message: "Block mined successfully", block: newBlock });
}

/**
 * Get the entire blockchain.
 */
export function getBlocks(req: Request, res: Response): void {
    res.json({ blockchain: getBlockchain() });
}

/**
 * Validate the blockchain integrity.
 */
export function validateBlockchain(req: Request, res: Response): void {
    res.json({ valid: isBlockchainValid() });
}
