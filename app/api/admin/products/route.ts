import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth/jwt';
import * as queries from '@/lib/db/queries';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = verifyAdminToken(token);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    const products = await queries.getProducts({ page, limit, category, status });
    return NextResponse.json(products);
  } catch (error) {
    console.error('[v0] Product GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = verifyAdminToken(token);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { name, sku, description, price, discount_price, category_id, images } = body;

    if (!name || !sku || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const product = await queries.createProduct({
      name,
      sku,
      description,
      price,
      discount_price,
      category_id,
    });

    // Handle image uploads if provided
    if (images && Array.isArray(images)) {
      for (const image of images) {
        await queries.createProductImage({
          product_id: product.id,
          r2_key: image.r2_key,
          alt_text: image.alt_text,
        });
      }
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('[v0] Product POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
