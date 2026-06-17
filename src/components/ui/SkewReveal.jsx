'use client'

import { motion } from 'framer-motion'

export default function SkewReveal({ 
  children, 
  delay = 0, 
  duration = 0.8,
  className = ''
}) {
  return (
    <div style={{ overflow: 'hidden' }} className={className}>
      <motion.div
        initial={{ y: '120%', skewY: 8, opacity: 0 }}
        whileInView={{ y: '0%', skewY: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ 
          duration: duration, 
          delay: delay, 
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{ transformOrigin: 'top left' }}
      >
        {children}
      </motion.div>
    </div>
  )
}