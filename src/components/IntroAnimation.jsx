import { useEffect, useState } from 'react'

const LOGO_PHASE_MS = 2300
const CURTAIN_PHASE_MS = 1100

// Welcome intro with a stepped 4-panel curtain lift reveal.
export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState('logo') // logo | reveal | done

  useEffect(() => {
    const revealTimer = setTimeout(() => setPhase('reveal'), LOGO_PHASE_MS)
    const finishTimer = setTimeout(() => {
      setPhase('done')
      onComplete?.()
    }, LOGO_PHASE_MS + CURTAIN_PHASE_MS)

    return () => {
      clearTimeout(revealTimer)
      clearTimeout(finishTimer)
    }
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <>
      <style>{`
        .intro-overlay {
          position: fixed;
          inset: 0;
          background: #000;
          z-index: 9999;
          overflow: hidden;
          transition: background-color 0.12s linear;
        }
        .intro-overlay.reveal-phase {
          background: transparent;
        }

        .intro-logo-stage {
          position: relative;
          z-index: 3;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .intro-logo-stage.is-active {
          opacity: 1;
        }
        .intro-logo-wrap {
          position: relative;
          width: min(94vw, 920px);
          aspect-ratio: 3 / 2;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: logoPop 1.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .intro-logo {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: contain;
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
          0% { opacity: 0; transform: scale(0.94); }
          60% { opacity: 1; transform: scale(1.01); }
          100% { opacity: 1; transform: scale(1); }
        }

        .curtain-grid {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        .curtain-panel {
          position: relative;
          height: 100%;
          background: linear-gradient(180deg, #010101 0%, #070707 100%);
          border: 1px solid transparent;
          transform: translateY(0);
        }
        .curtain-open .curtain-panel {
          border-color: rgba(212, 175, 55, 0.85);
        }
        .curtain-open .panel-1 {
          animation: liftPanel 0.92s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.18s;
        }
        .curtain-open .panel-2 {
          animation: liftPanel 0.78s cubic-bezier(0.22, 1, 0.36, 1) forwards 0s;
        }
        .curtain-open .panel-3 {
          animation: liftPanel 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.06s;
        }
        .curtain-open .panel-4 {
          animation: liftPanel 0.88s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.22s;
        }
        @keyframes liftPanel {
          from { transform: translateY(0); }
          to { transform: translateY(-115vh); }
        }
      `}</style>

      <div className={`intro-overlay ${phase === 'reveal' ? 'reveal-phase' : ''}`}>
        <div className={`intro-logo-stage ${phase === 'logo' ? 'is-active' : ''}`}>
          <div className="intro-logo-wrap">
            <img
              src="/intro-logo-transparent-v5.png"
              alt="Yeli Architecture Studio"
              className="intro-logo"
              loading="eager"
            />
          </div>
        </div>

        <div className={`curtain-grid ${phase === 'reveal' ? 'curtain-open' : ''}`} aria-hidden="true">
          <div className="curtain-panel panel-1" />
          <div className="curtain-panel panel-2" />
          <div className="curtain-panel panel-3" />
          <div className="curtain-panel panel-4" />
        </div>
      </div>
    </>
  )
}
