import { work } from '../../data/content'

export default function Work() {
  return (
    <section aria-labelledby="work-heading" className="animate-fade-slide-up">
      <h2
        id="work-heading"
        className="text-[2.5rem] font-semibold leading-none tracking-tight text-stone-900 mb-8"
      >
        <span className="rhythm-heading underline decoration-brand-green decoration-[3px] underline-offset-[7px]">Work</span>
      </h2>

      {/* Opening statement */}
      <div className="mb-10 space-y-3 max-w-[580px]">
        <p className="text-[0.9rem] text-stone-500 leading-[1.8]">{work.introParagraphs?.[0]}</p>
        <p className="text-[0.9rem] text-stone-500 leading-[1.8]">{work.introParagraphs?.[1]}</p>
        <p className="text-[0.9rem] text-stone-600 leading-[1.8]">
          {work.introParagraphs?.[2]}{' '}
          <em className="text-brand-blue not-italic font-medium">When I like it, I crown it.</em>
        </p>
      </div>

      {/* Roles — collapsible toggles */}
      <div className="relative ml-1.5 border-l-2 border-stone-100 space-y-0.5">
        {work.secondary.map(({ role, company, period, contributions }, i) => (
          <details key={i} className="group relative pl-5 py-1.5">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-[7px] top-[15px] h-3 w-3 rounded-full border-2 border-stone-300 bg-white transition-colors duration-200 group-open:border-brand-green group-open:bg-brand-green"
            />
            <summary className="flex items-center justify-between gap-4 cursor-pointer py-1.5 list-none [&::-webkit-details-marker]:hidden select-none">
              <span className="text-[0.9rem] leading-[1.7]">
                <span className="text-brand-green font-medium">{role}</span>
                <span className="text-stone-500">{', '}{company}</span>
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-stone-300 text-[0.7rem] transition-transform duration-200 group-open:rotate-90"
              >
                &#9658;
              </span>
            </summary>
            <div className="pb-3">
              <p className="pl-0 text-[0.84rem] text-stone-400 leading-[1.7] mb-2">{period}</p>
              {Array.isArray(contributions) && contributions.length > 0 && (
                <ul className="space-y-1.5">
                  {contributions.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-[0.84rem] text-stone-500 leading-[1.7]">
                      <span className="text-brand-green mr-2" aria-hidden="true">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
