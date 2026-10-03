'use client'

export default function PrintButton({ className, children = 'Print / Save as PDF' }) {
  return (
    <button type="button" className={className} onClick={() => window.print()}>
      {children}
    </button>
  )
}
