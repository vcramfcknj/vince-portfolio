'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './MagneticBubble.module.css';

export default function MagneticBubble({ children, title, floatDelay = 0 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // The bubble moves towards the mouse, but only a fraction of the distance (magnetic pull)
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={styles.bubbleContainer}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: floatDelay 
        }}
        className={styles.bubble}
      >
        <div className={styles.iconWrapper}>
          {children}
        </div>
      </motion.div>
      
      {title && (
        <div className={styles.tooltip}>
          {title}
        </div>
      )}
    </motion.div>
  );
}
