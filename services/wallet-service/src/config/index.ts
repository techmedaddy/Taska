import { connectKafka } from "./kafka.config";
import { connectRedis } from "./redis.config";

export const initConfigs = async () => {
  await connectRedis();
  await connectKafka();
};
