'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, User, LogOut, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Header() {
  const [user, setUser] = useState<any>(null)
  const [cartCount, setCartCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Get current user
    const checkUser = async () => {
      try {
        const response = await fetch('/api/auth/user', { method: 'GET' })
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }

    checkUser()

    // Get cart count
    const getCartCount = async () => {
      try {
        const response = await fetch('/api/cart')
        if (response.ok) {
          const data = await response.json()
          setCartCount(data.cartItems?.length || 0)
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error)
      }
    }

    getCartCount()
  }, [])

  const handleSignOut = async () => {
    await fetch('/api/auth/sign-out', { method: 'POST' })
    setUser(null)
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            SDS Textiles
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden md:flex">
            <div className="w-full flex items-center border border-gray-300 rounded-lg px-4 py-2">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="ml-2 flex-1 outline-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    router.push(`/shop?search=${e.currentTarget.value}`)
                  }
                }}
              />
            </div>
          </div>

          {/* Right Nav */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/cart" className="relative flex items-center hover:text-blue-600 transition">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 hover:text-blue-600 transition"
                >
                  <User size={24} />
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <Link href="/account" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                      My Account
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                      My Orders
                    </Link>
                    {user.is_admin && (
                      <Link href="/admin" className="block px-4 py-2 hover:bg-gray-100 text-sm text-blue-600">
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2 text-red-600"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="flex items-center gap-2 hover:text-blue-600 transition text-sm">
                <LogIn size={20} />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
