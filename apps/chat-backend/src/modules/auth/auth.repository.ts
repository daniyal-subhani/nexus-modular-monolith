import { db } from '@/database/schema/index.js';
import { users } from '@/database/schema/schema.js';
export type User = typeof users.$inferSelect;
export type newUser = typeof users.$inferInsert;

export const authRepository = {
  findByEmail: async (email: string) => {
    return db.query.users.findFirst({
      where: {
        email: {
          eq: email,
        },
      },
    });
  },
  createUser: async (data: newUser) => {
    await db.insert(users).values({
      email: data.email,
      name: data.name,
      password: data.password,
      username: data.username,
    });
  },
};
