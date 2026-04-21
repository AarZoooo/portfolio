import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Navbar from './navbar/Navbar'
import Footer from './components/Footer/Footer'
import CustomCursor from './components/CustomCursor/CustomCursor'
import PortfolioLayout from './layouts/PortfolioLayout/PortfolioLayout'
import data from './data/data.json'
import type { PortfolioData } from './types/portfolio'
import useShortcuts from './hooks/useShortcuts'

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
