'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function TermsPage() {
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
            <FileText className="text-yellow-400" size={32} />
            <h1 className="text-5xl md:text-6xl font-black">
              <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
                Terms & Conditions
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
              title: '1. Acceptance of Terms',
              content: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
            },
            {
              title: '2. Use License',
              content: 'Permission is granted to temporarily download one copy of the materials (information or software) on SDS Textiles website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to decompile, disassemble, or reverse engineer any software contained on the website.',
            },
            {
              title: '3. Disclaimer',
              content: 'The materials on SDS Textiles website are provided on an "as is" basis. SDS Textiles makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
            },
            {
              title: '4. Limitations',
              content: 'In no event shall SDS Textiles or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SDS Textiles website.',
            },
            {
              title: '5. Accuracy of Materials',
              content: 'The materials appearing on SDS Textiles website could include technical, typographical, or photographic errors. SDS Textiles does not warrant that any of the materials on its website are accurate, complete, or current. SDS Textiles may make changes to the materials contained on its website at any time without notice.',
            },
            {
              title: '6. Links',
              content: 'SDS Textiles has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by SDS Textiles of the site. Use of any such linked website is at the user&apos;s own risk.',
            },
            {
              title: '7. Modifications',
              content: 'SDS Textiles may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.',
            },
            {
              title: '8. Governing Law',
              content: 'These terms and conditions are governed by and construed in accordance with the laws of Bangladesh, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.',
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
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">{section.title}</h2>
              <p className="text-gray-400 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
