import { components, paths } from '@/src/api/types/openapi';
import { createDb } from '@/src/database/database';
import { Router, Request, Response } from 'express';
import { sql } from 'kysely';

export type GetYearsResponseBody = components['schemas']['GetYearsResponseBody'];
export type GetMakesRequest = Request<
  never,
  never,
  never,
  paths['/makes']['get']['parameters']['query']
>;
export type LookupResponseBody = components['schemas']['Lookup'];

const toLookup = (row: { Id: number; Name: string }): LookupResponseBody => ({
  id: row.Id,
  name: row.Name,
});

export const createApiRoutes = async (): Promise<Router> => {
  const router = Router();

  router.get('/years', async (req: Request, res: Response<GetYearsResponseBody>) => {
    const data = await createDb()
      .selectFrom('WMIYearValidChars')
      .select('Year')
      .distinct()
      .orderBy('Year', 'asc')
      .execute();

    res.json(data.map((y) => y.Year));
  });

  router.get('/makes', async (req: GetMakesRequest, res: Response<LookupResponseBody[]>) => {
    const year = req.query.year;

    let query = createDb()
      .selectFrom('Wmi_Make as wm')
      .innerJoin('Wmi_VinSchema as wv', 'wv.WmiId', 'wm.WmiId')
      .innerJoin('Make as m', 'm.Id', 'wm.MakeId')
      .select(['m.Id', 'm.Name'])
      .distinct()
      .orderBy('m.Name', 'asc');

    if (year !== undefined) {
      query = query
        .where('wv.YearFrom', '<=', year)
        .where(sql`ISNULL(wv.YearTo, 2999)`, '>=', year);
    }

    const result = await query.execute();

    res.json(result.map(toLookup));
  });

  return router;
};
