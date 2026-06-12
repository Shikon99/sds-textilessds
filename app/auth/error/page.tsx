'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Authentication failed';

  const errorMessages: Record<string, string> = {
    'access_denied': 'Access was denied. Please try again.',
    'configuration_error': 'There was a configuration error. Please contact support.',
    'consent_required': 'Consent is required to proceed.',
    'invalid_request': 'Invalid request. Please try again.',
    'server_error': 'Server error. Please try again later.',
    'temporarily_unavailable': 'Service temporarily unavailable. Please try again later.',
  };

  const message = errorMessages[error as keyof typeof errorMessages] || error;

  return (
    <main className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400 to-pink-400 rounded-full opacity-5 blur-3xl"
      ></motion.div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8"
        >
          <AlertTriangle className="w-24 h-24 text-red-500 mx-auto" />
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Authentication Error
          </h1>
          <p className="text-xl text-gray-400 mb-4">
            {message}
          </p>
          <p className="text-gray-500">
            Don&apos;t worry, we&apos;re here to help!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
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

          <Link href="/auth/login">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-slate-800/50 border-2 border-indigo-400/50 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-700/50 backdrop-blur-sm transition-all"
            >
              Try Login Again
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="w-full bg-slate-950 min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
