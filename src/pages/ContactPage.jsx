export default function ContactPage() {
  return (
    <main className="standalone-main">
      <section className="contact-section content-section standalone-section">
        <div className="coming-soon-panel reveal">
          <p className="section-kicker">Contact</p>
          <h2 className="coming-soon-title">Direct Connect</h2>
          <p className="coming-soon-badge">Coming Soon</p>
          <p className="coming-soon-copy">
            Our dedicated consultation and inquiry page is currently in development.
          </p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <a
              className="contact-map-link"
              href="mailto:yeliarchitects12@gmail.com"
              style={{ textDecoration: 'none', color: 'var(--gold)', border: '1px solid var(--gold)', padding: '10px 20px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}
            >
              Email Us
            </a>
            <a
              className="contact-map-link"
              href="https://www.instagram.com/yeli.architecture.studio?igsh=MTJieWp6OHdia2NlMg=="
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none', color: 'var(--gold)', border: '1px solid var(--gold)', padding: '10px 20px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      <footer className="footer reveal standalone-footer">
        <div className="footer-bottom">
          <p>&copy; 2026 Yeli Architecture Studio. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  )
}
