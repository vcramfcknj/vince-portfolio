'use client'

import { useState, useEffect } from 'react'
import styles from './ScrollToTop.module.css'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls down 80% of viewport height
      if (window.scrollY > window.innerHeight * 0.8) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
    
    // Check immediately in case page is loaded already scrolled down
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button 
      className={`${styles.scrollToTop} ${visible ? styles.visible : ''}`} 
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  )
}
