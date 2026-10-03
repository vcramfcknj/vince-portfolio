'use client'

import { useState, useEffect } from 'react'
import styles from './ScrollToTop.module.css'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [lift, setLift] = useState(0)

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

  /* The footer's right-hand column (legal links) lives exactly where this
     button sits, so at the bottom of the page the two overlap — which also
     makes the last link unclickable. Raise the button by the footer's own
     height while the footer is on screen. */
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(([entry]) => {
      setLift(entry.isIntersecting ? Math.ceil(entry.boundingClientRect.height) : 0)
    }, { threshold: 0.01 })

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button 
      className={`${styles.scrollToTop} ${visible ? styles.visible : ''}`} 
      style={{ '--scrolltop-lift': `${lift}px` }}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  )
}
