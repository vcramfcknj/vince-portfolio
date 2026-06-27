'use client'

import { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './Contact.module.css'
import dynamic from 'next/dynamic'
import Footer from './Footer'
import MagneticButton from './ui/MagneticButton'

const Ferrofluid = dynamic(() => import('./ui/Ferrofluid'), { ssr: false })

const EMAIL = 'vincerubang28@gmail.com'
const PHONE = '09603468348'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/vcramfcknj',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.32-1.75-1.32-1.75-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.79 1.29 3.47.99.1-.77.41-1.3.75-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rubang-vince-marc-justine-3484963a3/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${EMAIL}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    label: 'Phone',
    href: `tel:+63${PHONE.slice(1)}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/v1nchnzo/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://web.facebook.com/Corned.Bep',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
  },
]

export default function Contact() {
  const pathname = usePathname();
  
  if (pathname === '/contact') {
    return (
      <div style={{ position: 'relative', width: '100%', zIndex: 10, marginTop: 'auto' }}>
        <Footer forceShow={true} transparent={false} />
      </div>
    )
  }

  return <ContactContent pathname={pathname} />
}

function ContactContent({ pathname }) {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <div ref={container} className={styles.perspectiveWrapper}>
      <motion.section 
        id="contact" 
        className={styles.contact}
        style={{ y }}
      >
        <div className={styles.ferroFluidBackground}>
          <Ferrofluid key={pathname} color="#1a1a1a" />
        </div>
        <div className={styles.inner}>

          {/* Heading */}
          <div className={styles.top}>
            <p className="section-subtitle">Get in touch</p>
            <h2 className={styles.heading}>Let&rsquo;s Build<br />Something</h2>
          </div>

          {/* Description + email CTA */}
          <div className={styles.mid}>
            <p className={styles.desc}>
              I&rsquo;m open to internships, collaborations, and interesting projects.
              Drop me a message — I respond within 24 hours.
            </p>
            <MagneticButton
              href="/contact"
              text="Get In Touch"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              effect="liquid"
              color="var(--bg)"
              bgColor="var(--text)"
              fillColor="var(--bg)"
              textColorHover="var(--text)"
            />
          </div>

          {/* Social links */}
          <div className={styles.socials}>
            {socials.map((s) => (
              <MagneticButton
                key={s.label}
                href={s.href}
                className={styles.socialLink}
                aria-label={s.label}
                effect="liquid"
                color="var(--text-dim)"
                borderColor="var(--border)"
                bgColor="transparent"
                fillColor="var(--text)"
                textColorHover="var(--bg)"
                target={s.label !== 'Email' && s.label !== 'Phone' ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                {s.icon}
                <span className={styles.socialLinkLabel}>{s.label}</span>
              </MagneticButton>
            ))}
          </div>

        </div>

        {/* Render Footer directly inside the Contact section at the bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 10 }}>
          <Footer forceShow={true} transparent={true} />
        </div>
      </motion.section>
    </div>
  )
}
