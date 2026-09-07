import styles from './Logo.module.css'

interface LogoProps {
    src: string
    alt: string
    /** Size of the logo square. Defaults to 1.1em (matches the
     * inline logo next to a company name). Pass a fixed px/rem for
     * larger contexts like the Skills chips. */
    size?: string
}

/** Recolors a logo image to the current --accent color via a CSS
 * mask. The image shape becomes a solid accent fill, so
 * any logo recolors to primary automatically when the palette
 * changes. Replaces the previous <img> + --mono-logo filter
 * approach, which could only force black/white. */
export default function Logo({ src, alt, size = '1.1em' }: LogoProps) {
    return (
        <div
            className={styles.logo}
            style={{
                maskImage: `url(${src})`,
                backgroundColor: 'rgb(var(--accent))',
                width: size,
                height: size,
            }}
            role="img"
            aria-label={alt}
        />
    )
}
