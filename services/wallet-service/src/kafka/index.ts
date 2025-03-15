import { connectProducer } from "./kafkaProducer";
import initializeKafkaConsumers from "./kafkaConsumer";

export const startKafka = async () => {
  try {
    await connectProducer();
    console.log("✅ Kafka Producer Connected");

    await initializeKafkaConsumers();
    console.log("✅ Kafka Consumer Initialized");
  } catch (error) {
    console.error("❌ Error starting Kafka:", error);
  }
};

startKafka().catch(console.error);
