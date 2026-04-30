import data from '@features/portfolio/data/data.json'
import type { PortfolioData } from '@type/portfolio'
import Hero from '@features/portfolio/sections/Hero/Hero'
import Experience from '@features/portfolio/sections/Experience/Experience'
import Skills from '@features/portfolio/sections/Skills/Skills'
import Projects from '@features/portfolio/sections/Projects/Projects'
import Education from '@features/portfolio/sections/Education/Education'
import Contact from '@features/portfolio/sections/Contact/Contact'

function PortfolioLayout() {
    const d = data as PortfolioData
    return (
        <main id="main" className="container">
            <Hero personal={d.personal} hero={d.hero} />
            <Experience heading={d.sections.experience} items={d.experience} />
            <Skills heading={d.sections.skills} skills={d.skills} />
            <Projects heading={d.sections.projects} items={d.projects} />
            <Education heading={d.sections.education} items={d.education} />
            <Contact heading={d.sections.contact} personal={d.personal} />
        </main>
    )
}

export default PortfolioLayout
