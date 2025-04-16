import { config } from '@/src/env';
import { logger } from '@/src/initializers/logger';
import { setupApp } from '@/src/routes';

async function main(): Promise<void> {
  const port = config.server.port;
  const app = await setupApp();

  app.listen(port, () => {
    logger.info(`Listening on: http://localhost:%d`, port);
  });
}

main()
  .then(() => {
    logger.info('Server started in %s environment', config.environment);
  })
  .catch((err) => {
    logger.error(err, 'Failed to start application');
    process.exit(-1);
  });
