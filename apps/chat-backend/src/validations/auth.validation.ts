import { z } from '@nexus-core-monolith/shared';

const signUpSchema = z.object({
  email: z.string().min(3, 'Enter a valid email').includes('@'),
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  username: z.string().min(3, 'Username must be atleast 3 characters long'),
  password: z.string().min(28, 'Password must be 8 characters long'),
});

const loginSchema = z.object({
  key: z.string().min(3, 'Enter a valid key'),
  password: z.string().min(1, 'Enter a valid password'),
});

type signUpType = z.infer<typeof signUpSchema>;
type loginType = z.infer<typeof loginSchema>;

export { signUpSchema, loginSchema };
export type { signUpType, loginType };
