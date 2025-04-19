import compression from 'compression';
import express, { Express, Request, Response, json } from 'express';
import { middleware as OpenApiValidatorMiddleware } from 'express-openapi-validator';
import helmet from 'helmet';
import { randomUUID } from 'crypto';
import { pinoHttp } from 'pino-http';
import { logger } from '@/src/initializers/logger';
import { createApiRoutes } from '@/src/api/routes';
import { apiReference } from '@scalar/express-api-reference';
import { OpenApiSpecLoader } from 'express-openapi-validator/dist/framework/openapi.spec.loader';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

export const loadOpenApiSpec = async (): Promise<OpenAPIV3.DocumentV3 | OpenAPIV3.DocumentV3_1> => {
  const loader = new OpenApiSpecLoader({
    apiDoc: 'data/openapi/v1.yaml',
    validateApiSpec: true,
  });

  const { apiDoc: apiSpec } = await loader.load();

  return apiSpec;
};

export const setupApp = async (): Promise<Express> => {
  const app = express();
  const apiSpec = await loadOpenApiSpec();

  app.use(
    helmet({
      // Disable CSP because it's not needed for this API only project.
      contentSecurityPolicy: false,
    })
  );

  app.use(compression());

  app.get('/docs/openapi.json', (_req, res) => {
    res.json(apiSpec);
  });

  app.use(
    '/docs',
    apiReference({
      spec: {
        content: apiSpec,
      },
    })
  );

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

  app.use(
    OpenApiValidatorMiddleware({
      apiSpec,
      validateApiSpec: true,
      validateRequests: true,
      validateResponses: true,
    })
  );

  app.use('/api/v1', await createApiRoutes());

  return app;
};
