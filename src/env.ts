const env = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN as string,
  SECRET_API_KEY: process.env.SECRET_API_KEY as string,
  HOST_NAME: process.env.HOST_NAME as string,
  MAIL_FROM: process.env.MAIL_FROM as string,
  MAIL_NAME: process.env.MAIL_NAME as string,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID as string,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,
};

// verify all values in env are defined if not throw an error
Object.entries(env).forEach(([key, value]) => {
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
});

export { env };
