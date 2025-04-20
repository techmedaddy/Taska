import TransactionModel from "../models/transaction.model";

export const getTransactionById = async (txId: string) => {
  return await TransactionModel.findOne({ txId });
};

export const getTransactionsByWallet = async (walletId: string) => {
  return await TransactionModel.find({
    $or: [{ sender: walletId }, { receiver: walletId }],
  }).sort({ timestamp: -1 });
};

export const saveTransaction = async (txData: any) => {
  const tx = new TransactionModel(txData);
  return await tx.save();
};