import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get('q') || ''
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)

    if (!q || q.length < 2) {
      return NextResponse.json({ results: [] })
    }

    // Search products with full-text search
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, slug, description, price, image_url, rating')
      .or(
        `name.ilike.%${q}%,description.ilike.%${q}%,long_description.ilike.%${q}%`
      )
      .limit(limit)

    if (error) {
      return NextResponse.json({ results: [] })
    }

    // Search categories
    const { data: categories } = await supabase
      .from('categories')
      .select('id, name, slug')
      .ilike('name', `%${q}%`)
      .limit(5)

    // Combine and rank results
    const results = [
      ...((categories || []).map((cat: any) => ({
        type: 'category',
        ...cat,
      }))),
      ...((products || []).map((prod: any) => ({
        type: 'product',
        ...prod,
      }))),
    ]

    return NextResponse.json({ results, query: q })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ results: [] })
  }
}
