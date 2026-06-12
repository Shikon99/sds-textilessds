import { NextRequest, NextResponse } from 'next/server';
import { users } from '@/lib/db/queries';
import { verifyPassword, generateTokenPair } from '@/lib/auth/jwt';
import { createResponse, createErrorResponse } from '@/lib/auth/helpers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return createErrorResponse('Email and password are required', 400);
    }

    // Find user
    const user = await users.findByEmail(email);
    if (!user) {
      return createErrorResponse('Invalid credentials', 401);
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return createErrorResponse('Invalid credentials', 401);
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateTokenPair(user.id, user.email, 'user');

    // Create response
    const response = createResponse(
      {
        success: true,
        user: { id: user.id, email: user.email, name: user.name },
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
    console.error('[AUTH] Login error:', error);
    return createErrorResponse('Login failed', 500);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
