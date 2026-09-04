'use client'

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const Lanyard = dynamic(() => import('./Lanyard'), { ssr: false })

export default function DynamicLanyard(props) {
  const containerRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { rootMargin: '100px 0px 0px 0px', threshold: 0.1 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {isInView && <Lanyard {...props} />}
    </div>
  )
}

