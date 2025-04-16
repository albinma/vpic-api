import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = Type.Object({
  NODE_ENV: Type.String({ enum: ['development', 'test', 'production'] }),
  PORT: Type.Number(),
  TZ: Type.String({ minLength: 1 }),
  LOG_LEVEL: Type.String({ enum: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] }),
  SQL_SERVER_HOST: Type.String(),
  SQL_SERVER_DATABASE: Type.String(),
  SQL_SERVER_PORT: Type.Number(),
  SQL_SERVER_USERNAME: Type.String(),
  SQL_SERVER_PASSWORD: Type.String(),
});

const env = Value.Parse(envSchema, process.env);

const config = {
  environment: env.NODE_ENV,
  server: {
    timezone: env.TZ,
    port: env.PORT,
  },
  logging: {
    level: env.LOG_LEVEL,
  },
  database: {
    host: env.SQL_SERVER_HOST,
    name: env.SQL_SERVER_DATABASE,
    port: env.SQL_SERVER_PORT,
    username: env.SQL_SERVER_USERNAME,
    password: env.SQL_SERVER_PASSWORD,
  },
};

export { config };
