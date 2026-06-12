import { NextRequest, NextResponse } from 'next/server';
import { verifyRefreshToken, generateAccessToken } from '@/lib/auth/jwt';
import { createResponse, createErrorResponse } from '@/lib/auth/helpers';

export async function POST(request: NextRequest) {
  try {
    // Get refresh token from cookies
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return createErrorResponse('Refresh token not found', 401);
    }

    // Verify refresh token
    const payload = await verifyRefreshToken(refreshToken);
    if (!payload) {
      return createErrorResponse('Invalid refresh token', 401);
    }

    // Generate new access token
    const accessToken = await generateAccessToken(payload.sub, payload.email);

    return createResponse(
      {
        success: true,
        accessToken,
      },
      200
    );
  } catch (error) {
    console.error('[AUTH] Refresh error:', error);
    return createErrorResponse('Token refresh failed', 500);
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
