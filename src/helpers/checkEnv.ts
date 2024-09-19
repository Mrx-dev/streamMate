export const checkEnv = (): void => {
  const requiredEnvVars = ['TOKEN', 'TEST_GUILD_ID'];
  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  }

  if (process.env.NODE_ENV === 'development' && !process.env.GUILD_ID) {
    console.warn('Warning: GUILD_ID is required for development mode.');
  }
};
