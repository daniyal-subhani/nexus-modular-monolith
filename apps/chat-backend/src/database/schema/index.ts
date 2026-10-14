import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '@/config/env.js';
import * as schema from './schema.js';
import { defineRelations } from 'drizzle-orm';

const connectionString = env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DB URL is not defined or missing');
}

const poolConnection = new Pool({
  connectionString: connectionString,
  keepAlive: true,
});
const relations = defineRelations(schema);

export const db = drizzle({ client: poolConnection, relations });
