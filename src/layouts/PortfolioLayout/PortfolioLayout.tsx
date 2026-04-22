import data from '../../data/data.json'
import type { PortfolioData } from '../../types/portfolio'
import Hero from '../../sections/Hero/Hero'
import Experience from '../../sections/Experience/Experience'
import Skills from '../../sections/Skills/Skills'
import Projects from '../../sections/Projects/Projects'
import Education from '../../sections/Education/Education'
import Contact from '../../sections/Contact/Contact'
import Reveal from '../../components/Reveal/Reveal'

function PortfolioLayout() {
    const d = data as PortfolioData
    return (
        <main id="main" className="container">
            <Reveal>
                <Hero personal={d.personal} hero={d.hero} />
            </Reveal>
            <Reveal>
                <Experience heading={d.sections.experience} items={d.experience} />
            </Reveal>
            <Reveal>
                <Skills heading={d.sections.skills} skills={d.skills} />
            </Reveal>
            <Reveal>
                <Projects heading={d.sections.projects} items={d.projects} />
            </Reveal>
            <Reveal>
                <Education heading={d.sections.education} items={d.education} />
            </Reveal>
            <Reveal>
                <Contact heading={d.sections.contact} personal={d.personal} />
            </Reveal>
        </main>
    )
}

export default PortfolioLayout
