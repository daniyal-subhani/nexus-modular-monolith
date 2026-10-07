import { NotFoundError } from '@nexus-core-monolith/shared';
import { Request, RequestHandler } from 'express';

export const notFoundMiddleware: RequestHandler = (req: Request) => {
  throw new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`);
};
