'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Briefcase, MapPin, Clock } from 'lucide-react'

export default function CareersPage() {
  const jobs = [
    {
      title: 'Textile Designer',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      description: 'Create stunning textile patterns and designs',
    },
    {
      title: 'Customer Service Manager',
      location: 'Remote',
      type: 'Full-time',
      description: 'Lead our customer support team',
    },
    {
      title: 'Marketing Specialist',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      description: 'Drive growth through strategic marketing',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
            Join Our Team
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Build your career with SDS Textiles. We're looking for passionate individuals to help us deliver excellence.
          </p>
        </motion.div>

        <div className="grid gap-6 mb-16">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-yellow-400/30 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">{job.title}</h3>
                  <div className="flex flex-col sm:flex-row gap-4 text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-yellow-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-yellow-400" />
                      {job.type}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{job.description}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 px-6 py-2 rounded-full font-bold whitespace-nowrap"
                >
                  Apply Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Don't see a position you like?</h3>
          <p className="text-gray-400 mb-6">Send us your resume and let's talk about opportunities</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-slate-700 hover:bg-slate-600 px-8 py-3 rounded-full font-bold transition-all"
          >
            Send Your Resume
          </motion.button>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
