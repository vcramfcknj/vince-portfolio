'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './ContactPage.module.css'
import MagneticButton from '@/components/ui/MagneticButton'
import SplashCursor from '@/components/ui/SplashCursor'
import { useTheme } from '@/context/ThemeContext'

export default function ContactPage() {
  const { theme } = useTheme()
  const splashColor = theme === 'light' ? '#000000' : '#ffffff'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    services: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Trigger mailto client side action
    if (!formData.name || !formData.email || !formData.message) return;
    window.location.href = `mailto:vincerubang28@gmail.com?subject=Project Inquiry from ${formData.name}&body=${encodeURIComponent(formData.message)}`
  }

  return (
    <motion.main 
      className={styles.wrapper}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <SplashCursor RAINBOW_MODE={false} COLOR={splashColor} />
      <div className={styles.grid}>
        
        {/* LEFT COLUMN: Form */}
        <div className={styles.leftCol}>
          <h1 className={styles.title}>Let&apos;s start a project together</h1>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <div className={styles.labelRow}>
                <span className={styles.fieldNum}>01</span>
                <label htmlFor="name" className={styles.fieldLabel}>What&apos;s your name?</label>
              </div>
              <input 
                type="text" 
                id="name"
                name="name"
                className={styles.input} 
                placeholder="John Doe *" 
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.labelRow}>
                <span className={styles.fieldNum}>02</span>
                <label htmlFor="email" className={styles.fieldLabel}>What&apos;s your email?</label>
              </div>
              <input 
                type="email" 
                id="email"
                name="email"
                className={styles.input} 
                placeholder="john@doe.com *" 
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.labelRow}>
                <span className={styles.fieldNum}>03</span>
                <label htmlFor="organization" className={styles.fieldLabel}>What&apos;s the name of your organization?</label>
              </div>
              <input 
                type="text" 
                id="organization"
                name="organization"
                className={styles.input} 
                placeholder="John & Doe®" 
                value={formData.organization}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.labelRow}>
                <span className={styles.fieldNum}>04</span>
                <label htmlFor="services" className={styles.fieldLabel}>What services are you looking for?</label>
              </div>
              <input 
                type="text" 
                id="services"
                name="services"
                className={styles.input} 
                placeholder="Web Design, Web Development ..." 
                value={formData.services}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.labelRow}>
                <span className={styles.fieldNum}>05</span>
                <label htmlFor="message" className={styles.fieldLabel}>Your message</label>
              </div>
              <textarea 
                id="message"
                name="message"
                className={`${styles.input} ${styles.textarea}`} 
                placeholder="Hello Vince, can you help me with ... *" 
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className={styles.bottomRow}>
              <div className={styles.actionWrap}>
                <MagneticButton 
                  text="Send it" 
                  icon=""
                  effect="liquid"
                  color="var(--bg)"
                  fillColor="var(--bg)"
                  textColorHover="var(--text)"
                  borderColor="transparent"
                  bgColor="var(--text)"
                  className={styles.circleBtn}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Contact Details */}
        <div className={styles.sidebar}>
          <div className={styles.profileImageWrapper}>
            <Image 
              src="/images/about_coverImage.JPG" 
              alt="Vince Rubang"
              fill
              sizes="120px"
              className={styles.profileImage}
            />
          </div>

          <div className={styles.sidebarSection}>
            <h3>Contact Details</h3>
            <a href="mailto:vincerubang28@gmail.com" className={styles.sidebarLink}>vincerubang28@gmail.com</a>
            <a href="tel:+639603468348" className={styles.sidebarLink}>+63 960 346 8348</a>
          </div>

          <div className={styles.sidebarSection}>
            <h3>Business Details</h3>
            <p className={styles.sidebarText}>Location: Philippines</p>
          </div>

          <div className={styles.sidebarSection}>
            <h3>Socials</h3>
            <a href="https://github.com/vcramfcknj" target="_blank" rel="noopener noreferrer" className={styles.sidebarLink}>GitHub</a>
            <a href="https://www.linkedin.com/in/rubang-vince-marc-justine-3484963a3/" target="_blank" rel="noopener noreferrer" className={styles.sidebarLink}>LinkedIn</a>
            <a href="https://www.instagram.com/v1nchnzo/" target="_blank" rel="noopener noreferrer" className={styles.sidebarLink}>Instagram</a>
          </div>
        </div>

      </div>
    </motion.main>
  )
}
