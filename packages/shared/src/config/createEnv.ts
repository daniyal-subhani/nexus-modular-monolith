import { createEnv } from '@t3-oss/env-core';
import type { z } from 'zod';

export function createServiceEnv<T extends Record<string, z.ZodType>>(config: { server: T }) {
  return createEnv({
    server: config.server,
    runtimeEnv: process.env,
  });
}
