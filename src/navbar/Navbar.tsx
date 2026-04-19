import styles from './Navbar.module.css'

export type View = 'portfolio' | 'resume'

interface NavbarProps {
    current: View
    onChange: (view: View) => void
}

function Navbar({ current, onChange }: NavbarProps) {
    const items: { key: View; label: string }[] = [
        { key: 'portfolio', label: 'Portfolio' },
        { key: 'resume', label: 'Resume' },
    ]

    return (
        <div className={`${styles.navbar} pill-strong`}>
            {items.map((item) => (
                <button
                    key={item.key}
                    type="button"
                    onClick={() => onChange(item.key)}
                    className={`${styles.item} ${current === item.key ? styles.active : ''}`}
                >
                    {item.label}
                </button>
            ))}
        </div>
    )
}

export default Navbar
