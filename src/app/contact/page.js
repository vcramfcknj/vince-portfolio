'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import styles from './ContactPage.module.css'
import MagneticButton from '@/components/ui/MagneticButton'
import SplashCursor from '@/components/ui/SplashCursor'
import { useTheme } from '@/context/ThemeContext'
import { Filter } from 'bad-words'

// Web3Forms is a browser-side API. Their free tier rejects submissions that
// originate from a server IP — it answers 403 "This method is not allowed. Use
// our API in client side" — so the payload has to go from this page straight to
// their endpoint, through a relay route. The access key is a public
// identifier by their design: it only authorizes sending into Vince's inbox,
// and the botcheck honeypot below is what keeps scrapers from abusing it.
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ''
const EMAIL = 'vincerubang28@gmail.com'

const emptyForm = () => ({
  name: '',
  email: '',
  organization: '',
  services: '',
  message: '',
  botcheck: ''
})

// A failed submission should never lose the inquiry: build a prefilled draft
// from whatever the visitor typed so they can send it from their own mail app.
const buildMailtoFallback = (data) => {
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Organization: ${data.organization}`,
    `Looking for: ${data.services}`,
    '',
    data.message
  ].join('\n')
  return `mailto:${EMAIL}?subject=${encodeURIComponent(`Portfolio inquiry from ${data.name}`)}&body=${encodeURIComponent(body)}`
}

// Initialize the profanity filter and add our custom threat words
const filter = new Filter();
filter.addWords('kill', 'murder', 'die', 'suicide', 'stab', 'shoot', 'bomb', 'terrorist', 'massacre', 'kys', 'rape');

const containsBadWords = (text) => {
  if (!text) return false;
  return filter.isProfane(text);
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function ContactPage() {
  const { theme } = useTheme()
  const splashColor = theme === 'light' ? '#000000' : '#ffffff'
  
  const [formData, setFormData] = useState(emptyForm)
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [fallbackHref, setFallbackHref] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    // Typing again means the visitor is still here editing their attempt, so a
    // stale error and its rescue link should go away instead of hanging around.
    setStatus("idle");
    setStatusMessage("");
    setFallbackHref("");
  }

  // Errors stay visible on purpose — auto-hiding a message that carries the
  // only working way to reach Vince would just leave the visitor stuck.
  const reportFailure = (detail, data) => {
    setStatus("error");
    setStatusMessage(detail);
    setFallbackHref(buildMailtoFallback(data));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Missing Required Fields Check
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setStatusMessage("Please fill out all required fields.");
      setTimeout(() => { setStatus("idle"); setStatusMessage(""); }, 5000);
      return;
    }

    // 2. Email Format Check
    if (!isValidEmail(formData.email)) {
      setStatus("error");
      setStatusMessage("Please enter a valid email address (e.g. name@example.com).");
      setTimeout(() => { setStatus("idle"); setStatusMessage(""); }, 5000);
      return;
    }
    
    // 3. Local Moderation Check (Profanity + Threats)
    const combinedText = `${formData.name} ${formData.organization} ${formData.services} ${formData.message}`;
    if (containsBadWords(combinedText)) {
      setStatus("error");
      setStatusMessage("Inappropriate content detected. Message declined.");
      setTimeout(() => { setStatus("idle"); setStatusMessage(""); }, 5000);
      return;
    }

    // Honeypot: a field no human can see. Bots fill everything they find and
    // get discarded quietly so they never learn which field gave them away.
    if (formData.botcheck) {
      setFormData(emptyForm());
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      reportFailure("This site's form isn't wired up yet — email Vince directly.", formData);
      return;
    }

    setStatus("sending");
    setStatusMessage("");
    setFallbackHref("");

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      botcheck: formData.botcheck,
      subject: `New Portfolio Inquiry from ${formData.name}`,
      from_name: formData.name,
      replyTo: formData.email,
      // Their docs recommend an expiry so a captured payload can't be replayed
      // later against the same access key.
      expiresAt: new Date(Date.now() + 120000).toISOString(),
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      services: formData.services,
      message: formData.message,
    }

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      if (response.ok && result.success) {
        setStatus("success");
        setStatusMessage("Message sent successfully!");
        setFormData(emptyForm());
        setTimeout(() => {
          setStatus("idle");
          setStatusMessage("");
        }, 5000);
      } else {
        // Their reply says what actually went wrong (unverified key, quota,
        // expired payload), which beats a shrug.
        const reason = String(result.message || result.error || '').trim();
        reportFailure(
          reason ? `Submission refused: ${reason}` : 'The mail service refused the submission. Please try again.',
          formData
        );
      }
    } catch (error) {
      reportFailure("Couldn't reach the mail service — check your connection and retry.", formData);
    }
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

            {/* Honeypot — see the botcheck note in handleSubmit. */}
            <input
              type="text"
              name="botcheck"
              className={styles.hp}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={formData.botcheck}
              onChange={handleChange}
            />

            {/* Status Message Indicator */}
            <AnimatePresence>
              {statusMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    color: status === 'error' ? '#ef4444' : '#22c55e',
                    marginTop: '1rem',
                    fontSize: '1rem',
                    fontWeight: 500
                  }}
                >
                  {status === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <span>{statusMessage}</span>
                    {status === 'error' && fallbackHref && (
                      <a href={fallbackHref} className={styles.fallbackLink}>
                        Email me directly instead
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.bottomRow}>
              <div className={styles.actionWrap}>
                <MagneticButton 
                  text={status === "sending" ? "Sending..." : "Send it"} 
                  icon=""
                  effect="liquid"
                  color="var(--bg)"
                  fillColor="var(--bg)"
                  textColorHover="var(--text)"
                  borderColor="transparent"
                  bgColor="var(--text)"
                  className={styles.circleBtn}
                  type="submit"
                  disabled={status === "sending"}
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
