import { Router } from "express";
import { addTransaction, getTransactions } from "../controllers/transactionController.js";

const router = Router();

/**
 * @route   POST /transactions
 * @desc    Create a new transaction
 */
router.post("/", addTransaction);

/**
 * @route   GET /transactions
 * @desc    Get all unconfirmed transactions (mempool)
 */
router.get("/", getTransactions);

export default router;
