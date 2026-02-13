import { useCallback, useEffect, useState } from 'react'
import FloatingInstagram from './components/FloatingInstagram'

// ... existing imports ...

// ... inside App component ...

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'

const navLinks = [
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
]

const supportedPaths = new Set(['/', '/about', '/projects', '/contact'])

function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return '/'
  }

  const trimmed = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  return trimmed || '/'
}

function resolvePath(pathname) {
  const normalizedPath = normalizePath(pathname)
  return supportedPaths.has(normalizedPath) ? normalizedPath : '/'
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => resolvePath(window.location.pathname))
  const [introDone, setIntroDone] = useState(() => resolvePath(window.location.pathname) !== '/')
  const [navOpen, setNavOpen] = useState(false)

  const isHomePage = currentPath === '/'
  const introActive = isHomePage && !introDone

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true)
  }, [])

  const handleNavToggle = useCallback(() => {
    setNavOpen(previousState => !previousState)
  }, [])

  const handleNavClose = useCallback(() => {
    setNavOpen(false)
  }, [])

  const handleNavigate = useCallback((event, path) => {
    if (event) {
      if (event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
        return
      }
      event.preventDefault()
    }

    const nextPath = resolvePath(path)
    if (nextPath !== currentPath) {
      window.history.pushState({}, '', nextPath)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      setCurrentPath(nextPath)
    }

    setNavOpen(false)
  }, [currentPath])

  useEffect(() => {
    const handlePopState = () => {
      const nextPath = resolvePath(window.location.pathname)
      setCurrentPath(nextPath)
      setNavOpen(false)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (!isHomePage) {
      setIntroDone(true)
    }
  }, [isHomePage])

  useEffect(() => {
    document.body.style.overflow = introActive || navOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [introActive, navOpen])

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setNavOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Reveal animation on scroll for active page content.
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
  }, [currentPath, introDone])

  const renderPage = () => {
    if (currentPath === '/about') {
      return <AboutPage />
    }

    if (currentPath === '/projects') {
      return <ProjectsPage />
    }

    if (currentPath === '/contact') {
      return <ContactPage />
    }

    return <HomePage />
  }

  return (
    <div className={`page ${introDone ? 'intro-done' : 'intro-active'}`}>
      {introActive && <IntroAnimation onComplete={handleIntroComplete} />}

      <button
        type="button"
        className={`nav-backdrop ${navOpen ? 'is-open' : ''}`}
        aria-label="Close navigation menu"
        onClick={handleNavClose}
      />

      <header className="site-header reveal">
        <div className={`nav-shell ${navOpen ? 'is-open' : ''}`}>
          <div className="nav-pill">
            <a href="/" className="nav-logo" aria-label="Go to home page">
              <img src="/triangle_v2.png" alt="Yeli" />
            </a>

            <div className="nav-title">
              <span className="nav-title-serif">YELI ARCHITECTURE STUDIO</span>
            </div>

            <button
              type="button"
              className={`nav-menu ${navOpen ? 'is-open' : ''}`}
              aria-expanded={navOpen}
              aria-controls="site-navigation"
              aria-label="Toggle navigation menu"
              onClick={handleNavToggle}
            >
              <span></span>
              <span></span>
            </button>
          </div>

          <nav id="site-navigation" className={`nav-dropdown ${navOpen ? 'is-open' : ''}`} aria-label="Site">
            {navLinks.map(link => (
              <a
                key={link.path}
                href={link.path}
                className="nav-link"
                aria-current={currentPath === link.path ? 'page' : undefined}
                onClick={event => handleNavigate(event, link.path)}
              >
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {renderPage()}
      <FloatingInstagram />
    </div>
  )
}
