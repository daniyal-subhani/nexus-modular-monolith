import express, { Application } from 'express';
import { corsMiddleware } from './middleware/cors.middleware.js';
import { createHttpServiceLogger } from '@nexus-core-monolith/shared';
import { gatewayLogger } from './config/logger.js';
import { requestIdMiddleware } from './middleware/request.id.middleware.js';
import helmet from 'helmet';

const app: Application = express();

app.use(helmet());
app.use(requestIdMiddleware);
app.use(createHttpServiceLogger(gatewayLogger));
app.use(corsMiddleware);
app.use(express());

export { app };
