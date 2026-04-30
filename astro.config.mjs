import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
    site: 'https://aarju.dev',
    output: 'static',
    adapter: vercel({
        webAnalytics: { enabled: false },
    }),
    integrations: [react(), mdx(), sitemap()],
    markdown: {
        // Nord — minimal blue-gray palette. Used always-dark so code blocks
        // read like a terminal in both light and dark site modes.
        shikiConfig: {
            theme: 'nord',
        },
    },
    redirects: {
        '/portfolio': { status: 308, destination: '/' },
    },
    server: {
        host: true,
    },
    vite: {
        css: {
            transformer: 'lightningcss',
            lightningcss: {
                drafts: { customMedia: true },
            },
        },
    },
})
