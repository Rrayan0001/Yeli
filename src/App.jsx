import { useEffect, useRef, useState } from 'react'

const flowItems = [
  {
    title: 'Whitefield Courtyard Villa',
    label: 'Residential',
    image: 'linear-gradient(140deg, #0b0b0b 0%, #1f1f1f 55%, #111 100%)',
    x: '4%',
    y: '6%',
    w: '44%',
    h: '56%',
    dx: -90,
    dy: -40,
  },
  {
    title: 'Thotti Mane Courtyard',
    label: 'Heritage',
    image: 'linear-gradient(160deg, #101010 0%, #2b2b2b 60%, #161616 100%)',
    x: '58%',
    y: '10%',
    w: '32%',
    h: '50%',
    dx: 70,
    dy: -30,
  },
  {
    title: 'Bengaluru Smart Office',
    label: 'Commercial',
    image: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0c0c0c 100%)',
    x: '16%',
    y: '56%',
    w: '54%',
    h: '42%',
    dx: -40,
    dy: 90,
  },
  {
    title: 'Atelier Atrium',
    label: 'Studio',
    image: 'linear-gradient(150deg, #111 0%, #262626 65%, #0f0f0f 100%)',
    x: '72%',
    y: '62%',
    w: '22%',
    h: '28%',
    dx: 60,
    dy: 80,
  },
]

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const flowSectionRef = useRef(null)
  const flowTilesRef = useRef([])

  flowTilesRef.current = []

  const setFlowTileRef = element => {
    if (element) {
      flowTilesRef.current.push(element)
    }
  }

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 2600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.style.overflow = introDone ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [introDone])

  useEffect(() => {
    const section = flowSectionRef.current
    if (!section) return

    let rafId = 0
    const update = () => {
      const rect = section.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const rawProgress = total > 0 ? (0 - rect.top) / total : 0
      const progress = Math.min(1, Math.max(0, rawProgress))

      flowTilesRef.current.forEach(tile => {
        const dx = Number(tile.dataset.dx || 0)
        const dy = Number(tile.dataset.dy || 0)
        tile.style.setProperty('--tx', `${dx * progress}px`)
        tile.style.setProperty('--ty', `${dy * progress}px`)
      })
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className={`page ${introDone ? 'intro-done' : 'intro-active'}`}>
      <div className="intro-overlay">
        <div className="intro-ring"></div>
        <img
          className="intro-logo"
          src="/yeli-logo.png"
          alt="Yeli Architecture Studio logo"
        />
        <p className="intro-title">Yeli Architecture Studio</p>
        <span className="intro-line"></span>
      </div>
      <header className="site-header">
        <div className="pill-nav">
          <div className="pill-logo">
            <img src="/yeli-logo.png" alt="Yeli Architecture Studio logo" />
          </div>
          <div className="pill-title">
            <span>Yeli Architecture Studio</span>
          </div>
          <button
            className="pill-menu"
            type="button"
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="story">
          <div className="hero-copy reveal">
            <p className="eyebrow">Architecture & Design Studio</p>
            <h1 className="hero-title">
              <span>Building</span>
              <span>Dreams, Rooted</span>
              <span>In Heritage</span>
            </h1>
            <p className="lead">
              In the heart of Bangalore, where innovation meets the timeless rustle of
              rain-kissed trees, we don’t just sketch structures; we blueprint aspirations.
              Our philosophy is simple: a home should be as modern as your future and as
              comforting as your past.
            </p>
            <div className="hero-actions">
              <a className="btn" href="#philosophy">
                Explore the Studio
              </a>
              <a className="btn ghost" href="#founders">
                Meet the Founders
              </a>
            </div>
            <div className="hero-meta">
              <div className="meta-card">
                <span className="meta-title">Studio Promise</span>
                <p>
                  We open the doors to the life you’ve always imagined, tending each brick,
                  finish, and flourish with reverence.
                </p>
              </div>
              <div className="meta-card">
                <span className="meta-title">Design Identity</span>
                <p>
                  A refined blend of high-tech smart living and the soul of traditional
                  thotti mane courtyards.
                </p>
              </div>
              <div className="meta-card">
                <span className="meta-title">Location</span>
                <p>Bengaluru, Karnataka, India</p>
              </div>
            </div>
          </div>
          <div className="hero-visual reveal" style={{ '--delay': '0.15s' }}>
            <div className="hero-collage">
              <div className="hero-photo photo-a">
                <span className="photo-tag">Courtyard Light</span>
              </div>
              <div className="hero-photo photo-b">
                <span className="photo-tag">Smart Living</span>
              </div>
              <div className="hero-photo photo-c">
                <span className="photo-tag">Stone + Steel</span>
              </div>
              <div className="hero-photo photo-d">
                <span className="photo-tag">Rain-kissed Facade</span>
              </div>
              <div className="hero-photo photo-e">
                <span className="photo-tag">Atelier</span>
              </div>
            </div>
            <div className="hero-strip">
              <div className="strip-card strip-1">
                <span>Workspace</span>
              </div>
              <div className="strip-card strip-2">
                <span>Villa</span>
              </div>
              <div className="strip-card strip-3">
                <span>Courtyard</span>
              </div>
              <div className="strip-card strip-4">
                <span>Heritage</span>
              </div>
            </div>
            <div className="hero-rail">
              <div className="rail-item rail-1"></div>
              <div className="rail-item rail-2"></div>
              <div className="rail-item rail-3"></div>
              <div className="rail-item rail-4"></div>
              <div className="rail-item rail-5"></div>
              <div className="rail-item rail-6"></div>
            </div>
            <div className="hero-orbit">
              <span>Thotti Mane</span>
              <span>Smart Home</span>
              <span>Workplace</span>
              <span>Sanctuary</span>
            </div>
          </div>
        </section>

        <section className="section" id="philosophy">
          <div className="section-head reveal">
            <p className="eyebrow">Our Design Philosophy</p>
            <h2>Our Design Philosophy</h2>
          </div>
          <div className="section-grid">
            <p className="reveal" style={{ '--delay': '0.1s' }}>
              We believe that true luxury isn't found in a catalog but in the seamless
              blend of a high-tech smart home with the soul of a traditional thotti mane
              courtyard. Whether it's a high-rise office or a quiet villa in Whitefield,
              our work stands as a testament to Bangalore’s evolving identity.
            </p>
            <p className="reveal" style={{ '--delay': '0.2s' }}>
              From the first brick to the final finish, we treat your dream with the
              reverence it deserves, ensuring that while the world moves fast, your space
              remains an eternal sanctuary.
            </p>
          </div>
        </section>

        <section className="section flow-section" id="flow" ref={flowSectionRef}>
          <div className="section-head reveal">
            <p className="eyebrow">Project Flow</p>
            <h2>Spaces That Move With You</h2>
          </div>
          <div className="flow-sticky">
            <div className="flow-stage">
              <div className="flow-word" aria-hidden="true">
                YELI
              </div>
              {flowItems.map((item, index) => (
                <article
                  className="flow-card"
                  key={item.title}
                  ref={setFlowTileRef}
                  data-dx={item.dx}
                  data-dy={item.dy}
                  style={{
                    '--x': item.x,
                    '--y': item.y,
                    '--w': item.w,
                    '--h': item.h,
                    '--delay': `${index * 0.08 + 0.1}s`,
                  }}
                >
                  <div
                    className="flow-image"
                    style={{ backgroundImage: item.image }}
                  ></div>
                  <div className="flow-overlay">
                    <p className="flow-label">{item.label}</p>
                    <h3 className="flow-title">{item.title}</h3>
                    <span className="flow-cta">View</span>
                  </div>
                </article>
              ))}
              <div className="flow-callout">
                <span>Interested in</span>
                <span className="flow-callout-accent">Seeing More</span>
                <span>Projects?</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="founders">
          <div className="section-head reveal">
            <p className="eyebrow">Leadership</p>
            <h2>Founding Members</h2>
          </div>
          <div className="founders">
            {[
              'Uttam Prakash Sriranga R. Thilak',
              'Sudesh Ambig',
              'Sampath Kumar',
              'Supreeth Srinivas',
            ].map((name, index) => (
              <div
                className="founder reveal"
                key={name}
                style={{ '--delay': `${index * 0.08 + 0.1}s` }}
              >
                {name}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p className="footer-title">Yeli Architecture Studio</p>
        <p className="footer-subtitle">Bengaluru, Karnataka, India — 2026</p>
        <p className="footer-note">
          Designing sanctuaries where heritage, technology, and aspiration converge.
        </p>
      </footer>
    </div>
  )
}
