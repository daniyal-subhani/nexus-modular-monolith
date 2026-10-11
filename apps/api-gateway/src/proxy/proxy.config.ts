import { createProxyMiddleware, type Options } from 'http-proxy-middleware';
import { handleProxyError } from './proxy-error.js';

interface ProxyServiceProps {
  targetService: string;
  timeout?: number;
  proxyTimeout?: number;
  pathRewrite?: Options['pathRewrite'];
  options?: Options;
}

const DEFAULT_PROXY_TIMEOUT = 10_000;
const DEFAULT_REQUEST_TIMEOUT = 20_000;

export const createServiceProxy = ({
  targetService,
  timeout = DEFAULT_REQUEST_TIMEOUT,
  proxyTimeout = DEFAULT_PROXY_TIMEOUT,
  pathRewrite,
  options = {},
}: ProxyServiceProps) => {
  const resolvedPathRewrite = pathRewrite ?? options.pathRewrite;
  return createProxyMiddleware({
    ...options,
    target: targetService,
    changeOrigin: options.changeOrigin ?? true,
    xfwd: options.xfwd ?? true,
    ...(resolvedPathRewrite !== undefined ? { pathRewrite: resolvedPathRewrite } : {}),
    timeout,
    proxyTimeout,
    on: {
      ...options.on,
      error: handleProxyError,
      proxyReq: (proxyReq) => {
        proxyReq.removeHeader('x-user-id');
        proxyReq.removeHeader('x-user-role');
      },
    },
  });
};
