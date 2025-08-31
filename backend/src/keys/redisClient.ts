import { createClient, type RedisClientType } from "redis";

export const createRedis = async (
  url: string,
): Promise<RedisClientType<any, any, any>> => {
  const client = createClient({ url });
  await client.connect();
  return client as RedisClientType<any, any, any>;
};
