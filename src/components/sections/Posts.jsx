import { posts } from '../../data/content'

export default function Posts() {
  return (
    <section aria-labelledby="posts-heading" className="animate-fade-slide-up">
      <h2
        id="posts-heading"
        className="text-[2.5rem] font-semibold leading-none tracking-tight text-stone-900 mb-8"
      >
        <span className="underline decoration-brand-green decoration-[3px] underline-offset-[7px]">Posts</span>
      </h2>
      <ul className="flex flex-col gap-8">
        {posts.map(({ title, date, tag, excerpt, href }) => (
          <li key={title} className="group border-b border-stone-100 pb-8 last:border-0 last:pb-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-brand-green">
                {tag}
              </span>
              <span className="text-[0.75rem] text-stone-400">{date}</span>
            </div>
            <a
              href={href}
              className="block text-[1.05rem] font-semibold text-stone-900 leading-snug mb-2 hover:underline hover:underline-offset-[3px] decoration-brand-green"
            >
              {title}
            </a>
            <p className="text-[0.9rem] text-stone-600 leading-[1.8]">{excerpt}</p>
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
          See all posts on securecloudx.xyz
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </a>
      </div>
    </section>
  )
}
