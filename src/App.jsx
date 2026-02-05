
import { useEffect, useState, useRef } from 'react'
import ServiceSection from './components/ServiceSection'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    // Intro animation timer
    const timer = setTimeout(() => {
      setIntroDone(true)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.style.overflow = introDone ? '' : 'hidden'
  }, [introDone])

  // Reveal animation on scroll
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`page ${introDone ? 'intro-done' : 'intro-active'}`}>

      {/* INTRO OVERLAY */}
      <div className="intro-overlay">
        <div className="intro-triangle-wrapper">
          <svg className="intro-triangle" viewBox="0 0 100 100">
            <polygon points="50,15 90,85 10,85" />
          </svg>
        </div>
        <h1 className="intro-name">Yeli Architecture Studio</h1>
        <p className="intro-tagline">"Transcending Limitations"</p>
      </div>

      <header className="site-header reveal">
        <div className="nav-pill">
          <div className="nav-logo">
            <img src="/yeli-logo.png" alt="Yeli" />
          </div>
          <div className="nav-title">
            YELI ARCHITECTURE STUDIO
          </div>
          <div className="nav-menu">
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      <main>
        {/* HERO / LANDING */}
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

        {/* SERVICES FLOW */}
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

        {/* ABOUT & CONTACT */}
        <section className="about-contact-section" id="contact">
          <div className="about-content reveal">
            <h2>Our Philosophy</h2>
            <p>
              "Transcending Limitations" is not just a tagline; it is our ethos.
              We believe a home should be as modern as your future and as comforting as your past.
            </p>
          </div>

          <div className="founders-grid reveal">
            <div className="founder-card">
              <h3>Uttam Prakash</h3>
              <span>Principal Architect</span>
            </div>
            <div className="founder-card">
              <h3>Sudesh Ambig</h3>
              <span>Design Lead</span>
            </div>
            <div className="founder-card">
              <h3>Sampath Kumar</h3>
              <span>Structural Engineer</span>
            </div>
            <div className="founder-card">
              <h3>Supreeth Srinivas</h3>
              <span>Project Manager</span>
            </div>
          </div>

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
    </div>
  )
}
