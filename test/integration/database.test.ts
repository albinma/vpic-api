import { createDb } from '@/src/database/database';
import { describe, expect, it } from 'vitest';

describe('database', () => {
  it('should connect to database', async () => {
    // arrange
    const db = createDb();

    // act
    const makes = await db.selectFrom('Make').selectAll().execute();

    // assert
    expect(makes.length).toBeGreaterThan(0);
  });
});
