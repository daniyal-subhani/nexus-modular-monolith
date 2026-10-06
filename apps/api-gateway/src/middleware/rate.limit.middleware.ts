import { redisClient } from '@/config/redis.js';
import { TooManyRequestError } from '@nexus-core-monolith/shared';
import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';

export const requestRateLimitter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
  store: new RedisStore({
    sendCommand: async (command: string, ...args: string[]) => {
      const res = await redisClient.call(command, ...args);
      return res as any;
    },
  }),
  handler: () => {
    throw new TooManyRequestError(
      'Too many requests from this IP, please try again after 15 minutes.',
    );
  },
});
