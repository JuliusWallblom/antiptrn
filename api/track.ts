import type { VercelRequest, VercelResponse } from "@vercel/node";
import Redis from "ioredis";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const redis = new Redis(process.env.REDIS_URL!);
  const count = await redis.incr("installs");
  await redis.quit();
  return res.json({ count });
}
