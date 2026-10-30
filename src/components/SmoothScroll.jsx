'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Lerp-based smoothing (exponential decay per frame) instead of a fixed
      // duration + easing. Duration-based scrolls (0.8s before) snap to a stop
      // after each wheel tick, which reads as "ruggish"; lerp gives the
      // continuous, floaty momentum used by showcase-style sites.
      lerp: 0.085,
      smoothWheel: true,      // smooth mouse wheel
      touchMultiplier: 1.5,   // touch sensitivity
      infinite: false,
    })

    // Expose lenis globally so components (hero parallax, scroll-to-top,
    // preloader gating) can subscribe to it or drive scrollTo()
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
