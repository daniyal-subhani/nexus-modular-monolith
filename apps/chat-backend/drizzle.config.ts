import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { env } from './src/config/env';

const dbUrl = env.DATABASE_URL;

export default defineConfig({
  out: './drizzle',
  schema: './src/database/schema/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
});
