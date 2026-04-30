import styles from './Logo.module.css'

interface LogoProps {
    /** Current page path. Used to render the route slug after the brand. */
    currentPath: string
}

/**
 * Brand wordmark. The path slug after the brand is rendered as one link
 * per segment, each routing to its cumulative path — so the breadcrumb
 * is genuinely navigable, not just decorative.
 */
export default function Logo({ currentPath }: LogoProps) {
    // TEMP: showing `/portfolio` on root for layout testing.
    // Revert to `currentPath === '/' ? null : currentPath` to hide on root.
    const path = currentPath === '/' ? '/portfolio' : currentPath
    const segments = path.split('/').filter(Boolean)

    return (
        <span className={styles.logo}>
            <a href="/" className={styles.brand} aria-label="Home">
                aarju.dev
            </a>
            {segments.length > 0 && (
                <span className={styles.slugs}>
                    {segments.map((seg, i) => {
                        const href = '/' + segments.slice(0, i + 1).join('/')
                        return (
                            <a key={href} href={href} className={styles.slug}>
                                /{seg}
                            </a>
                        )
                    })}
                </span>
            )}
        </span>
    )
}
