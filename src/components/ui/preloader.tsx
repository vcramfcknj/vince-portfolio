"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "হ্যালো"]

const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 },
  },
}
const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 },
  },
}

interface PreloaderProps {
  onComplete?: () => void
  onExit?: () => void
}

export default function Preloader({ onComplete, onExit }: PreloaderProps) {
 
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    ;(window as any).__isCurtainDown = true;
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDimension({ width: window.innerWidth, height: window.innerHeight })
    
    // Strict scroll lock
    const preventScroll = (e: Event) => e.preventDefault()
    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })
    document.body.style.overflow = 'hidden'

    // Also try stopping Lenis if it loads later
    const interval = setInterval(() => {
      if ((window as any).__lenis) {
        (window as any).__lenis.stop()
        clearInterval(interval)
      }
    }, 100)

    return () => {
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
      document.body.style.overflow = ''
      clearInterval(interval)
      if ((window as any).__lenis) {
        (window as any).__lenis.start()
      }
    }
  }, [])

  useEffect(() => {
    if (index === words.length - 1) {
      // Start exit animation after showing the last word
      setTimeout(() => {
        setIsExiting(true)
        ;(window as any).__isCurtainDown = false
        window.dispatchEvent(new CustomEvent('curtain-exiting', { detail: { duration: 0.8 } }))
        onExit?.()
        // Call onComplete after exit animation
        setTimeout(() => {
          onComplete?.()
        }, 1000)
      }, 1000)
      return
    }

    const timer = setTimeout(
      () => {
        setIndex(index + 1)
      },
      index === 0 ? 1000 : 150,
    )
    
    return () => clearTimeout(timer)
  }, [index, onComplete])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 },
    },
  }


  return (
      <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      className="flex items-center justify-center bg-black"
      style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000' }}
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            style={{ position: 'relative', zIndex: 10, color: 'white', fontSize: '2rem', fontWeight: 400, display: 'flex', alignItems: 'center' }}
          >
            {words[index]}
          </motion.p>
          <svg style={{ position: 'absolute', top: 0, width: '100%', height: 'calc(100% + 300px)' }}>
            <motion.path variants={curve} initial="initial" animate={isExiting ? "exit" : "initial"} fill="#070b13" />
          </svg>
        </>
      )}
    </motion.div>
  );
}
