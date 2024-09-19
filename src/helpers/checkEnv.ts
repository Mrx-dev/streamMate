import { logger } from './logger';

export const checkEnv = (): void => {
  const requiredEnvVars = ['TOKEN', 'TEST_GUILD_ID'];
  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    logger.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(-1);
  }

  if (process.env.NODE_ENV === 'development' && !process.env.TEST_GUILD_ID) {
    logger.warn('Warning: TEST_GUILD_ID is required for development mode.');
  }
};
