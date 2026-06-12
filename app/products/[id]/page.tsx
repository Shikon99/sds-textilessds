'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('[v0] Fetch product error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      const sessionId = localStorage.getItem('session_id') || Math.random().toString(36).slice(2);
      localStorage.setItem('session_id', sessionId);

      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          product_id: parseInt(productId),
          quantity,
        }),
      });

      if (!res.ok) throw new Error('Failed to add to cart');

      // Update cart in localStorage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existing = cart.find((item: any) => item.product_id === parseInt(productId));
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ product_id: parseInt(productId), quantity });
      }
      localStorage.setItem('cart', JSON.stringify(cart));

      alert('Added to cart!');
    } catch (err) {
      console.error('[v0] Add to cart error:', err);
      alert('Error adding to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Product not found</div>;
  }

  const discount = product.discount_price ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
            SDS Textiles
          </Link>
          <div className="flex gap-4">
            <Link href="/shop" className="text-gray-400 hover:text-white">Shop</Link>
            <Link href="/cart" className="text-gray-400 hover:text-white">Cart</Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl overflow-hidden h-96"
          >
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl opacity-30">🧵</div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-yellow-400 text-3xl font-bold">৳ {product.discount_price || product.price}</span>
                {product.discount_price && (
                  <>
                    <span className="text-gray-500 line-through text-lg">৳ {product.price}</span>
                    <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">{discount}% OFF</span>
                  </>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">Description</h2>
              <p className="text-gray-400 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">Product Details</h2>
              <div className="space-y-2 text-gray-400">
                <p>SKU: <span className="text-white font-semibold">{product.sku}</span></p>
                <p>Status: <span className="text-white font-semibold capitalize">{product.status}</span></p>
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700"
                >
                  -
                </button>
                <span className="text-white text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700"
                >
                  +
                </button>
              </div>
            </div>

            <motion.button
              onClick={handleAddToCart}
              disabled={addingToCart}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(250, 204, 21, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50"
            >
              {addingToCart ? 'Adding...' : 'Add to Cart'}
            </motion.button>

            <Link href="/shop">
              <button className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition-all">
                Continue Shopping
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
