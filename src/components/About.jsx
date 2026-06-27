'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './About.module.css'
import MagneticButton from './ui/MagneticButton'

const mainText = "I'm a BS Information Technology graduate passionate about building intelligent and immersive digital experiences. With a strong foundation in web development and systems thinking, I focus on crafting scalable applications that solve real-world problems."
const subText = "I have hands-on expertise in HTML, CSS, JavaScript, and MySQL. Recognized as Web and Mobile Developer of the Year at ISPSC, and completed an internship at Erovoutika Ph, Inc. Currently diving deeper into cloud infrastructure and AI-powered development."

const mainWords = mainText.trim().split(/\s+/)

const subWords = subText.trim().split(/\s+/)

export default function About() {
  const containerRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Main Text Reveal
      gsap.fromTo(
        '.mainWord',
        { y: '120%', opacity: 0, rotateZ: 3 },
        {
          y: '0%',
          opacity: 1,
          rotateZ: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.015,
          scrollTrigger: {
            trigger: '.mainTextContainer',
            start: 'top 85%',
            toggleActions: 'play none none reset',
          }
        }
      )

      // Sub Text Reveal
      gsap.fromTo(
        '.subWord',
        { y: '120%', opacity: 0, rotateZ: 3 },
        {
          y: '0%',
          opacity: 1,
          rotateZ: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.015,
          scrollTrigger: {
            trigger: '.subTextContainer',
            start: 'top 85%',
            toggleActions: 'play none none reset',
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className={styles.about} ref={containerRef}>
      <div className={styles.inner}>
        
        {/* Top Two-Column Section */}
        <div className={styles.topRow}>
          <div className={styles.mainCol}>
            <p
              className={`${styles.mainText} mainTextContainer`}
              aria-label={mainText}
            >
              {mainWords.map((word, i) => (
                <React.Fragment key={i}>
                  <span className={styles.wordWrap}>
                    <span className={`${styles.word} mainWord`}>
                      {word}
                    </span>
                  </span>
                  {' '}
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className={styles.subCol}>
            <p className={`${styles.subText} subTextContainer`} aria-label={subText}>
              {subWords.map((word, i) => (
                <React.Fragment key={i}>
                  <span className={styles.wordWrap}>
                    <span className={`${styles.word} subWord`}>
                      {word}
                    </span>
                  </span>
                  {' '}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>

        {/* Bottom Section with Overlapping Button */}
        <div className={styles.bottomRow}>
          <div className={styles.actionWrap}>
            <MagneticButton
              href="/about"
              text="About me"
              icon=""
              effect="liquid"
              color="var(--bg)"
              fillColor="var(--bg)"
              textColorHover="var(--text)"
              borderColor="transparent"
              bgColor="var(--text)"
              className={styles.circleBtn}
            />
          </div>
        </div>

      </div>
    </section>
  )
}
