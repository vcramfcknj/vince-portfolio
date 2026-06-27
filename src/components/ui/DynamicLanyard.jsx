'use client'

import dynamic from 'next/dynamic'

const Lanyard = dynamic(() => import('./Lanyard'), { ssr: false })

export default function DynamicLanyard(props) {
  return <Lanyard {...props} />
}
