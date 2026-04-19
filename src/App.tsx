import { useEffect, useState } from 'react'
import Navbar from './navbar/Navbar'
import Footer from './components/Footer/Footer'
import CustomCursor, { type CursorVariant } from './components/CustomCursor/CustomCursor'
import PortfolioLayout from './layouts/PortfolioLayout/PortfolioLayout'
import data from './data/data.json'
import type { PortfolioData } from './types/portfolio'

function App() {
    const d = data as PortfolioData
    const [cursor, setCursor] = useState<CursorVariant>(0)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
            if (e.key === '0') setCursor(0)
            if (e.key === '1') setCursor(1)
            if (e.key === '2') setCursor(2)
            if (e.key === '3') setCursor(3)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    return (
        <>
            <CustomCursor variant={cursor} />
            <Navbar
                github={d.personal.github}
                linkedin={d.personal.linkedin}
                resumeKey={d.personal.resume}
                links={[
                    { id: 'experience', label: d.sections.experience },
                    { id: 'skills', label: d.sections.skills },
                    { id: 'education', label: d.sections.education },
                    { id: 'contact', label: d.sections.contact },
                ]}
            />
            <PortfolioLayout />
            <Footer footer={d.footer} />
        </>
    )
}

export default App
