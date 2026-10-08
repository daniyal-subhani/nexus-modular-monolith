import type { RequestHandler } from 'express';

export const asyncHandlerMiddleware = (handler: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};
