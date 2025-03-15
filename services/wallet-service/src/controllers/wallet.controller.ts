import { Request, Response } from "express";
import * as WalletService from "../services/wallet.service"; // ✅ Use named import

export const createWalletHandler = async (req: Request, res: Response) => {
  try {
    const { userId, publicKey } = req.body;

    if (!userId || !publicKey) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const wallet = await WalletService.createWallet(userId, publicKey);
    return res.status(201).json({ success: true, wallet });
  } catch (error: any) {
    console.error("❌ Error creating wallet:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getWalletHandler = async (req: Request, res: Response) => {
  try {
    const { walletId } = req.params;
    const wallet = await WalletService.getWallet(walletId);

    if (!wallet) {
      return res.status(404).json({ success: false, message: "Wallet not found" });
    }

    return res.status(200).json({ success: true, wallet });
  } catch (error: any) {
    console.error("❌ Error fetching wallet:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ **Ensure correct named exports** (Removed duplicate export)
export default {
  createWalletHandler,
  getWalletHandler,
};
