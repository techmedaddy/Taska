import { Request, Response } from "express";
import { BalanceService } from "../services";

export const updateBalance = async (req: Request, res: Response) => {
  try {
    const { walletId, amount } = req.body;
    const updatedWallet = await BalanceService.updateBalance(walletId, amount);
    res.status(200).json({ success: true, updatedWallet }); // ✅ Removed return statement
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message }); // ✅ Removed return statement
  }
};

export const getBalance = async (req: Request, res: Response) => {
  try {
    const { walletId } = req.params;
    const balance = await BalanceService.getBalance(walletId);
    res.status(200).json({ success: true, balance }); // ✅ Removed return statement
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message }); // ✅ Removed return statement
  }
};
