import { services } from '@/config/services.js';
import { createServiceProxy } from './proxy.config.js';

export const chatProxy = createServiceProxy({
  targetService: services.chat.target,
  timeout: 20_000,
  proxyTimeout: 10_000,
  pathRewrite: {
    '^/api/auth': services.chat.prefix,
  },
});
