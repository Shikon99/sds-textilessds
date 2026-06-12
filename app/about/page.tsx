'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, Award, Users, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <main className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
                About SDS Textiles
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We&apos;re revolutionizing the textile industry in Bangladesh with premium quality, unbeatable prices, and world-class service.
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                SDS Textiles started with a simple vision: to make premium quality textiles accessible to everyone in Bangladesh. We believe that everyone deserves the finest fabrics at fair prices.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Since our inception, we&apos;ve served over 10,000 happy customers and delivered thousands of orders with 4.9-star ratings. Our commitment to quality and customer satisfaction is unwavering.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Users, label: '10K+', desc: 'Happy Customers' },
                { icon: TrendingUp, label: '1000+', desc: 'Collections' },
                { icon: Award, label: '4.9★', desc: 'Rating' },
                { icon: CheckCircle, label: '100%', desc: 'Authentic' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-xl border border-slate-700/50 text-center"
                >
                  <stat.icon className="text-yellow-400 mx-auto mb-3" size={32} />
                  <div className="text-2xl font-bold mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-400">{stat.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="py-16"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Quality First',
                  desc: 'We source only the finest textiles from trusted suppliers worldwide.',
                  icon: Award,
                },
                {
                  title: 'Customer Focus',
                  desc: 'Your satisfaction is our priority. 24/7 support available.',
                  icon: Users,
                },
                {
                  title: 'Fair Pricing',
                  desc: 'Premium quality at competitive prices without compromise.',
                  icon: TrendingUp,
                },
              ].map((value, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl border border-slate-700/50"
                >
                  <value.icon className="text-yellow-400 mb-4" size={40} />
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-400">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Experience the Difference?</h2>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 px-10 py-4 rounded-full font-bold hover:shadow-xl hover:shadow-yellow-400/50 transition-all"
              >
                Shop Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
