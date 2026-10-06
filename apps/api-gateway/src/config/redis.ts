import { Redis } from 'ioredis';
import { gatewayLogger } from './logger.js';
import { env } from './env.js';

export const redisUrl = env.REDIS_URL;

export const redisClient = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
});

redisClient.on('error', (error) => {
  gatewayLogger.error(error, 'Redis Client Error: [REDIS]');
});
redisClient.on('connect', () => {
  gatewayLogger.info('Redis Connected Successfully! [REDIS].');
});
