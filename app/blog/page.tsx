'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: 'How to Care for Premium Textiles',
      excerpt: 'Learn the best practices for maintaining your luxury textile collection',
      date: '2024-06-01',
    },
    {
      id: 2,
      title: 'Latest Textile Trends 2024',
      excerpt: 'Discover the most sought-after textile patterns and materials this season',
      date: '2024-05-15',
    },
    {
      id: 3,
      title: 'Sustainable Fashion Guide',
      excerpt: 'Everything you need to know about eco-friendly textile choices',
      date: '2024-05-01',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
            Blog & Insights
          </h1>
          <p className="text-gray-400 text-lg">
            Stay updated with the latest textile trends and care tips
          </p>
        </motion.div>

        <div className="grid gap-8">
          {posts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-yellow-400/30 transition-all"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-white hover:text-yellow-400 transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                    <button className="text-yellow-400 font-semibold hover:text-yellow-300">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
