import 'dotenv/config';
import * as joi from 'joi';

interface EnvSchema {
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;

  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_REFRESH_EXPIRES_IN: string;
  JWT_FORGOT_PASSWORD_SECRET: string;
  JWT_FORGOT_PASSWORD_EXPIRES_IN: string;

  MAIL_HOST: string;
  MAIL_PORT: number;
  MAIL_USER: string;
  MAIL_PASS: string;
  MAIL_FROM: string;

  APP_URL: string;
  NODE_ENV: string;
  PORT: number;
  API_VERSION: string;
  APP_NAME: string;

  THROTTLE_TTL: number;
  THROTTLE_LIMIT: number;

  SWAGGER_TITLE: string;
  SWAGGER_DESCRIPTION: string;
  SWAGGER_VERSION: string;
  SWAGGER_TAG: string;

  FRONTEND_URL: string;
  FRONTEND_CONFIRM_MAIL_PATH: string;
  FRONTEND_RESET_PASSWORD_PATH: string;
}

const envsSchema = joi
  .object<EnvSchema>({
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DATABASE: joi.string().required(),

    JWT_SECRET: joi.string().required(),
    JWT_REFRESH_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
    JWT_REFRESH_EXPIRES_IN: joi.string().required(),
    JWT_FORGOT_PASSWORD_SECRET: joi.string().required(),
    JWT_FORGOT_PASSWORD_EXPIRES_IN: joi.string().required(),

    MAIL_HOST: joi.string().required(),
    MAIL_PORT: joi.number().required(),
    MAIL_USER: joi.string().required(),
    MAIL_PASS: joi.string().required(),
    MAIL_FROM: joi.string().required(),

    APP_URL: joi.string().required(),
    NODE_ENV: joi.string().required(),
    PORT: joi.number().required(),
    API_VERSION: joi.string().required(),
    APP_NAME: joi.string().required(),

    THROTTLE_TTL: joi.number().required(),
    THROTTLE_LIMIT: joi.number().required(),

    SWAGGER_TITLE: joi.string().required(),
    SWAGGER_DESCRIPTION: joi.string().required(),
    SWAGGER_VERSION: joi.string().required(),
    SWAGGER_TAG: joi.string().required(),

    FRONTEND_URL: joi.string().required(),
    FRONTEND_CONFIRM_MAIL_PATH: joi.string().required(),
    FRONTEND_RESET_PASSWORD_PATH: joi.string().required(),
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
    host: value.DB_HOST,
    port: value.DB_PORT,
    username: value.DB_USERNAME,
    password: value.DB_PASSWORD,
    database: value.DB_DATABASE,
  },
  jwt: {
    access: {
      secret: value.JWT_SECRET,
      expiration: value.JWT_EXPIRES_IN,
    },
    refresh: {
      secret: value.JWT_REFRESH_SECRET,
      expiration: value.JWT_REFRESH_EXPIRES_IN,
    },
    forgotPassword: {
      secret: value.JWT_FORGOT_PASSWORD_SECRET,
      expiration: value.JWT_FORGOT_PASSWORD_EXPIRES_IN,
    },
  },
  mail: {
    host: value.MAIL_HOST,
    user: value.MAIL_USER,
    password: value.MAIL_PASS,
    port: value.MAIL_PORT,
  },
  api: {
    port: value.PORT,
    email: value.MAIL_FROM,
    url: value.APP_URL,
    version: value.API_VERSION,
    env: value.NODE_ENV,
    name: value.APP_NAME,
  },
  swagger: {
    title: value.SWAGGER_TITLE,
    description: value.SWAGGER_DESCRIPTION,
    version: value.SWAGGER_VERSION,
    tag: value.SWAGGER_TAG,
  },
  throttle: {
    ttl: value.THROTTLE_TTL,
    limit: value.THROTTLE_LIMIT,
  },
  frontend: {
    url: value.FRONTEND_URL,
    confirmMailPath: value.FRONTEND_CONFIRM_MAIL_PATH,
    resetPasswordPath: value.FRONTEND_RESET_PASSWORD_PATH,
  },
};
