import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('product_id')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = 10

    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }

    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('*, user:users(id, email)')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ reviews: reviews || [], page })
  } catch (error) {
    console.error('Get reviews error:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
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

    const { product_id, rating, title, comment, images, verified_purchase } = await request.json()

    // Check if user already reviewed this product
    const { data: existing } = await supabase
      .from('reviews')
      .select('id')
      .eq('product_id', product_id)
      .eq('user_id', user.id)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'You have already reviewed this product' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        product_id,
        user_id: user.id,
        rating,
        title,
        comment,
        images: images || [],
        verified_purchase: verified_purchase || false,
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Update product rating
    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', product_id)

    if (reviews) {
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      await supabase
        .from('products')
        .update({
          rating: parseFloat(avgRating.toFixed(2)),
          total_ratings: reviews.length,
        })
        .eq('id', product_id)
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Create review error:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}
