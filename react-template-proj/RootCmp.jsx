import { Home } from './cmps/Home.jsx'
import { About } from './cmps/About.jsx'

const { useState } = React

export function App() {

    const [page, setPage] = useState('home')


    return (
        <section className="app">
            <header className="app-header full main-layout">
                <h1>Ariella's App</h1>

                <nav className="app-nav">
                        <a onClick={() => setPage('home')} href="#">Home</a>
                        <a onClick={() => setPage('about')} href="#">About</a>
                    </nav>
                    
            </header>
     
            <main className="main-layout">
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
            </main>
        </section>
    )
}