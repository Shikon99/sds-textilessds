import { NextRequest } from 'next/server';
import { carts } from '@/lib/db/queries';
import { createResponse, createErrorResponse } from '@/lib/auth/helpers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, sessionId } = body;

    if (!userId && !sessionId) {
      return createErrorResponse('userId or sessionId required', 400);
    }

    let cart;
    if (userId) {
      cart = await carts.findOrCreate(userId);
    } else {
      cart = await carts.findOrCreate(undefined, sessionId);
    }

    return createResponse({
      cartId: cart.id,
      userId: cart.user_id,
      sessionId: cart.session_id,
    });
  } catch (error) {
    console.error('[CART] Get or create error:', error);
    return createErrorResponse('Failed to get or create cart', 500);
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
