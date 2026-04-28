import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .transform(val => DOMPurify.sanitize(val)),
  email: z
    .string()
    .email('Invalid email format')
    .max(254, 'Email must be less than 254 characters'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters')
    .transform(val => DOMPurify.sanitize(val)),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .transform(val => DOMPurify.sanitize(val)),
});

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60000;

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  return ip;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastReset > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

const logger = {
  error: (message: string, meta?: object) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          level: 'error',
          message,
          ...meta,
        })
      );
    }
  },
  warn: (message: string, meta?: object) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          level: 'warn',
          message,
          ...meta,
        })
      );
    }
  },
  info: (message: string, meta?: object) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          level: 'info',
          message,
          ...meta,
        })
      );
    }
  },
};

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);

    if (checkRateLimit(clientIP)) {
      logger.warn('Rate limit exceeded', {
        ip: clientIP,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      logger.warn('Validation failed', { ip: clientIP, errors });
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    logger.info('Contact form submission received', {
      ip: clientIP,
      timestamp: new Date().toISOString(),
      subjectLength: subject.length,
      messageLength: message.length,
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        message: 'Message sent successfully',
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Contact form error', { error: String(error) });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint is working' },
    { status: 200 }
  );
}
