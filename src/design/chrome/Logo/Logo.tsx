import styles from './Logo.module.css'

interface LogoProps {
    /** Current page path. Used to render the route slug after the brand. */
    currentPath: string
}

/**
 * Brand wordmark. The path slug after the brand reads like a real URL
 * fragment ("aarju.dev /blog"); it's omitted on the root page so the
 * brand stands alone there.
 */
export default function Logo({ currentPath }: LogoProps) {
    const slug = currentPath === '/' ? null : currentPath

    return (
        <a href="/" className={styles.logo} aria-label="Home">
            <span className={styles.brand}>aarju.dev</span>
            {slug && <span className={styles.slug}>{slug}</span>}
        </a>
    )
}
