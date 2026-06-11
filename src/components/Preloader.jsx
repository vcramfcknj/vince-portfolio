'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Preloader({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0c0c0c',
      }}
    />
  )
}
