import { useEffect, useMemo, useRef, useState } from 'react'
import {
    ARTIFACT_BY_PATH,
    EASTER_EGGS,
    LABEL_BY_PATH,
    MAX_INCIDENTS,
    TERMINAL_COMMANDS,
    sharedPrefix,
} from '../app/config'
import { profile } from '../data/content'

function readJsonArrayFromStorage(key) {
    const stored = window.localStorage.getItem(key)
    if (!stored) {
        return []
    }

    try {
        const parsed = JSON.parse(stored)
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

export function useAnalystConsole({ pathname, navigate }) {
    const previousPathRef = useRef(pathname)
    const previousUnlockRef = useRef(false)

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
    const [discoveredRoutes, setDiscoveredRoutes] = useState(() => readJsonArrayFromStorage('iamronney_discovered_routes'))
    const [artifacts, setArtifacts] = useState(() => readJsonArrayFromStorage('iamronney_artifacts'))

    const linkedInUrl = useMemo(
        () => profile.socials.find(({ label }) => label === 'LinkedIn')?.href,
        []
    )

    const routeArtifactCount = useMemo(
        () => Object.values(ARTIFACT_BY_PATH).length,
        []
    )

    const easterArtifactCount = useMemo(
        () => Object.values(EASTER_EGGS).filter(({ artifact }) => artifact).length,
        []
    )

    const totalArtifactCount = routeArtifactCount + easterArtifactCount

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
            research: '/research',
            posts: '/posts',
            blog: '/posts',
            home: '/work',
        }

        if (command === 'help') {
            setCommandOutput('whoami | about | work | skills | awards | conferences | research | posts | contact | resume | scan | artifacts | incidents | clear | dream | trace | entropy | ghost')
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

    return {
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
    }
}
