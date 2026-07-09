import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionAnimatorProps {
  children: ReactNode;
  className?: string;
}

const SectionAnimator = ({ children, className = '' }: SectionAnimatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SectionAnimator;