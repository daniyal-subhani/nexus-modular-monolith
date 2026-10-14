import { logger } from '@/config/logger.js';
import * as argon2 from 'argon2';

const createHash = async (payload: string) => {
  try {
    const hashed = await argon2.hash(payload);
    return hashed;
  } catch (error) {
    logger.error(error, 'Internal Server Error');
  }
};

const verifyHash = async (hash: string, incommingString: string) => {
  try {
    const verified = await argon2.verify(hash, incommingString);
    return verified;
  } catch (error) {
    logger.error(error, 'Internal Server Error');
  }
};

export { createHash, verifyHash };
