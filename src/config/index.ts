export * from '@nestjs/config';
export { default as loader } from './loader';
export { default as validationSchema } from './validation-schema';

export interface ConfigInterface {
  NODE_ENV: string;
  PORT: number;

  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_BASE_URI: string;
  DB_URI: string;
}
