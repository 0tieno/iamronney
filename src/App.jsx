import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [showReconBanner, setShowReconBanner] = useState(true)
  const [terminalUnlocked, setTerminalUnlocked] = useState(false)
  const [commandInput, setCommandInput] = useState('')
  const [commandOutput, setCommandOutput] = useState('Type help for available commands.')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const linkedInUrl = useMemo(
    () => profile.socials.find(({ label }) => label === 'LinkedIn')?.href,
    []
  )

  useEffect(() => {
    const label = LABEL_BY_PATH[pathname] ?? ''
    document.title = label
      ? `i am ronney — ${label}`
      : 'i am ronney — 404 Not Found'
  }, [pathname])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowReconBanner(false)
    }, 1200)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    function syncUnlockState() {
      setTerminalUnlocked(window.localStorage.getItem('iamronney_ctf_solved') === 'true')
    }

    syncUnlockState()
    window.addEventListener('storage', syncUnlockState)
    window.addEventListener('iamronney:ctf-solved', syncUnlockState)

    return () => {
      window.removeEventListener('storage', syncUnlockState)
      window.removeEventListener('iamronney:ctf-solved', syncUnlockState)
    }
  }, [])

  function runCommand(event) {
    event.preventDefault()

    const rawCommand = commandInput.trim()
    const command = rawCommand.toLowerCase()
    if (!rawCommand) {
      return
    }

    setCommandHistory((prev) => [...prev, rawCommand])
    setHistoryIndex(-1)

    const routeCommands = {
      whoami: '/about',
      about: '/about',
      skills: '/achievements',
      awards: '/achievements',
      achievements: '/achievements',
      work: '/work',
      conferences: '/conferences',
      posts: '/posts',
      blog: '/posts',
      home: '/work',
    }

    if (command === 'help') {
      setCommandOutput('whoami | about | work | skills | awards | conferences | posts | contact | resume')
      setCommandInput('')
      return
    }

    if (routeCommands[command]) {
      const targetRoute = routeCommands[command]
      navigate(targetRoute)
      setCommandOutput(`Routing to ${targetRoute}`)
      setCommandInput('')
      return
    }

    if (command === 'contact') {
      window.location.href = `mailto:${profile.email}`
      setCommandOutput('Launching mail client...')
      setCommandInput('')
      return
    }

    if (command === 'resume') {
      if (linkedInUrl) {
        window.open(linkedInUrl, '_blank', 'noopener,noreferrer')
        setCommandOutput('Opening resume profile...')
      } else {
        setCommandOutput('Resume target not configured.')
      }
      setCommandInput('')
      return
    }

    setCommandOutput(`Command not found: ${command}`)
    setCommandInput('')
  }

  function handleCommandInputKeyDown(event) {
    if (event.key === 'ArrowUp') {
      if (!commandHistory.length) {
        return
      }

      event.preventDefault()
      const nextIndex = historyIndex === -1
        ? commandHistory.length - 1
        : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setCommandInput(commandHistory[nextIndex])
      return
    }

    if (event.key === 'ArrowDown') {
      if (!commandHistory.length || historyIndex === -1) {
        return
      }

      event.preventDefault()
      const nextIndex = historyIndex + 1
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1)
        setCommandInput('')
        return
      }

      setHistoryIndex(nextIndex)
      setCommandInput(commandHistory[nextIndex])
    }
  }

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
      <div className="flex-1 flex items-center w-full">
        <div className="w-full max-w-[900px] mx-auto px-5 md:px-8 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start">

          {/* Left — sticky on scroll */}
          <div className="order-1 md:order-1 w-full md:w-auto">
            <LeftPanel />

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
              <section className="mb-4 pb-3">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-stone-500">
                  Terminal Mode // {pathname}
                </p>

                <>
                  <form onSubmit={runCommand} className="mt-2">
                    <label htmlFor="command-palette" className="sr-only">
                      Terminal command input
                    </label>
                    <div className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-2.5 py-2">
                      <span className="font-mono text-[0.72rem] text-stone-500">$iamronney:</span>
                      <input
                        id="command-palette"
                        type="text"
                        value={commandInput}
                        onChange={(event) => setCommandInput(event.target.value)}
                        onKeyDown={handleCommandInputKeyDown}
                        placeholder="whoami"
                        className="w-full bg-transparent text-[0.78rem] text-stone-800 placeholder:text-stone-400 focus:outline-none"
                        spellCheck="false"
                        autoComplete="off"
                      />
                      <button
                        type="submit"
                        className="rounded-md border border-stone-300 bg-stone-100 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-stone-700 hover:bg-stone-200"
                      >
                        Run
                      </button>
                    </div>
                  </form>

                  <p className="mt-2 font-mono text-[0.66rem] text-stone-600">
                    &gt; {commandOutput}
                  </p>
                </>
              </section>
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
                  <Route path="/posts" element={<Posts />} />
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

      </div>

    </div>
  )
}
