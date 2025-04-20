// block.controller.ts
import { Request, Response } from 'express';
import { getBlockByHash, getBlockByHeight } from '../services/block.service';

export const fetchBlockByHash = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;
    const block = await getBlockByHash(hash);
    if (!block) return res.status(404).json({ message: 'Block not found' });
    res.json(block);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const fetchBlockByHeight = async (req: Request, res: Response) => {
  try {
    const height = parseInt(req.params.height);
    const block = await getBlockByHeight(height);
    if (!block) return res.status(404).json({ message: 'Block not found' });
    res.json(block);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
