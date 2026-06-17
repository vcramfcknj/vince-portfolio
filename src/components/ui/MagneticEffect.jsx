'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticEffect({ children, strength = 0.5, ...props }) {
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = itemRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, { x: x * strength, y: y * strength, duration: 1, ease: 'power3.out' });
  };

  const handleMouseLeave = () => {
    const el = itemRef.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 1.5, ease: 'elastic.out(1, 0.4)' });
  };

  return React.cloneElement(children, {
    ref: itemRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { ...children.props.style, display: 'inline-block' },
    ...props
  });
}
