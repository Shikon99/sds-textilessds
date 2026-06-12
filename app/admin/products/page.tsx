'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  discount_price?: number;
  status: string;
  created_at: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch('/api/admin/products?limit=100', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this product?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete');
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting product');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Products</h1>
            <Link href="/admin/products/new">
              <button className="bg-yellow-400 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300">
                Add Product
              </button>
            </Link>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-600 text-red-200 p-4 rounded mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-white text-center py-12">Loading...</div>
          ) : (
            <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">SKU</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Price</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <motion.tr
                      key={product.id}
                      className="border-t border-slate-700 hover:bg-slate-700/50 transition-colors"
                      whileHover={{ backgroundColor: 'rgba(51, 65, 85, 0.3)' }}
                    >
                      <td className="px-6 py-4 text-white">{product.name}</td>
                      <td className="px-6 py-4 text-gray-400">{product.sku}</td>
                      <td className="px-6 py-4 text-yellow-400">৳ {product.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded text-sm font-semibold ${
                          product.status === 'active' 
                            ? 'bg-green-900/50 text-green-300' 
                            : 'bg-yellow-900/50 text-yellow-300'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <Link href={`/admin/products/${product.id}`}>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {products.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  No products found. <Link href="/admin/products/new" className="text-yellow-400 hover:underline">Create one</Link>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
