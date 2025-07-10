import 'dotenv/config';
import * as joi from 'joi';

interface EnvSchema {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
  API_VERSION: string;
  JWT_EXPIRATION_REFRESH: string;
  JWT_SECRET_REFRESH: string;
  JWT_SECRET_FORGOT_PASSWORD: string;
  JWT_EXPIRATION_FORGOT_PASSWORD: string;
}

export const envsSchema = joi
  .object<EnvSchema>({
    PORT: joi.number().default(3000),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRATION: joi.string().required(),
    API_VERSION: joi.number().default(1),
    JWT_EXPIRATION_REFRESH: joi.string().required(),
    JWT_SECRET_REFRESH: joi.string().required(),
    JWT_SECRET_FORGOT_PASSWORD: joi.string().required(),
    JWT_EXPIRATION_FORGOT_PASSWORD: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env) as {
  error: joi.ValidationError | null;
  value: EnvSchema;
};

if (error) {
  throw new Error(`Invalid environment variables: ${error.message}`);
}

export const envs = {
  database: {
    url: value.DATABASE_URL,
  },
  jwt: {
    secret: value.JWT_SECRET,
    expiration: value.JWT_EXPIRATION,
    expirationRefresh: value.JWT_EXPIRATION_REFRESH,
    secretRefresh: value.JWT_SECRET_REFRESH,
    secretForgotPassword: value.JWT_SECRET_FORGOT_PASSWORD,
    expirationForgotPassword: value.JWT_EXPIRATION_FORGOT_PASSWORD,
  },
  api: {
    port: value.PORT,
    version: value.API_VERSION,
  },
};
