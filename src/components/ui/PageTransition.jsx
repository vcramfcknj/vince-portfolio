'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const opacity = {
  initial: { opacity: 0 },
  enter: { opacity: 0.75, transition: { duration: 1, delay: 0.2 } },
}

const slideUp = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
}

export default function PageTransition({ children }) {
  const pathname = usePathname()
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Start with curtain down
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsExiting(false)
    
    // Pull the curtain up after a delay
    const timer = setTimeout(() => {
      setIsExiting(true)
    }, 500) // 500ms delay gives the page time to render behind the black screen
    
    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  }

  // Determine the display title based on route
  let title = "Home"
  if (pathname === '/about') title = "About"
  else if (pathname === '/projects') title = "Projects"
  else if (pathname === '/contact') title = "Contact"
  else if (pathname.startsWith('/projects/')) title = "Project"

  return (
    <>
      <motion.div
        variants={slideUp}
        initial="initial"
        animate={isExiting ? "exit" : "initial"}
        className="flex items-center justify-center bg-black"
        style={{
          zIndex: 9998, // Sit just below the main Preloader
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          pointerEvents: isExiting ? 'none' : 'auto',
        }}
      >
        {dimension.width > 0 && (
          <>
            <motion.p
              variants={opacity}
              initial="initial"
              animate={isExiting ? "exit" : "enter"}
              style={{
                position: 'relative',
                zIndex: 10,
                color: 'white',
                fontSize: '2.5rem',
                fontWeight: 400,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              • {title} •
            </motion.p>
            <svg style={{ position: 'absolute', top: 0, width: '100%', height: 'calc(100% + 300px)' }}>
              <motion.path
                variants={curve}
                initial="initial"
                animate={isExiting ? "exit" : "initial"}
                fill="#000000"
              />
            </svg>
          </>
        )}
      </motion.div>
      {children}
    </>
  )
}
