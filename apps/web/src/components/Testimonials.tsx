import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const testimonials = [
  {
    id: 1,
    name: 'Tariq Al-Fayed',
    role: 'Institutional Broker CEO, Dubai',
    content: 'Broker Core Solution lives up to its name. They provided the foundational core our brokerage needed—from rapid corporate structuring to a flawless MT5 turnkey deployment. The operational stability has been exceptional from day one.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Elena Rostova',
    role: 'Fintech Founder, Cyprus',
    content: 'Building an institutional framework from scratch was daunting until we partnered with Broker Core Solution. Their CySEC-ready infrastructure became the core of our operations, cutting our time-to-market by 70%. A truly indispensable B2B partner.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Wei Chen',
    role: 'Brokerage Operations Manager, Singapore',
    content: 'The backend ecosystem provided by Broker Core Solution is phenomenal. They delivered a true \'core solution\' where our CRM, liquidity pools, and payment gateways operate in perfect sync, completely automating our client workflows.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'Marcus Thorne',
    role: 'Prop Firm Founder, London',
    content: 'As a proprietary trading firm, a robust core infrastructure is non-negotiable. Broker Core Solution’s Tier-1 liquidity bridges and ultra-low latency VPS have handled our high-frequency EA trading volume flawlessly without a single bottleneck.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const Testimonials = () => {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

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
  const canScrollRight = currentIndex < testimonials.length - itemsPerPage;

  const scroll = (direction) => {
    let newIndex = currentIndex;
    if (direction === 'left' && canScrollLeft) {
      newIndex = Math.max(0, currentIndex - 1);
    } else if (direction === 'right' && canScrollRight) {
      newIndex = Math.min(testimonials.length - itemsPerPage, currentIndex + 1);
    }

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      if (scrollContainerRef.current) {
        const card = scrollContainerRef.current.children[newIndex];
        if(card) {
          scrollContainerRef.current.scrollTo({
            left: card.offsetLeft,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  return (
    <section id="testimonials" className="py-24 transition-colors duration-500 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white italic font-light">Industry Leaders</span>
            </h2>
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
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-[calc(100%-10px)] md:w-[calc(50%-12px)] snap-start"
            >
              <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md p-10 lg:p-12 rounded-3xl h-full flex flex-col border border-black/5 dark:border-white/5 hover:border-white/30 dark:hover:border-white/30 transition-all duration-500 relative group overflow-hidden shadow-lg dark:shadow-none">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full -mr-24 -mt-24 transition-transform duration-700 group-hover:scale-110"></div>
                
                <Quote className="w-10 h-10 text-accent-cyan/40 dark:text-accent-cyan/20 mb-6 group-hover:text-accent-cyan/60 dark:group-hover:text-accent-cyan/40 transition-colors duration-500" />
                
                <p className="text-gray-800 dark:text-white text-lg md:text-xl leading-relaxed font-light mb-8 flex-grow">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center mt-auto">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-accent-cyan/20 blur-md group-hover:bg-accent-cyan/40 transition-colors duration-500"></div>
                    <OptimizedImage width={64} height={64} className="w-16 h-16 rounded-full mr-5 object-cover border-2 border-black/10 dark:border-white/10 relative z-10" alt={testimonial.name} src={testimonial.avatar} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white tracking-wide text-lg">{testimonial.name}</p>
                    <p className="text-sm text-accent-cyan font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end md:hidden">
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 text-gray-900 dark:text-white flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 text-gray-900 dark:text-white flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;