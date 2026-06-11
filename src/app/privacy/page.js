import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Vince Rubang',
}

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem 4rem', fontFamily: 'var(--font-sans)', color: 'var(--text)' }}>
      <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
        &larr; Back to Home
      </Link>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Privacy Policy</h1>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        Last updated: {new Date().toLocaleDateString()}
      </p>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        Thank you for visiting my portfolio. This Privacy Policy describes how your personal information is collected, used, and shared when you visit my website.
      </p>
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Information Collection</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        This website is primarily a static portfolio and does not actively collect personal data. Any information you provide when contacting me directly via email or social media is used solely for the purpose of communicating with you regarding your inquiry.
      </p>
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Analytics and Cookies</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        This site may use basic analytics to monitor traffic and understand how visitors interact with the site. This data is anonymized and used exclusively to improve the user experience. No tracking cookies are used to identify individual visitors.
      </p>
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Third-Party Links</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        My portfolio may contain links to third-party websites or services that are not owned or controlled by me. I have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
      </p>
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Contact Me</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        If you have questions or concerns about this Privacy Policy, please contact me through the links provided in the Contact section of the homepage.
      </p>
    </div>
  )
}
