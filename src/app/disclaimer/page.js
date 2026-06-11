import Link from 'next/link'

export const metadata = {
  title: 'Disclaimer | Vince Rubang',
}

export default function Disclaimer() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem 4rem', fontFamily: 'var(--font-sans)', color: 'var(--text)' }}>
      <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
        &larr; Back to Home
      </Link>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Disclaimer</h1>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        Last updated: {new Date().toLocaleDateString()}
      </p>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        The information contained on this portfolio website is for general information and demonstration purposes only.
      </p>
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>No Professional Advice</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        The information provided on this site does not constitute professional advice. Any reliance you place on such information is strictly at your own risk.
      </p>
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Accuracy of Information</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        While I endeavor to keep the information up to date and correct, I make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
      </p>
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>External Links</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        Through this website, you are able to link to other websites which are not under my control. I have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
      </p>
    </div>
  )
}
