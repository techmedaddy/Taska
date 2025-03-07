import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./database.js";
import blockRoutes from "./routes/blockRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import stakingRoutes from "./routes/stakingRoutes.js";
import { connectProducer, sendMessage, consumeMessages } from "./utils/kafka.js"; // Updated import

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use("/blocks", blockRoutes);
app.use("/transactions", transactionRoutes);
app.use("/staking", stakingRoutes);

// Connect Kafka Producer
connectProducer()
  .then(() => console.log("Kafka Producer Ready"))
  .catch((err) => console.error("Kafka Producer Connection Error:", err));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
