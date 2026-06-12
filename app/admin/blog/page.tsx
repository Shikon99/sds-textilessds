'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
    author: '',
  });

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlog = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toLocaleDateString(),
    };
    setBlogs([newBlog, ...blogs]);
    setFormData({ title: '', description: '', content: '', image: '', author: '' });
    setShowForm(false);
  };

  const handleDeleteBlog = (id: number) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

  return (
    <main className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-bold">Manage Blog Posts</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 px-6 py-3 rounded-lg font-bold"
          >
            <Plus size={20} /> Add Blog
          </motion.button>
        </motion.div>

        {/* Add Blog Form */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleAddBlog}
            className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 mb-12"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Blog Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="md:col-span-2 bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400/50"
                required
              />
              <input
                type="text"
                placeholder="Author Name"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400/50"
                required
              />
              <input
                type="url"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400/50"
              />
              <textarea
                placeholder="Short Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="md:col-span-2 bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400/50"
                rows={3}
                required
              />
              <textarea
                placeholder="Full Blog Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="md:col-span-2 bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400/50"
                rows={6}
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="md:col-span-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 py-3 rounded-lg font-bold"
              >
                Publish Blog
              </motion.button>
            </div>
          </motion.form>
        )}

        {/* Blog List */}
        <div className="grid gap-6">
          {blogs.length === 0 ? (
            <p className="text-gray-400 text-center py-12">No blogs yet. Create your first blog post!</p>
          ) : (
            blogs.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 flex justify-between items-start"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-400 mb-2">{blog.description}</p>
                  <p className="text-sm text-gray-500">By {blog.author} • {blog.createdAt}</p>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit2 size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleDeleteBlog(blog.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
