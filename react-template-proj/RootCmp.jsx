const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Navigate } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"




const { useState, useEffect } = React

export function App() {

    // const [page, setPage] = useState("book")

    // function onSetPage(ev, page) {
    //     ev.preventDefault()
    //     setPage(page)
    // }

    // useEffect(() => {
    //     console.log(page)
    // }, [page])

    return (
        <Router>
        <section className="app">

            <AppHeader/>
 
            <main >
            <Routes>
            <Route path="/" element={<Navigate to="/books" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<BookIndex />} />
            <Route path="/books/:bookId" element={<BookDetails />} />
                        <Route path="/books/edit" element={<BookEdit />} />
                        <Route path="/books/edit/:bookId" element={<BookEdit />} />

                        <Route path="*" element={<NotFound />} />
            </Routes>
            </main>
            <UserMsg />
        </section>
        </Router>

    )
}