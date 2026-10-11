import { gatewayLogger } from '@/config/logger.js';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Socket } from 'node:net';

export const handleProxyError = (
  err: Error,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> | Socket,
  target?: string | Partial<URL>,
): void => {
  const errorCode = (err as NodeJS.ErrnoException).code;
  const isTimeout = errorCode === 'ETIMEDOUT' || errorCode === 'ESOCKETTIMEDOUT';
  const statusCode = isTimeout ? 504 : 502;

  gatewayLogger.error(
    {
      err: err,
      errorCode,
      method: req.method,
      path: req.url,
      target,
      reqId: req.headers['x-request-id'],
      statusCode,
    },
    'Downstream service request failed',
  );
  if ('writeHead' in res) {
    if (res.headersSent || res.destroyed) {
      res.destroy();
      return;
    }
    res.writeHead(statusCode, {
      'Content-Type': 'application/json',
    });
    res.end(
      JSON.stringify({
        success: false,
        err: {
          code: isTimeout ? 'GATEWAY_TIMEOUT' : 'BAD_GATEWAY',
          message: isTimeout ? 'Downstream service timed out' : 'Downstream service unavailable',
        },
      }),
    );
    return;
  }
  res.destroy(err);
};
