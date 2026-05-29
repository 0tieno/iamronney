import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { about, achievements, conferences, posts, work } from './src/data/content'

const SITE_URL = 'https://0tieno.github.io/iamronney'

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

function firstTwoSentences(value) {
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

function toMetaExcerpt(value, maxLength = 220) {
    const selected = firstTwoSentences(value)
    if (!selected) {
        return ''
    }

    if (selected.length <= maxLength) {
        return selected
    }

    return `${selected.slice(0, maxLength - 3)}...`
}

function buildPreviewHtml({ pageTitle, description, canonicalUrl, imageUrl, type, routePath, base }) {
    const encodedRoute = routePath.replace(/^\/+/, '').replace(/&/g, '~and~')
    const redirectTarget = `${base}?/${encodedRoute}`

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(pageTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index,follow" />

    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />

    <meta property="og:type" content="${escapeHtml(type)}" />
    <meta property="og:title" content="${escapeHtml(pageTitle)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />

    <meta http-equiv="refresh" content="0;url=${escapeHtml(redirectTarget)}" />

    <script>
      (function () {
        window.location.replace(${JSON.stringify(redirectTarget)});
      })();
    </script>
  </head>
  <body>
    <p>Redirecting to <a href="${escapeHtml(redirectTarget)}">${escapeHtml(redirectTarget)}</a>...</p>
  </body>
</html>
`
}

function socialPreviewPages({ base }) {
    const normalizedBase = base.endsWith('/') ? base : `${base}/`
    const imageUrl = `${SITE_URL}/profile.png`

    const routePages = [
        {
            routePath: '/work',
            pageTitle: 'i am ronney — My Work',
            description: toMetaExcerpt(work.introParagraphs?.[0]),
            type: 'website',
        },
        {
            routePath: '/about',
            pageTitle: 'i am ronney — About',
            description: toMetaExcerpt(about.paragraphs?.[0]),
            type: 'profile',
        },
        {
            routePath: '/conferences',
            pageTitle: 'i am ronney — Conferences, Presentations & Publications',
            description: toMetaExcerpt(conferences.paragraphs?.[0]),
            type: 'website',
        },
        {
            routePath: '/achievements',
            pageTitle: 'i am ronney — Achievements, Honors & Awards',
            description: toMetaExcerpt(achievements.paragraphs?.[0]),
            type: 'website',
        },
        {
            routePath: '/posts',
            pageTitle: 'i am ronney — Posts',
            description: toMetaExcerpt(posts[0]?.body?.[0] ?? posts[0]?.excerpt),
            type: 'website',
        },
    ]

    const postPages = posts.map((post) => ({
        routePath: `/posts/${post.slug}`,
        pageTitle: `i am ronney — ${post.title}`,
        description: toMetaExcerpt(post.body?.[0] ?? post.excerpt),
        type: 'article',
    }))

    const allPages = [...routePages, ...postPages]

    return {
        name: 'social-preview-pages',
        apply: 'build',
        async closeBundle() {
            const distDir = path.resolve(process.cwd(), 'dist')

            await Promise.all(allPages.map(async (page) => {
                const targetDir = path.join(distDir, page.routePath.replace(/^\/+/, ''))
                const canonicalUrl = `${SITE_URL}${page.routePath}`
                const html = buildPreviewHtml({
                    pageTitle: page.pageTitle,
                    description: page.description,
                    canonicalUrl,
                    imageUrl,
                    type: page.type,
                    routePath: page.routePath,
                    base: normalizedBase,
                })

                await mkdir(targetDir, { recursive: true })
                await writeFile(path.join(targetDir, 'index.html'), html, 'utf8')
            }))
        },
    }
}

function redirectBaseWithoutTrailingSlash(base) {
    const withSlash = base.endsWith('/') ? base : `${base}/`
    const withoutSlash = withSlash.slice(0, -1)

    const redirect = (req, res, next) => {
        const reqUrl = req.url || '/'

        if (reqUrl === withoutSlash || reqUrl.startsWith(`${withoutSlash}?`)) {
            const suffix = reqUrl.slice(withoutSlash.length)
            res.statusCode = 302
            res.setHeader('Location', `${withSlash}${suffix.startsWith('?') ? suffix : ''}`)
            res.end()
            return
        }

        next()
    }

    return {
        name: 'redirect-base-without-trailing-slash',
        configureServer(server) {
            server.middlewares.use(redirect)
        },
        configurePreviewServer(server) {
            server.middlewares.use(redirect)
        },
    }
}

export default defineConfig({
    plugins: [react(), redirectBaseWithoutTrailingSlash('/iamronney/'), socialPreviewPages({ base: '/iamronney/' })],
    base: '/iamronney/',
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.js',
    },
})
