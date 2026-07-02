import React, { useState, useRef, useEffect } from 'react';
import { Phone, MessageCircle, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PhoneActionMenu = ({ phoneNumber, className, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Clean the phone number for links
  const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = [
    {
      label: 'Direct Call',
      icon: <Phone size={14} />,
      href: `tel:${cleanNumber}`,
      color: 'hover:bg-blue-500/20 hover:text-blue-400'
    },
    {
      label: 'WhatsApp Message',
      icon: <MessageCircle size={14} />,
      href: `https://wa.me/${cleanNumber.replace('+', '')}`,
      color: 'hover:bg-green-500/20 hover:text-green-400'
    },
    {
      label: 'WhatsApp Call',
      icon: <Video size={14} />,
      href: `https://wa.me/${cleanNumber.replace('+', '')}`,
      color: 'hover:bg-green-500/20 hover:text-green-400'
    }
  ];

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button 
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }} 
        className={className}
      >
        {children || phoneNumber}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 mb-2 w-48 bg-[#0f172a] border border-white/10 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 overflow-hidden backdrop-blur-xl p-1"
          >
            {options.map((option, idx) => (
              <a
                key={idx}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-300 rounded-lg transition-colors duration-200 ${option.color}`}
              >
                {option.icon}
                {option.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhoneActionMenu;
