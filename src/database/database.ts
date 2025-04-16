import { DB } from '@/src/database/schema';
import { config } from '@/src/env';
import { logger } from '@/src/initializers/logger';
import { Kysely, MssqlDialect, TediousConnection } from 'kysely';
import * as tarn from 'tarn';
import * as tedious from 'tedious';

const dialect = new MssqlDialect({
  tarn: {
    ...tarn,
    options: {
      min: 0,
      max: 10,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      log: (message): any => {
        logger.debug(message);
      },
    },
  },
  tedious: {
    ...tedious,
    connectionFactory: (): TediousConnection | Promise<TediousConnection> =>
      new tedious.Connection({
        authentication: {
          options: {
            userName: config.database.username,
            password: config.database.password,
          },
          type: 'default',
        },
        options: {
          database: config.database.name,
          port: config.database.port,
          trustServerCertificate: true,
          isolationLevel: tedious.ISOLATION_LEVEL.READ_UNCOMMITTED,
          readOnlyIntent: true,
        },
        server: config.database.host,
      }),
  },
});

export class Db extends Kysely<DB> {
  constructor() {
    super({
      dialect,
      log: ['query', 'error'],
    });
  }
}
