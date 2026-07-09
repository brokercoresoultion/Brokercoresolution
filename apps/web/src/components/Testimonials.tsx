import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Quote, Plus, X } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

import { supabase } from '@/lib/supabase';

const Testimonials = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });
    
    if (data && !error) {
      setReviews(data);
    }
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < reviews.length - itemsPerPage;

  const scroll = (direction: 'left' | 'right') => {
    let newIndex = currentIndex;
    if (direction === 'left' && canScrollLeft) {
      newIndex = Math.max(0, currentIndex - 1);
    } else if (direction === 'right' && canScrollRight) {
      newIndex = Math.min(reviews.length - itemsPerPage, currentIndex + 1);
    }

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      if (scrollContainerRef.current) {
        const card = scrollContainerRef.current.children[newIndex] as HTMLElement;
        if(card) {
          scrollContainerRef.current.scrollTo({
            left: card.offsetLeft,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) return;
    
    setIsSubmitting(true);
    const { error } = await supabase.from('testimonials').insert({
      name: formData.name,
      company: formData.company,
      content: formData.content,
      status: 'pending'
    });
    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Could not submit review. Please try again.",
        variant: "destructive"
      });
      return;
    }

    setIsModalOpen(false);
    setFormData({ name: '', company: '', content: '' });
    
    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback. It is pending admin approval.",
    });
  };

  return (
    <section id="testimonials" className="py-24 transition-colors duration-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl flex flex-col items-start gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
              Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white italic font-light">Experiences</span>
            </h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-cyan/10 border border-accent-cyan/20 hover:border-accent-cyan/50 hover:bg-accent-cyan/20 text-accent-cyan dark:text-white rounded-full transition-all duration-300 font-semibold text-sm"
            >
              <Plus size={16} />
              Add Your Review
            </button>
          </div>
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-14 h-14 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 text-gray-900 dark:text-white flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 hover:border-accent-cyan/50 dark:hover:border-accent-cyan/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-14 h-14 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 text-gray-900 dark:text-white flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 hover:border-accent-cyan/50 dark:hover:border-accent-cyan/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap gap-6 pb-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          {reviews.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-[calc(100%-10px)] md:w-[calc(50%-12px)] snap-start"
            >
              <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md p-10 lg:p-12 rounded-3xl h-full flex flex-col border border-black/5 dark:border-white/5 hover:border-white/30 dark:hover:border-white/30 transition-all duration-500 relative group overflow-hidden shadow-lg dark:shadow-none">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full -mr-24 -mt-24 transition-transform duration-700 group-hover:scale-110"></div>
                
                <Quote className="w-10 h-10 text-accent-cyan/40 dark:text-accent-cyan/20 mb-6 group-hover:text-accent-cyan/60 dark:group-hover:text-accent-cyan/40 transition-colors duration-500" />

                <p className="text-gray-800 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-light mb-8 flex-grow">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-16 h-16 rounded-full bg-accent-cyan/10 border-2 border-accent-cyan/30 flex items-center justify-center text-accent-cyan font-bold text-2xl">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white tracking-wide text-lg">{testimonial.name}</p>
                    {testimonial.company && <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-white/10 p-8 rounded-3xl w-full max-w-lg relative shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-white mb-6">Share Your Experience</h3>
            
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-400 mb-2">Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-cyan" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-400 mb-2">Company</label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-cyan" placeholder="Company Name" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-400 mb-2">Your Review</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-cyan resize-none"
                  placeholder="How did BrokerCore help your business?"
                ></textarea>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl px-4 py-3 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-cyan hover:bg-accent-cyan/90 text-black font-bold rounded-xl px-4 py-3 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};

export default Testimonials;