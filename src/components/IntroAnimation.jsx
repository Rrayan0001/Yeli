import { useEffect, useState } from 'react'

// Welcome intro derived from the provided Figma frame (golden triangle with label)
// Plays once for 3s, fades out, then unmounts and signals completion.
export default function IntroAnimation({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2400) // start fade near the end
    const endTimer = setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, 3000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(endTimer)
    }
  }, [onComplete])

  if (!visible) return null

  return (
    <>
      <style>{`
        .intro-overlay {
          position: fixed;
          inset: 0;
          background: #000;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.8s ease;
        }
        .intro-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(40,40,40,0.35) 0%, rgba(0,0,0,0.95) 45%, #000 100%);
          pointer-events: none;
        }
        .intro-overlay.fade-out {
          opacity: 0;
          pointer-events: none;
        }
        .intro-logo-wrap {
          position: relative;
          width: min(72vw, 520px);
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: logoPop 1.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .intro-logo-wrap::after {
          content: '';
          position: absolute;
          inset: 8%;
          border-radius: 24px;
          filter: blur(24px);
          background: radial-gradient(circle, rgba(255,204,102,0.25), rgba(212,175,55,0));
          z-index: 0;
          opacity: 0;
          animation: glowRise 1.8s ease-out forwards 0.2s;
        }
        .intro-logo {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 14px 26px rgba(0,0,0,0.55));
          opacity: 0;
          transform: scale(0.94);
          animation: logoFade 1.6s ease-out forwards 0.15s;
        }
        @keyframes logoPop {
          0% { transform: scale(0.82); opacity: 0; }
          30% { transform: scale(1.04); opacity: 1; }
          65% { transform: scale(0.98); }
          100% { transform: scale(1); }
        }
        @keyframes logoFade {
          0% { opacity: 0; transform: scale(0.94); filter: blur(6px); }
          60% { opacity: 1; transform: scale(1.01); filter: blur(1px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        @keyframes glowRise {
          0% { opacity: 0; transform: scale(0.9); }
          70% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0.9; transform: scale(1); }
        }
      `}</style>

      <div className={`intro-overlay ${fading ? 'fade-out' : ''}`}>
        <div className="intro-logo-wrap">
          <img
            src="/welcome-logo.png"
            alt="Yeli Architecture Studio"
            className="intro-logo"
            loading="eager"
          />
        </div>
      </div>
    </>
  )
}
