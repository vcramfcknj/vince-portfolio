'use client'

import AwardsCarousel from './AwardsCarousel'
import styles from './Certificates.module.css'

export default function Certificates() {
  return (
    <section className={styles.fullWidthSection}>
      <div className={styles.fullWidthHeader}>
        <span className={styles.pillBox}>What I&apos;ve Earned</span>
        <h2 className={styles.sectionTitleBox}>Certificates & Achievements</h2>
      </div>
      <div className={styles.carouselWrapper}>
        <AwardsCarousel />
      </div>
    </section>
  )
}
