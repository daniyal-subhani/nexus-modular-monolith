import { createServiceEnv, z } from '@nexus-core-monolith/shared';
import dotenv from 'dotenv';

dotenv.config();

export const env = createServiceEnv({
  NODE_ENV: z.enum(['production', 'development', 'test']).default('development'),
  CORS_ORIGIN: z.url(),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  PORT: z.coerce.number().min(1).default(4001),
  DATABASE_URL: z.url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_ACCESS_ISSUER: z.string(),
  JWT_ACCESS_AUDIENCE: z.string(),
  JWT_ACCESS_TTL: z.string(),
});
