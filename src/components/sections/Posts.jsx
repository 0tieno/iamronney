import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { posts } from '../../data/content'

function PostDetail({ post }) {
  const navigate = useNavigate()

  return (
    <article className="animate-fade-slide-up">
      <button
        type="button"
        onClick={() => navigate('/posts')}
        className="inline-flex items-center gap-1.5 text-[0.8rem] text-brand-blue hover:text-stone-900 hover:underline underline-offset-[3px] mb-8 bg-transparent border-0 cursor-pointer p-0"
      >
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
          <path d="M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 1.06L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z" />
        </svg>
        Back to Posts
      </button>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-brand-green">
          {post.tag}
        </span>
        <span className="text-[0.75rem] text-stone-400">{post.date}</span>
      </div>

      <h2 className="rhythm-heading text-[2rem] font-semibold leading-tight tracking-tight text-stone-900 mb-6 max-w-[680px]">
        {post.title}
      </h2>

      <div className="flex flex-col gap-5 max-w-[680px]">
        {post.body.map((para, i) => (
          <p key={i} className="text-[0.95rem] text-stone-700 leading-[1.9]">
            {para}
          </p>
        ))}
      </div>
    </article>
  )
}

export default function Posts() {
  const { slug } = useParams()

  const selected = useMemo(() => {
    if (!slug) {
      return null
    }

    return posts.find((post) => post.slug === slug) ?? null
  }, [slug])

  const isUnknownSlug = Boolean(slug) && !selected

  if (selected) {
    return <PostDetail post={selected} />
  }

  if (isUnknownSlug) {
    return (
      <section aria-labelledby="posts-missing-heading" className="animate-fade-slide-up">
        <h2 id="posts-missing-heading" className="text-[2rem] font-semibold leading-tight tracking-tight text-stone-900 mb-3">
          Post not found
        </h2>
        <p className="text-[0.95rem] text-stone-700 leading-[1.8] mb-6">
          This post link is invalid or the post was moved.
        </p>
        <Link
          to="/posts"
          className="inline-flex items-center gap-1.5 text-[0.86rem] font-semibold text-brand-blue hover:text-stone-900 hover:underline underline-offset-[3px]"
        >
          Back to Posts
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </Link>
      </section>
    )
  }

  return (
    <section aria-labelledby="posts-heading" className="animate-fade-slide-up">
      <h2
        id="posts-heading"
        className="text-[2.5rem] font-semibold leading-none tracking-tight text-stone-900 mb-8"
      >
        <span className="rhythm-heading underline decoration-brand-green decoration-[3px] underline-offset-[7px]">Posts</span>
      </h2>
      <ul className="flex flex-col gap-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-stone-100 pb-8 last:border-0 last:pb-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-brand-green">
                {post.tag}
              </span>
              <span className="text-[0.75rem] text-stone-400">{post.date}</span>
            </div>
            <Link
              to={`/posts/${post.slug}`}
              className="block text-left text-[1.05rem] font-semibold text-stone-900 leading-snug mb-2 hover:underline underline-offset-[3px] decoration-brand-green"
            >
              {post.title}
            </Link>
            <p className="text-[0.9rem] text-stone-600 leading-[1.8]">{post.excerpt}</p>
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
