'use client';

import React, { useRef } from 'react';
import styles from './SpotlightGrid.module.css';

export function SpotlightGrid({ children }) {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.getElementsByClassName(styles.card);
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={styles.grid}
    >
      {children}
    </div>
  );
}

export function SpotlightCard({ children, title }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.iconWrapper}>
          {children}
        </div>
        {title && <span className={styles.title}>{title}</span>}
      </div>
    </div>
  );
}
