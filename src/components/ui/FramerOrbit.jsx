'use client';
import { motion } from 'framer-motion';

export default function FramerOrbit({ className, size = 60 }) {
  return (
    <div 
      className={className} 
      style={{ 
        width: size, 
        height: size, 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        perspective: '800px'
      }}
    >
      {/* Ring 1 */}
      <motion.div
        animate={{ rotateZ: 360, rotateX: 70 }}
        transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '1px solid var(--bg)',
          borderRadius: '50%',
        }}
      />
      {/* Ring 2 */}
      <motion.div
        animate={{ rotateZ: -360, rotateY: 70 }}
        transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '1px solid var(--bg)',
          borderRadius: '50%',
        }}
      />
      {/* Ring 3 */}
      <motion.div
        animate={{ rotateZ: 360, rotateX: -60, rotateY: 45 }}
        transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '1px solid var(--bg)',
          borderRadius: '50%',
        }}
      />
      {/* Core Dot */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
        style={{
          position: 'absolute',
          width: '18%',
          height: '18%',
          backgroundColor: 'var(--bg)',
          borderRadius: '50%',
          boxShadow: '0 0 10px var(--bg)'
        }}
      />
    </div>
  );
}
