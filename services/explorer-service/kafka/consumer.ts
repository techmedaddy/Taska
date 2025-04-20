// kafka/consumer.ts
import { Kafka } from "kafkajs";
import { KAFKA_TOPICS } from "./topics";
import { handleNewBlock, handleNewTransaction } from "../services/blockchain.handler";

const kafka = new Kafka({
  clientId: "explorer-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "explorer-group" });

export const startKafkaConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({ topic: KAFKA_TOPICS.NEW_BLOCK, fromBeginning: false });
  await consumer.subscribe({ topic: KAFKA_TOPICS.NEW_TRANSACTION, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const parsedData = JSON.parse(message.value?.toString() || "{}");

      if (topic === KAFKA_TOPICS.NEW_BLOCK) {
        await handleNewBlock(parsedData);
      } else if (topic === KAFKA_TOPICS.NEW_TRANSACTION) {
        await handleNewTransaction(parsedData);
      }
    },
  });
};