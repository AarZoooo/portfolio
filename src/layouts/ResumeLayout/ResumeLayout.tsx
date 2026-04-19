import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import data from '../../data/data.json'
import type { PortfolioData } from '../../types/portfolio'
import { assets } from '../../assets'
import styles from './ResumeLayout.module.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString()

function ResumeLayout() {
    const d = data as PortfolioData
    const src = assets.resume(d.personal.resume)
    const wrapRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(900)

    useEffect(() => {
        const el = wrapRef.current
        if (!el) return
        setWidth(el.clientWidth)
        const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width))
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    return (
        <main className={`${styles.layout} container`}>
            <div ref={wrapRef} className={styles.doc}>
                {src && (
                    <Document file={src} loading={null} error={null}>
                        <Page pageNumber={1} width={width} renderAnnotationLayer={false} renderTextLayer={false} />
                    </Document>
                )}
            </div>
        </main>
    )
}

export default ResumeLayout
