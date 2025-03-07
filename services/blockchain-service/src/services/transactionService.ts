import { Transaction } from "../models/Transaction.js";

let mempool: Transaction[] = [];

export function createTransaction(sender: string, receiver: string, amount: number): Transaction {
  const transaction: Transaction = { id: mempool.length, txHash: crypto.randomUUID(), sender, receiver, amount, gasFee: 0.001, status: "pending", timestamp: new Date(), block: null }; // Fixed timestamp
  mempool.push(transaction);
  return transaction;
}

export function getMempoolTransactions(): Transaction[] {
  return mempool;
}

export function confirmTransactions(): Transaction[] {
  const confirmedTransactions = [...mempool];
  mempool = [];
  return confirmedTransactions;
}
