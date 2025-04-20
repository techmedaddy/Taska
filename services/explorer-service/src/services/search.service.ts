import BlockModel from "../models/block.model";
import TransactionModel from "../models/transaction.model";
import WalletModel from "../models/wallet.model";

export const searchExplorer = async (query: string) => {
  const block = await BlockModel.findOne({ hash: query });
  if (block) return { type: "block", data: block };

  const tx = await TransactionModel.findOne({ txId: query });
  if (tx) return { type: "transaction", data: tx };

  const wallet = await WalletModel.findOne({ walletId: query });
  if (wallet) return { type: "wallet", data: wallet };

  return { type: "not_found", data: null };
};
