import { config } from '@/src/env';
import { logger } from '@/src/initializers/logger';
import express from 'express';

const app = express();
app.use(logger);

const port = config.server.port;
app.listen(port, () => {
  logger.logger.info('Server initialized in %s environment', config.environment);
  logger.logger.info(`Listening on: http://localhost:%d`, port);
});

app.get('/', (req, res) => {
  req.log.info('test');
  res.status(200);
});
