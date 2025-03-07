import { Request, Response } from "express";
import { stakeTokens, getStakingPool, calculateRewards } from "../services/stakingService.js";

/**
 * Stake tokens.
 */
export function stake(req: Request, res: Response): void {
    const { user, amount } = req.body;
    if (!user || amount <= 0) {
        res.status(400).json({ message: "Invalid staking request" });
        return;
    }

    const stake = stakeTokens(user, amount);
    res.status(201).json({ message: "Tokens staked successfully", stake });
}

/**
 * Get all staking records.
 */
export function getStakes(req: Request, res: Response): void {
    res.json({ stakingPool: getStakingPool() });
}

/**
 * Calculate and distribute rewards.
 */
export function distributeRewards(req: Request, res: Response): void {
    calculateRewards();
    res.json({ message: "Rewards calculated and updated" });
}
