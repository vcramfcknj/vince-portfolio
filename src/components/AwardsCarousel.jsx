'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CardSwap, { Card } from '@/components/ui/CardSwap'
import styles from './AwardsCarousel.module.css'

const initialAwards = [
  {
    id: 1,
    title: 'Web & Mobile Dev of the Year',
    issuer: 'ISPSC · 2026',
    image: '/images/certificates/web&mobile.jpg',
    tags: ['Web Dev', 'Mobile', 'React', 'Next.js'],
    titleColor: '#60a5fa', // Blue
    titleFont: 'var(--font-bebas)'
  },
  {
    id: 2,
    title: 'Entry-Level Robotics',
    issuer: 'Tech Institute · 2026',
    image: '/images/certificates/robotics.jpg',
    tags: ['Robotics', 'Automation', 'C++'],
    titleColor: '#fcd34d', // Yellow
    titleFont: 'var(--font-playfair)'
  },
  {
    id: 3,
    title: '220-Hour OJT / Internship',
    issuer: 'Erovoutika Ph, Inc. · 2026',
    image: '/images/certificates/Intersnhip.jpg',
    tags: ['OJT', 'Full Stack', 'Web Development'],
    titleColor: '#34d399', // Emerald
    titleFont: 'var(--font-sans)'
  }
]

export default function AwardsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeCard = initialAwards[activeIndex]
  const issuerParts = activeCard?.issuer.split('·') || []
  const issuerName = issuerParts[0]?.trim() || ''
  const issuerYear = issuerParts[1]?.trim() || ''

  return (
    <div className={styles.splitContainer}>
      
      {/* ── LEFT COLUMN ── */}
      <div className={styles.leftCol}>
        <p className={styles.description}>
          Continuously upskilling through industry-recognized programs. Each certificate represents dedicated learning in areas ranging from full-stack development and cloud computing to cybersecurity.
        </p>

        <div className={styles.spotlightBox}>
          <div className={styles.spotlightBadge}>SPOTLIGHT CREDENTIAL</div>
          
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCard?.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={styles.spotlightContent}
            >
              <h3 
                className={styles.activeTitle}
                style={{ 
                  color: activeCard?.titleColor || 'var(--text)',
                  fontFamily: activeCard?.titleFont || 'var(--font-playfair)' 
                }}
              >
                {activeCard?.title}
              </h3>
              <p className={styles.activeIssuer}>
                Issued by <strong>{issuerName}</strong> {issuerYear && `• ${issuerYear}`}
              </p>
              
              <div className={styles.tagsRow}>
                {activeCard?.tags.map(tag => (
                  <span key={tag} className={styles.tagPill}>{tag}</span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.metricsRow}>
          <div className={styles.metric}>
            <h4>3+</h4>
            <span>CERTIFICATES</span>
          </div>
          <div className={styles.metric}>
            <h4>1</h4>
            <span>DEV AWARD</span>
          </div>
          <div className={styles.metric}>
            <h4>20+</h4>
            <span>SKILLS GAINED</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN (CAROUSEL) ── */}
      <div className={styles.rightCol}>
        <CardSwap
          cardDistance={50}
          verticalDistance={60}
          delay={3500}
          pauseOnHover={true}
          onSwap={(idx) => setActiveIndex(idx)}
          width="min(calc(100vw - 120px), 420px)"
          height={300}
        >
          {initialAwards.map((card, index) => (
            <Card key={card.id}>
              <div className={styles.cardContent}>
                <div className={styles.cardHighlight} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className={styles.certImage} 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }} 
                />
                <div className={styles.fallbackIcon} style={{ display: 'none' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span className={styles.fallbackText}>Image pending</span>
                </div>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>

    </div>
  )
}
