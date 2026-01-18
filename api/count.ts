import type { VercelRequest, VercelResponse } from "@vercel/node";
import Redis from "ioredis";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const redis = new Redis(process.env.REDIS_URL!);
  const count = (await redis.get("installs")) ?? 0;
  await redis.quit();
  return res.json({ count: Number(count) });
}
