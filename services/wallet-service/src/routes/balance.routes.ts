import express from "express";
import { updateBalance, getBalance } from "../controllers/balance.controller";

const router = express.Router();

// Route to update balance
router.post("/update", updateBalance);

// Route to get balance
router.get("/:walletId", getBalance);

export default router;
