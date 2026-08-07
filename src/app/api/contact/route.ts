import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import validator from 'validator';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function sanitizeText(val: string): string {
  const stripped = validator.stripLow(val, true);
  return validator.escape(stripped.trim());
}

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .transform(sanitizeText),
  email: z
    .string()
    .email('Invalid email format')
    .max(254, 'Email must be less than 254 characters'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters')
    .transform(sanitizeText),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .transform(sanitizeText),
});

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 15;
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
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'error',
        message,
        ...meta,
      })
    );
  },
  warn: (message: string, meta?: object) => {
    console.warn(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'warn',
        message,
        ...meta,
      })
    );
  },
  info: (message: string, meta?: object) => {
    console.info(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'info',
        message,
        ...meta,
      })
    );
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
      const errors = result.error.issues.map(err => ({
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

    if (resend) {
      const recipientEmail = process.env.CONTACT_TO_EMAIL || 'tumyxx@gmail.com';
      const senderName = process.env.CONTACT_FROM_NAME || 'Tumidev Portfolio';

      const sendResult = await resend.emails.send({
        from: `${senderName} <onboarding@resend.dev>`,
        to: [recipientEmail],
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a1628; color: #f8fafc; border-radius: 12px; border: 1px solid rgba(245, 158, 11, 0.3);">
            <h2 style="color: #f59e0b; font-size: 20px; margin-top: 0;">Nuevo mensaje recibido desde Portfolio Tumidev</h2>
            <div style="margin: 16px 0; padding: 12px 16px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
              <p style="margin: 4px 0;"><strong>Remitente:</strong> ${name}</p>
              <p style="margin: 4px 0;"><strong>Email de contacto:</strong> <a href="mailto:${email}" style="color: #f59e0b;">${email}</a></p>
              <p style="margin: 4px 0;"><strong>Asunto:</strong> ${subject}</p>
            </div>
            <p style="font-weight: 600; color: #cbd5e1; margin-bottom: 8px;">Mensaje:</p>
            <div style="background: rgba(15, 23, 42, 0.8); padding: 16px; border-left: 4px solid #f59e0b; border-radius: 4px; white-space: pre-wrap; color: #e2e8f0; font-size: 14px; line-height: 1.6;">
              ${message}
            </div>
            <footer style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.1); font-size: 12px; color: #94a3b8; text-align: center;">
              Enviado automáticamente desde <a href="https://tumidev.com" style="color: #f59e0b;">Portfolio Tumidev</a>
            </footer>
          </div>
        `,
      });

      if (sendResult.error) {
        logger.error('Resend email delivery failed', { error: sendResult.error });
        return NextResponse.json(
          {
            error: 'Failed to send email. Please try again.',
            details: sendResult.error.message,
          },
          { status: 500 }
        );
      }

      logger.info('Contact email sent successfully via Resend', {
        id: sendResult.data?.id,
        recipient: recipientEmail,
      });
    } else {
      logger.info('Resend API key not configured, simulating delivery');
      await new Promise(resolve => setTimeout(resolve, 300));
    }

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
