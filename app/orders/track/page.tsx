'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { AlertCircle, CheckCircle2, Package, MapPin, Phone, Calendar, Truck } from 'lucide-react';

const statusSteps = ['Pending', 'Confirmed', 'Shipped', 'In Transit', 'Delivered'];

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [tracking, setTracking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTracking(null);
    setSearched(true);

    // Validate inputs
    if (!orderNumber.trim()) {
      setError('Please enter your Order Number');
      setLoading(false);
      return;
    }

    if (!phone.trim()) {
      setError('Please enter your Phone Number');
      setLoading(false);
      return;
    }

    // Validate order number format
    if (orderNumber.trim().length < 5) {
      setError('Order Number appears to be invalid. Please check and try again.');
      setLoading(false);
      return;
    }

    // Validate phone number format (Bangladesh: 11-12 digits)
    const phoneRegex = /^(\+880|880|0)?1[3-9]\d{8}$/;
    if (!phoneRegex.test(phone.trim().replace(/\s+/g, ''))) {
      setError('Please enter a valid Bangladesh phone number (e.g., 01234567890)');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          orderNumber: orderNumber.trim().toUpperCase(), 
          phone: phone.trim().replace(/\s+/g, '') 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          setError('No order found with these details. Please verify your Order Number and Phone Number are correct.');
        } else {
          setError(data.error || 'Unable to fetch order details. Please try again later.');
        }
        return;
      }

      if (!data.order) {
        setError('The order information could not be retrieved. Please contact our support team.');
        return;
      }

      setTracking(data);
    } catch (err) {
      setError('Network error. Please check your internet connection and try again.');
      console.error('[v0] Tracking error:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentStatusIndex = tracking
    ? statusSteps.findIndex((s) => s.toLowerCase() === tracking.order.status.toLowerCase())
    : -1;

  return (
    <main className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700/20 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20and%20Blue%203D%20Y2k%20Fashion%20Logo%20%283%29-McW3YazEzJmQPkOIqzaRyGw2ORLCPv.png"
                alt="SDS"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              SDS
            </span>
          </Link>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold"
            >
              Back to Shop
            </motion.button>
          </Link>
        </div>
      </header>

      {/* Track Section */}
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Track Your Order
            </span>
          </h1>
          <p className="text-gray-400 text-center mb-12">
            Enter your order number and phone number to track your delivery
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleTrack}
          className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Order Number</label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="ORD-XXXXXXXX-XXXX"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92XXXXXXXXXX"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                required
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-400 text-sm mb-6"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Tracking...' : 'Track Order'}
          </motion.button>
        </motion.form>

        {/* Tracking Details */}
        {tracking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Order Info */}
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Order Details</h2>
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div>
                  <p className="text-gray-400 text-sm">Order Number</p>
                  <p className="text-xl font-bold text-yellow-400">{tracking.order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Order Date</p>
                  <p className="text-xl font-bold">
                    {new Date(tracking.order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Amount</p>
                  <p className="text-xl font-bold text-green-400">৳ {typeof tracking.order.total === 'number' ? tracking.order.total.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '0'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Current Status</p>
                  <p className="text-xl font-bold text-blue-400 capitalize">{tracking.order.status}</p>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-8">Delivery Timeline</h2>

              <div className="relative">
                {statusSteps.map((status, index) => (
                  <div key={index} className="mb-8 last:mb-0 flex gap-4">
                    {/* Timeline Node */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
                          index <= currentStatusIndex
                            ? 'bg-yellow-400 text-slate-900'
                            : 'bg-slate-700 text-gray-400'
                        }`}
                      >
                        {index < currentStatusIndex ? '✓' : index + 1}
                      </motion.div>
                      {index < statusSteps.length - 1 && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                          className={`w-1 h-12 mt-2 ${
                            index < currentStatusIndex ? 'bg-yellow-400' : 'bg-slate-700'
                          }`}
                        />
                      )}
                    </div>

                    {/* Status Info */}
                    <div className="pb-8">
                      <h3 className="font-bold text-lg mb-1">{status}</h3>
                      <p className="text-gray-400 text-sm">
                        {index <= currentStatusIndex
                          ? `Completed on ${new Date().toLocaleDateString()}`
                          : 'Pending'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
              <div className="text-gray-300">
                <p className="font-semibold">{tracking.order.shippingAddress.name}</p>
                <p>{tracking.order.shippingAddress.address}</p>
                <p>
                  {tracking.order.shippingAddress.city}, {tracking.order.shippingAddress.zip}
                </p>
                <p>{tracking.order.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Admin Notes */}
            {tracking.order.adminNotes && (
              <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-6">
                <h2 className="text-lg font-bold mb-2">Delivery Notes</h2>
                <p className="text-gray-300">{tracking.order.adminNotes}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* No Results State */}
        {searched && !tracking && error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6"
            >
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-3">Order Not Found</h2>
            <p className="text-gray-400 mb-8 text-lg">
              We couldn&apos;t find an order matching your details.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/50 rounded-lg p-6 mb-8 text-left">
              <p className="font-bold text-amber-300 mb-3">Please check:</p>
              <ul className="text-gray-300 space-y-2 ml-4">
                <li>✓ Order Number is correct (e.g., ORD-XXXXX-XXXX)</li>
                <li>✓ Phone Number matches your order</li>
                <li>✓ Order was placed within the last 90 days</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setOrderNumber('');
                  setPhone('');
                  setError('');
                  setSearched(false);
                }}
                className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-bold transition-all"
              >
                Try Again
              </motion.button>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-8 py-3 rounded-lg font-bold transition-all"
                >
                  Contact Support
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!searched && !error && !tracking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-6"
            >
              <Package className="w-16 h-16 text-yellow-400 mx-auto" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-3">Track Your Order</h2>
            <p className="text-gray-400 text-lg">
              Enter your Order Number and Phone Number above to see live tracking updates
            </p>
          </motion.div>
        )}
      </section>
    </main>
  );
}
