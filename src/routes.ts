import compression from 'compression';
import express, { Express, Request, Response, json } from 'express';
import helmet from 'helmet';
import { randomUUID } from 'crypto';
import { pinoHttp } from 'pino-http';
import { logger } from '@/src/initializers/logger';

export const setupApp = async (): Promise<Express> => {
  const app = express();

  app.use(
    helmet({
      // Disable CSP because it's not needed for this API only project.
      contentSecurityPolicy: false,
    })
  );

  app.use(compression());

  // Generate request id that will correlate all logs for a single request.
  app.use((req, res, next) => {
    req.id = randomUUID();
    res.set('X-Request-Id', req.id);
    next();
  });

  app.use(
    pinoHttp({
      logger,
      quietReqLogger: true,
    })
  );

  app.use(json());

  app.get('/', (req: Request, res: Response) => {
    res.send('ok');
  });

  return app;
};
