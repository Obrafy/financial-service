import * as Joi from 'joi';
import { ConfigInterface } from '.';

export default Joi.object<ConfigInterface>({
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
  PORT: Joi.number().default(3000),

  DB_BASE_URI: Joi.string(),
  DB_NAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_URI: Joi.string().uri(),
  DB_USER: Joi.string(),
});
