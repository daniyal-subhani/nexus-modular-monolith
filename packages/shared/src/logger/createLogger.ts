import pino from 'pino';
import { Logger, LoggerOptions, Level } from 'pino';

export interface LoggerConfig {
  serviceName: string;
  level?: Level;
  environment: 'production' | 'development' | 'test';
}

const REDACT_PATHS = [
  'req.headers.authorization',
  'req.headers.cookie',
  'req.body.password',
  'req.body.refreshToken',
  'req.body.accessToken',
  'req.body.apiKey',
];

export const createServiceLogger = (config: LoggerConfig): Logger => {
  const options: LoggerOptions = {
    name: config.serviceName,
    level: config.level || 'info',
    base: {
      service: config.serviceName,
      env: config.environment,
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: REDACT_PATHS,
  };
  if (config.environment === 'development') {
    options.transport = {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
        ignore: 'pid, hostname',
        singleLine: false,
      },
    };
  }
  return pino(options);
};
