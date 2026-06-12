import { NextRequest } from 'next/server';
import { wishlists } from '@/lib/db/queries';
import { createResponse, createErrorResponse } from '@/lib/auth/helpers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, sessionId } = body;

    if (!userId && !sessionId) {
      return createErrorResponse('userId or sessionId required', 400);
    }

    let wishlist;
    if (userId) {
      wishlist = await wishlists.findOrCreate(userId);
    } else {
      wishlist = await wishlists.findOrCreate(undefined, sessionId);
    }

    return createResponse({
      wishlistId: wishlist.id,
      userId: wishlist.user_id,
      sessionId: wishlist.session_id,
    });
  } catch (error) {
    console.error('[WISHLIST] Get or create error:', error);
    return createErrorResponse('Failed to get or create wishlist', 500);
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
