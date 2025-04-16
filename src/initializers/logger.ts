import { config } from '@/src/env';
import pino, { Logger, LoggerOptions } from 'pino';

const createLogger = (options: LoggerOptions): Logger => {
  if (!options.level) {
    options.level = 'info';
  }

  return pino(options);
};

const loggerConfig: LoggerOptions = {
  level: config.logging.level,
};

if (config.environment === 'development') {
  loggerConfig.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };
}

export const logger = createLogger(loggerConfig);
