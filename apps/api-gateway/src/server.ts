import { createServer } from 'node:http';
import { app } from './app.js';
import { gatewayLogger } from './config/logger.js';
import { env } from './config/env.js';

const server = createServer(app);
const port = env.PORT || 4000;

server.listen(port, () => {
  gatewayLogger.info(`API Gateway listening on PORT: ${port}`);
});
