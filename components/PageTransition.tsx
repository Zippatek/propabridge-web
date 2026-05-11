'use client';

import { motion } from 'framer-motion';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ ease: 'easeInOut', duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
