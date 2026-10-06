import { createServiceLogger } from '@nexus-core-monolith/shared';
import type { Level, Logger } from 'pino';
import { env } from './env.js';

export const gatewayLogger: Logger = createServiceLogger({
  serviceName: 'api-gateway',
  environment: env.NODE_ENV as 'production' | 'development' | 'test',
  level: env.LOG_LEVEL as Level,
});
