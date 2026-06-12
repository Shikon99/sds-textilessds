import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ points: 0, tier: 'bronze' })
    }

    const { data: loyalty, error } = await supabase
      .from('loyalty_points')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error || !loyalty) {
      // Create initial loyalty record
      const { data: newLoyalty } = await supabase
        .from('loyalty_points')
        .insert({
          user_id: user.id,
          points: 0,
          tier: 'bronze',
        })
        .select()
        .single()

      return NextResponse.json({ points: 0, tier: 'bronze', ...newLoyalty })
    }

    return NextResponse.json(loyalty)
  } catch (error) {
    console.error('Get loyalty error:', error)
    return NextResponse.json({ error: 'Failed to fetch loyalty' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Login required' }, { status: 401 })
    }

    const { action, amount } = await request.json()

    if (!action || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let { data: loyalty } = await supabase
      .from('loyalty_points')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!loyalty) {
      const { data: newLoyalty } = await supabase
        .from('loyalty_points')
        .insert({
          user_id: user.id,
          points: 0,
          tier: 'bronze',
        })
        .select()
        .single()
      loyalty = newLoyalty
    }

    let newPoints = loyalty.points || 0
    if (action === 'add') {
      newPoints += amount
    } else if (action === 'redeem') {
      newPoints = Math.max(0, newPoints - amount)
    }

    // Determine tier
    let tier = 'bronze'
    if (newPoints >= 10000) tier = 'platinum'
    else if (newPoints >= 5000) tier = 'gold'
    else if (newPoints >= 1000) tier = 'silver'

    const { data: updated, error } = await supabase
      .from('loyalty_points')
      .update({ points: newPoints, tier })
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update loyalty error:', error)
    return NextResponse.json({ error: 'Failed to update loyalty' }, { status: 500 })
  }
}
