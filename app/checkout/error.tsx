'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AlertTriangle, ShoppingCart } from 'lucide-react';

export default function CheckoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen flex items-center justify-center px-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400 to-pink-400 rounded-full opacity-5 blur-3xl"
      ></motion.div>

      <div className="relative z-10 max-w-2xl mx-auto text-center text-white">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-8"
        >
          <AlertTriangle className="w-24 h-24 text-red-500 mx-auto" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-black mb-4">Checkout Error</h1>
        <p className="text-xl text-gray-400 mb-4">
          Something went wrong during checkout.
        </p>
        <p className="text-gray-500 mb-8">
          Please try again or contact support for assistance.
        </p>

        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 mb-8">
          <p className="font-mono text-sm text-red-300">
            Error: {error.message || 'Unknown error'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => reset()}
            className="bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all"
          >
            Try Again
          </motion.button>

          <Link href="/cart">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center gap-2 bg-slate-800/50 border-2 border-indigo-400/50 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-700/50 backdrop-blur-sm transition-all"
            >
              <ShoppingCart size={20} />
              Back to Cart
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
