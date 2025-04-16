import { setupApp } from '@/src/routes';
import { Express } from 'express';
import supertest from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

describe('http Server', () => {
  let app: Express;

  beforeEach(async () => {
    app = await setupApp();
  });

  it('should return 200', async () => {
    const response = await supertest(app)
      .get('/')
      .expect(200)
      .then((res) => res.text);

    expect(response).toBe('ok');
  });

  it('should have request id', async () => {
    const response = await supertest(app)
      .get('/')
      .expect(200)
      .then((res) => res.header['x-request-id']);

    expect(response).toBeDefined();
    expect(response).not.toBeNull();
  });

  it('should have security headers', async () => {
    const headers = await supertest(app)
      .get('/')
      .expect(200)
      .then((res) => res.headers);

    expect(headers).toBeDefined();
    expect(headers).not.toBeNull();
    expect(headers['cross-origin-opener-policy']).toBe('same-origin');
    expect(headers['cross-origin-resource-policy']).toBe('same-origin');
    expect(headers['referrer-policy']).toBe('no-referrer');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-dns-prefetch-control']).toBe('off');
    expect(headers['x-frame-options']).toBe('SAMEORIGIN');
    expect(headers['x-xss-protection']).toBe('0');
    expect(headers['x-download-options']).toBe('noopen');
    expect(headers['x-permitted-cross-domain-policies']).toBe('none');
    expect(headers['x-powered-by']).toBeUndefined();
  });
});
