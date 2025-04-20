// wallet.controller.ts
import { Request, Response } from 'express';
import { getWalletById, getWalletTransactionHistory } from '../services/wallet.service';

export const fetchWalletDetails = async (req: Request, res: Response) => {
  try {
    const { walletId } = req.params;
    const wallet = await getWalletById(walletId);
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const fetchWalletHistory = async (req: Request, res: Response) => {
  try {
    const { walletId } = req.params;
    const history = await getWalletTransactionHistory(walletId);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
