import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import OptimizedImage from '../components/OptimizedImage';
import { apiClient } from '@/lib/apiClient';

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data: dbBlogs, error: supabaseError } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });
        
        let localBlogs = dbBlogs || [];
        setBlogs(localBlogs);
        setFilteredBlogs(localBlogs);

        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(localBlogs.map((b: any) => b.category || 'General').filter(Boolean))] as string[];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error loading blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter(b => (b.category || 'General') === selectedCategory));
    }
  }, [selectedCategory, blogs]);

  return (
    <div className="min-h-screen text-white pt-24 pb-12">
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-1.5 border border-black/20 dark:border-white/20 rounded-full text-xs font-bold tracking-widest text-gray-900 dark:text-white mb-6 uppercase">
              Our Blog
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-[800] uppercase tracking-wider mb-6 leading-tight">
              Latest Insights <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white">& News</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stay updated with the latest trends, regulatory changes, and expert advice on running a successful Forex brokerage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-12 transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Category Filters */}
          {!loading && categories.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${selectedCategory === cat ? 'bg-accent-cyan text-black' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading && blogs.length === 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl h-[450px] animate-pulse"></div>
              ))}
            </div>
          ) : error ? (
             <div className="text-center py-20 text-red-500">{error}</div>
          ) : filteredBlogs.length === 0 ? (
             <div className="text-center py-20 text-gray-500">No blog posts found in this category.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((post, index) => (
                <motion.div
                  key={post.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => navigate(`/blog/${post.slug}`, { state: { post } })}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-accent-cyan/30 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all duration-500 group flex flex-col h-full cursor-pointer shadow-none"
                >
                  {/* Image Container with Zoom effect */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <OptimizedImage 
                      src={post.cover_image} 
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 bg-accent-cyan text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.author_name}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-accent-cyan transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag: string) => (
                          <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <button className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white group-hover:text-accent-cyan transition-colors mt-auto w-fit">
                      READ MORE <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {!loading && blogs.length > 0 && (
            <div className="mt-16 text-center">
              <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold uppercase tracking-widest text-sm transition-colors text-white">
                Load More Posts
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default Blog;
