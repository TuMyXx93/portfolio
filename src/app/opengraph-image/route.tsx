import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title =
      searchParams.get('title') || 'TumiDev | Portfolio Profesional';
    const description =
      searchParams.get('description') ||
      'Desarrollador Full Stack especializado en React, Next.js, TypeScript y tecnologías modernas de desarrollo web';

    return new ImageResponse(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage:
            'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
          fontSize: 48,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 1100,
            padding: 60,
            borderRadius: 24,
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: '#3b82f6',
              marginBottom: 32,
            }}
          >
            <span style={{ fontSize: 56, color: 'white', fontWeight: 700 }}>
              TD
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <span style={{ fontSize: 72, fontWeight: 800, color: 'white' }}>
                TumiDev
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginTop: 16,
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  color: '#94a3b8',
                  textAlign: 'center',
                  maxWidth: 900,
                }}
              >
                {title}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 24,
                padding: '12px 24px',
                borderRadius: 12,
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              <span style={{ fontSize: 24, color: '#60a5fa' }}>
                Full Stack Developer
              </span>
              <span style={{ fontSize: 24, color: '#475569' }}>|</span>
              <span style={{ fontSize: 24, color: '#60a5fa' }}>
                React & Next.js
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 20, color: '#475569' }}>tumidev.com</span>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
