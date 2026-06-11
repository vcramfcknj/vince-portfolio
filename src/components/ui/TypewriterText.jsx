"use client";

import React, { useState, useEffect, useMemo } from "react";

export function Typewriter({
  text,
  speed = 80,
  cursor = "|",
  loop = true,
  deleteSpeed = 40,
  delay = 2000,
  className,
}) {
  const [mounted, setMounted] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  const textArray = useMemo(() => Array.isArray(text) ? text : [text], [text]);

  // Only run on client after hydration
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (index >= textArray.length) return;

    const currentString = textArray[index];

    if (subIndex === currentString.length && !reverse) {
      if (!loop && index === textArray.length - 1) return;
      const timeout = setTimeout(() => setReverse(true), delay);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReverse(false);
      setIndex((prev) => (prev + 1) % textArray.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
      setDisplayText(textArray[index].substring(0, subIndex + (reverse ? -1 : 1)));
    }, reverse ? deleteSpeed : speed + Math.random() * 30);

    return () => clearTimeout(timeout);
  }, [mounted, subIndex, index, reverse, delay, speed, deleteSpeed, loop, textArray]);

  if (!mounted) return null;

  return (
    <span className={className} style={{ whiteSpace: "pre-wrap" }}>
      {displayText}
      <span style={{ animation: "type-pulse 1s ease-in-out infinite" }}>
        {cursor}
      </span>
    </span>
  );
}
