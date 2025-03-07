import { Request, Response } from "express";
import { createTransaction, getMempoolTransactions } from "../services/transactionService.js";

/**
 * Create a new transaction.
 */
export function addTransaction(req: Request, res: Response): void {
    const { sender, receiver, amount } = req.body;
    if (!sender || !receiver || amount <= 0) {
        res.status(400).json({ message: "Invalid transaction data" });
        return;
    }

    const transaction = createTransaction(sender, receiver, amount);
    res.status(201).json({ message: "Transaction added to mempool", transaction });
}

/**
 * Get all unconfirmed transactions in the mempool.
 */
export function getTransactions(req: Request, res: Response): void {
    res.json({ mempool: getMempoolTransactions() });
}
