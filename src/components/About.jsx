'use client'

import Link from 'next/link'
import useScrollReveal from '@/hooks/useScrollReveal'
import styles from './About.module.css'

const bio = `I'm a BS Information Technology student passionate about building intelligent and immersive digital experiences. With a strong foundation in web development, database management, and systems thinking, I focus on crafting scalable, performance-driven applications that solve real-world problems. I have hands-on expertise in HTML, CSS, JavaScript, and MySQL, with exposure to cybersecurity principles and digital innovation. I was recognized as Web and Mobile Developer of the Year at Ilocos Sur Polytechnic State College, and completed a 220-hour internship at Erovoutika Ph, Inc. where I was embedded in a full website revamp built with Next.js and React. I'm constantly learning and evolving — currently diving deeper into cloud infrastructure, modern web engineering, and AI-powered development.`

const words = bio.trim().split(/\s+/)

export default function About() {
  const [bioRef, bioVisible] = useScrollReveal({ threshold: 0.05 })

  return (
    <section id="about" className={styles.about}>
      <div className={styles.inner}>
        <p
          ref={bioRef}
          className={`${styles.bioText} ${bioVisible ? styles.bioVisible : ''}`}
          aria-label={bio}
        >
          {words.map((word, i) => (
            <span key={i} className={styles.wordWrap}>
              <span
                className={styles.word}
                style={{ transitionDelay: bioVisible ? `${i * 18}ms` : '0ms' }}
              >
                {word}
              </span>{' '}
            </span>
          ))}
        </p>

        <div
          className={`${styles.actionWrap} ${bioVisible ? styles.actionVisible : ''}`}
          style={{ transitionDelay: bioVisible ? `${words.length * 10 + 100}ms` : '0ms' }}
        >
          <Link href="/about" className={styles.readMoreBtn}>
            Read the full story &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
