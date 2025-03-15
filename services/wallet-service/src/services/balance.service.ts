import WalletModel from "../models/wallet.model";
import { sendMessage } from "../kafka/kafkaProducer";
import redisClient from "../config/redis.config";

export const updateBalance = async (walletId: string, amount: number) => {
  try {
    const wallet = await WalletModel.findWalletById(walletId);
    if (!wallet) throw new Error("Wallet not found");

    const newBalance = wallet.balance + amount;
    await WalletModel.updateWalletBalance(walletId, newBalance);

    // Update Redis cache
    await redisClient.set(`wallet:${walletId}`, JSON.stringify({ ...wallet, balance: newBalance }));

    // Send Kafka event
    await sendMessage("wallet-events", {
      action: "BALANCE_UPDATED",
      walletId,
      newBalance,
    });

    return { walletId, newBalance };
  } catch (error) {
    console.error("❌ Error updating balance:", error);
    throw new Error("Balance update failed");
  }
};

export const getBalance = async (walletId: string) => {
  try {
    const wallet = await WalletModel.findWalletById(walletId);
    if (!wallet) throw new Error("Wallet not found");
    return wallet.balance;
  } catch (error) {
    console.error("❌ Error fetching balance:", error);
    throw new Error("Balance retrieval failed");
  }
};
