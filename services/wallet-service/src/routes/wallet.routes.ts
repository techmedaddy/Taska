import express from "express";
import WalletController from "../controllers/wallet.controller"; // ✅ Ensure correct import

const router = express.Router();

// Route to create a wallet
router.post("/", WalletController.createWalletHandler);

// Route to get a wallet by ID
router.get("/:walletId", WalletController.getWalletHandler);

export default router;
