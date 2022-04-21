import { ConfigInterface } from '.';

export default (): ConfigInterface => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT, 10),

  DB_BASE_URI: process.env.DB_BASE_URI,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_URI: process.env.DB_URI,
  DB_USER: process.env.DB_USER,
});
