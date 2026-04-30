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
        // Minimal monochrome themes for code blocks. `defaultColor: false`
        // emits CSS custom properties for both themes; prose.css picks the
        // active one based on the `theme` attribute on <html>.
        shikiConfig: {
            themes: { light: 'min-light', dark: 'min-dark' },
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
