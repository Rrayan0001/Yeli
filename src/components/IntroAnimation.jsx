import { useEffect, useState } from 'react'

export default function IntroAnimation({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Timeline:
    // 0s: Triangle appears
    // 0.5s -> 0.4s: Triangle splits (opens gap)
    // 1.0s -> 0.8s: Yeli moves up/scales up from the gap
    // 1.5s -> 1.2s: Architecture fades in
    // 2.0s -> 1.5s: Studio fades in
    // 3.0s: End (Fade out overlay)

    const totalDuration = 3000

    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) onComplete()
    }, totalDuration)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <>
      <style>{`
        .custom-intro-overlay {
          position: fixed;
          inset: 0;
          background: #000;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.8s ease;
        }
        .custom-intro-overlay.fade-out {
          opacity: 0;
          pointer-events: none;
        }
        .intro-container {
          position: relative;
          width: 1920px;
          height: 1080px;
          max-width: 100vw;
          max-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .triangle-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          display: flex;
          justify-content: center;
        }
        .triangle-half {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }
        .triangle-half img {
          width: 100%;
          height: auto;
          display: block;
        }
        .triangle-half.left {
          clip-path: inset(0 50% 0 0);
          animation: splitLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards 0.4s;
        }
        .triangle-half.right {
          clip-path: inset(0 0 0 50%);
          animation: splitRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards 0.4s;
        }
        .layer-yeli-v2 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
        }
        .layer-yeli-v2 img {
          opacity: 0;
          width: 200px;
          animation: enterYeliV2 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) forwards 0.8s;
        }
        .layer-architecture-v2 {
          position: absolute;
          top: 65%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .layer-architecture-v2 img {
          opacity: 0;
          width: 300px;
          animation: fadeInMoveUp 0.6s ease forwards 1.2s;
        }
        .layer-studio-v2 {
          position: absolute;
          top: 75%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .layer-studio-v2 img {
          opacity: 0;
          width: 200px;
          animation: fadeInMoveUp 0.6s ease forwards 1.5s;
        }
        @keyframes splitLeft {
          to { transform: translateX(-160px); }
        }
        @keyframes splitRight {
          to { transform: translateX(160px); }
        }
        @keyframes enterYeliV2 {
          from { opacity: 0; transform: scale(0.5) translateY(50px); }
          to { opacity: 1; transform: scale(1.3) translateY(0); }
        }
        @keyframes fadeInMoveUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className={`custom-intro-overlay ${!isVisible ? 'fade-out' : ''}`}>
        <div className="intro-container">

          {/* Triangle Split Container */}
          <div className="triangle-container">
            {/* Left Half - Clips the left side of the image */}
            <div className="triangle-half left">
              <img src="/triangle_v2.png" alt="" />
            </div>
            {/* Right Half - Clips the right side of the image */}
            <div className="triangle-half right">
              <img src="/triangle_v2.png" alt="" />
            </div>
          </div>

          {/* Yeli Text (Enters from gap) */}
          <div className="intro-layer layer-yeli-v2">
            <img src="/yeli_text_v2.png" alt="Yeli" />
          </div>

          {/* Architecture (Fades in) */}
          <div className="intro-layer layer-architecture-v2">
            <img src="/architecture_v2.png" alt="Architecture" />
          </div>

          {/* Studio (Fades in) */}
          <div className="intro-layer layer-studio-v2">
            <img src="/studio_v2.png" alt="Studio" />
          </div>
        </div>
      </div>
    </>
  )
}
