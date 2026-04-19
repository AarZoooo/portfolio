import { useState } from 'react'
import Navbar, { type View } from './navbar/Navbar'
import StatusPill from './components/StatusPill/StatusPill'
import PortfolioLayout from './layouts/PortfolioLayout/PortfolioLayout'
import ResumeLayout from './layouts/ResumeLayout/ResumeLayout'

function App() {
    const [view, setView] = useState<View>('portfolio')

    return (
        <>
            <Navbar current={view} onChange={setView} />
            <StatusPill />
            <div key={view} className="view-fade">
                {view === 'portfolio' ? <PortfolioLayout /> : <ResumeLayout />}
            </div>
        </>
    )
}

export default App
