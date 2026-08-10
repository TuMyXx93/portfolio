import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/contact/schema';

const MAX_BODY_BYTES = 16_384;
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

class PayloadTooLargeError extends Error {}

async function readJsonBody(request: NextRequest): Promise<unknown> {
  if (!request.body) return request.json();

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        throw new PayloadTooLargeError('Request payload is too large.');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bodyBytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bodyBytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder().decode(bodyBytes));
}

function escapeText(value: string): string {
  return validator.escape(validator.stripLow(value, true).trim());
}

function logEvent(
  level: 'error' | 'warn' | 'info',
  event: string,
  requestId: string,
  metadata: Record<string, string | number | boolean> = {}
) {
  console[level](
    JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      event,
      requestId,
      ...metadata,
    })
  );
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();

  try {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_BYTES) {
      logEvent('warn', 'contact.payload_too_large', requestId);
      return NextResponse.json(
        { error: 'Request payload is too large.' },
        { status: 413 }
      );
    }

    const body = await readJsonBody(request);
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      logEvent('warn', 'contact.validation_failed', requestId, {
        fieldCount: result.error.issues.length,
      });
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: result.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    if (result.data.website?.trim()) {
      logEvent('warn', 'contact.honeypot_triggered', requestId);
      return NextResponse.json(
        { success: true, message: 'Message sent successfully' },
        { status: 200 }
      );
    }

    if (!resend) {
      logEvent('error', 'contact.delivery_unavailable', requestId);
      return NextResponse.json(
        { error: 'Contact service is temporarily unavailable.' },
        { status: 503 }
      );
    }

    const { name, email, subject, message } = result.data;
    const senderName = escapeText(
      process.env.CONTACT_FROM_NAME || 'Tumidev Portfolio'
    );
    const safeName = escapeText(name);
    const safeEmail = escapeText(email);
    const safeSubject = escapeText(subject);
    const safeMessage = escapeText(message);
    const recipientEmail = process.env.CONTACT_TO_EMAIL;

    if (!recipientEmail) {
      logEvent('error', 'contact.recipient_unconfigured', requestId);
      return NextResponse.json(
        { error: 'Contact service is temporarily unavailable.' },
        { status: 503 }
      );
    }

    const sendResult = await resend.emails.send({
      from: `${senderName} <onboarding@resend.dev>`,
      to: [recipientEmail],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a1628; color: #f8fafc; border-radius: 12px; border: 1px solid rgba(245, 158, 11, 0.3);">
          <h2 style="color: #f59e0b; font-size: 20px; margin-top: 0;">Nuevo mensaje recibido desde Portfolio Tumidev</h2>
          <div style="margin: 16px 0; padding: 12px 16px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
            <p style="margin: 4px 0;"><strong>Remitente:</strong> ${safeName}</p>
            <p style="margin: 4px 0;"><strong>Email de contacto:</strong> <a href="mailto:${safeEmail}" style="color: #f59e0b;">${safeEmail}</a></p>
            <p style="margin: 4px 0;"><strong>Asunto:</strong> ${safeSubject}</p>
          </div>
          <p style="font-weight: 600; color: #cbd5e1; margin-bottom: 8px;">Mensaje:</p>
          <div style="background: rgba(15, 23, 42, 0.8); padding: 16px; border-left: 4px solid #f59e0b; border-radius: 4px; white-space: pre-wrap; color: #e2e8f0; font-size: 14px; line-height: 1.6;">${safeMessage}</div>
        </div>
      `,
    });

    if (sendResult.error) {
      logEvent('error', 'contact.delivery_failed', requestId);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 502 }
      );
    }

    logEvent('info', 'contact.delivery_succeeded', requestId);
    return NextResponse.json(
      { message: 'Message sent successfully', success: true },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      logEvent('warn', 'contact.payload_too_large', requestId);
      return NextResponse.json(
        { error: 'Request payload is too large.' },
        { status: 413 }
      );
    }
    logEvent('error', 'contact.unhandled_error', requestId);
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
