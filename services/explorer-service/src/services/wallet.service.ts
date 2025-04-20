import WalletModel from "../models/wallet.model";
import { getTransactionsByWallet } from "./transaction.service";

export const getWalletById = async (walletId: string) => {
  return await WalletModel.findOne({ walletId });
};

export const getWalletHistory = async (walletId: string) => {
  return await getTransactionsByWallet(walletId);
};

export const computeWalletBalance = async (walletId: string) => {
  const transactions = await getTransactionsByWallet(walletId);
  let balance = 0;
  for (const tx of transactions) {
    if (tx.receiver === walletId) balance += tx.amount;
    else if (tx.sender === walletId) balance -= tx.amount;
  }
  return balance;
};