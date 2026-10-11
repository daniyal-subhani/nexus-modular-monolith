import { env } from './env.js';

export const services = {
  chat: {
    target: env.CHAT_SERVICE_URL,
    prefix: '/api/v1/auth',
  },
} as const;
