import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { logger } from "./utils/logger";
import { ErrorHandler } from "./utils/errorHandler";
import redisClient from "./utils/redisClient";
import walletRoutes from "./routes/wallet.routes";
import transactionRoutes from "./routes/transaction.routes";
import balanceRoutes from "./routes/balance.routes";
import { initializeKafkaConsumers } from "./kafka/kafkaConsumer";
import "./config/db.config"; // Ensure database connection
import "./config/kafka.config"; // Ensure Kafka is set up
import "./config/redis.config"; // Ensure Redis is set up

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(express.json());

// Connect Redis
redisClient.connect().catch((err) => console.error("Redis Connection Error:", err));

// Register Routes
app.use("/wallet", walletRoutes);
app.use("/transactions", transactionRoutes);
app.use("/balance", balanceRoutes);

// Initialize Kafka Consumers
initializeKafkaConsumers();

// Error Handling Middleware
app.use(ErrorHandler.handleError);

// Start Server
app.listen(PORT, () => {
  logger.info(`Wallet Service running on port ${PORT}`);
  console.log(`✅ Wallet Service started on port ${PORT}`);
});
