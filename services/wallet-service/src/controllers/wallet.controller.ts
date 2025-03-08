import { Request, Response } from "express";
import { WalletService } from "../services";

export const createWallet = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const wallet = await WalletService.createWallet(userId);
    return res.status(201).json({ success: true, wallet });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getWallet = async (req: Request, res: Response) => {
  try {
    const { walletId } = req.params;
    const wallet = await WalletService.getWallet(walletId);
    return res.status(200).json({ success: true, wallet });
  } catch (error: any) {
    return res.status(404).json({ success: false, message: error.message });
  }
};
