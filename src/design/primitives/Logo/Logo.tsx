import styles from './Logo.module.css'

/* Slightly above 1em so the logo optically matches the cap height of
   the adjacent label text. */
const DEFAULT_LOGO_SIZE = '1.1em'

interface LogoProps {
    src?: string
    /** Alt text. Pass '' when the logo sits beside a visible text label;
     *  the logo is decorative then and hidden from screen readers. */
    alt: string
    /** Size of the logo square. Defaults to DEFAULT_LOGO_SIZE (inline
     * next to a company name). Pass a fixed px/rem for larger contexts
     * like the Skills chips. */
    size?: string
    /** Extra className for the logo container (e.g. a scoped CSS module class).
     * Lets consumers style the wrapper without :global. */
    className?: string
}

/** Recolors a logo image to the current --accent color via a CSS
 * mask. The image shape becomes a solid accent fill, so
 * any logo recolors to primary automatically when the palette
 * changes. Replaces the previous <img> + --mono-logo filter
 * approach, which could only force black/white. */
export default function Logo({ src, alt, size = DEFAULT_LOGO_SIZE, className }: LogoProps) {
    if (!src) return null
    const a11yProps =
        alt === ''
            ? { 'aria-hidden': true as const }
            : { role: 'img' as const, 'aria-label': alt }
    return (
        <div
            className={`${styles.logo}${className ? ` ${className}` : ''}`}
            style={{
                maskImage: `url(${src})`,
                backgroundColor: 'rgb(var(--accent))',
                width: size,
                height: size,
            }}
            {...a11yProps}
        />
    )
}
