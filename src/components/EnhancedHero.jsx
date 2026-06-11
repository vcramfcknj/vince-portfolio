'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { useScroll } from '@/context/ScrollContext'

function WorldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  )
}

function ArrowDownRightIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="7" x2="17" y2="17" />
      <polyline points="17 7 17 17 7 17" />
    </svg>
  )
}

const BASE_SPEED = 0.28
const LERP_FACTOR = 0.028
const SCROLL_STRENGTH = 0.25
const SCROLL_DECAY = 0.84

function lerp(a, b, t) { return a + (b - a) * t }

function MarqueeTrack() {
  const trackRef = useRef(null)
  const posRef = useRef(0)
  const velRef = useRef(-BASE_SPEED)
  const targetRef = useRef(-BASE_SPEED)
  const scrollImpulseRef = useRef(0)
  const prevScrollRef = useRef(0)
  const lastTimeRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    lastTimeRef.current = performance.now()
    prevScrollRef.current = window.scrollY

    const onScroll = () => {
      const now = performance.now()
      const currentY = window.scrollY
      const deltaY = currentY - prevScrollRef.current
      const dt = Math.max(1, now - lastTimeRef.current)
      const scrollVel = (deltaY / dt) * 16.67
      scrollImpulseRef.current = -scrollVel * SCROLL_STRENGTH
      prevScrollRef.current = currentY
      lastTimeRef.current = now
    }

    const tick = () => {
      scrollImpulseRef.current *= SCROLL_DECAY
      targetRef.current = -BASE_SPEED + scrollImpulseRef.current
      velRef.current = lerp(velRef.current, targetRef.current, LERP_FACTOR)
      posRef.current += velRef.current
      const halfW = track.scrollWidth / 2
      if (posRef.current <= -halfW) posRef.current += halfW
      if (posRef.current > 0) posRef.current -= halfW
      track.style.transform = `translateX(${posRef.current}px)`
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const ITEM_STYLE = {
    display: 'inline-block',
    flexShrink: 0,
    fontSize: 'clamp(5rem, 14vw, 15rem)',
    fontFamily: 'var(--font-inter), sans-serif',
    fontWeight: 400,
    letterSpacing: '-0.03em',
    color: '#ffffff',
    whiteSpace: 'nowrap',
    paddingRight: '1em', /* space proportional to font size */
    userSelect: 'none',
    lineHeight: 1,
  }

  const TEXT = 'Vince Rubang \u2014 '
  return (
    <div ref={trackRef} style={{ display: 'flex', willChange: 'transform', transform: 'translateX(0px)' }}>
      <span style={ITEM_STYLE} aria-hidden="true">{TEXT}{TEXT}{TEXT}</span>
      <span style={ITEM_STYLE} aria-hidden="true">{TEXT}{TEXT}{TEXT}</span>
    </div>
  )
}

export default function Hero() {
  const { scrollProgress } = useScroll()
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section
      id="home"
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#999999',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 2rem'
      }}
    >


      {/* ── Right Text Block ── */}
      {mounted && (
        <div
          className="hero-fade-right"
          style={{
            position: 'absolute',
            right: isMobile ? '1.5rem' : '6rem',
            top: isMobile ? '35%' : '45%',
            transform: `translateY(${-50 + scrollProgress * 15}%)`,
            zIndex: 10,
            color: '#ffffff',
            fontFamily: 'var(--font-inter)',
            textAlign: isMobile ? 'right' : 'left',
          }}
        >
          <div style={{ marginBottom: '1rem', opacity: 0.8, display: 'flex', justifyContent: isMobile ? 'flex-end' : 'flex-start' }}>
            <ArrowDownRightIcon />
          </div>
          <div style={{
            fontSize: isMobile ? '1.8rem' : '2.2rem',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: '-0.02em'
          }}>
            BS IT Student<br />
            & Developer
          </div>
        </div>
      )}

      {/* ── Portrait ── */}
      {mounted && (
        <div
          className="hero-photo"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: isMobile ? '90%' : '45%',
            height: isMobile ? '65%' : '85%',
            zIndex: 5,
            opacity: 1,
          }}
        >
          <Image
            src="/images/vince.png"
            alt="Vince Rubang"
            fill
            sizes="(max-width: 768px) 90vw, 45vw"
            style={{
              objectFit: 'contain',
              objectPosition: 'bottom center',
            }}
            priority
          />
        </div>
      )}

      {/* ── Background Marquee ── */}
      <div
        className="hero-marquee"
        style={{
          position: 'absolute',
          bottom: '5%',
          left: 0,
          width: '100%',
          zIndex: 2, /* BEHIND the portrait */
          pointerEvents: 'none',
          opacity: Math.max(0, 1 - scrollProgress * 0.8),
        }}
      >
        <MarqueeTrack />
      </div>

      <style>{`
        .hero-fade-left { animation: heroFadeInLeft 1s cubic-bezier(0.25, 1, 0.5, 1) 0.2s both; }
        .hero-fade-right { animation: heroFadeInRight 1s cubic-bezier(0.25, 1, 0.5, 1) 0.3s both; }
        .hero-photo { animation: heroFadeUp 1s cubic-bezier(0.25, 1, 0.5, 1) 0.1s both; }
        .hero-marquee { animation: heroFadeIn 1s ease 0.4s both; }
        
        @keyframes heroFadeInRight {
          from { opacity: 0; transform: translate(20px, -50%); }
          to   { opacity: 1; transform: translate(0, -50%); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .hero-fade-left, .hero-fade-right, .hero-photo, .hero-marquee { animation: none; }
        }
      `}</style>
    </section>
  )
}