// transaction.controller.ts
import { Request, Response } from 'express';
import { getTransactionByHash } from '../services/transaction.service';

export const fetchTransactionByHash = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;
    const transaction = await getTransactionByHash(hash);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};