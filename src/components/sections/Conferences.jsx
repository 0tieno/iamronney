import { conferences } from '../../data/content'
import { useRoughUnderline } from '../../hooks/useRoughUnderline'

export default function Conferences() {
  const headingRef = useRoughUnderline('#22c55e', 300)
  return (
    <section aria-labelledby="conferences-heading" className="animate-fade-slide-up">
      <h2
        id="conferences-heading"
        className="text-[2.5rem] font-semibold leading-none tracking-tight text-stone-900 mb-8"
      >
        <span ref={headingRef} className="rhythm-heading">Conferences, Presentations &amp; Publications</span>
      </h2>
      {conferences.paragraphs.map((paragraph, idx) => (
        <p key={idx} className="text-[0.95rem] text-stone-700 leading-[1.9] max-w-[760px] mb-6">
          {paragraph}
        </p>
      ))}
    </section>
  )
}
