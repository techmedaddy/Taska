import { Transaction } from "../models/Transaction.js";
import crypto from "crypto"; // ✅ Fixed: Importing crypto

let mempool: Transaction[] = []; // Store unconfirmed transactions

export function createTransaction(sender: string, receiver: string, amount: number): Transaction {
    const transaction: Transaction = {
        id: mempool.length,
        txHash: crypto.randomUUID(), // ✅ Fixed: Generate transaction hash
        sender,
        receiver,
        amount,
        gasFee: 0.001,
        status: "pending",
        block: null, // ✅ Fixed: Explicitly setting block as null
        timestamp: new Date() // ✅ Fixed: Ensuring timestamp is a Date type
    };
    mempool.push(transaction);
    return transaction;
}

export function getMempoolTransactions(): Transaction[] {
    return mempool;
}

export function confirmTransactions(): Transaction[] {
    const confirmedTransactions = [...mempool];
    mempool = []; // Clear mempool after confirmation
    return confirmedTransactions;
}
