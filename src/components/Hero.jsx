'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Typewriter } from './ui/TypewriterText'
import MagneticButton from './ui/MagneticButton'

export default function Hero() {
  const marqueeRef = useRef(null)
  const animationRef = useRef(null)
  const velocityRef = useRef(0)
  const targetVelocityRef = useRef(-1)
  const positionRef = useRef(0)
  const prevScrollRef = useRef(0)
  const lastScrollTimeRef = useRef(0)

  // ============================================
  // MARQUEE MOTION TUNING PARAMETERS
  // ============================================
  // BASE_SPEED: Default continuous speed (pixels/frame)
  // - Lower = slower, more premium feel
  // - Range: 0.1 - 0.5 (0.2 recommended for luxury)
  const BASE_SPEED = 0.03

  // LERP_FACTOR: How quickly velocity interpolates to target
  // - Lower = slower direction transitions, more inertia (smoother)
  // - Higher = faster response (snappier)
  // - Range: 0.01 - 0.1 (0.02-0.04 recommended for premium)
  const LERP_FACTOR = 0.01

  // SCROLL_MULTIPLIER: Scroll influence on velocity
  // - Lower = subtler scroll response, more "floating" feel
  // - Range: 0.001 - 0.01 (0.003 recommended)
  const SCROLL_MULTIPLIER = 0.0005

  // DECELERATION: Natural slowdown when not scrolling
  // - Creates inertia/weight, smooths out jitter
  // - Range: 0.92 - 0.98 (0.95 recommended)
  const DECELERATION = 0.98

  const lerp = (a, b, t) => a + (b - a) * Math.min(t, 1)

  useEffect(() => {
    const marqueeElement = marqueeRef.current
    if (!marqueeElement) return

    const handleScroll = () => {
      const currentScroll = window.scrollY
      const deltaScroll = currentScroll - prevScrollRef.current
      const currentTime = Date.now()
      const deltaTime = currentTime - lastScrollTimeRef.current

      if (deltaTime > 0) {
        const scrollVelocity = (deltaScroll / deltaTime) * 16
        
        if (currentScroll > prevScrollRef.current) {
          targetVelocityRef.current = -BASE_SPEED - Math.abs(scrollVelocity) * SCROLL_MULTIPLIER
        } else if (currentScroll < prevScrollRef.current) {
          targetVelocityRef.current = BASE_SPEED + Math.abs(scrollVelocity) * SCROLL_MULTIPLIER
        }
      }

      prevScrollRef.current = currentScroll
      lastScrollTimeRef.current = currentTime
    }

    const animate = () => {
      // Smoothly interpolate velocity to target for premium feel
      velocityRef.current = lerp(velocityRef.current, targetVelocityRef.current, LERP_FACTOR)
      
      // Apply subtle inertia/deceleration for weight and smoothness
      if (Math.abs(targetVelocityRef.current) < 0.001) {
        velocityRef.current *= DECELERATION
      }
      
      positionRef.current += velocityRef.current

      const marqueeWidth = marqueeElement.scrollWidth / 2
      if (positionRef.current <= -marqueeWidth) {
        positionRef.current = 0
      } else if (positionRef.current >= 0) {
        positionRef.current = -marqueeWidth
      }

      marqueeElement.style.transform = `translateX(${positionRef.current}px)`
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  return (
    <section id="home" style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      background: '#999999',
    }}>

      {/* Photo */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '45%',
        height: '92%',
        zIndex: 1,
      }}
      className="hero-photo"
      >
        <Image
          src="/images/vince.png"
          alt="Vince Rubang"
          fill
          sizes="(max-width: 768px) 90vw, 45vw"
          style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
          priority
        />
      </div>

      {/* Marquee */}
      <div style={{
        position: 'absolute',
        bottom: '12%',
        left: 0,
        right: 0,
        overflow: 'hidden',
        zIndex: 2,
        pointerEvents: 'none',
      }}>
        <div 
          ref={marqueeRef}
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            fontFamily: 'var(--font-bebas), sans-serif',
            fontWeight: 400,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#fff',
            willChange: 'transform',
          }}>
          VINCE MARC JUSTINE O. RUBANG - VINCE MARC JUSTINE O. RUBANG - VINCE MARC JUSTINE O. RUBANG - VINCE MARC JUSTINE O. RUBANG - VINCE MARC JUSTINE O. RUBANG - VINCE MARC JUSTINE O. RUBANG -&nbsp;
        </div>
      </div>

      {/* Top-left tagline — hidden on mobile */}
      <div style={{
        position: 'absolute',
        top: '35%',
        left: '5rem',
        transform: 'translateY(-50%)',
        textAlign: 'left',
        zIndex: 3,
      }}
      className="hero-tagline"
      >
        <p style={{
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(12,12,12,0.55)',
          marginBottom: '0.75rem',
          fontFamily: 'var(--font-sans)',
        }}>
          BS IT Student
        </p>
        <h1 style={{
          fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          color: '#0c0c0c',
          letterSpacing: '-0.01em',
          fontFamily: 'var(--font-sans)',
          minHeight: '4em',
        }}>
          <Typewriter 
            text={[
              "Building Clean\nDigital Experiences", 
              "Crafting Premium\nWeb Applications", 
              "Engineering Modern\nUser Interfaces"
            ]}
            speed={60}
            deleteSpeed={30}
            delay={2000}
            loop={true}
          />
        </h1>
      </div>

      {/* Arrow indicator */}
      <div style={{
        position: 'absolute',
        top: '38%',
        left: '2.5rem',
        zIndex: 3,
        fontSize: '1.2rem',
        color: 'rgba(12,12,12,0.4)',
      }}
      className="hero-arrow"
      >
        &#8600;
      </div>

      {/* Mobile tagline — shown only on mobile, bottom left */}
      <div className="hero-tagline-mobile" style={{
        position: 'absolute',
        bottom: '22%',
        left: '1.5rem',
        zIndex: 3,
        textAlign: 'left',
      }}>
        <p style={{
          fontSize: '0.6rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(12,12,12,0.55)',
          marginBottom: '0.4rem',
          fontFamily: 'var(--font-sans)',
        }}>
          BS IT Student
        </p>
        <h1 style={{
          fontSize: '1.4rem',
          fontWeight: 700,
          lineHeight: 1.15,
          color: '#0c0c0c',
          letterSpacing: '-0.01em',
          fontFamily: 'var(--font-sans)',
          minHeight: '3em',
        }}>
          <Typewriter 
            text={[
              "Building Clean\nDigital Experiences", 
              "Crafting Premium\nWeb Applications", 
              "Engineering Modern\nUser Interfaces"
            ]}
            speed={60}
            deleteSpeed={30}
            delay={2000}
            loop={true}
          />
        </h1>
      </div>

      {/* Bottom-right Resume button */}
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        right: '1.5rem',
        zIndex: 3,
      }}>
        <MagneticButton 
          href="#" 
          text="Résumé" 
          icon="↗"
          color="#e8e4dc"
          fillColor="#e8e4dc"
          textColorHover="#0c0c0c"
          borderColor="rgba(232,228,220,0.5)"
        />
      </div>

      <style>{`
        /* Mobile styles */
        @media (max-width: 768px) {
          .hero-photo {
            width: 85% !important;
            height: 55% !important;
            bottom: auto !important;
            top: 0 !important;
            object-position: top center !important;
          }
          .hero-tagline { display: none !important; }
          .hero-arrow { display: none !important; }
          .hero-tagline-mobile { display: block !important; }
        }

        /* Desktop — hide mobile tagline */
        @media (min-width: 769px) {
          .hero-tagline-mobile { display: none !important; }
        }
      `}</style>

    </section>
  )
}