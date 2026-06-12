'use client';

import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How long does shipping take?',
    answer: 'We typically process orders within 1-2 business days and deliver within 2-3 business days to major cities in Bangladesh. Remote areas may take 3-5 business days.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer 30 days money-back guarantee if you&apos;re not satisfied with your purchase. The product must be unused and in original packaging.',
  },
  {
    question: 'Do you offer cash on delivery?',
    answer: 'Yes! We support Cash on Delivery (COD) for all locations in Bangladesh. Pay when your order arrives at your doorstep.',
  },
  {
    question: 'How can I track my order?',
    answer: 'You can track your order using our Order Tracking page. Enter your Order Number and Phone Number to see real-time updates.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept bKash, Nagad, Rocket, Card payments, and Cash on Delivery (COD). All transactions are secure and encrypted.',
  },
  {
    question: 'Are your products authentic?',
    answer: 'Yes! All our products are 100% authentic and sourced directly from trusted manufacturers. We provide authenticity guarantees on premium items.',
  },
  {
    question: 'Can I cancel my order?',
    answer: 'You can cancel your order within 2 hours of placing it. After that, the order enters processing and cannot be cancelled.',
  },
  {
    question: 'Do you have a physical store?',
    answer: 'We operate online only, but we have warehouses in Dhaka. For inquiries, please contact us at info@sdstextiles.com',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <HelpCircle className="text-yellow-400" size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about orders, shipping, returns, and more.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden hover:border-yellow-400/30 transition-all"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                whileHover={{ backgroundColor: 'rgba(51, 65, 85, 0.6)' }}
                className="w-full px-8 py-6 text-left flex items-center justify-between"
              >
                <h3 className="text-lg font-bold text-white pr-4">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={24} className="text-yellow-400 flex-shrink-0" />
                </motion.div>
              </motion.button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6 text-gray-400 border-t border-slate-700/30">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Still need help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-br from-yellow-400/10 to-orange-400/10 border border-yellow-400/30 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
          </p>
          <a
            href="mailto:support@sdstextiles.com"
            className="inline-block bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </main>
  );
}
