import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'

const { useState, useEffect } = React

export function App() {

    const [page, setPage] = useState("book")

    function onSetPage(ev, page) {
        ev.preventDefault()
        setPage(page)
    }

    useEffect(() => {
        console.log(page)
    }, [page])

    return (
        <section className="app">
            <header>

            <AppHeader onSetPage={onSetPage} />
                {/* <h1>The Book App</h1>

                <nav className="app-nav">
                        <a onClick={() => setPage('home')} href="#">Home</a>
                        <a onClick={() => setPage('about')} href="#">About</a>
                        <a onClick={() => setPage('bookIndex')} href="#">Books</a>
                    </nav>
                     */}
            </header>
     
            <main className="main-layout">
                {page === "home" && <Home />}
                {page === "about" && <About />}
                {page === "book" && <BookIndex />}
            </main>
        </section>
    )
}