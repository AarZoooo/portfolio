import type { Personal } from '@type/portfolio'
import styles from './Contact.module.css'

interface ContactProps {
    heading: string
    personal: Personal
}

function Contact({ heading, personal }: ContactProps) {
    const stripProtocol = (url: string) => url.replace(/^https?:\/\//, '')
    const mapsUrl = (place: string) =>
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`

    // Labels are the clickable surface; values stay plain text. External
    // links open in a new tab; mailto stays in-page.
    const rows: { label: string; value: string; href: string; external: boolean }[] = [
        { label: 'Email', value: personal.email, href: `mailto:${personal.email}`, external: false },
        { label: 'Location', value: personal.location, href: mapsUrl(personal.location), external: true },
        { label: 'GitHub', value: stripProtocol(personal.github), href: personal.github, external: true },
        { label: 'LinkedIn', value: stripProtocol(personal.linkedin), href: personal.linkedin, external: true },
    ]

    return (
        <section id="contact" className={styles.contact}>
            <h2 className={styles.heading}>{heading}</h2>

            <dl className={styles.list}>
                {rows.map((row) => (
                    <div key={row.label} className={styles.row}>
                        <dt className={styles.label}>
                            <a
                                href={row.href}
                                className={styles.labelLink}
                                target={row.external ? '_blank' : undefined}
                                rel={row.external ? 'noreferrer' : undefined}
                            >
                                {row.label}
                                <span className={styles.arrow} aria-hidden>↗</span>
                            </a>
                        </dt>
                        <dd className={styles.value}>
                            <span className={styles.valueText}>{row.value}</span>
                            <button
                                type="button"
                                className={styles.copyBtn}
                                data-copy={row.value}
                                aria-label={`Copy ${row.label.toLowerCase()}`}
                            >
                                <svg
                                    className={styles.copyIcon}
                                    viewBox="0 0 24 24"
                                    width="14"
                                    height="14"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden
                                >
                                    <rect x="9" y="9" width="13" height="13" rx="2" />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                                <svg
                                    className={styles.checkIcon}
                                    viewBox="0 0 24 24"
                                    width="14"
                                    height="14"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </button>
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    )
}

export default Contact
