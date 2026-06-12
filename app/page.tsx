'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, Star, Zap, TrendingUp, ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const pageVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.8 } },
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 12 })
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 2, minutes: 45, seconds: 12 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Fetch real products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?limit=4&sort=newest')
        const data = await response.json()
        setProducts(data.products || [])
      } catch (error) {
        console.error('[v0] Products fetch error:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (!mounted) return null

  return (
    <motion.main
      variants={pageVariants as any}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen text-white overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)`,
      } as any}
    >
      {/* Shipping Banner */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-b border-yellow-500/30 text-center py-2 text-sm text-yellow-300">
        📦 Free Shipping Nationwide | Delivery Time: 5-14 days
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700/20 bg-slate-950/70 backdrop-blur-xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.15, rotate: 10 }}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20and%20Blue%203D%20Y2k%20Fashion%20Logo%20%283%29-McW3YazEzJmQPkOIqzaRyGw2ORLCPv.png"
                alt="SDS Textiles"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </motion.div>
            <span className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              SDS
            </span>
          </Link>

          <nav className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
            {[{ label: 'Shop', href: '/shop' }, { label: 'Track', href: '/orders/track' }, { label: 'Cart', href: '/cart' }, { label: 'Login', href: '/auth/login' }].map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.span whileHover={{ y: -2 }} className="text-sm font-medium text-gray-300 hover:text-yellow-400 transition-colors">
                  {item.label}
                </motion.span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 ml-auto md:ml-0">
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 0 25px rgba(251, 191, 36, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-xl transition-all"
              >
                Shop Now
              </motion.button>
            </Link>
            <Link href="/cart">
              <motion.button whileHover={{ scale: 1.1 }} className="md:hidden p-2">
                <ShoppingCart size={20} />
              </motion.button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen md:min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Banner-dQPHlDaqNStVS5g5uhu2JpT2w49rvF.jpg"
            alt="Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40 mix-blend-multiply"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 w-full py-12 md:py-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.div variants={itemVariants} className="mb-2 inline-block">
                <span className="px-4 py-2 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-yellow-300 text-sm font-semibold">
                  ✨ Premium Collection 2024
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent block mb-2">
                  Elevate
                </span>
                <span className="text-white block mb-2">Your Style</span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent block">
                  Forever
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-8 max-w-md leading-relaxed">
                Experience premium textiles crafted for perfection. Discover 1000+ collections handpicked for your lifestyle.
              </motion.p>

              <motion.div variants={itemVariants} className="flex gap-4 flex-col sm:flex-row">
                <Link href="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(251, 191, 36, 0.6)' }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    Shop Now
                  </motion.button>
                </Link>

                <Link href="/orders/track">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-slate-800/50 border-2 border-indigo-400/50 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-700/50 transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowRight size={20} />
                    Track Order
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-700/50">
                {[
                  { number: '10K+', label: 'Happy Customers' },
                  { number: '1000+', label: 'Collections' },
                  { number: '4.9★', label: 'Rating' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl md:text-3xl font-bold text-yellow-400">{stat.number}</div>
                    <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Floating Cards */}
            <div className="hidden md:flex items-center justify-center h-full">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative w-80 h-80"
              >
                <motion.div
                  className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-amber-400/10 rounded-3xl border border-yellow-400/20 backdrop-blur-xl p-6 shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl mb-4">🧵</div>
                  <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
                  <p className="text-gray-300 text-sm">100% authentic premium textiles</p>
                </motion.div>

                <motion.div
                  animate={{ y: [20, -20, 20] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-purple-400/10 rounded-3xl border border-indigo-400/20 backdrop-blur-xl p-6 shadow-2xl"
                >
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
                  <p className="text-gray-300 text-sm">Delivered in 2-3 days nationwide</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Flash Sale */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600/30 via-pink-600/20 to-red-600/30 border border-red-500/30 backdrop-blur-xl p-8"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex items-center gap-3 mb-4">
                <Zap className="text-yellow-400" size={28} />
                <h3 className="text-2xl md:text-3xl font-bold">Flash Sale Live!</h3>
              </motion.div>
              <p className="text-gray-300 mb-4">Get up to 50% OFF on selected premium textiles</p>
            </div>

            <div className="flex gap-4">
              {[
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-slate-900/70 backdrop-blur rounded-lg p-4 text-center min-w-20"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                >
                  <div className="text-3xl font-bold text-yellow-400">{String(item.value).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.label}</div>
                </motion.div>
              ))}
            </div>

            <Link href="/shop">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-yellow-400 text-slate-900 px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all whitespace-nowrap">
                Shop Sale
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Trending Products */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
              Trending Now
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Shop real products from our database, updated in real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // Loading skeleton
            [...Array(4)].map((_, i) => (
              <motion.div key={i} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="h-80 bg-slate-800 rounded-2xl" />
            ))
          ) : products.length > 0 ? (
            // Real products from database
            products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -12 }}
                className="group relative"
              >
                <div className="bg-gradient-to-b from-slate-800/80 to-slate-900 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-yellow-400/50 transition-all backdrop-blur-sm h-full flex flex-col">
                  <div className="h-56 sm:h-64 bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center overflow-hidden relative">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-6xl opacity-40">🧵</div>
                    )}
                    <motion.div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      -50%
                    </motion.div>
                    <motion.button whileHover={{ scale: 1.1 }} className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur p-2 rounded-full text-red-400 hover:text-red-300 transition-colors opacity-0 group-hover:opacity-100">
                      <Heart size={20} />
                    </motion.button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-2 text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 flex-1">{product.description}</p>

                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-400">(238)</span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-yellow-400">৳{typeof product.price === 'number' ? (product.price / 2).toLocaleString('en-US', { maximumFractionDigits: 0 }) : product.price}</span>
                      <span className="text-lg text-gray-500 line-through">৳{typeof product.price === 'number' ? product.price.toLocaleString('en-US', { maximumFractionDigits: 0 }) : product.price}</span>
                    </div>

                    <Link href={`/products/${product.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 py-3 rounded-lg font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={18} />
                        View Details
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // No products message
            <motion.div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No products available. Check back soon!</p>
              <Link href="/shop">
                <motion.button whileHover={{ scale: 1.05 }} className="mt-6 bg-yellow-400 text-slate-900 px-8 py-3 rounded-full font-bold">
                  Browse Shop
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black mb-16 text-center">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Why Choose SDS
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '💎', title: 'Premium Quality', desc: 'Handpicked textiles from around the world' },
            { icon: '⚡', title: 'Fast Shipping', desc: 'Delivered within 2-3 days' },
            { icon: '💳', title: 'Best Prices', desc: '100% authentic with guarantee' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900 p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all"
            >
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-5xl mb-6">
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/30 mt-32 py-16 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div>
              <h4 className="font-black text-2xl bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent mb-4">
                SDS
              </h4>
              <p className="text-gray-400 text-sm">Premium textiles for modern lifestyle</p>
            </div>

            {[
              { title: 'Shop', links: [{ label: 'All Collections', href: '/shop' }, { label: 'New Arrivals', href: '/shop' }, { label: 'Sale', href: '/shop' }] },
              { title: 'Support', links: [{ label: 'Contact Us', href: '/contact' }, { label: 'Track Order', href: '/orders/track' }, { label: 'FAQ', href: '/faq' }] },
              { title: 'Company', links: [{ label: 'About', href: '/about' }, { label: 'Blog', href: '/blog' }, { label: 'Careers', href: '/careers' }] },
              { title: 'Legal', links: [{ label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }, { label: 'Returns', href: '/returns' }] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold text-white mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-700/30 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 SDS Textiles. All rights reserved. Made for Bangladesh.</p>
          </div>
        </div>
      </footer>
    </motion.main>
  )
}
