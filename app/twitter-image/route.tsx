import React from 'react';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

// Only export the runtime
export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            fontSize: 48,
            background: 'linear-gradient(to right, #3b82f6, #2563eb)',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: 'white',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="120" height="120" rx="60" fill="white" />
              <path
                d="M85 35L60 60M60 60L35 85M60 60L35 35M60 60L85 85"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div style={{ marginLeft: 16 }}>
              <div style={{ fontSize: 32 }}>MatMax</div>
              <div style={{ fontSize: 24 }}>Wellness Studio</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Content-Type': 'image/png',
        }
      }
    );
  } catch (error) {
    console.error('Error generating Twitter image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
} 