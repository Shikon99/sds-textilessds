import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*, order_items(*, products(*))')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { cartItems, shippingAddress, shippingCost } = await request.json()

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Calculate total
    let totalAmount = 0
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        order_number: orderNumber,
        total_amount: 0, // Will update after calculating items
        shipping_cost: shippingCost || 0,
        shipping_address: shippingAddress,
        status: 'pending',
        payment_status: 'unpaid',
      })
      .select()

    if (orderError) {
      return NextResponse.json({ error: orderError.message }, { status: 400 })
    }

    const orderId = order[0].id

    // Add order items
    for (const item of cartItems) {
      const { data: product } = await supabase
        .from('products')
        .select('price')
        .eq('id', item.product_id)
        .single()

      const itemTotal = (product?.price || 0) * item.quantity
      totalAmount += itemTotal

      await supabase.from('order_items').insert({
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: product?.price || 0,
      })
    }

    // Update order total
    const finalTotal = totalAmount + (shippingCost || 0)
    await supabase
      .from('orders')
      .update({ total_amount: finalTotal })
      .eq('id', orderId)

    // Clear cart
    await supabase.from('cart_items').delete().eq('user_id', user.id)

    return NextResponse.json({ order: order[0], total: finalTotal }, { status: 201 })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
