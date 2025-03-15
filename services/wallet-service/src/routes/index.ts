import express from "express";
import walletRoutes from "./wallet.routes";
import balanceRoutes from "./balance.routes";
import transactionRoutes from "./transaction.routes";

const router = express.Router();

// Mount the routes
router.use("/wallets", walletRoutes); // Wallet-related routes
router.use("/balances", balanceRoutes); // Balance-related routes
router.use("/transactions", transactionRoutes); // Transaction-related routes

export default router;
