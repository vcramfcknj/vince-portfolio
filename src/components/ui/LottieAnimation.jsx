'use client';
import { Player } from '@lottiefiles/react-lottie-player';

export default function LottieAnimation({ url }) {
  if (!url) return null;
  
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', overflow: 'hidden' }}>
      <Player
        autoplay
        loop
        src={url}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
