import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import DOMPurify from 'dompurify';
import OptimizedImage from '../components/OptimizedImage';
import { apiClient } from '@/lib/apiClient';
import { supabase } from '@/lib/supabase';

interface BlogPostData {
  slug: string;
  title: string;
  content: string;
  category: string;
  author_name: string;
  created_at: string;
  cover_image?: string;
  excerpt?: string;
}

const DUMMY_BLOGS = [
  {
    slug: 'future-of-forex-brokerage',
    title: 'The Future of Forex Brokerage: Trends to Watch',
    content: '<p>Explore the emerging technologies and regulatory shifts that will define the next decade of retail trading.</p>',
    category: 'Industry Trends',
    author_name: 'David Chen',
    created_at: new Date().toISOString(),
    cover_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800'
  },
  {
    slug: 'optimizing-mt5-performance',
    title: 'Optimizing MT5 Server Performance',
    content: '<p>Learn the technical configurations and hardware requirements needed to achieve sub-millisecond execution speeds.</p>',
    category: 'Technical',
    author_name: 'Sarah Jenkins',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    cover_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800'
  },
  {
    slug: 'crypto-payment-gateways',
    title: 'Integrating Crypto Gateways',
    content: '<p>How accepting cryptocurrency deposits can dramatically reduce friction and lower your operational costs.</p>',
    category: 'Payments',
    author_name: 'Michael Ross',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    cover_image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800'
  }
];

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialPost = location.state?.post || DUMMY_BLOGS.find(b => b.slug === slug) || null;
  const [post, setPost] = useState<BlogPostData | null>(initialPost);
  const [loading, setLoading] = useState(!initialPost);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPost = async () => {
      try {
        if (!post) setLoading(true);
        const { data: dbBlogs, error: supabaseError } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug);
        
        let localBlogs = dbBlogs || [];
        
        const allBlogs = [...localBlogs, ...DUMMY_BLOGS];
        const data = allBlogs.find(b => b.slug === slug);

        if (data) {
          setPost(data);
          // Safely attempt to increment view count
          supabase.rpc('increment_blog_view', { blog_slug: slug }).catch(e => console.log('View tracking error or not setup:', e));
        } else {
          setError('Post Not Found');
        }
      } catch (err) {
        setError('Error loading blog post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-4">Loading Post...</h1>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-4">{error || 'Post Not Found'}</h1>
        <button onClick={() => navigate('/blog')} className="text-accent-cyan hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white pt-24 pb-16 font-sans">
      <SEOHead 
        title={`${post.title} | BrokerCore Solution`}
        description={post.excerpt || `Read the full article on ${post.title} at BrokerCore Solution.`}
        keywords={`Forex, ${post.category}, BrokerCore Blog`}
      />

      <div className="container mx-auto px-6 max-w-4xl">
        <button 
          onClick={() => navigate('/blog')} 
          className="mb-8 flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex flex-wrap gap-4 items-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5 text-accent-cyan bg-accent-cyan/10 px-3 py-1 rounded-full">
              <Tag size={14} /> {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={14} /> {post.author_name}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-black/10 dark:border-white/10 relative">
            <OptimizedImage 
              src={post.cover_image} 
              alt={post.title} 
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#080B10] to-transparent opacity-60"></div>
          </div>

          <div 
            className="prose prose-lg dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-accent-cyan prose-a:no-underline hover:prose-a:underline max-w-none prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />

          <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-white to-accent-cyan flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">Written By</p>
                  <p className="font-bold text-lg text-gray-900 dark:text-white">{post.author_name}</p>
                </div>
              </div>
              <button className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors font-bold uppercase tracking-widest text-sm text-white">
                Share Article
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
