import { signUpType } from '@/validations/auth.validation.js';
import { authRepository } from './auth.repository.js';
import { ConflictError, InternalServerError } from '@nexus-core-monolith/shared';

export const authService = {
  signUp: async (data: signUpType) => {
    const existingUser = await authRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError('User already exists with this email');
    }
    const newUser = await authRepository.createUser(data);
    if (!newUser) {
      throw new InternalServerError();
    }
  },
};
