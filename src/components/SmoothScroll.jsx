'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,          // scroll duration (seconds) — higher = more inertia
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo easing
      smoothWheel: true,      // smooth mouse wheel
      touchMultiplier: 1.5,   // touch sensitivity
      infinite: false,
    })

    // Expose lenis globally so ScrollContext can subscribe to it
    window.__lenis = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return <>{children}</>
}
