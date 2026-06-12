import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Login required' }, { status: 401 })
    }

    const { data: referral, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error || !referral) {
      // Create referral code
      const code = `REF${user.id.substring(0, 8)}${Math.random().toString(36).substring(2, 8)}`
      const { data: newReferral } = await supabase
        .from('referrals')
        .insert({
          user_id: user.id,
          referral_code: code,
          referred_count: 0,
          earned_amount: 0,
        })
        .select()
        .single()

      return NextResponse.json(newReferral)
    }

    return NextResponse.json(referral)
  } catch (error) {
    console.error('Get referral error:', error)
    return NextResponse.json({ error: 'Failed to fetch referral' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { referral_code } = await request.json()

    if (!referral_code) {
      return NextResponse.json({ error: 'Referral code required' }, { status: 400 })
    }

    // Find referrer
    const { data: referral } = await supabase
      .from('referrals')
      .select('user_id')
      .eq('referral_code', referral_code)
      .single()

    if (!referral) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 400 })
    }

    return NextResponse.json({ referred_by: referral.user_id })
  } catch (error) {
    console.error('Process referral error:', error)
    return NextResponse.json({ error: 'Failed to process referral' }, { status: 500 })
  }
}
