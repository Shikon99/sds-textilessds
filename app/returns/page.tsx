'use client';

import { motion } from 'framer-motion';
import { RotateCcw, CheckCircle, AlertCircle, Package } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <main className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <RotateCcw className="text-yellow-400" size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
              Returns & Refunds
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We want you to be completely satisfied with your purchase. Learn about our hassle-free return policy.
          </p>
        </motion.div>

        {/* Return Policy Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Return Process</h2>
          <div className="space-y-8">
            {[
              {
                step: 1,
                title: 'Request Return',
                desc: 'Contact us within 30 days of delivery with your Order Number and reason for return.',
              },
              {
                step: 2,
                title: 'Get Approval',
                desc: 'We&apos;ll review your request and send you a return authorization number within 24 hours.',
              },
              {
                step: 3,
                title: 'Ship Back',
                desc: 'Pack the item securely and send it back using the provided shipping label (free shipping).',
              },
              {
                step: 4,
                title: 'Process Refund',
                desc: 'Once we receive and inspect your return, we&apos;ll process your refund within 5-7 business days.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="relative flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 font-bold text-lg flex items-center justify-center flex-shrink-0"
                  >
                    {item.step}
                  </motion.div>
                  {i < 3 && (
                    <div className="w-1 h-12 bg-gradient-to-b from-yellow-400 to-transparent mt-2"></div>
                  )}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Return Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-12 rounded-2xl border border-slate-700/50 mb-16"
        >
          <div className="flex items-start gap-4 mb-6">
            <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-2xl font-bold mb-4">Items That Can Be Returned</h3>
              <ul className="space-y-2 text-gray-400">
                <li>✓ Unused items in original condition</li>
                <li>✓ Items with original tags attached</li>
                <li>✓ Items returned within 30 days of purchase</li>
                <li>✓ Items with original packaging intact</li>
                <li>✓ All items ordered from our website</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Non-Returnable Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-red-400/10 to-pink-400/10 border border-red-400/30 p-12 rounded-2xl mb-16"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="text-red-400 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-2xl font-bold mb-4">Items That Cannot Be Returned</h3>
              <ul className="space-y-2 text-gray-400">
                <li>✗ Items showing signs of wear or damage</li>
                <li>✗ Items that have been washed or altered</li>
                <li>✗ Items without original tags</li>
                <li>✗ Items returned after 30 days</li>
                <li>✗ Custom or personalized items</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Refund Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-400/10 to-indigo-400/10 border border-blue-400/30 p-12 rounded-2xl"
        >
          <div className="flex items-start gap-4">
            <Package className="text-blue-400 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-2xl font-bold mb-4">Refund Process</h3>
              <p className="text-gray-400 mb-4">
                After we receive and inspect your returned item, we&apos;ll process your refund immediately. The refund will be credited to your original payment method within 5-7 business days.
              </p>
              <p className="text-gray-400">
                <strong>Note:</strong> Shipping costs are non-refundable unless the return is due to our error or a defective product.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Need Help with a Return?</h2>
          <p className="text-gray-400 mb-6">
            Contact our support team for assistance with your return.
          </p>
          <a
            href="mailto:returns@sdstextiles.com"
            className="inline-block bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all"
          >
            Email Us
          </a>
        </motion.div>
      </div>
    </main>
  );
}
