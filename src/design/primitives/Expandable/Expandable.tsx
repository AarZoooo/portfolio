import { useLayoutEffect, useRef, type ReactNode } from 'react'
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
 * Height-driven view swap. Each view has a wrapper whose max-height
 * is written directly to the DOM from a ResizeObserver — bypassing
 * React state entirely so content reflow during width animations
 * doesn't trigger cascading re-renders. Opacity cross-fade handled
 * in CSS via the .open class on the root wrapper.
 */
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
    const shortWrapRef = useRef<HTMLDivElement>(null)
    const shortInnerRef = useRef<HTMLDivElement>(null)
    const fullWrapRef = useRef<HTMLDivElement>(null)
    const fullInnerRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const apply = () => {
            const si = shortInnerRef.current
            const sw = shortWrapRef.current
            const fi = fullInnerRef.current
            const fw = fullWrapRef.current
            if (sw && si) sw.style.maxHeight = isOpen ? '0px' : `${si.scrollHeight}px`
            if (fw && fi) fw.style.maxHeight = isOpen ? `${fi.scrollHeight}px` : '0px'
        }
        apply()

        const observers: ResizeObserver[] = []
        const observe = (el: Element | null) => {
            if (!el) return
            const ro = new ResizeObserver(apply)
            ro.observe(el)
            observers.push(ro)
        }
        observe(shortInnerRef.current)
        observe(fullInnerRef.current)
        return () => {
            for (const ro of observers) ro.disconnect()
        }
    }, [isOpen])

    return (
        <div className={`${styles.wrap} ${isOpen ? styles.open : ''}`}>
            {head && <div className={styles.head}>{head}</div>}

            <div className={styles.rail}>
                <div
                    ref={shortWrapRef}
                    className={styles.viewWrap}
                    aria-hidden={isOpen}
                >
                    <div ref={shortInnerRef} className={styles.viewInner}>
                        {short}
                    </div>
                </div>

                <div
                    ref={fullWrapRef}
                    className={styles.viewWrap}
                    aria-hidden={!isOpen}
                >
                    <div ref={fullInnerRef} className={styles.viewInner}>
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
