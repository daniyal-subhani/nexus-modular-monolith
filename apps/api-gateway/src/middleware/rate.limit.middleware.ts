import { redisClient } from '@/config/redis.js';
import { TooManyRequestError } from '@nexus-core-monolith/shared';
import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';

const requestRateLimitMiddleware = rateLimit({
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

const authRateLimitMiddleware = () =>
  rateLimit({
    windowMs: 60 * 1000,
    limit: 10,
    ipv6Subnet: 56,
    legacyHeaders: false,
    standardHeaders: 'draft-8',
    store: new RedisStore({
      sendCommand: async (command: string, ...args: string[]) => {
        const res = await redisClient.call(command, ...args);
        return res as any;
      },
    }),
    handler: () => {
      throw new TooManyRequestError('Too many authentication attempts. Please try again later.');
    },
  });

export { requestRateLimitMiddleware, authRateLimitMiddleware };
