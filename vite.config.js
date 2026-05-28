import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
    plugins: [react(), redirectBaseWithoutTrailingSlash('/iamronney/')],
    base: '/iamronney/',
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.js',
    },
})
