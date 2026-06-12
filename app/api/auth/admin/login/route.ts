import { NextRequest } from 'next/server';
import { createResponse, createErrorResponse } from '@/lib/auth/helpers';
import { generateTokenPair } from '@/lib/auth/jwt';

// Mock admin credentials - in production, fetch from database
const ADMIN_EMAIL = 'admin@sdstextiles.com';
const ADMIN_PASSWORD = 'admin123'; // Hash this in production

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return createErrorResponse('Email and password are required', 400);
    }

    // Check credentials (in production, verify from database)
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return createErrorResponse('Invalid admin credentials', 401);
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateTokenPair(
      'admin-001',
      email,
      'admin'
    );

    // Create response
    const response = createResponse(
      {
        success: true,
        user: { id: 'admin-001', email, role: 'admin' },
        accessToken,
      },
      200
    );

    // Set refresh token in httpOnly cookie
    response.headers.set(
      'Set-Cookie',
      `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`
    );

    return response;
  } catch (error) {
    console.error('[AUTH] Admin login error:', error);
    return createErrorResponse('Admin login failed', 500);
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
