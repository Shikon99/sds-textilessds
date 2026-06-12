'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const SOCIAL_PLATFORMS = ['Facebook', 'Instagram', 'Twitter', 'TikTok', 'LinkedIn', 'YouTube', 'WhatsApp'];

export default function AdminSocialPage() {
  const [socials, setSocials] = useState<any[]>([
    { id: 1, platform: 'Facebook', url: 'https://facebook.com/senpai-design' },
    { id: 2, platform: 'Instagram', url: 'https://instagram.com/senpai-design' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    platform: SOCIAL_PLATFORMS[0],
    url: '',
  });

  const handleAddSocial = (e: React.FormEvent) => {
    e.preventDefault();
    const newSocial = {
      id: Date.now(),
      ...formData,
    };
    setSocials([...socials, newSocial]);
    setFormData({ platform: SOCIAL_PLATFORMS[0], url: '' });
    setShowForm(false);
  };

  const handleDeleteSocial = (id: number) => {
    setSocials(socials.filter(s => s.id !== id));
  };

  return (
    <main className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-bold">Social Media Links</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 px-6 py-3 rounded-lg font-bold"
          >
            <Plus size={20} /> Add Link
          </motion.button>
        </motion.div>

        {/* Add Social Form */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleAddSocial}
            className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 mb-12"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-3">Platform</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400/50"
                >
                  {SOCIAL_PLATFORMS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-3">Profile URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400/50"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 py-3 rounded-lg font-bold"
              >
                Add Social Link
              </motion.button>
            </div>
          </motion.form>
        )}

        {/* Social List */}
        <div className="grid gap-4">
          {socials.map((social, i) => (
            <motion.div
              key={social.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold">{social.platform}</h3>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  {social.url}
                </a>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => handleDeleteSocial(social.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={20} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
