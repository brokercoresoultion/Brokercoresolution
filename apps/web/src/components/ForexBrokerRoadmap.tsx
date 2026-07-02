import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Building2, 
  FileCheck, 
  Scale, 
  Server, 
  MonitorPlay, 
  Laptop, 
  Users, 
  GitMerge, 
  Landmark, 
  Puzzle, 
  ShieldAlert, 
  Megaphone,
  ChevronDown
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Register Your Company",
    description: "Establishing the legal entity for the brokerage.",
    icon: Building2,
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    title: "Obtain Necessary Licenses",
    description: "Securing regulatory licenses required to operate as a broker.",
    icon: FileCheck,
    color: "from-cyan-400 to-teal-400"
  },
  {
    id: 3,
    title: "Comply with Regulatory Standard",
    description: "Aligning the business with target financial regulations and standards.",
    icon: Scale,
    color: "from-teal-400 to-emerald-400"
  },
  {
    id: 4,
    title: "Deploy Dedicated Hosting Server",
    description: "Setting up secure, low-latency servers to host trading infrastructure.",
    icon: Server,
    color: "from-emerald-400 to-green-400"
  },
  {
    id: 5,
    title: "Choose Reliable Trading Platform",
    description: "Selecting trading software (like MT4, MT5, or proprietary platforms) for clients.",
    icon: MonitorPlay,
    color: "from-green-400 to-lime-400"
  },
  {
    id: 6,
    title: "Develop a Responsive Website",
    description: "Building a user-friendly website for client onboarding and information.",
    icon: Laptop,
    color: "from-lime-400 to-yellow-400"
  },
  {
    id: 7,
    title: "Get a Customized CRM Software",
    description: "Deploying CRM software tailored for brokerages to manage accounts and leads.",
    icon: Users,
    color: "from-yellow-400 to-amber-400"
  },
  {
    id: 8,
    title: "Opt for a Suitable Gateway",
    description: "Setting up a bridge or gateway to connect the trading platform to liquidity providers.",
    icon: GitMerge,
    color: "from-amber-400 to-orange-400"
  },
  {
    id: 9,
    title: "Connect with Prime Liquidity",
    description: "Establishing relationships with liquidity providers to ensure smooth trade execution.",
    icon: Landmark,
    color: "from-orange-400 to-red-400"
  },
  {
    id: 10,
    title: "Install and Configure Plugins",
    description: "Adding auxiliary tools/plugins to the trading platform for advanced features.",
    icon: Puzzle,
    color: "from-red-400 to-rose-400"
  },
  {
    id: 11,
    title: "Setup Risk Management (RMS)",
    description: "Integrating tools to monitor and mitigate trading risks in real time.",
    icon: ShieldAlert,
    color: "from-rose-400 to-pink-400"
  },
  {
    id: 12,
    title: "Focus on Digital Marketing",
    description: "Running marketing campaigns to establish presence and attract traders.",
    icon: Megaphone,
    color: "from-pink-400 to-purple-400"
  }
];

const RoadmapStep = ({ step, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, x: isEven ? -50 : 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className={`flex items-center justify-between w-full mb-8 relative ${isEven ? 'flex-row-reverse md:flex-row' : 'flex-row-reverse'}`}
    >
      {/* Spacer for Desktop Layout */}
      <div className="hidden md:block w-5/12"></div>
      
      {/* Center Node */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <motion.div 
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
          className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${step.color} p-[2px] shadow-[0_0_15px_rgba(0,255,255,0.3)] z-10`}
        >
          <div className="w-full h-full bg-[#0B0B0B] rounded-full flex items-center justify-center">
            <step.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
        </motion.div>
      </div>
      
      {/* Content Card */}
      <div className="w-full md:w-5/12 pl-16 md:pl-0 z-10">
        <div className={`glass-card p-6 rounded-2xl border border-white/10 hover:border-accent-cyan/50 transition-all duration-300 relative group overflow-hidden ${isEven ? 'md:text-right' : 'md:text-left'}`}>
          <div className={`absolute top-0 w-1 h-full bg-gradient-to-b ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isEven ? 'md:right-0 left-0 md:left-auto' : 'left-0'}`}></div>
          
          <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
            <span className={`text-3xl md:text-5xl font-black opacity-10 bg-gradient-to-br ${step.color} bg-clip-text text-transparent absolute -top-2 ${isEven ? 'md:-left-2' : '-right-2'} md:-top-4 md:-right-4`}>
              {step.id}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white relative z-10">{step.title}</h3>
          </div>
          <p className="text-gray-400 text-sm md:text-base relative z-10">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ForexBrokerRoadmap = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
          >
            Roadmap To Become <br />
            <span className="text-gradient-primary">Successful Forex Broker</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Follow this comprehensive 12-step guide to launch and grow your own profitable Forex brokerage from scratch.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative pt-10">
          {/* Static Background Line */}
          <div className="absolute left-10 md:left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-white/5 z-0"></div>
          
          {/* Animated Growing Line */}
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-10 md:left-1/2 transform -translate-x-1/2 h-full w-[4px] rounded-full bg-gradient-to-b from-accent-cyan to-blue-500 z-0 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
          ></motion.div>
          
          {/* Steps */}
          {steps.map((step, index) => (
            <RoadmapStep key={step.id} step={step} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ForexBrokerRoadmap;
