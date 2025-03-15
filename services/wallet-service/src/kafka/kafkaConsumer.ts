import { Kafka } from "kafkajs";
import dotenv from "dotenv";
import { handleTransactionDirectly } from "../controllers/transaction.controller"; // ✅ Correct Import

dotenv.config();

const kafka = new Kafka({
  clientId: "wallet-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "wallet-group" });

export const initializeKafkaConsumers = async () => {
  try {
    await consumer.connect();
    console.log("✅ Kafka Consumer Connected");

    await consumer.subscribe({ topic: "wallet-transactions", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        try {
          console.log(`📩 Received message from topic: ${topic}`);
          const data = message.value ? JSON.parse(message.value.toString()) : null;

          if (!data) {
            console.warn("⚠️ Received empty message, skipping...");
            return;
          }

          if (topic === "wallet-transactions") {
            console.log("🔄 Processing transaction from Kafka...");
            await handleTransactionDirectly(data);
            console.log("✅ Transaction processed successfully!");
          }
        } catch (error) {
          console.error("❌ Error processing Kafka message:", error);
        }
      },
    });
  } catch (error) {
    console.error("❌ Error initializing Kafka Consumers:", error);
  }
};

export default initializeKafkaConsumers;
