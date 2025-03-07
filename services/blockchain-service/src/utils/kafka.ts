import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "blockchain-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"], // Reads from env or defaults to localhost
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "blockchain-group" });

/**
 * Connects and starts the Kafka producer
 */
export const connectProducer = async () => {
  await producer.connect();
  console.log("✅ Blockchain Service Producer connected to Kafka");
};

/**
 * Sends a message to the specified Kafka topic
 * @param topic - The Kafka topic to send the message to
 * @param message - The message payload
 */
export const sendMessage = async (topic: string, message: object) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
  console.log(`📩 Message sent to ${topic}:`, message);
};

/**
 * Connects and starts the Kafka consumer
 * @param topic - The Kafka topic to listen to
 * @param callback - Function to handle incoming messages
 */
export const consumeMessages = async (topic: string, callback: (message: any) => void) => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (message.value) {
        const parsedMessage = JSON.parse(message.value.toString());
        console.log(`📥 Received from ${topic}:`, parsedMessage);
        callback(parsedMessage);
      }
    },
  });
};

export default { connectProducer, sendMessage, consumeMessages };
