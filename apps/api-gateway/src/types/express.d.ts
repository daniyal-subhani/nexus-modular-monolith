import { UserRole } from '@/middleware/auth.middleware.ts';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role?: UserRole;
      };
    }
  }
}

export {};
