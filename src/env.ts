const env = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN as string,
  SECRET_API_KEY: process.env.SECRET_API_KEY as string,
};

// verify all values in env are defined if not throw an error
Object.entries(env).forEach(([key, value]) => {
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
});

export { env };
