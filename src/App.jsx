import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
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

const ARTIFACT_BY_PATH = {
  '/work': 'artifact.route.work',
  '/about': 'artifact.route.about',
  '/conferences': 'artifact.route.conferences',
  '/achievements': 'artifact.route.achievements',
  '/posts': 'artifact.route.posts',
}

const EASTER_EGGS = {
  dream: {
    text: 'dream.log: build beauty. break assumptions. leave useful traces.',
    artifact: 'artifact.egg.dream',
  },
  trace: {
    text: 'trace: vector walk complete // 5 trust boundaries mapped.',
    artifact: 'artifact.egg.trace',
  },
  entropy: {
    text: 'entropy: randomness accepted. discipline restored by design.',
    artifact: 'artifact.egg.entropy',
  },
  ghost: {
    text: 'ghost: no active operator found. only footprints remain.',
    artifact: 'artifact.egg.ghost',
  },
}

const RECON_NODES = [
  { path: '/work', short: 'wrk', x: 14, y: 49 },
  { path: '/about', short: 'abt', x: 52, y: 24 },
  { path: '/conferences', short: 'cnf', x: 96, y: 16 },
  { path: '/achievements', short: 'ach', x: 62, y: 73 },
  { path: '/posts', short: 'pst', x: 108, y: 58 },
]

const RECON_EDGES = [
  ['/work', '/about'],
  ['/about', '/conferences'],
  ['/about', '/achievements'],
  ['/achievements', '/posts'],
  ['/work', '/achievements'],
  ['/conferences', '/posts'],
]

const MAX_INCIDENTS = 30
const THEME_OPTIONS = ['system', 'light', 'poetic', 'void']

function normalizeTheme(value) {
  if (value === 'dark') {
    return 'poetic'
  }

  return THEME_OPTIONS.includes(value) ? value : null
}

function resolveTheme(preference, systemPrefersDark) {
  if (preference === 'light') {
    return 'light'
  }

  if (preference === 'poetic') {
    return 'poetic'
  }

  if (preference === 'void') {
    return 'void'
  }

  return systemPrefersDark ? 'poetic' : 'light'
}

const TERMINAL_COMMANDS = [
  'help',
  'whoami',
  'about',
  'work',
  'skills',
  'awards',
  'achievements',
  'conferences',
  'posts',
  'blog',
  'home',
  'contact',
  'resume',
  'scan',
  'artifacts',
  'incidents',
  'clear',
  ...Object.keys(EASTER_EGGS),
]

function sharedPrefix(words) {
  if (!words.length) {
    return ''
  }

  return words.reduce((prefix, word) => {
    let idx = 0
    while (idx < prefix.length && idx < word.length && prefix[idx] === word[idx]) {
      idx += 1
    }

    return prefix.slice(0, idx)
  })
}

export default function App() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const previousPathRef = useRef(pathname)
  const previousUnlockRef = useRef(false)
  const [showReconBanner, setShowReconBanner] = useState(true)
  const [themePreference, setThemePreference] = useState('light')
  const [theme, setTheme] = useState('light')
  const [terminalUnlocked, setTerminalUnlocked] = useState(false)
  const [commandInput, setCommandInput] = useState('')
  const [commandOutput, setCommandOutput] = useState('Type help for available commands.')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showIncidentLog, setShowIncidentLog] = useState(false)
  const [incidentLogs, setIncidentLogs] = useState(() => {
    const timestamp = new Date().toISOString()
    return [
      {
        id: `incident-${timestamp}`,
        code: 'INIT',
        detail: 'Session initialized. Analyst console online.',
        level: 'info',
        timestamp,
      },
    ]
  })
  const [discoveredRoutes, setDiscoveredRoutes] = useState(() => {
    const stored = window.localStorage.getItem('iamronney_discovered_routes')
    if (!stored) {
      return []
    }

    try {
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })
  const [artifacts, setArtifacts] = useState(() => {
    const stored = window.localStorage.getItem('iamronney_artifacts')
    if (!stored) {
      return []
    }

    try {
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  const routeArtifactCount = useMemo(
    () => Object.values(ARTIFACT_BY_PATH).length,
    []
  )

  const easterArtifactCount = useMemo(
    () => Object.values(EASTER_EGGS).filter(({ artifact }) => artifact).length,
    []
  )

  const totalArtifactCount = routeArtifactCount + easterArtifactCount

  function appendIncident(code, detail, level = 'info') {
    const timestamp = new Date().toISOString()

    setIncidentLogs((prev) => [
      {
        id: `incident-${timestamp}-${Math.random().toString(36).slice(2, 8)}`,
        code,
        detail,
        level,
        timestamp,
      },
      ...prev,
    ].slice(0, MAX_INCIDENTS))
  }

  const linkedInUrl = useMemo(
    () => profile.socials.find(({ label }) => label === 'LinkedIn')?.href,
    []
  )

  const commandMatches = useMemo(() => {
    const normalizedInput = commandInput.trim().toLowerCase()
    if (!normalizedInput) {
      return []
    }

    return TERMINAL_COMMANDS.filter((command) => command.startsWith(normalizedInput))
  }, [commandInput])

  const showCommandSuggestions = useMemo(() => {
    const normalizedInput = commandInput.trim().toLowerCase()
    if (!normalizedInput || !commandMatches.length) {
      return false
    }

    return !(commandMatches.length === 1 && commandMatches[0] === normalizedInput)
  }, [commandInput, commandMatches])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const storedTheme = normalizeTheme(window.localStorage.getItem('iamronney_theme'))

    if (storedTheme) {
      setThemePreference(storedTheme)
      window.localStorage.setItem('iamronney_theme', storedTheme)
    } else {
      setThemePreference('light')
    }

    function handleSystemThemeChange(event) {
      if (themePreference !== 'system') {
        return
      }

      setTheme(resolveTheme('system', event.matches))
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [themePreference])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const resolvedTheme = resolveTheme(themePreference, mediaQuery.matches)
    setTheme(resolvedTheme)
    document.documentElement.setAttribute('data-theme', resolvedTheme)
  }, [themePreference])

  function handleThemeChange(event) {
    const nextPreference = event.target.value
    setThemePreference(nextPreference)
    window.localStorage.setItem('iamronney_theme', nextPreference)
  }

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

  useEffect(() => {
    const previousPath = previousPathRef.current
    if (previousPath !== pathname && LABEL_BY_PATH[pathname]) {
      appendIncident('ROUTE', `${previousPath} -> ${pathname}`, 'info')
    }

    previousPathRef.current = pathname
  }, [pathname])

  useEffect(() => {
    const wasUnlocked = previousUnlockRef.current
    if (!wasUnlocked && terminalUnlocked) {
      appendIncident('CTF', 'Mini challenge solved. Terminal mode unlocked.', 'success')
    }

    previousUnlockRef.current = terminalUnlocked
  }, [terminalUnlocked])

  useEffect(() => {
    if (!LABEL_BY_PATH[pathname]) {
      return
    }

    setDiscoveredRoutes((prev) => {
      if (prev.includes(pathname)) {
        return prev
      }

      const next = [...prev, pathname]
      window.localStorage.setItem('iamronney_discovered_routes', JSON.stringify(next))
      return next
    })

    const routeArtifact = ARTIFACT_BY_PATH[pathname]
    if (!routeArtifact) {
      return
    }

    setArtifacts((prev) => {
      if (prev.includes(routeArtifact)) {
        return prev
      }

      const next = [...prev, routeArtifact]
      window.localStorage.setItem('iamronney_artifacts', JSON.stringify(next))
      return next
    })
  }, [pathname])

  function runCommand(event) {
    event.preventDefault()

    const rawCommand = commandInput.trim()
    const normalizedCommand = rawCommand.toLowerCase()
    const hasExactMatch = TERMINAL_COMMANDS.includes(normalizedCommand)
    const resolvedCommand = !hasExactMatch && commandMatches.length
      ? commandMatches[0]
      : normalizedCommand

    const command = resolvedCommand

    if (!rawCommand) {
      return
    }

    setCommandHistory((prev) => [...prev, command])
    setHistoryIndex(-1)
    appendIncident('CMD', `issued: ${command}`, 'info')

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
      setCommandOutput('whoami | about | work | skills | awards | conferences | posts | contact | resume | scan | artifacts | incidents | clear | dream | trace | entropy | ghost')
      setCommandInput('')
      return
    }

    if (command === 'scan') {
      const routeLabels = discoveredRoutes
        .map((routePath) => LABEL_BY_PATH[routePath])
        .filter(Boolean)

      if (routeLabels.length) {
        setCommandOutput(`Recon map: ${routeLabels.join(' | ')}`)
      } else {
        setCommandOutput('Recon map: no route signatures discovered yet.')
      }

      setCommandInput('')
      return
    }

    if (command === 'artifacts') {
      if (!artifacts.length) {
        setCommandOutput(`Artifacts [0/${totalArtifactCount}]: none captured.`)
      } else {
        const sortedArtifacts = [...artifacts].sort()
        setCommandOutput(`Artifacts [${sortedArtifacts.length}/${totalArtifactCount}]: ${sortedArtifacts.join(' | ')}`)
      }

      setCommandInput('')
      return
    }

    if (command === 'incidents') {
      setShowIncidentLog(true)
      setCommandOutput(`Incident log opened (${incidentLogs.length} entries retained).`)
      appendIncident('CMD', 'incident log panel opened.', 'success')
      setCommandInput('')
      return
    }

    if (command === 'clear') {
      setCommandOutput('')
      setShowIncidentLog(false)
      appendIncident('CMD', 'terminal output and incident panel cleared.', 'info')
      setCommandInput('')
      return
    }

    if (EASTER_EGGS[command]) {
      const egg = EASTER_EGGS[command]
      const alreadyCollected = artifacts.includes(egg.artifact)

      if (!alreadyCollected) {
        const nextArtifacts = [...artifacts, egg.artifact]
        setArtifacts(nextArtifacts)
        window.localStorage.setItem('iamronney_artifacts', JSON.stringify(nextArtifacts))
        appendIncident('EGG', `${command} solved. Captured ${egg.artifact}.`, 'success')
      }

      setCommandOutput(
        alreadyCollected
          ? egg.text
          : `${egg.text} [artifact captured: ${egg.artifact}]`
      )

      if (alreadyCollected) {
        appendIncident('EGG', `${command} replayed.`, 'info')
      }

      setCommandInput('')
      return
    }

    if (routeCommands[command]) {
      const targetRoute = routeCommands[command]
      navigate(targetRoute)
      setCommandOutput(`Routing to ${targetRoute}`)
      appendIncident('CMD', `navigated to ${targetRoute}.`, 'info')
      setCommandInput('')
      return
    }

    if (command === 'contact') {
      window.location.href = `mailto:${profile.email}`
      setCommandOutput('Launching mail client...')
      appendIncident('CMD', 'mail client launch triggered.', 'success')
      setCommandInput('')
      return
    }

    if (command === 'resume') {
      if (linkedInUrl) {
        window.open(linkedInUrl, '_blank', 'noopener,noreferrer')
        setCommandOutput('Opening resume profile...')
        appendIncident('CMD', 'resume profile opened in new tab.', 'success')
      } else {
        setCommandOutput('Resume target not configured.')
        appendIncident('CMD', 'resume requested but no URL configured.', 'warn')
      }
      setCommandInput('')
      return
    }

    setCommandOutput(`Command not found: ${command}`)
    appendIncident('CMD', `unknown command rejected (${command}).`, 'warn')
    setCommandInput('')
  }

  function handleCommandInputKeyDown(event) {
    if (event.key === 'Tab') {
      const normalizedInput = commandInput.trim().toLowerCase()
      if (!normalizedInput) {
        return
      }

      event.preventDefault()
      if (!commandMatches.length) {
        return
      }

      if (commandMatches.length === 1) {
        setCommandInput(commandMatches[0])
        return
      }

      const prefix = sharedPrefix(commandMatches)
      if (prefix.length > normalizedInput.length) {
        setCommandInput(prefix)
        return
      }

      setCommandOutput(`Matches: ${commandMatches.slice(0, 6).join(', ')}`)
      return
    }

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
                        onChange={(event) => {
                          setCommandInput(event.target.value)
                          setHistoryIndex(-1)
                        }}
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

                  {showCommandSuggestions ? (
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {commandMatches.slice(0, 6).map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => setCommandInput(suggestion)}
                          className="rounded-md border border-stone-300 bg-stone-100 px-2 py-0.5 font-mono text-[0.62rem] text-stone-700 hover:bg-stone-200"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  ) : null}

                  <p className="mt-2 font-mono text-[0.66rem] text-stone-600">
                    &gt; {commandOutput}
                  </p>

                  <div className="mt-3 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-2">
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-stone-500">
                      Artifact Collection // {artifacts.length}/{totalArtifactCount}
                    </p>
                    <p className="mt-1 text-[0.66rem] text-stone-600">
                      Route artifacts auto-capture on navigation. Easter egg artifacts unlock via terminal commands.
                    </p>
                  </div>

                  {showIncidentLog ? (
                    <div className="mt-3 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-2">
                      <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-stone-500">
                        Incident Log // analyst console
                      </p>

                      <div className="mt-2 max-h-44 overflow-auto pr-1">
                        {incidentLogs.map((entry) => (
                          <div key={entry.id} className="grid grid-cols-[auto_auto_1fr] items-start gap-2 border-b border-stone-200/70 py-1.5 last:border-b-0">
                            <span className="font-mono text-[0.58rem] text-stone-500">
                              {new Date(entry.timestamp).toLocaleTimeString('en-GB', {
                                hour12: false,
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                              })}
                            </span>
                            <span className={[
                              'font-mono text-[0.56rem] uppercase tracking-[0.1em]',
                              entry.level === 'success'
                                ? 'text-emerald-700'
                                : entry.level === 'warn'
                                  ? 'text-amber-700'
                                  : 'text-stone-500',
                            ].join(' ')}>
                              {entry.code}
                            </span>
                            <span className="font-mono text-[0.62rem] text-stone-700">
                              {entry.detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
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

      <aside className="recon-minimap hidden md:block" aria-label="Recon route map">
        <p className="recon-minimap-label">Recon Map</p>
        <svg viewBox="0 0 122 86" role="img" aria-label="Discovered route graph" className="recon-minimap-svg">
          {RECON_EDGES.map(([from, to]) => {
            const fromNode = RECON_NODES.find(({ path }) => path === from)
            const toNode = RECON_NODES.find(({ path }) => path === to)
            if (!fromNode || !toNode) {
              return null
            }

            const edgeActive = discoveredRoutes.includes(from) && discoveredRoutes.includes(to)

            return (
              <line
                key={`${from}-${to}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                className={edgeActive ? 'recon-edge recon-edge-active' : 'recon-edge'}
              />
            )
          })}

          {RECON_NODES.map((node) => {
            const isCurrent = node.path === pathname
            const isDiscovered = discoveredRoutes.includes(node.path)
            const nodeClass = isCurrent
              ? 'recon-node recon-node-current'
              : isDiscovered
                ? 'recon-node recon-node-discovered'
                : 'recon-node'

            return (
              <g key={node.path} transform={`translate(${node.x}, ${node.y})`}>
                <circle r="4" className={nodeClass} />
                <text x="6" y="3" className="recon-node-label">{node.short}</text>
              </g>
            )
          })}
        </svg>
      </aside>

      </div>

    </div>
  )
}
