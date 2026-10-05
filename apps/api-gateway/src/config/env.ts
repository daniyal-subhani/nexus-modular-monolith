import { createServiceEnv, z } from '@nexus-core-monolith/shared';

export const env = createServiceEnv({
  server: {
    NODE_ENV: z.enum(['production', 'development', 'test']).default('development'),
  },
});
