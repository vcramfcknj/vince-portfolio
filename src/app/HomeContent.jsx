'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader from '@/components/ui/preloader'
import EnhancedHero from '@/components/EnhancedHero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Certificates from '@/components/Certificates'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

// This variable persists during client-side navigation but resets on hard refresh
let hasShownPreloader = false;

export default function HomeContent() {
  const [showPreloader, setShowPreloader] = useState(!hasShownPreloader)

  useEffect(() => {
    // Ensure it doesn't show again even if they navigate away early
    hasShownPreloader = true;
  }, [])

  const handlePreloaderComplete = () => {
    hasShownPreloader = true;
    setShowPreloader(false)
  }

  return (
    <>
      <AnimatePresence>
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <main>
        <EnhancedHero />
        <About />
        <Experience />
        <Projects />
        <Certificates />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
