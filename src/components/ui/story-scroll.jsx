'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './story-scroll.module.css'

export default function FlowArt({ children, 'aria-label': ariaLabel, className = '' }) {
  const targetRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Translates the horizontal track. We go slightly less than -100% so the last item is visible without scrolling fully out of view.
  // Using -100% of the scroll track width plus 100vw offset.
  // Since the scroll track contains all children, its width is childrenCount * 100%.
  // To reach the last child, we move the track to the left by ((childrenCount - 1) / childrenCount) * 100%.
  const childrenCount = React.Children.count(children)
  const endX = `-${((childrenCount - 1) / childrenCount) * 100}%`
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", endX])

  return (
    <section 
      ref={targetRef} 
      className={`${styles.flowContainer} ${className}`} 
      aria-label={ariaLabel}
      style={{ height: `${childrenCount * 100}vh` }}
    >
      <div className={styles.stickyWrapper}>
        <motion.div style={{ x }} className={styles.scrollTrack}>
          {children}
        </motion.div>
      </div>
    </section>
  )
}

export function FlowSection({ children, className = '', style }) {
  return (
    <div className={`${styles.flowSection} ${className}`} style={style}>
      {children}
    </div>
  )
}
