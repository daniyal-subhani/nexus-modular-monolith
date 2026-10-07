import { env } from '@/config/env.js';
import { BadRequestError, ForbiddenError, UnauthorizedError } from '@nexus-core-monolith/shared';
import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { type JWTPayload, jwtVerify } from 'jose';

type UserRole = 'USER' | 'ADMIN';

interface AccessTokenPayload extends JWTPayload {
  sub: string;
  role: UserRole;
}

const secret = new TextEncoder().encode(env.JWT_SECRET as string);

const verifyAccessToken = async (token: string): Promise<AccessTokenPayload> => {
  const { payload } = await jwtVerify(token, secret, {
    algorithms: ['HS256'],
    issuer: 'nexus',
    audience: 'nexus-api',
  });
  if (!payload.sub) {
    throw new BadRequestError('Access Token subject is missing');
  }
  return payload as AccessTokenPayload;
};
const authMiddleware: RequestHandler = async (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authorization Token missing');
  }
  const token = authorization.slice('Bearer '.length).trim();
  if (!token) {
    throw new UnauthorizedError('Authorization Token missing');
  }

  try {
    const payload = await verifyAccessToken(token);
    req.user = {
      id: payload.sub,
      role: payload.role,
    };
    next();
  } catch {
    throw new UnauthorizedError('Invalid or expired token');
  }
};

const authorizationMiddleware: RequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    throw new UnauthorizedError('Authentication Required.');
  }
  if (req.user.role !== 'ADMIN') {
    throw new ForbiddenError('Admin access required');
  }
  next();
};

export { type UserRole, verifyAccessToken, authMiddleware, authorizationMiddleware };
