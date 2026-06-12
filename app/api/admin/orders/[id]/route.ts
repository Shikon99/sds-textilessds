import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth/jwt';
import * as queries from '@/lib/db/queries';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = verifyAdminToken(token);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const orderId = parseInt(params.id);
    const { status, admin_notes } = body;

    // Update order status
    if (status) {
      await queries.updateOrderStatus(orderId, status);
    }

    // Add tracking update with admin notes
    if (admin_notes) {
      await queries.createOrderTracking({
        order_id: orderId,
        status: status || 'updated',
        admin_notes,
        timestamp: new Date(),
      });
    }

    const updated = await queries.getOrderById(orderId);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('[v0] Order PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
