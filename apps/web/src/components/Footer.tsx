import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import OptimizedImage from './OptimizedImage';
import { apiClient } from '@/lib/apiClient';
import { supabase } from '@/lib/supabase';
import PhoneActionMenu from './PhoneActionMenu';

const XIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIAL_LINKS = {
  twitter: 'https://x.com/brokercoresolution',
  instagram: 'https://www.instagram.com/brokercoresolution_official',
  facebook: 'https://facebook.com/brokercoresolution',
};

const Footer = () => {
    const navigate = useNavigate();

    const handleNotImplemented = (e?: React.MouseEvent) => {
        e?.preventDefault();
        toast({
            title: "Coming Soon 🚧",
            description: "This page is currently being redesigned.",
        });
    };

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        if (href.startsWith('/#')) {
            const id = href.split('#')[1];
            if (window.location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    if (id) {
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }, 100);
            } else {
                if (id) {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        } else if (href.startsWith('/')) {
            navigate(href);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            handleNotImplemented();
        }
    };

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

    const onSubmit = async (data: any) => {
        try {
            // Check if already subscribed
            const { data: existing, error: checkError } = await supabase
                .from('subscribers')
                .select('email')
                .eq('email', data.email)
                .single();

            if (existing) {
                toast({
                    title: "Already Subscribed",
                    description: "This email is already on our list!",
                });
                return;
            }

            const newSubscriber = {
                email: data.email,
                status: 'Active',
            };

            const { error: insertError } = await supabase.from('subscribers').insert(newSubscriber);
            
            if (insertError) throw insertError;

            toast({
                title: "Welcome Aboard! 🎉",
                description: "You've successfully subscribed to our insights newsletter.",
            });
            reset();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to subscribe. Please try again.",
                variant: "destructive"
            });
        }
    };

    const policies = [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms & Conditions', href: '/terms-and-conditions' },
        { name: 'Refund & Cancellation Policy', href: '/refund-policy' },
        { name: 'AML & Compliance Policy', href: '/aml-policy' },
    ];

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/#services' },
        { name: 'About Us', href: '/about-us' },
        { name: 'Our Blog', href: '/blog' },
        { name: 'Contact Sales', href: '/contact' },
        { name: 'Brokerage Calculator', href: '/calculator' },
    ];

    const [latestPosts, setLatestPosts] = useState([
        {
            title: 'Forex Broker Digital Marketing Funnel: From Lead to Trader',
            slug: 'forex-broker-digital-marketing-funnel',
            image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop&q=80'
        },
        {
            title: 'How to Launch a Forex Brokerage in 3 Days Using Turnkey Solutions',
            slug: 'how-to-launch-a-forex-brokerage-in-3-days',
            image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&auto=format&fit=crop&q=80'
        }
    ]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const savedBlogs = localStorage.getItem('adminBlogs');
                let localBlogs = [];
                if (savedBlogs) {
                    localBlogs = JSON.parse(savedBlogs);
                }
                
                const allBlogs = [...localBlogs, {
                    title: 'Forex Broker Digital Marketing Funnel: From Lead to Trader',
                    slug: 'forex-broker-digital-marketing-funnel',
                    cover_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop&q=80'
                },
                {
                    title: 'How to Launch a Forex Brokerage in 3 Days Using Turnkey Solutions',
                    slug: 'how-to-launch-a-forex-brokerage-in-3-days',
                    cover_image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&auto=format&fit=crop&q=80'
                }];
                
                const data = allBlogs.slice(0, 2);
                
                if (data && data.length > 0) {
                    setLatestPosts(data.map(post => ({
                        title: post.title,
                        slug: post.slug,
                        image: post.cover_image
                    })));
                }
            } catch (error) {
                console.error("Failed to load blog posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <footer className="bg-transparent transition-colors duration-500 pt-24 pb-8 relative overflow-hidden border-t border-black/5 dark:border-white/5">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-cyan/[0.03] rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Massive CTA Section */}
                <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md p-12 md:p-16 rounded-3xl border border-black/5 dark:border-white/5 mb-20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/5 to-white/5 dark:from-accent-cyan/10 dark:to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-12 relative z-10">
                        <div className="max-w-xl text-center lg:text-left">
                            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
                                Ready to launch your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white">Brokerage?</span>
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed">
                                Join the industry leaders and get access to exclusive market insights, regulatory updates, and technology trends.
                            </p>
                        </div>
                        <div className="w-full lg:w-auto">
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 w-full lg:w-[450px]">
                                <div className="relative w-full">
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email address" 
                                        {...register("email", { 
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className="w-full h-14 pl-6 pr-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:border-accent-cyan/50 focus:bg-black/10 dark:focus:bg-white/10 transition-all duration-300 backdrop-blur-md"
                                    />
                                    {errors.email && <span className="absolute -bottom-6 left-2 text-red-500 dark:text-red-400 text-xs">{errors.email.message as string}</span>}
                                </div>
                                <button onClick={() => { try { navigator.vibrate?.(50); } catch(e){} }} disabled={isSubmitting} type="submit" className="h-14 px-8 bg-gray-900 text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-bold rounded-xl transition-colors flex items-center justify-center shrink-0 disabled:opacity-50 group/btn">
                                    Subscribe <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <div className="mb-8">
                            <h3 className="text-4xl font-[900] tracking-tighter text-gray-900 dark:text-white flex items-center gap-2">
                                <span className="w-4 h-4 bg-gradient-to-br from-accent-cyan to-white rounded-sm inline-block"></span>
                                BROKERCORESOLUTION
                            </h3>
                            <p className="text-xs font-bold text-accent-cyan tracking-[0.2em] mt-2 uppercase">IT Solutions Est</p>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 font-light leading-relaxed max-w-sm">
                            Your trusted institutional partner in navigating the dynamic landscape of the global Forex market with Tier-1 infrastructure.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 font-light group cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:border-accent-cyan transition-colors">
                                    <Mail size={16} className="group-hover:text-accent-cyan transition-colors" />
                                </div>
                                <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=enquiry@brokercoresolution.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">enquiry@brokercoresolution.com</a>
                            </div>
                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 font-light group cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:border-accent-cyan transition-colors">
                                    <Phone size={16} className="group-hover:text-accent-cyan transition-colors" />
                                </div>
                                <PhoneActionMenu phoneNumber="+971 55 752 279" className="hover:text-gray-900 dark:hover:text-white transition-colors">+971 55 752 279</PhoneActionMenu>
                            </div>
                            <a href="https://maps.google.com/?q=2807,+Churchill+Executive+Tower,+Business+Bay,+Dubai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-600 dark:text-gray-400 font-light group cursor-pointer hover:text-accent-cyan transition-colors">
                                <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:border-accent-cyan transition-colors shrink-0">
                                    <MapPin size={16} className="group-hover:text-accent-cyan transition-colors" />
                                </div>
                                <span className="group-hover:text-accent-cyan transition-colors">2807, Churchill Executive Tower, Business Bay, Dubai.</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2 lg:ml-auto">
                        <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Company</h4>
                        <nav aria-label="Company Links">
                            <ul className="space-y-4">
                                {quickLinks.map(link => (
                                    <li key={link.name}>
                                        <a 
                                            href={link.href}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                            className="text-gray-600 dark:text-gray-400 font-light hover:text-accent-cyan transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20 group-hover:bg-accent-cyan transition-colors"></span>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Policies */}
                    <div className="lg:col-span-3">
                        <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Legal & Compliance</h4>
                        <nav aria-label="Legal and Compliance Links">
                            <ul className="space-y-4">
                                {policies.map(policy => (
                                    <li key={policy.name}>
                                        <a 
                                            href={policy.href}
                                            onClick={(e) => {
                                                if(policy.href === '#') handleNotImplemented(e);
                                                else handleNavClick(e, policy.href);
                                            }}
                                            className="text-gray-600 dark:text-gray-400 font-light hover:text-white transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20 group-hover:bg-white transition-colors"></span>
                                            {policy.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Latest Posts */}
                    <div className="lg:col-span-3">
                        <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Market Insights</h4>
                        <div className="space-y-6">
                            {loading ? (
                                <>
                                    <div className="flex gap-4 animate-pulse">
                                        <div className="w-20 h-16 shrink-0 rounded-xl bg-gray-200 dark:bg-white/10"></div>
                                        <div className="flex-1 space-y-2 py-1">
                                            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-full"></div>
                                            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-2/3"></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 animate-pulse">
                                        <div className="w-20 h-16 shrink-0 rounded-xl bg-gray-200 dark:bg-white/10"></div>
                                        <div className="flex-1 space-y-2 py-1">
                                            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-full"></div>
                                            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-2/3"></div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                latestPosts.map((post, idx) => (
                                    <div key={idx} className="flex gap-4 group cursor-pointer" onClick={() => {
                                        navigate(`/blog/${post.slug}`);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}>
                                        <div className="w-20 h-16 shrink-0 overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
                                            <OptimizedImage src={post.image} alt={post.title} width={80} height={64} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-accent-cyan transition-colors leading-snug line-clamp-3">
                                            {post.title}
                                        </h5>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>

                {/* Forex Risk Disclaimer */}
                <div className="mb-8 pt-8 border-t border-black/10 dark:border-white/10">
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400 font-light text-justify">
                        <strong className="text-gray-900 dark:text-gray-300 font-semibold">High-Risk Investment Warning:</strong> Trading Foreign Exchange (Forex) and Contracts for Differences (CFDs) is highly speculative, carries a high level of risk, and may not be suitable for all investors. You may sustain a loss of some or all of your invested capital, therefore, you should not speculate with capital that you cannot afford to lose. You should be aware of all the risks associated with trading on margin. BrokerCore Solution provides institutional technology and liquidity solutions. We do not offer financial advice, portfolio management, or act as an executing broker for retail clients. Please ensure you fully understand the risks involved and seek independent advice if necessary.
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-gray-500 font-light">
                        &copy; {new Date().getFullYear()} BROKERCORESOLUTION IT Solutions Est. All rights reserved.
                    </p>
                    
                    <div className="flex gap-4">
                        <a 
                            href={SOCIAL_LINKS.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Follow us on X (Twitter)"
                            className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
                        >
                            <XIcon size={16} />
                        </a>
                        <a 
                            href={SOCIAL_LINKS.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Follow us on Instagram"
                            className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
                        >
                            <Instagram size={16} />
                        </a>
                        <a 
                            href={SOCIAL_LINKS.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Follow us on Facebook"
                            className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
                        >
                            <Facebook size={16} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Hidden HTML Sitemap for SEO Crawlers */}
            <div className="sr-only" aria-hidden="true">
                <h2>HTML Site Map</h2>
                <nav aria-label="Full Site Map">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about-us">About Us</a></li>
                        <li><a href="/calculator">Brokerage Calculator</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/blog">Our Blog</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        <li><a href="/terms-and-conditions">Terms & Conditions</a></li>
                        <li><a href="/refund-policy">Refund Policy</a></li>
                        <li><a href="/aml-policy">AML Policy</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;