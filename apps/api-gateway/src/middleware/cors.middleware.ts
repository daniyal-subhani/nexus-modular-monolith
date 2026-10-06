import { env } from '@/config/env.js';
import cors from 'cors';

export const corsMiddleware = cors({
  origin: env.CORS_ORIGIN as string,
  credentials: true,
});
