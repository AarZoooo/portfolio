import type { Personal } from '@type/portfolio'
import styles from './Contact.module.css'

interface ContactProps {
    heading: string
    personal: Personal
}

function Contact({ heading, personal }: ContactProps) {
    const stripProtocol = (url: string) => url.replace(/^https?:\/\//, '')

    const rows: { label: string; value: string; href?: string }[] = [
        { label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
        { label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, '')}` },
        { label: 'Location', value: personal.location },
        { label: 'GitHub', value: stripProtocol(personal.github), href: personal.github },
        { label: 'LinkedIn', value: stripProtocol(personal.linkedin), href: personal.linkedin },
    ]

    return (
        <section id="contact" className={styles.contact}>
            <h2 className={styles.heading}>{heading}</h2>

            <dl className={styles.list}>
                {rows.map((row) => (
                    <div key={row.label} className={styles.row}>
                        <dt className={styles.label}>{row.label}</dt>
                        <dd className={styles.value}>
                            {row.href ? (
                                <a href={row.href} className={styles.link} target={row.href.startsWith('http') ? '_blank' : undefined} rel={row.href.startsWith('http') ? 'noreferrer' : undefined}>
                                    {row.value}
                                </a>
                            ) : (
                                row.value
                            )}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    )
}

export default Contact
