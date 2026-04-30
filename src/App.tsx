import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Navbar from '@design/chrome/Navbar/Navbar'
import Footer from '@design/chrome/Footer/Footer'
import CustomCursor from '@design/chrome/CustomCursor/CustomCursor'
import PortfolioLayout from '@features/portfolio/PortfolioLayout/PortfolioLayout'
import data from '@features/portfolio/data/data.json'
import type { PortfolioData } from '@type/portfolio'
import useShortcuts from '@hooks/useShortcuts'

const d = data as PortfolioData

// Ordered section ids for vim-style j/k navigation.
const SECTION_IDS = ['hero', 'experience', 'skills', 'projects', 'education', 'contact']

// Stable at module scope so Navbar effects don't re-bind per render.
const NAV_LINKS = [
    { id: 'experience', label: d.sections.experience, short: 'exp' },
    { id: 'skills', label: d.sections.skills, short: 'skl' },
    { id: 'projects', label: d.sections.projects, short: 'prj' },
    { id: 'education', label: d.sections.education, short: 'edu' },
    { id: 'contact', label: d.sections.contact, short: 'ctc' },
]

function App() {
    useShortcuts(SECTION_IDS)

    return (
        <>
            <a href="#main" className="skip-link">Skip to content</a>
            <CustomCursor />
            <Navbar
                github={d.personal.github}
                linkedin={d.personal.linkedin}
                resumeKey={d.personal.resume}
                links={NAV_LINKS}
            />
            <PortfolioLayout />
            <Footer footer={d.footer} />
            <Analytics />
            <SpeedInsights />
        </>
    )
}

export default App
