import type { Personal } from '../../types/portfolio'
import styles from './Contact.module.css'

interface ContactProps {
    personal: Personal
}

function Contact({ personal }: ContactProps) {
    return (
        <section id="contact" className={styles.contact}>
            {personal.email}
        </section>
    )
}

export default Contact
