import { Suspense, lazy, useEffect } from 'react'
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import LeftPanel from './components/LeftPanel'
import Work from './components/sections/Work'
import NotFound from './components/sections/NotFound'
import { navItems, profile } from './data/content'

const About = lazy(() => import('./components/sections/About'))
const Conferences = lazy(() => import('./components/sections/Conferences'))
const Achievements = lazy(() => import('./components/sections/Achievements'))
const Posts = lazy(() => import('./components/sections/Posts'))

const ROUTE_BY_ID = {
  work: '/work',
  about: '/about',
  conferences: '/conferences',
  achievements: '/achievements',
  posts: '/posts',
}

const LABEL_BY_PATH = {
  '/work': navItems.find(({ id }) => id === 'work')?.label ?? 'My Work',
  '/about': navItems.find(({ id }) => id === 'about')?.label ?? 'About',
  '/conferences': navItems.find(({ id }) => id === 'conferences')?.label ?? 'Conferences',
  '/achievements': navItems.find(({ id }) => id === 'achievements')?.label ?? 'Achievements',
  '/posts': navItems.find(({ id }) => id === 'posts')?.label ?? 'Posts',
}

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    const label = LABEL_BY_PATH[pathname] ?? ''
    document.title = label
      ? `i am ronney — ${label}`
      : 'i am ronney — 404 Not Found'
  }, [pathname])

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
                <NavLink
                  key={id}
                  to={ROUTE_BY_ID[id]}
                  className={({ isActive }) => [
                    'px-[0.5rem] leading-none bg-transparent border-0 cursor-pointer no-underline',
                    idx < navItems.length - 1 ? 'border-r border-stone-200' : '',
                    isActive
                      ? 'font-semibold text-stone-900 underline underline-offset-[3px]'
                      : 'text-brand-blue hover:text-stone-900 hover:underline hover:underline-offset-[3px]',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <Suspense
              fallback={
                <div className="py-8 text-[0.9rem] text-stone-500" role="status" aria-live="polite">
                  Loading section...
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Navigate to="/work" replace />} />
                <Route path="/work" element={<Work />} />
                <Route path="/about" element={<About />} />
                <Route path="/conferences" element={<Conferences />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
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
