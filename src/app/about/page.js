import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AwardsCarousel from '@/components/AwardsCarousel'
import { Marquee } from '@/components/ui/Marquee'
import MagneticButton from '@/components/ui/MagneticButton'
import CircularText from '@/components/ui/CircularText'
import GlareHover from '@/components/ui/GlareHover'
import Lanyard from '@/components/ui/Lanyard'
import { FaEarthAmericas } from 'react-icons/fa6'
import { icons, DefaultIcon } from '@/components/Skills'
import styles from './AboutPage.module.css'

export const metadata = {
  title: 'About | Vince Rubang',
}

export default function AboutPage() {
  return (
    <div className={styles.wrapper}>
      
      {/* ── HERO SECTION ── */}
      <section className={styles.heroSection}>
        <div className={styles.heroTop}>
          <h1 className={styles.heroHugeTitle}>
            A passionate developer,<br />
            IT graduate, and<br />
            lifelong learner.
          </h1>
        </div>

        <div className={styles.heroDividerContainer}>
          <hr className={styles.heroDivider} />
          <div className={styles.heroBadge}>
            <CircularText
              text="v1nchnzo * v1nchnzo * "
              onHover="speedUp"
              spinDuration={20}
              className={styles.customCircularText}
            />
            <FaEarthAmericas className={styles.innerGlobe} />
          </div>
        </div>

        <div className={styles.heroBottomGrid}>
          <div className={styles.heroBottomLeft}>
            <div className={styles.heroArrow}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            <p className={styles.heroDescription}>
              I am a detail-oriented BS Information Technology graduate specializing in crafting intelligent, high-performance web applications and systems. I believe in solving real-world problems through clean code and seamless digital experiences.
              <br/><br/>
              <span style={{ color: 'var(--text)', opacity: 1 }}>Always exploring.</span>
            </p>
          </div>

          <div className={styles.heroBottomRight}>
            <div className={styles.coverImageWrapper}>
              <Image 
                src="/images/about_coverImage.JPG" 
                alt="Vince Cover Image"
                width={768}
                height={1024}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                className={styles.coverImage}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── DRIVES SECTION ── */}
      <section className={styles.drivesSection}>
        <h2 className={styles.drivesTitle}>
          What Drives Me<span className={styles.ellipsis}>...</span>
        </h2>
        
        <div className={styles.drivesGrid}>
          <GlareHover 
            className={styles.drivesCard} 
            background="transparent" 
            borderColor="transparent" 
            width="100%" 
            height="100%"
          >
            <div className={styles.cardNumber}>01</div>
            <h3 className={styles.cardTitle}>Problem Solving</h3>
            <p className={styles.cardDesc}>
              Tackling complex logic challenges and optimizing algorithms to create elegant, efficient solutions.
            </p>
          </GlareHover>
          <GlareHover 
            className={styles.drivesCard} 
            background="transparent" 
            borderColor="transparent" 
            width="100%" 
            height="100%"
          >
            <div className={styles.cardNumber}>02</div>
            <h3 className={styles.cardTitle}>Continuous Learning</h3>
            <p className={styles.cardDesc}>
              Staying at the forefront of technology by exploring new frameworks, tools, and cybersecurity concepts.
            </p>
          </GlareHover>
          <GlareHover 
            className={styles.drivesCard} 
            background="transparent" 
            borderColor="transparent" 
            width="100%" 
            height="100%"
          >
            <div className={styles.cardNumber}>03</div>
            <h3 className={styles.cardTitle}>Building Impactful Products</h3>
            <p className={styles.cardDesc}>
              Developing software that goes beyond code to deliver real value and seamless user experiences.
            </p>
          </GlareHover>
        </div>
      </section>


      {/* ── FULL WIDTH: AWARDS & CERTIFICATIONS ── */}
      <section className={styles.fullWidthSection}>
        <div className={styles.fullWidthHeader}>
            <h2 className={styles.drivesTitle} style={{ marginBottom: '2rem' }}>What I&apos;ve Earned</h2>
          </div>
          <div className={styles.carouselWrapper}>
            <AwardsCarousel />
          </div>
      </section>



      <div style={{ position: 'relative', width: '100%' }}>
        {/* LANYARD BACKGROUND */}
        <div className={styles.lanyardContainer}>
           <Lanyard 
             position={[0, 1.2, 16]} 
             gravity={[0, -40, 0]} 
             frontImage="/images/id.jpg"
           />
        </div>

        {/* ── DIVIDER ── */}
        <div className={styles.heroDividerContainer} style={{ marginBottom: '6rem', position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
          <hr className={styles.heroDivider} />
        </div>

        {/* ── SPLIT: TECH STACK & CURRENTLY DOING ── */}
        <section className={styles.splitSection} style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
          <div className={styles.splitGrid}>
            
            <div className={styles.splitLeft} style={{ pointerEvents: 'auto' }}>
              <h2 className={styles.sectionTitle}>Tech Stack Showcase</h2>
              <div className={styles.techTagsWrap}>
                <Marquee pauseOnHover className={styles.marqueeRow}>
                  {['HTML/CSS', 'JavaScript', 'React', 'Next.js', 'PHP', 'MySQL', 'MongoDB'].map(tech => (
                    <MagneticButton 
                      key={tech}
                      text={tech}
                      icon={<div className={styles.techIcon}>{icons[tech] || <DefaultIcon />}</div>}
                      className={styles.techTagItem}
                      color="var(--text-dim)"
                      bgColor="var(--bg)"
                      fillColor="var(--text)"
                      textColorHover="var(--bg)"
                      borderColor="var(--border-mid)"
                      as="div"
                    />
                  ))}
                </Marquee>
                <Marquee reverse pauseOnHover className={styles.marqueeRow}>
                  {['Firebase', 'Tailwind', 'Git', 'Figma', 'VS Code', 'Cybersecurity', 'Flutter', 'Cloud'].map(tech => (
                    <MagneticButton 
                      key={tech}
                      text={tech}
                      icon={<div className={styles.techIcon}>{icons[tech] || <DefaultIcon />}</div>}
                      className={styles.techTagItem}
                      color="var(--text-dim)"
                      bgColor="var(--bg)"
                      fillColor="var(--text)"
                      textColorHover="var(--bg)"
                      borderColor="var(--border-mid)"
                      as="div"
                    />
                  ))}
                </Marquee>
              </div>
            </div>

            <div className={styles.splitRight}>
              <h2 className={styles.sectionTitle}>What I&apos;m Currently Doing</h2>
              <ul className={styles.doingList}>
                <li>
                  <div className={styles.doingIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span>Building Full Stack Projects</span>
                </li>
                <li>
                  <div className={styles.doingIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span>Exploring Cross-Platform Apps with Flutter</span>
                </li>
                <li>
                  <div className={styles.doingIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span>Studying Cloud Architecture</span>
                </li>
                <li>
                  <div className={styles.doingIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span>Completing my BS Information Technology</span>
                </li>
              </ul>
            </div>
            
          </div>
        </section>

        {/* ── QUOTE ── */}
        <section className={styles.quoteSection} style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
          <blockquote className={styles.quoteBlock} style={{ pointerEvents: 'auto' }}>
            <span className={styles.quoteMarkLeft}>&quot;</span>
            Code is a medium, but impact is the goal.
            <span className={styles.quoteMarkRight}>&quot;</span>
          </blockquote>
          <div className={styles.quoteAuthor} style={{ pointerEvents: 'auto' }}>— Vince Rubang</div>
        </section>
      </div>

    </div>
  )
}
