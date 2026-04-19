import { useLayoutEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'

export type View = 'portfolio' | 'resume'

interface NavbarProps {
    current: View
    onChange: (view: View) => void
}

const items: { key: View; label: string }[] = [
    { key: 'portfolio', label: 'Portfolio' },
    { key: 'resume', label: 'Resume' },
]

function Navbar({ current, onChange }: NavbarProps) {
    const navRef = useRef<HTMLDivElement>(null)
    const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false })

    useLayoutEffect(() => {
        const nav = navRef.current
        if (!nav) return
        const active = nav.querySelector<HTMLButtonElement>(`[data-key="${current}"]`)
        if (!active) return
        setIndicator({ left: active.offsetLeft, width: active.offsetWidth, ready: true })
    }, [current])

    return (
        <div ref={navRef} className={`${styles.navbar} glass pill`}>
            <span
                className={styles.indicator}
                style={{
                    transform: `translateX(${indicator.left}px)`,
                    width: `${indicator.width}px`,
                    opacity: indicator.ready ? 1 : 0,
                }}
                aria-hidden
            />
            {items.map((item) => (
                <button
                    key={item.key}
                    data-key={item.key}
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
