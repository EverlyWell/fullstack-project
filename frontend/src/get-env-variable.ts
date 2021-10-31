const getEnvVariable = (envPath: string) => {
  if (!process.env[envPath]) {
    throw new Error(`Couldn't find the ${envPath} environment variable`);
  }
  return process.env[envPath];
};

export default getEnvVariable;
