import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

const SITE_TITLE = 'aarju.dev'
const SITE_DESCRIPTION = 'Inked thoughts, mostly software. Not bound to it.'

export async function GET(context: APIContext) {
    const posts = (await getCollection('blog'))
        .filter((post) => !post.data.draft)
        .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())

    const site = context.site ?? new URL('https://aarju.dev')
    const selfHref = new URL('/rss.xml', site).href

    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        // `context.site` reads astro.config.mjs `site` (https://aarju.dev).
        site,
        // The Atom namespace lets us declare a self-link so feed readers can
        // round-trip back to this exact URL (W3C recommendation for RSS 2.0).
        xmlns: { atom: 'http://www.w3.org/2005/Atom' },
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.pubDate,
            link: `/blog/${post.id}/`,
            categories: post.data.tags,
        })),
        customData: `<atom:link href="${selfHref}" rel="self" type="application/rss+xml" /><language>en-us</language>`,
    })
}
