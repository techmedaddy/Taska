import WalletModel from "../models/wallet.model";
import { sendMessage } from "../kafka/kafkaProducer";
import redisClient from "../config/redis.config";

/**
 * Create a new wallet for a user.
 * @param userId - The ID of the user for whom the wallet is being created.
 * @param publicKey - The public key associated with the wallet.
 * @returns The newly created wallet object.
 */
export const createWallet = async (userId: string, publicKey: string) => {
  try {
    console.log(`🚀 Creating wallet for user: ${userId}`);

    // Ensure both userId and publicKey are passed
    const wallet = await WalletModel.createWallet(userId, publicKey);

    // Emit wallet creation event to Kafka
    await sendMessage("wallet-events", {
      action: "WALLET_CREATED",
      userId,
      walletId: wallet.id,
    });

    console.log(`✅ Wallet created successfully for user ${userId}: ${wallet.id}`);
    return wallet;
  } catch (error) {
    console.error("❌ Error creating wallet:", error);
    throw new Error("Wallet creation failed");
  }
};

/**
 * Retrieve a wallet by ID, checking Redis cache first.
 * @param walletId - The ID of the wallet to retrieve.
 * @returns The wallet object.
 */
export const getWallet = async (walletId: string) => {
  try {
    console.log(`🔍 Fetching wallet with ID: ${walletId}`);

    // Check Redis Cache first
    const cachedWallet = await redisClient.get(`wallet:${walletId}`);
    if (cachedWallet) {
      console.log(`✅ Cache hit for wallet ID: ${walletId}`);
      return JSON.parse(cachedWallet);
    }

    console.log(`⚠️ Cache miss, querying database for wallet ID: ${walletId}`);
    const wallet = await WalletModel.findWalletById(walletId);
    if (!wallet) throw new Error("Wallet not found");

    // Store wallet in Redis cache for future requests (TTL: 1 hour)
    await redisClient.set(`wallet:${walletId}`, JSON.stringify(wallet), { EX: 3600 });

    return wallet;
  } catch (error) {
    console.error("❌ Error fetching wallet:", error);
    throw new Error("Wallet retrieval failed");
  }
};

/**
 * Update wallet balance and send event notification.
 * @param walletId - The ID of the wallet.
 * @param amount - The amount to update the balance by (can be positive or negative).
 * @returns Updated wallet object.
 */
export const updateWalletBalance = async (walletId: string, amount: number) => {
  try {
    console.log(`💰 Updating wallet balance for ID: ${walletId} by ${amount}`);

    const wallet = await WalletModel.findWalletById(walletId);
    if (!wallet) throw new Error("Wallet not found");

    wallet.balance += amount;
    await WalletModel.updateWalletBalance(walletId, wallet.balance);

    // Update Redis cache
    await redisClient.set(`wallet:${walletId}`, JSON.stringify(wallet), { EX: 3600 });

    // Emit balance update event to Kafka
    await sendMessage("wallet-events", {
      action: "BALANCE_UPDATED",
      walletId,
      newBalance: wallet.balance,
    });

    console.log(`✅ Wallet balance updated: ${wallet.balance}`);
    return wallet;
  } catch (error) {
    console.error("❌ Error updating wallet balance:", error);
    throw new Error("Balance update failed");
  }
};

/**
 * Handle wallet transactions received from Kafka.
 * @param transactionData - The transaction details.
 */
export const handleTransaction = async (transactionData: any) => {
  try {
    console.log("📩 Handling wallet transaction:", transactionData);

    const { walletId, amount, type } = transactionData;
    const wallet = await WalletModel.findWalletById(walletId);
    if (!wallet) throw new Error("Wallet not found");

    if (type === "DEBIT" && wallet.balance < amount) {
      throw new Error("Insufficient funds");
    }

    wallet.balance += type === "CREDIT" ? amount : -amount;
    await WalletModel.updateWalletBalance(walletId, wallet.balance);

    // Update Redis cache
    await redisClient.set(`wallet:${walletId}`, JSON.stringify(wallet), { EX: 3600 });

    // Emit transaction event to Kafka
    await sendMessage("wallet-events", {
      action: "TRANSACTION_PROCESSED",
      walletId,
      amount,
      type,
      newBalance: wallet.balance,
    });

    console.log(`✅ Transaction ${type} of ${amount} processed for wallet ${walletId}`);
  } catch (error) {
    console.error("❌ Error processing transaction:", error);
    throw new Error("Transaction processing failed");
  }
};
