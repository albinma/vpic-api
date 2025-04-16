import { config } from '@/src/env';
import pinoLogger, { Options } from 'pino-http';
import { randomUUID } from 'crypto';

const loggerConfig: Options = {
  level: config.logging.level,
  genReqId: function (req, res) {
    const existingID = req.id ?? req.headers['x-request-id'];
    if (existingID) return existingID;
    const id = randomUUID();
    res.setHeader('X-Request-Id', id);
    return id;
  },
};

if (config.environment === 'development') {
  loggerConfig.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };
}

export const logger = pinoLogger(loggerConfig);
