import data from '../../data/data.json'
import type { PortfolioData } from '../../types/portfolio'
import Hero from '../../sections/Hero/Hero'
import Experience from '../../sections/Experience/Experience'
import Skills from '../../sections/Skills/Skills'
import Projects from '../../sections/Projects/Projects'
import Education from '../../sections/Education/Education'
import Contact from '../../sections/Contact/Contact'
import styles from './PortfolioLayout.module.css'

function PortfolioLayout() {
    const d = data as PortfolioData
    return (
        <main id="main" className={`${styles.layout} container`}>
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
