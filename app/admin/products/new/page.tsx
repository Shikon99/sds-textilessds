'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    price: '',
    discount_price: '',
    category_id: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          discount_price: formData.discount_price ? parseFloat(formData.discount_price) : null,
          category_id: formData.category_id || null,
        }),
      });

      if (!res.ok) throw new Error('Failed to create product');
      
      router.push('/admin/products');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-white mb-8">Create Product</h1>

          {error && (
            <div className="bg-red-900/50 border border-red-600 text-red-200 p-4 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-2 focus:border-yellow-400 focus:outline-none"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-2 focus:border-yellow-400 focus:outline-none"
                placeholder="Product SKU"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-2 focus:border-yellow-400 focus:outline-none"
                placeholder="Product description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">Price (৳)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  step="0.01"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-2 focus:border-yellow-400 focus:outline-none"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Discount Price (৳)</label>
                <input
                  type="number"
                  name="discount_price"
                  value={formData.discount_price}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-2 focus:border-yellow-400 focus:outline-none"
                  placeholder="0.00 (optional)"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Category</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-2 focus:border-yellow-400 focus:outline-none"
              >
                <option value="">Select Category</option>
                <option value="1">Fabrics</option>
                <option value="2">Textiles</option>
                <option value="3">Clothing</option>
              </select>
            </div>

            <div className="flex gap-4">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-yellow-400 text-slate-900 py-2 rounded-lg font-semibold hover:bg-yellow-300 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Product'}
              </motion.button>

              <button
                type="button"
                onClick={() => router.push('/admin/products')}
                className="flex-1 bg-slate-700 text-white py-2 rounded-lg font-semibold hover:bg-slate-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
