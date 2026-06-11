'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from '@/context/ThemeContext'
import StaggeredMenu from '@/components/ui/StaggeredMenu'
import styles from './Navbar.module.css'

const navLinks = [
  { num: '01', label: 'Home',       href: '/#home'       },
  { num: '02', label: 'About',      href: '/about'       },
  { num: '03', label: 'Experience', href: '/#experience' },
  { num: '04', label: 'Projects',   href: '/projects'    },
  { num: '05', label: 'Contact',    href: '/#contact'    },
]

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

/* Animated hamburger → X */
function HamburgerIcon({ open }) {
  return (
    <span className={styles.hamburger} aria-hidden="true">
      <span className={`${styles.bar} ${open ? styles.barTopOpen : ''}`} />
      <span className={`${styles.bar} ${open ? styles.barMidOpen : ''}`} />
      <span className={`${styles.bar} ${open ? styles.barBotOpen : ''}`} />
    </span>
  )
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [isMobile,  setIsMobile]  = useState(false)
  const { theme, toggleTheme }    = useTheme()
  const pathname                  = usePathname()
  const timeoutRef                = useRef(null)

  const isSubPage = pathname !== '/'

  /* ── Scrolled state ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (isSubPage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScrolled(true)
      return
    }

    const onScroll = () => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setScrolled(window.scrollY > 60)
      }, 60)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timeoutRef.current)
    }
  }, [isSubPage])

  /* ── Mobile detection ───────────────────────────────────────────────────── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 820)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <>
      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      {!isMobile && (
        <div className={`${styles.navWrapper} ${(!isSubPage && scrolled) ? styles.navWrapperHidden : ''}`}>
          <nav
            className={`${styles.nav} ${(scrolled || isSubPage) ? styles.navScrolled : ''}`}
            aria-label="Main navigation"
          >
            <div className={styles.logoWrapper}>
              <Link
                href="/"
                className={styles.logoText}
                aria-label="Home"
                onClick={(e) => {
                  if (pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <span className={styles.logoNormal}>© Code by Vince</span>
                <span className={styles.logoHover}>© v1nchnzo</span>
              </Link>
            </div>

            {/* Desktop links */}
            <ul className={styles.navList} role="list">
              {navLinks.map((link) => {
                const linkPath = link.href.split('#')[0]
                const isActive = linkPath !== '/' && (pathname === linkPath || pathname.startsWith(linkPath + '/'))
                return (
                  <li key={link.num}>
                    <Link href={link.href} className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
                      <span className={styles.navLabel}>{link.label}</span>
                      <span className={styles.navDot} aria-hidden="true" />
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Theme toggle — shown in pill nav */}
            <button
              onClick={toggleTheme}
              className={styles.themeBtn}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </nav>
        </div>
      )}

      {/* ── Staggered Menu (Mobile only on sub-pages, always on homepage) ── */}
      <div className={`${styles.staggeredMenuContainer} ${(!isMobile && !scrolled && !isSubPage) ? styles.staggeredMenuHidden : (!isMobile && isSubPage) ? styles.staggeredMenuHidden : ''}`}>
        <StaggeredMenu
          theme={theme}
          toggleTheme={toggleTheme}
          scrolled={scrolled}
          items={navLinks.map((link) => ({ label: link.label, link: link.href }))}
          socialItems={[
            { label: 'LinkedIn', link: 'https://linkedin.com' },
            { label: 'GitHub', link: 'https://github.com' }
          ]}
        />
      </div>
    </>
  )
}