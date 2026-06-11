'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'

const ScrollContext = createContext()

export function ScrollProvider({ children }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const prevScrollRef = useRef(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    lastTimeRef.current = Date.now()

    const handleScroll = ({ scroll, velocity }) => {
      const currentTime = Date.now()
      const deltaTime = Math.max(1, currentTime - lastTimeRef.current)
      const deltaScroll = scroll - prevScrollRef.current

      if (deltaTime > 0) {

        setScrollVelocity(velocity ?? deltaScroll / deltaTime)
      }

      const progress = Math.min(scroll / 2000, 1)
      setScrollProgress(progress)
      setScrollY(scroll)

      prevScrollRef.current = scroll
      lastTimeRef.current = currentTime
    }


    const attach = () => {
      const lenis = window.__lenis
      if (lenis) {
        lenis.on('scroll', handleScroll)
        return () => lenis.off('scroll', handleScroll)
      }


      const onScroll = () => {
        const currentY = window.scrollY
        handleScroll({ scroll: currentY, velocity: null })
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const timer = setTimeout(() => {
      const cleanup = attach()

      cleanupRef.current = cleanup
    }, 100)

    const cleanupRef = { current: null }

    return () => {
      clearTimeout(timer)
      if (cleanupRef.current) cleanupRef.current()
    }
  }, [])

  return (
    <ScrollContext.Provider value={{ scrollProgress, scrollY, scrollVelocity }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScroll() {
  const context = useContext(ScrollContext)
  if (!context) throw new Error('useScroll must be used within ScrollProvider')
  return context
}
