'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [adminName, setAdminName] = useState('Admin');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('adminRole');

    if (!token || role !== 'admin') {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('adminRole');
    router.push('/admin/login');
  };

  const dashboardStats = [
    { label: 'Total Orders', value: '1,234', icon: '📦', color: 'from-blue-500 to-blue-600' },
    { label: 'Revenue', value: '৳ 5.2M', icon: '💰', color: 'from-green-500 to-green-600' },
    { label: 'Products', value: '156', icon: '🧵', color: 'from-yellow-500 to-yellow-600' },
    { label: 'Customers', value: '892', icon: '👥', color: 'from-purple-500 to-purple-600' },
  ];

  const menuItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { label: 'Products', href: '/admin/products', icon: '🧵' },
    { label: 'Orders', href: '/admin/orders', icon: '📦' },
    { label: 'Customers', href: '/admin/customers', icon: '👥' },
    { label: 'Categories', href: '/admin/categories', icon: '📂' },
    { label: 'Banners', href: '/admin/banners', icon: '🎨' },
    { label: 'Coupons', href: '/admin/coupons', icon: '🎟️' },
    { label: 'Blog', href: '/admin/blog', icon: '📝' },
    { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <main className="w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20and%20Blue%203D%20Y2k%20Fashion%20Logo%20%283%29-McW3YazEzJmQPkOIqzaRyGw2ORLCPv.png"
              alt="SDS Textiles"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <div>
              <p className="text-sm font-semibold text-gray-400">Admin Panel</p>
              <p className="text-xs text-gray-500">SDS Textiles</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-red-500/20 hover:bg-red-500/30 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Logout
          </motion.button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 border-r border-slate-700 bg-slate-950/50 p-6">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors group"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium group-hover:text-yellow-400 transition-colors">
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <section className="p-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-yellow-300 to-red-500 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="text-gray-400">Welcome to SDS Textiles Admin Panel</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {dashboardStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium opacity-90">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <span className="text-4xl opacity-50">{stat.icon}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/admin/products/new">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
                  >
                    Add New Product
                  </motion.button>
                </Link>

                <Link href="/admin/orders">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
                  >
                    View Orders
                  </motion.button>
                </Link>

                <Link href="/admin/banners">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
                  >
                    Manage Banners
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 mt-8"
            >
              <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <div>
                      <p className="font-semibold">{`Order #ORD-${String(i).padStart(4, '0')}`}</p>
                      <p className="text-sm text-gray-400">{`Customer #${i}`}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-yellow-400">৳ 5,999</p>
                      <p className="text-sm text-green-400">Pending</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/admin/orders">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full mt-4 bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  View All Orders
                </motion.button>
              </Link>
            </motion.div>
          </section>
        </div>
      </div>
    </main>
  );
}
