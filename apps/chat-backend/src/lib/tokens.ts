import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { env } from '@/config/env.js';
import { createHash, randomBytes, randomUUID } from 'node:crypto';

type UserRole = 'USER' | 'ADMIN';

export interface AccessTokenPayload extends JWTPayload {
  sub: string;
  role: UserRole;
  jti: string;
}

interface AccessTokenUser {
  id: string;
  role: UserRole;
}

const issuer = env.JWT_ACCESS_ISSUER;
const audience = env.JWT_ACCESS_AUDIENCE;
const secret = env.JWT_ACCESS_SECRET;
const accessTokenTtl = env.JWT_ACCESS_TTL || '15m';

const algorithm = 'HS256' as const;

if (!issuer || !audience || !secret) {
  throw new Error('JWT access token configurtion is missing');
}

const key = Buffer.from(secret, 'base64url');
if (key.byteLength < 32) {
  throw new Error('JWT_ACCESS_SECRET must decode to at least 32 bytes');
}

export const createAccessToken = async (user: AccessTokenUser): Promise<string> => {
  if (!user.id.trim()) {
    throw new Error('User ID is required to create an access token');
  }
  if (user.role !== 'USER' && user.role !== 'ADMIN') {
    throw new Error('Invalid user role');
  }

  return new SignJWT({ role: user.role })
    .setProtectedHeader({
      alg: algorithm,
      typ: 'JWT',
    })
    .setSubject(user.id)
    .setJti(randomUUID())
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(accessTokenTtl)
    .sign(key);
};

export const verifyAccessToken = async (token: string): Promise<AccessTokenPayload> => {
  const { payload } = await jwtVerify<AccessTokenPayload>(token, key, {
    algorithms: [algorithm],
    issuer,
    audience,
    requiredClaims: ['sub', 'iat', 'exp', 'jti', 'role'],
    typ: 'JWT',
  });
  if (
    typeof payload.sub !== 'string' ||
    payload.sub.length === 0 ||
    typeof payload.jti !== 'string' ||
    (payload.role !== 'USER' && payload.role !== 'ADMIN')
  ) {
    throw new Error('Invalid access-token claims');
  }

  return payload;
};

const TOKEN_BYTES = 32;
export const generateRandomToken = (): string => {
  return randomBytes(TOKEN_BYTES).toString('base64url');
};

export const hashToken = (token: string): string => {
  return createHash('sha256').update(token).digest('hex');
};
