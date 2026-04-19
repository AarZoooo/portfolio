import { useState } from 'react'
import Navbar, { type View } from './navbar/Navbar'
import PortfolioLayout from './layouts/PortfolioLayout/PortfolioLayout'
import ResumeLayout from './layouts/ResumeLayout/ResumeLayout'

function App() {
    const [view, setView] = useState<View>('portfolio')

    return (
        <>
            <Navbar current={view} onChange={setView} />
            {view === 'portfolio' ? <PortfolioLayout /> : <ResumeLayout />}
        </>
    )
}

export default App
