import { createServer } from 'node:http';
import app from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';

const server = createServer(app);

server.listen(env.PORT, () => {
  logger.info(env.PORT, 'Listening on');
});
