import express from 'express';
import { corsMiddleware } from './middleware/cors.middleware.js';

const app = express();

app.use(corsMiddleware);
