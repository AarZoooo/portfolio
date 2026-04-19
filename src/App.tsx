import { useState } from 'react'
import Navbar, { type View } from './navbar/Navbar'
import StatusPill from './components/StatusPill/StatusPill'
import Footer from './components/Footer/Footer'
import PortfolioLayout from './layouts/PortfolioLayout/PortfolioLayout'
import ResumeLayout from './layouts/ResumeLayout/ResumeLayout'
import data from './data/data.json'
import type { PortfolioData } from './types/portfolio'

function App() {
    const [view, setView] = useState<View>('portfolio')
    const d = data as PortfolioData

    return (
        <>
            <Navbar current={view} onChange={setView} />
            <StatusPill />
            <div key={view} className="view-fade">
                {view === 'portfolio' ? <PortfolioLayout /> : <ResumeLayout />}
            </div>
            <Footer footer={d.footer} />
        </>
    )
}

export default App
