import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { orderNumber, phone } = await request.json()

    // Validation
    if (!orderNumber || !phone) {
      return NextResponse.json(
        { error: 'Order number and phone are required' },
        { status: 400 }
      )
    }

    // Query Supabase orders table
    const { data: orders, error: queryError } = await supabase
      .from('orders')
      .select(
        `
        id,
        order_number,
        status,
        created_at,
        updated_at,
        expected_delivery,
        total,
        delivery_address,
        phone,
        admin_notes,
        order_items (
          id,
          quantity,
          price,
          products (
            id,
            name
          )
        )
      `
      )
      .eq('order_number', orderNumber.toUpperCase())
      .eq('phone', phone.replace(/\s+/g, ''))

    if (queryError) {
      console.error('[v0] Query error:', queryError)
      return NextResponse.json(
        { error: 'Failed to query orders' },
        { status: 500 }
      )
    }

    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { error: 'No order found with these details. Please verify your Order Number and Phone Number.' },
        { status: 404 }
      )
    }

    const order = orders[0]

    // Format response with BDT currency
    const formattedOrder = {
      order_number: order.order_number,
      status: order.status,
      created_at: order.created_at,
      updated_at: order.updated_at,
      expected_delivery: order.expected_delivery,
      total: order.total,
      delivery_address: order.delivery_address,
      phone: order.phone,
      admin_notes: order.admin_notes,
      items: (order.order_items || []).map((item: any) => ({
        product_name: item.products?.name || 'Unknown Product',
        quantity: item.quantity,
        price: item.price,
      })),
    }

    return NextResponse.json({ 
      success: true,
      order: formattedOrder 
    })
  } catch (error) {
    console.error('[v0] Order tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track order. Please try again later.' },
      { status: 500 }
    )
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
  })
}
