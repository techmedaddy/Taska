import WalletModel from "../models/wallet.model";
import { PrismaClient, Prisma } from "@prisma/client";
import { sendMessage } from "../kafka/kafkaProducer";
import redisClient from "../config/redis.config";

const prisma = new PrismaClient();

export const processTransaction = async (senderId: string, receiverId: string, amount: number) => {
  try {
    const senderWallet = await WalletModel.findWalletById(senderId);
    const receiverWallet = await WalletModel.findWalletById(receiverId);

    if (!senderWallet || !receiverWallet) throw new Error("Wallet not found");
    if (senderWallet.balance < amount) throw new Error("Insufficient balance");

    // ✅ Use Prisma TransactionClient properly
    const transaction = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const updatedSender = await tx.wallet.update({
        where: { id: senderId },
        data: { balance: senderWallet.balance - amount },
      });

      const updatedReceiver = await tx.wallet.update({
        where: { id: receiverId },
        data: { balance: receiverWallet.balance + amount },
      });

      const newTransaction = await tx.transaction.create({
        data: {
          senderId,
          receiverId,
          amount,
          status: "COMPLETED",
        },
      });

      // ✅ Update Redis cache asynchronously
      await Promise.all([
        redisClient.set(`wallet:${senderId}`, JSON.stringify(updatedSender)),
        redisClient.set(`wallet:${receiverId}`, JSON.stringify(updatedReceiver))
      ]);

      return newTransaction;
    });

    // ✅ Send Kafka event asynchronously
    await sendMessage("wallet-transactions", {
      action: "TRANSACTION_COMPLETED",
      senderId,
      receiverId,
      amount,
    });

    return transaction;
  } catch (error: any) {
    console.error("❌ Error processing transaction:", error);
    throw new Error(error.message || "Transaction failed");
  }
};

export default { processTransaction };
