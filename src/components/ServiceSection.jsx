
import { useEffect, useRef } from 'react'

export default function ServiceSection({ title, subtitle, description, image, align = 'left' }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`service-section service-${align} reveal`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="service-overlay"></div>
      <div className="service-content">
        <span className="service-subtitle">{subtitle}</span>
        <h2 className="service-title">{title}</h2>
        <div className="service-line"></div>
        <p className="service-description">{description}</p>
      </div>
    </section>
  )
}
