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

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest
        .fn()
        .mockResolvedValue({ data: { id: 'test-id' }, error: null }),
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

describe('contact route', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
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
});
