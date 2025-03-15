import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

const kafka = new Kafka({
  clientId: "wallet-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "wallet-group" });

export const connectKafka = async () => {
  try {
    await producer.connect();
    await consumer.connect();
    console.log("Kafka connected successfully for Wallet Service.");
  } catch (error) {
    console.error("Kafka connection failed:", error);
  }
};
