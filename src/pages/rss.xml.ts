import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

const SITE_TITLE = 'aarju.dev'
const SITE_DESCRIPTION = 'Inked thoughts, mostly software. Not bound to it.'

export async function GET(context: APIContext) {
    const posts = (await getCollection('blog'))
        .filter((post) => !post.data.draft)
        .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())

    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        // `context.site` reads astro.config.mjs `site` (https://aarju.dev).
        site: context.site ?? 'https://aarju.dev',
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.pubDate,
            link: `/blog/${post.id}/`,
            categories: post.data.tags,
        })),
        customData: '<language>en-us</language>',
    })
}
