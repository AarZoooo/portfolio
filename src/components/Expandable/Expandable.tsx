import { useLayoutEffect, useState, type ReactNode } from 'react'
import styles from './Expandable.module.css'

interface ExpandableProps {
    isOpen: boolean
    onToggle: () => void
    /** Sits outside the rail (headers — company, role, duration). */
    head?: ReactNode
    /** Inside the rail: shown when collapsed. */
    short: ReactNode
    /** Inside the rail: shown when expanded. Replaces `short`. */
    full: ReactNode
    /** Inside the rail, always visible, below short/full (e.g. tech). */
    after?: ReactNode
    expandLabel?: string
    collapseLabel?: string
}

/**
 * Measures the current scrollHeight of `el` and subscribes to any size
 * changes via ResizeObserver. Used to drive exact max-height values so
 * the expand animation stays correct under width changes (narrow mode
 * toggle, viewport resize, etc.) without relying on the grid-rows 1fr
 * trick which caches intrinsic height.
 */
function useMeasuredHeight(el: HTMLElement | null): number {
    const [h, setH] = useState(0)
    useLayoutEffect(() => {
        if (!el) return
        // ResizeObserver fires an initial callback synchronously after
        // observe, so we skip the manual setState here and let the
        // observer drive the first measurement. Before that fires, the
        // consumer should fall back to natural height (undefined max).
        const ro = new ResizeObserver(() => setH(el.scrollHeight))
        ro.observe(el)
        return () => ro.disconnect()
    }, [el])
    return h
}

function Expandable({
    isOpen,
    onToggle,
    head,
    short,
    full,
    after,
    expandLabel = 'read more',
    collapseLabel = 'collapse',
}: ExpandableProps) {
    const [shortEl, setShortEl] = useState<HTMLDivElement | null>(null)
    const [fullEl, setFullEl] = useState<HTMLDivElement | null>(null)
    const shortH = useMeasuredHeight(shortEl)
    const fullH = useMeasuredHeight(fullEl)

    return (
        <div className={`${styles.wrap} ${isOpen ? styles.open : ''}`}>
            {head && <div className={styles.head}>{head}</div>}

            <div className={styles.rail}>
                <div
                    className={styles.viewWrap}
                    aria-hidden={isOpen}
                    style={{ maxHeight: isOpen ? 0 : (shortH || undefined) }}
                >
                    <div ref={setShortEl} className={styles.viewInner}>
                        {short}
                    </div>
                </div>

                <div
                    className={styles.viewWrap}
                    aria-hidden={!isOpen}
                    style={{ maxHeight: isOpen ? (fullH || undefined) : 0 }}
                >
                    <div ref={setFullEl} className={styles.viewInner}>
                        {full}
                    </div>
                </div>

                {after && <div className={styles.after}>{after}</div>}
            </div>

            <button
                type="button"
                className={styles.toggle}
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <span className={styles.toggleLabel}>
                    {isOpen ? collapseLabel : expandLabel}{' '}
                    <span aria-hidden>{isOpen ? '↑' : '↓'}</span>
                </span>
            </button>
        </div>
    )
}

export default Expandable
