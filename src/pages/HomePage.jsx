import ServiceSection from '../components/ServiceSection'

export default function HomePage() {
  return (
    <main>
      <section className="landing-section reveal">
        <div className="landing-content">
          <p className="landing-eyebrow">Est. 2026 • Bengaluru</p>
          <h1 className="landing-title">
            Building Dreams,<br />
            <span className="gold-text">Rooted in Heritage.</span>
          </h1>
          <p className="landing-subtitle">
            We don't just sketch structures; we blueprint aspirations.
          </p>
          <div className="scroll-indicator">
            <span>Explore Services</span>
            <div className="line"></div>
          </div>
        </div>
      </section>

      <div className="services-container" id="services">
        <ServiceSection
          title="Thotti Mane Heritage"
          subtitle="Restoration & Design"
          description="Reviving the soul of traditional courtyards with modern sensibilities. We blend the timeless rustle of rain-kissed trees with contemporary comfort."
          image="/villa-courtyard.png"
          align="left"
        />

        <ServiceSection
          title="Smart Workspaces"
          subtitle="Commercial"
          description="High-tech environments designed for focus and collaboration. Where glass and steel meet warm, ambient innovation."
          image="/smart-office.png"
          align="right"
        />

        <ServiceSection
          title="Luxury Villas"
          subtitle="Residential"
          description="Custom homes that reflect your journey. From Whitefield estates to quiet retreats, we craft sanctuaries of stone and light."
          image="/heritage-detail.png"
          align="left"
        />

        <ServiceSection
          title="Landscape Integration"
          subtitle="Exterior Design"
          description="Blurring the lines between indoors and outdoors. Our designs breathe, incorporating nature as a core structural element."
          image="/villa-courtyard.png"
          align="right"
        />

        <ServiceSection
          title="Urban Planning"
          subtitle="Community"
          description="Designing sustainable communities that foster connection. Thoughtful spaces for the future of Bengaluru."
          image="/smart-office.png"
          align="left"
        />
      </div>

      <section className="about-contact-section" id="contact">
        <div className="about-content reveal">
          <h2>Our Philosophy</h2>
          <p>
            "Transcending Limitations" is not just a tagline; it is our ethos.
            We believe a home should be as modern as your future and as comforting as your past.
          </p>
        </div>

        <p className="founders-paragraph">
          Yeli Architecture Studio is <span className="highlight">Uttam Prakash</span>, <span className="highlight">Sriranga R Tilak</span>, <span className="highlight">Sudesh Ambig</span>, and <span className="highlight">Sampath Kumar</span>.
        </p>

        <footer className="footer reveal">
          <div className="contact-details">
            <h3>Get in Touch</h3>
            <p>hello@yeli.studio</p>
            <p>+91 98765 43210</p>
            <p>Indiranagar, Bengaluru, KA</p>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Yeli Architecture Studio. All Rights Reserved.</p>
          </div>
        </footer>
      </section>
    </main>
  )
}
