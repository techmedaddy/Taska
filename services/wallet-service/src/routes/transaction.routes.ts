import express from "express";
import { handleTransaction } from "../controllers/transaction.controller";

const router = express.Router();

// Route to process transactions
router.post("/", async (req, res, next) => {
  try {
    await handleTransaction(req, res); // Await function call properly
  } catch (error) {
    next(error); // Pass errors to Express error handler
  }
});

export default router;
