import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-heading" className="animate-fade-slide-up">
      <p className="text-[0.72rem] font-semibold tracking-[0.22em] uppercase text-brand-green mb-3">
        Error Protocol Triggered
      </p>

      <h2
        id="not-found-heading"
        className="text-[3rem] font-semibold leading-[0.95] tracking-tight text-stone-900 mb-4"
      >
        404: Route Not Found
      </h2>

      <p className="text-[0.95rem] text-stone-700 leading-[1.9] max-w-[760px] mb-6">
        You just discovered an unindexed endpoint in my universe. The page you requested does not
        exist, was renamed, or is hiding behind a firewall made of chaos and coffee.
      </p>

      <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 mb-6 max-w-[760px] overflow-x-auto">
        <pre className="text-[0.78rem] leading-[1.7] text-stone-700 whitespace-pre-wrap">
{`$ curl -I ${window.location.href}
HTTP/1.1 404 Not Found
X-Trace-Id: nerd-mode-enabled
Hint: try /work, /about, /conferences, /achievements, /posts`}
        </pre>
      </div>

      <Link
        to="/work"
        className="inline-flex items-center gap-2 text-[0.86rem] font-semibold text-brand-blue hover:text-stone-900 hover:underline underline-offset-[3px]"
      >
        Reboot to home section
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
          <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
        </svg>
      </Link>
    </section>
  )
}