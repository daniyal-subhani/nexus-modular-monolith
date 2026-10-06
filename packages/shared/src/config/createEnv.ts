import { createEnv } from '@t3-oss/env-core';
import type { z } from 'zod';

type Shape = Record<string, z.ZodType>;
type ServiceEnv<T extends Shape> = Readonly<{
  [K in keyof T]: z.output<T[K]>;
}>;

export function createServiceEnv<T extends Shape>(server: T): ServiceEnv<T> {
  return createEnv({
    server,
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
  }) as unknown as ServiceEnv<T>;
}
