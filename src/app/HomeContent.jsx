'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader from '@/components/ui/preloader'
import EnhancedHero from '@/components/EnhancedHero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Certificates from '@/components/Certificates'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'

export default function HomeContent() {
  const [showPreloader, setShowPreloader] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [instantHide, setInstantHide] = useState(false)

  /* eslint-disable react-hooks/set-state-in-effect -- intentional one-time sync
     with sessionStorage on mount: skip the preloader on repeat visits without a
     flash. Runs once ([] deps) and cannot be derived during render. */
  useEffect(() => {
    // Only show preloader if it hasn't been shown in this session
    const hasShown = sessionStorage.getItem('hasShownPreloader')
    if (!hasShown) {
      sessionStorage.setItem('hasShownPreloader', 'true')
    } else {
      setInstantHide(true)
      setShowPreloader(false)
      setIsFirstLoad(false)
    }
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  // Stable reference so the Preloader's word-cycle effect (which depends on
  // onComplete) is not restarted on every parent re-render.
  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false)
  }, [])

  return (
    <>
      {!instantHide && (
        <AnimatePresence>
          {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
        </AnimatePresence>
      )}

      <main>
        <EnhancedHero isFirstLoad={isFirstLoad} />
        <About />
        <Experience />
        <Certificates />
        <Projects />
        <Skills />
      </main>
    </>
  )
}
