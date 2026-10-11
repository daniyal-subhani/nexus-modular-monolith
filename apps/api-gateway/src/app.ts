import express, { Application } from 'express';
import helmet from 'helmet';
import {
  compressionMiddleware,
  corsMidd,
  globalErrorHandler,
  httpReqLogger,
  notFoundMiddleware,
  rateLimitMidd,
  reqIdMidd,
} from './middleware/index.middleware.js';
import { gatewayRouter } from './routes/index.js';

const app: Application = express();

app.use(reqIdMidd.requestIdMiddleware);
app.use(httpReqLogger);
app.use(corsMidd.corsMiddleware);
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(rateLimitMidd.requestRateLimitMiddleware);
app.use(compressionMiddleware);

app.use(gatewayRouter);

app.use(notFoundMiddleware);
app.use(globalErrorHandler);

export { app };
