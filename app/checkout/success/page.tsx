'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, Home, Package } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const order = searchParams.get('order');
    if (order) {
      setOrderNumber(order);
    }
  }, [searchParams]);

  return (
    <main className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background animation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-5 blur-3xl"
      ></motion.div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Success Animation */}
        <motion.div
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-gray-400 mb-4">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          {orderNumber && (
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <p className="text-gray-400 text-sm mb-2">Order Number</p>
              <p className="text-2xl font-bold text-yellow-400">{orderNumber}</p>
            </div>
          )}
          <p className="text-gray-500">
            We&apos;ll send you tracking information via email soon.
          </p>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl border border-slate-700/50 mb-8"
        >
          <h2 className="text-xl font-bold mb-4">What&apos;s Next?</h2>
          <ul className="text-gray-400 space-y-3 text-left">
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold mt-1">1</span>
              <span>Check your email for order confirmation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold mt-1">2</span>
              <span>Track your order in real-time</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold mt-1">3</span>
              <span>Receive your package within 2-3 business days</span>
            </li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/orders/track">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(251, 191, 36, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all w-full sm:w-auto"
            >
              <Package size={20} />
              Track Order
            </motion.button>
          </Link>

          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-slate-800/50 border-2 border-indigo-400/50 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-700/50 backdrop-blur-sm transition-all w-full sm:w-auto"
            >
              <Home size={20} />
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="w-full bg-slate-950 min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
