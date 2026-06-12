'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient()
      
      // Get the code from URL
      const code = new URLSearchParams(window.location.search).get('code')
      
      if (code) {
        // Exchange code for session
        await supabase.auth.exchangeCodeForSession(code)
      }
      
      // Redirect to home
      router.push('/')
    }

    handleCallback()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Authenticating...</h1>
        <p className="text-gray-600">Please wait while we complete your login.</p>
      </div>
    </div>
  )
}
