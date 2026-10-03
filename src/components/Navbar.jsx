'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from '@/context/ThemeContext'
import StaggeredMenu from '@/components/ui/StaggeredMenu'
import MagneticEffect from '@/components/ui/MagneticEffect'
import styles from './Navbar.module.css'

const navLinks = [
  { num: '01', label: 'About',      href: '/about'       },
  { num: '02', label: 'Projects',   href: '/projects'    },
  { num: '03', label: 'Contact',    href: '/contact'     },
]

const menuLinks = [
  { label: 'Home',       href: '/#home'       },
  { label: 'About',      href: '/about'       },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects',   href: '/projects'    },
  { label: 'Contact',    href: '/contact'     },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [isMobile,  setIsMobile]  = useState(false)
  const { theme, toggleTheme }    = useTheme()
  const pathname                  = usePathname()

  /* ── Scrolled state ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        <div className={styles.navWrapper}>
          <nav
            className={styles.nav}
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

            <div className={styles.rightSection}>
              {/* Desktop links */}
              <ul className={styles.navList} role="list">
                {navLinks.map((link) => {
                  const linkPath = link.href.split('#')[0]
                  const isActive = linkPath !== '/' && (pathname === linkPath || pathname.startsWith(linkPath + '/'))
                  return (
                    <li key={link.num}>
                      <MagneticEffect strength={0.3}>
                        <Link href={link.href} className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
                          <span className={styles.navLabel}>{link.label}</span>
                        </Link>
                      </MagneticEffect>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>
        </div>
      )}

      {/* ── Staggered Menu ── */}
      <div className={`${styles.staggeredMenuContainer} ${(!isMobile && !scrolled) ? styles.staggeredMenuHidden : ''}`}>
        <StaggeredMenu
          theme={theme}
          toggleTheme={toggleTheme}
          scrolled={scrolled}
          items={menuLinks.map((item) => ({ label: item.label, link: item.href }))}
          socialItems={[
            { label: 'LinkedIn', link: 'https://www.linkedin.com/in/rubang-vince-marc-justine-3484963a3/' },
            { label: 'GitHub', link: 'https://github.com/vcramfcknj' }
          ]}
        />
      </div>
    </>
  )
}