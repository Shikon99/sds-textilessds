import { cookies } from 'next/headers'

/**
 * ডাইনামিক ইম্পোর্ট ব্যবহার করে বান্ডেল সাইজ কমানোর জন্য আপডেট করা হলো
 */
export async function createClient() {
  // ডাইনামিক ইম্পোর্ট: লাইব্রেরিটি শুধুমাত্র এখানে রানটাইমে লোড হবে
  const { createServerClient } = await import('@supabase/ssr')
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // সার্ভার কম্পোনেন্ট থেকে কল করা হলে এই এররটি ইগনোর করা হয়
          }
        },
      },
    },
  )
}
