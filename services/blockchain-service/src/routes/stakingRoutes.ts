import { Router } from "express";
import { stake, getStakes, distributeRewards } from "../controllers/stakingController.js";

const router = Router();

/**
 * @route   POST /staking
 * @desc    Stake tokens
 */
router.post("/", stake);

/**
 * @route   GET /staking
 * @desc    Get all staking records
 */
router.get("/", getStakes);

/**
 * @route   POST /staking/rewards
 * @desc    Distribute staking rewards
 */
router.post("/rewards", distributeRewards);

export default router;
