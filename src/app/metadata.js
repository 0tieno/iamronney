import { about, achievements, conferences, posts, work } from '../data/content'
import { DEFAULT_SHARE_IMAGE, SITE_URL } from './config'

export function firstTwoSentences(value) {
    const normalized = String(value ?? '').replace(/\s+/g, ' ').trim()
    if (!normalized) {
        return ''
    }

    const sentences = normalized
        .match(/[^.!?]+[.!?]+(?:["')\]]+)?|[^.!?]+$/g)
        ?.map((sentence) => sentence.trim())
        .filter(Boolean)

    if (!sentences?.length) {
        return normalized
    }

    return sentences.slice(0, 2).join(' ')
}

export function toMetaExcerpt(value, maxLength = 220) {
    const selected = firstTwoSentences(value)
    if (!selected) {
        return ''
    }

    if (selected.length <= maxLength) {
        return selected
    }

    return `${selected.slice(0, maxLength - 3)}...`
}

const META_BY_PATH = {
    '/work': {
        title: 'My Work',
        description: toMetaExcerpt(work.introParagraphs?.[0]),
        type: 'website',
    },
    '/about': {
        title: 'About',
        description: toMetaExcerpt(about.paragraphs?.[0]),
        type: 'profile',
    },
    '/conferences': {
        title: 'Conferences, Presentations & Publications',
        description: toMetaExcerpt(conferences.paragraphs?.[0]),
        type: 'website',
    },
    '/achievements': {
        title: 'Achievements, Honors & Awards',
        description: toMetaExcerpt(achievements.paragraphs?.[0]),
        type: 'website',
    },
    '/posts': {
        title: 'Posts',
        description: toMetaExcerpt(posts[0]?.body?.[0] ?? posts[0]?.excerpt),
        type: 'website',
    },
}

function upsertMetaTag({ name, property, content }) {
    const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`
    const existing = document.head.querySelector(selector)

    if (existing) {
        existing.setAttribute('content', content)
        return
    }

    const meta = document.createElement('meta')
    if (name) {
        meta.setAttribute('name', name)
    }
    if (property) {
        meta.setAttribute('property', property)
    }
    meta.setAttribute('content', content)
    document.head.appendChild(meta)
}

function upsertCanonicalTag(href) {
    const existing = document.head.querySelector('link[rel="canonical"]')
    if (existing) {
        existing.setAttribute('href', href)
        return
    }

    const link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    link.setAttribute('href', href)
    document.head.appendChild(link)
}

export function getMetaForPath(pathname) {
    const matchedPost = pathname.startsWith('/posts/')
        ? posts.find(({ slug }) => pathname === `/posts/${slug}`)
        : null

    if (matchedPost) {
        return {
            title: matchedPost.title,
            description: toMetaExcerpt(matchedPost.body?.[0] ?? matchedPost.excerpt),
            type: 'article',
        }
    }

    return META_BY_PATH[pathname] ?? {
        title: '404 Not Found',
        description: 'Requested portfolio route was not found.',
        type: 'website',
    }
}

export function applyRouteMetadata(pathname) {
    const pageMeta = getMetaForPath(pathname)
    const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`
    const pageUrl = `${SITE_URL}${cleanPath}`

    document.title = `i am ronney — ${pageMeta.title}`

    upsertMetaTag({ name: 'description', content: pageMeta.description })
    upsertMetaTag({ property: 'og:title', content: pageMeta.title })
    upsertMetaTag({ property: 'og:description', content: pageMeta.description })
    upsertMetaTag({ property: 'og:type', content: pageMeta.type })
    upsertMetaTag({ property: 'og:url', content: pageUrl })
    upsertMetaTag({ property: 'og:image', content: DEFAULT_SHARE_IMAGE })
    upsertMetaTag({ name: 'twitter:title', content: pageMeta.title })
    upsertMetaTag({ name: 'twitter:description', content: pageMeta.description })
    upsertMetaTag({ name: 'twitter:image', content: DEFAULT_SHARE_IMAGE })
    upsertCanonicalTag(pageUrl)
}
