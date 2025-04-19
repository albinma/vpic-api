import { components } from '@/src/api/types/openapi';
import { createDb } from '@/src/database/database';
import { Router, Request, Response } from 'express';

export type VPICYearsResponseBody = components['schemas']['GetYearsResponseBody'];

export const createApiRoutes = async (): Promise<Router> => {
  const router = Router();

  router.get('/years', async (req: Request, res: Response<VPICYearsResponseBody>) => {
    const data = await createDb()
      .selectFrom('WMIYearValidChars')
      .select('Year')
      .distinct()
      .orderBy('Year', 'asc')
      .execute();

    res.json(data.map((y) => y.Year));
  });

  return router;
};
