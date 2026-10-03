'use client'

import AwardsCarousel from './AwardsCarousel'
import useScrollReveal from '@/hooks/useScrollReveal'
import styles from './Certificates.module.css'

export default function Certificates() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 })
  const [carouselRef, carouselVisible] = useScrollReveal({ threshold: 0.15 })

  return (
    <section className={styles.fullWidthSection}>
      <div
        ref={headerRef}
        className={`${styles.fullWidthHeader} ${headerVisible ? styles.visible : ''}`}
      >
        <span className={styles.pillBox}>What I&apos;ve Earned</span>
        <h2 className={styles.sectionTitleBox}>Certificates & Achievements</h2>
      </div>
      <div
        ref={carouselRef}
        className={`${styles.carouselWrapper} ${carouselVisible ? styles.visible : ''}`}
      >
        <AwardsCarousel />
      </div>
    </section>
  )
}
