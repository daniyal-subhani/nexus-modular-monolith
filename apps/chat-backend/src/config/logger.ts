import { createServiceLogger } from '@nexus-core-monolith/shared';
import { Logger } from 'pino';
import { env } from './env.js';

export const logger: Logger = createServiceLogger({
  serviceName: 'chat-backend',
  environment: env.NODE_ENV,
  level: env.LOG_LEVEL,
});
