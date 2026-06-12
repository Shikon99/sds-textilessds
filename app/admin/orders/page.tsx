'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Order {
  id: number;
  order_number: string;
  total: number;
  status: string;
  payment_method: string;
  created_at: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const query = filter !== 'all' ? `?status=${filter}` : '?limit=100';
        const res = await fetch(`/api/admin/orders${query}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error('[v0] Fetch orders error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filter]);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-900/50 text-yellow-300',
    confirmed: 'bg-blue-900/50 text-blue-300',
    shipped: 'bg-purple-900/50 text-purple-300',
    delivered: 'bg-green-900/50 text-green-300',
    cancelled: 'bg-red-900/50 text-red-300',
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-white mb-8">Orders</h1>

          <div className="flex gap-2 mb-8">
            {['all', 'pending', 'confirmed', 'shipped', 'delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded capitalize font-semibold transition-all ${
                  filter === status
                    ? 'bg-yellow-400 text-slate-900'
                    : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-white text-center py-12">Loading...</div>
          ) : (
            <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">Order #</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Total</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Payment</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <motion.tr
                      key={order.id}
                      className="border-t border-slate-700 hover:bg-slate-700/50"
                      whileHover={{ backgroundColor: 'rgba(51, 65, 85, 0.3)' }}
                    >
                      <td className="px-6 py-4 text-white font-semibold">{order.order_number}</td>
                      <td className="px-6 py-4 text-yellow-400">৳ {order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded text-sm font-semibold ${statusColors[order.status] || statusColors.pending}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 capitalize">{order.payment_method}</td>
                      <td className="px-6 py-4 text-gray-400">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <Link href={`/admin/orders/${order.id}`}>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                            View
                          </button>
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {orders.length === 0 && (
                <div className="text-center py-12 text-gray-400">No orders found</div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
