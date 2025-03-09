import { Wallet } from "../models/wallet.model";
import { Transaction } from "../models/transaction.model";
import { sendMessage } from "../kafka/kafkaProducer";
import redisClient from "../config/redis.config";

/**
 * Handles processing of transactions between wallets.
 * Ensures sufficient balance, updates wallets, and caches data.
 */
export const handleTransaction = async (senderId: string, receiverId: string, amount: number) => {
  try {
    console.log("🔄 Processing transaction:", { senderId, receiverId, amount });

    const senderWallet = await Wallet.findById(senderId);
    const receiverWallet = await Wallet.findById(receiverId);

    if (!senderWallet || !receiverWallet) {
      throw new Error("❌ Wallet not found");
    }
    if (senderWallet.balance < amount) {
      throw new Error("❌ Insufficient balance");
    }

    // Deduct from sender, add to receiver
    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    await senderWallet.save();
    await receiverWallet.save();

    // Create transaction record
    const transaction = await Transaction.create({
      senderId,
      receiverId,
      amount,
      status: "COMPLETED",
    });

    // Update Redis Cache
    await redisClient.set(`wallet:${senderId}`, JSON.stringify(senderWallet));
    await redisClient.set(`wallet:${receiverId}`, JSON.stringify(receiverWallet));

    // Emit Kafka event
    await sendMessage("wallet-transactions", {
      action: "TRANSACTION_COMPLETED",
      senderId,
      receiverId,
      amount,
    });

    console.log("✅ Transaction completed successfully:", transaction);
    return transaction;
  } catch (error) {
    console.error("❌ Error processing transaction:", error);
    throw new Error("Transaction failed");
  }
};
