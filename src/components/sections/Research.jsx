import { useEffect, useMemo, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { annotate } from 'rough-notation'
import { researchPublications } from '../../data/content'
import { useRoughUnderline } from '../../hooks/useRoughUnderline'

function RoughTag({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const annotation = annotate(ref.current, {
      type: 'highlight',
      color: 'rgba(251,191,36,0.32)',
      animationDuration: 400,
      animate: true,
      iterations: 1,
    })
    const timer = setTimeout(() => annotation.show(), 300)
    return () => {
      clearTimeout(timer)
      annotation.remove()
    }
  }, [])
  return (
    <span ref={ref} className="text-[0.7rem] font-semibold uppercase tracking-widest text-brand-green">
      {children}
    </span>
  )
}

function Block({ block }) {
  if (block.type === 'list') {
    return (
      <ul className="list-disc pl-6 space-y-1.5 text-[0.9rem] text-stone-700 leading-[1.7] mb-5 max-w-[760px]">
        {block.items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    )
  }

  if (block.type === 'quote') {
    return (
      <blockquote className="border-l-2 border-brand-green pl-4 italic text-[0.9rem] text-stone-600 mb-5 max-w-[760px]">
        {block.text}
      </blockquote>
    )
  }

  return (
    <p className="text-[0.95rem] text-stone-700 leading-[1.9] max-w-[760px] mb-5">
      {block.text}
    </p>
  )
}

function PublicationSection({ section, level }) {
  const HeadingTag = level === 3 ? 'h3' : 'h4'
  const headingClass =
    level === 3
      ? 'rhythm-subheading text-[1.5rem] font-semibold text-stone-900 mt-10 mb-4'
      : 'text-[1.05rem] font-semibold text-stone-900 mt-6 mb-3'

  return (
    <div>
      <HeadingTag className={headingClass}>{section.heading}</HeadingTag>
      {section.blocks.map((block, idx) => (
        <Block key={idx} block={block} />
      ))}
      {section.subsections?.map((sub, idx) => (
        <PublicationSection key={idx} section={sub} level={4} />
      ))}
    </div>
  )
}

function PublicationDetail({ publication }) {
  const navigate = useNavigate()

  return (
    <article className="animate-fade-slide-up">
      <button
        type="button"
        onClick={() => navigate('/research')}
        className="inline-flex items-center gap-1.5 text-[0.8rem] text-brand-blue hover:text-stone-900 hover:underline underline-offset-[3px] mb-8 bg-transparent border-0 cursor-pointer p-0"
      >
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
          <path d="M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 1.06L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z" />
        </svg>
        Back to Research
      </button>

      <p className="text-[0.87rem] text-stone-400 italic mb-2">{publication.kicker}</p>

      <h2 className="rhythm-heading text-[2.25rem] font-semibold leading-tight tracking-tight text-stone-900 mb-4 max-w-[680px]">
        {publication.title}
      </h2>

      <p className="text-[1.05rem] text-stone-600 leading-[1.6] max-w-[680px] mb-6">
        {publication.tagline}
      </p>

      <dl className="flex flex-wrap gap-x-8 gap-y-2 mb-10 text-[0.78rem] text-stone-500 border-y border-stone-200 py-4">
        {publication.meta.map(({ label, value }) => (
          <div key={label} className="flex gap-1.5">
            <dt className="font-semibold text-stone-700">{label}:</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      {publication.sections.map((section, idx) => (
        <PublicationSection key={idx} section={section} level={3} />
      ))}
    </article>
  )
}

export default function Research() {
  const { slug } = useParams()
  const headingRef = useRoughUnderline('#22c55e', 300)

  const selected = useMemo(() => {
    if (!slug) {
      return null
    }

    return researchPublications.find((publication) => publication.slug === slug) ?? null
  }, [slug])

  const isUnknownSlug = Boolean(slug) && !selected

  if (selected) {
    return <PublicationDetail publication={selected} />
  }

  if (isUnknownSlug) {
    return (
      <section aria-labelledby="research-missing-heading" className="animate-fade-slide-up">
        <h2 id="research-missing-heading" className="text-[2rem] font-semibold leading-tight tracking-tight text-stone-900 mb-3">
          Publication not found
        </h2>
        <p className="text-[0.95rem] text-stone-700 leading-[1.8] mb-6">
          This research link is invalid or the publication was moved.
        </p>
        <Link
          to="/research"
          className="inline-flex items-center gap-1.5 text-[0.86rem] font-semibold text-brand-blue hover:text-stone-900 hover:underline underline-offset-[3px]"
        >
          Back to Research
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </Link>
      </section>
    )
  }

  return (
    <section aria-labelledby="research-heading" className="animate-fade-slide-up">
      <h2
        id="research-heading"
        className="text-[2.5rem] font-semibold leading-none tracking-tight text-stone-900 mb-8"
      >
        <span ref={headingRef} className="rhythm-heading">Research</span>
      </h2>

      <ul className="flex flex-col gap-8">
        {researchPublications.map((publication) => (
          <li key={publication.slug} className="border-b border-stone-100 pb-8 last:border-0 last:pb-0">
            <div className="flex items-center gap-3 mb-2">
              <RoughTag>{publication.tag}</RoughTag>
              <span className="text-[0.75rem] text-stone-400">{publication.date}</span>
            </div>
            <Link
              to={`/research/${publication.slug}`}
              className="block text-left text-[1.05rem] font-semibold text-stone-900 leading-snug mb-2 hover:underline underline-offset-[3px] decoration-brand-green"
            >
              {publication.title}
            </Link>
            <p className="text-[0.9rem] text-stone-600 leading-[1.8]">{publication.excerpt}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 pt-6 border-t border-stone-200">
        <a
          href="https://securecloudx.xyz"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-brand-blue hover:text-stone-900 hover:underline underline-offset-[3px]"
        >
          See all research on securecloudx.xyz
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </a>
      </div>
    </section>
  )
}
