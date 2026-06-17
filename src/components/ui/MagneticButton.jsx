'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './MagneticButton.module.css';

export default function MagneticButton({
  text = 'Résumé',
  icon = '↗',
  className = '',
  onClick,
  href,
  color = '#0c0c0c',
  fillColor = '#0c0c0c',
  textColorHover = '#ffffff',
  borderColor = 'rgba(12,12,12,0.5)',
  bgColor = '#ffffff',
  children,
  ...props
}) {
  const buttonRef = useRef(null);
  const fillRef = useRef(null);
  const textRef = useRef(null);
  const iconRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (fillRef.current) {
      gsap.set(fillRef.current, { scale: 0, xPercent: -50, yPercent: -50 });
    }
  }, []);

  const handleMouseEnter = (e) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.killTweensOf(fillRef.current);
    const targets = [textRef.current, iconRef.current].filter(Boolean);
    if (targets.length > 0) gsap.killTweensOf(targets);

    // Set the fill perfectly at the mouse entry point, then scale it up to fill the whole button
    gsap.set(fillRef.current, { left: x, top: y, scale: 0, opacity: 1 });
    
    gsap.to(fillRef.current, {
      scale: 1.5, // Make sure it's big enough to cover
      left: '50%',
      top: '50%',
      opacity: 1,
      duration: 1.5,
      ease: 'power3.out'
    });

    // CSS will handle the color transition
    if (textRef.current) gsap.to(textRef.current, { x: -3, duration: 1.2, ease: 'power3.out' });
    if (iconRef.current) gsap.to(iconRef.current, { x: 3, duration: 1.2, ease: 'power3.out', delay: 0.05 });
  };

  const handleMouseLeave = (e) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.killTweensOf(btn);
    gsap.killTweensOf(fillRef.current);
    const targets = [textRef.current, iconRef.current].filter(Boolean);
    if (targets.length > 0) gsap.killTweensOf(targets);

    gsap.to(btn, { x: 0, y: 0, duration: 2.0, ease: 'elastic.out(1, 0.4)' });

    // Shrink the fill perfectly towards the mouse exit point
    gsap.to(fillRef.current, {
      left: x,
      top: y,
      scale: 0,
      opacity: 0,
      duration: 1.3,
      ease: 'power3.out'
    });

    // CSS will handle the color transition
    if (targets.length > 0) {
      gsap.to(targets, { x: 0, duration: 1.2, ease: 'power3.out' });
    }
  };

  const handleMouseMove = (e) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 1.5, ease: 'power3.out', overwrite: 'auto' });
  };

  const isInternalLink = href && href.startsWith('/');
  const Component = isInternalLink ? Link : href ? 'a' : 'button';

  return (
    <Component
      ref={buttonRef}
      className={`${styles.magneticButton} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      href={href}
      style={{
        '--btn-color': color,
        '--btn-border': borderColor,
        '--btn-fill': fillColor,
        '--btn-hover-color': textColorHover,
        backgroundColor: bgColor,
      }}
      {...props}
    >
      <div className={styles.fill} ref={fillRef}></div>
      <span className={styles.content} ref={contentRef}>
        {children ? children : (
          <>
            <span className={styles.text} ref={textRef}>
              {text}
            </span>
            {icon && (
              <span className={styles.icon} ref={iconRef}>
                {icon}
              </span>
            )}
          </>
        )}
      </span>
    </Component>
  );
}
