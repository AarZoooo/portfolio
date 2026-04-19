import { Analytics } from '@vercel/analytics/react'
import Navbar from './navbar/Navbar'
import Footer from './components/Footer/Footer'
import CustomCursor from './components/CustomCursor/CustomCursor'
import PortfolioLayout from './layouts/PortfolioLayout/PortfolioLayout'
import data from './data/data.json'
import type { PortfolioData } from './types/portfolio'

function App() {
    const d = data as PortfolioData

    return (
        <>
            <a href="#main" className="skip-link">Skip to content</a>
            <CustomCursor />
            <Navbar
                github={d.personal.github}
                linkedin={d.personal.linkedin}
                resumeKey={d.personal.resume}
                links={[
                    { id: 'experience', label: d.sections.experience, short: 'exp' },
                    { id: 'skills', label: d.sections.skills, short: 'skl' },
                    { id: 'projects', label: d.sections.projects, short: 'prj' },
                    { id: 'education', label: d.sections.education, short: 'edu' },
                    { id: 'contact', label: d.sections.contact, short: 'ctc' },
                ]}
            />
            <PortfolioLayout />
            <Footer footer={d.footer} />
            <Analytics />
        </>
    )
}

export default App
