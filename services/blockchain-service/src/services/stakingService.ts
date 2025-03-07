import { Staking } from "../models/Staking.js";

let stakingPool: Staking[] = []; // Stores staked funds
const rewardRate = 0.05; // 5% reward per cycle

export function stakeTokens(user: string, amount: number): Staking {
    const stake: Staking = {
        id: stakingPool.length,
        staker: user,
        amountStaked: amount,
        reward: 0,
        rewardRate, // ✅ Fixed: Added rewardRate
        stakedAt: new Date(),
        lastUpdated: new Date(),
        isWithdrawn: false
    };
    stakingPool.push(stake);
    return stake;
}

export function calculateRewards(): void {
    stakingPool = stakingPool.map(stake => ({
        ...stake,
        reward: stake.reward + stake.amountStaked * stake.rewardRate, // ✅ Fixed: Used correct property name
    }));
}

export function getStakingPool(): Staking[] {
    return stakingPool;
}
