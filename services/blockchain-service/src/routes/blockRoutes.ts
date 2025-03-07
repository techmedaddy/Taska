import { Router } from "express";
import { mineBlock, getBlocks, validateBlockchain } from "../controllers/blockController.js";

const router = Router();

/**
 * @route   GET /blocks
 * @desc    Get the entire blockchain
 */
router.get("/", getBlocks);

/**
 * @route   POST /blocks/mine
 * @desc    Mine a new block
 */
router.post("/mine", mineBlock);

/**
 * @route   GET /blocks/validate
 * @desc    Validate blockchain integrity
 */
router.get("/validate", validateBlockchain);

export default router;
