import { achievements } from '../../data/content'
import { useRoughUnderline } from '../../hooks/useRoughUnderline'

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
        <div className="scanline-wrap rounded-xl overflow-hidden shadow-[0_8px_32px_-8px_rgba(0,0,0,0.18)] grayscale hover:grayscale-0 transition-all duration-500">
          <img
            src={`${import.meta.env.BASE_URL}mvp-certificate.png`}
            alt="Microsoft Most Valuable Professional certificate awarded to Ronney Otieno, Security, December 2025"
            className="w-full h-auto block transition-transform duration-500 ease-out hover:scale-110"
          />
        </div>
      </div>
    </section>
  )
}
