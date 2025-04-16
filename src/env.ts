import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = Type.Object({
  NODE_ENV: Type.String({ enum: ['development', 'test', 'production'] }),
  PORT: Type.Number(),
  TZ: Type.String({ minLength: 1 }),
});

const env = Value.Parse(envSchema, process.env);

const config = {
  environment: env.NODE_ENV,
  server: {
    timezone: env.TZ,
    port: env.PORT,
  },
};

export { config };
