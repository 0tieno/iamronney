import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Navigate, NavLink, Route, Routes, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { annotate } from 'rough-notation'
import LeftPanel from './components/LeftPanel'
import TerminalPanel from './components/TerminalPanel'
import ReconMinimap from './components/ReconMinimap'
import Work from './components/sections/Work'
import NotFound from './components/sections/NotFound'
import { navItems, profile } from './data/content'
import { ROUTE_BY_ID } from './app/config'
import { applyRouteMetadata } from './app/metadata'

function AnnotatedNavLink({ to, label, isLast }) {
  const spanRef = useRef(null)
  const annotationRef = useRef(null)
  const match = useMatch(to)
  const isActive = Boolean(match)

  useEffect(() => {
    if (!spanRef.current) return
    if (isActive) {
      const ann = annotate(spanRef.current, {
        type: 'bracket',
        color: '#f59e0b',
        strokeWidth: 1.5,
        padding: 3,
        animate: true,
        animationDuration: 400,
        brackets: ['left', 'right'],
      })
      annotationRef.current = ann
      ann.show()
    } else {
      annotationRef.current?.remove()
      annotationRef.current = null
    }
    return () => {
      annotationRef.current?.remove()
      annotationRef.current = null
    }
  }, [isActive])

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'px-[0.5rem] leading-none bg-transparent border-0 cursor-pointer no-underline',
          !isLast ? 'border-r border-stone-200' : '',
          isActive ? 'font-semibold text-stone-900' : 'text-brand-blue hover:text-stone-900',
        ]
          .filter(Boolean)
          .join(' ')
      }
    >
      <span ref={spanRef}>{label}</span>
    </NavLink>
  )
}
import { useThemePreference } from './hooks/useThemePreference'
import { useAnalystConsole } from './hooks/useAnalystConsole'

const About = lazy(() => import('./components/sections/About'))
const Conferences = lazy(() => import('./components/sections/Conferences'))
const Achievements = lazy(() => import('./components/sections/Achievements'))
const Research = lazy(() => import('./components/sections/Research'))
const Posts = lazy(() => import('./components/sections/Posts'))

export default function App() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [showReconBanner, setShowReconBanner] = useState(true)
  const { themePreference, handleThemeChange } = useThemePreference()
  const {
    terminalUnlocked,
    commandInput,
    commandOutput,
    commandMatches,
    showCommandSuggestions,
    showIncidentLog,
    incidentLogs,
    artifacts,
    discoveredRoutes,
    totalArtifactCount,
    setCommandInput,
    setHistoryIndex,
    runCommand,
    handleCommandInputKeyDown,
  } = useAnalystConsole({ pathname, navigate })

  useEffect(() => {
    applyRouteMetadata(pathname)
  }, [pathname])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowReconBanner(false)
    }, 1200)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">

      <div
        aria-live="polite"
        className={[
          'mx-auto mt-6 mb-2 w-full max-w-[900px] px-5 md:px-8 transition-opacity duration-300',
          showReconBanner ? 'opacity-100' : 'opacity-0 pointer-events-none h-0 overflow-hidden m-0 p-0',
        ].join(' ')}
      >
        <div className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 font-mono text-[0.68rem] tracking-[0.08em] text-stone-600">
          <p>[+] Enumerating surface...</p>
          <p className="mt-1">[+] Loading profile vectors...</p>
        </div>
      </div>

      <div className={['flex min-h-screen flex-col transition-opacity duration-500', showReconBanner ? 'opacity-0' : 'opacity-100'].join(' ')}>

      {/* ── Main content: centered horizontally + vertically ── */}
      <div className="flex-1 w-full">
        <div className="w-full max-w-[900px] mx-auto px-5 md:px-8 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start md:items-stretch">

          {/* Left — sticky on scroll */}
          <div className="order-1 md:order-1 w-full md:w-auto md:self-stretch">
            <LeftPanel themePreference={themePreference} onThemeChange={handleThemeChange} />

            {/* Mobile navigation under left panel */}
            <div className={['mt-6 md:hidden w-full', terminalUnlocked ? 'hidden' : 'block'].join(' ')}>
              <details className="group rounded-xl border border-stone-200 bg-white p-2">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 text-[0.78rem] font-semibold text-stone-700 marker:content-none">
                  <span>Menu</span>
                  <span className="font-mono text-stone-500">[+]</span>
                </summary>

                <nav aria-label="Portfolio sections" className="mt-2 flex flex-col gap-2 px-1 pb-1">
                  {navItems.map(({ id, label }) => (
                    <NavLink
                      key={id}
                      to={ROUTE_BY_ID[id]}
                      className={({ isActive }) => [
                        'rounded-lg border px-3 py-2 text-[0.78rem] no-underline transition-colors',
                        isActive
                          ? 'border-stone-300 bg-stone-100 font-semibold text-stone-900'
                          : 'border-stone-200 text-brand-blue hover:border-stone-300 hover:bg-stone-50 hover:text-stone-900',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {label}
                    </NavLink>
                  ))}
                </nav>
              </details>
            </div>
          </div>

          {/* Right — scrolls with page */}
          <main
            className={[
              'order-2 md:order-2 w-full flex-1 min-w-0',
              terminalUnlocked ? 'p-0' : '',
            ].join(' ')}
          >

            {terminalUnlocked ? (
              <TerminalPanel
                pathname={pathname}
                commandInput={commandInput}
                commandOutput={commandOutput}
                commandMatches={commandMatches}
                showCommandSuggestions={showCommandSuggestions}
                showIncidentLog={showIncidentLog}
                incidentLogs={incidentLogs}
                artifacts={artifacts}
                totalArtifactCount={totalArtifactCount}
                setCommandInput={setCommandInput}
                setHistoryIndex={setHistoryIndex}
                runCommand={runCommand}
                handleCommandInputKeyDown={handleCommandInputKeyDown}
              />
            ) : null}

            {/* Navigation */}
            <nav
              aria-label="Portfolio sections"
              className={[
                'hidden md:flex md:flex-wrap items-center gap-y-[5px] border-b border-stone-200 pb-4 mb-10 text-[0.8rem]',
                terminalUnlocked ? 'md:hidden' : '',
              ].join(' ')}
            >

              {navItems.map(({ id, label }, idx) => (
                <AnnotatedNavLink
                  key={id}
                  to={ROUTE_BY_ID[id]}
                  label={label}
                  isLast={idx === navItems.length - 1}
                />
              ))}
            </nav>

            <Suspense
              fallback={
                <div className={['py-8 text-[0.9rem]', terminalUnlocked ? 'font-mono text-stone-600' : 'text-stone-500'].join(' ')} role="status" aria-live="polite">
                  Loading section...
                </div>
              }
            >
              <div key={pathname} className={terminalUnlocked ? 'terminal-typing terminal-content' : 'route-transition-enter'}>
                <Routes>
                  <Route path="/" element={<Navigate to="/work" replace />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/conferences" element={<Conferences />} />
                  <Route path="/achievements" element={<Achievements />} />
                  <Route path="/research" element={<Research />} />
                  <Route path="/research/:slug" element={<Research />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/posts/:slug" element={<Posts />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
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

      <ReconMinimap pathname={pathname} discoveredRoutes={discoveredRoutes} />

      </div>

    </div>
  )
}
