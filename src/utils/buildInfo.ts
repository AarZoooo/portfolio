/**
 * Build-time information surfaced into the UI.
 *
 * Import only from `.astro` frontmatter — that frontmatter runs at build
 * time, so `new Date()` here resolves once per deploy and gets baked into
 * static HTML. Importing this from a hydrating React island would compute
 * a different value on the client and cause a hydration mismatch.
 */

const BUILD_DATE = new Date()
const monthYear = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
})

/** "Last updated <Month YYYY>" — the build date shown in the footer. */
export const buildDateLabel: string = `Last updated ${monthYear.format(BUILD_DATE)}`

/** Append the build date to a footer's meta line. Use from `.astro`
 *  frontmatter so the label resolves once per build. */
export function withBuildDate<T extends { meta: string[] }>(footer: T): T {
    return { ...footer, meta: [...footer.meta, buildDateLabel] }
}
