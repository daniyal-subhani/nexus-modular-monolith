import { gatewayLogger } from '@/config/logger.js';
import { createHttpServiceLogger } from '@nexus-core-monolith/shared';
import { HttpLogger } from 'pino-http';

export const httpReqLogger: HttpLogger = createHttpServiceLogger(gatewayLogger);
