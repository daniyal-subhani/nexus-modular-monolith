import { createServiceEnv, z } from '@nexus-core-monolith/shared';
import dotenv from 'dotenv';

dotenv.config();

export const env = createServiceEnv({
  NODE_ENV: z.enum(['production', 'development', 'test']).default('development'),
  CORS_ORIGIN: z.url(),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  PORT: z.coerce.number().min(1).default(4001),
  DATABASE_URL: z.url(),
});
