'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-yellow-400" size={32} />
            <h1 className="text-5xl md:text-6xl font-black">
              <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Last updated: January 2025</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12"
        >
          {[
            {
              title: '1. Information We Collect',
              content: [
                'Personal information you provide (name, email, phone, address)',
                'Payment and transaction information',
                'Device and usage data',
                'Cookies and tracking technologies',
              ],
            },
            {
              title: '2. How We Use Your Information',
              content: [
                'Process and fulfill your orders',
                'Send order updates and tracking information',
                'Improve our services and user experience',
                'Send promotional emails (with your consent)',
                'Ensure security and prevent fraud',
              ],
            },
            {
              title: '3. Data Protection',
              content: [
                'We use SSL encryption for all transactions',
                'Your payment information is never stored on our servers',
                'We comply with international data protection standards',
                'All customer data is kept confidential',
              ],
            },
            {
              title: '4. Your Rights',
              content: [
                'Right to access your personal data',
                'Right to correct inaccurate information',
                'Right to request deletion of your data',
                'Right to opt-out of marketing communications',
              ],
            },
            {
              title: '5. Third-Party Services',
              content: [
                'We may share data with payment processors and shipping partners',
                'These services are bound by confidentiality agreements',
                'We do not sell your personal information',
              ],
            },
            {
              title: '6. Contact Us',
              content: [
                'If you have privacy concerns, please contact us at:',
                'Email: privacy@sdstextiles.com',
                'Phone: +880 1234 567890',
                'Address: Dhaka, Bangladesh',
              ],
            },
          ].map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl border border-slate-700/50 hover:border-yellow-400/30 transition-all"
            >
              <h2 className="text-2xl font-bold mb-6 text-yellow-400">{section.title}</h2>
              <ul className="space-y-3">
                {section.content.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-400">
                    <span className="text-yellow-400 font-bold mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-blue-500/10 border border-blue-500/50 p-8 rounded-2xl text-center"
          >
            <p className="text-gray-300">
              By using our website, you consent to our Privacy Policy. If you have any questions, please contact us.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
