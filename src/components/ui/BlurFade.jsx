'use client'

import { motion } from 'framer-motion'

export default function BlurFade({ 
  children, 
  delay = 0, 
  yOffset = 24, 
  blur = '12px',
  duration = 0.6,
  className = ''
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: `blur(${blur})` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}