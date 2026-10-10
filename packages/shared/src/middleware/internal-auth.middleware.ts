import { UnauthorizedError } from '@/errors/AppError.js';
import { RequestHandler } from 'express';
import { timingSafeEqual } from 'node:crypto';

interface internalAuthProps {
  headerName?: string;
  expectedSecret: string;
  ignorePaths?: string[];
}

const DEFAULT_HEADER_NAME = 'x-internal-secret';

export const internalAuthMiddleware = (props: internalAuthProps): RequestHandler => {
  if (!props.expectedSecret) {
    throw new Error('Internal Service Secret is required.');
  }
  const headerName = (props.headerName ?? DEFAULT_HEADER_NAME).toLowerCase();
  const ignoredPaths = new Set(props.ignorePaths ?? []);
  const expected = Buffer.from(props.expectedSecret, 'utf-8');
  return (req, res, next) => {
    if (ignoredPaths.has(req.path)) {
      next();
      return;
    }
    const providedSecret = req.get(headerName);
    if (!providedSecret) {
      next(new UnauthorizedError('Missing Secret'));

      return;
    }
    const provided = Buffer.from(providedSecret, 'utf-8');
    const isValid = expected.length === provided.length && timingSafeEqual(expected, provided);

    if (!isValid) {
      next(new UnauthorizedError('Invalid secret token'));
      return;
    }
    next();
  };
};
