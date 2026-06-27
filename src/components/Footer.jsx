'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Footer.module.css'

export default function Footer({ forceShow = false, transparent = false }) {
  const pathname = usePathname();

  if (pathname === '/' && !forceShow) {
    return null;
  }

  return (
    <footer 
      className={styles.footer} 
      style={transparent ? { background: 'transparent', borderTop: '1px solid rgba(255,255,255,0.1)' } : {}}
    >
      <div className={styles.footerLeft}>
        <span className={styles.footerName}>Vince Marc Justine O. Rubang</span>
        <span className={styles.footerMeta}>BS Information Technology Graduate · Ilocos Sur Polytechnic State College</span>
      </div>
      <div className={styles.footerRight}>
        <div className={styles.footerLinks}>
          <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
          <span className={styles.footerSep}>·</span>
          <Link href="/terms" className={styles.footerLink}>Terms & Conditions</Link>
          <span className={styles.footerSep}>·</span>
          <Link href="/disclaimer" className={styles.footerLink}>Disclaimer</Link>
        </div>
        <div className={styles.footerCopyright}>
          <span>© 2026 All rights reserved.</span>
          <span className={styles.footerSep}>·</span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  )
}
