'use client'

import styles from './LaptopFrame.module.css'

/**
 * A pure-CSS MacBook-style device frame. Drop any <Image fill .../> (or other
 * media) in as children and it renders inside the 16:10 screen, cropped cover,
 * with a subtle zoom on hover.
 */
export default function LaptopFrame({ children, className = '' }) {
  return (
    <div className={`${styles.laptop} ${className}`}>
      <div className={styles.lid}>
        <div className={styles.screen}>{children}</div>
      </div>
      <div className={styles.base} />
    </div>
  )
}
