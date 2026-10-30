'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useScroll } from '@/context/ScrollContext'
import MagneticButton from './ui/MagneticButton'
import { AVAILABILITY, RESUME } from '@/lib/site'

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
    color: '#def2f1',
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

export default function Hero({ isFirstLoad = false }) {
  const { scrollProgress } = useScroll()
  const [mounted, setMounted] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [animDuration, setAnimDuration] = useState(0.6)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    /* Breakpoints used to be a JS `isMobile` flag read off window.innerWidth,
       which only knew about 768px and never re-ran for anything else. Every
       hero breakpoint now lives in CSS below, so resizing never needs a
       re-render. */

    // Check if the curtain is down OR if this is the first load (Preloader will show)
    if (window.__isCurtainDown || isFirstLoad) {
      const handler = (e) => {
        if (e && e.detail && e.detail.duration) {
          setAnimDuration(e.detail.duration)
        }
        setShouldAnimate(true)
      }
      window.addEventListener('curtain-exiting', handler)
      return () => window.removeEventListener('curtain-exiting', handler)
    }
    setShouldAnimate(true)
  }, [isFirstLoad])

  return (
    <section
      id="home"
      className="hero-root"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#2b7a78',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 2rem'
      }}
    >
      <motion.div
        initial={{ y: "100vh" }}
        animate={{ y: shouldAnimate ? 0 : "100vh" }}
        transition={{ duration: animDuration, ease: [0.76, 0, 0.24, 1] }}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      >
        {/* ── Right Text Block ── */}
        {mounted && (
          <div
            className="hero-copy"
            style={{ '--hero-parallax': `${scrollProgress * 15}%` }}
          >
            <div
              className="hero-fade-right"
              style={{
                color: '#feffff',
                fontFamily: 'var(--font-inter)',
              }}
            >
              <div className="hero-arrow">
                <ArrowDownRightIcon />
              </div>
              <div className="hero-headline">
                BS InfoTech Graduate<br />
                & Developer
              </div>

              {/* Availability + résumé entry point. Both stay inside the existing
                  text block so the portrait and marquee never shift. */}
              <div className="hero-availability">
                {AVAILABILITY}
              </div>
              {/* Anchored to the block's right edge so the button always sits in
                  the gutter, never on top of the subject. */}
              <div className="hero-cta">
                <MagneticButton
                  as="a"
                  href={RESUME.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  text="Résumé"
                  icon="↗"
                  color="#feffff"
                  fillColor="#def2f1"
                  textColorHover="#17252a"
                  borderColor="rgba(254,255,255,0.5)"
                  bgColor="transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Portrait ── */}
        {mounted && (
          <div className="hero-portrait">
            <div className="hero-photo" style={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image
                src="/images/vince.png"
                alt="Vince Rubang"
                fill
                sizes="(max-width: 768px) 94vw, (max-width: 1440px) 50vw, 45vw"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                }}
                priority
              />
            </div>
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
        .hero-fade-right { animation: heroFadeInRight 1s cubic-bezier(0.25, 1, 0.5, 1) 0.3s both; }
        .hero-photo { animation: heroFadeUp 1s cubic-bezier(0.25, 1, 0.5, 1) 0.1s both; }
        .hero-marquee { animation: heroFadeIn 1s ease 0.4s both; }

        /* 100vh is the *largest* viewport on iOS/Android Chrome — with the URL bar
           up, the bottom of the hero (and the Résumé button) sits behind the
           browser chrome. dvh tracks the visible area; vh stays as the fallback
           for browsers that do not know the unit. */
        .hero-root {
          height: 100vh;
          height: 100dvh;
        }

        /* Wide screens keep the original composition exactly: portrait centred at
           45% wide, copy pinned to the right gutter. */
        .hero-copy {
          position: absolute;
          top: 45%;
          right: 6rem;
          z-index: 10;
          max-width: 46%;
          transform: translateY(calc(-50% + var(--hero-parallax, 0%)));
        }
        .hero-arrow { margin-bottom: 1rem; opacity: 0.8; display: flex; justify-content: flex-start; }
        .hero-headline { font-size: 2.2rem; font-weight: 400; line-height: 1.2; letter-spacing: -0.02em; }
        .hero-availability {
          margin-top: 1.1rem;
          font-size: 0.66rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(254, 255, 255, 0.86);
        }
        .hero-cta { display: flex; justify-content: flex-end; margin-top: 1.15rem; }
        .hero-portrait {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 45%;
          height: 85%;
          z-index: 5;
        }

        /* ── 769px – 1440px ──
           With the portrait centred, the copy's left edge (viewport − 508px)
           reached the subject's face below roughly 1440 CSS px — on this machine
           the CSS viewport is ~1280px because of the 2x DPR, so the text printed
           straight over the face. Anchor the portrait to the left edge and hand
           the whole right gutter to the copy: the two can no longer touch. */
        @media (max-width: 1440px) {
          .hero-portrait { left: 0; transform: none; width: min(50%, calc(100vw - 500px)); height: 78%; }
          .hero-copy { right: 2rem; top: 50%; max-width: 44%; }
          .hero-headline { font-size: clamp(1.5rem, 3.4vw, 2.2rem); }
        }

        /* ── ≤768px ── stack instead of overlay: copy in a band at the top, portrait
           bottom-anchored with its height capped to whatever the copy leaves above
           it, so it cannot climb into the text on short screens either. */
        @media (max-width: 768px) {
          .hero-portrait {
            width: 94%;
            height: min(78vh, calc(100vh - 260px));
            height: min(78dvh, calc(100dvh - 260px));
          }
          .hero-copy {
            left: 1.25rem;
            right: 1.25rem;
            top: 7%;
            max-width: none;
            text-align: right;
            transform: translateY(var(--hero-parallax, 0%));
          }
          .hero-arrow { justify-content: flex-end; }
          .hero-headline { font-size: clamp(1.45rem, 6.4vw, 1.9rem); }
          .hero-availability { letter-spacing: 0.12em; }
        }

        /* Landscape phones: too short to stack, so go back to the split layout */
        @media (max-width: 768px) and (max-height: 480px) {
          .hero-portrait { left: 0; transform: none; width: 44%; height: 96%; }
          .hero-copy { left: auto; top: 50%; right: 1rem; max-width: 50%; transform: translateY(calc(-50% + var(--hero-parallax, 0%))); }
          .hero-headline { font-size: clamp(1.15rem, 4.6vh, 1.5rem); }
          .hero-cta { margin-top: 0.8rem; }
        }

        @keyframes heroFadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-fade-right, .hero-photo, .hero-marquee { animation: none; }
        }
      `}</style>
      </motion.div>
    </section>
  )
}