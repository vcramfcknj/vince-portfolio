import Link from 'next/link'

export const metadata = {
  title: 'Terms and Conditions | Vince Rubang',
}

export default function TermsAndConditions() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem 4rem', fontFamily: 'var(--font-sans)', color: 'var(--text)' }}>
      <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
        &larr; Back to Home
      </Link>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Terms & Conditions</h1>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        Last updated: {new Date().toLocaleDateString()}
      </p>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        Please read these terms and conditions carefully before using this portfolio website.
      </p>
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Intellectual Property</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        The content, design, layout, and graphics of this website are owned by or licensed to me. You are not permitted to reproduce, distribute, or otherwise use the materials on this site without my prior written consent, except for the purpose of reviewing my work for potential employment or collaboration.
      </p>
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Use of Site</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        You agree to use this site only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of this site by any third party.
      </p>
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Project Showcase</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        The projects displayed on this portfolio are representative of my skills and experience. Some projects may be conceptual, student work, or open-source contributions. The respective copyrights and licenses of any external libraries or frameworks used in these projects remain with their original authors.
      </p>
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Changes to Terms</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        I reserve the right to modify these terms and conditions at any time. Your continued use of the site after any changes indicates your acceptance of the new terms.
      </p>
    </div>
  )
}
