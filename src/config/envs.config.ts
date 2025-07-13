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
  MAIL_HOST: string;
  MAIL_USER: string;
  MAIL_PASSWORD: string;
  MAIL_PORT: number;
  MAIL_FROM: string;
  API_URL: string;
}

const envsSchema = joi
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
    MAIL_HOST: joi.string().required(),
    MAIL_USER: joi.string().required(),
    MAIL_PASSWORD: joi.string().required(),
    MAIL_PORT: joi.number().required(),
    MAIL_FROM: joi.string().required(),
    API_URL: joi.string().required(),
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
  mail: {
    host: value.MAIL_HOST,
    user: value.MAIL_USER,
    password: value.MAIL_PASSWORD,
    port: value.MAIL_PORT,
  },
  api: {
    port: value.PORT,
    version: value.API_VERSION,
    email: value.MAIL_FROM,
    url: value.API_URL,
  },
};
