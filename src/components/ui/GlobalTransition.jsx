'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'

export default function GlobalTransition({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [dimension, setDimension] = useState({ width: 0, height: 0 })


  const [isActive, setIsActive] = useState(false)
  const [targetPath, setTargetPath] = useState(null)


  const [displayTitle, setDisplayTitle] = useState("Home")

  // Static assets are real browser downloads/views, never router routes.
  const FILE_LINK = /\.(pdf|docx?|xlsx?|pptx?|zip|rar|csv|txt|md|json|xml|png|jpe?g|gif|webp|avif|svg|ico|mp3|mp4|webm|mov|woff2?|ttf|eot)$/i

  const TITLES = {
    '/': 'Home',
    '/about': 'About',
    '/projects': 'Projects',
    '/contact': 'Contact',
    '/cv': 'Résumé',
    '/privacy': 'Privacy',
    '/terms': 'Terms',
    '/disclaimer': 'Disclaimer',
  }

  const retract = () => {
    setIsActive(false)
    setTargetPath(null)
    window.__isCurtainDown = false
    window.dispatchEvent(new CustomEvent('curtain-exiting', { detail: { duration: 0.45 } }))
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDimension({ width: window.innerWidth, height: window.innerHeight })


    const handleLinkClick = (e) => {
      const anchor = e.target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')

      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return

      // Let the browser handle anything that is not an in-app route: new tabs,
      // downloads and files such as the résumé PDF.
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return

      const url = new URL(anchor.href)

      if (url.origin !== window.location.origin) return
      if (FILE_LINK.test(url.pathname)) return

      if (url.pathname === window.location.pathname && url.hash) return

      if (url.pathname !== window.location.pathname) {
        e.preventDefault()
        e.stopPropagation()

        const title = TITLES[url.pathname] || (url.pathname.startsWith('/projects/') ? 'Project' : 'Vince Rubang')

        setDisplayTitle(title)
        setTargetPath(href)
        setIsActive(true)
        window.__isCurtainDown = true

        // Watchdog: if the route never lands (failed push, off-by-router
        // redirect), the pathname effect can't fire and the curtain would
        // stay down forever. Retract instead of leaving a black screen.
        const fromPath = window.location.pathname
        setTimeout(() => {
          if (window.location.pathname === fromPath) retract()
        }, 2500)
      }
    }


    document.addEventListener('click', handleLinkClick, true)
    return () => document.removeEventListener('click', handleLinkClick, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- the interceptor only reads live DOM/window state and stable setters, so it must bind once.
  }, [])

  const handleCoverComplete = () => {
    if (targetPath && isActive) {
      router.push(targetPath)
    }
  }


  useEffect(() => {
    if (isActive) {

      const timer = setTimeout(() => {
        retract()
      }, 350)
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- the curtain timer must key off pathname (the actual navigation) and intentionally not isActive, which would restart the timeout mid-transition.
  }, [pathname])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
  const flatPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`


  const curveVariants = {
    initial: {
      d: flatPath
    },
    enter: {
      d: flatPath,
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`, // flat path but wait, we need the SVG to move!
    }
  }

  const slideVariants = {
    initial: {
      y: "100vh", // Start below screen using hardware-accelerated transform
    },
    enter: {
      y: "0vh", // Slide up to cover screen
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      y: "-100vh", // Glide up to reveal screen
      transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
    }
  }

  return (
    <>
      <AnimatePresence>
        {isActive && dimension.width > 0 && (
          <motion.div
            key="transition-overlay"
            variants={slideVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            onAnimationComplete={(definition) => {
              if (definition === "enter") {
                handleCoverComplete()
              }
            }}
            className="flex items-center justify-center bg-black"
            style={{
              zIndex: 9998,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000000',
              pointerEvents: 'auto',
              willChange: 'transform',
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              style={{
                position: 'relative',
                zIndex: 10,
                color: 'white',
                fontSize: '2.5rem',
                fontWeight: 400,
                display: 'flex',
                alignItems: 'center',
                willChange: 'transform, opacity',
              }}
            >
              • {displayTitle} •
            </motion.p>

            {/* SVG for the bottom curve when gliding up */}
            <svg style={{ position: 'absolute', top: '100%', left: 0, width: '100%', height: '300px', willChange: 'transform', transform: 'translateZ(0)' }}>
              <path
                d={`M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 300 0 0 L0 0`}
                fill="#000000"
              />
            </svg>

            {/* SVG for the top curve when coming from bottom */}
            <svg style={{ position: 'absolute', bottom: '100%', left: 0, width: '100%', height: '300px', willChange: 'transform', transform: 'rotate(180deg) translateZ(0)' }}>
              <path
                d={`M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 300 0 0 L0 0`}
                fill="#000000"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
