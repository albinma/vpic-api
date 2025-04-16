import { Db } from '@/src/database/database';
import { describe, expect, it } from 'vitest';

describe('database', () => {
  it('should connect to database', async () => {
    // arrange
    await using db = new Db();

    // act
    const makes = await db.selectFrom('Make').selectAll().execute();

    // assert
    expect(makes.length).toBeGreaterThan(0);
  });
});
