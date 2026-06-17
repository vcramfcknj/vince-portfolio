'use client'

import { useEffect, useRef, useState } from 'react'

export default function InvertedSpotlight({ radius = 300 }) {
  const spotlightRef = useRef(null)
  const [opacity, setOpacity] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const parent = spotlightRef.current?.parentElement
    if (!parent) return

    const handleMouseMove = (e) => {
      const rect = parent.getBoundingClientRect()
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const handleMouseEnter = () => setOpacity(1)
    const handleMouseLeave = () => setOpacity(0)

    parent.addEventListener('mousemove', handleMouseMove)
    parent.addEventListener('mouseenter', handleMouseEnter)
    parent.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove)
      parent.removeEventListener('mouseenter', handleMouseEnter)
      parent.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={spotlightRef}
      style={{
        position: 'absolute',
        top: position.y - radius / 2,
        left: position.x - radius / 2,
        width: radius,
        height: radius,
        borderRadius: '50%',
        backgroundColor: '#fff',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 50,
        opacity: opacity,
        transition: 'opacity 0.3s ease',
        filter: 'blur(50px)',
      }}
    />
  )
}
