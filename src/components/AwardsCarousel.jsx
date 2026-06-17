'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CardSwap, { Card } from '@/components/ui/CardSwap'
import styles from './AwardsCarousel.module.css'

const initialAwards = [
  {
    id: 1,
    title: 'Web & Mobile Dev of the Year',
    issuer: 'ISPSC',
    year: '2026',
    image: '/images/certificates/web&mobile.jpg',
    tags: ['Web Dev', 'Mobile', 'React', 'Next.js'],
    description: 'Awarded for exemplary skills and notable distinction in developing intelligent and highly performant web applications.'
  },
  {
    id: 2,
    title: 'Entry-Level Robotics',
    issuer: 'Tech Institute',
    year: '2026',
    image: '/images/certificates/robotics.jpg',
    tags: ['Robotics', 'Automation', 'C++'],
    description: 'Certification demonstrating foundational expertise in embedded systems and automated robotic solutions.'
  },
  {
    id: 3,
    title: '220-Hour OJT / Internship',
    issuer: 'Erovoutika Ph, Inc.',
    year: '2026',
    image: '/images/certificates/Intersnhip.jpg',
    tags: ['OJT', 'Full Stack', 'Web'],
    description: 'Completed extensive on-the-job training, deploying real-world software solutions and collaborating in an agile team.'
  }
]

export default function AwardsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeAward = initialAwards[activeIndex]

  return (
    <div className={styles.splitContainer}>
      {/* Left Column: Details of Active Award */}
      <div className={styles.leftCol}>
        <p className={styles.description}>
          A curated collection of my credentials, academic achievements, and industry training.
          Hover over the stack to pause or click/wait to swap cards.
        </p>

        <div className={styles.spotlightBox}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={styles.spotlightContent}
            >
              <span className={styles.spotlightBadge}>
                {activeAward.issuer} • {activeAward.year}
              </span>
              
              <h3 className={styles.activeTitle}>
                {activeAward.title}
              </h3>
              
              <p className="text-[var(--text)] text-[clamp(1.05rem,1.3vw,1.25rem)] font-light leading-[1.6] mb-8 max-w-[32rem]">
                {activeAward.description}
              </p>

              <div className={styles.tagsRow}>
                {activeAward.tags.map((tag) => (
                  <span key={tag} className={styles.tagPill}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Metrics Section */}
        <div className={styles.metricsRow}>
          <div className={styles.metric}>
            <h4>3+</h4>
            <span>Certificates</span>
          </div>
          <div className={styles.metric}>
            <h4>220+</h4>
            <span>Internship Hours</span>
          </div>
          <div className={styles.metric}>
            <h4>1</h4>
            <span>Year Dev Experience</span>
          </div>
        </div>
      </div>

      {/* Right Column: CardSwap Deck */}
      <div className={styles.rightCol}>
        <div className={styles.carouselStack}>
          <CardSwap
            width="100%"
            height="100%"
            cardDistance={25}
            verticalDistance={30}
            delay={4500}
            pauseOnHover={true}
            onSwap={(idx) => setActiveIndex(idx)}
            skewAmount={3}
            easing="elastic"
          >
            {initialAwards.map((award, index) => (
              <Card key={award.id} customClass={styles.card}>
                <div className={styles.cardContent}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={award.image}
                    alt={award.title}
                    className={styles.certImage}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 flex-col items-center justify-center gap-4 bg-[var(--bg-surface)] text-[var(--text-dimmer)]">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span className="text-sm tracking-widest uppercase">Image pending</span>
                  </div>
                  <div className={styles.cardHighlight} />
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </div>
  )
}
