import { pinoHttp } from 'pino-http';
import type { Logger } from 'pino';

export const createHttpServiceLogger = (logger: Logger) => {
  return pinoHttp({
    logger,
  });
};
