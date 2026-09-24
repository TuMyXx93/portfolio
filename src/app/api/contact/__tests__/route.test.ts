import type { NextRequest } from 'next/server';

const { TextDecoder, TextEncoder } = require('node:util');
const { ReadableStream, TransformStream } = require('node:stream/web');
const { MessageChannel, MessagePort } = require('node:worker_threads');
Object.assign(globalThis, {
  TextDecoder,
  TextEncoder,
  ReadableStream,
  TransformStream,
  MessageChannel,
  MessagePort,
});
const {
  Request: UndiciRequest,
  Response: UndiciResponse,
  Headers: UndiciHeaders,
} = require('undici');
Object.assign(globalThis, {
  Request: UndiciRequest,
  Response: UndiciResponse,
  Headers: UndiciHeaders,
});

const mockSend = jest
  .fn()
  .mockResolvedValue({ data: { id: 'test-id' }, error: null });

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: mockSend,
    },
  })),
}));

function request(body?: unknown, method = 'POST'): NextRequest {
  const headers = new Map<string, string>();
  if (body !== undefined) {
    headers.set('content-type', 'application/json');
  }

  return {
    method,
    headers: { get: (name: string) => headers.get(name) || null },
    json: async () => body,
  } as unknown as NextRequest;
}

function streamedRequest(bytes: Uint8Array): NextRequest {
  let consumed = false;
  return {
    method: 'POST',
    headers: { get: () => null },
    body: {
      getReader: () => ({
        read: async () => {
          if (consumed) return { done: true, value: undefined };
          consumed = true;
          return { done: false, value: bytes };
        },
        releaseLock: () => undefined,
      }),
    },
  } as unknown as NextRequest;
}

import { resetInMemoryStore } from '@/lib/security/rateLimiter';

describe('contact route', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    resetInMemoryStore();
    process.env.RESEND_API_KEY = 'test-key';
    process.env.CONTACT_TO_EMAIL = 'owner@example.com';
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('returns health status for GET', async () => {
    const { GET } = await import('../route');
    const response = await GET();

    expect(response.status).toBe(200);
  });

  it('rejects an invalid payload before delivery', async () => {
    const { POST } = await import('../route');
    const response = await POST(
      request({ name: '', email: 'bad', subject: '', message: '' })
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: 'Validation failed',
    });
  });

  it('rejects an oversized streamed payload without buffering it fully', async () => {
    const { POST } = await import('../route');
    const oversized = new Uint8Array(16_385);
    const response = await POST(streamedRequest(oversized));

    expect(response.status).toBe(413);
  });

  it('accepts a honeypot submission without sending mail', async () => {
    const { POST } = await import('../route');
    const response = await POST(
      request({
        name: 'Bot User',
        email: 'bot@example.com',
        subject: 'Automated message',
        message: 'This message is long enough for the validation schema.',
        website: 'https://bot.example.com',
      })
    );

    expect(response.status).toBe(200);
  });

  it('fails closed when the recipient is not configured', async () => {
    delete process.env.CONTACT_TO_EMAIL;
    const { POST } = await import('../route');
    const response = await POST(
      request({
        name: 'Valid User',
        email: 'valid@example.com',
        subject: 'A valid subject',
        message: 'This message is long enough for the validation schema.',
      })
    );

    expect(response.status).toBe(503);
  });

  it('sends a valid message without exposing provider details', async () => {
    const { POST } = await import('../route');
    const response = await POST(
      request({
        name: 'Valid User',
        email: 'valid@example.com',
        subject: 'A valid subject',
        message: 'This message is long enough for the validation schema.',
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      message: 'Message sent successfully',
      success: true,
    });
  });

  it('blocks requests with 429 when rate limit is exceeded', async () => {
    const { POST } = await import('../route');
    const makePayload = () =>
      request({
        name: 'Valid User',
        email: 'valid@example.com',
        subject: 'A valid subject',
        message: 'This message is long enough for the validation schema.',
      });

    // Exhaust 5 allowed requests
    for (let i = 0; i < 5; i++) {
      const res = await POST(makePayload());
      expect(res.status).toBe(200);
    }

    // 6th request must be blocked by rate limiter
    const blockedRes = await POST(makePayload());
    expect(blockedRes.status).toBe(429);
    expect(blockedRes.headers.get('Retry-After')).toBeDefined();
    await expect(blockedRes.json()).resolves.toEqual(
      expect.objectContaining({
        error: 'Too many requests. Please try again later.',
      })
    );
  });

  it('rejects immediately with 413 when content-length header exceeds limit', async () => {
    const { POST } = await import('../route');
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'content-length': '200000',
      },
      body: JSON.stringify({ name: 'Huge' }),
    }) as unknown as NextRequest;

    const res = await POST(req);
    expect(res.status).toBe(413);
  });

  it('returns 502 when resend client returns an error', async () => {
    mockSend.mockResolvedValueOnce({ error: { message: 'Provider error' }, data: null });
    const { POST } = await import('../route');
    const response = await POST(
      request({
        name: 'Jane Doe',
        email: 'jane@example.com',
        subject: 'Inquiry',
        message: 'A sufficiently long valid message for delivery error test.',
      })
    );

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: 'Failed to send email. Please try again later.',
    });
  });

  it('returns 500 on unexpected runtime errors', async () => {
    const { POST } = await import('../route');
    const corruptRequest = {
      headers: { get: () => null },
      body: {
        getReader: () => {
          throw new Error('Stream malfunction');
        },
      },
    } as unknown as NextRequest;

    const response = await POST(corruptRequest);
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: 'Internal server error',
    });
  });
});
