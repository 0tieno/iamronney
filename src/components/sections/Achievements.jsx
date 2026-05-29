import { achievements } from '../../data/content'

export default function Achievements() {
  return (
    <section aria-labelledby="achievements-heading" className="animate-fade-slide-up">
      <h2
        id="achievements-heading"
        className="text-[2.5rem] font-semibold leading-none tracking-tight text-stone-900 mb-8"
      >
        <span className="rhythm-heading underline decoration-brand-green decoration-[3px] underline-offset-[7px]">Achievements, Honors &amp; Awards - Hall of Fame</span>
      </h2>
      {achievements.paragraphs.map((paragraph, idx) => (
        <p key={idx} className="text-[0.95rem] text-stone-700 leading-[1.9] max-w-[760px] mb-6">
          {paragraph}
        </p>
      ))}
    </section>
  )
}
