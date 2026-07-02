import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogData } from '../data/blogData';
import OptimizedImage from './OptimizedImage';

const Insights = () => {
  const navigate = useNavigate();
  // Get first 3 posts
  const insights = blogData.slice(0, 3);
  return (
    <section id="insights" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white uppercase tracking-widest">
              In-Depth <span className="text-accent-cyan">Insights</span>
            </h2>
            <p className="text-gray-400 text-lg">Stay ahead of the curve with our expert analysis on technology, regulation, and market trends.</p>
          </div>
          <button onClick={() => navigate('/blog')} className="mt-6 md:mt-0 hidden md:inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full bg-white/5 hover:bg-white hover:text-black text-white transition-colors cursor-pointer uppercase text-sm font-bold tracking-widest group">
            View All News <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#121212] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 group cursor-pointer"
              onClick={() => navigate(`/blog/${insight.slug}`)}
            >
              <div className="aspect-video overflow-hidden relative">
                <OptimizedImage 
                  src={insight.image} 
                  alt={insight.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-accent-cyan uppercase tracking-wider">{insight.category}</span>
                  <span className="text-xs text-gray-500">{insight.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-accent-cyan transition-colors">{insight.title}</h3>
                <div onClick={(e) => { e.stopPropagation(); navigate(`/blog/${insight.slug}`); }} className="inline-flex items-center text-sm text-gray-400 group-hover:text-white transition-colors">
                  Read Article <ArrowRight size={16} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
