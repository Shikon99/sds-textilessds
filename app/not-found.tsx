'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowRight, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background animated elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-5 blur-3xl"
      ></motion.div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* 404 Animation */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8"
        >
          <div className="text-9xl md:text-[140px] font-black bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
            404
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-400 mb-2">
            Sorry! The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <p className="text-gray-500">
            But don&apos;t worry, we&apos;ve got plenty of amazing products waiting for you!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(251, 191, 36, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all"
            >
              <Home size={20} />
              Go Home
            </motion.button>
          </Link>

          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-slate-800/50 border-2 border-indigo-400/50 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-700/50 backdrop-blur-sm transition-all"
            >
              <Search size={20} />
              Browse Shop
            </motion.button>
          </Link>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm"
        >
          <p className="text-gray-400 mb-4">
            Or try these:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Shop All Products', href: '/shop' },
              { label: 'Track Your Order', href: '/orders/track' },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center justify-center gap-2"
                >
                  {link.label}
                  <ArrowRight size={16} />
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
