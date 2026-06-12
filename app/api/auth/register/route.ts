import { NextRequest, NextResponse } from 'next/server';
import { users } from '@/lib/db/queries';
import { hashPassword, generateTokenPair } from '@/lib/auth/jwt';
import { createResponse, createErrorResponse } from '@/lib/auth/helpers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, phone } = body;

    // Validation
    if (!email || !password || !name) {
      return createErrorResponse('Email, password, and name are required', 400);
    }

    if (password.length < 6) {
      return createErrorResponse('Password must be at least 6 characters', 400);
    }

    // Check if user exists
    const existingUser = await users.findByEmail(email);
    if (existingUser) {
      return createErrorResponse('User with this email already exists', 409);
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const userId = await users.create(email, passwordHash, name, phone);

    // Generate tokens
    const { accessToken, refreshToken } = await generateTokenPair(userId, email, 'user');

    // Create response with cookies
    const response = createResponse(
      {
        success: true,
        user: { id: userId, email, name },
        accessToken,
      },
      201
    );

    // Set refresh token in httpOnly cookie
    response.headers.set(
      'Set-Cookie',
      `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`
    );

    return response;
  } catch (error) {
    console.error('[AUTH] Register error:', error);
    return createErrorResponse('Registration failed', 500);
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
