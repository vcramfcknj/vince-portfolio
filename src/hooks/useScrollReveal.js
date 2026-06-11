'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Bidirectional scroll reveal hook.
 * Returns [ref, isVisible].
 * isVisible is true when the element is in the viewport, false when it leaves.
 * This drives both fade-in (on scroll down) and fade-out (on scroll up).
 */
export default function useScrollReveal({
  threshold = 0.12,
  rootMargin = '0px 0px -6% 0px',
} = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, visible]
}
