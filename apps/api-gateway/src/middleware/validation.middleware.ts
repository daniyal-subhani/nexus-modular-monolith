import { UnprocessableEntityError } from '@nexus-core-monolith/shared';
import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';

export const validationSchemaMiddleware = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new UnprocessableEntityError('Invalid data or structure', result.error.message);
    }
    next();
  };
};
