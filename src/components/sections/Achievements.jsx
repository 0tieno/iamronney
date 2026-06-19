import { useRef, useState } from 'react'
import { achievements } from '../../data/content'
import { useRoughUnderline } from '../../hooks/useRoughUnderline'

const LENS_SIZE = 160
const ZOOM = 2.8

function MagnifierImage({ src, alt }) {
  const imgRef = useRef(null)
  const [lens, setLens] = useState(null) // { x, y, bgX, bgY, w, h }

  function handleMouseMove(e) {
    const img = imgRef.current
    if (!img) return
    const rect = img.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const bgX = -(x * ZOOM - LENS_SIZE / 2)
    const bgY = -(y * ZOOM - LENS_SIZE / 2)
    setLens({ x, y, bgX, bgY, w: rect.width, h: rect.height })
  }

  function handleMouseLeave() {
    setLens(null)
  }

  const lensLeft = lens ? Math.min(Math.max(lens.x - LENS_SIZE / 2, 0), lens.w - LENS_SIZE) : 0
  const lensTop  = lens ? Math.min(Math.max(lens.y - LENS_SIZE / 2, 0), lens.h - LENS_SIZE) : 0

  return (
    <div
      className="relative select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-auto block transition-all duration-500 ease-out"
        draggable={false}
      />
      {lens && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: lensLeft,
            top: lensTop,
            width: LENS_SIZE,
            height: LENS_SIZE,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.6)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${lens.w * ZOOM}px ${lens.h * ZOOM}px`,
            backgroundPosition: `${lens.bgX}px ${lens.bgY}px`,
            pointerEvents: 'none',
            cursor: 'none',
          }}
        />
      )}
    </div>
  )
}

export default function Achievements() {
  const headingRef = useRoughUnderline('#22c55e', 300)
  return (
    <section aria-labelledby="achievements-heading" className="animate-fade-slide-up">
      <h2
        id="achievements-heading"
        className="text-[2.5rem] font-semibold leading-none tracking-tight text-stone-900 mb-8"
      >
        <span ref={headingRef} className="rhythm-heading">Achievements, Honors &amp; Awards - Hall of Fame</span>
      </h2>
      {achievements.paragraphs.map((paragraph, idx) => (
        <p key={idx} className="text-[0.95rem] text-stone-700 leading-[1.9] max-w-[760px] mb-6">
          {paragraph}
        </p>
      ))}

      {/* Microsoft MVP Certificate */}
      <div className="mt-6 max-w-[560px]">
        <p className="text-[0.75rem] font-mono uppercase tracking-[0.14em] text-stone-400 mb-3">
          — Microsoft MVP Certificate, Dec 2025
        </p>
        <div className="scanline-wrap rounded-xl overflow-hidden shadow-[0_8px_32px_-8px_rgba(0,0,0,0.18)] grayscale hover:grayscale-0 transition-all duration-500 cursor-none">
          <MagnifierImage
            src={`${import.meta.env.BASE_URL}mvp-certificate.png`}
            alt="Microsoft Most Valuable Professional certificate awarded to Ronney Otieno, Security, December 2025"
          />
        </div>
      </div>

      {/* GitHub Contribution Graph */}
      <div className="mt-10 max-w-[760px]">
        <div className="rounded-xl border border-stone-200 overflow-hidden shadow-[0_6px_28px_-8px_rgba(0,0,0,0.13)] group/card">
          {/* Card header */}
          <div className="flex items-center gap-2.5 border-b border-stone-100 bg-stone-50 px-4 py-2.5">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-stone-500 shrink-0" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span className="font-mono text-[0.72rem] text-stone-700 font-medium">github.com/0tieno</span>
            <span className="ml-auto font-mono text-[0.62rem] uppercase tracking-[0.12em] text-stone-400">
              {new Date().getFullYear()} contributions
            </span>
          </div>
          {/* Graph */}
          <div className="scanline-wrap bg-white px-5 py-5 group relative">
            {/* green version underneath */}
            <img
              src="https://ghchart.rshah.org/216e39/0tieno"
              alt=""
              aria-hidden="true"
              className="w-full h-auto block absolute inset-0 px-5 py-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              loading="lazy"
            />
            {/* dark version on top, fades out on hover */}
            <img
              src="https://ghchart.rshah.org/1a1a1a/0tieno"
              alt="GitHub contribution calendar for 0tieno"
              className="w-full h-auto block relative group-hover:opacity-0 transition-opacity duration-500"
              loading="lazy"
            />
          </div>
          {/* Card footer */}
          <div className="border-t border-stone-100 bg-stone-50 px-4 py-2 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-sm bg-stone-800 opacity-90 group-hover/card:bg-[#216e39] transition-colors duration-500" />
            <span className="inline-block w-2 h-2 rounded-sm bg-stone-500 opacity-70 group-hover/card:bg-[#30a14e] transition-colors duration-500" />
            <span className="inline-block w-2 h-2 rounded-sm bg-stone-300 opacity-60 group-hover/card:bg-[#40c463] transition-colors duration-500" />
            <span className="inline-block w-2 h-2 rounded-sm bg-stone-200 group-hover/card:bg-[#9be9a8] transition-colors duration-500" />
            <span className="ml-1 text-[0.62rem] text-stone-400">less</span>
            <span className="ml-auto text-[0.62rem] text-stone-400">more</span>
            <span className="inline-block w-2 h-2 rounded-sm bg-stone-200 group-hover/card:bg-[#9be9a8] transition-colors duration-500" />
            <span className="inline-block w-2 h-2 rounded-sm bg-stone-300 opacity-60 group-hover/card:bg-[#40c463] transition-colors duration-500" />
            <span className="inline-block w-2 h-2 rounded-sm bg-stone-500 opacity-70 group-hover/card:bg-[#30a14e] transition-colors duration-500" />
            <span className="inline-block w-2 h-2 rounded-sm bg-stone-800 opacity-90 group-hover/card:bg-[#216e39] transition-colors duration-500" />
          </div>
        </div>
      </div>
    </section>
  )
}
