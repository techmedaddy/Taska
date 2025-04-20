import { Kafka } from "kafkajs";
import { KAFKA_TOPICS } from "./topics";

const kafka = new Kafka({
  clientId: "explorer-producer",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

const producer = kafka.producer();

export const connectKafkaProducer = async () => {
  await producer.connect();
};

export const publishToKafka = async (topic: string, payload: any) => {
  await producer.send({
    topic,
    messages: [
      {
        value: JSON.stringify(payload),
      },
    ],
  });
};