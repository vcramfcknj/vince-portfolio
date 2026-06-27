'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader from '@/components/ui/preloader'
import EnhancedHero from '@/components/EnhancedHero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'

export default function HomeContent() {
  const [showPreloader, setShowPreloader] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [instantHide, setInstantHide] = useState(false)

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

  const handlePreloaderComplete = () => {
    setShowPreloader(false)
  }

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
        <Projects />
        <Skills />
      </main>
    </>
  )
}
