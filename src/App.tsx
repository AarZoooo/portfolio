import Navbar from './navbar/Navbar'
import Footer from './components/Footer/Footer'
import PortfolioLayout from './layouts/PortfolioLayout/PortfolioLayout'
import data from './data/data.json'
import type { PortfolioData } from './types/portfolio'

function App() {
    const d = data as PortfolioData

    return (
        <>
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
