import express, { Application } from 'express';
import helmet from 'helmet';
import {
  corsMidd,
  globalErrorHandler,
  httpReqLogger,
  notFoundMiddleware,
  rateLimitMidd,
  reqIdMidd,
} from './middleware/index.middleware.js';

const app: Application = express();

app.use(reqIdMidd.requestIdMiddleware);
app.use(httpReqLogger);
app.use(corsMidd.corsMiddleware);
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(rateLimitMidd.requestRateLimitMiddleware);

app.use(notFoundMiddleware);
app.use(globalErrorHandler);

export { app };
