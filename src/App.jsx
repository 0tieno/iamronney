import { Suspense, lazy, useEffect, useState } from 'react'
import LeftPanel from './components/LeftPanel'
import Work from './components/sections/Work'
import NotFound from './components/sections/NotFound'
import { navItems, profile } from './data/content'

const About = lazy(() => import('./components/sections/About'))
const Conferences = lazy(() => import('./components/sections/Conferences'))
const Achievements = lazy(() => import('./components/sections/Achievements'))
const Posts = lazy(() => import('./components/sections/Posts'))

const SECTION_MAP = {
  work:         Work,
  about:        About,
  conferences:  Conferences,
  achievements: Achievements,
  posts:        Posts,
  'not-found':  NotFound,
}

const VALID_IDS = Object.keys(SECTION_MAP)
const NAV_LABEL_BY_ID = Object.fromEntries(navItems.map(({ id, label }) => [id, label]))

function getBasePath() {
  const base = import.meta.env.BASE_URL || '/'
  return base.endsWith('/') ? base.slice(0, -1) : base
}

function getInitialSection() {
  const pathname = window.location.pathname.replace(/\/$/, '')
  const basePath = getBasePath()

  // Accept only the app root path so deep non-hash URLs render the local 404 view.
  if (pathname !== basePath) {
    return 'not-found'
  }

  const hash = window.location.hash.slice(1)
  if (!hash) {
    return 'work'
  }

  return VALID_IDS.includes(hash) ? hash : 'not-found'
}

export default function App() {
  const [active, setActive] = useState(getInitialSection)

  useEffect(() => {
    const syncFromUrl = () => {
      setActive(getInitialSection())
    }

    window.addEventListener('hashchange', syncFromUrl)
    window.addEventListener('popstate', syncFromUrl)

    return () => {
      window.removeEventListener('hashchange', syncFromUrl)
      window.removeEventListener('popstate', syncFromUrl)
    }
  }, [])

  useEffect(() => {
    const label = NAV_LABEL_BY_ID[active] ?? ''
    document.title = active === 'not-found'
      ? 'i am ronney — 404 Not Found'
      : `i am ronney${label ? ` — ${label}` : ''}`

    if (active !== 'not-found') {
      history.replaceState(null, '', `#${active}`)
    }
  }, [active])

  const ActiveSection = SECTION_MAP[active]

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ── Top rule — full viewport width ── */}
      <div className="w-full border-t border-stone-200" />

      {/* ── Main content: centered horizontally + vertically ── */}
      <div className="flex-1 flex items-center w-full">
        <div className="w-full max-w-[900px] mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row gap-14 md:gap-20 items-start">

          {/* Left — sticky on scroll */}
          <LeftPanel />

          {/* Right — scrolls with page */}
          <main className="flex-1 min-w-0">

            {/* Navigation */}
            <nav
              aria-label="Portfolio sections"
              className="flex flex-wrap items-center gap-y-[5px] border-b border-stone-200 pb-4 mb-10 text-[0.8rem]"
            >

              {navItems.map(({ id, label }, idx) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  className={[
                    'px-[0.5rem] leading-none bg-transparent border-0 cursor-pointer',
                    idx < navItems.length - 1 ? 'border-r border-stone-200' : '',
                    active === id
                      ? 'font-semibold text-stone-900 underline underline-offset-[3px]'
                      : 'text-brand-blue hover:text-stone-900 hover:underline hover:underline-offset-[3px]',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {label}
                </button>
              ))}
            </nav>

            <Suspense
              fallback={
                <div className="py-8 text-[0.9rem] text-stone-500" role="status" aria-live="polite">
                  Loading section...
                </div>
              }
            >
              {/* key forces remount → re-fires entry animation */}
              <ActiveSection key={active} />
            </Suspense>

          </main>
        </div>
        </div>
      </div>

      {/* ── Page footer ── */}
      <footer className="w-full max-w-[1200px] mx-auto px-8 pb-10">
        <div className="border-t border-stone-200 pt-5 text-center">
          <p className="text-[0.72rem] text-stone-400">
            {profile.footer.text}{' '}
            <a
              href={profile.footer.floss.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue hover:opacity-60"
            >
              {profile.footer.floss.label}
            </a>
            &mdash;{' '}
            <a
              href={profile.footer.repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue hover:opacity-60"
            >
              {profile.footer.repo.label}
            </a>
          </p>
        </div>
      </footer>

    </div>
  )
}
