'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function OrderDetail() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`/api/orders/${orderId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Order not found');
        const data = await res.json();
        setOrder(data);
        setNewStatus(data.status);
      } catch (err) {
        console.error('[v0] Fetch order error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleUpdateStatus = async () => {
    if (!newStatus.trim()) return;

    setUpdating(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
          admin_notes: adminNotes,
        }),
      });

      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      setOrder(updated);
      setAdminNotes('');
    } catch (err) {
      console.error('[v0] Update error:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;

  if (!order) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Order not found</div>;

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-900/50 text-yellow-300',
    confirmed: 'bg-blue-900/50 text-blue-300',
    shipped: 'bg-purple-900/50 text-purple-300',
    delivered: 'bg-green-900/50 text-green-300',
    cancelled: 'bg-red-900/50 text-red-300',
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-white mb-8">Order #{order.order_number}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <p className="text-gray-400 text-sm mb-2">Total</p>
              <p className="text-yellow-400 text-3xl font-bold">৳ {order.total}</p>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <p className="text-gray-400 text-sm mb-2">Status</p>
              <span className={`px-3 py-1 rounded text-sm font-semibold ${statusColors[order.status] || statusColors.pending}`}>
                {order.status}
              </span>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <p className="text-gray-400 text-sm mb-2">Order Date</p>
              <p className="text-white font-semibold">{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Update Order</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-2 focus:border-yellow-400 focus:outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Admin Notes</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-2 focus:border-yellow-400 focus:outline-none"
                  placeholder="Add internal notes about this order..."
                />
              </div>

              <motion.button
                onClick={handleUpdateStatus}
                disabled={updating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-yellow-400 text-slate-900 py-2 rounded-lg font-semibold hover:bg-yellow-300 disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Update Order'}
              </motion.button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Order Items</h2>
            <div className="space-y-4">
              {order.items ? (
                order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center py-4 border-b border-slate-700 last:border-b-0">
                    <div>
                      <p className="text-white font-semibold">{item.name}</p>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-yellow-400 font-semibold">৳ {item.price_paid}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No items</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
