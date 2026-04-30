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
        // Dual-theme code blocks. Shiki emits CSS variables for both
        // palettes; prose.css picks the right pair based on [theme].
        shikiConfig: {
            themes: {
                light: 'material-theme-lighter',
                dark: 'vitesse-dark',
            },
            defaultColor: false,
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
