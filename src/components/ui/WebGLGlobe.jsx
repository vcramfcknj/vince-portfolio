'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { useTheme } from 'next-themes';

export default function WebGLGlobe({ className, style }) {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;
    
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 160,
      height: 160,
      phi: 0,
      theta: 0.3,
      dark: 0, // 0 renders black dots on a bright base
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1], // Bright white globe
      markerColor: [1, 0, 0], // Red marker so we can see it
      glowColor: [1, 1, 1], // Bright glow
      markers: [
        { location: [14.5995, 120.9842], size: 0.1 }
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      }
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className={className} style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          opacity: 1,
        }}
      />
    </div>
  );
}
