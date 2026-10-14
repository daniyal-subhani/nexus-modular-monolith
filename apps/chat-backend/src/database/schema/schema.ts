import { boolean, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['USER', 'ADMIN']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  username: text('username').unique(),
  email: varchar({ length: 255 }).unique().notNull(),
  password: text('password'),
  imageUrl: text('image_url'),
  role: roleEnum().default('USER').notNull(),
  tokenHash: text('token_hash').unique(),
  verified: boolean('verified').default(false).notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
