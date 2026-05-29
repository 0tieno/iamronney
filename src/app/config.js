import { navItems } from '../data/content'

export const ROUTE_BY_ID = {
    work: '/work',
    about: '/about',
    conferences: '/conferences',
    achievements: '/achievements',
    posts: '/posts',
}

export const LABEL_BY_PATH = {
    '/work': navItems.find(({ id }) => id === 'work')?.label ?? 'My Work',
    '/about': navItems.find(({ id }) => id === 'about')?.label ?? 'About',
    '/conferences': navItems.find(({ id }) => id === 'conferences')?.label ?? 'Conferences',
    '/achievements': navItems.find(({ id }) => id === 'achievements')?.label ?? 'Achievements',
    '/posts': navItems.find(({ id }) => id === 'posts')?.label ?? 'Posts',
}

export const SITE_URL = 'https://0tieno.github.io/iamronney'
export const DEFAULT_SHARE_IMAGE = `${SITE_URL}/profile.png`

export const ARTIFACT_BY_PATH = {
    '/work': 'artifact.route.work',
    '/about': 'artifact.route.about',
    '/conferences': 'artifact.route.conferences',
    '/achievements': 'artifact.route.achievements',
    '/posts': 'artifact.route.posts',
}

export const EASTER_EGGS = {
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

export const RECON_NODES = [
    { path: '/work', short: 'wrk', x: 14, y: 49 },
    { path: '/about', short: 'abt', x: 52, y: 24 },
    { path: '/conferences', short: 'cnf', x: 96, y: 16 },
    { path: '/achievements', short: 'ach', x: 62, y: 73 },
    { path: '/posts', short: 'pst', x: 108, y: 58 },
]

export const RECON_EDGES = [
    ['/work', '/about'],
    ['/about', '/conferences'],
    ['/about', '/achievements'],
    ['/achievements', '/posts'],
    ['/work', '/achievements'],
    ['/conferences', '/posts'],
]

export const MAX_INCIDENTS = 30
export const THEME_OPTIONS = ['system', 'light', 'poetic', 'void']

export const TERMINAL_COMMANDS = [
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

export function normalizeTheme(value) {
    if (value === 'dark') {
        return 'poetic'
    }

    return THEME_OPTIONS.includes(value) ? value : null
}

export function resolveTheme(preference, systemPrefersDark) {
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

export function sharedPrefix(words) {
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
