import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const WalletModel = {
  /**
   * Create a new wallet with a userId and publicKey.
   * @param userId - The ID of the user creating the wallet.
   * @param publicKey - The public key associated with the wallet.
   * @returns The newly created wallet object.
   */
  async createWallet(userId: string, publicKey: string) {
    return await prisma.wallet.create({
      data: { userId, publicKey, balance: 0 },
    });
  },

  /**
   * Find a wallet by its ID.
   * @param walletId - The ID of the wallet to find.
   * @returns The wallet object if found, otherwise null.
   */
  async findWalletById(walletId: string) {
    return await prisma.wallet.findUnique({
      where: { id: walletId },
    });
  },

  /**
   * Update the wallet balance.
   * @param walletId - The ID of the wallet to update.
   * @param newBalance - The new balance amount.
   * @returns The updated wallet object.
   */
  async updateWalletBalance(walletId: string, newBalance: number) {
    return await prisma.wallet.update({
      where: { id: walletId },
      data: { balance: newBalance },
    });
  },
};

export default WalletModel;
