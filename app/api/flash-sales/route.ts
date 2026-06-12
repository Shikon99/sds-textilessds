import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get active flash sales
    const now = new Date().toISOString()
    const { data: sales, error } = await supabase
      .from('flash_sales')
      .select('*, products(*)')
      .gt('end_time', now)
      .lt('start_time', now)
      .order('end_time', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ sales: sales || [] })
  } catch (error) {
    console.error('Get flash sales error:', error)
    return NextResponse.json({ error: 'Failed to fetch flash sales' }, { status: 500 })
  }
}
