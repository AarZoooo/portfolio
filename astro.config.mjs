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
        // We inject @vercel/analytics and @vercel/speed-insights ourselves
        // from BaseLayout, so the adapter does not need to handle them.
        webAnalytics: { enabled: false },
    }),
    integrations: [react(), mdx(), sitemap()],
    redirects: {
        '/portfolio': { status: 308, destination: '/' },
    },
})
