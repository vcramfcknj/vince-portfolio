'use client';

import React from 'react';
import { Cloud } from 'react-icon-cloud';

export const IconSphere = ({ icons }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <Cloud
        options={{
          clickToFront: 500,
          depth: 1,
          imageScale: 2,
          initial: [0.1, -0.1],
          outlineColour: '#0000',
          reverse: true,
          tooltip: 'native',
          tooltipDelay: 0,
          wheelZoom: false,
          activeCursor: 'pointer',
        }}
      >
        {icons}
      </Cloud>
    </div>
  );
};
